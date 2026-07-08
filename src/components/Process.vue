<script setup>
const steps = [
  { num:'01', title:'Memilih Lakon',    desc:'Dalang memilih cerita (lakon) yang akan dipentaskan, disesuaikan dengan acara dan harapan tuan rumah.',               time:'Sebelum Pertunjukan' },
  { num:'02', title:'Pakeliran Dimulai',desc:'Pertunjukan dimulai dengan adegan pembuka. Gendhing pembuka mengalun, tokoh-tokoh pertama mulai muncul di kelir.',   time:'Pukul 21.00' },
  { num:'03', title:'Adegan Jejer',     desc:'Adegan utama kerajaan. Prabu dan para punggawa bermusyawarah tentang permasalahan yang menjadi konflik utama.',       time:'Pukul 22.00' },
  { num:'04', title:'Perang Kembang',   desc:'Adegan pertempuran pertama yang mempertemukan protagonis dengan pasukan pengganggu. Klimaks pertama pertunjukan.',    time:'Pukul 00.00' },
  { num:'05', title:'Adegan Gara-Gara', desc:'Adegan Punakawan yang penuh humor dan kritik sosial. Semar, Gareng, Petruk, dan Bagong hadir menyegarkan suasana.', time:'Pukul 01.00' },
  { num:'06', title:'Perang Brubuh',    desc:'Perang besar yang menentukan. Konflik utama diselesaikan. Antagonis kalah dan kedamaian kembali dipulihkan.',         time:'Pukul 03.00' },
  { num:'07', title:'Tancep Kayon',     desc:'Dalang menancapkan Gunungan (Kayon) sebagai tanda pertunjukan berakhir. Dunia kembali damai dan seimbang.',           time:'Pukul 05.00 — Fajar' },
]
</script>

<template>
  <section class="process-section" id="process" aria-label="Proses Pertunjukan Wayang">
    <header class="process-header-bar">
      <div class="container process-header">
        <p class="label">007 — Proses Pertunjukan</p>
        <h2 class="reveal">Babak demi Babak<br><span class="text-cream">Semalam Suntuk</span></h2>
        <p class="process-sub reveal delay-2">Pertunjukan wayang kulit berlangsung dari senja hingga fajar. Setiap babak memiliki makna dan fungsi dramaturgi yang telah diatur secara ketat selama berabad-abad.</p>
      </div>
    </header>

    <div class="process-timeline container" aria-label="Urutan babak pertunjukan">
      <div class="timeline-line" aria-hidden="true"></div>
      <article
        v-for="(step, i) in steps" :key="step.num"
        class="timeline-item reveal"
        :class="[i % 2 === 0 ? 'left' : 'right', `delay-${i % 3 + 1}`]"
      >
        <div class="timeline-dot" aria-hidden="true">{{ step.num }}</div>
        <div class="timeline-card">
          <p class="tc-time">{{ step.time }}</p>
          <h3 class="tc-title">{{ step.title }}</h3>
          <p class="tc-desc">{{ step.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.process-section { background: var(--bg); padding-bottom: clamp(60px,10vw,100px); }

.process-header-bar { background: var(--bg-alt); padding: clamp(40px,8vw,80px) 0 clamp(32px,5vw,60px); border-bottom: 3px solid var(--darkest); }
.process-header { display:grid; grid-template-columns:160px 1fr 1fr; gap:clamp(16px,3vw,40px); align-items:start; }
.process-header h2 { font-size:clamp(1.8rem,4vw,3.5rem); letter-spacing:-0.04em; }
.process-sub { font-size:clamp(0.82rem,1.4vw,0.9rem); line-height:1.7; }

.process-timeline { position:relative; padding:clamp(48px,8vw,80px) 0; display:flex; flex-direction:column; gap:0; }
.timeline-line { position:absolute; left:50%; top:0; bottom:0; width:3px; background:var(--darkest); transform:translateX(-50%); }

.timeline-item { display:grid; grid-template-columns:1fr 60px 1fr; align-items:center; margin-bottom:20px; }
.timeline-dot { width:60px; height:60px; background:var(--accent); color:var(--white); font-family:var(--mono); font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; position:relative; z-index:2; transition:background 0.3s, transform 0.3s; }
.timeline-item:hover .timeline-dot { background:var(--darkest); transform:scale(1.15); }

.timeline-card { padding:clamp(18px,3vw,28px) clamp(16px,2.5vw,32px); background:var(--bg-alt); border:var(--thin-line); transition:background 0.3s, transform 0.3s; }
.timeline-item:hover .timeline-card { background:var(--darkest); }
.timeline-item:hover .tc-title, .timeline-item:hover .tc-time { color:var(--cream); }
.timeline-item:hover .tc-desc { color:rgba(245,237,216,0.6); }

.timeline-item.left  .timeline-card { grid-column:1; text-align:right; }
.timeline-item.left  .timeline-dot  { grid-column:2; }
.timeline-item.right .timeline-card { grid-column:3; }
.timeline-item.right .timeline-dot  { grid-column:2; }

.tc-time  { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--accent); margin-bottom:6px; transition:color 0.3s; }
.tc-title { font-size:clamp(0.95rem,1.5vw,1.1rem); font-weight:700; letter-spacing:-0.02em; margin-bottom:8px; transition:color 0.3s; }
.tc-desc  { font-size:clamp(0.78rem,1.2vw,0.82rem); line-height:1.65; transition:color 0.3s; }

@media (max-width: 900px) {
  .process-header { grid-template-columns:1fr; gap:16px; }
  .process-timeline { padding:clamp(32px,6vw,60px) 0; }
  .timeline-line { left: 28px; transform: none; }
  .timeline-item { grid-template-columns: 56px 1fr; margin-bottom: 12px; }
  .timeline-item.left  .timeline-card,
  .timeline-item.right .timeline-card { grid-column: 2; text-align: left; }
  .timeline-item.left  .timeline-dot,
  .timeline-item.right .timeline-dot  { grid-column: 1; width:56px; height:56px; font-size:0.65rem; }
}
</style>
