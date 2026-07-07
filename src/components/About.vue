<script setup>
const features = [
  { icon:'◈', title:'Seni Bayangan',   body:'Wayang kulit menggunakan layar putih (kelir) yang diterangi lampu blencong. Bayangan yang tercipta menggambarkan kisah epik kosmis.' },
  { icon:'◉', title:'Dalang Maestro',  body:'Seorang dalang menguasai ratusan tokoh, gamelan, dan suluk. Pertunjukan berlangsung semalam suntuk dari senja hingga fajar.' },
  { icon:'◈', title:'Nilai Universal', body:'Filosofi Jawa tentang dharma, karma, dan moksha disampaikan melalui dialog tokoh wayang yang penuh makna kehidupan.' },
  { icon:'◉', title:'Gamelan Pengiring',body:'Orkestrasi gamelan menjadi jiwa pertunjukan. Setiap gendhing (lagu) menciptakan suasana yang berbeda dalam setiap adegan.' },
]
</script>

<template>
  <section class="about-section" id="about" aria-label="Tentang Wayang">
    <div class="container">
      <div class="about-top">
        <div class="about-label-col">
          <p class="label reveal">002 — Tentang Wayang</p>
        </div>
        <div class="about-title-col">
          <h2 class="about-title reveal delay-1">
            Warisan<br>
            <span class="outline-text">Leluhur</span><br>
            Nusantara
          </h2>
        </div>
        <div class="about-body-col reveal delay-2">
          <p>Wayang merupakan salah satu puncak pencapaian peradaban manusia dalam bentuk seni pertunjukan. Pada tahun 2003, UNESCO mengakuinya sebagai <strong>Masterpiece of Oral and Intangible Heritage of Humanity</strong>.</p>
          <br>
          <p>Lebih dari sekadar hiburan, wayang adalah media pendidikan, ritual spiritual, dan filsafat kehidupan yang telah tumbuh selama ribuan tahun di tanah Nusantara.</p>
        </div>
      </div>

      <div class="swiss-rule" style="margin: clamp(32px,5vw,60px) 0 0;"></div>

      <ul class="features-grid" role="list" aria-label="Keistimewaan Wayang">
        <li
          v-for="(feat, i) in features"
          :key="feat.title"
          class="feature-card reveal"
          :class="`delay-${i + 1}`"
        >
          <div class="feat-header">
            <span class="feat-icon" aria-hidden="true">{{ feat.icon }}</span>
            <span class="feat-num" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</span>
          </div>
          <h3 class="feat-title">{{ feat.title }}</h3>
          <p class="feat-body">{{ feat.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: var(--bg);
  padding: clamp(60px,10vw,100px) 0;
}

.about-top {
  display: grid;
  grid-template-columns: 160px 1fr 1fr;
  gap: clamp(20px,4vw,40px);
  align-items: start;
}

.about-title {
  font-size: clamp(2rem,5vw,4.5rem);
  line-height: 0.95; letter-spacing: -0.04em;
}

.about-body-col p { font-size: clamp(0.85rem,1.5vw,0.95rem); line-height: 1.75; }
.about-body-col strong { color: var(--accent); font-weight: 600; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border-left: var(--thick-line);
  border-top: var(--thick-line);
  list-style: none;
}

.feature-card {
  padding: clamp(24px,4vw,36px) clamp(16px,3vw,28px);
  border-right: var(--thin-line);
  border-bottom: var(--thin-line);
  transition: background 0.3s, transform 0.3s;
  cursor: default;
}
.feature-card:hover { background: var(--darkest); transform: translateY(-2px); }
.feature-card:hover .feat-title { color: var(--cream); }
.feature-card:hover .feat-body  { color: rgba(245,237,216,0.6); }
.feature-card:hover .feat-icon  { color: var(--accent); }

.feat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.feat-icon   { font-size: 1.4rem; color: var(--accent); transition: color 0.3s; }
.feat-num    { font-family: var(--mono); font-size: 0.65rem; color: var(--text-muted); letter-spacing: 0.1em; }
.feat-title  { font-size: clamp(0.95rem,1.5vw,1.1rem); font-weight: 700; letter-spacing:-0.02em; margin-bottom:10px; transition:color 0.3s; }
.feat-body   { font-size: clamp(0.8rem,1.2vw,0.87rem); line-height:1.7; transition: color 0.3s; }

@media (max-width: 900px) {
  .about-top      { grid-template-columns: 1fr; gap: 20px; }
  .features-grid  { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  .features-grid  { grid-template-columns: 1fr; }
}
</style>
