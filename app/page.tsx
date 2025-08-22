"use client"

import { useState, useRef, useEffect } from "react"
import { UniversitySearchForm, type SearchFilters } from "@/components/university-search-form"
import { UniversityCard } from "@/components/university-card"
import { universities, type University } from "@/lib/universities-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  SlidersHorizontal,
  Sparkles,
  Globe,
  Users,
  Award,
  BookOpen,
  Bot,
  CheckCircle,
  Target,
  FileText,
  Clock,
  Menu,
  X,
  Crown,
  Trophy,
  Zap,
  Star,
  ArrowLeft,
  Microscope,
  Palette,
  Briefcase,
  Heart,
  Languages,
  DollarSign,
  Calendar,
  User,
  MessageCircle,
} from "lucide-react"

const extracurricularActivities = [
  {
    category: "Наука и технологии",
    competitions: [
      {
        name: "Intel International Science and Engineering Fair (ISEF)",
        description: "Крупнейшая международная научная ярмарка для старшеклассников",
        deadline: "Региональные отборы: январь-март",
      },
      { name: "Google Science Fair", description: "Онлайн конкурс научных проектов от Google", deadline: "Май" },
      {
        name: "International Mathematical Olympiad (IMO)",
        description: "Престижная математическая олимпиада",
        deadline: "Национальные отборы: февраль-апрель",
      },
      {
        name: "International Physics Olympiad (IPhO)",
        description: "Международная олимпиада по физике",
        deadline: "Национальные отборы: март-май",
      },
      {
        name: "International Informatics Olympiad (IOI)",
        description: "Олимпиада по программированию и алгоритмам",
        deadline: "Национальные отборы: апрель-май",
      },
      {
        name: "International Chemistry Olympiad (IChO)",
        description: "Престижная международная олимпиада по химии",
        deadline: "Национальные отборы: март-апрель",
      },
      {
        name: "International Biology Olympiad (IBO)",
        description: "Международная олимпиада по биологии",
        deadline: "Национальные отборы: февраль-март",
      },
      {
        name: "BioGENEius Challenge",
        description: "Конкурс биотехнологических исследований",
        deadline: "Региональные туры: март-апрель",
      },
      {
        name: "Stockholm Junior Water Prize",
        description: "Конкурс проектов по водным ресурсам и экологии",
        deadline: "Национальные отборы: апрель",
      },
    ],
  },
  {
    category: "Лингвистика и языки",
    competitions: [
      {
        name: "International Linguistics Olympiad (IOL)",
        description: "Престижная международная олимпиада по лингвистике",
        deadline: "Национальные отборы: март-апрель",
      },
      {
        name: "World Scholar's Cup",
        description: "Международная академическая олимпиада с языковым компонентом",
        deadline: "Региональные туры: февраль-май",
      },
      {
        name: "International Young Translators Competition",
        description: "Конкурс молодых переводчиков от ЕС",
        deadline: "Ноябрь",
      },
      {
        name: "Cambridge English Writing Competition",
        description: "Международный конкурс творческого письма на английском",
        deadline: "Апрель",
      },
      {
        name: "Polyglot Conference Youth Competition",
        description: "Конкурс для молодых полиглотов",
        deadline: "Сентябрь",
      },
    ],
  },
  {
    category: "Бизнес и предпринимательство",
    competitions: [
      {
        name: "DECA International Career Development Conference",
        description: "Конкурс по маркетингу, финансам и бизнесу",
        deadline: "Апрель",
      },
      {
        name: "Future Business Leaders of America (FBLA)",
        description: "Соревнования по бизнес-навыкам",
        deadline: "Июнь-июль",
      },
      { name: "Young Entrepreneur Awards", description: "Конкурс молодых предпринимателей", deadline: "Сентябрь" },
      {
        name: "Diamond Challenge for High School Entrepreneurs",
        description: "Конкурс бизнес-планов для старшеклассников",
        deadline: "Январь",
      },
    ],
  },
  {
    category: "Искусство и творчество",
    competitions: [
      {
        name: "Scholastic Art & Writing Awards",
        description: "Престижный конкурс творческих работ",
        deadline: "Декабрь-январь",
      },
      { name: "International Student Film Festival", description: "Фестиваль студенческого кино", deadline: "Март" },
      {
        name: "Global Art Competition for Students",
        description: "Международный конкурс изобразительного искусства",
        deadline: "Май",
      },
      {
        name: "International Photography Awards",
        description: "Конкурс фотографии для молодых талантов",
        deadline: "Февраль",
      },
    ],
  },
  {
    category: "Социальные проекты",
    competitions: [
      {
        name: "UN Global Goals Film Festival",
        description: "Фестиваль фильмов о целях устойчивого развития ООН",
        deadline: "Февраль",
      },
      {
        name: "International Youth Leadership Conference",
        description: "Конференция молодых лидеров",
        deadline: "Апрель",
      },
      { name: "Model United Nations (MUN)", description: "Модель ООН для студентов", deadline: "Круглый год" },
      {
        name: "Global Youth Service Day",
        description: "Международный день молодежного волонтерства",
        deadline: "Апрель",
      },
    ],
  },
  {
    category: "Гуманитарные науки",
    competitions: [
      {
        name: "International History Olympiad",
        description: "Олимпиада по всемирной истории",
        deadline: "Национальные отборы: март",
      },
      {
        name: "International Philosophy Olympiad",
        description: "Олимпиада по философии для старшеклассников",
        deadline: "Национальные отборы: февраль",
      },
      {
        name: "European Union Contest for Young Scientists",
        description: "Конкурс молодых ученых в области гуманитарных наук",
        deadline: "Май",
      },
    ],
  },
]

const summerSchools = [
  {
    name: "Harvard Summer School",
    description: "Престижная летняя программа в Гарварде с академическими курсами",
    duration: "6-8 недель",
    cost: "$4,000-$6,000",
    deadline: "Март-Апрель",
  },
  {
    name: "Stanford Pre-Collegiate Summer Institutes",
    description: "Интенсивные программы по различным дисциплинам",
    duration: "2-4 недели",
    cost: "$3,000-$5,000",
    deadline: "Февраль-Март",
  },
  {
    name: "MIT Research Science Institute (RSI)",
    description: "Элитная исследовательская программа по науке и инженерии",
    duration: "6 недель",
    cost: "Бесплатно",
    deadline: "Январь",
  },
  {
    name: "Yale Young Global Scholars",
    description: "Программа по международным отношениям и глобальным вопросам",
    duration: "2 недели",
    cost: "$6,000",
    deadline: "Январь-Февраль",
  },
  {
    name: "Oxford Summer Courses",
    description: "Академические программы в Оксфордском университете",
    duration: "2-6 недель",
    cost: "$3,000-$8,000",
    deadline: "Март-Май",
  },
]

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<University[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showEssayAnalysis, setShowEssayAnalysis] = useState(false)
  const [showExtracurricular, setShowExtracurricular] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [essayText, setEssayText] = useState("")
  const [essayAnalysis, setEssayAnalysis] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showSummerSchools, setShowSummerSchools] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)

  const [sortBy, setSortBy] = useState("ranking")
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [aiResponse, setAiResponse] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchFormRef = useRef<HTMLDivElement>(null)
  const [currentView, setCurrentView] = useState<
    "search" | "premium" | "essayAnalysis" | "extracurricular" | "summerSchools" | "consultation" | "tips" | "ai"
  >("search")

  useEffect(() => {
    if (searchResults.length > 0) {
      const sorted = [...searchResults].sort((a, b) => {
        switch (sortBy) {
          case "ranking":
            return a.ranking - b.ranking
          case "tuition":
            const getTuitionInUSD = (uni: University) => {
              switch (uni.tuitionFee.currency) {
                case "USD":
                  return uni.tuitionFee.min
                case "GBP":
                  return uni.tuitionFee.min * 1.27
                case "CHF":
                  return uni.tuitionFee.min * 1.1
                case "EUR":
                  return uni.tuitionFee.min * 1.08
                default:
                  return uni.tuitionFee.min
              }
            }
            return getTuitionInUSD(a) - getTuitionInUSD(b)
          case "acceptance":
            return a.acceptanceRate - b.acceptanceRate
          default:
            return a.ranking - b.ranking
        }
      })

      // Проверяем, изменился ли порядок, чтобы избежать лишних обновлений
      const hasChanged = sorted.some((uni, index) => uni.id !== searchResults[index]?.id)
      if (hasChanged) {
        setSearchResults(sorted)
      }
    }
  }, [sortBy, searchResults])

  const handleSearch = (filters: SearchFilters) => {
    const filtered = universities.filter((uni) => {
      if (filters.country && filters.country !== "" && uni.country !== filters.country) return false
      if (filters.program && filters.program !== "" && !uni.programs.includes(filters.program)) return false
      if (filters.language && filters.language !== "" && !uni.languages.includes(filters.language)) return false

      // Budget filter
      const tuitionInUSD =
        uni.tuitionFee.currency === "USD"
          ? uni.tuitionFee.min
          : uni.tuitionFee.currency === "GBP"
            ? uni.tuitionFee.min * 1.27
            : uni.tuitionFee.currency === "CHF"
              ? uni.tuitionFee.min * 1.1
              : uni.tuitionFee.currency === "EUR"
                ? uni.tuitionFee.min * 1.08
                : uni.tuitionFee.min

      if (tuitionInUSD < filters.budgetMin || tuitionInUSD > filters.budgetMax) return false

      // Test scores - only filter if user provided scores (> 0)
      if (filters.ielts > 0 && uni.requirements.ielts && filters.ielts < uni.requirements.ielts) return false
      if (filters.toefl > 0 && uni.requirements.toefl && filters.toefl < uni.requirements.toefl) return false
      if (filters.sat > 0 && uni.requirements.sat && filters.sat < uni.requirements.sat) return false
      if (filters.act > 0 && uni.requirements.act && filters.act < uni.requirements.act) return false
      if (filters.gpa > 0 && filters.gpa < uni.requirements.gpa) return false

      // Competitiveness filter
      if (uni.competitiveness < filters.competitiveness[0] || uni.competitiveness > filters.competitiveness[1])
        return false

      return true
    })

    setSearchResults(filtered)
    setShowResults(true)
    setIsMobileMenuOpen(false)
  }

  const handleViewDetails = (university: University) => {
    window.open(university.website, "_blank")
  }

  const handleSearchClick = () => {
    if (showResults) {
      setShowResults(false)
      setShowTips(false)
      setShowAI(false)
    } else {
      searchFormRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleRankingsClick = () => {
    const sortedUniversities = [...universities].sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking
        case "tuition":
          const getTuitionInUSD = (uni: University) => {
            switch (uni.tuitionFee.currency) {
              case "USD":
                return uni.tuitionFee.min
              case "GBP":
                return uni.tuitionFee.min * 1.27
              case "CHF":
                return uni.tuitionFee.min * 1.1
              case "EUR":
                return uni.tuitionFee.min * 1.08
              default:
                return uni.tuitionFee.min
            }
          }
          return getTuitionInUSD(a) - getTuitionInUSD(b)
        case "acceptance":
          return a.acceptanceRate - b.acceptanceRate
        default:
          return a.ranking - b.ranking
      }
    })

    setSearchResults(sortedUniversities)
    setShowResults(true)
    setShowTips(false)
    setShowAI(false)
    setIsMobileMenuOpen(false)
  }

  const handleCommunityClick = () => {
    alert('Раздел "Сообщество" скоро будет доступен! 🎓')
    setIsMobileMenuOpen(false)
  }

  const handleTipsClick = () => {
    setShowResults(false)
    setShowAI(false)
    setShowTips(true)
    setIsMobileMenuOpen(false)
  }

  const handleAIClick = () => {
    setShowResults(false)
    setShowTips(false)
    setShowAI(true)
    setIsMobileMenuOpen(false)
  }

  const handleHomeClick = () => {
    setShowResults(false)
    setShowTips(false)
    setShowAI(false)
    setShowPremium(false)
    setIsMobileMenuOpen(false)
  }

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question)

    // Simple AI responses based on predefined questions
    setTimeout(() => {
      let response = ""

      switch (question) {
        case "Какой IELTS нужен для топ-университетов?":
          response =
            "Для большинства топ-университетов требуется IELTS 7.0-7.5. Оксфорд и Кембридж часто требуют 7.5+, MIT и Гарвард - 7.0+. Некоторые программы могут требовать до 8.0."
          break
        case "Какой средний GPA нужен для поступления?":
          response =
            "Для топ-10 университетов нужен GPA 3.9+, для топ-50 - 3.7+, для топ-100 - 3.5+. Но помните, что GPA - не единственный критерий, важны также тесты, эссе и внеучебная деятельность."
          break
        case "Сколько стоит обучение в разных странах?":
          response =
            "США: $50-80k/год, Великобритания: £20-50k/год, Канада: CAD$25-60k/год, Австралия: AUD$30-50k/год, Германия: €0-20k/год. Не забывайте про стипендии и финансовую помощь!"
          break
        case "Когда подавать документы?":
          response =
            "Early Decision: ноябрь, Regular Decision: январь-февраль, для Великобритании через UCAS: октябрь-январь. Начинайте подготовку за 1-2 года до подачи!"
          break
        case "Какие внеучебные активности важны?":
          response =
            "Лидерские позиции, волонтерство, научные проекты, олимпиады, спорт, искусство. Важна не количество, а глубина вовлеченности и влияние на сообщество."
          break
        case "Как написать сильное мотивационное эссе?":
          response =
            "Будьте уникальными, рассказывайте личную историю, показывайте рост и цели. Избегайте клише, будьте конкретными, проверьте грамматику. Начинайте писать за 3-6 месяцев до дедлайна."
          break
        case "Нужны ли рекомендательные письма?":
          response =
            "Да, обычно 2-3 письма от учителей/наставников, которые знают вас лично. Дайте им достаточно времени (минимум месяц) и предоставьте информацию о ваших достижениях."
          break
        case "Какие тесты SAT/ACT нужны для США?":
          response =
            "Для топ-университетов: SAT 1500+ или ACT 33+. Многие университеты стали test-optional, но высокие баллы все еще дают преимущество. Сдавайте несколько раз для лучшего результата."
          break
        default:
          response =
            "Отличный вопрос! Выберите один из предложенных вопросов выше, чтобы получить подробный ответ от нашего ИИ-консультанта."
      }

      setAiResponse(response)
    }, 1000)
  }

  const handlePremiumClick = () => {
    setShowResults(false)
    setShowTips(false)
    setShowAI(false)
    setShowPremium(true)
    setShowEssayAnalysis(false)
    setShowExtracurricular(false)
    setIsMobileMenuOpen(false)
  }

  const handlePurchasePremium = () => {
    setIsPremium(true)
    alert("Поздравляем! Вы успешно приобрели Premium подписку! 🎉")
  }

  const analyzeEssay = () => {
    const wordCount = essayText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    let analysis = ""

    if (wordCount === 0) {
      analysis = "Пожалуйста, введите текст эссе для анализа."
    } else if (wordCount < 250) {
      analysis = `Ваше эссе содержит ${wordCount} слов. Рекомендуется увеличить объем до 250-650 слов для более полного раскрытия темы. Добавьте больше конкретных примеров и деталей.`
    } else if (wordCount > 650) {
      analysis = `Ваше эссе содержит ${wordCount} слов. Рекомендуется сократить до 250-650 слов. Уберите лишние детали и сосредоточьтесь на главных моментах.`
    } else {
      analysis = `Отлично! Ваше эссе содержит ${wordCount} слов - это оптимальный объем. Убедитесь, что есть четкая структура: введение, основная часть с примерами, заключение. Проверьте грамматику и уникальность истории.`
    }

    setEssayAnalysis(analysis)
  }

  const handleEssayAnalysisClick = () => {
    setShowPremium(false)
    setShowEssayAnalysis(true)
    setShowExtracurricular(false)
  }

  const handleExtracurricularClick = () => {
    setShowPremium(false)
    setShowEssayAnalysis(false)
    setShowExtracurricular(true)
  }

  const handleBackToMain = () => {
    setShowPremium(false)
    setShowEssayAnalysis(false)
    setShowExtracurricular(false)
    setShowSummerSchools(false)
    setShowConsultation(false)
    setShowResults(false)
    setShowTips(false)
    setShowAI(false)
    setCurrentView("search")
  }

  const handleSummerSchoolsClick = () => {
    setShowPremium(false)
    setShowEssayAnalysis(false)
    setShowExtracurricular(false)
    setShowSummerSchools(true)
    setShowConsultation(false)
  }

  const handleConsultationClick = () => {
    setShowPremium(false)
    setShowEssayAnalysis(false)
    setShowExtracurricular(false)
    setShowSummerSchools(false)
    setShowConsultation(true)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Наука и технологии":
        return <Microscope className="h-5 w-5" />
      case "Лингвистика и языки":
        return <Languages className="h-5 w-5" />
      case "Бизнес и предпринимательство":
        return <Briefcase className="h-5 w-5" />
      case "Искусство и творчество":
        return <Palette className="h-5 w-5" />
      case "Социальные проекты":
        return <Heart className="h-5 w-5" />
      case "Гуманитарные науки":
        return <BookOpen className="h-5 w-5" />
      default:
        return <Trophy className="h-5 w-5" />
    }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">UniWise</h1>
                <p className="text-white/80 text-sm">Найдите университет своей мечты</p>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <Button
                onClick={handlePremiumClick}
                className="hidden md:flex bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30 hover:text-yellow-200 transition-all duration-300"
                variant="outline"
              >
                <Crown className="h-4 w-4 mr-2" />
                Premium
              </Button>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={handleSearchClick}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Поиск
                </button>
                <button
                  onClick={handleRankingsClick}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Рейтинги
                </button>
                <button
                  onClick={handleTipsClick}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Советы
                </button>
                <button
                  onClick={handleAIClick}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  Спросить
                </button>
                <button
                  onClick={handleCommunityClick}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Сообщество
                </button>
              </nav>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-6 pb-4 border-t border-white/20 pt-4">
              <div className="space-y-3">
                <button
                  onClick={handlePremiumClick}
                  className="w-full text-left text-yellow-300 hover:text-yellow-200 transition-colors flex items-center gap-3 py-2 font-medium"
                >
                  <Crown className="h-5 w-5" />
                  Premium
                </button>
                <button
                  onClick={handleSearchClick}
                  className="w-full text-left text-white/80 hover:text-white transition-colors flex items-center gap-3 py-2"
                >
                  <Globe className="h-5 w-5" />
                  Поиск
                </button>
                <button
                  onClick={handleRankingsClick}
                  className="w-full text-left text-white/80 hover:text-white transition-colors flex items-center gap-3 py-2"
                >
                  <Award className="h-5 w-5" />
                  Рейтинги
                </button>
                <button
                  onClick={handleTipsClick}
                  className="w-full text-left text-white/80 hover:text-white transition-colors flex items-center gap-3 py-2"
                >
                  <BookOpen className="h-5 w-5" />
                  Советы
                </button>
                <button
                  onClick={handleAIClick}
                  className="w-full text-left text-white/80 hover:text-white transition-colors flex items-center gap-3 py-2"
                >
                  <Bot className="h-5 w-5" />
                  Спросить
                </button>
                <button
                  onClick={handleCommunityClick}
                  className="w-full text-left text-white/80 hover:text-white transition-colors flex items-center gap-3 py-2"
                >
                  <Users className="h-5 w-5" />
                  Сообщество
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {showSummerSchools ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => {
                  setShowSummerSchools(false)
                  setShowPremium(true)
                }}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к Premium
              </Button>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Premium активен
              </Badge>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Летние школы
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Престижные летние программы в топовых университетах мира
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {summerSchools.map((school, index) => (
                <Card key={index} className="hover-lift border-2 border-yellow-200 hover:border-yellow-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-600">{school.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{school.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span><strong>Длительность:</strong> {school.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-yellow-500" />
                        <span><strong>Стоимость:</strong> {school.cost}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-500" />
                        <span><strong>Дедлайн:</strong> {school.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : showConsultation ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => {
                  setShowConsultation(false)
                  setShowPremium(true)
                }}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к Premium
              </Button>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Premium активен
              </Badge>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Консультация с профессионалом
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Получите персональную помощь от экспертов по поступлению
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover-lift border-2 border-yellow-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Анна Смирнова</CardTitle>
                  <p className="text-sm text-muted-foreground">Эксперт по поступлению в США</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>15+ лет опыта</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>500+ успешных поступлений</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Специализация: Ivy League</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500">
                    Записаться 
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift border-2 border-yellow-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Джон Уилсон</CardTitle>
                  <p className="text-sm text-muted-foreground">Консультант по UK университетам</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Выпускник Оксфорда</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>300+ поступлений в Russell Group</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Эксперт по UCAS</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500">
                    Записаться
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift border-2 border-yellow-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Мария Гарсия</CardTitle>
                  <p className="text-sm text-muted-foreground">Специалист по стипендиям</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>$50M+ в стипендиях</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Международные программы</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Финансовое планирование</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500">
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

        ) : showEssayAnalysis ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => {
                  setShowEssayAnalysis(false)
                  setShowPremium(true)
                }}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к Premium
              </Button>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Premium активен
              </Badge>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Анализ мотивационного эссе
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Получите профессиональные рекомендации по улучшению вашего эссе
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-yellow-500" />
                  Ваше эссе
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  placeholder="Вставьте текст вашего мотивационного эссе здесь... 

Пример: 'Когда мне было 12 лет, я впервые увидел, как работает 3D-принтер. Этот момент изменил мое понимание того, как технологии могут преобразовывать идеи в реальность...'"
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  className="min-h-[300px] text-base leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Слов:{" "}
                    {
                      essayText
                        .trim()
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }
                  </div>
                  <Button
                    onClick={analyzeEssay}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Анализировать эссе
                  </Button>
                </div>
                {essayAnalysis && (
                  <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-4">
                      <Star className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-yellow-700 mb-3 text-lg">Анализ вашего эссе:</p>
                        <p className="text-gray-700 leading-relaxed">{essayAnalysis}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : showExtracurricular ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => {
                  setShowExtracurricular(false)
                  setShowPremium(true)
                }}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к Premium
              </Button>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                <Crown className="h-4 w-4 mr-2" />
                Premium активен
              </Badge>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Внеучебная деятельность
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Найдите международные соревнования и олимпиады для укрепления вашей заявки
              </p>
            </div>

            <Card className="max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Выберите область интересов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {extracurricularActivities.map((category) => (
                    <Button
                      key={category.category}
                      variant={selectedCategory === category.category ? "default" : "outline"}
                      className={`h-auto p-4 text-left justify-start hover-lift ${
                        selectedCategory === category.category
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                          : "hover:border-yellow-300"
                      }`}
                      onClick={() => setSelectedCategory(category.category)}
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.category)}
                        <span className="text-sm font-medium">{category.category}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedCategory && (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    <h3 className="text-xl font-semibold text-yellow-600 flex items-center gap-2">
                      {getCategoryIcon(selectedCategory)}
                      {selectedCategory}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {extracurricularActivities
                        .find((cat) => cat.category === selectedCategory)
                        ?.competitions.map((competition, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow"
                          >
                            <h4 className="font-semibold text-yellow-700 mb-2">{competition.name}</h4>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{competition.description}</p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-orange-500" />
                              <p className="text-xs text-orange-600 font-medium">{competition.deadline}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {!selectedCategory && (
                  <div className="text-center text-muted-foreground py-12">
                    <Trophy className="h-16 w-16 mx-auto mb-6 text-yellow-500" />
                    <p className="text-lg mb-2">Выберите область интересов выше</p>
                    <p className="text-sm">Получите список международных соревнований для участия</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : showPremium ? (
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={handleBackToMain}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                На главную
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium">
                <Crown className="h-4 w-4" />
                Premium возможности
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                UniWise Premium
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Получите доступ к эксклюзивным инструментам для успешного поступления
              </p>
            </div>

            {!isPremium ? (
              <Card className="max-w-2xl mx-auto border-2 border-yellow-300 shadow-xl">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Активировать Premium</CardTitle>
                  <p className="text-muted-foreground">
                    Получите доступ к эксклюзивным инструментам для поступления
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Анализ мотивационных эссе</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>База международных соревнований</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Информация о летних школах</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Консультации с профессионалами</span>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-yellow-600">$9.99/месяц</div>
                    <Button
                      onClick={() => setIsPremium(true)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
                      size="lg"
                    >
                      Активировать Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 text-lg">
                    <Crown className="h-5 w-5 mr-2" />
                    Premium активен
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <Card
                    className="hover-lift cursor-pointer border-2 border-yellow-200 hover:border-yellow-300 transition-all"
                    onClick={handleEssayAnalysisClick}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">Анализ эссе</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">
                        Получите детальный анализ вашего мотивационного письма с рекомендациями по улучшению
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Анализ структуры и содержания</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Проверка количества слов</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Персональные рекомендации</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        Начать анализ
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover-lift cursor-pointer border-2 border-yellow-200 hover:border-yellow-300 transition-all"
                    onClick={handleExtracurricularClick}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">Внеучебная деятельность</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">
                        Найдите международные соревнования и олимпиады для укрепления вашей заявки
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span> 6 категорий соревнований</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Все направления </span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Дедлайны и описания</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        Найти соревнования
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover-lift cursor-pointer border-2 border-yellow-200 hover:border-yellow-300 transition-all"
                    onClick={handleSummerSchoolsClick}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">Летние школы</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">
                        Найдите престижные летние программы в топовых университетах мира
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Harvard, MIT, Stanford</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Стоимость и дедлайны</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Академические программы</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        Найти программы
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover-lift cursor-pointer border-2 border-yellow-200 hover:border-yellow-300 transition-all"
                    onClick={handleConsultationClick}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                        <MessageCircle className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">Консультация с профессионалом</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-muted-foreground">
                        Получите персональную помощь от экспертов по поступлению
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Эксперты с 15+ лет опыта</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>США, UK, Канада</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Персональный подход</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        ) : (
          showTips ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Советы для поступления в топ-100 вузов мира
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Практические рекомендации от экспертов для успешного поступления в лучшие университеты мира
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-accent" />
                    Академическая подготовка
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Поддерживайте высокий GPA</p>
                      <p className="text-sm text-muted-foreground">Для топ-университетов нужен GPA 3.7+ (из 4.0)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Изучайте сложные предметы</p>
                      <p className="text-sm text-muted-foreground">
                        AP, IB или A-levels показывают вашу готовность к вызовам
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Готовьтесь к тестам заранее</p>
                      <p className="text-sm text-muted-foreground">SAT 1500+, ACT 33+, IELTS 7.5+, TOEFL 110+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-accent" />
                    Документы и эссе
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Уникальное личное эссе</p>
                      <p className="text-sm text-muted-foreground">Расскажите свою историю, избегайте клише</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Сильные рекомендательные письма</p>
                      <p className="text-sm text-muted-foreground">От учителей, которые знают вас лично</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Портфолио достижений</p>
                      <p className="text-sm text-muted-foreground">Научные работы, проекты, публикации</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Внеучебная деятельность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Лидерские позиции</p>
                      <p className="text-sm text-muted-foreground">
                        Президент клуба, капитан команды, организатор мероприятий
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Волонтерство и социальные проекты</p>
                      <p className="text-sm text-muted-foreground">Покажите свою заботу о сообществе</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Олимпиады и конкурсы</p>
                      <p className="text-sm text-muted-foreground">Международные и национальные достижения</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-accent" />
                    Планирование времени
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Начинайте за 2-3 года</p>
                      <p className="text-sm text-muted-foreground">Подготовка к поступлению - долгосрочный процесс</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Изучите дедлайны</p>
                      <p className="text-sm text-muted-foreground">Early Decision, Regular Decision - разные сроки</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Подавайте в 8-12 университетов</p>
                      <p className="text-sm text-muted-foreground">Reach, match и safety школы для баланса</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button onClick={() => setShowTips(false)} size="lg" className="hover-lift">
                <Globe className="h-5 w-5 mr-2" />
                Вернуться к поиску
              </Button>
            </div>
          </div>
        ) : showAI ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ИИ-консультант по поступлению
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Выберите вопрос, который вас интересует</p>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-accent" />
                  Часто задаваемые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Какой IELTS нужен для топ-университетов?",
                    "Какой средний GPA нужен для поступления?",
                    "Сколько стоит обучение в разных странах?",
                    "Когда подавать документы?",
                    "Какие внеучебные активности важны?",
                    "Как написать сильное мотивационное эссе?",
                    "Нужны ли рекомендательные письма?",
                    "Какие тесты SAT/ACT нужны для США?",
                  ].map((question) => (
                    <Button
                      key={question}
                      variant={selectedQuestion === question ? "default" : "outline"}
                      className="h-auto p-4 text-left justify-start hover-lift"
                      onClick={() => handleQuestionSelect(question)}
                    >
                      <div className="text-sm leading-relaxed">{question}</div>
                    </Button>
                  ))}
                </div>
                {selectedQuestion && (
                  <div className="mt-8 p-6 bg-muted/20 rounded-lg border">
                    <div className="flex items-start gap-3 mb-4">
                      <Bot className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-accent mb-2">{selectedQuestion}</p>
                        {aiResponse ? (
                          <p className="text-sm leading-relaxed">{aiResponse}</p>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full"></div>
                            <span className="text-sm">Генерирую ответ...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {!selectedQuestion && (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-accent" />
                    <p>Выберите интересующий вас вопрос выше</p>
                    <p className="text-sm mt-2">Получите экспертные советы по поступлению в лучшие университеты мира</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="text-center">
              <Button onClick={() => setShowAI(false)} size="lg" variant="outline" className="hover-lift">
                <Globe className="h-5 w-5 mr-2" />
                Вернуться к поиску
              </Button>
            </div>
          </div>
        ) : !showResults ? (
          <div className="space-y-12">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Топ-100 университетов мира
              </div>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Найдите университет своей мечты
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Более 100 лучших университетов мира ждут вас. Используйте наши умные фильтры для поиска идеального места
                для обучения, которое соответствует вашим целям и возможностям.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">100+</div>
                  <div className="text-muted-foreground">Университетов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <div className="text-muted-foreground">Стран</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">1000+</div>
                  <div className="text-muted-foreground">Программ</div>
                </div>
              </div>
            </div>
            <div ref={searchFormRef}>
              <UniversitySearchForm onSearch={handleSearch} />
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={handleRankingsClick} className="hover-lift bg-transparent">
                <Award className="h-5 w-5 mr-2" />
                Показать топ-100 университетов
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">Результаты поиска</h2>
                <p className="text-muted-foreground text-lg">
                  Найдено <span className="font-semibold text-accent">{searchResults.length}</span> университетов
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranking">По рейтингу</SelectItem>
                    <SelectItem value="tuition">По стоимости</SelectItem>
                    <SelectItem value="acceptance">По проценту приема</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setShowResults(false)} className="hover-lift">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Изменить фильтры
                </Button>
              </div>
            </div>
            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-6xl">🎓</div>
                  <h3 className="text-2xl font-bold">Университеты не найдены</h3>
                  <p className="text-muted-foreground">
                    По вашим критериям университеты не найдены. Попробуйте изменить фильтры поиска или расширить
                    критерии.
                  </p>
                  <Button onClick={() => setShowResults(false)} className="mt-6">
                    Изменить критерии
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {searchResults.map((university) => (
                  <UniversityCard key={university.id} university={university} onViewDetails={handleViewDetails} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="gradient-bg text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">UniWise</span>
            </div>
            <p className="text-white/80">&copy; 2024 UniWise. Найдите свой путь к образованию мечты.</p>
            <div className="flex justify-center gap-6 text-sm text-white/60">
              <button
                onClick={() => alert("Информация о UniWise скоро будет доступна!")}
                className="hover:text-white transition-colors"
              >
                О нас
              </button>
              <button
                onClick={() => alert("Свяжитесь с нами: info@uniwise.com")}
                className="hover:text-white transition-colors"
              >
                Контакты
              </button>
              <button
                onClick={() => alert("Политика конфиденциальности скоро будет доступна!")}
                className="hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
\
