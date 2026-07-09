<script setup>
import { ref, computed } from "vue";
import imgSemar from "../assets/semar.png";
import imgArjuna from "../assets/arjuna.png";
import imgBima from "../assets/werkudara.png";
import imgLogo from "../assets/logo.png";

const quizData = [
  {
    id: 1,
    question: "Tokoh punakawan sakti yang merupakan titisan Batara Ismaya dan selalu mengasuh para ksatria Pandawa adalah...",
    image: imgSemar,
    options: ["Gareng", "Petruk", "Semar", "Bagong"],
    answer: 2,
  },
  {
    id: 2,
    question: "Ksatria Pandawa penengah yang mahir memanah dan memiliki senjata pusaka bernama Pasopati adalah...",
    image: imgArjuna,
    options: ["Arjuna", "Nakula", "Sadewa", "Yudhistira"],
    answer: 0,
  },
  {
    id: 3,
    question: "Ksatria Pandawa yang bertubuh raksasa, memiliki kuku Pancanaka, dan dikenal dengan nama Werkudara adalah...",
    image: imgBima,
    options: ["Gatotkaca", "Bima", "Duryudana", "Baladewa"],
    answer: 1,
  },
  {
    id: 4,
    question: "Pusaka andalan Prabu Kresna yang berbentuk cakram bergerigi dan sangat mematikan disebut...",
    image: null,
    options: ["Gada Rujakpolo", "Panah Pasopati", "Senjata Cakra", "Tombak Kyai Pleret"],
    answer: 2,
  },
  {
    id: 5,
    question: "Pohon kehidupan berukir yang selalu ditancapkan oleh dalang di tengah kelir pada awal dan akhir pertunjukan wayang disebut...",
    image: null,
    options: ["Gunungan (Kayon)", "Blencong", "Kelir", "Gedebog"],
    answer: 0,
  }
];

// State management game
const score = ref(0);
const highScore = ref(0);
const gameState = ref("idle"); // idle | playing | over
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const isAnswered = ref(false);

// Get data soal saat ini
const currentQuestion = computed(() => quizData[currentQuestionIndex.value]);

function startGame() {
  score.value = 0;
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  isAnswered.value = false;
  gameState.value = "playing";
}

function selectOption(index) {
  if (isAnswered.value) return; // Kunci jawaban kalau sudah milih
  selectedAnswer.value = index;
  isAnswered.value = true;

  if (index === currentQuestion.value.answer) {
    score.value += 10;
  }
}

function nextQuestion() {
  selectedAnswer.value = null;
  isAnswered.value = false;

  if (currentQuestionIndex.value + 1 < quizData.length) {
    currentQuestionIndex.value++;
  } else {
    endGame();
  }
}

function endGame() {
  gameState.value = "over";
  if (score.value > highScore.value) {
    highScore.value = score.value;
  }
}
</script>

<template>
  <section class="game-section" id="game" aria-label="Mini Game Trivia Wayang">
    <header class="game-header-bar">
      <div class="container game-header">
        <p class="label">010 — Interaktif</p>
        <h2 class="reveal">
          Wayang<br />
          <span class="outline-text">Trivia</span>
        </h2>
        <p class="game-tagline reveal delay-2">
          Uji wawasanmu seputar dunia pewayangan dan budaya Nusantara!<br />
          Jawab pertanyaan dengan benar dan raih rekor skor tertinggi.
        </p>
      </div>
    </header>

    <div class="swiss-rule-thick"></div>

    <div class="game-wrap container">
      <!-- Panel Kiri: Informasi Skor -->
      <aside class="controls-panel" aria-label="Informasi Game">
        <h3 class="cp-title">STATUS</h3>
        <div class="cp-tips">
          <p v-if="gameState === 'playing'">
            Pertanyaan ke: <strong>{{ currentQuestionIndex + 1 }} / {{ quizData.length }}</strong>
          </p>
          <p v-else>Tekan mulai untuk menguji pengetahuan caritamu.</p>
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

      <!-- Panel Kanan: Area Inti Trivia -->
      <div class="trivia-area">
        <!-- 1. TAMPILAN AWAL (IDLE) -->
        <div v-if="gameState === 'idle'" class="screen-state text-center">
          <img :src="imgLogo" alt="Wasantara Logo" class="main-logo-img" />
          <h3>WAYANG TRIVIA</h3>
          <p>Uji seberapa jauh kamu mengenal ksatria, dewa-dewi, dan kisah pewayangan.</p>
          <button class="btn-action" @click="startGame">MULAI PERMAINAN</button>
        </div>

        <!-- 2. TAMPILAN BERMAIN (PLAYING) -->
        <div v-else-if="gameState === 'playing'" class="quiz-container">
          <div v-if="currentQuestion.image" class="question-image-wrap">
            <img :src="currentQuestion.image" alt="Soal Gambar" class="question-img" />
          </div>

          <h3 class="question-text">{{ currentQuestion.question }}</h3>

          <div class="options-grid">
            <button
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              class="option-btn"
              :class="{
                selected: selectedAnswer === idx,
                correct: isAnswered && idx === currentQuestion.answer,
                wrong: isAnswered && selectedAnswer === idx && idx !== currentQuestion.answer,
                disabled: isAnswered,
              }"
              @click="selectOption(idx)"
              :disabled="isAnswered"
            >
              <span class="option-idx">{{ String.fromCharCode(65 + idx) }}</span>
              <span class="option-label">{{ option }}</span>
            </button>
          </div>

          <!-- Navigasi Lanjut -->
          <div class="quiz-footer" v-if="isAnswered">
            <p v-if="selectedAnswer === currentQuestion.answer" class="feedback text-correct">✓ Jawaban Kamu Benar! (+10 Poin)</p>
            <p v-else class="feedback text-wrong">✗ Kurang Tepat!</p>
            <button class="btn-action" @click="nextQuestion">
              {{ currentQuestionIndex + 1 === quizData.length ? "LIHAT HASIL" : "PERTANYAAN BERIKUTNYA" }}
            </button>
          </div>
        </div>

        <!-- 3. TAMPILAN GAME OVER / SELESAI (OVER) -->
        <div v-else-if="gameState === 'over'" class="screen-state text-center">
          <img :src="imgLogo" alt="Wasantara Logo" class="end-logo-img" />
          <h2 class="end-title">WAYANG TRIVIA</h2>
          <p class="end-desc">Permainan selesai! Kamu berhasil mengumpulkan total skor:</p>
          <div class="final-score">{{ score }} Poin</div>
          <button class="btn-action" @click="startGame">MAIN LAGI</button>
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
  color: rgba(245, 237, 216, 0.55);
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
  border-right: 1px solid rgba(210, 142, 34, 0.15);
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

.cp-tips p {
  font-size: 0.75rem;
  line-height: 1.6;
  color: rgba(245, 237, 216, 0.6);
}

.score-display {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(210, 142, 34, 0.15);
  padding-top: 16px;
}

.sd-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sd-label {
  font-family: var(--mono);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(210, 142, 34, 0.5);
}

.sd-val {
  font-family: var(--mono);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: -0.04em;
  line-height: 1;
}

/* --- Kustomisasi Trivia Baru --- */
.trivia-area {
  padding: 40px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fdf6e9;
}

.text-center {
  text-align: center;
}

/* Image Placeholders */
.placeholder-image {
  background: rgba(210, 142, 34, 0.05);
  border: 1px dashed rgba(210, 142, 34, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-size: 0.75rem;
  color: rgba(210, 142, 34, 0.6);
  margin-bottom: 24px;
}

.main-logo-img,
.end-logo-img {
  height: 120px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  object-fit: contain;
}

.question-placeholder {
  height: 160px;
  width: 100%;
}

.question-image-wrap .question-img {
  max-height: 200px;
  width: auto;
  display: block;
  margin: 0 auto 24px;
  border: 1px solid rgba(210, 142, 34, 0.3);
}

.screen-state h2,
.screen-state h3 {
  font-family: "Space Grotesk", sans-serif;
  color: var(--white);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.screen-state h2 {
  font-size: 2.5rem;
  color: #a13204;
}
.screen-state p {
  color: rgba(245, 237, 216, 0.6);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.question-text {
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 28px;
  font-weight: 600;
  color: var(--white);
}

/* Tombol Aksi */
.btn-action {
  all: unset;
  background: #a13204;
  color: var(--white);
  padding: 12px 28px;
  font-family: var(--mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.btn-action:hover {
  background: #c23e07;
}

/* Grid Pilihan Jawaban */
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.option-btn {
  all: unset;
  background: rgba(24, 10, 2, 0.6);
  border: 1px solid rgba(210, 142, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.option-btn:not(.disabled):hover {
  border-color: rgba(210, 142, 34, 0.8);
  background: rgba(210, 142, 34, 0.05);
}

.option-idx {
  font-family: var(--mono);
  background: rgba(210, 142, 34, 0.15);
  border: 1px solid rgba(210, 142, 34, 0.3);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  color: var(--cream);
}

.option-label {
  font-size: 0.95rem;
}

/* Logika Warna Benar/Salah */
.option-btn.selected {
  border-color: #d28e22;
}

.option-btn.correct {
  border-color: #27ae60 !important;
  background: rgba(39, 174, 96, 0.15) !important;
}

.option-btn.wrong {
  border-color: #c0392b !important;
  background: rgba(192, 57, 43, 0.15) !important;
}

.option-btn.disabled {
  cursor: not-allowed;
}

/* Footer Kuis (Feedback) */
.quiz-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(210, 142, 34, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.feedback {
  font-family: var(--mono);
  font-size: 0.85rem;
  font-weight: bold;
}
.text-correct {
  color: #27ae60;
}
.text-wrong {
  color: #c0392b;
}

.final-score {
  font-size: 3rem;
  font-weight: 800;
  color: var(--cream);
  margin-bottom: 24px;
  font-family: var(--mono);
}

/* Responsif Mobile */
@media (max-width: 900px) {
  .game-header {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .game-wrap {
    grid-template-columns: 1fr;
  }
  .controls-panel {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    border-right: none;
    border-bottom: 1px solid rgba(210, 142, 34, 0.15);
    padding: 16px;
  }
  .score-display {
    flex-direction: row;
    margin-top: 0;
    border-top: none;
    padding-top: 0;
  }
  .trivia-area {
    padding: 20px;
  }
  .options-grid {
    grid-template-columns: 1fr;
  }
  .quiz-footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
