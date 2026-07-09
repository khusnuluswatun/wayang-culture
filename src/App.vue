<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

watch(() => route.path, () => {
  setTimeout(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach(el => {
      el.classList.remove('visible')
      obs.observe(el)
    })
  }, 50)
}, { immediate: true })
</script>

<template>
  <div id="app-root">
    <a href="#main-content" class="skip-link">Lewati ke konten utama</a>
    <Navbar />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
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

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
