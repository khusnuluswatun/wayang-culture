<script setup>
const navLinks = [
  { label:'Tentang',   href:'#about' },
  { label:'Jenis',     href:'#types' },
  { label:'Tokoh',     href:'#characters' },
  { label:'Galeri',    href:'#gallery' },
  { label:'Filosofi',  href:'#philosophy' },
  { label:'Proses',    href:'#process' },
  { label:'Peta',      href:'#map' },
  { label:'Game',      href:'#game' },
]
</script>

<template>
  <footer class="footer" id="footer" role="contentinfo">
    <div class="footer-top">
      <div class="container footer-top-inner">
        <div class="footer-logo" aria-label="Wayang Nusantara">
          <span class="fl-rule" aria-hidden="true"></span>
          <span class="fl-text">WAYANG</span>
          <span class="fl-sub">Budaya Nusantara</span>
        </div>
        <p class="footer-tagline">Melestarikan seni budaya Indonesia<br>untuk generasi yang akan datang.</p>
        <a href="#hero" class="scroll-top-btn" aria-label="Kembali ke atas halaman">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span>ATAS</span>
        </a>
      </div>
    </div>

    <div class="swiss-rule-thick" style="background:rgba(210,142,34,0.3);"></div>

    <div class="footer-mid">
      <div class="container footer-mid-inner">
        <nav aria-label="Navigasi footer">
          <h4 class="fn-title">Navigasi</h4>
          <ul class="fn-list">
            <li v-for="link in navLinks" :key="link.label">
              <a :href="link.href" class="fn-link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="footer-about-heading">
          <h4 id="footer-about-heading" class="fn-title">Tentang Proyek</h4>
          <p>Website ini dibuat sebagai media edukasi dan apresiasi terhadap seni budaya wayang Indonesia yang telah diakui UNESCO sebagai Warisan Budaya Dunia tahun 2003.</p>
        </section>

        <aside aria-label="Fakta singkat wayang">
          <h4 class="fn-title">Fakta Singkat</h4>
          <dl class="contact-items">
            <div class="ci-item">
              <dt class="ci-label">Diakui UNESCO</dt>
              <dd class="ci-val">2003</dd>
            </div>
            <div class="ci-item">
              <dt class="ci-label">Jenis Wayang</dt>
              <dd class="ci-val">20+</dd>
            </div>
            <div class="ci-item">
              <dt class="ci-label">Usia Tradisi</dt>
              <dd class="ci-val">1000+ Tahun</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>

    <div class="swiss-rule" style="background:rgba(210,142,34,0.2);"></div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p class="copyright"><span class="mono">©2025</span> Wayang Nusantara — Platform Budaya Indonesia</p>
        <p class="made-with">Dibuat dengan <span class="text-cream" aria-hidden="true">♥</span><span class="visually-hidden">cinta</span> untuk pelestarian budaya bangsa</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--darkest); }

.footer-top { padding: clamp(48px,8vw,80px) 0 clamp(36px,6vw,60px); border-bottom: 1px solid rgba(210,142,34,0.15); }
.footer-top-inner { display:grid; grid-template-columns:1fr 1fr auto; gap:clamp(24px,4vw,60px); align-items:end; }

.footer-logo { display:flex; flex-direction:column; gap:4px; }
.fl-rule { display:block; width:40px; height:3px; background:var(--accent); margin-bottom:8px; }
.fl-text { font-family:var(--mono); font-size:clamp(1.4rem,3vw,2rem); font-weight:700; letter-spacing:0.2em; color:var(--white); line-height:1; }
.fl-sub  { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.2em; color:rgba(210,142,34,0.6); text-transform:uppercase; }

.footer-tagline { font-size:clamp(0.82rem,1.4vw,0.9rem); line-height:1.7; color:rgba(245,237,216,0.5); }

.scroll-top-btn { display:flex; flex-direction:column; align-items:center; gap:7px; text-decoration:none; color:var(--cream); font-family:var(--mono); font-size:0.58rem; letter-spacing:0.2em; border:1px solid rgba(210,142,34,0.3); padding:14px 12px; transition:background 0.2s; }
.scroll-top-btn:hover { background:rgba(210,142,34,0.1); }

.footer-mid { padding: clamp(36px,6vw,60px) 0; }
.footer-mid-inner { display:grid; grid-template-columns:160px 1fr 200px; gap:clamp(24px,4vw,60px); }

.fn-title { font-family:var(--mono); font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); margin-bottom:18px; }
.fn-list  { list-style:none; display:flex; flex-direction:column; gap:0; }
.fn-link  { display:block; padding:6px 0; text-decoration:none; font-size:clamp(0.8rem,1.3vw,0.85rem); color:rgba(245,237,216,0.5); border-bottom:1px solid rgba(210,142,34,0.07); transition:color 0.2s, padding-left 0.2s; }
.fn-link:hover { color:var(--cream); padding-left:8px; }

.footer-mid section p { font-size:clamp(0.8rem,1.3vw,0.85rem); line-height:1.7; color:rgba(245,237,216,0.5); }

.contact-items { display:flex; flex-direction:column; gap:12px; }
.ci-item  { display:flex; flex-direction:column; gap:2px; padding-bottom:10px; border-bottom:1px solid rgba(210,142,34,0.1); }
.ci-label { font-family:var(--mono); font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(210,142,34,0.5); }
.ci-val   { font-family:var(--mono); font-size:clamp(0.85rem,1.5vw,0.9rem); font-weight:700; color:var(--cream); }

.footer-bottom { padding: clamp(16px,3vw,24px) 0; }
.footer-bottom-inner { display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
.copyright { font-size:0.75rem; color:rgba(245,237,216,0.3); display:flex; align-items:center; gap:8px; }
.copyright .mono { font-family:var(--mono); color:rgba(210,142,34,0.4); }
.made-with { font-size:0.75rem; color:rgba(245,237,216,0.3); }

.visually-hidden { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }

@media (max-width: 900px) {
  .footer-top-inner  { grid-template-columns:1fr auto; }
  .footer-tagline    { display:none; }
  .footer-mid-inner  { grid-template-columns:1fr 1fr; }
}
@media (max-width: 480px) {
  .footer-top-inner  { grid-template-columns:1fr; }
  .footer-mid-inner  { grid-template-columns:1fr; }
  .footer-bottom-inner { flex-direction:column; text-align:center; }
}
</style>
