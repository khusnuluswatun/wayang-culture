<script setup>
import { onMounted } from 'vue'
import Navbar     from './components/Navbar.vue'
import Hero       from './components/Hero.vue'
import Stats      from './components/Stats.vue'
import About      from './components/About.vue'
import WayangTypes from './components/WayangTypes.vue'
import Characters from './components/Characters.vue'
import Gallery    from './components/Gallery.vue'
import Philosophy from './components/Philosophy.vue'
import Process    from './components/Process.vue'
import IndonesiaMap from './components/IndonesiaMap.vue'
import Features   from './components/Features.vue'
import Game       from './components/Game.vue'
import Footer     from './components/Footer.vue'

onMounted(() => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left')
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach(el => obs.observe(el))
})
</script>

<template>
  <div id="app-root">
    <a href="#main-content" class="skip-link">Lewati ke konten utama</a>

    <Navbar />

    <main id="main-content">
      <Hero />
      <Stats />
      <About />
      <WayangTypes />
      <Characters />
      <Gallery />
      <Philosophy />
      <Process />
      <IndonesiaMap />
      <Game />
      <Features />
    </main>

    <Footer />
  </div>
</template>

<style>
#app-root { min-height: 100svh; display: flex; flex-direction: column; }
main { flex: 1; }

.skip-link {
  position: absolute;
  top: -50px;
  left: 16px;
  background: var(--accent);
  color: var(--white);
  padding: 8px 16px;
  font-family: var(--mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 16px; }
</style>
