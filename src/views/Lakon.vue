<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})

const activeCategory = ref('semua')

const categories = [
  { id: 'semua', name: 'Semua Kisah' },
  { id: 'mahabharata', name: 'Mahabharata' },
  { id: 'ramayana', name: 'Ramayana' },
  { id: 'spiritual', name: 'Spiritual' },
]

const stories = [
  {
    category: 'mahabharata',
    title: 'Bharatayuda',
    subtitle: 'Perang Agung Keadilan',
    desc: 'Puncak pertempuran legendaris antara Pandawa dan Kurawa di padang Kurukshetra. Kisah tentang kehancuran akibat keserakahan dan penegakan keadilan dharma.',
    moral: 'Kejahatan mungkin menang sementara, tapi keadilan sejati akan selalu tegak pada akhirnya.',
    characters: ['Arjuna', 'Kresna', 'Karna', 'Bima'],
    color: '#A13204'
  },
  {
    category: 'ramayana',
    title: 'Rama & Shinta',
    subtitle: 'Kisah Kesetiaan & Cinta',
    desc: 'Perjuangan Sri Rama merebut kembali istrinya, Dewi Shinta, yang diculik oleh raja raksasa angkara murka, Rahwana. Dibantu oleh pasukan kera pimpinan Hanoman.',
    moral: 'Kesetiaan, kesucian hati, dan keberanian akan mampu meruntuhkan tirani terkuat sekalipun.',
    characters: ['Rama', 'Shinta', 'Hanoman', 'Rahwana'],
    color: '#D28E22'
  },
  {
    category: 'spiritual',
    title: 'Dewa Ruci',
    subtitle: 'Pencarian Air Kehidupan',
    desc: 'Kisah perjalanan spiritual Bima (Werkudara) mencari Tirta Perwitasari ke dasar samudra raya atas perintah gurunya. Di sana ia bertemu dengan Dewa Ruci yang mungil.',
    moral: 'Kebijaksanaan sejati tidak ditemukan di luar, melainkan di dalam kedalaman jiwa sendiri.',
    characters: ['Bima', 'Dewa Ruci', 'Drona'],
    color: '#5E3F02'
  },
  {
    category: 'mahabharata',
    title: 'Karna Tanding',
    subtitle: 'Tragedi Dua Saudara',
    desc: 'Duel takdir antara dua saudara seibu, Arjuna dan Karna, yang berada di kubu berseberangan. Kisah tentang konflik loyalitas, takdir, dan kehormatan ksatria.',
    moral: 'Tanggung jawab moral dan janji ksatria seringkali menuntut pengorbanan terbesar.',
    characters: ['Arjuna', 'Karna', 'Kunti'],
    color: '#8E4903'
  },
  {
    category: 'ramayana',
    title: 'Kumbakarna Gugur',
    subtitle: 'Cinta Tanah Air Raksasa',
    desc: 'Kisah heroik Kumbakarna, adik Rahwana yang raksasa. Ia maju berperang bukan untuk membela kejahatan kakaknya, melainkan untuk membela bumi pertiwinya dari serbuan musuh.',
    moral: 'Nasionalisme sejati adalah membela negara saat terancam, terlepas dari kesalahan pemimpinnya.',
    characters: ['Kumbakarna', 'Rahwana', 'Rama'],
    color: '#451100'
  },
  {
    category: 'spiritual',
    title: 'Babad Alas Wanamarta',
    subtitle: 'Membangun Peradaban Baru',
    desc: 'Perjuangan Pandawa membuka hutan angker Wanamarta yang dipenuhi jin dan raksasa untuk mendirikan kerajaan Amarta yang makmur dan sentosa.',
    moral: 'Dengan kerja keras, persatuan, dan doa, rintangan sesulit apapun dapat diubah menjadi berkah.',
    characters: ['Yudhistira', 'Bima', 'Arjuna'],
    color: '#D28E22'
  }
]

const filteredStories = ref(stories)

function setCategory(catId) {
  activeCategory.value = catId
  if (catId === 'semua') {
    filteredStories.value = stories
  } else {
    filteredStories.value = stories.filter(s => s.category === catId)
  }
}
</script>

<template>
  <div>
    <section class="lakon-hero" aria-label="Lakon Cerita Wayang">
      <div class="lh-grid-bg" aria-hidden="true"><div v-for="i in 12" :key="i" class="lh-col"></div></div>
      <div class="lh-letter" aria-hidden="true">L</div>
      <div class="container lh-content">
        <div class="lh-left">
          <p class="label reveal">009 — Epik Kepahlawanan</p>
          <h1 class="lh-title reveal delay-1">
            <span>LAKON</span>
            <span class="outline">CERITA</span>
            <span class="gold">WAYANG</span>
          </h1>
          <div class="lh-desc reveal delay-2">
            <div class="lh-rule"></div>
            <p>Telusuri epik legendaris pewayangan Nusantara. Kisah-kisah klasik yang tidak hanya menghibur, tetapi juga memuat tuntunan moral, spiritual, dan filosofi hidup mendalam.</p>
          </div>
        </div>
        <div class="lh-right reveal delay-2">
          <div class="lh-info-box">
            <div class="lib-item">
              <span class="lib-num">3+</span>
              <span class="lib-label">Siklus Utama</span>
            </div>
            <div class="lib-div"></div>
            <div class="lib-item">
              <span class="lib-num">100+</span>
              <span class="lib-label">Lakon Lakon</span>
            </div>
            <div class="lib-div"></div>
            <div class="lib-item">
              <span class="lib-num">9+</span>
              <span class="lib-label">Malam Cerita</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lakon-explorer" aria-label="Penjelajah Kisah">
      <div class="container">
        <header class="explorer-header">
          <div class="eh-left reveal">
            <p class="label">Pilih Cerita</p>
            <h2>Lakon & Epik<br><span class="outline-text">Pilihan Nusantara</span></h2>
          </div>
          <div class="category-tabs reveal delay-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="cat-tab"
              :class="{ active: activeCategory === cat.id }"
              @click="setCategory(cat.id)"
            >
              {{ cat.name }}
            </button>
          </div>
        </header>

        <div class="stories-grid">
          <article
            v-for="(s, i) in filteredStories"
            :key="s.title"
            class="story-card reveal"
            :class="`delay-${(i % 3) + 1}`"
            :style="{ '--story-color': s.color }"
          >
            <div class="sc-top">
              <span class="sc-category">{{ s.category }}</span>
              <span class="sc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="sc-title">{{ s.title }}</h3>
            <h4 class="sc-sub">{{ s.subtitle }}</h4>
            <p class="sc-desc">{{ s.desc }}</p>
            
            <div class="sc-divider"></div>
            
            <div class="sc-moral">
              <span class="scm-title">Amanat Moral:</span>
              <p class="scm-text">"{{ s.moral }}"</p>
            </div>

            <div class="sc-chars">
              <span class="scc-label">Karakter Utama:</span>
              <div class="scc-tags">
                <span v-for="c in s.characters" :key="c" class="scc-tag">{{ c }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cultural-ref" aria-label="Refleksi Budaya">
      <div class="container cr-inner">
        <div class="cr-left reveal">
          <p class="label">Tuntunan & Tontonan</p>
          <h2 class="cr-title">Wayang sebagai<br><span class="outline-text-light">Cermin Kehidupan</span></h2>
        </div>
        <div class="cr-right reveal delay-2">
          <p class="cr-body">Bagi masyarakat Nusantara, pertunjukan lakon wayang bukan hanya tontonan malam hari yang menghibur. Ia adalah ruang refleksi spiritual, sebuah sekolah kehidupan di mana penonton bercermin pada dilema moral para kesatria, kebijaksanaan para dewa, dan kecerdasan para punakawan.</p>
          <div class="cr-quote">
            <p>"Nonton wayang kuwi sejatine nonton awake dhewe."</p>
            <span class="crq-sub">— Falsafah Jawa (Menonton wayang sejatinya adalah menonton diri kita sendiri)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lakon-hero { min-height:60vh; background:var(--darkest); position:relative; overflow:hidden; display:flex; align-items:center; padding:clamp(100px,16vw,150px) 0 clamp(60px,10vw,100px); }
.lh-grid-bg { position:absolute; inset:0; display:grid; grid-template-columns:repeat(12,1fr); pointer-events:none; opacity:0.04; }
.lh-col { border-left:1px solid var(--cream); }
.lh-letter { position:absolute; top:-0.05em; right:-0.04em; font-size:clamp(10rem,28vw,32rem); font-weight:700; color:rgba(210,142,34,0.04); line-height:1; pointer-events:none; user-select:none; }
.lh-content { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; position:relative; z-index:2; }
.lh-left { display:flex; flex-direction:column; gap:clamp(20px,3vw,28px); }
.lh-title { display:flex; flex-direction:column; font-size:clamp(3rem,8vw,7rem); line-height:0.9; letter-spacing:-0.04em; gap:4px; }
.lh-title span { display:block; color:var(--white); }
.lh-title .outline { -webkit-text-stroke:2px var(--cream); color:transparent; }
.lh-title .gold { color:var(--cream); }
.lh-desc { display:flex; gap:18px; align-items:flex-start; }
.lh-rule { width:3px; min-height:60px; background:var(--accent); flex-shrink:0; }
.lh-desc p { color:rgba(245,237,216,0.6); font-size:clamp(0.85rem,1.5vw,0.95rem); line-height:1.8; }
.lh-info-box { display:flex; align-items:center; border:1px solid rgba(210,142,34,0.2); padding:28px 32px; background:rgba(210,142,34,0.04); }
.lib-item { display:flex; flex-direction:column; gap:4px; flex:1; }
.lib-num  { font-family:var(--mono); font-size:2rem; font-weight:700; color:var(--cream); letter-spacing:-0.04em; }
.lib-label{ font-family:var(--mono); font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(210,142,34,0.6); }
.lib-div  { width:1px; height:48px; background:rgba(210,142,34,0.2); margin:0 24px; }

.lakon-explorer { background:var(--bg-alt); padding:clamp(60px,10vw,100px) 0; }
.explorer-header { display:flex; justify-content:space-between; align-items:flex-end; gap:32px; margin-bottom:clamp(40px,6vw,60px); }
.eh-left h2 { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; margin-top:14px; }
.category-tabs { display:flex; gap:8px; flex-wrap:wrap; }
.cat-tab {
  all:unset; font-family:var(--mono); font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase;
  padding:10px 20px; border:1px solid var(--darkest); cursor:pointer; transition:all 0.25s;
}
.cat-tab:hover,
.cat-tab.active { background:var(--darkest); color:var(--cream); }

.stories-grid { display:grid; grid-template-columns:repeat(3,1fr); border-left:var(--thick-line); border-top:var(--thick-line); }
.story-card {
  padding:clamp(28px,4vw,40px) clamp(20px,3vw,28px);
  border-right:var(--thin-line); border-bottom:var(--thin-line);
  display:flex; flex-direction:column; gap:16px;
  background:var(--bg); transition:transform 0.3s;
}
.story-card:hover { transform:translateY(-4px); background:var(--white); }
.sc-top { display:flex; justify-content:space-between; align-items:center; }
.sc-category { font-family:var(--mono); font-size:0.55rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--story-color, var(--accent)); border:1px solid var(--story-color, var(--accent)); padding:2px 8px; }
.sc-num { font-family:var(--mono); font-size:0.62rem; color:rgba(24,10,2,0.3); }
.sc-title { font-size:1.6rem; font-weight:700; color:var(--text); letter-spacing:-0.03em; line-height:1.1; }
.sc-sub { font-family:var(--mono); font-size:0.7rem; color:var(--story-color, var(--accent)); text-transform:uppercase; letter-spacing:0.05em; margin-top:-6px; }
.sc-desc { font-size:0.83rem; line-height:1.7; color:var(--text-muted); }
.sc-divider { height:1px; background:rgba(24,10,2,0.1); margin:8px 0; }
.sc-moral { background:rgba(210,142,34,0.06); padding:14px; border-left:3px solid var(--story-color, var(--accent)); }
.scm-title { font-family:var(--mono); font-size:0.6rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--story-color, var(--accent)); display:block; margin-bottom:4px; }
.scm-text { font-size:0.78rem; line-height:1.5; font-style:italic; color:var(--text); }
.sc-chars { display:flex; flex-direction:column; gap:6px; margin-top:auto; }
.scc-label { font-family:var(--mono); font-size:0.62rem; color:rgba(24,10,2,0.4); text-transform:uppercase; }
.scc-tags { display:flex; gap:6px; flex-wrap:wrap; }
.scc-tag { font-family:var(--mono); font-size:0.6rem; background:rgba(24,10,2,0.05); border:1px solid rgba(24,10,2,0.1); padding:3px 8px; color:var(--text); }

.cultural-ref { background:var(--darkest); padding:clamp(60px,10vw,100px) 0; }
.cr-inner { display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,8vw,100px); align-items:center; }
.cr-title { font-size:clamp(1.8rem,4vw,3.2rem); letter-spacing:-0.04em; color:var(--white); margin-top:14px; }
.outline-text-light { -webkit-text-stroke:2px rgba(253,246,233,0.3); color:transparent; }
.cr-body { font-size:clamp(0.85rem,1.4vw,0.95rem); line-height:1.8; color:rgba(245,237,216,0.6); margin-bottom:28px; }
.cr-quote { border-left:3px solid var(--accent); padding-left:20px; }
.cr-quote p { font-size:1.15rem; font-style:italic; color:var(--cream); line-height:1.4; margin-bottom:6px; }
.crq-sub { font-family:var(--mono); font-size:0.65rem; color:rgba(245,237,216,0.4); letter-spacing:0.05em; display:block; }

@media (max-width:900px) {
  .lh-content { grid-template-columns:1fr; }
  .lh-right { display:none; }
  .explorer-header { flex-direction:column; align-items:flex-start; gap:20px; }
  .stories-grid { grid-template-columns:repeat(2,1fr); }
  .cr-inner { grid-template-columns:1fr; }
}
@media (max-width:480px) {
  .stories-grid { grid-template-columns:1fr; }
}
</style>
