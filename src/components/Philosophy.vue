<script setup>
const philosophies = [
  { javanese:'Hamemayu Hayuning Bawana', translation:'Memperindah Keindahan Dunia',    desc:'Filosofi Jawa yang mengajarkan bahwa manusia harus memelihara dan memperindah alam semesta, bukan merusaknya.', icon:'○' },
  { javanese:'Sangkan Paraning Dumadi',  translation:'Dari Mana dan Ke Mana Kita Berasal', desc:'Wayang mengajarkan tentang asal-usul dan tujuan akhir manusia. Setiap perjalanan tokoh adalah cermin perjalanan hidup kita.', icon:'△' },
  { javanese:'Manunggaling Kawula Gusti',translation:'Menyatunya Hamba dengan Tuhan',  desc:'Konsep tertinggi spiritualitas Jawa. Manusia yang sempurna adalah yang mampu menyatukan dirinya dengan kehendak Ilahi.', icon:'□' },
]

const quotes = [
  { text:'Wayang bukan sekadar boneka, ia adalah cermin jiwa manusia yang mencari jalan menuju kebijaksanaan abadi.', source:'Ki Manteb Soedharsono' },
  { text:'Dalam setiap cerita wayang, tersimpan ribuan kebijaksanaan leluhur yang menunggu untuk dipahami.',          source:'Ki Anom Suroto' },
]
</script>

<template>
  <section class="philosophy-section" id="philosophy" aria-label="Filosofi Wayang">
    <header class="philo-header-bar">
      <div class="container philo-header">
        <p class="label">006 — Filosofi</p>
        <h2 class="reveal">Filosofi<br><span class="outline-text-light">Kosmis</span></h2>
        <p class="philo-sub reveal delay-2">Wayang bukan pertunjukan semata. Di balik setiap gerakan, tersimpan nilai-nilai universal tentang kehidupan, kematian, dan transendensi.</p>
      </div>
    </header>

    <ul class="philo-cards container" role="list">
      <li v-for="(phil, i) in philosophies" :key="phil.javanese" class="philo-card reveal" :class="`delay-${i+1}`">
        <p class="philo-icon" aria-hidden="true">{{ phil.icon }}</p>
        <div class="philo-content">
          <p class="philo-num" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</p>
          <h3 class="philo-jav">{{ phil.javanese }}</h3>
          <p class="philo-trans">"{{ phil.translation }}"</p>
          <p class="philo-desc">{{ phil.desc }}</p>
        </div>
      </li>
    </ul>

    <div class="swiss-rule-thick" style="background:rgba(210,142,34,0.3);"></div>

    <div class="quotes-section container">
      <p class="label reveal" style="margin-bottom:clamp(24px,4vw,40px)">Kata Para Dalang Maestro</p>
      <ul class="quotes-grid" role="list">
        <li v-for="(quote, i) in quotes" :key="i" class="quote-card reveal" :class="`delay-${i+1}`">
          <blockquote>
            <p class="quote-mark" aria-hidden="true">"</p>
            <p class="quote-text">{{ quote.text }}</p>
            <footer><cite class="quote-source">— {{ quote.source }}</cite></footer>
          </blockquote>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.philosophy-section { background: var(--darkest); padding-bottom: clamp(60px,10vw,100px); }

.philo-header-bar { padding: clamp(40px,8vw,80px) 0 clamp(32px,5vw,60px); border-bottom: 3px solid rgba(210,142,34,0.3); }
.philo-header { display: grid; grid-template-columns: 160px 1fr 1fr; gap: clamp(16px,3vw,40px); align-items: start; }
.philo-header h2 { font-size:clamp(2rem,5vw,5rem); letter-spacing:-0.04em; color:var(--white); }
.outline-text-light { -webkit-text-stroke: 2px rgba(210,142,34,0.5); color:transparent; }
.philo-sub { font-size:clamp(0.82rem,1.4vw,0.95rem); line-height:1.75; color:rgba(245,237,216,0.55); }

.philo-cards { display:grid; grid-template-columns:repeat(3,1fr); border-left:3px solid rgba(210,142,34,0.3); border-top:3px solid rgba(210,142,34,0.3); list-style:none; }
.philo-card { padding:clamp(28px,4vw,48px) clamp(20px,3vw,36px); border-right:1px solid rgba(210,142,34,0.15); border-bottom:1px solid rgba(210,142,34,0.15); display:flex; flex-direction:column; gap:18px; transition:background 0.3s; }
.philo-card:hover { background:rgba(161,50,4,0.08); }

.philo-icon { font-size:2.5rem; color:var(--accent); opacity:0.5; line-height:1; }
.philo-content { display:flex; flex-direction:column; gap:8px; }
.philo-num { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; color:var(--accent); }
.philo-jav  { font-size:clamp(0.95rem,1.5vw,1.15rem); font-weight:700; color:var(--cream); letter-spacing:-0.01em; font-style:italic; line-height:1.3; }
.philo-trans{ font-family:var(--mono); font-size:0.7rem; letter-spacing:0.06em; color:var(--accent); text-transform:uppercase; }
.philo-desc { font-size:0.83rem; line-height:1.7; color:rgba(245,237,216,0.55); }

.quotes-section { padding-top:clamp(48px,7vw,80px); display:flex; flex-direction:column; }
.quotes-grid { display:grid; grid-template-columns:repeat(2,1fr); border-left:3px solid rgba(210,142,34,0.3); border-top:3px solid rgba(210,142,34,0.3); list-style:none; }
.quote-card { border-right:1px solid rgba(210,142,34,0.15); border-bottom:1px solid rgba(210,142,34,0.15); padding:clamp(28px,4vw,48px) clamp(20px,3vw,40px); transition:background 0.3s; }
.quote-card:hover { background:rgba(210,142,34,0.05); }
.quote-mark { font-family:var(--mono); font-size:3.5rem; line-height:0.8; color:var(--accent); opacity:0.5; font-weight:700; margin-bottom:12px; }
.quote-text { font-size:clamp(0.88rem,1.5vw,1.05rem); line-height:1.75; color:rgba(245,237,216,0.8); font-style:italic; margin-bottom:16px; }
.quote-source { font-family:var(--mono); font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--cream); font-style:normal; }

@media (max-width: 900px) {
  .philo-header { grid-template-columns:1fr; gap:16px; }
  .philo-cards  { grid-template-columns:1fr; }
  .quotes-grid  { grid-template-columns:1fr; }
}
</style>
