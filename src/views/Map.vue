<script setup>
import { onMounted } from 'vue'
import IndonesiaMap from '../components/IndonesiaMap.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})

const regions = [
  { name:'Jawa Tengah & DIY', wayang:'Wayang Kulit Purwa, Wayang Orang', color:'#D28E22' },
  { name:'Jawa Barat',        wayang:'Wayang Golek, Wayang Cepak',        color:'#A13204' },
  { name:'Jawa Timur',        wayang:'Wayang Klitik, Wayang Topeng',      color:'#5E3F02' },
  { name:'Bali',              wayang:'Wayang Kulit Bali, Wayang Lemah',   color:'#8E4903' },
  { name:'Lombok, NTB',       wayang:'Wayang Sasak, Wayang Menak',        color:'#451100' },
  { name:'Sumatera',          wayang:'Wayang Banjar, Wayang Palembang',   color:'#D28E22' },
]
</script>

<template>
  <div>
    <section class="map-hero" aria-label="Peta Persebaran Wayang Indonesia">
      <div class="mh-grid-bg" aria-hidden="true"><div v-for="i in 12" :key="i" class="mh-col"></div></div>
      <div class="mh-letter" aria-hidden="true">P</div>
      <div class="container mh-content">
        <div class="mh-left">
          <p class="label reveal">008 — Sebaran Nusantara</p>
          <h1 class="mh-title reveal delay-1">
            <span>PETA</span>
            <span class="outline">WAYANG</span>
            <span class="gold">INDONESIA</span>
          </h1>
          <div class="mh-desc reveal delay-2">
            <div class="mh-rule"></div>
            <p>Wayang tersebar dari Sabang hingga Merauke, masing-masing daerah memiliki gaya, cerita, dan karakter unik yang mencerminkan kekayaan budaya lokal.</p>
          </div>
        </div>
        <div class="mh-right reveal delay-2">
          <div class="mh-info-box">
            <div class="mib-item">
              <span class="mib-num">34</span>
              <span class="mib-label">Provinsi</span>
            </div>
            <div class="mib-div"></div>
            <div class="mib-item">
              <span class="mib-num">20+</span>
              <span class="mib-label">Jenis Wayang</span>
            </div>
            <div class="mib-div"></div>
            <div class="mib-item">
              <span class="mib-num">6</span>
              <span class="mib-label">Wilayah Utama</span>
            </div>
          </div>
          <p class="mh-hint reveal delay-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Klik marker pada peta untuk info detail wilayah
          </p>
        </div>
      </div>
    </section>

    <IndonesiaMap />

    <section class="region-section" aria-label="Wilayah Persebaran Wayang">
      <div class="container">
        <header class="region-header">
          <p class="label reveal">Sebaran Wilayah</p>
          <h2 class="reveal delay-1">Wayang di<br><span class="outline-text">Berbagai Daerah</span></h2>
        </header>
        <div class="region-grid">
          <article
            v-for="(r, i) in regions"
            :key="r.name"
            class="region-card reveal"
            :class="`delay-${(i % 3) + 1}`"
            :style="{ '--region-color': r.color }"
          >
            <div class="rc-top">
              <span class="rc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="rc-name">{{ r.name }}</h3>
            <p class="rc-wayang">{{ r.wayang }}</p>
            <div class="rc-bar"></div>
          </article>
        </div>
      </div>
    </section>

    <section class="dist-stats" aria-label="Statistik Persebaran">
      <div class="container">
        <div class="ds-grid">
          <div class="ds-text reveal">
            <p class="label">Rasio Jenis Wayang</p>
            <h2>Kontribusi Varian<br><span class="outline-text">Wayang Nusantara</span></h2>
            <p class="ds-body">Data kontribusi varian jenis pertunjukan wayang tradisional yang tersebar dan berkembang secara aktif di seluruh wilayah kepulauan Indonesia (total 100%).</p>
          </div>
          <div class="ds-facts reveal delay-2">
            <div class="df-item">
              <div class="df-bar-wrap">
                <span class="df-label">Jawa & Bali</span>
                <div class="df-bar"><div class="df-fill" style="width:60%"></div></div>
                <span class="df-pct">60%</span>
              </div>
            </div>
            <div class="df-item">
              <div class="df-bar-wrap">
                <span class="df-label">Sumatera</span>
                <div class="df-bar"><div class="df-fill" style="width:15%"></div></div>
                <span class="df-pct">15%</span>
              </div>
            </div>
            <div class="df-item">
              <div class="df-bar-wrap">
                <span class="df-label">Nusa Tenggara</span>
                <div class="df-bar"><div class="df-fill" style="width:15%"></div></div>
                <span class="df-pct">15%</span>
              </div>
            </div>
            <div class="df-item">
              <div class="df-bar-wrap">
                <span class="df-label">Kalimantan</span>
                <div class="df-bar"><div class="df-fill" style="width:10%"></div></div>
                <span class="df-pct">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.map-hero { min-height:60vh; background:var(--darkest); position:relative; overflow:hidden; display:flex; align-items:center; padding:clamp(100px,16vw,150px) 0 clamp(60px,10vw,100px); }
.mh-grid-bg { position:absolute; inset:0; display:grid; grid-template-columns:repeat(12,1fr); pointer-events:none; opacity:0.04; }
.mh-col { border-left:1px solid var(--cream); }
.mh-letter { position:absolute; top:-0.05em; right:-0.04em; font-size:clamp(10rem,28vw,32rem); font-weight:700; color:rgba(210,142,34,0.04); line-height:1; pointer-events:none; user-select:none; }
.mh-content { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; position:relative; z-index:2; }
.mh-left { display:flex; flex-direction:column; gap:clamp(20px,3vw,28px); }
.mh-title { display:flex; flex-direction:column; font-size:clamp(3rem,8vw,7rem); line-height:0.9; letter-spacing:-0.04em; gap:4px; }
.mh-title span { display:block; color:var(--white); }
.mh-title .outline { -webkit-text-stroke:2px var(--cream); color:transparent; }
.mh-title .gold { color:var(--cream); }
.mh-desc { display:flex; gap:18px; align-items:flex-start; }
.mh-rule { width:3px; min-height:60px; background:var(--accent); flex-shrink:0; }
.mh-desc p { color:rgba(245,237,216,0.6); font-size:clamp(0.85rem,1.5vw,0.95rem); line-height:1.8; }
.mh-info-box { display:flex; align-items:center; border:1px solid rgba(210,142,34,0.2); padding:28px 32px; margin-bottom:20px; background:rgba(210,142,34,0.04); }
.mib-item { display:flex; flex-direction:column; gap:4px; flex:1; }
.mib-num  { font-family:var(--mono); font-size:2rem; font-weight:700; color:var(--cream); letter-spacing:-0.04em; }
.mib-label{ font-family:var(--mono); font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(210,142,34,0.6); }
.mib-div  { width:1px; height:48px; background:rgba(210,142,34,0.2); margin:0 24px; }
.mh-hint  { display:flex; align-items:center; gap:8px; font-family:var(--mono); font-size:0.68rem; letter-spacing:0.08em; color:rgba(245,237,216,0.4); }

.region-section { background:var(--bg-alt); padding:clamp(60px,10vw,100px) 0; }
.region-header { margin-bottom:clamp(40px,6vw,60px); }
.region-header h2 { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; margin-top:14px; }
.region-grid { display:grid; grid-template-columns:repeat(3,1fr); border-left:var(--thick-line); border-top:var(--thick-line); }
.region-card {
  padding:clamp(28px,4vw,40px) clamp(20px,3vw,28px);
  border-right:var(--thin-line); border-bottom:var(--thin-line);
  display:flex; flex-direction:column; gap:12px;
  transition:background 0.3s, transform 0.3s; position:relative; overflow:hidden;
}
.region-card:hover { background:var(--darkest); transform:translateY(-4px); }
.rc-top { display:flex; justify-content:space-between; align-items:center; }
.rc-icon { font-size:2rem; line-height:1; }
.rc-num  { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; color:var(--accent); }
.rc-name { font-size:clamp(0.95rem,1.5vw,1.15rem); font-weight:700; letter-spacing:-0.02em; transition:color 0.3s; }
.rc-wayang { font-family:var(--mono); font-size:0.7rem; letter-spacing:0.05em; color:var(--text-muted); line-height:1.5; }
.rc-bar { height:3px; background:var(--region-color, var(--accent)); transform:scaleX(0); transform-origin:left; transition:transform 0.4s; }
.region-card:hover .rc-bar { transform:scaleX(1); }
.region-card:hover .rc-name { color:var(--cream); }

.dist-stats { background:var(--darkest); padding:clamp(60px,10vw,100px) 0; border-top:3px solid rgba(210,142,34,0.3); }
.ds-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,8vw,100px); align-items:center; }
.ds-text h2 { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; margin:14px 0 20px; }
.ds-body { font-size:clamp(0.82rem,1.4vw,0.9rem); line-height:1.8; color:rgba(245,237,216,0.55); }
.ds-facts { display:flex; flex-direction:column; gap:28px; }
.df-bar-wrap { display:flex; align-items:center; gap:16px; }
.df-label { font-family:var(--mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; color:rgba(245,237,216,0.6); width:120px; flex-shrink:0; }
.df-bar { flex:1; height:6px; background:rgba(255,255,255,0.08); position:relative; overflow:hidden; }
.df-fill { height:100%; background:var(--accent); border-radius:0; animation:fillBar 1.2s ease-out forwards; }
.df-pct { font-family:var(--mono); font-size:0.68rem; color:var(--accent); width:36px; text-align:right; }
@keyframes fillBar { from { width:0 !important; } }

@media (max-width:900px) {
  .mh-content { grid-template-columns:1fr; }
  .mh-right { display:none; }
  .region-grid { grid-template-columns:repeat(2,1fr); }
  .ds-grid { grid-template-columns:1fr; }
}
@media (max-width:480px) {
  .region-grid { grid-template-columns:1fr; }
}
</style>
