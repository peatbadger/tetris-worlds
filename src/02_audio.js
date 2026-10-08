/* ================= Procedural Audio (Web Audio API) ================= */
const AudioEngine = (() => {
  let ac = null, master, comp, musicBus, sfxBus, reverbIn, noiseBuf;
  let stageOut = null;          // current stage music gain
  let def = null;               // current stage music definition
  let volume = 0.7, muted = false;
  let nextTime = 0, step = 0, timer = null;
  let intensity = 1, chordDeg = 0, bar = 0;
  let moveIdx = 7, duckLevel = 1;
  const beatListeners = [];
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  try { const v = localStorage.getItem('tw_vol'); if (v !== null) volume = +v; muted = localStorage.getItem('tw_mute') === '1'; } catch (e) {}

  function makeImpulse(sec, decay) {
    const len = Math.floor(ac.sampleRate * sec);
    const b = ac.createBuffer(2, len, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return b;
  }
  function init() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ac = new AC();
    master = ac.createGain(); master.gain.value = muted ? 0 : volume;
    comp = ac.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
    master.connect(comp); comp.connect(ac.destination);
    const rev = ac.createConvolver(); rev.buffer = makeImpulse(3.4, 2.6);
    const revOut = ac.createGain(); revOut.gain.value = 0.5;
    reverbIn = ac.createGain(); reverbIn.connect(rev); rev.connect(revOut); revOut.connect(master);
    musicBus = ac.createGain(); musicBus.gain.value = 0.5; musicBus.connect(master);
    sfxBus = ac.createGain(); sfxBus.gain.value = 0.75; sfxBus.connect(master);
    const sfxRev = ac.createGain(); sfxRev.gain.value = 0.35; sfxBus.connect(sfxRev); sfxRev.connect(reverbIn);
    noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    nextTime = ac.currentTime + 0.1;
    timer = setInterval(schedule, 25);
    if (pendingDef) { const p = pendingDef; pendingDef = null; setStage(p); }
    return true;
  }
  let pendingDef = null;

  /* ---------- helpers ---------- */
  function env(g, t, a, peak, d, sus = 0.0001) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(sus, 0.0001), t + a + d);
  }
  function out(dest, wet) {
    const g = ac.createGain();
    g.connect(dest);
    if (wet) { const s = ac.createGain(); s.gain.value = wet; g.connect(s); s.connect(reverbIn); }
    return g;
  }
  function osc(type, f, t, stop, dest, detune = 0) {
    const o = ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune;
    o.connect(dest); o.start(t); o.stop(stop); return o;
  }
  function noise(t, dur, dest) {
    const s = ac.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    s.connect(dest); s.start(t, Math.random() * 1.5); s.stop(t + dur); return s;
  }
  function filt(type, f, q = 1) { const b = ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }

  /* ---------- instruments ---------- */
  const I = {
    pad(dest, t, freqs, dur, cfg) {
      const g = out(dest, 0.7); const lp = filt('lowpass', cfg.cutoff || 1200, 0.7); lp.connect(g);
      lp.frequency.setValueAtTime((cfg.cutoff || 1200) * 0.5, t);
      lp.frequency.linearRampToValueAtTime(cfg.cutoff || 1200, t + dur * 0.5);
      lp.frequency.linearRampToValueAtTime((cfg.cutoff || 1200) * 0.6, t + dur);
      const peak = (cfg.gain || 0.06) / Math.sqrt(freqs.length);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + Math.min(1.2, dur * 0.35));
      g.gain.setValueAtTime(peak, t + dur * 0.7);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 1.2);
      freqs.forEach((f) => {
        osc(cfg.wave || 'sawtooth', f, t, t + dur + 1.3, lp, -(cfg.detune || 7));
        osc(cfg.wave || 'sawtooth', f, t, t + dur + 1.3, lp, cfg.detune || 7);
      });
    },
    pluck(dest, t, f, v = 0.2, dec = 0.6, wave = 'triangle', wet = 0.4) {
      const g = out(dest, wet); env(g, t, 0.004, v, dec);
      const lp = filt('lowpass', Math.min(12000, f * 8), 0.5); lp.connect(g);
      lp.frequency.setValueAtTime(Math.min(14000, f * 10), t); lp.frequency.exponentialRampToValueAtTime(Math.max(200, f * 1.5), t + dec);
      osc(wave, f, t, t + dec + 0.05, lp);
      osc('sine', f * 2, t, t + dec * 0.5, lp).frequency.setValueAtTime(f * 2, t);
    },
    koto(dest, t, f, v = 0.2, dec = 1.3) {
      const g = out(dest, 0.45); env(g, t, 0.002, v, dec);
      const bp = filt('lowpass', 5000, 2); bp.connect(g);
      bp.frequency.setValueAtTime(6000, t); bp.frequency.exponentialRampToValueAtTime(f * 1.6, t + 0.35);
      const o = osc('sawtooth', f * 1.012, t, t + dec + 0.05, bp); o.frequency.exponentialRampToValueAtTime(f, t + 0.06);
      const o2 = osc('square', f * 2, t, t + 0.25, bp); o2.detune.value = 4;
      // pluck transient
      const ng = ac.createGain(); env(ng, t, 0.001, v * 0.6, 0.03); ng.connect(bp); noise(t, 0.05, ng);
    },
    bell(dest, t, f, v = 0.15, dec = 2.5) {
      const g = out(dest, 0.65);
      [[1, 1, dec], [2.76, 0.4, dec * 0.5], [5.4, 0.2, dec * 0.25], [8.93, 0.08, dec * 0.15]].forEach(([r, a, d]) => {
        const gg = ac.createGain(); env(gg, t, 0.002, v * a, d); gg.connect(g);
        osc('sine', f * r, t, t + d + 0.05, gg);
      });
    },
    saw(dest, t, f, v = 0.12, dec = 0.35) {
      const g = out(dest, 0.35); env(g, t, 0.005, v, dec);
      const lp = filt('lowpass', 3000, 6); lp.connect(g);
      lp.frequency.setValueAtTime(f * 12, t); lp.frequency.exponentialRampToValueAtTime(f * 1.2, t + dec);
      osc('sawtooth', f, t, t + dec + 0.05, lp, -9); osc('sawtooth', f, t, t + dec + 0.05, lp, 9);
    },
    oud(dest, t, f, v = 0.18, dec = 0.9) {
      const g = out(dest, 0.4); env(g, t, 0.003, v, dec);
      const bp = filt('bandpass', f * 3, 1.2); bp.connect(g);
      bp.frequency.setValueAtTime(f * 6, t); bp.frequency.exponentialRampToValueAtTime(f * 2, t + dec);
      const o = osc('sawtooth', f, t, t + dec + 0.05, bp); o.frequency.setValueAtTime(f * 0.985, t); o.frequency.linearRampToValueAtTime(f, t + 0.04);
      osc('triangle', f, t, t + dec + 0.05, g).detune.value = 3;
    },
    glass(dest, t, f, v = 0.14, dec = 1.6) { // watery sine with vibrato
      const g = out(dest, 0.75); env(g, t, 0.01, v, dec);
      const o = osc('sine', f, t, t + dec + 0.1, g);
      const l = ac.createOscillator(); l.frequency.value = 5.5; const lg = ac.createGain(); lg.gain.value = f * 0.006;
      l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dec + 0.1);
      const g2 = ac.createGain(); env(g2, t, 0.005, v * 0.35, dec * 0.4); g2.connect(g); osc('sine', f * 3, t, t + dec, g2);
    },
    flute(dest, t, f, v = 0.1, dur = 0.8) { // shakuhachi-ish breathy tone
      const g = out(dest, 0.7);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.12);
      g.gain.setValueAtTime(v * 0.85, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.4);
      const o = osc('triangle', f * 0.97, t, t + dur + 0.5, g); o.frequency.linearRampToValueAtTime(f, t + 0.15);
      const l = ac.createOscillator(); l.frequency.value = 5; const lg = ac.createGain(); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.012, t + dur);
      l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + 0.5);
      const bp = filt('bandpass', f * 2, 3); const ng = ac.createGain(); ng.gain.value = 0;
      ng.gain.setValueAtTime(0.0001, t); ng.gain.linearRampToValueAtTime(v * 0.9, t + 0.05); ng.gain.exponentialRampToValueAtTime(v * 0.25, t + 0.3); ng.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.3);
      bp.connect(ng); ng.connect(g); noise(t, dur + 0.4, bp);
    },
    bass(dest, t, f, v = 0.22, dec = 0.5, wave = 'sine') {
      const g = out(dest, 0.05); env(g, t, 0.01, v, dec);
      const lp = filt('lowpass', 600, 1); lp.connect(g);
      osc(wave, f, t, t + dec + 0.05, lp); osc('sine', f / 2, t, t + dec + 0.05, g);
    },
    kick(dest, t, v = 0.5, low = 45) {
      const g = out(dest, 0); env(g, t, 0.002, v, 0.35);
      const o = osc('sine', 140, t, t + 0.4, g); o.frequency.exponentialRampToValueAtTime(low, t + 0.12);
    },
    taiko(dest, t, v = 0.5) {
      const g = out(dest, 0.4); env(g, t, 0.003, v, 0.7);
      const o = osc('sine', 110, t, t + 0.8, g); o.frequency.exponentialRampToValueAtTime(52, t + 0.3);
      const lp = filt('lowpass', 900, 1); const ng = ac.createGain(); env(ng, t, 0.002, v * 0.8, 0.12); lp.connect(ng); ng.connect(g); noise(t, 0.2, lp);
    },
    hat(dest, t, v = 0.08, dec = 0.05, hp = 7500) {
      const g = out(dest, 0.15); env(g, t, 0.001, v, dec); const f = filt('highpass', hp, 0.8); f.connect(g); noise(t, dec + 0.05, f);
    },
    snare(dest, t, v = 0.2) {
      const g = out(dest, 0.35); env(g, t, 0.001, v, 0.18); const f = filt('bandpass', 1900, 0.8); f.connect(g); noise(t, 0.25, f);
      const g2 = ac.createGain(); env(g2, t, 0.001, v * 0.6, 0.08); g2.connect(g); osc('triangle', 190, t, t + 0.1, g2);
    },
    wood(dest, t, v = 0.15, f = 1100) {
      const g = out(dest, 0.3); env(g, t, 0.001, v, 0.08);
      osc('sine', f, t, t + 0.1, g); osc('square', f * 1.5, t, t + 0.03, g);
    },
    shaker(dest, t, v = 0.05) {
      const g = out(dest, 0.2); env(g, t, 0.015, v, 0.07); const f = filt('bandpass', 6000, 1.5); f.connect(g); noise(t, 0.12, f);
    },
    darbuka(dest, t, v = 0.3, high = false) {
      const g = out(dest, 0.3); env(g, t, 0.001, v, high ? 0.1 : 0.3);
      const o = osc('sine', high ? 420 : 160, t, t + 0.35, g); o.frequency.exponentialRampToValueAtTime(high ? 300 : 90, t + 0.1);
      if (high) { const f = filt('highpass', 2500); const ng = ac.createGain(); env(ng, t, 0.001, v * 0.4, 0.04); f.connect(ng); ng.connect(g); noise(t, 0.06, f); }
    },
    swell(dest, t, f, v = 0.1, dur = 1.5) { // riser
      const g = out(dest, 0.8); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.6);
      const bp = filt('bandpass', 300, 2); bp.connect(g); bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(6000, t + dur);
      noise(t, dur + 0.7, bp);
      const o = osc('sawtooth', f, t, t + dur + 0.6, bp); o.frequency.exponentialRampToValueAtTime(f * 4, t + dur);
    },
  };

  /* ---------- music theory ---------- */
  function degMidi(d, oct = 0, dd = def) {
    const sc = dd.scale, n = sc.length;
    const o = Math.floor(d / n), i = ((d % n) + n) % n;
    return dd.root + 12 * (oct + o) + sc[i];
  }
  function chordTones(deg, n = 4, dd = def) {
    const step = dd.scale.length >= 7 ? 2 : 2;
    const out = []; for (let i = 0; i < n; i++) out.push(deg + i * step);
    return out;
  }

  /* ---------- sequencer ---------- */
  function schedule() {
    if (!ac || !def || !stageOut) return;
    const spb = 60 / def.bpm / 4; // seconds per 16th
    while (nextTime < ac.currentTime + 0.15) {
      playStep(step, nextTime, spb);
      const s = step, tt = nextTime;
      if (s % 4 === 0) {
        const delay = Math.max(0, (tt - ac.currentTime) * 1000);
        setTimeout(() => beatListeners.forEach((fn) => fn(s / 4)), delay);
      }
      nextTime += spb * (def.swing && step % 2 === 0 ? 1 + def.swing : def.swing && step % 2 === 1 ? 1 - def.swing : 1);
      step = (step + 1) % 16;
    }
  }
  function playStep(s, t, spb) {
    const d = def, o = stageOut, m = d;
    if (s === 0) {
      const prog = m.prog; const bpc = m.barsPerChord || 1;
      chordDeg = prog[Math.floor(bar / bpc) % prog.length];
      if (bar % bpc === 0) {
        const dur = spb * 16 * bpc;
        I.pad(o, t, chordTones(chordDeg, m.pad.voices || 4).map((x) => mtof(degMidi(x, m.pad.oct || 0))), dur, m.pad);
      }
      bar++;
    }
    const L = intensity;
    // arpeggio
    if (L >= 1 && m.arp && s % m.arp.every === 0) {
      const idx = (s / m.arp.every) | 0;
      const pat = m.arp.pattern;
      const pv = pat[idx % pat.length];
      if (pv !== null && (m.arp.density === undefined || Math.random() < m.arp.density + L * 0.08)) {
        const f = mtof(degMidi(chordDeg + pv, m.arp.oct || 1));
        playInst(m.arp.inst, o, t, f, (m.arp.gain || 0.1) * (L >= 3 ? 1 : 0.8));
      }
    }
    // bass
    if (L >= 2 && m.bass && m.bass.pattern[s]) {
      const f = mtof(degMidi(chordDeg + (m.bass.pattern[s] === 2 ? 4 : 0), m.bass.oct || -1));
      I.bass(o, t, f, m.bass.gain || 0.2, m.bass.dec || 0.5, m.bass.wave || 'sine');
    }
    // drums
    if (L >= 3 && m.drums) {
      const dr = m.drums;
      if (dr.kick && dr.kick[s]) (dr.kickInst === 'taiko' ? I.taiko(o, t, 0.4) : dr.kickInst === 'darbuka' ? I.darbuka(o, t, 0.35) : I.kick(o, t, 0.45));
      if (dr.snare && dr.snare[s]) (dr.snareInst === 'wood' ? I.wood(o, t, 0.12, 900) : dr.snareInst === 'darbuka' ? I.darbuka(o, t, 0.25, true) : I.snare(o, t, 0.13));
      if (dr.hat && dr.hat[s]) (dr.hatInst === 'shaker' ? I.shaker(o, t, 0.05) : I.hat(o, t, 0.045 * (s % 4 === 2 ? 1.4 : 1)));
      if (L >= 4 && dr.extra && dr.extra[s]) (dr.extraInst === 'wood' ? I.wood(o, t, 0.08, 1500) : dr.extraInst === 'bell' ? I.bell(o, t, mtof(degMidi(chordDeg + 4, 2)), 0.04, 1) : I.hat(o, t, 0.03, 0.12, 5000));
    }
    // melody phrases (lead)
    if (L >= 2 && m.lead && s % 2 === 0 && Math.random() < (m.lead.density || 0.12)) {
      const deg = chordDeg + pick([0, 2, 4, 1, 3, 5, 7]);
      const f = mtof(degMidi(deg, m.lead.oct || 1));
      playInst(m.lead.inst, o, t, f, m.lead.gain || 0.07, spb * pick([2, 4, 6]));
    }
  }
  function playInst(name, dest, t, f, v, dur) {
    switch (name) {
      case 'koto': return I.koto(dest, t, f, v);
      case 'bell': return I.bell(dest, t, f, v);
      case 'saw': return I.saw(dest, t, f, v);
      case 'oud': return I.oud(dest, t, f, v);
      case 'glass': return I.glass(dest, t, f, v);
      case 'flute': return I.flute(dest, t, f, v, dur || 0.6);
      default: return I.pluck(dest, t, f, v, 0.6, name === 'square' ? 'square' : 'triangle');
    }
  }

  function setStage(musicDef) {
    if (!ac) { pendingDef = musicDef; return; }
    if (def === musicDef && stageOut) return;
    const t = ac.currentTime;
    if (stageOut) {
      const old = stageOut;
      old.gain.cancelScheduledValues(t); old.gain.setValueAtTime(old.gain.value, t); old.gain.linearRampToValueAtTime(0.0001, t + 2.2);
      setTimeout(() => { try { old.disconnect(); } catch (e) {} }, 3500);
    }
    stageOut = ac.createGain(); stageOut.gain.setValueAtTime(0.0001, t); stageOut.gain.linearRampToValueAtTime(duckLevel, t + 2.0);
    stageOut.connect(musicBus);
    def = musicDef; bar = 0; step = 0; nextTime = Math.max(nextTime, t + 0.05);
  }
  function setIntensity(v) { intensity = v; }
  function duck(on) {
    duckLevel = on ? 0.25 : 1;
    if (!ac || !stageOut) return;
    const t = ac.currentTime; stageOut.gain.cancelScheduledValues(t); stageOut.gain.setValueAtTime(stageOut.gain.value, t); stageOut.gain.linearRampToValueAtTime(duckLevel, t + 0.4);
  }
  function applyVol() {
    if (!ac) return; const t = ac.currentTime;
    master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(muted ? 0 : volume, t + 0.1);
    try { localStorage.setItem('tw_vol', volume); localStorage.setItem('tw_mute', muted ? '1' : '0'); } catch (e) {}
  }
  function setVolume(v) { volume = clamp(v, 0, 1); applyVol(); }
  function toggleMute() { muted = !muted; applyVol(); return muted; }

  /* ---------- SFX (harmonised with the current stage) ---------- */
  function nextQuant(div = 2) { // next point on the 16th/32nd grid so clears land in time
    const g = 60 / def.bpm / 4 / div, now = ac.currentTime + 0.005;
    const k = Math.floor((nextTime - now) / g);
    return Math.max(now, nextTime - k * g);
  }
  function sfxInst(f, v, t, dur) { playInst(def.sfx || 'pluck', sfxBus, t, f, v, dur); }
  const sfx = {
    move(dir) {
      if (!ac || !def) return;
      moveIdx = clamp(moveIdx + dir, 0, 14);
      const tones = chordTones(chordDeg, 3);
      const d = tones[moveIdx % 3] + Math.floor(moveIdx / 3) * def.scale.length - def.scale.length;
      sfxInst(mtof(degMidi(d, 1)), 0.07, ac.currentTime, 0.25);
    },
    rotate(ok) {
      if (!ac || !def) return; const t = ac.currentTime;
      const d = chordDeg + pick([2, 4, 6]);
      sfxInst(mtof(degMidi(d, 2)), ok ? 0.075 : 0.03, t, 0.3);
      if (ok) I.hat(sfxBus, t, 0.015, 0.04, 9000);
    },
    soft() { if (!ac || !def) return; I.hat(sfxBus, ac.currentTime, 0.012, 0.025, 6000); },
    hard(dist) {
      if (!ac || !def) return; const t = ac.currentTime;
      I.kick(sfxBus, t, 0.4, 40);
      I.bass(sfxBus, t, mtof(degMidi(chordDeg, -1)), 0.22, 0.6, 'triangle');
      sfxInst(mtof(degMidi(chordDeg, 1)), 0.06, t + 0.01, 0.4);
      const g = out(sfxBus, 0.3); env(g, t, 0.001, 0.08, 0.15); const f = filt('lowpass', 1200); f.connect(g); noise(t, 0.2, f);
    },
    lock() { if (!ac || !def) return; const t = ac.currentTime; I.wood(sfxBus, t, 0.04, 700); sfxInst(mtof(degMidi(chordDeg + 4, 0)), 0.04, t, 0.3); },
    hold() {
      if (!ac || !def) return; const t = ac.currentTime;
      [0, 2, 4].forEach((d, i) => sfxInst(mtof(degMidi(chordDeg + d, 2)), 0.05, t + i * 0.04, 0.3));
    },
    clear(n, tspin, combo) {
      if (!ac || !def) return; const t0 = nextQuant(2); const sp = 60 / def.bpm / 8;
      const cnt = 3 + n * 2 + (tspin ? 2 : 0);
      const base = chordDeg + Math.min(combo, 6);
      for (let i = 0; i < cnt; i++) sfxInst(mtof(degMidi(base + i * 2, 1 + (i > 6 ? 0 : 0))), 0.09 - i * 0.004, t0 + i * sp, 0.6);
      I.bell(sfxBus, t0, mtof(degMidi(base, 2)), 0.06, 1.6);
      I.pad(sfxBus, t0, chordTones(base, 3).map((x) => mtof(degMidi(x, 1))), 0.6 + n * 0.3, { wave: 'triangle', cutoff: 3000, gain: 0.06 + n * 0.02, detune: 10 });
      if (n >= 4 || tspin) {
        I.swell(sfxBus, t0, 110, 0.05, 0.6);
        const g = out(sfxBus, 0.6); env(g, t0, 0.005, 0.12, 1.8); const f = filt('highpass', 4000); f.connect(g); noise(t0, 2, f);
        I.kick(sfxBus, t0, 0.5, 38);
        chordTones(base, 4).forEach((x, i) => I.bell(sfxBus, t0 + 0.12 + i * 0.06, mtof(degMidi(x, 2)), 0.05, 2.5));
      }
    },
    stage() {
      if (!ac || !def) return; const t = ac.currentTime;
      I.swell(sfxBus, t, 80, 0.09, 1.8);
      for (let i = 0; i < 10; i++) I.bell(sfxBus, t + 0.6 + i * 0.07, mtof(degMidi(chordDeg + i, 2)), 0.05, 2);
      I.taiko(sfxBus, t + 1.8, 0.5);
    },
    levelUp() { if (!ac || !def) return; const t = ac.currentTime; [0, 2, 4, 7].forEach((d, i) => I.bell(sfxBus, t + i * 0.08, mtof(degMidi(chordDeg + d, 2)), 0.05, 1.5)); },
    gameOver() {
      if (!ac || !def) return; const t = ac.currentTime;
      for (let i = 0; i < 8; i++) sfxInst(mtof(degMidi(chordDeg + 7 - i, 1)), 0.08, t + i * 0.13, 0.8);
      I.pad(sfxBus, t + 1, chordTones(chordDeg - 2, 3).map((x) => mtof(degMidi(x, 0))), 2.5, { wave: 'triangle', cutoff: 1500, gain: 0.1 });
    },
    ui(k = 0) { if (!ac || !def) return; sfxInst(mtof(degMidi(chordDeg + k, 2)), 0.05, ac.currentTime, 0.3); },
  };

  return {
    init, setStage, setIntensity, setVolume, toggleMute, duck, sfx,
    onBeat: (fn) => beatListeners.push(fn),
    get ready() { return !!ac; }, get muted() { return muted; }, get volume() { return volume; },
  };
})();
