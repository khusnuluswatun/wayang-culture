<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const score = ref(0)
const highScore = ref(0)
const gameState = ref('idle') // idle | playing | over
const isMobile = ref(false)
let ctx, raf, spawnTimer

const CANVAS_W = 900
const CANVAS_H = 420
const GROUND_Y = 320
const GRAVITY = 0.55
const JUMP_V = -13

const player = { x: 120, y: GROUND_Y, w: 48, h: 72, vy: 0, onGround: true, frame: 0, frameTimer: 0 }
const obstacles = []
const particles = []
let gameSpeed = 4
let frameCount = 0
let spawnInterval = 90

// Draw wayang silhouette (simplified)
function drawWayang(ctx, x, y, w, h, flip = false) {
  ctx.save()
  ctx.fillStyle = '#180A02'
  if (flip) { ctx.translate(x + w, y); ctx.scale(-1, 1) }
  else ctx.translate(x, y)
  // body
  ctx.beginPath()
  ctx.ellipse(w * 0.5, h * 0.55, w * 0.22, h * 0.28, 0, 0, Math.PI * 2)
  ctx.fill()
  // head
  ctx.beginPath()
  ctx.ellipse(w * 0.5, h * 0.2, w * 0.17, h * 0.18, -0.3, 0, Math.PI * 2)
  ctx.fill()
  // nose (pointy)
  ctx.beginPath()
  ctx.moveTo(w * 0.5 - w * 0.17, h * 0.2)
  ctx.lineTo(w * 0.5 - w * 0.38, h * 0.24)
  ctx.lineTo(w * 0.5 - w * 0.17, h * 0.28)
  ctx.fill()
  // arm up
  ctx.beginPath()
  ctx.moveTo(w * 0.5, h * 0.45)
  ctx.lineTo(w * 0.82, h * 0.25)
  ctx.lineTo(w * 0.88, h * 0.28)
  ctx.lineTo(w * 0.58, h * 0.5)
  ctx.fill()
  // leg
  ctx.beginPath()
  ctx.moveTo(w * 0.38, h * 0.8)
  ctx.lineTo(w * 0.35, h * 1.0)
  ctx.lineTo(w * 0.45, h * 1.0)
  ctx.lineTo(w * 0.48, h * 0.8)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(w * 0.52, h * 0.8)
  ctx.lineTo(w * 0.58, h * 1.0)
  ctx.lineTo(w * 0.68, h * 1.0)
  ctx.lineTo(w * 0.62, h * 0.8)
  ctx.fill()
  ctx.restore()
}

// Draw gunungan (mountain) obstacle
function drawGunungan(ctx, x, y, w, h) {
  ctx.save()
  ctx.fillStyle = '#180A02'
  ctx.translate(x, y)
  // triangle mountain shape
  ctx.beginPath()
  ctx.moveTo(w * 0.5, 0)
  ctx.lineTo(0, h)
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fill()
  // inner triangle cutout
  ctx.fillStyle = '#A13204'
  ctx.beginPath()
  ctx.moveTo(w * 0.5, h * 0.15)
  ctx.lineTo(w * 0.2, h * 0.85)
  ctx.lineTo(w * 0.8, h * 0.85)
  ctx.closePath()
  ctx.fill()
  // ornament lines
  ctx.strokeStyle = '#180A02'
  ctx.lineWidth = 2
  for (let i = 1; i <= 3; i++) {
    const prog = i / 4
    ctx.beginPath()
    ctx.moveTo(w * 0.5, h * 0.15 + h * 0.7 * prog * 0.3)
    ctx.lineTo(w * 0.2 + w * 0.3 * prog, h * 0.85 - 2)
    ctx.lineTo(w * 0.8 - w * 0.3 * prog, h * 0.85 - 2)
    ctx.stroke()
  }
  ctx.restore()
}

function spawnObstacle() {
  const types = ['gunungan_tall', 'gunungan_mid', 'double']
  const type = types[Math.floor(Math.random() * types.length)]
  if (type === 'gunungan_tall') {
    obstacles.push({ x: CANVAS_W + 20, y: GROUND_Y - 120, w: 60, h: 120 })
  } else if (type === 'gunungan_mid') {
    obstacles.push({ x: CANVAS_W + 20, y: GROUND_Y - 80, w: 50, h: 80 })
  } else {
    obstacles.push({ x: CANVAS_W + 20, y: GROUND_Y - 100, w: 50, h: 100 })
    obstacles.push({ x: CANVAS_W + 100, y: GROUND_Y - 70, w: 40, h: 70 })
  }
}

function addParticles(x, y) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5 - 2,
      life: 1,
      color: ['#D28E22','#A13204','#8E4903'][Math.floor(Math.random()*3)]
    })
  }
}

function checkCollision(p, o) {
  const px = p.x + 8, py = p.y, pw = p.w - 16, ph = p.h
  return px < o.x + o.w - 4 && px + pw > o.x + 4 && py < o.y + o.h && py + ph > o.y
}

function drawBackground(ctx, frame) {
  // Amber gradient sky
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
  grad.addColorStop(0, '#1a0800')
  grad.addColorStop(0.6, '#4a1800')
  grad.addColorStop(1, '#2a0d00')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  // Moving light glow center
  const glowX = CANVAS_W * 0.5 + Math.sin(frame * 0.01) * 30
  const grd = ctx.createRadialGradient(glowX, 180, 10, glowX, 180, 300)
  grd.addColorStop(0, 'rgba(210,142,34,0.18)')
  grd.addColorStop(1, 'rgba(210,142,34,0)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  // Ground
  ctx.fillStyle = '#0d0500'
  ctx.fillRect(0, GROUND_Y + player.h, CANVAS_W, CANVAS_H - GROUND_Y - player.h)
  // Ground line
  ctx.strokeStyle = '#D28E22'
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  ctx.moveTo(0, GROUND_Y + player.h)
  ctx.lineTo(CANVAS_W, GROUND_Y + player.h)
  ctx.stroke()
  ctx.globalAlpha = 1

  // Scrolling ground dots
  ctx.fillStyle = 'rgba(210,142,34,0.3)'
  for (let i = 0; i < 12; i++) {
    const dotX = ((i * 80) - (frame * gameSpeed * 0.5) % 80 + 80) % (CANVAS_W + 80)
    ctx.fillRect(dotX, GROUND_Y + player.h + 6, 3, 3)
  }
}

function loop() {
  if (gameState.value !== 'playing') return
  frameCount++
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  drawBackground(ctx, frameCount)

  // Player physics
  player.vy += GRAVITY
  player.y += player.vy
  if (player.y >= GROUND_Y) { player.y = GROUND_Y; player.vy = 0; player.onGround = true }

  // Animate player frame
  player.frameTimer++
  if (player.frameTimer > 8) { player.frame = (player.frame + 1) % 2; player.frameTimer = 0 }

  // Draw player
  const playerOffset = player.onGround ? (player.frame === 0 ? 0 : 2) : 0
  drawWayang(ctx, player.x, player.y + playerOffset, player.w, player.h)

  // Spawn obstacles
  spawnTimer--
  if (spawnTimer <= 0) {
    spawnObstacle()
    spawnTimer = spawnInterval
    spawnInterval = Math.max(50, spawnInterval - 2)
  }

  // Move & draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i]
    o.x -= gameSpeed
    drawGunungan(ctx, o.x, o.y, o.w, o.h)
    if (checkCollision(player, o)) {
      addParticles(player.x + player.w / 2, player.y + player.h / 2)
      endGame()
      return
    }
    if (o.x + o.w < 0) { obstacles.splice(i, 1); score.value++ }
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.04
    ctx.globalAlpha = p.life
    ctx.fillStyle = p.color
    ctx.fillRect(p.x, p.y, 5, 5)
    if (p.life <= 0) particles.splice(i, 1)
  }
  ctx.globalAlpha = 1

  // Score HUD
  ctx.font = `bold 16px 'Space Mono'`
  ctx.fillStyle = 'rgba(210,142,34,0.9)'
  ctx.fillText(`SKOR: ${score.value}`, CANVAS_W - 140, 36)
  ctx.fillText(`HI: ${highScore.value}`, CANVAS_W - 140, 56)

  // Difficulty
  if (frameCount % 300 === 0) gameSpeed = Math.min(gameSpeed + 0.4, 12)

  raf = requestAnimationFrame(loop)
}

function startGame() {
  score.value = 0
  gameSpeed = 4
  spawnInterval = 90
  spawnTimer = 60
  frameCount = 0
  obstacles.length = 0
  particles.length = 0
  Object.assign(player, { y: GROUND_Y, vy: 0, onGround: true, frame: 0, frameTimer: 0 })
  gameState.value = 'playing'
  raf = requestAnimationFrame(loop)
}

function endGame() {
  gameState.value = 'over'
  if (score.value > highScore.value) highScore.value = score.value
  cancelAnimationFrame(raf)
  // Draw game over screen
  ctx.fillStyle = 'rgba(24,10,2,0.82)'
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  ctx.font = `bold 48px 'Space Grotesk'`
  ctx.fillStyle = '#A13204'
  ctx.textAlign = 'center'
  ctx.fillText('TANCEP KAYON', CANVAS_W / 2, CANVAS_H / 2 - 30)
  ctx.font = `16px 'Space Mono'`
  ctx.fillStyle = '#D28E22'
  ctx.fillText(`SKOR: ${score.value}   REKOR: ${highScore.value}`, CANVAS_W / 2, CANVAS_H / 2 + 20)
  ctx.font = `12px 'Space Mono'`
  ctx.fillStyle = 'rgba(253,246,233,0.5)'
  ctx.fillText('TEKAN SPASI UNTUK MAIN LAGI', CANVAS_W / 2, CANVAS_H / 2 + 60)
  ctx.textAlign = 'left'
}

function jump() {
  if (player.onGround && gameState.value === 'playing') {
    player.vy = JUMP_V
    player.onGround = false
  }
}

function onKey(e) {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    e.preventDefault()
    if (gameState.value === 'idle' || gameState.value === 'over') startGame()
    else jump()
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  isMobile.value = window.innerWidth < 768
  window.addEventListener('keydown', onKey)

  // Draw idle screen
  drawBackground(ctx, 0)
  ctx.font = `bold 36px 'Space Grotesk'`
  ctx.fillStyle = '#FDF6E9'
  ctx.textAlign = 'center'
  ctx.fillText('WAYANG RUNNER', CANVAS_W / 2, 160)
  ctx.font = `14px 'Space Mono'`
  ctx.fillStyle = '#D28E22'
  ctx.fillText('TEKAN SPASI / TAP UNTUK MULAI', CANVAS_W / 2, 210)
  ctx.textAlign = 'left'
  drawWayang(ctx, CANVAS_W / 2 - 24, GROUND_Y, 48, 72)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section class="game-section" id="game" aria-label="Mini Game Wayang Runner">
    <header class="game-header-bar">
      <div class="container game-header">
        <p class="label">010 — Interaktif</p>
        <h2 class="reveal">
          Wayang<br>
          <span class="outline-text">Runner</span>
        </h2>
        <p class="game-tagline reveal delay-2">
          Kendalikan wayang, lompati Gunungan penghalang!<br>
          Seberapa jauh kamu bisa bertahan semalam suntuk?
        </p>
      </div>
    </header>

    <div class="swiss-rule-thick"></div>

    <div class="game-wrap container">
      <aside class="controls-panel" aria-label="Cara bermain">
        <h3 class="cp-title">KONTROL</h3>
        <div class="cp-list">
          <div class="cp-row">
            <span class="cp-key">Space / ↑</span>
            <span class="cp-action">Lompat</span>
          </div>
          <div class="cp-row">
            <span class="cp-key">W</span>
            <span class="cp-action">Lompat</span>
          </div>
        </div>
        <div class="cp-tips">
          <p>Hindari Gunungan yang menghalangi jalan. Semakin jauh, semakin cepat!</p>
        </div>
        <div class="score-display">
          <div class="sd-item">
            <span class="sd-label">SKOR</span>
            <span class="sd-val">{{ score }}</span>
          </div>
          <div class="sd-item">
            <span class="sd-label">REKOR</span>
            <span class="sd-val">{{ highScore }}</span>
          </div>
        </div>
      </aside>

      <div class="canvas-wrap">
        <canvas
          ref="canvas"
          :width="900"
          :height="420"
          class="game-canvas"
          @click="gameState === 'idle' || gameState === 'over' ? startGame() : jump()"
          @touchstart.prevent="gameState === 'idle' || gameState === 'over' ? startGame() : jump()"
          role="application"
          aria-label="Kanvas permainan Wayang Runner"
          tabindex="0"
        ></canvas>

        <div class="touch-controls show-mobile" aria-label="Tombol lompat mobile">
          <button
            class="touch-jump"
            @touchstart.prevent="gameState === 'idle' || gameState === 'over' ? startGame() : jump()"
            aria-label="Lompat"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span>LOMPAT</span>
          </button>
          <button
            v-if="gameState === 'over' || gameState === 'idle'"
            class="touch-start"
            @touchstart.prevent="startGame"
            aria-label="Mulai ulang"
          >
            <span>MAIN LAGI</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.game-section {
  background: var(--bg-alt);
  padding-bottom: clamp(60px, 10vw, 100px);
}

.game-header-bar {
  background: var(--darkest);
  padding: clamp(40px, 8vw, 80px) 0 clamp(32px, 5vw, 60px);
}

.game-header {
  display: grid;
  grid-template-columns: 160px 1fr 1fr;
  gap: clamp(20px, 4vw, 40px);
  align-items: start;
}

.game-header h2 {
  font-size: clamp(2.2rem, 5vw, 5rem);
  color: var(--white);
  letter-spacing: -0.04em;
}

.game-tagline {
  font-size: clamp(0.82rem, 1.5vw, 0.95rem);
  line-height: 1.75;
  color: rgba(245,237,216,0.55);
}

.game-wrap {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  margin-top: clamp(32px, 5vw, 60px);
  border-left: var(--thick-line);
  border-bottom: var(--thick-line);
  background: var(--darkest);
}

.controls-panel {
  padding: 28px 20px;
  border-right: 1px solid rgba(210,142,34,0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cp-title {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--cream);
  text-transform: uppercase;
}

.cp-list { display: flex; flex-direction: column; gap: 8px; }

.cp-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cp-key {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--white);
  background: rgba(210,142,34,0.15);
  border: 1px solid rgba(210,142,34,0.3);
  padding: 3px 8px;
  display: inline-block;
  letter-spacing: 0.08em;
}

.cp-action {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245,237,216,0.45);
  padding-left: 4px;
}

.cp-tips p {
  font-size: 0.75rem;
  line-height: 1.6;
  color: rgba(245,237,216,0.4);
}

.score-display {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(210,142,34,0.15);
  padding-top: 16px;
}

.sd-item { display: flex; flex-direction: column; gap: 2px; }

.sd-label {
  font-family: var(--mono);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(210,142,34,0.5);
}

.sd-val {
  font-family: var(--mono);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: -0.04em;
  line-height: 1;
}

.canvas-wrap { position: relative; }

.game-canvas {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
  outline: none;
}

.touch-controls {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.touch-jump, .touch-start {
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(161,50,4,0.85);
  border: 1px solid var(--cream);
  color: var(--white);
  padding: 10px 20px;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  min-width: 80px;
  text-align: center;
}

.touch-start { background: rgba(24,10,2,0.85); }

@media (max-width: 900px) {
  .game-header  { grid-template-columns: 1fr; gap: 16px; }
  .game-wrap    { grid-template-columns: 1fr; }
  .controls-panel {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    border-right: none;
    border-bottom: 1px solid rgba(210,142,34,0.15);
    padding: 16px;
  }
  .score-display { flex-direction: row; margin-top: 0; border-top: none; padding-top: 0; }
}
</style>
