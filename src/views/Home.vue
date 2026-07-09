<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Hero       from '../components/Hero.vue'
import Stats      from '../components/Stats.vue'
import About      from '../components/About.vue'

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
    <Hero />

    <Stats />

    <About />

    <section class="page-nav-section" aria-label="Jelajahi Wasantara">
      <div class="container">
        <header class="pn-header">
          <p class="label reveal">Mulai Jelajah</p>
          <h2 class="reveal delay-1">Pilih Pengalamanmu<br><span class="outline-text">di Wasantara</span></h2>
        </header>

        <div class="page-cards">
          <RouterLink to="/explore" class="page-card reveal delay-1" id="home-card-explore">
            <div class="pc-num">01</div>
            <h3 class="pc-title">Jelajah Wayang</h3>
            <p class="pc-desc">Temukan 6 jenis wayang, 6 tokoh epik, dan galeri visual keindahan seni wayang dari berbagai penjuru nusantara.</p>
            <div class="pc-tags">
              <span>Jenis</span><span>Tokoh</span><span>Galeri</span>
            </div>
            <div class="pc-arrow">→</div>
          </RouterLink>

          <RouterLink to="/philosophy" class="page-card reveal delay-2" id="home-card-philosophy">
            <div class="pc-num">02</div>
            <h3 class="pc-title">Filosofi & Proses</h3>
            <p class="pc-desc">Selami kearifan kosmis di balik setiap lakon. Pahami proses pertunjukan semalam suntuk dari awal hingga Tancep Kayon.</p>
            <div class="pc-tags">
              <span>Filosofi</span><span>Proses</span><span>Dalang</span>
            </div>
            <div class="pc-arrow">→</div>
          </RouterLink>

          <RouterLink to="/map" class="page-card reveal delay-3" id="home-card-map">
            <div class="pc-num">03</div>
            <h3 class="pc-title">Peta Persebaran</h3>
            <p class="pc-desc">Eksplorasi peta interaktif persebaran wayang di seluruh Indonesia. Klik setiap wilayah untuk info budaya lokal.</p>
            <div class="pc-tags">
              <span>Peta</span><span>Interaktif</span><span>Nusantara</span>
            </div>
            <div class="pc-arrow">→</div>
          </RouterLink>

          <RouterLink to="/game" class="page-card reveal delay-4" id="home-card-game">
            <div class="pc-num">04</div>
            <h3 class="pc-title">Main Game</h3>
            <p class="pc-desc">Uji pengetahuanmu! Ikuti kuis trivia interaktif bertema wayang untuk mengasah pemahaman budaya Nusantara.</p>
            <div class="pc-tags">
              <span>Trivia</span><span>Kuis</span><span>Tantangan</span>
            </div>
            <div class="pc-arrow">→</div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="home-cta-bottom" aria-label="Seruan Pelestarian">
      <div class="hcb-grid-bg" aria-hidden="true">
        <div v-for="i in 12" :key="i" class="hcb-col"></div>
      </div>
      <div class="container hcb-inner">
        <div class="hcb-left reveal">
          <p class="label">Warisan Dunia UNESCO · 2003</p>
          <h2 class="hcb-title">Lestarikan.<br><span class="outline-text-light">Ceritakan.</span><br>Wariskan.</h2>
        </div>
        <div class="hcb-right reveal delay-2">
          <p>Setiap tokoh wayang adalah guru kehidupan. Setiap lakon adalah perjalanan jiwa. Bersama kita jaga agar cahaya blencong wayang tak pernah padam.</p>
          <div class="hcb-actions">
            <RouterLink to="/explore" class="btn-primary" id="home-cta-explore">
              <span>Mulai Jelajah</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
            <RouterLink to="/game" class="btn-outline-light" id="home-cta-game">
              <span>Main Game</span>
            </RouterLink>
          </div>
          <div class="hcb-stats">
            <div class="hs-item"><span class="hs-num">2003</span><span class="hs-label">UNESCO</span></div>
            <div class="hs-div"></div>
            <div class="hs-item"><span class="hs-num">1000+</span><span class="hs-label">Tahun Sejarah</span></div>
            <div class="hs-div"></div>
            <div class="hs-item"><span class="hs-num">34</span><span class="hs-label">Provinsi</span></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-nav-section {
  background: var(--bg-alt);
  padding: clamp(80px, 12vw, 120px) 0;
}

.pn-header {
  margin-bottom: clamp(40px, 6vw, 64px);
}
.pn-header h2 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-top: 14px;
  letter-spacing: -0.04em;
}

.page-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-left: var(--thick-line);
  border-top: var(--thick-line);
}

.page-card {
  padding: clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px);
  border-right: var(--thin-line);
  border-bottom: var(--thin-line);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}
.page-card::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s;
}
.page-card:hover { background: var(--darkest); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,10,2,0.15); }
.page-card:hover::before { transform: scaleX(1); }
.page-card:hover .pc-title, .page-card:hover .pc-arrow { color: var(--cream); }
.page-card:hover .pc-desc { color: rgba(245,237,216,0.6); }

.page-card--accent { background: var(--darkest); }
.page-card--accent .pc-num,
.page-card--accent .pc-icon { color: var(--accent); }
.page-card--accent .pc-title { color: var(--cream); }
.page-card--accent .pc-desc { color: rgba(245,237,216,0.55); }
.page-card--accent::before { background: var(--cream); }

.pc-num  { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.2em; color: var(--accent); }
.pc-icon { font-size: 2rem; line-height: 1; }
.pc-title { font-size: clamp(1rem, 1.8vw, 1.25rem); font-weight: 700; letter-spacing: -0.02em; transition: color 0.3s; }
.pc-desc  { font-size: 0.83rem; line-height: 1.65; flex: 1; transition: color 0.3s; }
.pc-tags  { display: flex; gap: 6px; flex-wrap: wrap; }
.pc-tags span { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid rgba(161,50,4,0.3); padding: 3px 8px; color: var(--accent); }
.page-card--accent .pc-tags span { border-color: rgba(210,142,34,0.3); color: rgba(210,142,34,0.7); }
.pc-arrow { font-size: 1.2rem; transition: color 0.3s, transform 0.3s; }
.page-card:hover .pc-arrow { transform: translateX(6px); }

.home-cta-bottom {
  background: var(--darkest);
  padding: clamp(80px, 12vw, 120px) 0;
  position: relative;
  overflow: hidden;
  border-top: 3px solid var(--accent);
}
.hcb-grid-bg {
  position: absolute; inset: 0;
  display: grid; grid-template-columns: repeat(12, 1fr);
  pointer-events: none; opacity: 0.04;
}
.hcb-col { border-left: 1px solid var(--cream); }
.hcb-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 8vw, 100px); align-items: center; position: relative; z-index: 1;
}
.hcb-title {
  font-size: clamp(2.5rem, 5vw, 5rem);
  letter-spacing: -0.04em; color: var(--white); line-height: 0.95;
  margin-top: 14px;
}
.outline-text-light { -webkit-text-stroke: 2px rgba(210,142,34,0.6); color: transparent; }
.hcb-right p { font-size: 0.95rem; line-height: 1.8; color: rgba(245,237,216,0.6); margin-bottom: 36px; }
.hcb-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
.btn-outline-light {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: var(--cream);
  font-family: var(--mono); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
  border: 1px solid rgba(210,142,34,0.4); padding: 14px 28px;
  cursor: pointer; text-decoration: none; transition: var(--transition);
}
.btn-outline-light:hover { border-color: var(--cream); background: rgba(210,142,34,0.1); }
.hcb-stats {
  display: flex; align-items: center;
  border-top: 1px solid rgba(210,142,34,0.2); padding-top: 32px;
}
.hs-item { display: flex; flex-direction: column; gap: 4px; padding-right: 28px; }
.hs-num  { font-family: var(--mono); font-size: 1.4rem; font-weight: 700; color: var(--cream); letter-spacing: -0.04em; }
.hs-label{ font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(210,142,34,0.5); }
.hs-div  { width: 1px; height: 40px; background: rgba(210,142,34,0.2); margin-right: 28px; }

@media (max-width: 1024px) {
  .page-cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .page-cards { grid-template-columns: 1fr; }
  .hcb-inner { grid-template-columns: 1fr; gap: 40px; }
}
</style>
