import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Wasantara — Platform Edukasi Wayang Interaktif',
      description: 'Jelajahi kekayaan seni budaya wayang Indonesia. Warisan Dunia UNESCO sejak 2003.'
    }
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/Explore.vue'),
    meta: {
      title: 'Jelajah Wayang — Jenis, Tokoh & Galeri | Wasantara',
      description: 'Temukan ragam jenis wayang, tokoh-tokoh epik, dan galeri keindahan seni wayang Indonesia.'
    }
  },
  {
    path: '/philosophy',
    name: 'Philosophy',
    component: () => import('../views/Philosophy.vue'),
    meta: {
      title: 'Filosofi Wayang — Kearifan Leluhur | Wasantara',
      description: 'Selami filosofi kosmis dan proses pertunjukan wayang semalam suntuk.'
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue'),
    meta: {
      title: 'Peta Persebaran Wayang Indonesia | Wasantara',
      description: 'Eksplorasi peta interaktif persebaran wayang di seluruh nusantara.'
    }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue'),
    meta: {
      title: 'Wayang Trivia — Kuis Interaktif | Wasantara',
      description: 'Ikuti kuis trivia interaktif bertema wayang dan uji pengetahuanmu tentang budaya wayang Indonesia.'
    }
  },
  {
    path: '/lakon',
    name: 'Lakon',
    component: () => import('../views/Lakon.vue'),
    meta: {
      title: 'Lakon Cerita — Epik Kisah Wayang | Wasantara',
      description: 'Telusuri kisah klasik kepahlawanan, cinta, dan spiritualitas dalam cerita wayang Indonesia.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Wasantara'
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc && to.meta.description) {
    metaDesc.setAttribute('content', to.meta.description)
  }
})

export default router
