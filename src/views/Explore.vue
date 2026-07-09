<script setup>
import { onMounted } from 'vue'
import WayangTypes from '../components/WayangTypes.vue'
import Characters  from '../components/Characters.vue'
import Gallery     from '../components/Gallery.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})
</script>

<template>
  <div>
    <section class="explore-hero" aria-label="Halaman Jelajah Wayang">
      <div class="eh-grid-bg" aria-hidden="true"><div v-for="i in 12" :key="i" class="eh-col"></div></div>
      <div class="eh-letter" aria-hidden="true">J</div>
      <div class="container eh-content">
        <div class="eh-left">
          <p class="label reveal">003 — Eksplorasi Mendalam</p>
          <h1 class="eh-title reveal delay-1">
            <span>JELAJAH</span>
            <span class="outline">WAYANG</span>
            <span class="gold">NUSANTARA</span>
          </h1>
          <div class="eh-desc reveal delay-2">
            <div class="eh-rule"></div>
            <p>Dari Sabang sampai Merauke, kekayaan ragam wayang, tokoh-tokoh epik kosmis, dan keindahan visual tersimpan di sini.</p>
          </div>
        </div>
        <div class="eh-right reveal delay-2">
          <div class="eh-stats-box">
            <div class="esb-item"><span class="esb-num">6</span><span class="esb-label">Jenis Wayang</span></div>
            <div class="esb-div"></div>
            <div class="esb-item"><span class="esb-num">6</span><span class="esb-label">Tokoh Populer</span></div>
            <div class="esb-div"></div>
            <div class="esb-item"><span class="esb-num">20+</span><span class="esb-label">Foto Galeri</span></div>
          </div>
          <nav class="eh-jumpnav" aria-label="Lompat ke seksi">
            <a href="#types"      class="ejn-link">① Jenis Wayang</a>
            <a href="#characters" class="ejn-link">② Tokoh Populer</a>
            <a href="#gallery"    class="ejn-link">③ Galeri Visual</a>
          </nav>
        </div>
      </div>
    </section>

    <WayangTypes />
    <Characters />
    <Gallery />

    <section class="fun-facts-bar" aria-label="Fakta Menarik Wayang">
      <div class="container">
        <p class="ffb-label">Tahukah Kamu?</p>
        <div class="ffb-facts">
          <div class="ff-item reveal delay-1">
            <span class="ff-icon">🎭</span>
            <p>Seorang dalang menguasai <strong>lebih dari 200 tokoh</strong> sekaligus dalam satu pertunjukan</p>
          </div>
          <div class="ff-item reveal delay-2">
            <span class="ff-icon">🌙</span>
            <p>Pertunjukan wayang kulit tradisional berlangsung <strong>semalam penuh</strong> — dari pukul 21.00 hingga fajar</p>
          </div>
          <div class="ff-item reveal delay-3">
            <span class="ff-icon">🪘</span>
            <p>Gamelan yang mengiringi wayang terdiri dari <strong>40+ instrumen</strong> yang dimainkan bersama</p>
          </div>
          <div class="ff-item reveal delay-1">
            <span class="ff-icon">📜</span>
            <p>Naskah cerita wayang tertua di Indonesia ditulis pada abad ke-<strong>9 Masehi</strong></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.explore-hero {
  min-height: 70vh; background: var(--darkest);
  position: relative; overflow: hidden; display: flex; align-items: center;
  padding: clamp(100px, 16vw, 150px) 0 clamp(60px, 10vw, 100px);
}
.eh-grid-bg { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(12, 1fr); pointer-events: none; opacity: 0.04; }
.eh-col { border-left: 1px solid var(--cream); }
.eh-letter { position: absolute; top: -0.05em; right: -0.04em; font-size: clamp(10rem, 28vw, 32rem); font-weight: 700; color: rgba(210,142,34,0.04); line-height: 1; pointer-events: none; user-select: none; }
.eh-content { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: center; position: relative; z-index: 2; }
.eh-left { display: flex; flex-direction: column; gap: clamp(20px, 3vw, 28px); }
.eh-title { display: flex; flex-direction: column; font-size: clamp(3rem, 8vw, 7rem); line-height: 0.9; letter-spacing: -0.04em; gap: 4px; }
.eh-title span { display: block; color: var(--white); }
.eh-title .outline { -webkit-text-stroke: 2px var(--cream); color: transparent; }
.eh-title .gold   { color: var(--cream); }
.eh-desc { display: flex; gap: 18px; align-items: flex-start; }
.eh-rule { width: 3px; min-height: 60px; background: var(--accent); flex-shrink: 0; }
.eh-desc p { color: rgba(245,237,216,0.6); font-size: clamp(0.85rem, 1.5vw, 0.95rem); line-height: 1.8; }
.eh-stats-box { display: flex; align-items: center; border: 1px solid rgba(210,142,34,0.2); padding: 28px 32px; margin-bottom: 24px; background: rgba(210,142,34,0.04); }
.esb-item { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.esb-num  { font-family: var(--mono); font-size: 2rem; font-weight: 700; color: var(--cream); letter-spacing: -0.04em; }
.esb-label{ font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(210,142,34,0.6); }
.esb-div  { width: 1px; height: 48px; background: rgba(210,142,34,0.2); margin: 0 28px; }
.eh-jumpnav { display: flex; flex-direction: column; gap: 0; }
.ejn-link { display: block; padding: 10px 0; text-decoration: none; font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,237,216,0.5); border-bottom: 1px solid rgba(210,142,34,0.1); transition: color 0.2s, padding-left 0.2s; }
.ejn-link:hover { color: var(--cream); padding-left: 8px; }
.fun-facts-bar { background: var(--darkest); border-top: 3px solid rgba(210,142,34,0.3); padding: clamp(60px, 10vw, 100px) 0; }
.ffb-label { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: clamp(32px, 5vw, 48px); }
.ffb-facts { display: grid; grid-template-columns: repeat(4, 1fr); border-left: 3px solid rgba(210,142,34,0.3); border-top: 3px solid rgba(210,142,34,0.3); }
.ff-item { padding: clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px); border-right: 1px solid rgba(210,142,34,0.15); border-bottom: 1px solid rgba(210,142,34,0.15); display: flex; flex-direction: column; gap: 14px; transition: background 0.3s; }
.ff-item:hover { background: rgba(210,142,34,0.05); }
.ff-icon { font-size: 1.8rem; line-height: 1; }
.ff-item p { font-size: 0.85rem; line-height: 1.65; color: rgba(245,237,216,0.6); }
.ff-item strong { color: var(--cream); font-weight: 600; }
@media (max-width: 900px) {
  .eh-content { grid-template-columns: 1fr; }
  .eh-right { display: none; }
  .ffb-facts { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) { .ffb-facts { grid-template-columns: 1fr; } }
</style>
