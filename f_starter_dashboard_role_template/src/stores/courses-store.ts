import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ENV } from '@/config/env'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // index of correct option
}

export interface Quiz {
  id: string
  questions: QuizQuestion[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'pdf' | 'audio' | 'text'
  content: string // text content or description
  resourceUrl?: string // url of the media file
  quiz?: Quiz
}

export interface CourseModule {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  description: string
  category: 'Initiations Énergétiques' | 'Équilibrage des Chakras' | 'Élixirs & Remèdes' | 'Créativité & Rituels'
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  price: number
  badge: string // e.g., "Nouveau", "Populaire", "Recommandé"
  status: 'brouillon' | 'publié'
  duration: string // e.g., "6 semaines"
  studentsCount: number
  rating: number
  instructorId?: string
  instructorName: string
  instructorTitle: string
  image?: string
  modules: CourseModule[]
  created_at: string
}

export interface StudentEnrollment {
  id: string
  studentId: string
  courseId: string
  progress: number // percentage 0-100
  completedLessons: string[] // array of lesson IDs
  lastAccessed: string
}

export interface Transaction {
  id: string
  studentEmail: string
  studentName: string
  courseTitle: string
  amount: number
  date: string
  status: 'Reçu' | 'Remboursé'
  courseId?: string
}

interface CoursesState {
  courses: Course[]
  enrollments: StudentEnrollment[]
  transactions: Transaction[]
}

interface CoursesActions {
  addCourse: (course: Partial<Course> & Pick<Course, 'title' | 'description' | 'price' | 'level'>) => string
  updateCourse: (id: string, updated: Partial<Course>) => void
  deleteCourse: (id: string) => void
  addModule: (courseId: string, title: string) => void
  updateModule: (courseId: string, moduleId: string, title: string) => void
  deleteModule: (courseId: string, moduleId: string) => void
  addLesson: (courseId: string, moduleId: string, lesson: Omit<Lesson, 'id'>) => void
  updateLesson: (courseId: string, moduleId: string, lessonId: string, updated: Partial<Lesson>) => void
  deleteLesson: (courseId: string, moduleId: string, lessonId: string) => void
  enrollStudent: (studentId: string, courseId: string) => void
  completeLesson: (studentId: string, courseId: string, lessonId: string) => void
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void
}

export type CoursesStore = CoursesState & CoursesActions

const DEFAULT_COURSES: Course[] = [
  // 1. Initiations Énergétiques
  {
    id: 'lahochi-initiation',
    title: 'Initiation au LaHoChi',
    description: 'Devenez canal de lumière pour transmettre cette énergie de guérison puissante, douce et accessible, pour vous et pour les autres.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 150,
    badge: 'Populaire',
    status: 'publié',
    duration: '2 jours',
    studentsCount: 120,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    instructorId: '1',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    modules: [
      {
        id: 'lh-m1',
        title: '1. Introduction au LaHoChi',
        lessons: [
          {
            id: 'lh-l1',
            title: 'Qu\'est-ce que le LaHoChi et son histoire',
            type: 'video',
            content: 'Découvrez l\'origine de cette méthode d\'apposition des mains à haute fréquence.',
            resourceUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
          },
          {
            id: 'lh-l2',
            title: 'Se préparer à canaliser',
            type: 'audio',
            content: 'Une méditation de centrage pour ouvrir son canal de lumière.',
            resourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          }
        ]
      },
      {
        id: 'lh-m2',
        title: '2. Auto-traitement et soin à autrui',
        lessons: [
          {
            id: 'lh-l3',
            title: 'Les 5 positions des mains',
            type: 'pdf',
            content: 'Guide illustré des positions d\'apposition des mains pour le traitement.',
            resourceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          }
        ]
      }
    ]
  },
  {
    id: 'radiesthesie-initiation',
    title: 'Initiation à la Radiesthésie & Pendule',
    description: 'Connectez-vous à votre potentiel intuitif avec clarté et discernement grâce au pendule et aux baguettes de sourcier.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 70,
    badge: 'Recommandé',
    status: 'publié',
    duration: '1/2 journée',
    studentsCount: 85,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    instructorId: '1',
    image: 'https://images.unsplash.com/photo-1518244979147-3f79029992d4?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    modules: [
      {
        id: 'rad-m1',
        title: '1. Fondations de la Radiesthésie',
        lessons: [
          {
            id: 'rad-l1',
            title: 'Choisir et purifier son pendule',
            type: 'video',
            content: 'Les critères essentiels pour sélectionner le pendule qui résonne avec vous.',
            resourceUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
          }
        ]
      }
    ]
  },
  {
    id: 'mindfulness-pleine-conscience',
    title: 'Mindfulness & Pleine Conscience',
    description: 'Apprenez à vivre l\'instant présent et à gérer votre stress avec des techniques éprouvées de pleine conscience.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 89,
    badge: 'Classique',
    status: 'publié',
    duration: '6 semaines',
    studentsCount: 450,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'reiki-soins-energetiques',
    title: 'Soins Énergétiques & Reiki',
    description: 'Initiez-vous aux techniques de soin énergétique pour vous-même et pour les autres.',
    category: 'Initiations Énergétiques',
    level: 'Avancé',
    price: 159,
    badge: 'Recommandé',
    status: 'publié',
    duration: '9 semaines',
    studentsCount: 175,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'lumiere-interieure',
    title: 'Reconnectez-vous à votre lumière intérieure',
    description: 'Atelier d\'éveil et d\'harmonisation pour lever les blocages et révéler votre potentiel spirituel.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 90,
    badge: 'Populaire',
    status: 'publié',
    duration: '1 jour',
    studentsCount: 95,
    rating: 4.7,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'seminaire-entreprise',
    title: 'Séminaires de Repos & Bien-Être',
    description: 'Sessions sur mesure d\'harmonisation et de recentrage vibratoire en milieu professionnel.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 250,
    badge: 'Pro',
    status: 'publié',
    duration: '1 jour',
    studentsCount: 40,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'atelier-decouverte',
    title: 'Atelier Découverte Énergétique',
    description: 'Séance d\'initiation joyeuse et vivante aux premiers ressentis énergétiques.',
    category: 'Initiations Énergétiques',
    level: 'Débutant',
    price: 40,
    badge: 'Découverte',
    status: 'publié',
    duration: '2 heures',
    studentsCount: 110,
    rating: 4.6,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },

  // 2. Équilibrage des Chakras
  {
    id: 'chakra-equilibrage-global',
    title: 'Rééquilibrage Énergétique des Chakras',
    description: 'Harmonisez vos centres d\'énergie pour retrouver vitalité, paix intérieure et alignement conscient.',
    category: 'Équilibrage des Chakras',
    level: 'Intermédiaire',
    price: 129,
    badge: 'Populaire',
    status: 'publié',
    duration: '8 semaines',
    studentsCount: 320,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-racine',
    title: 'Les Fondations Énergétiques : Chakra Racine',
    description: 'Renforcez votre ancrage, votre sentiment de sécurité et de stabilité vitale à la base de votre colonne.',
    category: 'Équilibrage des Chakras',
    level: 'Débutant',
    price: 45,
    badge: 'Essentiel',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 150,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-sacre',
    title: 'Réveille ton Chakra Sacré',
    description: 'Rallumez la flamme de votre créativité, de votre sensualité et de votre fluidité émotionnelle.',
    category: 'Équilibrage des Chakras',
    level: 'Débutant',
    price: 45,
    badge: 'Nouveau',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 130,
    rating: 4.7,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'plexus-solaire',
    title: 'Le Plexus Solaire : Pouvoir & Confiance',
    description: 'Affirmez votre puissance personnelle, libérez votre plexus et rayonnez sans le filtre du mental.',
    category: 'Équilibrage des Chakras',
    level: 'Intermédiaire',
    price: 45,
    badge: 'Transformation',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 95,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-coeur',
    title: 'Le Chakra du Cœur : Amour Inconditionnel',
    description: 'Ouvrez votre cœur (Anahata), apprenez le pardon vibratoire et baignez dans la compassion.',
    category: 'Équilibrage des Chakras',
    level: 'Débutant',
    price: 45,
    badge: 'Doux',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 140,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-gorge',
    title: 'Harmonisation du Chakra de la Gorge',
    description: 'Exprimez votre vérité d\'âme, libérez les non-dits et fluidifiez votre communication.',
    category: 'Équilibrage des Chakras',
    level: 'Intermédiaire',
    price: 45,
    badge: 'Expression',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 88,
    rating: 4.7,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-troisieme-oeil',
    title: 'Le Chakra du 3ᵉ Œil : Vision Intérieure',
    description: 'Voyagez au cœur d\'Ajna, éveillez votre intuition profonde et apprenez à faire confiance au subtil.',
    category: 'Équilibrage des Chakras',
    level: 'Avancé',
    price: 45,
    badge: 'Intuition',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 74,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-coronal',
    title: 'Éveil du Chakra Coronal : Portail Spirituel',
    description: 'Ressentez l\'unité suprême, la reliance cosmique et la guidance de vos plans supérieurs.',
    category: 'Équilibrage des Chakras',
    level: 'Avancé',
    price: 45,
    badge: 'Spirituel',
    status: 'publié',
    duration: '1 semaine',
    studentsCount: 60,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'chakra-blessures',
    title: 'Les Chakras et Leurs Blessures Émotionnelles',
    description: 'Comprenez comment les chocs émotionnels se cristallisent dans vos centres énergétiques et apprenez à les libérer.',
    category: 'Équilibrage des Chakras',
    level: 'Intermédiaire',
    price: 75,
    badge: 'Guérison',
    status: 'publié',
    duration: '3 semaines',
    studentsCount: 110,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },

  // 3. Élixirs & Remèdes
  {
    id: 'elixirs-creation',
    title: 'Atelier Création d’Élixirs Vibratoires',
    description: 'Apprenez à composer des élixirs olfactifs et vibratoires intuitifs à l\'aide des plantes et des pierres.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 80,
    badge: 'Atelier',
    status: 'publié',
    duration: '1/2 journée',
    studentsCount: 95,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'lithotherapie-mineraux',
    title: 'Lithothérapie & Minéraux',
    description: 'Découvrez le pouvoir vibratoire des pierres et maîtrisez les soins énergétiques pour harmoniser votre quotidien.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 99,
    badge: 'Nouveauté',
    status: 'publié',
    duration: '5 semaines',
    studentsCount: 280,
    rating: 4.7,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'aromatherapie-huiles',
    title: 'Aromathérapie & Huiles Essentielles',
    description: 'Maîtrisez les bienfaits des huiles essentielles pour le bien-être physique et émotionnel.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 119,
    badge: 'Classique',
    status: 'publié',
    duration: '7 semaines',
    studentsCount: 390,
    rating: 4.6,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-racine',
    title: 'Élixir Énergétique pour le Chakra Racine',
    description: 'Créez votre propre fragrance vibratoire favorisant l\'ancrage et la vitalité originelle.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 30,
    badge: 'Atelier',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 75,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-coeur',
    title: 'Élixir Énergétique pour le Chakra Cœur',
    description: 'Découvrez et confectionnez une synergie d\'aromathérapie vibratoire d\'ouverture et de réconfort.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 30,
    badge: 'Atelier',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 82,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-gorge',
    title: 'Élixir Énergétique Chakra Gorge',
    description: 'Apprenez à composer un parfum d\'âme pour libérer l\'expression vocale et l\'affirmation.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 30,
    badge: 'Atelier',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 64,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-troisieme-oeil',
    title: 'Élixir Énergétique Chakra 3ème Œil',
    description: 'Une synergie vibratoire unique conçue pour ouvrir la vision spirituelle et soutenir le rêve conscient.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 30,
    badge: 'Atelier',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 55,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-protection',
    title: 'Élixir de Protection',
    description: 'Synergie d\'huiles et d\'intentions pour sceller son espace énergétique et repousser les énergies négatives.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 35,
    badge: 'Essentiel',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 140,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'rollon-confiance',
    title: 'Roll-on Confiance et Protection',
    description: 'Un outil vibratoire de poche à base d\'huiles essentielles et de minéraux pour rester confiant en toute circonstance.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 25,
    badge: 'Nomade',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 190,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'elixir-coeur-apaisant',
    title: 'Élixir Apaisant Chakra Cœur',
    description: 'Rituel olfactif à base d\'élixirs floraux pour adoucir le plan émotionnel et cultiver la paix.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 30,
    badge: 'Apaisement',
    status: 'publié',
    duration: 'Atelier pratique',
    studentsCount: 92,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },

  // 4. Créativité & Rituels
  {
    id: 'mandalas-creation',
    title: 'Créer un Mandala',
    description: 'Découvrez la géométrie sacrée comme outil de recentrage, de méditation active et d\'expression intuitive.',
    category: 'Créativité & Rituels',
    level: 'Débutant',
    price: 50,
    badge: 'Méditation',
    status: 'publié',
    duration: '1/2 journée',
    studentsCount: 77,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'rituels-amour',
    title: 'Rituels d\'Amour pour le Cœur',
    description: 'Pratiques et cérémonies d\'éveil du cœur et de célébration vibratoire de l\'amour sous toutes ses formes.',
    category: 'Créativité & Rituels',
    level: 'Débutant',
    price: 60,
    badge: 'Rituel',
    status: 'publié',
    duration: '1/2 journée',
    studentsCount: 65,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'amare-femme',
    title: 'Amare Femme',
    description: 'Un cheminement dédié à l\'éveil de la conscience féminine, de la connexion au corps et aux énergies créatrices Yin.',
    category: 'Créativité & Rituels',
    level: 'Débutant',
    price: 95,
    badge: 'Éveil',
    status: 'publié',
    duration: '4 semaines',
    studentsCount: 110,
    rating: 4.9,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'amare-homme',
    title: 'Amare Homme',
    description: 'Un parcours d\'intégration et d\'harmonisation des énergies masculines sacrées et de reliance spirituelle Yang.',
    category: 'Créativité & Rituels',
    level: 'Débutant',
    price: 95,
    badge: 'Éveil',
    status: 'publié',
    duration: '4 semaines',
    studentsCount: 52,
    rating: 4.7,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'guerison-interieure',
    title: 'Auto-compassion & Guérison Intérieure',
    description: 'Développez la bienveillance envers vous-même et libérez les blocages émotionnels.',
    category: 'Créativité & Rituels',
    level: 'Débutant',
    price: 79,
    badge: 'Nouveau',
    status: 'publié',
    duration: '5 semaines',
    studentsCount: 260,
    rating: 4.8,
    instructorName: 'Fabienne Dizy Olliveaud',
    instructorTitle: 'Formatrice & Praticienne Énergétique',
    created_at: new Date().toISOString(),
    modules: []
  },
  {
    id: 'lithotherapie-cristaux',
    title: 'Lithothérapie Vibratoire : Le Pouvoir des Cristaux',
    description: 'Apprenez à ressentir l\'énergie des cristaux, à les purifier, les recharger, et à concevoir vos propres grilles cristallines thérapeutiques.',
    category: 'Élixirs & Remèdes',
    level: 'Débutant',
    price: 95,
    badge: 'Nouveau',
    status: 'publié',
    duration: '3 semaines',
    studentsCount: 12,
    rating: 4.9,
    instructorName: 'Instructeur Demo',
    instructorTitle: 'Lithothérapeute & Énergéticien',
    instructorId: '3',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    modules: []
  }
]

export const useCoursesStore = create<CoursesStore>()(
  persist(
    (set) => ({
      courses: DEFAULT_COURSES,
      enrollments: [
        {
          id: 'mock-enroll-1',
          studentId: '2',
          courseId: 'lahochi-initiation',
          progress: 33,
          completedLessons: ['lh-l1'],
          lastAccessed: new Date().toISOString()
        }
      ],
      transactions: [
        {
          id: 'tx-lh-150',
          studentEmail: 'client@test.com',
          studentName: 'Client Demo',
          courseTitle: 'Initiation au LaHoChi',
          amount: 150,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          status: 'Reçu',
          courseId: 'lahochi-initiation'
        }
      ],

      addCourse: (course) => {
        const id = Math.random().toString(36).substring(2, 9)
        // Defaults are applied FIRST, then course spread overwrites them
        // so instructorId / instructorName from the caller are always preserved
        const newCourse: Course = {
          category: 'Initiations Énergétiques',
          duration: '1/2 journée',
          studentsCount: 0,
          rating: 5.0,
          badge: 'Nouveau',
          status: 'brouillon',
          instructorId: 'unknown',
          instructorName: 'Formateur',
          instructorTitle: 'Praticien Holistique',
          ...course,          // ← caller's instructorId wins
          id,
          modules: [],
          created_at: new Date().toISOString(),
        }
        set((state) => ({
          courses: [...state.courses, newCourse],
        }))
        return id
      },

      updateCourse: (id, updated) => {
        set((state) => ({
          courses: state.courses.map((c) => (c.id === id ? { ...c, ...updated } : c)),
        }))
      },

      deleteCourse: (id) => {
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        }))
      },

      addModule: (courseId, title) => {
        const id = Math.random().toString(36).substring(2, 9)
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: [...c.modules, { id, title, lessons: [] }],
            }
          }),
        }))
      },

      updateModule: (courseId, moduleId, title) => {
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: c.modules.map((m) => (m.id === moduleId ? { ...m, title } : m)),
            }
          }),
        }))
      },

      deleteModule: (courseId, moduleId) => {
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: c.modules.filter((m) => m.id !== moduleId),
            }
          }),
        }))
      },

      addLesson: (courseId, moduleId, lesson) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newLesson: Lesson = { ...lesson, id }
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: c.modules.map((m) => {
                if (m.id !== moduleId) return m
                return {
                  ...m,
                  lessons: [...m.lessons, newLesson],
                }
              }),
            }
          }),
        }))
      },

      updateLesson: (courseId, moduleId, lessonId, updated) => {
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: c.modules.map((m) => {
                if (m.id !== moduleId) return m
                return {
                  ...m,
                  lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...updated } : l)),
                }
              }),
            }
          }),
        }))
      },

      deleteLesson: (courseId, moduleId, lessonId) => {
        set((state) => ({
          courses: state.courses.map((c) => {
            if (c.id !== courseId) return c
            return {
              ...c,
              modules: c.modules.map((m) => {
                if (m.id !== moduleId) return m
                return {
                  ...m,
                  lessons: m.lessons.filter((l) => l.id !== lessonId),
                }
              }),
            }
          }),
        }))
      },

      enrollStudent: (studentId, courseId) => {
        set((state) => {
          const exists = state.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId)
          if (exists) return {}
          const newEnrollment: StudentEnrollment = {
            id: Math.random().toString(36).substring(2, 9),
            studentId,
            courseId,
            progress: 0,
            completedLessons: [],
            lastAccessed: new Date().toISOString(),
          }
          return {
            enrollments: [...state.enrollments, newEnrollment],
          }
        })
      },

      completeLesson: (studentId, courseId, lessonId) => {
        set((state) => {
          const enrollment = state.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId)
          if (!enrollment) return {}

          let completedLessons = [...enrollment.completedLessons]
          if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId)
          }

          // Calculate progress based on total lessons in the course
          const course = state.courses.find((c) => c.id === courseId)
          const totalLessons = course ? course.modules.reduce((sum, m) => sum + m.lessons.length, 0) : 0
          const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0

          return {
            enrollments: state.enrollments.map((e) =>
              e.studentId === studentId && e.courseId === courseId
                ? { ...e, completedLessons, progress, lastAccessed: new Date().toISOString() }
                : e
            ),
          }
        })
      },

      addTransaction: (transaction) => {
        const id = Math.random().toString(36).substring(2, 9)
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id, date: new Date().toISOString() },
          ],
        }))
      },
    }),
    {
      name: 'numtema-courses-storage-v7',
    }
  )
)

if (typeof window !== 'undefined') {
  useCoursesStore.subscribe((state) => {
    fetch(`${ENV.VITRINE_URL}/api/sync-courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.courses),
    }).catch((err) => console.warn('Vitrine offline or sync error:', err))
  })

  // Initial sync delay to allow store rehydration
  setTimeout(() => {
    const state = useCoursesStore.getState()
    if (state && state.courses) {
      fetch(`${ENV.VITRINE_URL}/api/sync-courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.courses),
      }).catch((err) => console.warn('Vitrine offline or initial sync error:', err))
    }
  }, 1500)
}

