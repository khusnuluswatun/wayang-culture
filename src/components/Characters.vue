<script setup>
import { ref } from 'vue'
import imgArjuna    from '../assets/arjuna.png'
import imgWerkudara from '../assets/werkudara.png'
import imgKresna    from '../assets/kresna.png'
import imgDuryudana from '../assets/duryudana.png'
import imgSrikandi  from '../assets/srikandi.png'
import imgSemar     from '../assets/semar.png'

const characters = [
  { id:'arjuna',   name:'Arjuna',    epithet:'Ksatria Pandawa', desc:'Putra ketiga Prabu Pandu, ksatria terbaik Pandawa. Mahir memanah, arif, tampan, dan menjadi murid utama Batara Guru.',             traits:['Kesatria','Bijaksana','Teguh'], side:'Pandawa', color:'#D28E22', img: imgArjuna },
  { id:'bima',     name:'Werkudara', epithet:'Ksatria Pandawa', desc:'Bima atau Werkudara, Pandawa kedua bertubuh raksasa dan bertenaga dahsyat. Jujur, teguh, dan pantang menyerah.',                   traits:['Kuat','Jujur','Pemberani'],    side:'Pandawa', color:'#A13204', img: imgWerkudara },
  { id:'kresna',   name:'Kresna',    epithet:'Titisan Wisnu',   desc:'Raja Dwarawati, awatara Batara Wisnu. Penasehat utama Pandawa, ahli strategi dan diplomasi paling cerdik di tiga dunia.',           traits:['Cerdas','Bijaksana','Karismatik'],side:'Pandawa',color:'#5E3F02', img: imgKresna },
  { id:'duryudana',name:'Duryudana', epithet:'Raja Astina',     desc:'Pemimpin Kurawa yang ambisius dan angkuh. Menginginkan seluruh kekuasaan Astina dan menjadi musuh utama Pandawa.',                  traits:['Ambisius','Keras','Angkuh'],   side:'Kurawa', color:'#180A02', img: imgDuryudana },
  { id:'srikandi', name:'Srikandi',  epithet:'Ksatria Wanita',  desc:'Istri Arjuna yang perkasa. Seorang pejuang wanita tangguh yang mahir memanah dan berperang di medan Bharatayuda.',                  traits:['Perkasa','Tegas','Setia'],    side:'Pandawa', color:'#8E4903', img: imgSrikandi },
  { id:'semar',    name:'Semar',     epithet:'Pamong Pandawa',  desc:'Punakawan utama, sesungguhnya Batara Ismaya yang turun ke bumi. Sosoknya merepresentasikan rakyat kecil yang bijaksana.',           traits:['Bijaksana','Lucu','Sakti'],   side:'Pandawa', color:'#451100', img: imgSemar },
]

const lightboxChar = ref(null)
</script>

<template>
  <section class="chars-section" id="characters" aria-label="Tokoh Populer Wayang">
    <header class="chars-header-wrap">
      <div class="container chars-header">
        <div class="chars-header-left">
          <p class="label">004 — Tokoh Populer</p>
          <h2 class="reveal">Tokoh<br><span class="outline-text">Populer</span></h2>
        </div>
        <p class="chars-desc reveal delay-2">Setiap tokoh wayang membawa watak, filosofi, dan peran kosmisnya masing-masing dalam kisah epik Mahabharata dan Ramayana yang abadi.</p>
      </div>
    </header>

    <div class="swiss-rule-thick"></div>

    <ul class="chars-grid container" role="list" aria-label="Daftar tokoh wayang">
      <li
        v-for="(char, i) in characters" :key="char.id"
        class="char-card reveal"
        :class="`delay-${i % 3 + 1}`"
        @click="lightboxChar = char"
        role="button" tabindex="0"
        :aria-label="`Tokoh ${char.name} — ${char.epithet}`"
        @keypress.enter="lightboxChar = char"
      >
        <div class="char-color-block" :style="{ background: char.color }">
          <img v-if="char.img" :src="char.img" :alt="char.name" class="char-img" />
          <div class="char-img-overlay"></div>
          <span class="char-side-badge">{{ char.side }}</span>
        </div>
        <div class="char-content">
          <div class="char-meta">
            <span class="char-index" aria-hidden="true">{{ String(i+1).padStart(2,'0') }}</span>
            <span class="char-epithet">{{ char.epithet }}</span>
          </div>
          <h3 class="char-name">{{ char.name }}</h3>
          <!-- <p class="char-desc">{{ char.desc }}</p> -->
          <ul class="char-traits" aria-label="Watak">
            <li v-for="trait in char.traits" :key="trait" class="trait-tag">{{ trait }}</li>
          </ul>
        </div>
        <div class="char-rule" :style="{ background: char.color }"></div>
      </li>
    </ul>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxChar" class="char-lightbox" @click.self="lightboxChar=null" role="dialog" aria-modal="true" :aria-label="lightboxChar.name">
        <div class="cl-panel">
          <div class="cl-color" :style="{ background: lightboxChar.color }">
            <img v-if="lightboxChar.img" :src="lightboxChar.img" :alt="lightboxChar.name" class="cl-img" />
            <div class="cl-img-overlay"></div>
          </div>
          <div class="cl-info">
            <p class="label" style="margin-bottom:12px">{{ lightboxChar.epithet }} · {{ lightboxChar.side }}</p>
            <h2 class="cl-name">{{ lightboxChar.name }}</h2>
            <p class="cl-desc">{{ lightboxChar.desc }}</p>
            <ul class="cl-traits" aria-label="Watak">
              <li v-for="t in lightboxChar.traits" :key="t" class="cl-trait">{{ t }}</li>
            </ul>
            <button class="btn-outline" @click="lightboxChar=null" style="margin-top:24px">Tutup</button>
          </div>
        </div>
        <button class="lb-close" @click="lightboxChar=null" aria-label="Tutup">✕</button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.chars-section { background: var(--bg); padding-bottom: clamp(60px,10vw,100px); }

.chars-header-wrap { background: var(--bg-alt); padding: clamp(40px,8vw,80px) 0 clamp(32px,5vw,60px); border-bottom: 3px solid var(--darkest); }
.chars-header { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,6vw,80px); align-items: end; }
.chars-header h2 { font-size: clamp(2rem,6vw,5rem); letter-spacing: -0.04em; }
.chars-desc { font-size: clamp(0.85rem,1.4vw,0.95rem); line-height: 1.7; }

.chars-grid { display: grid; grid-template-columns: repeat(3,1fr); border-left: var(--thick-line); border-top: var(--thick-line); margin-top: clamp(32px,5vw,60px); list-style: none; }

.char-card { border-right: var(--thin-line); border-bottom: var(--thin-line); display:flex; flex-direction:column; cursor:pointer; transition: transform 0.3s, box-shadow 0.3s; position:relative; overflow:hidden; }
.char-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,10,2,0.12); z-index:2; }

.char-color-block { height: clamp(140px,18vw,180px); display:flex; align-items:flex-end; justify-content:flex-end; padding: 10px 14px; position:relative; overflow:hidden; transition: height 0.3s; }
.char-card:hover .char-color-block { height: clamp(160px,20vw,210px); }
.char-img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:bottom center; transition:transform 0.5s; }
.char-card:hover .char-img { transform: scale(1.06); }
.char-img-overlay { position:absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 60%); }
.char-side-badge { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; background:rgba(0,0,0,0.45); color:rgba(255,255,255,0.9); padding:3px 8px; position:relative; z-index:1; }

.char-content { padding: clamp(16px,2.5vw,24px); flex:1; display:flex; flex-direction:column; gap:8px; }
.char-meta { display:flex; justify-content:space-between; align-items:center; }
.char-index  { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.15em; color:var(--accent); }
.char-epithet{ font-family:var(--mono); font-size:0.58rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-muted); }
.char-name   { font-size: clamp(1.1rem,2vw,1.4rem); font-weight:700; letter-spacing:-0.03em; }
.char-desc   { font-size:0.8rem; line-height:1.6; flex:1; }

.char-traits { display:flex; gap:5px; flex-wrap:wrap; margin-top:4px; list-style:none; }
.trait-tag { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.08em; text-transform:uppercase; border:1px solid var(--darkest); padding:3px 8px; transition: background 0.2s, color 0.2s; }
.char-card:hover .trait-tag { background:var(--darkest); color:var(--cream); }

.char-rule { height:3px; transform:scaleX(0); transform-origin:left; transition:transform 0.4s; }
.char-card:hover .char-rule { transform:scaleX(1); }

.char-lightbox { position:fixed; inset:0; background:rgba(24,10,2,0.85); z-index:9999; display:flex; align-items:center; justify-content:center; padding: clamp(16px,4vw,40px); backdrop-filter:blur(4px); animation:fadeIn 0.3s; }
.cl-panel { background:var(--bg); max-width:700px; width:100%; display:grid; grid-template-columns:180px 1fr; max-height:80vh; overflow:hidden; }
.cl-color { position:relative; overflow:hidden; display:flex; align-items:flex-end; justify-content:center; min-height:240px; }
.cl-img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:bottom center; }
.cl-img-overlay { position:absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%); }
.cl-info { padding: clamp(24px,4vw,40px); display:flex; flex-direction:column; gap:10px; overflow-y:auto; }
.cl-name { font-size: clamp(1.6rem,4vw,2.2rem); letter-spacing:-0.03em; }
.cl-desc { font-size:0.88rem; line-height:1.75; flex:1; }
.cl-traits { display:flex; gap:6px; flex-wrap:wrap; list-style:none; }
.cl-trait  { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; border:1px solid var(--darkest); padding:4px 10px; }
.lb-close { position:fixed; top:20px; right:20px; background:var(--darkest); border:none; color:var(--white); width:40px; height:40px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:1rem; transition:background 0.2s; }
.lb-close:hover { background:var(--accent); }

@media (max-width: 900px) {
  .chars-header { grid-template-columns: 1fr; gap: 20px; }
  .chars-grid   { grid-template-columns: repeat(2,1fr); }
  .cl-panel     { grid-template-columns: 1fr; max-height: 90vh; }
  .cl-color     { min-height: 160px; }
}
@media (max-width: 480px) {
  .chars-grid { grid-template-columns: 1fr; }
}
</style>
