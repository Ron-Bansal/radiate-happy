"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ScrollFedReel() {
  const sceneRef = useRef(null);
  const [isHudOpen, setIsHudOpen] = useState(false);

  useEffect(() => {
    // ===== Globals & constants
    let mode = "reel";
    let isAnimating = false;

    const SEGMENTS = 600;
    const SLIDE_W = 0.84;
    const SLIDE_H = 0.52;

    // Seed some movies / shows for the reel
    const watched = [
      { title: "Superman", year: 2025, type: "movie" },
      { title: "Thunderbolts", year: 2025, type: "movie" },
      { title: "Spirited Away", year: 2001, type: "movie" },
      { title: "The Ba***ds of Bollywood", year: null, type: "tv" },
      { title: "Nobody", year: 2021, type: "movie" },
      { title: "Nobody 2", year: 2025, type: "movie" },
      { title: "A Nice Indian Boy", year: null, type: "movie" },
      { title: "The Paper", year: null, type: "movie" },
      { title: "Virgin Island", year: null, type: "movie" },
      { title: "Ocean’s Twelve", year: 2004, type: "movie" },
      { title: "Friendship", year: null, type: "movie" },
      { title: "Dept Q", year: null, type: "tv" },
      { title: "Adults", year: null, type: "tv" },
      { title: "Mountainhead", year: null, type: "movie" },
      { title: "Common Side Effects", year: null, type: "tv" },
      { title: "Avatar: The Way of Water", year: 2022, type: "movie" },
      { title: "Death of a Unicorn", year: null, type: "movie" },
      { title: "The Iron Claw", year: 2023, type: "movie" },
      { title: "Novocaine", year: null, type: "movie" },
      { title: "Mickey 17", year: 2025, type: "movie" },
      { title: "Adolescence", year: null, type: "movie" },
      { title: "DanDaDan", year: 2024, type: "tv" },
      { title: "Derry Girls", year: 2018, type: "tv" },
      { title: "I Don't Understand You", year: null, type: "movie" },
      { title: "The Rookie", year: 2018, type: "tv" },
      { title: "The Studio", year: null, type: "tv" },
      { title: "Bob’s Burgers", year: 2011, type: "tv" },
      { title: "It's Always Sunny in Philadelphia", year: 2005, type: "tv" },
      { title: "Conan O'Brien Must Go", year: 2024, type: "tv" },
      { title: "In the Know", year: 2024, type: "tv" },
      { title: "Late Bloomer", year: 2024, type: "tv" },
      { title: "Normal People", year: 2020, type: "tv" },
      { title: "Scavengers Reign", year: 2023, type: "tv" },
      { title: "BoJack Horseman", year: 2014, type: "tv" },
      {
        title: "Heavenly Delusion (Tengoku Daimakyo)",
        year: 2023,
        type: "tv",
      },
      { title: "The Midnight Gospel", year: 2020, type: "tv" },
      { title: "Kim’s Convenience", year: 2016, type: "tv" },
      { title: "Vinland Saga", year: 2019, type: "tv" },
      { title: "Baki", year: 2018, type: "tv" },
      { title: "Alice in Borderland", year: 2020, type: "tv" },
      { title: "Ghosts", year: 2019, type: "tv" },
      { title: "Dark", year: 2017, type: "tv" },
      { title: "Malcolm in the Middle", year: 2000, type: "tv" },
      { title: "Fleabag", year: 2016, type: "tv" },
      { title: "Interview with the Vampire", year: 2022, type: "tv" },
      { title: "Peacemaker", year: 2022, type: "tv" },
      { title: "Gen V", year: 2023, type: "tv" },
      { title: "Dexter", year: 2006, type: "tv" },
      { title: "Platonic", year: 2023, type: "tv" },
      { title: "Bolt", year: 2008, type: "movie" },
    ];
    const slideCount = watched.length;
    let gridScroll = 0;
    let gridScrollVelocity = 0;
    let gridScrollBounds = { min: 0, max: 0 };

    // ===== Background
    const body = document.body;
    function hexToRgb(hex) {
      hex = hex.replace("#", "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      const num = parseInt(hex, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    function setRadialBg(hex) {
      const rgb = hexToRgb(hex);
      body.style.background =
        "radial-gradient(circle at 50% 35%, rgba(" +
        rgb.r +
        "," +
        rgb.g +
        "," +
        rgb.b +
        ",0.18), rgba(" +
        rgb.r +
        "," +
        rgb.g +
        "," +
        rgb.b +
        ",0.07) 45%, rgba(" +
        rgb.r +
        "," +
        rgb.g +
        "," +
        rgb.b +
        ",0.0) 80%), " +
        hex;
    }
    setRadialBg("#f6f8fb");
    const bgPicker = document.getElementById("bgPicker");
    const swatches = document.querySelectorAll(".swatch");
    for (let si = 0; si < swatches.length; si++) {
      swatches[si].addEventListener("click", function () {
        if (!bgPicker) return;
        bgPicker.value = this.dataset.col;
        setRadialBg(bgPicker.value);
      });
    }
    if (bgPicker) {
      bgPicker.addEventListener("input", function () {
        setRadialBg(bgPicker.value);
      });
    }

    // ===== UI
    const mount = document.getElementById("scene");
    // const fab = document.getElementById("fab");
    // const hud = document.getElementById("hud");
    // if (fab && hud) {
    //   fab.addEventListener("click", function () {
    //     hud.classList.toggle("open");
    //   });
    // }
    const btnReel = document.getElementById("btnReel");
    const btnGrid = document.getElementById("btnGrid");
    function setModeButtons(state) {
      if (btnReel) btnReel.classList.toggle("active", state === "reel");
      if (btnGrid) btnGrid.classList.toggle("active", state === "grid");
    }
    setModeButtons("reel");

    // ===== Three.js setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mount) mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0.2, 8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    const reelGroup = new THREE.Group();
    scene.add(reelGroup);

    // ===== Film texture
    function makeFilmTexture(opts) {
      opts = opts || {};
      const w = opts.w || 2048,
        h = opts.h || 220;
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d");
      g.fillStyle = "#000";
      g.fillRect(0, 0, w, h);
      const railH = Math.round(h * 0.22);
      g.clearRect(0, railH, w, h - railH * 2);
      const step = 78,
        margin = 18,
        holeW = 26,
        holeH = 32;
      const topY = Math.round(railH * 0.35),
        botY = h - Math.round(railH * 0.35) - holeH;
      for (let x = margin; x < w - margin; x += step) {
        g.clearRect(x, topY, holeW, holeH);
        g.clearRect(x, botY, holeW, holeH);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(10, 1);
      return tex;
    }
    const filmTex = makeFilmTexture();

    // ===== Ribbon geometry
    const geom = new THREE.BufferGeometry();
    const verts = new Float32Array((SEGMENTS + 1) * 2 * 3);
    const uvs = new Float32Array((SEGMENTS + 1) * 2 * 2);
    const idx = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = (i + 1) * 2;
      const d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    geom.setIndex(idx);
    geom.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    const filmMat = new THREE.MeshBasicMaterial({
      map: filmTex,
      transparent: true,
      alphaTest: 0.01,
      side: THREE.DoubleSide,
      color: 0x000000,
      depthWrite: false,
      depthTest: true,
    });
    const filmMesh = new THREE.Mesh(geom, filmMat);
    reelGroup.add(filmMesh);

    // ===== Slides
    const slideGroup = new THREE.Group();
    reelGroup.add(slideGroup);
    const slides = [];
    function makePlaceholderTex(text) {
      const w = 512,
        h = 320,
        c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d");
      g.fillStyle = "#eef3ff";
      g.fillRect(0, 0, w, h);
      g.fillStyle = "#0b1220";
      g.font = "700 42px Arial, Helvetica, sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(text, w / 2, h / 2);
      return new THREE.CanvasTexture(c);
    }
    for (let i = 0; i < slideCount; i++) {
      const tex = makePlaceholderTex("Frame " + (i + 1));
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(SLIDE_W, SLIDE_H), mat);
      m.renderOrder = 2;
      slides.push(m);
      slideGroup.add(m);
    }
    function slideAspect(mesh) {
      const t = mesh.material && mesh.material.map;
      const img = t && t.image;
      const w = img && (img.naturalWidth || img.videoWidth || img.width);
      const h = img && (img.naturalHeight || img.videoHeight || img.height);
      if (w && h) return w / h;
      return 1.0;
    }

    // ===== Helix helpers
    function helixAt(t, phase, radius, pitch, twists, stripLen) {
      const a = t * twists * Math.PI * 2 + phase;
      return new THREE.Vector3(
        radius * Math.cos(a),
        (t - 0.5) * stripLen * (pitch / 2),
        radius * Math.sin(a)
      );
    }
    function frameFromPos(p1, p2) {
      const T = p2.clone().sub(p1).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const Nu = up.clone().sub(T.clone().multiplyScalar(up.dot(T)));
      if (!isFinite(Nu.lengthSq()) || Nu.lengthSq() < 1e-6) Nu.set(1, 0, 0);
      Nu.normalize();
      const B = T.clone().cross(Nu).normalize();
      return { p: p1, T, N: Nu, B };
    }

    // ===== Controls (query by id to keep parity)
    const twistsEl = document.getElementById("twists");
    const radiusEl = document.getElementById("radius");
    const pitchEl = document.getElementById("pitch");
    const tiltEl = document.getElementById("tilt");
    const stripWidthEl = document.getElementById("stripWidth");
    const stripLengthEl = document.getElementById("stripLength");
    const frameSpacingEl = document.getElementById("frameSpacing");
    const stripOpacityEl = document.getElementById("stripOpacity");
    const textureStrengthEl = document.getElementById("textureStrength");
    const uprSpreadEl = document.getElementById("uprightSpread");
    const uprTopEl = document.getElementById("uprTop");
    const uprBotEl = document.getElementById("uprBot");
    const radTopEl = document.getElementById("radTop");
    const radBotEl = document.getElementById("radBot");
    const feedRatioEl = document.getElementById("feedRatio");
    const reverseDirectionEl = document.getElementById("reverseDirection");
    const reverseOrderEl = document.getElementById("reverseOrder");

    if (reverseDirectionEl) {
      reverseDirectionEl.addEventListener("change", function () {
        updateGeometry(scrollProgress());
        refreshScrollSpace();
      });
    }

    [stripLengthEl, frameSpacingEl].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", refreshScrollSpace);
    });

    // ===== Storage for curve frames
    const P = new Array(SEGMENTS + 1);
    const BX = new Array(SEGMENTS + 1);
    const NX = new Array(SEGMENTS + 1);
    const TX = new Array(SEGMENTS + 1);

    let stripPlacement = {
      start: 0,
      step: slideCount > 1 ? 1 / slideCount : 0,
      totalSpan: slideCount > 1 ? (slideCount - 1) / slideCount : 0,
      rangeMin: 0,
      rangeMax: 1,
    };

    function sampleStripFrame(t) {
      const span = stripPlacement.rangeMax - stripPlacement.rangeMin;
      if (span <= 0) {
        const fallback = {
          pos: P[0] ? P[0].clone() : new THREE.Vector3(),
          bx: BX[0] ? BX[0].clone() : new THREE.Vector3(1, 0, 0),
          nx: NX[0] ? NX[0].clone() : new THREE.Vector3(0, 1, 0),
          tx: TX[0] ? TX[0].clone() : new THREE.Vector3(0, 0, 1),
        };
        return fallback;
      }
      const normalized = (t - stripPlacement.rangeMin) / span;
      const clamped = Math.min(1, Math.max(0, normalized));
      const exact = clamped * SEGMENTS;
      const idx0 = Math.floor(exact);
      const idx1 = Math.min(SEGMENTS, idx0 + 1);
      const alpha = exact - idx0;
      const p0 = P[idx0] || P[0] || new THREE.Vector3();
      const p1 = P[idx1] || p0;
      const b0 = BX[idx0] || BX[0] || new THREE.Vector3(1, 0, 0);
      const b1 = BX[idx1] || b0;
      const n0 = NX[idx0] || NX[0] || new THREE.Vector3(0, 1, 0);
      const n1 = NX[idx1] || n0;
      const t0 = TX[idx0] || TX[0] || new THREE.Vector3(0, 0, 1);
      const t1 = TX[idx1] || t0;
      return {
        pos: p0.clone().lerp(p1, alpha),
        bx: b0.clone().lerp(b1, alpha),
        nx: n0.clone().lerp(n1, alpha),
        tx: t0.clone().lerp(t1, alpha),
      };
    }

    function updateGeometry(scroll) {
      const reverse = !!(reverseDirectionEl && reverseDirectionEl.checked);
      const STRIP_LEN = parseFloat(stripLengthEl.value);
      const offsetAmount = 0.15;
      const effectiveScroll = reverse
        ? scroll - offsetAmount
        : 1 - scroll + offsetAmount;
      const phase = effectiveScroll * Math.PI * 4;
      const turns = phase / (Math.PI * 2);
      const feedRatio = parseFloat((feedRatioEl && feedRatioEl.value) || 0);
      const paramShift = (feedRatio * turns) % 1;
      const twists = parseFloat(twistsEl.value);
      const baseR = parseFloat(radiusEl.value);
      const pitch = parseFloat(pitchEl.value);
      const stripW = parseFloat(stripWidthEl.value);
      const halfW = stripW / 2;
      let v = 0,
        u = 0;
      const uprSpread = parseFloat(uprSpreadEl.value);
      const uprTop = THREE.MathUtils.degToRad(parseFloat(uprTopEl.value || 0));
      const uprBot = THREE.MathUtils.degToRad(parseFloat(uprBotEl.value || 0));
      const radTop = parseFloat(radTopEl.value || 0);
      const radBot = parseFloat(radBotEl.value || 0);
      const spacingInput = parseFloat(frameSpacingEl && frameSpacingEl.value) || 1;
      const spacingFactor = 0.4 + spacingInput * 1.1;
      const safeCount = Math.max(1, slideCount);
      const base = 1 / safeCount;
      const step = slideCount > 1 ? base * spacingFactor : 0;
      const totalSpan = step * Math.max(0, slideCount - 1);
      const start = slideCount > 1 ? 0.5 * (1 - totalSpan) : 0;
      const spanExcess = Math.max(0, totalSpan - 1);
      const leadPadBase = 0.12 + spanExcess * 0.15;
      const trailPadBase = 0.34 + spanExcess * 0.3;
      const leadPad = reverse ? leadPadBase : trailPadBase;
      const trailPad = reverse ? trailPadBase : leadPadBase;
      const rangeMin = start - leadPad;
      const rangeMax = start + totalSpan + trailPad;
      const rangeSpan = rangeMax - rangeMin || 1;

      stripPlacement = {
        start,
        step,
        totalSpan,
        rangeMin,
        rangeMax,
      };

      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        const tNorm = rangeMin + (rangeSpan * i) / SEGMENTS;
        const tRaw = tNorm + paramShift;
        const tShift = tRaw % 1;
        const wrappedShift = tShift < 0 ? tShift + 1 : tShift;
        const yApprox = (wrappedShift - 0.5) * STRIP_LEN * (pitch / 2);
        const topBias = 0.5 + 0.5 * Math.tanh(yApprox * 1.2);
        const radiusEff = baseR + topBias * radTop + (1 - topBias) * radBot;
        const p1 = helixAt(tRaw, phase, radiusEff, pitch, twists, STRIP_LEN);
        const p2 = helixAt(
          tRaw + 1e-3,
          phase,
          radiusEff,
          pitch,
          twists,
          STRIP_LEN
        );
        const f = frameFromPos(p1, p2);
        const centerFalloff = 1.0 - Math.min(1, Math.abs(t - 0.5) * 2.0);
        const softened = centerFalloff * 0.5 + 0.5;
        const weight = uprSpread * 0.5 + (1.0 - uprSpread) * softened;
        const uprightTheta =
          (uprTop * topBias + uprBot * (1 - topBias)) * weight;
        const ct = Math.cos(uprightTheta),
          st = Math.sin(uprightTheta);
        const Bx = f.B.clone().multiplyScalar(ct).addScaledVector(f.N, st);
        const Nx = f.N.clone().multiplyScalar(ct).addScaledVector(f.B, -st);

        P[i] = f.p;
        BX[i] = Bx;
        NX[i] = Nx;
        TX[i] = f.T;
        const L = f.p.clone().addScaledVector(Bx, -halfW);
        const R = f.p.clone().addScaledVector(Bx, +halfW);
        verts[v++] = L.x;
        verts[v++] = L.y;
        verts[v++] = L.z;
        verts[v++] = R.x;
        verts[v++] = R.y;
        verts[v++] = R.z;
        const vv = ((tNorm - rangeMin) / rangeSpan) * 10.0;
        uvs[u++] = 0;
        uvs[u++] = vv;
        uvs[u++] = 1;
        uvs[u++] = vv;
      }
      geom.attributes.position.needsUpdate = true;
      geom.attributes.uv.needsUpdate = true;
      geom.computeVertexNormals();

      if (mode !== "reel" || isAnimating) return;

      const railFrac = 0.22;
      const windowH = stripW * (1 - 2 * railFrac);
      const frameH = windowH * 1.32;
      const maxW = stripW * 0.96;

      for (let i = 0; i < slides.length; i++) {
        const tt = stripPlacement.start + i * stripPlacement.step;
        const frame = sampleStripFrame(tt);
        const { pos, bx, nx, tx } = frame;
        slides[i].position.copy(pos.clone().addScaledVector(nx, 0.02));
        const angle = -Math.PI / 2,
          cA = Math.cos(angle),
          sA = Math.sin(angle);
        const bxr = bx.clone().multiplyScalar(cA).addScaledVector(tx, sA);
        const txr = tx.clone().multiplyScalar(cA).addScaledVector(bx, -sA);
        const basis = new THREE.Matrix4().makeBasis(bxr, txr, nx);
        slides[i].setRotationFromMatrix(basis);
        const asp = slideAspect(slides[i]);
        const frameW = Math.min(frameH * asp, maxW);
        slides[i].scale.set(frameW / SLIDE_W, frameH / SLIDE_H, 1);
      }
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      refreshScrollSpace();
      const layout = gridTargets(gridScroll);
      gridScrollBounds = layout.bounds;
      gridScroll = layout.scroll;
      if (mode === "grid" && !isAnimating) {
        applySlideTargets(layout.targets);
      }
    }
    window.addEventListener("resize", onResize);
    refreshScrollSpace();
    updateGeometry(scrollProgress());

    function scrollProgress() {
      const sp = document.querySelector(".scrollspace");
      const max = (sp ? sp.offsetHeight : 0) - window.innerHeight;
      return Math.min(1, Math.max(0, window.scrollY / Math.max(1, max)));
    }

    function refreshScrollSpace() {
      const sp = document.querySelector(".scrollspace");
      if (!sp) return;
      const stripLen = parseFloat((stripLengthEl && stripLengthEl.value) || 14);
      const spacingInput = parseFloat((frameSpacingEl && frameSpacingEl.value) || 1);
      const spacingFactor = 0.4 + spacingInput * 1.1;
      const perFrame = 210 * spacingFactor;
      const baseHeight =
        window.innerHeight * 1.8 + stripLen * 140 + slides.length * perFrame;
      const heightPx = Math.max(window.innerHeight * 4, baseHeight);
      sp.style.height = `${Math.round(heightPx)}px`;
      const leadBufferBase = window.innerHeight * 0.9;
      const trailBufferBase =
        window.innerHeight * (1.35 + Math.min(spacingFactor, 3) * 0.25);
      const reverse = !!(reverseDirectionEl && reverseDirectionEl.checked);
      const padTop = reverse ? leadBufferBase : trailBufferBase;
      const padBottom = reverse ? trailBufferBase : leadBufferBase;
      sp.style.paddingTop = `${Math.round(padTop)}px`;
      sp.style.paddingBottom = `${Math.round(padBottom)}px`;
    }

    function tick() {
      const s = scrollProgress();
      const op = parseFloat((stripOpacityEl && stripOpacityEl.value) || 1);
      filmMat.opacity = Math.min(op, 1.0);
      const strength = parseFloat(
        (textureStrengthEl && textureStrengthEl.value) || 1
      );
      const railBoost = op > 1 ? Math.min(op, 5.0) : 1;
      filmMat.color.setScalar(
        Math.max(0.0, Math.min(3.0, strength * railBoost))
      );
      reelGroup.rotation.x = THREE.MathUtils.degToRad(parseFloat(tiltEl.value));

      if (mode === "grid") {
        if (!isAnimating) {
          gridScroll += gridScrollVelocity;
          gridScrollVelocity *= 0.9;
          if (Math.abs(gridScrollVelocity) < 1e-4) gridScrollVelocity = 0;
          const gridLayout = gridTargets(gridScroll);
          gridScrollBounds = gridLayout.bounds;
          if (gridLayout.scroll !== gridScroll) {
            gridScroll = gridLayout.scroll;
            gridScrollVelocity *= -0.35;
            if (Math.abs(gridScrollVelocity) < 1e-4) gridScrollVelocity = 0;
          }
          applySlideTargets(gridLayout.targets);
        }
      } else {
        updateGeometry(s);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();

    // ===== Reel/Grid animation helpers
    function gridTargets(scrollValue = gridScroll) {
      const cols = Math.max(2, Math.floor(window.innerWidth / 260));
      const d = 3.2;
      const fov = THREE.MathUtils.degToRad(camera.fov);
      const h = 2 * d * Math.tan(fov / 2);
      const w = h * camera.aspect;
      const cellW = (w / cols) * 0.75;
      const cellH = cellW * 1.2;
      const rows = Math.ceil(slides.length / cols);
      const startX = -w / 2 + cellW / 2;
      const startY = ((rows - 1) * cellH) / 2;

      const viewTop = h / 2;
      const viewBottom = -h / 2;
      const slack = cellH * 1.35;
      const margin = cellH * 0.55;
      let minScroll = viewTop - margin - startY - slack;
      let maxScroll = viewBottom + margin + startY + slack;
      if (maxScroll < minScroll) {
        const mid = (minScroll + maxScroll) / 2;
        minScroll = mid;
        maxScroll = mid;
      }
      const clampedScroll = THREE.MathUtils.clamp(
        scrollValue,
        minScroll,
        maxScroll
      );

      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward).normalize();
      const right = forward
        .clone()
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize();
      const up = new THREE.Vector3(0, 1, 0);

      reelGroup.updateMatrixWorld(true);
      const parentQuat = reelGroup.getWorldQuaternion(new THREE.Quaternion());
      const invParent = parentQuat.clone().invert();

      const targets = [];
      for (let i = 0; i < slides.length; i++) {
        const r = Math.floor(i / cols),
          c = i % cols;
        const x = startX + c * cellW,
          y = startY - r * cellH + clampedScroll,
          z = -d;
        const camSpace = new THREE.Vector3(x, y, z);
        const world = camSpace.clone().applyMatrix4(camera.matrixWorld);
        const localPos = world.clone();
        reelGroup.worldToLocal(localPos);

        const asp = slideAspect(slides[i]);
        let fw = cellH * asp;
        let fh = cellH;
        if (fw > cellW) {
          fw = cellW;
          fh = fw / asp;
        }
        const fit = 0.88;
        fw *= fit;
        fh *= fit;

        const basis = new THREE.Matrix4().makeBasis(
          right,
          up,
          forward.clone().negate()
        );
        const worldQuat = new THREE.Quaternion().setFromRotationMatrix(basis);
        const localQuat = worldQuat.clone().premultiply(invParent);

        targets.push({
          pos: localPos,
          quat: localQuat,
          scale: new THREE.Vector3(fw / SLIDE_W, fh / SLIDE_H, 1),
        });
      }
      return {
        targets,
        bounds: { min: minScroll, max: maxScroll },
        scroll: clampedScroll,
      };
    }

    const initialGrid = gridTargets(gridScroll);
    gridScrollBounds = initialGrid.bounds;
    gridScroll = initialGrid.scroll;

    function stripTargets() {
      const stripW = parseFloat(stripWidthEl.value);
      const railFrac = 0.22;
      const windowH = stripW * (1 - 2 * railFrac);
      const frameH = windowH * 1.32;
      const maxW = stripW * 0.96;
      const targs = [];
      for (let i = 0; i < slides.length; i++) {
        const tt = stripPlacement.start + i * stripPlacement.step;
        const frame = sampleStripFrame(tt);
        const { pos, bx, nx, tx } = frame;
        const angle = -Math.PI / 2,
          cA = Math.cos(angle),
          sA = Math.sin(angle);
        const bxr = bx.clone().multiplyScalar(cA).addScaledVector(tx, sA);
        const txr = tx.clone().multiplyScalar(cA).addScaledVector(bx, -sA);
        const m = new THREE.Matrix4().makeBasis(bxr, txr, nx);
        const quat = new THREE.Quaternion().setFromRotationMatrix(m);
        const asp = slideAspect(slides[i]);
        const frameW = Math.min(frameH * asp, maxW);
        targs.push({
          pos: pos.clone().addScaledVector(nx, 0.02),
          quat: quat,
          scale: new THREE.Vector3(frameW / SLIDE_W, frameH / SLIDE_H, 1),
        });
      }
      return targs;
    }

    function tweenSlides(toTargets, ms) {
      if (!ms) ms = 750;
      isAnimating = true;
      const starts = slides.map((s) => ({
        pos: s.position.clone(),
        quat: s.quaternion.clone(),
        scale: s.scale.clone(),
      }));
      const t0 = performance.now();
      function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      function step() {
        const t = Math.min(1, (performance.now() - t0) / ms);
        const e = ease(t);
        for (let i = 0; i < slides.length; i++) {
          slides[i].position.lerpVectors(starts[i].pos, toTargets[i].pos, e);
          slides[i].quaternion.slerpQuaternions(
            starts[i].quat,
            toTargets[i].quat,
            e
          );
          slides[i].scale.lerpVectors(starts[i].scale, toTargets[i].scale, e);
        }
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          isAnimating = false;
        }
      }
      requestAnimationFrame(step);
    }

    function applySlideTargets(toTargets) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].position.copy(toTargets[i].pos);
        slides[i].quaternion.copy(toTargets[i].quat);
        slides[i].scale.copy(toTargets[i].scale);
      }
    }

    function onGridWheel(e) {
      if (mode !== "grid") return;
      if (typeof e.preventDefault === "function") e.preventDefault();
      const speed = 0.0015;
      gridScrollVelocity += e.deltaY * 0.00075;
      gridScroll += e.deltaY * speed;
      if (gridScroll < gridScrollBounds.min) {
        gridScroll = gridScrollBounds.min;
        gridScrollVelocity *= 0.35;
      } else if (gridScroll > gridScrollBounds.max) {
        gridScroll = gridScrollBounds.max;
        gridScrollVelocity *= 0.35;
      }
    }

    window.addEventListener("wheel", onGridWheel, { passive: false });

    function switchToGrid() {
      if (mode === "grid") return;
      setModeButtons("grid");
      mode = "grid";
      const sp = document.querySelector(".scrollspace");
      if (sp) sp.style.display = "none";
      filmMesh.visible = false;
      const grid = gridTargets(gridScroll);
      gridScrollBounds = grid.bounds;
      gridScroll = grid.scroll;
      gridScrollVelocity = 0;
      tweenSlides(grid.targets, 750);
    }
    function switchToReel() {
      if (mode === "reel") return;
      setModeButtons("reel");
      mode = "reel";
      const sp = document.querySelector(".scrollspace");
      if (sp) sp.style.display = "";
      filmMesh.visible = true;
      gridScrollVelocity = 0;
      refreshScrollSpace();
      tweenSlides(stripTargets(), 750);
    }
    if (btnGrid) btnGrid.addEventListener("click", switchToGrid);
    if (btnReel) btnReel.addEventListener("click", switchToReel);

    // ===== Public image helpers
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const maxAniso =
      (renderer.capabilities.getMaxAnisotropy &&
        renderer.capabilities.getMaxAnisotropy()) ||
      1;

    function setSlide(index, url) {
      if (index < 0 || index >= slides.length || !url) return;
      loader.load(
        url,
        function (t) {
          t.anisotropy = maxAniso;
          slides[index].material.map = t;
          slides[index].material.needsUpdate = true;
        },
        undefined,
        function () {
          /* ignore */
        }
      );
    }
    function setSlides(arr) {
      if (!Array.isArray(arr)) return;
      arr.forEach((u, i) => {
        if (i < slides.length) setSlide(i, u);
      });
    }
    function setAllSlides(url) {
      for (let i = 0; i < slides.length; i++) setSlide(i, url);
    }
    function setSlideFromCanvas(index, drawFn) {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 320;
      const g = c.getContext("2d");
      if (typeof drawFn === "function") drawFn(g, c);
      const t = new THREE.CanvasTexture(c);
      t.anisotropy = maxAniso;
      slides[index].material.map = t;
      slides[index].material.needsUpdate = true;
    }
    function setSlideDataURL(index, dataURL) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        const t = new THREE.Texture(img);
        t.needsUpdate = true;
        t.anisotropy = maxAniso;
        slides[index].material.map = t;
        slides[index].material.needsUpdate = true;
      };
      img.src = dataURL;
    }
    // Expose minimal getters for picking
    window.__bindSlideMeta = () => slides;
    window.__getReelCamera = () => camera;
    window.setSlide = setSlide;
    window.setSlides = setSlides;
    window.setAllSlides = setAllSlides;
    window.setSlideFromCanvas = setSlideFromCanvas;
    window.setSlideDataURL = setSlideDataURL;
    window.setRadialBg = setRadialBg;

    // ================= TMDB MINI CLIENT =================
    const TMDB = (() => {
      const API = "https://api.themoviedb.org/3";
      const KEY = "c097f201a408eb484d5f0815798dd91e"; // replace for live use
      const TMDB_ENABLED = !!(
        KEY &&
        !KEY.includes("<<") &&
        KEY.trim().length > 10
      );
      let cfg = null;

      async function safeFetch(url) {
        try {
          const r = await fetch(url);
          if (!r.ok) return null;
          return await r.json();
        } catch (e) {
          return null;
        }
      }
      async function getCfg() {
        if (!TMDB_ENABLED) return null;
        if (cfg) return cfg;
        cfg = await safeFetch(`${API}/configuration?api_key=${KEY}`);
        return cfg;
      }
      async function imgUrl(path, size = "w500") {
        if (!TMDB_ENABLED || !path) return null;
        const c = await getCfg();
        const base = c && c.images && c.images.secure_base_url;
        if (!base) return null;
        return `${base}${size}${path}`;
      }
      // Movies
      async function findMovieByTitle(title, year) {
        if (!TMDB_ENABLED) return null;
        const q = new URLSearchParams({
          api_key: KEY,
          query: title,
          include_adult: "false",
          year: year || "",
        });
        const data = await safeFetch(`${API}/search/movie?${q}`);
        return (data && data.results && data.results[0]) || null;
      }
      async function movieDetails(id) {
        if (!TMDB_ENABLED) return null;
        return await safeFetch(`${API}/movie/${id}?api_key=${KEY}`);
      }
      async function movieProviders(id, region = "NZ") {
        if (!TMDB_ENABLED) return null;
        const data = await safeFetch(
          `${API}/movie/${id}/watch/providers?api_key=${KEY}`
        );
        return (data && data.results && data.results[region]) || null;
      }
      // TV
      async function findTvByTitle(title, firstYear) {
        if (!TMDB_ENABLED) return null;
        const q = new URLSearchParams({
          api_key: KEY,
          query: title,
          first_air_date_year: firstYear || "",
        });
        const data = await safeFetch(`${API}/search/tv?${q}`);
        return (data && data.results && data.results[0]) || null;
      }
      async function tvDetails(id) {
        if (!TMDB_ENABLED) return null;
        return await safeFetch(`${API}/tv/${id}?api_key=${KEY}`);
      }
      async function tvProviders(id, region = "NZ") {
        if (!TMDB_ENABLED) return null;
        const data = await safeFetch(
          `${API}/tv/${id}/watch/providers?api_key=${KEY}`
        );
        return (data && data.results && data.results[region]) || null;
      }
      return {
        imgUrl,
        findMovieByTitle,
        movieDetails,
        movieProviders,
        findTvByTitle,
        tvDetails,
        tvProviders,
        TMDB_ENABLED,
      };
    })();

    // =============== SLIDE POPULATION (TMDB → REEL) ===============
    async function loadPostersToReel(items) {
      const posters = [];
      const metas = [];

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const kind = it.type || "movie";
        let m = null;
        try {
          if (it.tmdbId) {
            m =
              kind === "tv"
                ? await TMDB.tvDetails(it.tmdbId)
                : await TMDB.movieDetails(it.tmdbId);
          } else if (it.title) {
            const found =
              kind === "tv"
                ? await TMDB.findTvByTitle(it.title, it.year)
                : await TMDB.findMovieByTitle(it.title, it.year);
            if (found)
              m =
                kind === "tv"
                  ? await TMDB.tvDetails(found.id)
                  : await TMDB.movieDetails(found.id);
          }
        } catch (e) {
          /* swallow */
        }

        if (!m) {
          posters.push(null);
          metas.push(it || null);
          continue;
        }

        const url = await TMDB.imgUrl(m.poster_path, "w500");
        posters.push(url);
        if (kind === "tv") {
          metas.push({
            id: m.id,
            title: m.name,
            date: m.first_air_date,
            rating: m.vote_average,
            overview: m.overview,
            runtime: (m.episode_run_time || [])[0] || null,
            genres: (m.genres || []).map((g) => g.name),
            lang: m.original_language,
            type: "tv",
          });
        } else {
          metas.push({
            id: m.id,
            title: m.title,
            date: m.release_date,
            rating: m.vote_average,
            overview: m.overview,
            runtime: m.runtime,
            genres: (m.genres || []).map((g) => g.name),
            lang: m.original_language,
            type: "movie",
          });
        }
      }

      posters.forEach((url, i) => {
        if (url) window.setSlide(i, url);
      });

      if (window.__bindSlideMeta) {
        const meshes = window.__bindSlideMeta();
        metas.forEach((meta, i) => {
          if (meshes[i]) meshes[i].userData.movie = meta;
        });
      }
    }

    function loadDemoPosters() {
      const meshes = window.__bindSlideMeta ? window.__bindSlideMeta() : [];
      for (let i = 0; i < meshes.length; i++) {
        window.setSlideFromCanvas(i, (g, c) => {
          const grad = g.createLinearGradient(0, 0, c.width, c.height);
          grad.addColorStop(0, `hsl(${(i * 37) % 360} 70% 65%)`);
          grad.addColorStop(1, `hsl(${(i * 37 + 60) % 360} 70% 45%)`);
          g.fillStyle = grad;
          g.fillRect(0, 0, c.width, c.height);
          g.fillStyle = "rgba(255,255,255,0.9)";
          g.font = "700 48px system-ui, -apple-system, Segoe UI, Roboto, Inter";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("Demo " + (i + 1), c.width / 2, c.height / 2);
        });
        meshes[i].userData.movie = {
          title: "Demo " + (i + 1),
          date: "—",
          rating: 8.0,
          id: 0,
        };
      }
    }
    window.loadDemoPosters = loadDemoPosters;

    // =============== PICKING + TICKET OVERLAY ===============
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered = null;
    let ticketEl = null;

    function ensureTicket() {
      if (ticketEl) return ticketEl;
      ticketEl = document.createElement("div");
      ticketEl.className = "ticket";
      ticketEl.style.display = "none";
      ticketEl.innerHTML = `
        <button class="close" aria-label="Close">×</button>
        <div class="row">
          <div class="stub">🎟️</div>
          <div class="meta">
            <div class="title"></div>
            <div class="pill rating"></div>
            <div class="pill date"></div>
          </div>
        </div>
        <div class="providers"></div>
        <div class="note">This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
      `;
      document.body.appendChild(ticketEl);
      ticketEl.querySelector(".close").onclick = () =>
        (ticketEl.style.display = "none");
      return ticketEl;
    }

    function getCanvasRect() {
      const m = document.getElementById("scene");
      const cnv = m && m.firstElementChild;
      return cnv
        ? cnv.getBoundingClientRect()
        : {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
    }

    function onPointerMove(e) {
      const rect = getCanvasRect();
      if (!rect || !rect.width) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onClick() {
      const slides = window.__bindSlideMeta ? window.__bindSlideMeta() : [];
      const camera = window.__getReelCamera ? window.__getReelCamera() : null;
      if (!camera || !slides.length) return;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(slides, false);
      if (!hits.length) return;
      const mesh = hits[0].object;
      const meta = mesh.userData.movie;
      if (!meta) return;
      openTicket(meta);
    }

    async function openTicket(meta) {
      const el = ensureTicket();
      el.querySelector(".title").textContent = meta.title || "Untitled";
      el.querySelector(".rating").textContent = `★ ${Number(
        meta.rating || 0
      ).toFixed(1)}`;
      el.querySelector(".date").textContent = (meta.date || "").slice(0, 10);

      const container = el.querySelector(".providers");
      container.innerHTML = "";
      try {
        const providers =
          meta.type === "tv"
            ? await TMDB.tvProviders(meta.id, "NZ")
            : await TMDB.movieProviders(meta.id, "NZ");
        if (
          providers?.flatrate?.length ||
          providers?.rent?.length ||
          providers?.buy?.length
        ) {
          const add = (arr, label) =>
            arr?.forEach((p) => {
              const tag = document.createElement("div");
              tag.className = "provider";
              tag.textContent = `${label}: ${p.provider_name}`;
              container.appendChild(tag);
            });
          add(providers.flatrate, "Stream");
          add(providers.rent, "Rent");
          add(providers.buy, "Buy");
        } else {
          const n = document.createElement("div");
          n.className = "provider";
          n.textContent = TMDB.TMDB_ENABLED
            ? "No NZ providers listed"
            : "TMDB disabled (no API key)";
          container.appendChild(n);
        }
      } catch (e) {
        const n = document.createElement("div");
        n.className = "provider";
        n.textContent = "Provider lookup failed";
        container.appendChild(n);
      }
      el.style.display = "block";
    }

    function hoverLoop() {
      requestAnimationFrame(hoverLoop);
      if (!window.__bindSlideMeta || !window.__getReelCamera) return;
      const slides = window.__bindSlideMeta();
      const camera = window.__getReelCamera();
      if (!camera) return;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(slides, false)[0]?.object || null;
      if (hovered === hit) return;
      if (hovered) hovered.scale.multiplyScalar(1 / 1.04);
      hovered = hit;
      if (hovered) hovered.scale.multiplyScalar(1.04);
    }
    hoverLoop();

    addEventListener("mousemove", onPointerMove);
    addEventListener("click", onClick);

    function getOrderedWatched() {
      const reverseOrder = document.getElementById("reverseOrder");
      return reverseOrder && reverseOrder.checked
        ? watched
        : [...watched].reverse();
    }

    if (TMDB.TMDB_ENABLED) {
      loadPostersToReel(getOrderedWatched());
    } else {
      loadDemoPosters();
    }

    const reverseOrderEl2 = document.getElementById("reverseOrder");
    if (reverseOrderEl2) {
      reverseOrderEl2.addEventListener("change", function () {
        if (TMDB.TMDB_ENABLED) {
          loadPostersToReel(getOrderedWatched());
        } else {
          loadDemoPosters();
        }
      });
    }

    // === Diagnostics & tests ===
    const hudDebug = document.getElementById("hudDebug");
    const debugFab = document.getElementById("debugFab");
    if (debugFab && hudDebug) {
      debugFab.onclick = () => hudDebug.classList.toggle("open");
    }
    const btnDemo = document.getElementById("btnDemoPosters");
    if (btnDemo) btnDemo.onclick = () => loadDemoPosters();

    const btnRunTests = document.getElementById("btnRunTests");
    if (btnRunTests) {
      btnRunTests.onclick = () => {
        const out = [];
        function test(name, fn) {
          try {
            const ok = !!fn();
            out.push({ name, ok, msg: ok ? "OK" : "FAIL" });
          } catch (e) {
            out.push({ name, ok: false, msg: e.message });
          }
        }
        test("THREE present", () => !!THREE);
        test("Renderer canvas present", () =>
          document.getElementById("scene").firstElementChild instanceof
          HTMLCanvasElement);
        test("Camera getter exposed", () =>
          typeof window.__getReelCamera === "function" &&
          !!window.__getReelCamera());
        test("Click handler safe w/o camera", () => {
          const old = window.__getReelCamera;
          window.__getReelCamera = () => null;
          onClick();
          window.__getReelCamera = old;
          return true;
        });
        test("TMDB disabled fallback works", () => {
          if (TMDB.TMDB_ENABLED) return true;
          loadDemoPosters();
          return true;
        });
        test("Ticket renders", () => {
          openTicket({ title: "Test", rating: 8.2, date: "2024-01-01", id: 0 });
          return document.querySelector(".ticket").style.display === "block";
        });

        const box = document.getElementById("testsBox");
        if (box) {
          box.innerHTML =
            "<ul>" +
            out
              .map(
                (r) =>
                  `<li><span class="${r.ok ? "test-pass" : "test-fail"}">${
                    r.ok ? "✓" : "✗"
                  }</span> ${r.name} — ${r.msg}</li>`
              )
              .join("") +
            "</ul>";
        }
      };
    }

    return () => {
      // Cleanup listeners and renderer on unmount
      window.removeEventListener("resize", onResize);
      removeEventListener("mousemove", onPointerMove);
      removeEventListener("click", onClick);
      renderer.dispose();
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div id="scene" ref={sceneRef} />
      <div className="pill">Scroll to feed / unravel the reel ➜</div>

      <div className="mode-group">
        <div className="mode-btn active" id="btnReel">
          Reel
        </div>
        <div className="mode-btn" id="btnGrid">
          Grid
        </div>
      </div>

      <div className="fab" id="fab" onClick={() => setIsHudOpen((v) => !v)}>
        ☰
      </div>

      <div className={`hud ${isHudOpen ? "open" : ""}`} id="hud">
        <label>
          Twists{" "}
          <input
            id="twists"
            type="range"
            min="1"
            max="6"
            step="0.1"
            defaultValue="3.2"
          />
        </label>
        <label>
          Radius (base){" "}
          <input
            id="radius"
            type="range"
            min="0.6"
            max="2.4"
            step="0.01"
            defaultValue="1.3"
          />
        </label>
        <label>
          Pitch{" "}
          <input
            id="pitch"
            type="range"
            min="0.4"
            max="3.0"
            step="0.01"
            defaultValue="1.3"
          />
        </label>
        <label>
          Overall Tilt{" "}
          <input
            id="tilt"
            type="range"
            min="-90"
            max="90"
            step="1"
            defaultValue="8"
          />
        </label>

        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12 }}>
          Upright Controls
        </div>
        <div className="row">
          <label>
            Top Upright (°){" "}
            <input
              id="uprTop"
              type="range"
              min="0"
              max="200"
              step="1"
              defaultValue="120"
            />
          </label>
          <label>
            Bottom Upright (°){" "}
            <input
              id="uprBot"
              type="range"
              min="0"
              max="200"
              step="1"
              defaultValue="110"
            />
          </label>
        </div>
        <label>
          Upright Spread{" "}
          <input
            id="uprightSpread"
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="0.6"
          />
        </label>

        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12 }}>
          Per-Row Radius Offsets
        </div>
        <div className="row">
          <label>
            Top Radius Δ{" "}
            <input
              id="radTop"
              type="range"
              min="-0.8"
              max="0.8"
              step="0.01"
              defaultValue="0.10"
            />
          </label>
          <label>
            Bottom Radius Δ{" "}
            <input
              id="radBot"
              type="range"
              min="-0.8"
              max="0.8"
              step="0.01"
              defaultValue="-0.05"
            />
          </label>
        </div>

        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12 }}>
          Frames & Strip
        </div>
        <label>
          Strip Width{" "}
          <input
            id="stripWidth"
            type="range"
            min="0.6"
            max="2.4"
            step="0.01"
            defaultValue="1.1"
          />
        </label>
        <label>
          Strip Length (padding at ends){" "}
          <input
            id="stripLength"
            type="range"
            min="12"
            max="20"
            step="0.5"
            defaultValue="14"
          />
        </label>
        <label>
          Frame Spacing (center-to-center){" "}
          <input
            id="frameSpacing"
            type="range"
            min="0.5"
            max="4.0"
            step="0.01"
            defaultValue="1.00"
          />
        </label>
        <label>
          Strip Opacity{" "}
          <input
            id="stripOpacity"
            type="range"
            min="0"
            max="5"
            step="0.01"
            defaultValue="1.25"
          />
        </label>
        <label>
          Texture Strength{" "}
          <input
            id="textureStrength"
            type="range"
            min="0.3"
            max="2.5"
            step="0.01"
            defaultValue="1.10"
          />
        </label>

        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12 }}>
          Feed Behaviour
        </div>
        <label>
          Feed / Turn (axial advance per 360°){" "}
          <input
            id="feedRatio"
            type="range"
            min="0"
            max="1.0"
            step="0.001"
            defaultValue="0.33"
          />
        </label>
        <label>
          <input type="checkbox" id="reverseDirection" /> Reverse Direction (top
          to bottom)
        </label>
        <label>
          <input type="checkbox" id="reverseOrder" defaultChecked /> Show Newest
          First
        </label>

        <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12 }}>
          Background
        </div>
        <div className="row">
          <label>
            Pick Color{" "}
            <input id="bgPicker" type="color" defaultValue="#f6f8fb" />
          </label>
          <div>
            <span
              className="swatch"
              data-col="#f6f8fb"
              style={{ background: "#f6f8fb" }}
            />
            <span
              className="swatch"
              data-col="#e9eef7"
              style={{ background: "#e9eef7" }}
            />
            <span
              className="swatch"
              data-col="#121620"
              style={{ background: "#121620" }}
            />
            <span
              className="swatch"
              data-col="#1f2430"
              style={{ background: "#1f2430" }}
            />
          </div>
        </div>
      </div>

      <div className="scrollspace" />
      <div className="tmdb-attr">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>

      <div className="debug-fab" id="debugFab">
        🧪
      </div>
      <div className="hud-debug" id="hudDebug">
        <div style={{ fontWeight: 700 }}>Diagnostics</div>
        <div className="tests" id="testsBox"></div>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <button id="btnRunTests">Run tests</button>
          <button id="btnDemoPosters">Load demo posters</button>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        html,
        body {
          height: 100%;
          margin: 0;
        }
        #scene {
          position: fixed;
          inset: 0;
          z-index: 1;
        }
        .scrollspace {
          min-height: 600vh;
        }
        .pill {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff8;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          z-index: 2;
        }
        .swatch {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #0001;
          margin-right: 6px;
          cursor: pointer;
        }
        .mode-group {
          position: fixed;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 6px;
          z-index: 4;
        }
        .mode-btn {
          background: #fff8;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
          border: 1px solid #0001;
        }
        .mode-btn.active {
          background: #111;
          color: #fff;
          border-color: #0002;
        }
        .fab {
          position: fixed;
          left: 14px;
          bottom: 14px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          cursor: pointer;
          font-weight: 700;
        }
        .hud {
          position: fixed;
          left: 16px;
          bottom: 64px;
          background: #fff;
          padding: 10px 12px;
          border-radius: 12px;
          z-index: 3;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(6px);
          max-height: 60vh;
          overflow: auto;
          display: none;
        }
        .hud.open {
          display: block;
        }
        .hud label {
          display: block;
          font-size: 12px;
          color: #333;
          margin: 6px 0;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .ticket {
          position: fixed;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          background: #fff;
          color: #141821;
          z-index: 5;
          min-width: 320px;
          max-width: min(840px, 92vw);
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
          border: 1px solid #00000010;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Inter, Arial;
        }
        .ticket .row {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .ticket .stub {
          width: 72px;
          height: 72px;
          border-radius: 12px;
          background: #f4f6fb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .ticket .meta {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 12px;
          line-height: 1.2;
        }
        .ticket .title {
          font-weight: 700;
          font-size: 16px;
          grid-column: 1 / span 2;
        }
        .ticket .pill {
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 999px;
          background: #141821;
          color: #fff;
        }
        .ticket .providers {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .ticket .provider {
          font-size: 12px;
          padding: 4px 8px;
          border: 1px dashed #00000026;
          border-radius: 10px;
        }
        .ticket .close {
          position: absolute;
          right: 8px;
          top: 8px;
          border: 0;
          background: #0000;
          font-size: 18px;
          cursor: pointer;
        }
        .ticket .note {
          font-size: 11px;
          opacity: 0.6;
          margin-top: 6px;
        }
        .tmdb-attr {
          position: fixed;
          right: 12px;
          bottom: 12px;
          z-index: 4;
          font-size: 11px;
          color: #000a;
          background: #fff8;
          padding: 6px 8px;
          border-radius: 8px;
          border: 1px solid #0001;
        }
        .debug-fab {
          position: fixed;
          right: 14px;
          bottom: 14px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          cursor: pointer;
          font-weight: 700;
        }
        .hud-debug {
          position: fixed;
          right: 16px;
          bottom: 64px;
          background: #fff;
          padding: 10px 12px;
          border-radius: 12px;
          z-index: 3;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
          max-height: 60vh;
          overflow: auto;
          display: none;
          width: min(420px, 92vw);
        }
        .hud-debug.open {
          display: block;
        }
        .test-pass {
          color: #157347;
          font-weight: 600;
        }
        .test-fail {
          color: #b02a37;
          font-weight: 600;
        }
        .tests ul {
          margin: 6px 0;
          padding-left: 18px;
        }
      `}</style>
    </>
  );
}
