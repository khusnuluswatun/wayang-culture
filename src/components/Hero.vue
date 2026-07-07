<script setup>
import { ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

function onMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 16
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 12
}
</script>

<template>
  <section
    class="hero"
    id="hero"
    @mousemove="onMouseMove"
    aria-label="Pengantar Wayang Nusantara"
  >
    <div class="hero-grid-bg" aria-hidden="true">
      <div v-for="i in 12" :key="i" class="grid-col"></div>
    </div>

    <div class="hero-letter" aria-hidden="true">W</div>

    <div class="hero-content container">
      <div class="hero-left">
        <p class="label reveal">No. 001 — Warisan Dunia UNESCO</p>

        <h1 class="hero-title reveal delay-1">
          <span class="tl">WAYANG</span>
          <span class="tl outline">KULIT</span>
          <span class="tl gold">NUSANTARA</span>
        </h1>

        <div class="hero-desc reveal delay-2">
          <div class="desc-rule" aria-hidden="true"></div>
          <p>Seni pertunjukan boneka bayangan tertua di dunia. Mengisahkan epik kosmik antara dharma dan adharma, hidup dalam setiap gerakan tangan sang Dalang.</p>
        </div>

        <div class="hero-actions reveal delay-3">
          <a href="#about" class="btn-primary" id="hero-cta-explore">
            <span>Mulai Jelajah</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#game" class="btn-outline" id="hero-cta-game">
            <span>Main Game</span>
          </a>
        </div>
      </div>

      <div class="hero-right reveal delay-2">
        <figure
          class="hero-image-frame"
          :style="{ transform: `translate(${mouseX * 0.4}px, ${mouseY * 0.25}px)` }"
        >
          <div class="frame-label" aria-hidden="true">
            <span>WAYANG PURWA</span>
            <span>— Surakarta Style</span>
          </div>
          <div class="image-wrapper">
            <img src="/src/assets/hero.png" alt="Wayang Kulit tokoh Arjuna, dengan detail ukiran rumit" />
            <div class="image-overlay" aria-hidden="true"></div>
          </div>
          <div class="frame-corner tl" aria-hidden="true"></div>
          <div class="frame-corner tr" aria-hidden="true"></div>
          <div class="frame-corner bl" aria-hidden="true"></div>
          <div class="frame-corner br" aria-hidden="true"></div>
          <figcaption class="visually-hidden">Wayang kulit Purwa gaya Surakarta</figcaption>
        </figure>

        <div
          class="floating-tag"
          :style="{ transform: `translate(${mouseX * 0.7}px, ${mouseY * 0.4}px)` }"
          aria-label="Diakui UNESCO tahun 2003"
        >
          <span class="tag-num">2003</span>
          <span class="tag-label">UNESCO<br>Recognized</span>
        </div>
      </div>
    </div>

    <div class="hero-ticker" aria-hidden="true">
      <div class="ticker-track">
        <span v-for="i in 4" :key="i">
          WAYANG KULIT · WAYANG GOLEK · WAYANG BEBER · WAYANG KLITIK · WAYANG ORANG · DALANG MAESTRO ·&nbsp;
        </span>
      </div>
    </div>

    <div class="scroll-indicator hide-mobile" aria-hidden="true">
      <div class="scroll-line"></div>
      <span>SCROLL</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  background: var(--darkest);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hero-grid-bg {
  position: absolute; inset: 0;
  display: grid; grid-template-columns: repeat(12, 1fr);
  pointer-events: none; opacity: 0.04;
}
.grid-col { border-left: 1px solid var(--cream); }

.hero-letter {
  position: absolute; top: -0.05em; right: -0.04em;
  font-size: clamp(10rem, 30vw, 36rem);
  font-weight: 700; color: rgba(210,142,34,0.04);
  line-height: 1; pointer-events: none; user-select: none;
  letter-spacing: -0.05em;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 60px);
  align-items: center;
  flex: 1;
  padding-top: clamp(90px, 14vw, 130px);
  padding-bottom: clamp(60px, 10vw, 100px);
  position: relative; z-index: 2;
}

.hero-left { display: flex; flex-direction: column; gap: clamp(20px, 3vw, 32px); }

.hero-title {
  display: flex; flex-direction: column;
  font-size: clamp(3rem, 9vw, 8rem);
  line-height: 0.9; letter-spacing: -0.04em; gap: 4px;
}
.tl        { display: block; color: var(--white); }
.tl.outline{ -webkit-text-stroke: 2px var(--cream); color: transparent; }
.tl.gold   { color: var(--cream); }

.hero-desc { display: flex; gap: 18px; align-items: flex-start; }
.desc-rule { width: 3px; min-height: 70px; background: var(--accent); flex-shrink: 0; }
.hero-desc p { color: rgba(245,237,216,0.6); font-size: clamp(0.85rem, 1.5vw, 0.95rem); line-height: 1.8; }

.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.hero-right { position: relative; display: flex; align-items: center; justify-content: center; }

.hero-image-frame {
  position: relative; width: 100%; max-width: 440px;
  transition: transform 0.1s linear;
}
.frame-label {
  display: flex; justify-content: space-between; margin-bottom: 8px;
}
.frame-label span {
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: rgba(210,142,34,0.7);
}
.image-wrapper { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.image-wrapper img {
  width: 100%; height: 100%; object-fit: cover;
  filter: sepia(20%) saturate(1.3); transition: transform 0.6s;
}
.image-wrapper:hover img { transform: scale(1.04); }
.image-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(24,10,2,0.6));
}
.frame-corner {
  position: absolute; width: 20px; height: 20px;
  border-color: var(--cream); border-style: solid;
}
.frame-corner.tl { top: 28px; left: 0;  border-width: 2px 0 0 2px; }
.frame-corner.tr { top: 28px; right: 0; border-width: 2px 2px 0 0; }
.frame-corner.bl { bottom: 0; left: 0;  border-width: 0 0 2px 2px; }
.frame-corner.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

.floating-tag {
  position: absolute; bottom: 80px; right: -16px;
  background: var(--accent); padding: 12px 16px;
  display: flex; gap: 10px; align-items: center;
  transition: transform 0.15s linear;
}
.tag-num   { font-family: var(--mono); font-size: 1.5rem; font-weight: 700; color: var(--white); line-height: 1; }
.tag-label { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.8); line-height: 1.4; }

.hero-ticker {
  position: relative; z-index: 2;
  background: var(--accent); padding: 10px 0; overflow: hidden; white-space: nowrap;
}
.ticker-track {
  display: inline-flex; animation: marquee 30s linear infinite;
  font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.15em; color: var(--white);
}

.scroll-indicator {
  position: absolute; bottom: 80px; left: 50px;
  display: flex; align-items: center; gap: 12px; z-index: 3;
}
.scroll-line {
  width: 40px; height: 2px; background: var(--cream);
  position: relative; overflow: hidden;
}
.scroll-line::after {
  content: ''; position: absolute; inset: 0;
  background: var(--accent); animation: scrollAnim 2s ease-in-out infinite;
}
.scroll-indicator span {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.2em;
  color: rgba(210,142,34,0.6); text-transform: uppercase;
}

.visually-hidden {
  position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    padding-top: clamp(80px, 18vw, 110px);
    gap: 28px;
  }
  .hero-right { display: none; }
  .hero-title { font-size: clamp(2.8rem, 13vw, 4.5rem); }
}
</style>
