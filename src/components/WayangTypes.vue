<script setup>
import { ref } from 'vue'

const types = [
  { id:'kulit',  name:'Wayang Kulit',  origin:'Jawa & Bali',        era:'→ Abad 9 M',  desc:'Terbuat dari kulit kerbau yang ditatah. Dimainkan di balik layar putih dengan sorot lampu. Tokoh utama dari epik Mahabharata dan Ramayana.',  color:'#A13204', accent:'#D28E22' },
  { id:'golek',  name:'Wayang Golek',  origin:'Jawa Barat',         era:'→ Abad 16 M', desc:'Boneka tiga dimensi dari kayu. Cerita berdasarkan kisah Islam seperti Menak. Populer di kalangan masyarakat Sunda dan Betawi.',               color:'#8E4903', accent:'#D28E22' },
  { id:'beber',  name:'Wayang Beber',  origin:'Pacitan & Wonosari',  era:'→ Abad 14 M', desc:'Seni paling kuno. Cerita digambar pada lembaran kertas panjang yang dibentangkan (beber). Hampir punah dan sangat langka.',                  color:'#5E3F02', accent:'#A13204' },
  { id:'klitik', name:'Wayang Klitik', origin:'Jawa Timur',          era:'→ Abad 17 M', desc:'Wayang gepeng dari kayu tipis. Berbunyi "kletik-kletik" saat dimainkan. Menceritakan kisah Damarwulan dan Panji.',                            color:'#451100', accent:'#8E4903' },
  { id:'orang',  name:'Wayang Orang',  origin:'Jawa Tengah',         era:'→ Abad 18 M', desc:'Pertunjukan wayang dimainkan oleh manusia dengan kostum dan tata rias lengkap. Menggabungkan tari, drama, dan gamelan.',                       color:'#A13204', accent:'#D28E22' },
  { id:'sasak',  name:'Wayang Sasak',  origin:'Lombok, NTB',         era:'→ Abad 18 M', desc:'Khas Lombok dengan pengaruh Islam yang kuat. Cerita dari siklus Menak berbahasa Sasak dengan ornamen khas Lombok.',                           color:'#8E4903', accent:'#D28E22' },
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
          <div class="visual-pattern">
            <div v-for="i in 9" :key="i" class="pattern-dot" :style="{ background: activeType.accent, opacity: 0.15 + i * 0.07 }"></div>
          </div>
          <span class="visual-name">{{ activeType.name }}</span>
        </div>
      </article>
    </div>

    <ul class="types-grid container" role="list" aria-label="Semua jenis wayang">
      <li
        v-for="(type, i) in types" :key="type.id+'-g'"
        class="type-grid-item reveal"
        :class="`delay-${i % 3 + 1}`"
        :style="{ borderTopColor: type.accent }"
        @click="activeType = type"
        role="button"
        :tabindex="0"
        :aria-label="`Pilih ${type.name}`"
        @keypress.enter="activeType = type"
      >
        <p class="tgi-num">{{ String(i+1).padStart(2,'0') }}</p>
        <h4 class="tgi-name">{{ type.name }}</h4>
        <p class="tgi-origin">{{ type.origin }}</p>
        <p class="tgi-desc">{{ type.desc.substring(0,80) }}…</p>
      </li>
    </ul>
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

.type-detail { display: grid; grid-template-columns: 1fr 220px; }
.detail-left { padding: clamp(28px,4vw,48px) clamp(20px,3vw,40px); display: flex; flex-direction: column; gap: 14px; }
.detail-era  { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; }
.detail-name { font-size: clamp(1.4rem,3vw,2.4rem); letter-spacing: -0.03em; }
.detail-desc { font-size: clamp(0.85rem,1.4vw,0.95rem); line-height: 1.75; max-width: 480px; }
.detail-badge span { font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.1em; background: var(--darkest); color: var(--cream); padding: 7px 14px; text-transform: uppercase; }
.detail-right { border-left: var(--thin-line); position:relative; overflow:hidden; min-height: 220px; display:flex; align-items:center; justify-content:center; transition: background 0.4s; }
.visual-pattern { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; padding: 16px; position:absolute; inset:0; align-content:center; justify-items:center; }
.pattern-dot { width:36px; height:36px; border-radius:50%; }
.visual-name { position:relative; z-index:1; font-family:var(--mono); font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.4); writing-mode:vertical-rl; }

.types-grid { display: grid; grid-template-columns: repeat(3,1fr); border-left: var(--thick-line); border-top: var(--thick-line); margin-top: clamp(32px,5vw,60px); list-style:none; }
.type-grid-item { padding: clamp(20px,3vw,32px) clamp(16px,2.5vw,28px); border-right: var(--thin-line); border-bottom: var(--thin-line); border-top: 3px solid transparent; cursor:pointer; transition: background 0.3s, transform 0.3s; }
.type-grid-item:hover { background: var(--bg); transform: translateY(-4px); }
.tgi-num    { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; color:var(--accent); margin-bottom:12px; }
.tgi-name   { font-size:clamp(0.85rem,1.3vw,1rem); font-weight:700; letter-spacing:-0.01em; margin-bottom:4px; text-transform:uppercase; }
.tgi-origin { font-family:var(--mono); font-size:0.65rem; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:10px; }
.tgi-desc   { font-size:0.8rem; line-height:1.6; }

@media (max-width: 900px) {
  .types-header  { grid-template-columns: 1fr; gap: 14px; }
  .types-body    { grid-template-columns: 1fr; }
  .types-tabs    { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: var(--thin-line); }
  .type-tab      { min-width: 130px; border-bottom: none; border-right: var(--thin-line); flex-shrink: 0; }
  .type-tab::before { top:auto; bottom:0; left:0; right:0; width:auto; height:3px; transform:scaleX(0); }
  .type-tab.active::before { transform: scaleX(1); }
  .type-detail   { grid-template-columns: 1fr; }
  .detail-right  { display: none; }
  .types-grid    { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  .types-grid { grid-template-columns: 1fr; }
}
</style>
