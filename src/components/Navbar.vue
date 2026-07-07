<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen   = ref(false)

const navLinks = [
  { label: 'Tentang',  href: '#about' },
  { label: 'Jenis',   href: '#types' },
  { label: 'Tokoh',   href: '#characters' },
  { label: 'Galeri',  href: '#gallery' },
  { label: 'Filosofi',href: '#philosophy' },
  { label: 'Game',    href: '#game' },
  { label: 'Peta',    href: '#map' },
]

function onScroll() { isScrolled.value = window.scrollY > 60 }
function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }

onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    :class="['navbar', { scrolled: isScrolled }]"
    id="navbar"
    role="navigation"
    aria-label="Menu utama"
  >
    <div class="nav-inner container">
      <a href="#" class="nav-logo" @click="closeMenu" aria-label="Wayang Nusantara — ke atas">
        <span class="logo-line" aria-hidden="true"></span>
        <span class="logo-text">WAYANG</span>
        <span class="logo-sub">BUDAYA INDONESIA</span>
      </a>

      <ul class="nav-links hide-mobile" role="list">
        <li v-for="link in navLinks" :key="link.label">
          <a :href="link.href" class="nav-link">{{ link.label }}</a>
        </li>
      </ul>

      <a href="#game" class="nav-cta btn-primary hide-mobile" id="navbar-cta">
        <span>Jelajahi</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>

      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
        :aria-expanded="String(menuOpen)"
        aria-label="Buka/tutup menu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }" aria-hidden="true">
      <ul>
        <li v-for="(link, i) in navLinks" :key="link.label" :style="{ transitionDelay: `${i * 0.04}s` }">
          <a :href="link.href" @click="closeMenu">
            <span class="mobile-index">0{{ i + 1 }}</span>
            {{ link.label }}
          </a>
        </li>
      </ul>
      <a href="#game" class="mobile-cta" @click="closeMenu">Main Game Wayang →</a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: transparent;
  transition: background 0.4s, box-shadow 0.4s, border-color 0.4s;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: var(--darkest);
  border-bottom-color: rgba(210,142,34,0.2);
  box-shadow: 0 4px 40px rgba(0,0,0,0.3);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 32px);
  height: clamp(60px, 8vw, 72px);
}

.nav-logo {
  display: flex; flex-direction: column; text-decoration: none; gap: 2px; flex-shrink: 0;
}
.logo-line   { display: block; width: 100%; height: 2px; background: var(--cream); margin-bottom: 2px; }
.logo-text   { font-family: var(--mono); font-size: clamp(0.9rem, 1.5vw, 1.1rem); font-weight: 700; letter-spacing: 0.25em; color: var(--white); line-height: 1; }
.logo-sub    { font-family: var(--mono); font-size: 0.42rem; letter-spacing: 0.18em; color: var(--cream); text-transform: uppercase; }

.nav-links   { display: flex; list-style: none; gap: 0; flex: 1; justify-content: center; }

.nav-link {
  display: block; padding: 8px clamp(8px, 1.2vw, 16px);
  text-decoration: none; font-family: var(--mono);
  font-size: clamp(0.6rem, 0.9vw, 0.72rem); letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(245,237,216,0.7); transition: color 0.3s;
  position: relative;
}
.nav-link::after {
  content:''; position:absolute; bottom:4px; left:16px; right:16px;
  height:1px; background:var(--cream); transform:scaleX(0);
  transition:transform 0.3s; transform-origin:left;
}
.nav-link:hover { color: var(--cream); }
.nav-link:hover::after { transform: scaleX(1); }

.nav-cta { margin-left: auto; font-size: 0.72rem; padding: 10px 20px; flex-shrink: 0; }

.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 8px; margin-left: auto;
}
.hamburger span { display: block; width: 24px; height: 2px; background: var(--white); transition: all 0.3s; transform-origin: left; }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translateY(-1px); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translateY(1px); }

.mobile-menu {
  background: var(--darkest);
  max-height: 0; overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1);
}
.mobile-menu.open { max-height: 600px; }
.mobile-menu ul   { list-style: none; }
.mobile-menu a {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 24px; text-decoration: none;
  font-family: var(--mono); font-size: 0.88rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--white);
  border-bottom: 1px solid rgba(210,142,34,0.08);
  transition: background 0.2s, color 0.2s;
}
.mobile-menu a:hover { background: rgba(210,142,34,0.08); color: var(--cream); }
.mobile-index { font-size: 0.6rem; color: var(--accent); width: 24px; }

.mobile-cta {
  display: block; padding: 16px 24px;
  background: var(--accent); color: var(--white) !important;
  font-family: var(--mono) !important; font-size: 0.8rem !important;
  letter-spacing: 0.12em !important;
  border-bottom: none !important;
}

@media (max-width: 900px) {
  .hamburger { display: flex; }
  .mobile-menu { display: block; }
}
</style>
