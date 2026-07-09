<script setup>
import { onMounted } from 'vue'
import Philosophy from '../components/Philosophy.vue'
import Process    from '../components/Process.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})

const accordionItems = [
  {
    q: 'Apa hubungan wayang dengan agama Hindu dan Islam?',
    a: 'Wayang awalnya berakar dari tradisi Hindu dengan cerita Mahabharata dan Ramayana. Ketika Islam masuk Nusantara, para Wali Songo mengadaptasi wayang sebagai media dakwah tanpa menghilangkan nilai budayanya. Hasilnya adalah akulturasi unik yang khas Indonesia.'
  },
  {
    q: 'Kenapa pertunjukan wayang selalu dimulai malam hari?',
    a: 'Secara filosofis, malam mewakili kegelapan dan ketidaktahuan manusia. Pertunjukan berlangsung semalam suntuk melambangkan perjalanan hidup manusia mencari kebenaran dan cahaya. Fajar di akhir pertunjukan melambangkan pencerahan dan kemenangan dharma.'
  },
  {
    q: 'Apa itu Gunungan (Kayon) dalam wayang?',
    a: 'Gunungan adalah figur berbentuk gunung atau pohon besar yang menjadi simbol alam semesta. Digunakan sebagai pembuka dan penutup pertunjukan, serta sebagai pemisah adegan. Bentuknya melambangkan pohon kehidupan (kalpataru) dan keseimbangan kosmos.'
  },
  {
    q: 'Berapa lama waktu untuk menjadi dalang profesional?',
    a: 'Menjadi dalang profesional membutuhkan waktu minimal 10-15 tahun pelatihan intensif. Seorang dalang harus menguasai ratusan tokoh wayang, suluk (nyanyian), sabet (gerakan), dan gending gamelan. Banyak dalang besar memulai latihan sejak usia 5-7 tahun.'
  },
  {
    q: 'Apakah ada wayang modern yang lahir saat ini?',
    a: 'Ya! Wayang terus berkembang. Ada Wayang Potehi (Tionghoa-Indonesia), Wayang Wahyu (berbasis kisah Injil), hingga Wayang Ukur karya Ki Sigit Sukasman yang lebih modern. Bahkan kini muncul wayang berbasis karakter superhero dan tokoh nasional.'
  },
]

import { ref } from 'vue'
const openIdx = ref(null)
function toggle(i) { openIdx.value = openIdx.value === i ? null : i }
</script>

<template>
  <div>
    <section class="philo-page-hero" aria-label="Halaman Filosofi Wayang">
      <div class="pph-grid-bg" aria-hidden="true"><div v-for="i in 12" :key="i" class="pph-col"></div></div>
      <div class="pph-letter" aria-hidden="true">F</div>
      <div class="container pph-content">
        <p class="label reveal">006 — Kearifan Leluhur</p>
        <h1 class="pph-title reveal delay-1">
          <span>FILOSOFI</span>
          <span class="outline">KOSMIS</span>
          <span class="gold">WAYANG</span>
        </h1>
        <div class="pph-desc reveal delay-2">
          <div class="pph-rule"></div>
          <p>Di balik setiap bayangan yang menari di kelir, tersimpan lautan makna tentang kehidupan, kematian, dharma, dan transendensi yang diwariskan sejak ribuan tahun silam.</p>
        </div>
      </div>
    </section>

    <Philosophy />
    <Process />

    <section class="faq-section" id="faq" aria-label="Pertanyaan Umum tentang Wayang">
      <div class="container">
        <header class="faq-header">
          <p class="label reveal">FAQ — Tanya Jawab</p>
          <h2 class="reveal delay-1">Pertanyaan yang Sering<br><span class="outline-text">Ditanyakan</span></h2>
        </header>
        <div class="faq-list" role="list">
          <div
            v-for="(item, i) in accordionItems"
            :key="i"
            class="faq-item reveal"
            :class="`delay-${(i % 3) + 1}`"
            role="listitem"
          >
            <button
              class="faq-question"
              :aria-expanded="openIdx === i"
              :id="`faq-btn-${i}`"
              :aria-controls="`faq-ans-${i}`"
              @click="toggle(i)"
            >
              <span class="fq-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="fq-text">{{ item.q }}</span>
              <span class="fq-icon" :class="{ open: openIdx === i }" aria-hidden="true">+</span>
            </button>
            <div
              class="faq-answer"
              :id="`faq-ans-${i}`"
              :aria-labelledby="`faq-btn-${i}`"
              :class="{ open: openIdx === i }"
            >
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="quote-wall" aria-label="Kata-kata Bijak Dalang Maestro">
      <div class="container">
        <p class="label reveal" style="margin-bottom:clamp(32px,5vw,56px)">Petuah Sang Dalang</p>
        <div class="qw-grid">
          <blockquote class="qw-card reveal delay-1">
            <span class="qw-mark">"</span>
            <p>"Dalang bukan hanya memainkan wayang. Dalang adalah wayang itu sendiri — ia adalah semua tokoh, semua suara, semua jiwa."</p>
            <footer><cite>— Ki Manteb Soedharsono</cite></footer>
          </blockquote>
          <blockquote class="qw-card reveal delay-2">
            <span class="qw-mark">"</span>
            <p>"Dalam kegelapan malam, cahaya blencong mengajarkan kita bahwa dari kegelapan pun kebenaran dapat terlihat."</p>
            <footer><cite>— Ki Anom Suroto</cite></footer>
          </blockquote>
          <blockquote class="qw-card qw-card--large reveal delay-1">
            <span class="qw-mark">"</span>
            <p>"Wayang adalah ensiklopedia kehidupan manusia. Tidak ada masalah hidup yang tidak ada jawabannya dalam cerita wayang."</p>
            <footer><cite>— Ki Nartosabdo</cite></footer>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.philo-page-hero {
  min-height: 60vh; background: var(--darkest);
  position: relative; overflow: hidden; display: flex; align-items: center;
  padding: clamp(100px,16vw,150px) 0 clamp(60px,10vw,100px);
}
.pph-grid-bg { position:absolute; inset:0; display:grid; grid-template-columns:repeat(12,1fr); pointer-events:none; opacity:0.04; }
.pph-col { border-left:1px solid var(--cream); }
.pph-letter { position:absolute; top:-0.05em; right:-0.04em; font-size:clamp(10rem,28vw,32rem); font-weight:700; color:rgba(210,142,34,0.04); line-height:1; pointer-events:none; user-select:none; }
.pph-content { display:flex; flex-direction:column; gap:clamp(20px,3vw,28px); position:relative; z-index:2; max-width:700px; }
.pph-title { display:flex; flex-direction:column; font-size:clamp(3rem,8vw,7rem); line-height:0.9; letter-spacing:-0.04em; gap:4px; }
.pph-title span { display:block; color:var(--white); }
.pph-title .outline { -webkit-text-stroke:2px var(--cream); color:transparent; }
.pph-title .gold   { color:var(--cream); }
.pph-desc { display:flex; gap:18px; align-items:flex-start; }
.pph-rule { width:3px; min-height:60px; background:var(--accent); flex-shrink:0; }
.pph-desc p { color:rgba(245,237,216,0.6); font-size:clamp(0.85rem,1.5vw,0.95rem); line-height:1.8; }

.faq-section { background:var(--bg); padding:clamp(60px,10vw,100px) 0; }
.faq-header { margin-bottom:clamp(40px,6vw,60px); }
.faq-header h2 { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; margin-top:14px; }
.faq-list { display:flex; flex-direction:column; gap:0; border-top:var(--thick-line); }
.faq-item { border-bottom:var(--thin-line); }
.faq-question {
  all:unset; display:flex; align-items:center; gap:20px; width:100%;
  padding:clamp(18px,3vw,24px) 0; cursor:pointer;
  transition:background 0.2s; box-sizing:border-box;
}
.faq-question:hover .fq-text { color:var(--accent); }
.fq-num  { font-family:var(--mono); font-size:0.65rem; letter-spacing:0.2em; color:var(--accent); width:28px; flex-shrink:0; }
.fq-text { flex:1; font-size:clamp(0.9rem,1.5vw,1.05rem); font-weight:600; letter-spacing:-0.01em; transition:color 0.2s; }
.fq-icon { font-size:1.4rem; color:var(--accent); font-weight:300; transition:transform 0.3s; flex-shrink:0; }
.fq-icon.open { transform:rotate(45deg); }
.faq-answer {
  max-height:0; overflow:hidden; transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s;
  padding:0 0 0 48px;
}
.faq-answer.open { max-height:300px; padding:0 0 24px 48px; }
.faq-answer p { font-size:clamp(0.82rem,1.3vw,0.9rem); line-height:1.8; color:rgba(var(--text-rgb,56,28,8),0.7); }

.quote-wall { background:var(--darkest); padding:clamp(60px,10vw,100px) 0; border-top:3px solid rgba(210,142,34,0.3); }
.qw-grid { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto; gap:0; border-left:3px solid rgba(210,142,34,0.3); border-top:3px solid rgba(210,142,34,0.3); }
.qw-card { padding:clamp(28px,4vw,48px) clamp(24px,3vw,40px); border-right:1px solid rgba(210,142,34,0.15); border-bottom:1px solid rgba(210,142,34,0.15); position:relative; transition:background 0.3s; }
.qw-card:hover { background:rgba(210,142,34,0.04); }
.qw-card--large { grid-column:1 / -1; }
.qw-mark { font-family:var(--mono); font-size:3.5rem; line-height:0.8; color:var(--accent); opacity:0.4; font-weight:700; display:block; margin-bottom:12px; }
.qw-card p { font-size:clamp(0.9rem,1.5vw,1.1rem); line-height:1.75; color:rgba(245,237,216,0.8); font-style:italic; margin-bottom:16px; }
.qw-card--large p { font-size:clamp(1rem,2vw,1.25rem); }
.qw-card cite { font-family:var(--mono); font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--cream); font-style:normal; }

@media (max-width:768px) {
  .qw-grid { grid-template-columns:1fr; }
  .qw-card--large { grid-column:1; }
  .faq-answer.open { padding:0 0 20px 36px; }
}
</style>
