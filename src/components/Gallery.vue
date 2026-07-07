<script setup>
import { ref } from 'vue'

const categories = ['Semua', 'Wayang Kulit', 'Wayang Golek', 'Pertunjukan', 'Detail']
const activeFilter = ref('Semua')

const galleryItems = [
  {
    id: 1,
    title: 'Arjuna Dalam Sorotan',
    category: 'Wayang Kulit',
    size: 'tall',
    bg: '#A13204',
    desc: 'Tokoh Arjuna dengan detail ukiran emas yang memukau'
  },
  {
    id: 2,
    title: 'Pertunjukan Malam',
    category: 'Pertunjukan',
    size: 'wide',
    bg: '#451100',
    desc: 'Suasana pertunjukan wayang kulit di malam hari'
  },
  {
    id: 3,
    title: 'Detail Tatahan',
    category: 'Detail',
    size: 'normal',
    bg: '#8E4903',
    desc: 'Ornamen tatahan kulit kerbau yang sangat halus'
  },
  {
    id: 4,
    title: 'Wayang Golek Sunda',
    category: 'Wayang Golek',
    size: 'normal',
    bg: '#5E3F02',
    desc: 'Boneka wayang golek khas tanah Sunda'
  },
  {
    id: 5,
    title: 'Bayangan Kelir',
    category: 'Pertunjukan',
    size: 'tall',
    bg: '#180A02',
    desc: 'Bayangan wayang pada kelir yang magis'
  },
  {
    id: 6,
    title: 'Semar Punakawan',
    category: 'Wayang Kulit',
    size: 'normal',
    bg: '#D28E22',
    desc: 'Semar, punakawan yang penuh hikmat dan humor'
  },
  {
    id: 7,
    title: 'Tangan Dalang',
    category: 'Detail',
    size: 'wide',
    bg: '#8E4903',
    desc: 'Keahlian tangan dalang memainkan wayang'
  },
  {
    id: 8,
    title: 'Gamelan Pengiring',
    category: 'Pertunjukan',
    size: 'normal',
    bg: '#451100',
    desc: 'Ensembel gamelan pengiring pertunjukan wayang'
  },
]

const filtered = ref(galleryItems)

function setFilter(cat) {
  activeFilter.value = cat
  if (cat === 'Semua') {
    filtered.value = galleryItems
  } else {
    filtered.value = galleryItems.filter(i => i.category === cat)
  }
}

const lightboxOpen = ref(false)
const lightboxItem = ref(null)

function openLightbox(item) {
  lightboxItem.value = item
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  lightboxItem.value = null
}
</script>

<template>
  <section class="gallery-section" id="gallery" aria-label="Galeri Visual Wayang">
    <div class="gallery-header-bar">
      <div class="container gallery-header">
        <div>
          <p class="label">005 — Galeri Visual</p>
          <h2 class="reveal">Galeri<br><span class="outline-text">Visual</span></h2>
        </div>
        <p class="gallery-tagline reveal delay-2">
          Setiap gambar adalah cerita.<br>
          Setiap detail adalah keajaiban tatahan tangan leluhur.
        </p>
      </div>
    </div>

    <div class="swiss-rule-thick" style="border-top: 3px solid #D28E22;"></div>

    <div class="filter-bar" role="toolbar" aria-label="Filter galeri">
      <div class="container filter-inner">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeFilter === cat }"
          @click="setFilter(cat)"
          :aria-pressed="activeFilter === cat"
          :id="`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="container gallery-grid-wrap">
      <div class="gallery-grid">
        <div
          v-for="(item, i) in filtered"
          :key="item.id"
          class="gallery-item reveal"
          :class="[`item-${item.size}`, `delay-${i % 4 + 1}`]"
          @click="openLightbox(item)"
          :aria-label="item.title"
          role="button"
          tabindex="0"
          @keypress.enter="openLightbox(item)"
        >
          <div class="gallery-visual" :style="{ background: item.bg }">
            <div class="gallery-pattern" aria-hidden="true">
              <div v-for="j in 4" :key="j" class="gp-line" :style="{ top: `${j * 25}%` }"></div>
              <div v-for="j in 4" :key="`v${j}`" class="gp-vline" :style="{ left: `${j * 25}%` }"></div>
            </div>
            <div class="gallery-overlay">
              <div class="go-content">
                <h4 class="go-title">{{ item.title }}</h4>
                <p class="go-desc">{{ item.desc }}</p>
                <span class="go-cat">{{ item.category }}</span>
              </div>
              <div class="go-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" role="dialog" aria-modal="true">
        <div class="lightbox-panel">
          <div class="lightbox-visual" :style="{ background: lightboxItem?.bg }">
            <div class="lv-pattern" aria-hidden="true">
              <div v-for="j in 6" :key="j" class="lp-line" :style="{ top: `${j * 17}%` }"></div>
              <div v-for="j in 6" :key="`v${j}`" class="lp-vline" :style="{ left: `${j * 17}%` }"></div>
            </div>
            <span class="lv-title">{{ lightboxItem?.title }}</span>
          </div>
          <div class="lightbox-info">
            <p class="label">{{ lightboxItem?.category }}</p>
            <h3>{{ lightboxItem?.title }}</h3>
            <p>{{ lightboxItem?.desc }}</p>
            <button class="btn-outline" @click="closeLightbox" style="margin-top: 24px;">
              Tutup
            </button>
          </div>
        </div>
        <button class="lightbox-close" @click="closeLightbox" aria-label="Tutup lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery-section {
  background: var(--bg-alt);
  padding-bottom: 100px;
}

.gallery-header-bar {
  background: var(--darkest);
  padding: 80px 0 60px;
}

.gallery-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: end;
}

.gallery-header h2 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  letter-spacing: -0.04em;
  color: var(--white);
}

.gallery-tagline {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(245,237,216,0.55);
  font-style: italic;
}

/* Filter Bar */
.filter-bar {
  background: var(--bg);
  border-bottom: var(--thick-line);
  position: sticky;
  top: 72px;
  z-index: 10;
}

.filter-inner {
  display: flex;
  gap: 0;
  overflow-x: auto;
}

.filter-btn {
  all: unset;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 16px 24px;
  border-right: var(--thin-line);
  color: var(--text-muted);
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  position: relative;
}

.filter-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 0.2s;
}

.filter-btn:hover { color: var(--text); }
.filter-btn.active { color: var(--text); font-weight: 700; }
.filter-btn.active::after { transform: scaleX(1); }

/* Gallery Grid */
.gallery-grid-wrap {
  padding-top: 60px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: 3px;
}

.gallery-item {
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.item-tall { grid-row: span 2; }
.item-wide { grid-column: span 2; }

.gallery-visual {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;
}

.gallery-item:hover .gallery-visual {
  transform: scale(1.02);
}

.gallery-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.gp-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: rgba(255,255,255,0.5);
}

.gp-vline {
  position: absolute;
  top: 0; bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.5);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(24,10,2,0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.go-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
}

.go-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.01em;
}

.go-desc {
  font-size: 0.75rem;
  color: rgba(245,237,216,0.7);
  line-height: 1.5;
}

.go-cat {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--cream);
}

.go-action {
  color: var(--cream);
  align-self: flex-end;
  margin-top: 8px;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(24,10,2,0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.lightbox-panel {
  background: var(--bg);
  max-width: 800px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 280px;
  max-height: 80vh;
  overflow: hidden;
}

.lightbox-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lv-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.lp-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: rgba(255,255,255,0.5);
}

.lp-vline {
  position: absolute;
  top: 0; bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.5);
}

.lv-title {
  font-family: var(--mono);
  font-size: 1.2rem;
  color: rgba(255,255,255,0.2);
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 20px;
}

.lightbox-info {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lightbox-info h3 {
  font-size: 1.4rem;
  letter-spacing: -0.03em;
}

.lightbox-close {
  position: fixed;
  top: 24px;
  right: 24px;
  background: var(--darkest);
  border: none;
  color: var(--white);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover { background: var(--accent); }

@media (max-width: 900px) {
  .gallery-header { grid-template-columns: 1fr; gap: 24px; }
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
  .item-wide { grid-column: span 1; }
  .lightbox-panel { grid-template-columns: 1fr; }
  .lightbox-visual { min-height: 200px; }
}

@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }
  .item-tall { grid-row: span 1; }
}
</style>
