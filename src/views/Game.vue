<script setup>
import { onMounted } from 'vue'
import GameComponent from '../components/Game.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})

const gameModes = [
  { title:'Trivia Wayang', desc:'Uji pengetahuanmu tentang tokoh, kisah, dan filosofi wayang Indonesia.', badge:'Quiz', color:'#A13204' },
]

const tips = [
  { tip:'Perhatikan gambar tokoh wayang yang ditampilkan pada soal' },
  { tip:'Pilih satu dari empat opsi jawaban yang paling tepat' },
  { tip:'Dapatkan 10 poin untuk setiap jawaban yang benar' },
  { tip:'Lihat total skor akhir di akhir sesi kuis' },
]

function scrollToGame() {
  const el = document.getElementById('game-section')
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <section class="game-hero" aria-label="Halaman Game Wayang">
      <div class="gh-grid-bg" aria-hidden="true"><div v-for="i in 12" :key="i" class="gh-col"></div></div>
      <div class="gh-letter" aria-hidden="true">G</div>
      <div class="container gh-content">
        <div class="gh-left">
          <p class="label reveal">010 — Kuis Interaktif</p>
          <h1 class="gh-title reveal delay-1">
            <span>MAIN</span>
            <span class="outline">GAME</span>
            <span class="gold">WAYANG</span>
          </h1>
          <div class="gh-desc reveal delay-2">
            <div class="gh-rule"></div>
            <p>Belajar sambil bermain! Uji pengetahuanmu tentang dunia pewayangan Nusantara melalui kuis trivia interaktif yang seru dan menantang.</p>
          </div>
        </div>
        <div class="gh-right reveal delay-2">
          <div class="game-mode-cards">
            <div
              v-for="m in gameModes"
              :key="m.title"
              class="gmc-card"
              :style="{ '--gmc-color': m.color }"
            >
              <div class="gmc-info">
                <div class="gmc-top">
                  <h3 class="gmc-title">{{ m.title }}</h3>
                  <span class="gmc-badge">{{ m.badge }}</span>
                </div>
                <p class="gmc-desc gmc-desc--clickable" @click="scrollToGame">{{ m.desc }} <span class="click-hint">→ Main Sekarang</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="how-to-play" aria-label="Cara Bermain">
      <div class="container">
        <header class="htp-header">
          <p class="label reveal">Panduan Bermain</p>
          <h2 class="reveal delay-1">Cara Bermain<br><span class="outline-text">Wayang Trivia</span></h2>
        </header>
        <div class="tips-grid">
          <div
            v-for="(item, i) in tips"
            :key="i"
            class="tip-card reveal"
            :class="`delay-${i + 1}`"
          >
            <span class="tip-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <p class="tip-text">{{ item.tip }}</p>
          </div>
        </div>
      </div>
    </section>

    <div id="game-section">
      <GameComponent />
    </div>

    <section class="challenge-banner" aria-label="Tantangan Wayang">
      <div class="container cb-inner">
        <div class="cb-left reveal">
          <p class="label">Tantangan Minggu Ini</p>
          <h2 class="cb-title">Raih Skor<br><span class="cb-score">50 / 50</span><br>Sempurna!</h2>
        </div>
        <div class="cb-right reveal delay-2">
          <p class="cb-body" style="margin-bottom:0;">Buktikan kemampuanmu! Jawab semua pertanyaan kuis dengan benar dan capai skor sempurna 50 poin untuk membuktikan kamu ahli pewayangan sejati.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.game-hero { min-height:60vh; background:var(--darkest); position:relative; overflow:hidden; display:flex; align-items:center; padding:clamp(100px,16vw,150px) 0 clamp(60px,10vw,100px); }
.gh-grid-bg { position:absolute; inset:0; display:grid; grid-template-columns:repeat(12,1fr); pointer-events:none; opacity:0.04; }
.gh-col { border-left:1px solid var(--cream); }
.gh-letter { position:absolute; top:-0.05em; right:-0.04em; font-size:clamp(10rem,28vw,32rem); font-weight:700; color:rgba(210,142,34,0.04); line-height:1; pointer-events:none; user-select:none; }
.gh-content { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; position:relative; z-index:2; }
.gh-left { display:flex; flex-direction:column; gap:clamp(20px,3vw,28px); }
.gh-title { display:flex; flex-direction:column; font-size:clamp(3rem,8vw,7rem); line-height:0.9; letter-spacing:-0.04em; gap:4px; }
.gh-title span { display:block; color:var(--white); }
.gh-title .outline { -webkit-text-stroke:2px var(--cream); color:transparent; }
.gh-title .gold { color:var(--cream); }
.gh-desc { display:flex; gap:18px; align-items:flex-start; }
.gh-rule { width:3px; min-height:60px; background:var(--accent); flex-shrink:0; }
.gh-desc p { color:rgba(245,237,216,0.6); font-size:clamp(0.85rem,1.5vw,0.95rem); line-height:1.8; }

.game-mode-cards { display:flex; flex-direction:column; gap:0; border:1px solid rgba(210,142,34,0.2); }
.gmc-card { display:flex; gap:16px; padding:20px 24px; border-bottom:1px solid rgba(210,142,34,0.15); transition:background 0.3s; cursor:default; }
.gmc-card:last-child { border-bottom:none; }
.gmc-card:hover { background:rgba(210,142,34,0.06); }
.gmc-icon { font-size:2.2rem; line-height:1; flex-shrink:0; }
.gmc-info { display:flex; flex-direction:column; gap:6px; }
.gmc-top { display:flex; align-items:center; gap:10px; }
.gmc-title { font-size:1rem; font-weight:700; letter-spacing:-0.02em; color:var(--white); }
.gmc-badge { font-family:var(--mono); font-size:0.55rem; letter-spacing:0.15em; text-transform:uppercase; border:1px solid var(--gmc-color, var(--accent)); color:var(--gmc-color, var(--accent)); padding:2px 8px; }
.gmc-desc { font-size:0.78rem; line-height:1.55; color:rgba(245,237,216,0.5); }
.gmc-desc--clickable { cursor:pointer; transition:color 0.2s; }
.gmc-desc--clickable:hover { color:var(--cream); }
.click-hint { font-family:var(--mono); font-size:0.65rem; color:var(--accent); font-weight:700; opacity:0; transition:opacity 0.2s; margin-left:4px; }
.gmc-card:hover .click-hint, .gmc-desc--clickable:hover .click-hint { opacity:1; }

.how-to-play { background:var(--bg); padding:clamp(60px,10vw,100px) 0; }
.htp-header { margin-bottom:clamp(40px,6vw,56px); }
.htp-header h2 { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; margin-top:14px; }
.tips-grid { display:grid; grid-template-columns:repeat(4,1fr); border-left:var(--thick-line); border-top:var(--thick-line); }
.tip-card { padding:clamp(24px,4vw,36px) clamp(18px,3vw,28px); border-right:var(--thin-line); border-bottom:var(--thin-line); display:flex; flex-direction:column; gap:12px; transition:background 0.3s; }
.tip-card:hover { background:var(--darkest); }
.tip-icon { font-size:2rem; line-height:1; }
.tip-num  { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; color:var(--accent); }
.tip-text { font-size:0.83rem; line-height:1.65; }
.tip-card:hover .tip-text { color:rgba(245,237,216,0.7); }

.challenge-banner { background:var(--darkest); border-top:3px solid var(--accent); padding:clamp(60px,10vw,100px) 0; }
.cb-inner { display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,8vw,100px); align-items:center; }
.cb-title { font-size:clamp(2rem,5vw,4rem); letter-spacing:-0.04em; color:var(--white); margin-top:14px; line-height:1; }
.cb-score { display:block; font-size:clamp(3rem,8vw,7rem); color:var(--cream); line-height:0.9; }
.cb-body  { font-size:clamp(0.85rem,1.4vw,0.95rem); line-height:1.8; color:rgba(245,237,216,0.6); margin-bottom:32px; }
.cb-rewards { display:flex; gap:0; border-left:3px solid rgba(210,142,34,0.3); border-top:3px solid rgba(210,142,34,0.3); margin-bottom:20px; }
.cbr-item { padding:16px 20px; border-right:1px solid rgba(210,142,34,0.15); border-bottom:1px solid rgba(210,142,34,0.15); display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; transition:background 0.3s; }
.cbr-item:hover { background:rgba(210,142,34,0.06); }
.cbr-icon  { font-size:1.5rem; }
.cbr-label { font-family:var(--mono); font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(245,237,216,0.5); text-align:center; }
.cb-note   { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.08em; color:rgba(245,237,216,0.25); font-style:italic; }

@media (max-width:900px) {
  .gh-content { grid-template-columns:1fr; }
  .gh-right { display:none; }
  .tips-grid { grid-template-columns:repeat(2,1fr); }
  .cb-inner { grid-template-columns:1fr; }
}
@media (max-width:480px) {
  .tips-grid { grid-template-columns:1fr; }
}
</style>
