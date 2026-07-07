<script setup>
import { ref, onMounted } from 'vue'

const stats = [
  { number: 20,   suffix: '+', label: 'Jenis Wayang',    sub: 'dari berbagai daerah Indonesia' },
  { number: 2000, suffix: '+', label: 'Tokoh Karakter',  sub: 'dalam repertoar pewayangan' },
  { number: 500,  suffix: '+', label: 'Lakon Cerita',    sub: 'tersimpan dalam naskah kuno' },
  { number: 100,  suffix: '+', label: 'Dalang Maestro',  sub: 'yang masih aktif berkarya' },
]

const displayed = ref(stats.map(() => 0))
const sectionEl = ref(null)
let animated = false

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

function animateCount(index, target, duration = 1800) {
  const start = performance.now()
  function step(now) {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    displayed.value[index] = Math.round(easeOut(t) * target)
    if (t < 1) requestAnimationFrame(step)
    else displayed.value[index] = target
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !animated) {
      animated = true
      stats.forEach((s, i) => {
        setTimeout(() => animateCount(i, s.number, 1600), i * 150)
      })
      observer.disconnect()
    }
  }, { threshold: 0.3 })
  if (sectionEl.value) observer.observe(sectionEl.value)
})
</script>

<template>
  <section class="stats-section" id="stats" aria-label="Statistik Wayang Indonesia" ref="sectionEl">
    <div class="swiss-rule-thick"></div>
    <div class="container">
      <header class="stats-header">
        <p class="label">Data &amp; Fakta</p>
        <h2 class="stats-question reveal">Mengapa Wayang Tetap Relevan?</h2>
      </header>

      <div class="stats-grid" role="list">
        <article
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-item reveal"
          :class="`delay-${i + 1}`"
          role="listitem"
          :aria-label="`${stat.label}: ${stat.number}${stat.suffix}`"
        >
          <div class="stat-index" aria-hidden="true">0{{ i + 1 }}</div>
          <div class="stat-content">
            <div class="stat-number" aria-live="polite">
              {{ displayed[i].toLocaleString('id-ID') }}{{ stat.suffix }}
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <p class="stat-sub">{{ stat.sub }}</p>
          </div>
          <div class="stat-rule" aria-hidden="true"></div>
        </article>
      </div>
    </div>
    <div class="swiss-rule"></div>
  </section>
</template>

<style scoped>
.stats-section {
  background: var(--bg);
  padding: clamp(40px, 8vw, 80px) 0;
}

.stats-header {
  display: flex;
  align-items: baseline;
  gap: clamp(16px, 4vw, 40px);
  margin-bottom: clamp(32px, 6vw, 60px);
  flex-wrap: wrap;
}

.stats-question {
  font-size: clamp(1.2rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-left: var(--thick-line);
}

.stat-item {
  padding: clamp(20px, 4vw, 36px) clamp(16px, 3vw, 28px);
  border-right: var(--thin-line);
  position: relative;
  transition: background 0.3s;
}
.stat-item:hover { background: var(--bg-alt); }

.stat-index {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 16px;
}

.stat-number {
  font-family: var(--mono);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-weight: 600;
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.stat-sub {
  font-size: 0.78rem;
  line-height: 1.5;
}

.stat-rule {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.stat-item:hover .stat-rule { transform: scaleX(1); }

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: repeat(1, 1fr); }
  .stat-item { border-bottom: var(--thin-line); }
}
</style>
