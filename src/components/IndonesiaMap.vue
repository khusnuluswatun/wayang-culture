<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapEl = ref(null)
let mapInstance = null

const regions = [
  {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    types: ['Wayang Kulit Purwa', 'Wayang Orang', 'Wayang Madya'],
    latlng: [-7.15, 110.14],
    color: '#A13204'
  },
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    types: ['Wayang Golek Sunda', 'Wayang Kulit Cirebon'],
    latlng: [-6.92, 107.61],
    color: '#D28E22'
  },
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    types: ['Wayang Klitik', 'Wayang Topeng Malang'],
    latlng: [-7.73, 112.73],
    color: '#8E4903'
  },
  {
    id: 'bali',
    name: 'Bali',
    types: ['Wayang Kulit Bali', 'Wayang Lemah', 'Wayang Wong'],
    latlng: [-8.40, 115.19],
    color: '#A13204'
  },
  {
    id: 'lombok',
    name: 'Lombok, NTB',
    types: ['Wayang Sasak'],
    latlng: [-8.65, 116.32],
    color: '#5E3F02'
  },
  {
    id: 'kalimantan-selatan',
    name: 'Kalimantan Selatan',
    types: ['Wayang Banjar', 'Wayang Gung'],
    latlng: [-3.30, 114.59],
    color: '#8E4903'
  },
  {
    id: 'sumatera-selatan',
    name: 'Sumatera Selatan',
    types: ['Wayang Palembang', 'Wayang Kulit Palembang'],
    latlng: [-3.0, 104.74],
    color: '#D28E22'
  },
  {
    id: 'dki-jakarta',
    name: 'DKI Jakarta',
    types: ['Wayang Betawi', 'Wayang Golek Betawi'],
    latlng: [-6.21, 106.85],
    color: '#5E3F02'
  },
  {
    id: 'jawa-barat-2',
    name: 'Cirebon',
    types: ['Wayang Kulit Cirebon', 'Wayang Golek Cirebon'],
    latlng: [-6.73, 108.55],
    color: '#451100'
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    types: ['Wayang Kulit Purwa Yogya', 'Wayang Orang Keraton'],
    latlng: [-7.80, 110.36],
    color: '#A13204'
  },
  {
    id: 'sulawesi-selatan',
    name: 'Sulawesi Selatan',
    types: ['Wayang Kulit Makassar'],
    latlng: [-5.14, 119.42],
    color: '#8E4903'
  },
]

const hoveredRegion = ref(null)
let hoverTimeout = null

function makeIcon(color) {
  const size = 14
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}">
      <circle cx="${size}" cy="${size}" r="${size - 4}" fill="${color}" opacity="0.9"/>
      <circle cx="${size}" cy="${size}" r="${size - 2}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
    </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size],
    popupAnchor: [0, -(size + 4)],
  })
}

onMounted(() => {
  if (!mapEl.value) return

  mapInstance = L.map(mapEl.value, {
    center: [-2.5, 118.0],
    zoom: 4.8,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 10,
  }).addTo(mapInstance)

  L.control.attribution({ position: 'bottomright', prefix: false })
    .addAttribution('© OSM · CARTO · Wasantara')
    .addTo(mapInstance)

  regions.forEach(region => {
    const marker = L.marker(region.latlng, { icon: makeIcon(region.color) })

    const popupHtml = `
      <div style="min-width:180px">
        <p style="font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:${region.color};margin-bottom:6px">
          ● WAYANG DAERAH
        </p>
        <h4 style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;font-weight:700;color:#FDF6E9;margin-bottom:8px;letter-spacing:-0.02em">
          ${region.name}
        </h4>
        ${region.types.map(t => `<p style="font-family:'Space Mono',monospace;font-size:0.62rem;letter-spacing:0.04em;color:rgba(253,246,233,0.65);margin-bottom:3px">— ${t}</p>`).join('')}
      </div>`

    marker.bindPopup(popupHtml, { maxWidth: 240, className: 'wayang-popup' })
    marker.on('mouseover', () => {
      clearTimeout(hoverTimeout)
      hoveredRegion.value = region.id
      marker.openPopup()
    })
    marker.on('mouseout', () => {
      hoverTimeout = setTimeout(() => { hoveredRegion.value = null }, 300)
    })
    marker.on('click', () => {
      clearTimeout(hoverTimeout)
      hoveredRegion.value = region.id
      marker.openPopup()
    })
    marker.addTo(mapInstance)
  })

  setTimeout(() => mapInstance.invalidateSize(), 200)
})

onUnmounted(() => {
  if (mapInstance) { mapInstance.remove(); mapInstance = null }
})
</script>

<template>
  <section class="map-section" id="map" aria-label="Peta Persebaran Wayang Indonesia">
    <header class="map-header-bar">
      <div class="container map-header">
        <p class="label">008 — Peta Persebaran</p>
        <h2 class="reveal">
          Wayang<br>
          <span class="outline-text">Nusantara</span>
        </h2>
        <p class="map-sub reveal delay-2">
          Dari ujung barat Sumatera hingga timur Nusa Tenggara, wayang hadir dalam berbagai wujud.
          Klik titik merah untuk melihat jenis wayang di tiap daerah.
        </p>
      </div>
    </header>

    <div class="swiss-rule-thick" style="background: var(--accent);"></div>

    <div class="map-body">
      <!-- Leaflet map -->
      <div class="map-wrapper" role="application" aria-label="Peta interaktif persebaran wayang Indonesia">
        <div ref="mapEl" class="leaflet-map"></div>
        <div class="map-instructions hide-mobile" aria-hidden="true">
          <span>🖱 Scroll untuk zoom · Klik titik untuk detail</span>
        </div>
        <div class="map-instructions show-mobile" aria-hidden="true">
          <span>Tap titik untuk detail wilayah</span>
        </div>
      </div>

      <aside class="region-list" aria-label="Daftar wilayah wayang">
        <div class="region-list-header">
          <p class="label">{{ regions.length }} Wilayah</p>
        </div>
        <ul role="list">
          <li
            v-for="(region, i) in regions"
            :key="region.id"
            class="region-item reveal"
            :class="[`delay-${(i % 4) + 1}`, { active: hoveredRegion === region.id }]"
            role="listitem"
            :aria-label="`${region.name}: ${region.types.join(', ')}`"
          >
            <div class="ri-header">
              <span class="ri-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="ri-dot" :style="{ background: region.color }"></span>
            </div>
            <h4 class="ri-name">{{ region.name }}</h4>
            <ul class="ri-types" role="list">
              <li
                v-for="type in region.types"
                :key="type"
                class="ri-type"
              >{{ type }}</li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.map-section {
  background: var(--bg-alt);
  padding-bottom: clamp(60px, 10vw, 100px);
}

.map-header-bar {
  background: var(--darkest);
  padding: clamp(40px, 8vw, 80px) 0 clamp(32px, 6vw, 60px);
}

.map-header {
  display: grid;
  grid-template-columns: 160px 1fr 1fr;
  gap: clamp(20px, 4vw, 40px);
  align-items: start;
}

.map-header h2 {
  font-size: clamp(2.2rem, 5vw, 5rem);
  color: var(--white);
  letter-spacing: -0.04em;
}

.map-sub {
  font-size: clamp(0.82rem, 1.5vw, 0.95rem);
  line-height: 1.7;
  color: rgba(245,237,216,0.6);
}

.map-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  margin: clamp(32px, 5vw, 60px) clamp(20px, 4vw, 60px) 0;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 clamp(20px, 4vw, 60px);
  border-left: var(--thick-line);
  background: var(--bg);
}

.map-wrapper {
  position: relative;
  border-right: var(--thin-line);
}

.leaflet-map {
  width: 100%;
  height: 520px;
  background: #0d0804;
}

.map-instructions {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 1000;
  background: rgba(24,10,2,0.75);
  padding: 6px 12px;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(210,142,34,0.8);
  pointer-events: none;
}

.region-list {
  overflow-y: auto;
  max-height: 520px;
}

.region-list-header {
  padding: 16px 20px;
  border-bottom: var(--thin-line);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 2;
}

.region-item {
  padding: 16px 20px;
  border-bottom: var(--thin-line);
  transition: background 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
}
.region-item:hover,
.region-item.active { background: rgba(161,50,4,0.06); }

.ri-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.ri-num {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--accent);
}

.ri-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: transform 0.3s;
}
.region-item.active .ri-dot { transform: scale(1.6); }

.ri-name {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: none;
}

.ri-types {
  display: flex;
  flex-direction: column;
  gap: 1px;
  list-style: none;
}

.ri-type {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .map-header { grid-template-columns: 1fr; gap: 16px; }
  .map-body   { grid-template-columns: 1fr; }
  .leaflet-map { height: 380px; }
  .region-list { max-height: 320px; border-right: none; border-top: var(--thin-line); }
}
@media (max-width: 480px) {
  .leaflet-map { height: 280px; }
}
</style>
