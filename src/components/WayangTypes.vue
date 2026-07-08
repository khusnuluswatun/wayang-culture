<script setup>
import { ref } from 'vue'

import wayangKulit from '../assets/wayang-kulit.avif'
import wayangGolek from '../assets/wayang-golek2.jpg'
import wayangBeber from '../assets/wayang-beber.jpg'
import wayangKlitik from '../assets/wayang-klitik.webp'
import wayangOrang from '../assets/wayang-orang.jpg'
import wayangSasak from '../assets/wayang-sasak.jpg'

const types = [
  { id:'kulit',  name:'Wayang Kulit',  origin:'Jawa & Bali',        era:'→ Abad 9 M',  desc:'Terbuat dari kulit kerbau yang ditatah. Dimainkan di balik layar putih dengan sorot lampu. Tokoh utama dari epik Mahabharata dan Ramayana.',  color:'#A13204', accent:'#D28E22', img: wayangKulit },
  { id:'golek',  name:'Wayang Golek',  origin:'Jawa Barat',         era:'→ Abad 16 M', desc:'Boneka tiga dimensi dari kayu. Cerita berdasarkan kisah Islam seperti Menak. Populer di kalangan masyarakat Sunda dan Betawi.',               color:'#8E4903', accent:'#D28E22', img: wayangGolek },
  { id:'beber',  name:'Wayang Beber',  origin:'Pacitan & Wonosari',  era:'→ Abad 14 M', desc:'Seni paling kuno. Cerita digambar pada lembaran kertas panjang yang dibentangkan (beber). Hampir punah dan sangat langka.',                  color:'#5E3F02', accent:'#A13204', img: wayangBeber },
  { id:'klitik', name:'Wayang Klitik', origin:'Jawa Timur',          era:'→ Abad 17 M', desc:'Wayang gepeng dari kayu tipis. Berbunyi "kletik-kletik" saat dimainkan. Menceritakan kisah Damarwulan dan Panji.',                            color:'#451100', accent:'#8E4903', img: wayangKlitik },
  { id:'orang',  name:'Wayang Orang',  origin:'Jawa Tengah',         era:'→ Abad 18 M', desc:'Pertunjukan wayang dimainkan oleh manusia dengan kostum dan tata rias lengkap. Menggabungkan tari, drama, dan gamelan.',                       color:'#A13204', accent:'#D28E22', img: wayangOrang },
  { id:'sasak',  name:'Wayang Sasak',  origin:'Lombok, NTB',         era:'→ Abad 18 M', desc:'Khas Lombok dengan pengaruh Islam yang kuat. Cerita dari siklus Menak berbahasa Sasak dengan ornamen khas Lombok.',                           color:'#8E4903', accent:'#D28E22', img: wayangSasak },
]

const activeType = ref(types[0])
</script>

<template>
  <section class="types-section" id="types" aria-label="Jenis dan Ragam Wayang">
    <header class="types-header-bar">
      <div class="container types-header">
        <p class="label">003 — Jenis &amp; Ragam</p>
        <h2 class="reveal">Jenis &amp; Ragam<br>Wayang</h2>
        <p class="types-sub reveal delay-1">Dari Sabang sampai Merauke, Indonesia memiliki kekayaan jenis wayang yang beragam dengan ciri khas masing-masing.</p>
      </div>
    </header>

    <div class="types-body container" role="tablist" aria-label="Pilih jenis wayang">
      <nav class="types-tabs" aria-label="Navigasi jenis wayang">
        <button
          v-for="type in types" :key="type.id"
          class="type-tab"
          :class="{ active: activeType.id === type.id }"
          role="tab"
          :id="`tab-${type.id}`"
          :aria-selected="activeType.id === type.id"
          :aria-controls="`panel-${type.id}`"
          @click="activeType = type"
        >
          <span class="tab-label">{{ type.name }}</span>
          <span class="tab-origin">{{ type.origin }}</span>
        </button>
      </nav>

      <article
        class="type-detail"
        v-if="activeType"
        :id="`panel-${activeType.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeType.id}`"
      >
        <div class="detail-left">
          <p class="detail-era">{{ activeType.era }}</p>
          <h3 class="detail-name">{{ activeType.name }}</h3>
          <p class="detail-desc">{{ activeType.desc }}</p>
          <div class="detail-badge">
            <span>Asal: {{ activeType.origin }}</span>
          </div>
        </div>
        <div class="detail-right" :style="{ background: activeType.color }" aria-hidden="true">
          <img
            v-if="activeType.img"
            :src="activeType.img"
            :alt="activeType.name"
            class="detail-img"
          />
          <div class="detail-img-overlay"></div>
          <span class="visual-name">{{ activeType.name }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.types-section { background: var(--bg-alt); padding-bottom: clamp(60px,10vw,100px); }

.types-header-bar { background: var(--darkest); padding: clamp(40px,8vw,80px) 0 clamp(32px,5vw,60px); border-bottom: 3px solid var(--accent); }
.types-header { display: grid; grid-template-columns: 160px 1fr 1fr; gap: clamp(16px,3vw,40px); align-items: start; }
.types-header h2 { color: var(--white); font-size: clamp(1.8rem,4vw,3.5rem); }
.types-sub { font-size: clamp(0.82rem,1.5vw,0.92rem); color: rgba(245,237,216,0.6); line-height: 1.7; }

.types-body { display: grid; grid-template-columns: 240px 1fr; background: var(--bg); border-bottom: var(--thick-line); }

.types-tabs { border-right: var(--thin-line); display: flex; flex-direction: column; }
.type-tab {
  all: unset; display: flex; flex-direction: column; gap: 3px;
  padding: clamp(14px,2vw,20px) clamp(16px,2vw,24px);
  border-bottom: var(--thin-line); cursor: pointer; transition: background 0.2s;
  position: relative;
}
.type-tab::before {
  content:''; position:absolute; left:0; top:0; bottom:0;
  width:3px; background: var(--accent); transform:scaleY(0); transition: transform 0.2s;
}
.type-tab:hover, .type-tab.active { background: rgba(161,50,4,0.06); }
.type-tab.active::before { transform: scaleY(1); }
.tab-label  { font-weight: 600; font-size: clamp(0.82rem,1.2vw,0.9rem); }
.tab-origin { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.08em; color: var(--text-muted); }

.type-detail { display: grid; grid-template-columns: 1fr 280px; }
.detail-left { padding: clamp(28px,4vw,48px) clamp(20px,3vw,40px); display: flex; flex-direction: column; gap: 14px; }
.detail-era  { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; }
.detail-name { font-size: clamp(1.4rem,3vw,2.4rem); letter-spacing: -0.03em; }
.detail-desc { font-size: clamp(0.85rem,1.4vw,0.95rem); line-height: 1.75; max-width: 480px; }
.detail-badge span { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.1em; background: var(--darkest); color: var(--cream); padding: 7px 14px; text-transform: uppercase; }
.detail-right { border-left: var(--thin-line); position:relative; overflow:hidden; min-height: 280px; display:flex; align-items:center; justify-content:center; transition: background 0.4s; }
.visual-name { position:absolute; bottom: 12px; right: 12px; z-index:2; font-family:var(--mono); font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.6); writing-mode:vertical-rl; }
.detail-img { position:relative; z-index:1; width:100%; height:100%; max-height:320px; object-fit:contain; object-position:center; transition: transform 0.5s ease; filter: sepia(10%) saturate(1.2); padding: 12px; box-sizing:border-box; }
.detail-right:hover .detail-img { transform: scale(1.04); }
.detail-img-overlay { position:absolute; inset:0; background: linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%); z-index:0; }


@media (max-width: 900px) {
  .types-header  { grid-template-columns: 1fr; gap: 14px; }
  .types-body    { grid-template-columns: 1fr; }
  .types-tabs    { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: var(--thin-line); }
  .type-tab      { min-width: 130px; border-bottom: none; border-right: var(--thin-line); flex-shrink: 0; }
  .type-tab::before { top:auto; bottom:0; left:0; right:0; width:auto; height:3px; transform:scaleX(0); }
  .type-tab.active::before { transform: scaleX(1); }
  .type-detail   { grid-template-columns: 1fr; }
  .detail-right  { display: none; }
}
</style>
