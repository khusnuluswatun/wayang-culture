<script setup>
const stories = [
  { title: 'Bharatayuda', sub: 'Perang Maharbata', desc: 'Kisah puncak konflik Pandawa dan Kurawa' },
  { title: 'Arjuna Wiwaha', sub: 'Pernikahan Arjuna', desc: 'Arjuna bertapa dan mendapat berkah dewata' },
  { title: 'Dewa Ruci', sub: 'Perjalanan Spiritual', desc: 'Bima mencari tirta perwitasari ke samudra raya' },
]
</script>

<template>
  <section class="cta-section" id="cta" aria-label="Ajakan untuk mempelajari lebih lanjut">
    <div class="stories-tease">
      <div class="container">
        <div class="st-header">
          <p class="label">009 — Lakon Utama</p>
          <h2 class="reveal">
            Mari Mengenal Cerita yang<br>
            <span class="text-cream">Tak Pernah Usang</span>
          </h2>
        </div>
        <div class="stories-grid">
          <div
            v-for="(story, i) in stories"
            :key="story.title"
            class="story-card reveal"
            :class="`delay-${i + 1}`"
          >
            <div class="sc-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3 class="sc-title">{{ story.title }}</h3>
            <p class="sc-sub">{{ story.sub }}</p>
            <p class="sc-desc">{{ story.desc }}</p>
            <div class="sc-arrow">→</div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-cta">
      <div class="cta-bg-grid" aria-hidden="true">
        <div v-for="i in 12" :key="i" class="cta-col"></div>
      </div>
      <div class="container cta-inner">
        <div class="cta-left reveal">
          <div class="cta-label">WARISAN DUNIA</div>
          <h2 class="cta-title">Lestarikan.<br>Ceritakan.<br>Wariskan.</h2>
        </div>
        <div class="cta-right reveal delay-2">
          <p class="cta-body">
            Setiap tokoh wayang adalah guru kehidupan. Setiap lakon adalah perjalanan jiwa. Bersama kita jaga agar cahaya blencong wayang tak pernah padam.
          </p>
          <div class="cta-actions">
            <a href="#types" class="btn-primary" id="cta-learn-more">
              <span>Pelajari Lebih Lanjut</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#gallery" class="btn-outline-light" id="cta-gallery">
              <span>Lihat Galeri</span>
            </a>
          </div>
          <div class="cta-stats-row">
            <div class="cs-item">
              <span class="cs-num">2003</span>
              <span class="cs-label">UNESCO</span>
            </div>
            <div class="cs-div"></div>
            <div class="cs-item">
              <span class="cs-num">1000+</span>
              <span class="cs-label">Tahun Sejarah</span>
            </div>
            <div class="cs-div"></div>
            <div class="cs-item">
              <span class="cs-num">34</span>
              <span class="cs-label">Provinsi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stories-tease {
  background: var(--bg);
  padding: 100px 0 80px;
}

.st-header {
  margin-bottom: 60px;
}

.st-header h2 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-top: 16px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: var(--thick-line);
  border-top: var(--thick-line);
}

.story-card {
  padding: 40px 32px;
  border-right: var(--thin-line);
  border-bottom: var(--thin-line);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  position: relative;
}

.story-card:hover {
  background: var(--darkest);
  transform: translateY(-4px);
}

.story-card:hover .sc-title,
.story-card:hover .sc-sub,
.story-card:hover .sc-arrow {
  color: var(--cream);
}

.story-card:hover .sc-desc {
  color: rgba(245,237,216,0.6);
}

.sc-num {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--accent);
}

.sc-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  transition: color 0.3s;
}

.sc-sub {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.3s;
}

.sc-desc {
  font-size: 0.85rem;
  line-height: 1.65;
  flex: 1;
  transition: color 0.3s;
}

.sc-arrow {
  font-size: 1.2rem;
  margin-top: 8px;
  transition: color 0.3s, transform 0.3s;
}

.story-card:hover .sc-arrow {
  transform: translateX(4px);
}

.main-cta {
  background: var(--darkest);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  border-top: 3px solid var(--accent);
}

.cta-bg-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  pointer-events: none;
  opacity: 0.04;
}

.cta-col {
  border-left: 1px solid var(--cream);
}

.cta-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.cta-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--accent);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.cta-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.04em;
  color: var(--white);
  line-height: 0.95;
}

.cta-body {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(245,237,216,0.6);
  margin-bottom: 40px;
}

.cta-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.btn-outline-light {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--cream);
  font-family: var(--mono);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(210,142,34,0.4);
  padding: 14px 28px;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition);
}

.btn-outline-light:hover {
  border-color: var(--cream);
  background: rgba(210,142,34,0.1);
}

.cta-stats-row {
  display: flex;
  gap: 0;
  align-items: center;
  border-top: 1px solid rgba(210,142,34,0.2);
  padding-top: 32px;
}

.cs-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 32px;
}

.cs-num {
  font-family: var(--mono);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: -0.04em;
}

.cs-label {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(210,142,34,0.5);
}

.cs-div {
  width: 1px;
  height: 40px;
  background: rgba(210,142,34,0.2);
  margin-right: 32px;
}

@media (max-width: 900px) {
  .stories-grid { grid-template-columns: 1fr; }
  .cta-inner { grid-template-columns: 1fr; gap: 40px; }
}
</style>
