<script setup>
import { ref } from 'vue'
import imgArjuna       from '../assets/arjuna.png'
import imgSemar        from '../assets/semar.png'
import imgOrang        from '../assets/wayang-orang.jpg'
import imgPertunjukan1 from '../assets/pertunjukan-wayang.jfif'
import imgPertunjukan2 from '../assets/pertunjukan-wayang2.jfif'
import imgPertunjukan3 from '../assets/pertunjukan-wayang3.jpg'
import imgPertunjukan5 from '../assets/pertunjukan-wayang5.jpg'
import imgBayangan     from '../assets/bayangan-wayang.jpeg'
import imgGolek1       from '../assets/wayang-golek.jpg'
import imgGolek2       from '../assets/wayang-golek2.jpg'
import imgGolek3       from '../assets/wayang-golek3.png'

const categories = ['Semua', 'Wayang Kulit', 'Wayang Golek', 'Pertunjukan']
const activeFilter = ref('Semua')

const galleryItems = [
  {
    id: 1,
    title: 'Arjuna',
    category: 'Wayang Kulit',
    size: 'tall',
    bg: '#A13204',
    img: imgArjuna,
    desc: 'Tokoh Arjuna dengan detail ukiran emas yang memukau'
  },
  {
    id: 2,
    title: 'Panggung Semalam Suntuk',
    category: 'Pertunjukan',
    size: 'wide',
    bg: '#451100',
    img: imgPertunjukan3,
    desc: 'Panggung pertunjukan wayang kulit berlangsung dari senja hingga fajar'
  },
  {
    id: 3,
    title: 'Wayang Golek Sunda',
    category: 'Wayang Golek',
    size: 'normal',
    bg: '#5E3F02',
    img: imgGolek1,
    desc: 'Boneka wayang golek tiga dimensi khas tanah Sunda'
  },
  {
    id: 4,
    title: 'Kelir Malam',
    category: 'Pertunjukan',
    size: 'normal',
    bg: '#180A02',
    img: imgPertunjukan1,
    desc: 'Bayangan wayang pada kelir yang magis di malam hari'
  },
  {
    id: 5,
    title: 'Semar Punakawan',
    category: 'Wayang Kulit',
    size: 'tall',
    bg: '#8E4903',
    img: imgSemar,
    desc: 'Semar, punakawan yang penuh hikmat dan humor'
  },
  {
    id: 6,
    title: 'Wayang Golek Cepot',
    category: 'Wayang Golek',
    size: 'normal',
    bg: '#5E3F02',
    img: imgGolek2,
    desc: 'Detail ukiran dan warna halus boneka wayang golek'
  },
  {
    id: 7,
    title: 'Cahaya Blencong',
    category: 'Pertunjukan',
    size: 'wide',
    bg: '#451100',
    img: imgBayangan,
    desc: 'Cahaya blencong menerangi kelir dan menghidupkan bayangan wayang'
  },
  {
    id: 8,
    title: 'Wayang Orang',
    category: 'Pertunjukan',
    size: 'normal',
    bg: '#6B2800',
    img: imgOrang,
    desc: 'Pertunjukan wayang orang dengan kostum dan tata rias lengkap'
  },

  {
    id: 10,
    title: 'Adegan Gara-Gara',
    category: 'Pertunjukan',
    size: 'normal',
    bg: '#180A02',
    img: imgPertunjukan2,
    desc: 'Adegan punakawan penuh humor menyegarkan suasana pertunjukan'
  },
  {
    id: 11,
    title: 'Golek Klasik',
    category: 'Wayang Golek',
    size: 'normal',
    bg: '#5E3F02',
    img: imgGolek3,
    desc: 'Wayang golek gaya klasik dengan warna khas tradisi Sunda'
  },
  {
    id: 12,
    title: 'Pagelaran Agung',
    category: 'Pertunjukan',
    size: 'wide',
    bg: '#451100',
    img: imgPertunjukan5,
    desc: 'Pagelaran wayang kulit skala besar dengan ratusan penonton'
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

    <div class="container gallery-grid-wrap reveal delay-3">
      <div class="gallery-grid">
        <div
          v-for="(item, i) in filtered"
          :key="item.id"
          class="gallery-item"
          :class="[`item-${item.size}`]"
          @click="openLightbox(item)"
          :aria-label="item.title"
          role="button"
          tabindex="0"
          @keypress.enter="openLightbox(item)"
        >
          <div class="gallery-visual" :style="{ background: item.bg }">
            <img v-if="item.img" :src="item.img" :alt="item.title" class="gallery-img" />
            <div class="gallery-overlay">
              <div class="go-content">
                <h4 class="go-title">{{ item.title }}</h4>
                <p class="go-desc">{{ item.desc }}</p>
                <span class="go-cat">{{ item.category }}</span>
              </div>
              <!-- <div class="go-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" role="dialog" aria-modal="true">
        <div class="lightbox-panel">
          <div class="lightbox-visual" :style="{ background: lightboxItem?.bg }">
            <img v-if="lightboxItem?.img" :src="lightboxItem?.img" :alt="lightboxItem?.title" class="lv-img" />
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

.gallery-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.5s ease;
  filter: saturate(0.9);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.06);
  filter: saturate(1.1);
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
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 280px;
}

.lv-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.lv-title {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: rgba(255,255,255,0.85);
  position: relative;
  z-index: 1;
  padding: 12px 16px;
  background: rgba(0,0,0,0.45);
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
