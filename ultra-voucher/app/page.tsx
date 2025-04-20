"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ArrowLeft,
  Heart,
  ChevronLeft,
  X,
  ShoppingCart,
  Copy,
  Check,
  ExternalLink,
  Home,
  User,
  Gift,
  Newspaper,
  ChevronRight,
  Star,
  Calendar,
  Award,
  Lock,
  Trophy,
  Users,
  Zap,
  Target,
  Clock,
  Sparkles,
  BarChart,
} from "lucide-react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function UltraVoucher() {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"brand" | "voucher">("brand")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [showLoginInfo, setShowLoginInfo] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all")
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [activeBottomTab, setActiveBottomTab] = useState<"home" | "ultralife" | "article" | "myvoucher" | "account">(
    "home",
  )
  const [showPet, setShowPet] = useState(false)
  const [petActivePeriod, setPetActivePeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const [questActivePeriod, setQuestActivePeriod] = useState<"daily" | "weekly" | "event">("daily")
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
  const [petHappiness, setPetHappiness] = useState(80)
  const [petEnergy, setPetEnergy] = useState(65)
  const [petExp, setPetExp] = useState(75)
  const [ultraLifeActiveTab, setUltraLifeActiveTab] = useState<"pet" | "quest">("pet")
  const [petActiveTab, setPetActiveTab] = useState<"home" | "shop" | "missions" | "collection">("home")
  const [questActiveTab, setQuestActiveTab] = useState<"missions" | "rewards" | "leaderboard" | "achievements">(
    "missions",
  )

  const promoScrollRef = useRef<HTMLDivElement>(null)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")

  // Pet data
  const petData = {
    streakDays: 224,
    petName: "Royalty One Z",
    petLevel: 5,
    petExp: 1250,
    nextLevelExp: 2000,
    coins: 1850,
    gems: 45,
    tasks: [
      {
        id: 1,
        description: "Check in daily",
        completed: hasCheckedInToday,
        reward: "10 coins",
        icon: <Calendar size={16} />,
      },
      { id: 2, description: "Browse 5 vouchers", completed: false, reward: "15 coins", icon: <Gift size={16} /> },
      { id: 3, description: "Share with a friend", completed: false, reward: "20 coins", icon: <User size={16} /> },
      {
        id: 4,
        description: "Complete a purchase",
        completed: false,
        reward: "50 coins + 5 gems",
        icon: <ShoppingCart size={16} />,
      },
    ],
    dailyMissions: [
      {
        id: 1,
        description: "Daily check-in",
        completed: hasCheckedInToday,
        reward: "10 coins",
        icon: <Calendar size={16} />,
      },
      { id: 2, description: "Feed your pet", completed: false, reward: "+10 energy", icon: <Gift size={16} /> },
      { id: 3, description: "Play with your pet", completed: false, reward: "+10 happiness", icon: <Star size={16} /> },
    ],
    weeklyMissions: [
      {
        id: 1,
        description: "Check in 5 days in a row",
        completed: false,
        reward: "50 coins",
        icon: <Calendar size={16} />,
      },
      { id: 2, description: "Browse 20 vouchers", completed: false, reward: "30 coins", icon: <Gift size={16} /> },
      {
        id: 3,
        description: "Make a purchase",
        completed: false,
        reward: "100 coins",
        icon: <ShoppingCart size={16} />,
      },
    ],
    monthlyMissions: [
      {
        id: 1,
        description: "Check in 20 days in a month",
        completed: false,
        reward: "200 coins",
        icon: <Calendar size={16} />,
      },
      {
        id: 2,
        description: "Reach level 10 with your pet",
        completed: false,
        reward: "5 gems",
        icon: <Award size={16} />,
      },
      {
        id: 3,
        description: "Make 3 purchases",
        completed: false,
        reward: "500 coins",
        icon: <ShoppingCart size={16} />,
      },
    ],
    shopItems: [
      {
        id: 1,
        name: "Basic Pet Food",
        description: "+20 Energy",
        price: 50,
        type: "food",
        image: "/images/pet-food.png",
      },
      {
        id: 2,
        name: "Premium Pet Food",
        description: "+50 Energy",
        price: 120,
        type: "food",
        image: "/images/pet-food.png",
      },
      {
        id: 3,
        name: "Luxury Pet Food",
        description: "+100 Energy, +10 Happiness",
        price: 200,
        type: "food",
        image: "/images/pet-food.png",
      },
      {
        id: 4,
        name: "Pet Toy",
        description: "+30 Happiness",
        price: 80,
        type: "accessory",
        image: "/images/pet-accessory.png",
      },
      {
        id: 5,
        name: "Pet Bed",
        description: "+20 Energy daily",
        price: 300,
        type: "accessory",
        image: "/images/pet-accessory.png",
      },
      {
        id: 6,
        name: "Evolution Stone",
        description: "Evolve your pet to next form",
        price: 10,
        type: "special",
        currency: "gem",
        image: "/images/pet-evolution.png",
      },
    ],
    petEvolutions: [
      { level: 1, name: "Baby Chick", description: "A newly hatched pet" },
      { level: 5, name: "Royalty One Z", description: "Growing and energetic" },
      { level: 10, name: "Golden Phoenix", description: "Majestic and powerful" },
      { level: 20, name: "Celestial Guardian", description: "Legendary and wise" },
    ],
    collection: [
      { id: 1, name: "Baby Chick", acquired: true, image: "/images/ultra-pet.png" },
      { id: 2, name: "Royalty One Z", acquired: true, image: "/images/ultra-pet.png" },
      { id: 3, name: "Golden Phoenix", acquired: false, image: "/placeholder.svg?height=100&width=100" },
      { id: 4, name: "Celestial Guardian", acquired: false, image: "/placeholder.svg?height=100&width=100" },
      { id: 5, name: "Winter Outfit", acquired: true, image: "/images/pet-accessory.png" },
      { id: 6, name: "Summer Outfit", acquired: false, image: "/placeholder.svg?height=100&width=100" },
    ],
  }

  // Quest data
  const questData = {
    ultraMiles: 3250,
    level: 7,
    nextLevelPoints: 500,
    currentLevelPoints: 350,
    dailyQuests: [
      {
        id: 1,
        description: "Browse 5 vouchers today",
        progress: 3,
        total: 5,
        reward: "50 UltraMiles",
        completed: false,
        icon: <Gift size={16} />,
      },
      {
        id: 2,
        description: "Checkout a gaming voucher today",
        progress: 0,
        total: 1,
        reward: "100 UltraMiles",
        completed: false,
        icon: <ShoppingCart size={16} />,
      },
      {
        id: 3,
        description: "Share a voucher with a friend",
        progress: 0,
        total: 1,
        reward: "75 UltraMiles",
        completed: false,
        icon: <Users size={16} />,
      },
    ],
    weeklyQuests: [
      {
        id: 1,
        description: "Buy 2 F&B vouchers this week",
        progress: 1,
        total: 2,
        reward: "200 UltraMiles",
        completed: false,
        icon: <ShoppingCart size={16} />,
      },
      {
        id: 2,
        description: "Refer 1 new friend",
        progress: 0,
        total: 1,
        reward: "300 UltraMiles + 10% discount voucher",
        completed: false,
        icon: <Users size={16} />,
      },
      {
        id: 3,
        description: "Complete 5 daily quests",
        progress: 2,
        total: 5,
        reward: "250 UltraMiles",
        completed: false,
        icon: <Calendar size={16} />,
      },
    ],
    eventQuests: [
      {
        id: 1,
        description: "Ramadan Special: Buy 3 vouchers for iftar",
        progress: 1,
        total: 3,
        reward: "500 UltraMiles + Exclusive Badge",
        completed: false,
        icon: <Star size={16} />,
        expiresIn: "5 days",
      },
      {
        id: 2,
        description: "Weekend Flash: Purchase any voucher in the next 48 hours",
        progress: 0,
        total: 1,
        reward: "150 UltraMiles + 15% cashback",
        completed: false,
        icon: <Zap size={16} />,
        expiresIn: "1 day",
      },
    ],
    rewards: [
      {
        id: 1,
        name: "10% Discount on Any Voucher",
        cost: 1000,
        image: "/placeholder.svg?height=100&width=100",
        type: "discount",
      },
      {
        id: 2,
        name: "Free Shipping Voucher",
        cost: 500,
        image: "/placeholder.svg?height=100&width=100",
        type: "shipping",
      },
      {
        id: 3,
        name: "Exclusive Ultra Badge",
        cost: 2000,
        image: "/placeholder.svg?height=100&width=100",
        type: "badge",
      },
      {
        id: 4,
        name: "Premium Pet Food",
        cost: 1500,
        image: "/images/pet-food.png",
        type: "pet",
      },
    ],
    leaderboard: [
      { rank: 1, name: "UltraChampion", points: 12500, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 2, name: "VoucherKing", points: 10200, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 3, name: "PointMaster", points: 9800, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 4, name: "QuestHunter", points: 8500, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 5, name: "DealSeeker", points: 7200, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 6, name: "VoucherQueen", points: 6800, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 7, name: "UltraUser", points: 5500, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 8, name: "MissionPro", points: 4900, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 9, name: "PointCollector", points: 4200, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 10, name: "VoucherNinja", points: 3800, avatar: "/placeholder.svg?height=50&width=50" },
      { rank: 42, name: "You", points: 3250, avatar: "/placeholder.svg?height=50&width=50", isUser: true },
    ],
    achievements: [
      {
        id: 1,
        name: "First Purchase",
        description: "Complete your first purchase on Ultra Voucher",
        progress: 1,
        total: 1,
        completed: true,
        image: "/placeholder.svg?height=80&width=80",
        reward: "100 UltraMiles",
      },
      {
        id: 2,
        name: "Loyal Customer",
        description: "Make 10 purchases on Ultra Voucher",
        progress: 7,
        total: 10,
        completed: false,
        image: "/placeholder.svg?height=80&width=80",
        reward: "500 UltraMiles",
      },
      {
        id: 3,
        name: "Social Butterfly",
        description: "Refer 5 friends to Ultra Voucher",
        progress: 2,
        total: 5,
        completed: false,
        image: "/placeholder.svg?height=80&width=80",
        reward: "750 UltraMiles",
      },
      {
        id: 4,
        name: "Quest Master",
        description: "Complete 50 daily quests",
        progress: 23,
        total: 50,
        completed: false,
        image: "/placeholder.svg?height=80&width=80",
        reward: "1000 UltraMiles + Exclusive Badge",
      },
      {
        id: 5,
        name: "Category Explorer",
        description: "Purchase vouchers from 8 different categories",
        progress: 4,
        total: 8,
        completed: false,
        image: "/placeholder.svg?height=80&width=80",
        reward: "800 UltraMiles",
      },
    ],
  }

  // Promotional banners
  const promotions = [
    {
      id: "promo1",
      title: "SHOP & FLY",
      subtitle: "Belanja MAP Gift Voucher, Dapat GarudaMiles!",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-cyan-500",
      textColor: "text-white",
      buttonColor: "bg-white text-cyan-600",
      buttonText: "Belanja Sekarang",
    },
    {
      id: "promo2",
      title: "DISKON 24%",
      subtitle: "Voucher Nanny's Pavillon",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-green-500",
      textColor: "text-white",
      buttonColor: "bg-white text-green-600",
      buttonText: "Lihat Voucher",
      voucherId: "nannys50",
    },
    {
      id: "promo3",
      title: "BEAUTY DEALS",
      subtitle: "Diskon hingga 20% untuk Sephora",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-purple-500",
      textColor: "text-white",
      buttonColor: "bg-white text-purple-600",
      buttonText: "Lihat Voucher",
      brandId: "sephora",
    },
  ]

  // Categories
  const categories = [
    { id: "all", name: "Lihat Semua" },
    { id: "fnb", name: "F&B" },
    { id: "activity", name: "Activity" },
    { id: "apps", name: "Apps" },
    { id: "beauty", name: "Beauty" },
    { id: "experience", name: "Experience" },
    { id: "game", name: "Game" },
    { id: "health", name: "Health" },
  ]

  // Articles data
  const articles = [
    {
      id: "article1",
      title: "5 Rekomendasi Restoran untuk Buka Puasa",
      image: "/placeholder.svg?height=200&width=400",
      date: "2 hari yang lalu",
      category: "Food",
    },
    {
      id: "article2",
      title: "Promo Spesial Ramadhan di Ultra Voucher",
      image: "/placeholder.svg?height=200&width=400",
      date: "5 hari yang lalu",
      category: "Promo",
    },
    {
      id: "article3",
      title: "Tips Hemat Belanja Kebutuhan Lebaran",
      image: "/placeholder.svg?height=200&width=400",
      date: "1 minggu yang lalu",
      category: "Tips",
    },
  ]

  // Brand data
  const brands = [
    {
      id: "starbucks",
      name: "Starbucks",
      image: "/placeholder.svg?height=300&width=300",
      category: "F&B",
      discount: "Up to 15%",
    },
    {
      id: "sephora",
      name: "Sephora",
      image: "/placeholder.svg?height=300&width=300",
      category: "Beauty",
      discount: "Up to 20%",
    },
    {
      id: "nike",
      name: "Nike",
      image: "/placeholder.svg?height=300&width=300",
      category: "Retail",
      discount: "Up to 10%",
    },
    {
      id: "cgv",
      name: "CGV",
      image: "/placeholder.svg?height=300&width=300",
      category: "Entertainment",
      discount: "Up to 25%",
    },
    {
      id: "nannys",
      name: "Nanny's Pavillon",
      image: "/placeholder.svg?height=300&width=300",
      category: "F&B",
      discount: "Up to 24%",
      featured: true,
    },
  ]

  // Voucher data
  const vouchers = [
    {
      id: "nannys50",
      brandId: "nannys",
      brand: "Nanny's Pavillon",
      name: "Nanny's Pavillon Rp. 50.000",
      image: "/placeholder.svg?height=300&width=300",
      price: "Rp 38.000",
      originalPrice: "Rp 50.000",
      type: "V. Digital",
      discount: "24%",
      sold: 1338,
      category: "F&B",
      description:
        "Didirikan sejak 23 Maret 2009, Nanny's Pavillon pertama kali membuka outletnya di Bandung, Indonesia. Nanny's Pavillon merupakan restoran panekuk berkonsep French American. Tradisi dari French American family yang menyajikan menu-menu homemade dengan cita rasa yang khas.",
      code: "NANNYS50K24",
      validity: "Berlaku hingga 31 Desember 2025",
      locations: ["Grand Indonesia", "Plaza Indonesia", "Kota Kasablanka", "Pondok Indah Mall", "Central Park"],
      howToUse: [
        "Tunjukkan voucher pada kasir",
        "Voucher dapat digunakan untuk semua menu",
        "Tidak dapat digabungkan dengan promo lain",
        "Tidak dapat diuangkan",
      ],
    },
    {
      id: "nannys100",
      brandId: "nannys",
      brand: "Nanny's Pavillon",
      name: "Nanny's Pavillon Rp. 100.000",
      image: "/placeholder.svg?height=300&width=300",
      price: "Rp 76.000",
      originalPrice: "Rp 100.000",
      type: "V. Digital",
      discount: "24%",
      sold: 3103,
      category: "F&B",
      code: "NANNYS100K24",
      validity: "Berlaku hingga 31 Desember 2025",
    },
    {
      id: "nannys250",
      brandId: "nannys",
      brand: "Nanny's Pavillon",
      name: "Nanny's Pavillon Rp. 250.000",
      image: "/placeholder.svg?height=300&width=300",
      price: "Rp 190.000",
      originalPrice: "Rp 250.000",
      type: "V. Digital",
      discount: "24%",
      sold: 3253,
      category: "F&B",
      outOfStock: true,
      code: "NANNYS250K24",
      validity: "Berlaku hingga 31 Desember 2025",
    },
    {
      id: "starbucks50",
      brandId: "starbucks",
      brand: "Starbucks",
      name: "Starbucks Rp. 50.000",
      image: "/placeholder.svg?height=300&width=300",
      price: "Rp 42.500",
      originalPrice: "Rp 50.000",
      type: "V. Digital",
      discount: "15%",
      sold: 5432,
      category: "F&B",
      code: "SBUX50K15",
      validity: "Berlaku hingga 31 Desember 2025",
    },
    {
      id: "sephora100",
      brandId: "sephora",
      brand: "Sephora",
      name: "Sephora Rp. 100.000",
      image: "/placeholder.svg?height=300&width=300",
      price: "Rp 80.000",
      originalPrice: "Rp 100.000",
      type: "V. Digital",
      discount: "20%",
      sold: 2789,
      category: "Beauty",
      code: "SEPHORA100K20",
      validity: "Berlaku hingga 31 Desember 2025",
    },
  ]

  // Handle promo navigation
  const scrollToPromo = (index) => {
    setCurrentPromoIndex(index)
    if (promoScrollRef.current) {
      const scrollAmount = index * promoScrollRef.current.offsetWidth
      promoScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Auto scroll promos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentPromoIndex + 1) % promotions.length
      scrollToPromo(nextIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentPromoIndex])

  // Handle promo scroll
  const handlePromoScroll = () => {
    if (promoScrollRef.current) {
      const scrollPosition = promoScrollRef.current.scrollLeft
      const itemWidth = promoScrollRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / itemWidth)
      if (newIndex !== currentPromoIndex) {
        setCurrentPromoIndex(newIndex)
      }
    }
  }

  // Get the selected voucher details
  const selectedVoucherDetails = vouchers.find((v) => v.id === selectedVoucher)

  // Get the selected brand details
  const selectedBrandDetails = brands.find((b) => b.id === selectedBrand)

  // Get vouchers for selected brand
  const brandVouchers = selectedBrand ? vouchers.filter((v) => v.brandId === selectedBrand) : []

  // Get filtered brands based on selected category
  const filteredBrands =
    selectedCategory === "all"
      ? brands
      : brands.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase())

  // Copy voucher code to clipboard
  const copyVoucherCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Add to cart function
  const addToCart = (voucher) => {
    const itemToAdd = {
      ...voucher,
      cartPrice: voucher.price.replace("Rp ", ""),
      cartOriginalPrice: voucher.originalPrice.replace("Rp ", ""),
      quantity: 1,
    }

    setCartItems((prev) => [...prev, itemToAdd])

    // Show confirmation
    alert(`${voucher.name} telah ditambahkan ke keranjang!`)
  }

  // Handle promo click
  const handlePromoClick = (promo) => {
    if (promo.voucherId) {
      setSelectedVoucher(promo.voucherId)
    } else if (promo.brandId) {
      setSelectedBrand(promo.brandId)
    }
  }

  // Toggle pet modal
  const togglePet = () => {
    setShowPet(!showPet)
  }

  // Daily check-in
  const handleDailyCheckIn = () => {
    if (!hasCheckedInToday) {
      setHasCheckedInToday(true)
      // Update pet data
      setPetHappiness(Math.min(petHappiness + 5, 100))

      // Show confirmation
      alert("Check-in successful! You've earned 10 coins and +5 happiness for your pet.")
    }
  }

  // Feed pet
  const feedPet = (energyAmount) => {
    setPetEnergy(Math.min(petEnergy + energyAmount, 100))
    alert(`Your pet has been fed! Energy +${energyAmount}`)
  }

  // Play with pet
  const playWithPet = (happinessAmount) => {
    setPetHappiness(Math.min(petHappiness + happinessAmount, 100))
    setPetEnergy(Math.max(petEnergy - 5, 0))
    alert(`You played with your pet! Happiness +${happinessAmount}, Energy -5`)
  }

  // Buy shop item
  const buyShopItem = (item) => {
    alert(`You purchased ${item.name}!`)

    if (item.type === "food") {
      feedPet(Number.parseInt(item.description.match(/\d+/)[0]))
    } else if (item.name === "Pet Toy") {
      playWithPet(30)
    }
  }

  // Complete quest
  const completeQuest = (quest) => {
    alert(`Quest completed! You've earned ${quest.reward}`)
  }

  // Redeem reward
  const redeemReward = (reward) => {
    alert(`You've redeemed ${reward.name} for ${reward.cost} UltraMiles!`)
  }

  // Render app download banner
  const renderAppDownloadBanner = () => (
    <div className="bg-green-600 text-white p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-green-600 font-bold">U</span>
        </div>
        <div className="text-sm">
          <div>Dapatkan diskon voucher hingga 85%</div>
          <div>Download aplikasi Ultra Voucher</div>
        </div>
      </div>
      <button className="bg-white text-green-600 px-4 py-1 rounded-full text-sm font-medium">BUKA</button>
    </div>
  )

  // Render login info banner
  const renderLoginInfoBanner = () =>
    showLoginInfo && (
      <div className="bg-blue-50 text-blue-800 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm">
            <div>Anda dapat melihat semua voucher tanpa perlu login terlebih dahulu</div>
          </div>
        </div>
        <button className="text-blue-800" onClick={() => setShowLoginInfo(false)}>
          <X size={18} />
        </button>
      </div>
    )

  // Render search bar
  const renderSearchBar = () => (
    <div className="p-4 flex items-center gap-3 border-b">
      {(selectedVoucher || selectedBrand) && (
        <button
          onClick={() => {
            setSelectedVoucher(null)
            setSelectedBrand(null)
          }}
          className="text-gray-500"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari di Ultra Voucher"
          className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg text-sm"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="relative">
        <ShoppingCart size={20} className="text-gray-500" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  )

  // Render horizontal promotions
  const renderHorizontalPromotions = () => (
    <div className="relative">
      <div
        ref={promoScrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        onScroll={handlePromoScroll}
      >
        {promotions.map((promo, index) => (
          <div key={promo.id} className={`min-w-full flex-shrink-0 snap-center ${promo.color} relative`}>
            <div className="flex p-4">
              <div className="flex-1 flex flex-col justify-center">
                <h2 className={`text-xl font-bold ${promo.textColor}`}>{promo.title}</h2>
                <p className={`text-sm mb-3 ${promo.textColor}`}>{promo.subtitle}</p>
                <button
                  className={`${promo.buttonColor} px-4 py-1.5 rounded-full text-sm font-medium w-fit`}
                  onClick={() => handlePromoClick(promo)}
                >
                  {promo.buttonText}
                </button>
              </div>
              <div className="w-1/3 relative h-24">
                <Image
                  src={promo.image || "/placeholder.svg"}
                  alt={promo.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentPromoIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => scrollToPromo(index)}
          />
        ))}
      </div>
    </div>
  )

  // Render categories
  const renderCategories = () => (
    <div className="flex overflow-x-auto py-2 gap-2 px-4 no-scrollbar border-b">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === category.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )

  // Render tabs
  const renderTabs = () => (
    <div className="flex border-b">
      <div
        className={`flex-1 text-center py-3 ${activeTab === "brand" ? "text-green-600 border-b-2 border-green-600 font-medium" : "text-gray-500"}`}
        onClick={() => setActiveTab("brand")}
      >
        Brand
      </div>
      <div
        className={`flex-1 text-center py-3 ${activeTab === "voucher" ? "text-green-600 border-b-2 border-green-600 font-medium" : "text-gray-500"}`}
        onClick={() => setActiveTab("voucher")}
      >
        Voucher
      </div>
    </div>
  )

  // Render brand grid
  const renderBrandGrid = () => (
    <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4 p-4`}>
      {filteredBrands.map((brand) => (
        <div key={brand.id} className="border rounded-lg overflow-hidden relative">
          <div className="absolute top-2 right-2 z-10">
            <Heart className="text-white fill-white/20 stroke-white" size={20} />
          </div>
          <div className="h-40 bg-gray-100 relative">
            <Image src={brand.image || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
            {brand.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                Featured
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-1">{brand.category}</div>
            <h3 className="text-sm font-medium mb-2">{brand.name}</h3>
            <div className="flex justify-between items-end">
              <div className="text-green-600 text-sm font-medium">{brand.discount}</div>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => setSelectedBrand(brand.id)}
              >
                Lihat Voucher
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Render voucher grid
  const renderVoucherGrid = () => {
    const vouchersToShow = selectedBrand ? brandVouchers : vouchers

    return (
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4 p-4`}>
        {vouchersToShow.map((voucher) => (
          <div
            key={voucher.id}
            className="border rounded-lg overflow-hidden relative"
            onClick={() => setSelectedVoucher(voucher.id)}
          >
            <div className="absolute top-2 right-2 z-10">
              <Heart className="text-white fill-white/20 stroke-white" size={20} />
            </div>
            <div className="h-40 bg-gray-100 relative">
              <Image src={voucher.image || "/placeholder.svg"} alt={voucher.name} fill className="object-cover" />
              {voucher.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Diskon {voucher.discount}
                </div>
              )}
              {voucher.outOfStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white text-red-500 px-3 py-1 rounded-full font-medium">Habis</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="text-xs text-green-600 font-medium mb-1">{voucher.type}</div>
              <h3 className="text-sm font-medium mb-2 line-clamp-2">{voucher.name}</h3>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-bold">{voucher.price}</span>
                  <span className="text-gray-400 text-sm line-through">{voucher.originalPrice}</span>
                </div>
                <div>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!voucher.outOfStock) {
                        setSelectedVoucher(voucher.id)
                      }
                    }}
                    disabled={voucher.outOfStock}
                  >
                    Lihat
                  </button>
                </div>
              </div>
              {voucher.sold && <div className="text-xs text-gray-500 mt-2">{voucher.sold} terjual</div>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Render articles
  const renderArticles = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">Artikel Terbaru</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 relative">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex-1">
                <div className="flex flex-col">
                  <div className="text-xs text-green-600 font-medium">{article.category}</div>
                  <h3 className="text-sm font-medium line-clamp-2">{article.title}</h3>
                  <div className="text-xs text-gray-500 mt-1">{article.date}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render my vouchers
  const renderMyVouchers = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-3">Voucher Saya</h2>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((voucher, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 relative">
                  <Image src={voucher.image || "/placeholder.svg"} alt={voucher.name} fill className="object-cover" />
                </div>
                <div className="p-3 flex-1">
                  <div className="flex flex-col">
                    <div className="text-xs text-green-600 font-medium">{voucher.type}</div>
                    <h3 className="text-sm font-medium line-clamp-1">{voucher.name}</h3>
                    <div className="text-xs text-gray-500 mt-1">Berlaku hingga 31 Desember 2025</div>
                  </div>
                </div>
                <div className="p-3 flex items-center">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => setSelectedVoucher(voucher.id)}
                  >
                    Gunakan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">Anda belum memiliki voucher</div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={() => {
              setActiveBottomTab("home")
              setActiveTab("voucher")
            }}
          >
            Jelajahi Voucher
          </button>
        </div>
      )}
    </div>
  )

  // Render account
  const renderAccount = () => (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={32} className="text-gray-500" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Pengguna Ultra</h2>
          <p className="text-gray-500 text-sm">user@example.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Akun Saya</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <span>Profil Saya</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Alamat</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Metode Pembayaran</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Ultra Life</h3>
          </div>
          <div className="p-4 flex justify-between items-center" onClick={() => setActiveBottomTab("ultralife")}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Image src="/images/ultra-pet.png" alt="Ultra Pet" width={32} height={32} className="object-contain" />
              </div>
              <span>Lihat Ultra Life</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-green-600 font-medium">{petData.streakDays} hari</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Pengaturan</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <span>Notifikasi</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Bahasa</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Bantuan</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Tentang Ultra Voucher</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <button className="w-full p-4 text-red-500 font-medium border rounded-lg">Keluar</button>
      </div>
    </div>
  )

  // Render Ultra Life Tab Navigation
  const renderUltraLifeTabNavigation = () => (
    <div className="flex border-t border-b bg-white">
      <button
        className={`flex-1 flex flex-col items-center py-3 ${ultraLifeActiveTab === "pet" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"}`}
        onClick={() => setUltraLifeActiveTab("pet")}
      >
        <div className="w-6 h-6 relative">
          <Image src="/images/ultra-pet.png" alt="Ultra Pet" width={24} height={24} className="object-contain" />
        </div>
        <span className="text-xs mt-1">Ultra Pet</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${ultraLifeActiveTab === "quest" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        onClick={() => setUltraLifeActiveTab("quest")}
      >
        <Trophy size={18} />
        <span className="text-xs mt-1">Ultra Quest</span>
      </button>
    </div>
  )

  // Render Ultra Pet Tab Navigation
  const renderUltraPetTabNavigation = () => (
    <div className="flex border-t border-b bg-white">
      <button
        className={`flex-1 flex flex-col items-center py-3 ${petActiveTab === "home" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"}`}
        onClick={() => setPetActiveTab("home")}
      >
        <Home size={18} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${petActiveTab === "missions" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"}`}
        onClick={() => setPetActiveTab("missions")}
      >
        <Award size={18} />
        <span className="text-xs mt-1">Missions</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${petActiveTab === "shop" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"}`}
        onClick={() => setPetActiveTab("shop")}
      >
        <ShoppingCart size={18} />
        <span className="text-xs mt-1">Shop</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${petActiveTab === "collection" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-500"}`}
        onClick={() => setPetActiveTab("collection")}
      >
        <Star size={18} />
        <span className="text-xs mt-1">Collection</span>
      </button>
    </div>
  )

  // Render Ultra Quest Tab Navigation
  const renderUltraQuestTabNavigation = () => (
    <div className="flex border-t border-b bg-white">
      <button
        className={`flex-1 flex flex-col items-center py-3 ${questActiveTab === "missions" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        onClick={() => setQuestActiveTab("missions")}
      >
        <Target size={18} />
        <span className="text-xs mt-1">Missions</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${questActiveTab === "rewards" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        onClick={() => setQuestActiveTab("rewards")}
      >
        <Gift size={18} />
        <span className="text-xs mt-1">Rewards</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${questActiveTab === "leaderboard" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        onClick={() => setQuestActiveTab("leaderboard")}
      >
        <BarChart size={18} />
        <span className="text-xs mt-1">Leaderboard</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-3 ${questActiveTab === "achievements" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        onClick={() => setQuestActiveTab("achievements")}
      >
        <Award size={18} />
        <span className="text-xs mt-1">Achievements</span>
      </button>
    </div>
  )

  // Render Ultra Pet Home
  const renderUltraPetHome = () => (
    <div className="p-4">
      {/* Pet Header */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="font-bold text-lg">Ultra Pet</h2>
            <div className="text-yellow-700 text-sm">Streak: {petData.streakDays} hari</div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
              <span className="text-yellow-700 text-xs font-medium">{petData.coins}</span>
              <span className="ml-1 text-yellow-500">🪙</span>
            </div>
            <div className="flex items-center bg-purple-100 px-2 py-1 rounded-full">
              <span className="text-purple-700 text-xs font-medium">{petData.gems}</span>
              <span className="ml-1 text-purple-500">💎</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 relative">
            <Image src="/images/ultra-pet.png" alt="Ultra Pet" width={128} height={128} className="object-contain" />
          </div>
        </div>

        <div className="text-center mb-3">
          <div className="font-medium text-lg">{petData.petName}</div>
          <div className="text-sm text-gray-600">Level {petData.petLevel}</div>
        </div>

        {/* Pet Stats */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Happiness</span>
              <span>{petHappiness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${petHappiness}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Energy</span>
              <span>{petEnergy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${petEnergy}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Experience</span>
              <span>
                {petData.petExp}/{petData.nextLevelExp}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(petData.petExp / petData.nextLevelExp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Check-in */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Daily Check-in</h3>
          <span className="text-xs text-gray-500">Day {petData.streakDays}</span>
        </div>

        <div className="flex justify-center mb-3">
          <button
            className={`px-4 py-2 rounded-lg ${hasCheckedInToday ? "bg-gray-200 text-gray-500" : "bg-yellow-500 text-white"}`}
            onClick={handleDailyCheckIn}
            disabled={hasCheckedInToday}
          >
            {hasCheckedInToday ? "Already Checked In" : "Check In Now"}
          </button>
        </div>

        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${day <= petData.streakDays % 7 || (day === 7 && petData.streakDays % 7 === 0) ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {day}
              </div>
              <div className="text-xs text-gray-500">{day === 7 ? "50 🪙" : "10 🪙"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>

        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center p-3 bg-blue-50 rounded-lg" onClick={() => feedPet(10)}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <span className="text-xl">🍖</span>
            </div>
            <span className="text-xs text-blue-700">Feed</span>
          </button>

          <button className="flex flex-col items-center p-3 bg-pink-50 rounded-lg" onClick={() => playWithPet(15)}>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-1">
              <span className="text-xl">🎮</span>
            </div>
            <span className="text-xs text-pink-700">Play</span>
          </button>

          <button
            className="flex flex-col items-center p-3 bg-purple-50 rounded-lg"
            onClick={() => setPetActiveTab("shop")}
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1">
              <span className="text-xl">🛍️</span>
            </div>
            <span className="text-xs text-purple-700">Shop</span>
          </button>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <h3 className="font-medium mb-3">Daily Tasks</h3>

        <div className="space-y-3">
          {petData.dailyMissions.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${task.completed ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}
                >
                  {task.icon}
                </div>
                <span className={task.completed ? "line-through text-gray-400" : ""}>{task.description}</span>
              </div>
              <div className="text-xs font-medium text-yellow-700">{task.reward}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Progress */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Evolution Progress</h3>
          <span className="text-xs text-purple-600">Level {petData.petLevel}/20</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Image src="/images/ultra-pet.png" alt="Ultra Pet" width={32} height={32} className="object-contain" />
          </div>
          <div className="flex-1 h-1 bg-gray-200 relative">
            <div className="absolute h-1 bg-purple-500" style={{ width: `${(petData.petLevel / 20) * 100}%` }}></div>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          {petData.petLevel < 10
            ? `${10 - petData.petLevel} more levels until next evolution!`
            : `${20 - petData.petLevel} more levels until final form!`}
        </div>
      </div>
    </div>
  )

  // Render Ultra Pet Shop
  const renderUltraPetShop = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Pet Shop</h2>
        <div className="flex gap-2">
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
            <span className="text-yellow-700 text-xs font-medium">{petData.coins}</span>
            <span className="ml-1 text-yellow-500">🪙</span>
          </div>
          <div className="flex items-center bg-purple-100 px-2 py-1 rounded-full">
            <span className="text-purple-700 text-xs font-medium">{petData.gems}</span>
            <span className="ml-1 text-purple-500">��</span>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto py-2 gap-2 mb-4 no-scrollbar">
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            !selectedCategory || selectedCategory === "all" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All Items
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === "food" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("food")}
        >
          Food
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === "accessory" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("accessory")}
        >
          Accessories
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === "special" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectedCategory("special")}
        >
          Special
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {petData.shopItems
          .filter((item) => !selectedCategory || selectedCategory === "all" || item.type === selectedCategory)
          .map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
              <div className="h-24 bg-gray-50 relative flex items-center justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{item.price}</span>
                    <span className="ml-1">{item.currency === "gem" ? "💎" : "🪙"}</span>
                  </div>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => buyShopItem(item)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  // Render Ultra Pet Missions
  const renderUltraPetMissions = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Missions</h2>

      <div className="flex overflow-x-auto py-2 gap-2 mb-4 no-scrollbar">
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            petActivePeriod === "daily" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPetActivePeriod("daily")}
        >
          Daily
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            petActivePeriod === "weekly" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPetActivePeriod("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            petActivePeriod === "monthly" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setPetActivePeriod("monthly")}
        >
          Monthly
        </button>
      </div>

      <div className="space-y-3">
        {(petActivePeriod === "daily"
          ? petData.dailyMissions
          : petActivePeriod === "weekly"
            ? petData.weeklyMissions
            : petData.monthlyMissions
        ).map((mission) => (
          <div key={mission.id} className="bg-white border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${mission.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
                >
                  {mission.icon}
                </div>
                <div>
                  <div className={`font-medium ${mission.completed ? "text-gray-400" : ""}`}>{mission.description}</div>
                  <div className="text-xs text-yellow-600">{mission.reward}</div>
                </div>
              </div>
              {mission.completed ? (
                <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Completed</div>
              ) : (
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Go</button>
              )}
            </div>
            {!mission.completed && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.random() * 70}%` }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // Render Ultra Pet Collection
  const renderUltraPetCollection = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Collection</h2>

      <div className="bg-white border rounded-lg p-4 mb-4">
        <h3 className="font-medium mb-3">Pet Evolution Forms</h3>
        <div className="grid grid-cols-2 gap-3">
          {petData.petEvolutions.map((evolution, index) => (
            <div key={index} className={`border rounded-lg p-3 ${index <= 1 ? "bg-white" : "bg-gray-50"}`}>
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 relative">
                  {index <= 1 ? (
                    <Image
                      src="/images/ultra-pet.png"
                      alt={evolution.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <Lock size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{evolution.name}</div>
                <div className="text-xs text-gray-500">Level {evolution.level}</div>
                {index > 1 && <div className="mt-1 text-xs text-blue-600">Locked</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-medium mb-3">Accessories & Items</h3>
        <div className="grid grid-cols-3 gap-3">
          {petData.collection.map((item) => (
            <div key={item.id} className={`border rounded-lg p-2 ${item.acquired ? "bg-white" : "bg-gray-50"}`}>
              <div className="flex justify-center mb-1">
                <div className="w-12 h-12 relative">
                  {item.acquired ? (
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{item.name}</div>
                {!item.acquired && <div className="mt-1 text-xs text-blue-600">Locked</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render Ultra Quest Missions
  const renderUltraQuestMissions = () => (
    <div className="p-4">
      {/* Quest Header */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="font-bold text-lg">Ultra Quest</h2>
            <div className="text-blue-700 text-sm">Level {questData.level}</div>
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full">
            <span className="text-blue-700 text-sm font-medium">{questData.ultraMiles}</span>
            <span className="ml-1 text-blue-500">✈️</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Level Progress</span>
            <span>
              {questData.currentLevelPoints}/{questData.nextLevelPoints}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(questData.currentLevelPoints / questData.nextLevelPoints) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            {questData.nextLevelPoints - questData.currentLevelPoints} more points until Level {questData.level + 1}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto py-2 gap-2 mb-4 no-scrollbar">
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            questActivePeriod === "daily" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setQuestActivePeriod("daily")}
        >
          Daily
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            questActivePeriod === "weekly" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setQuestActivePeriod("weekly")}
        >
          Weekly
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            questActivePeriod === "event" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setQuestActivePeriod("event")}
        >
          Event
        </button>
      </div>

      <div className="space-y-4">
        {(questActivePeriod === "daily"
          ? questData.dailyQuests
          : questActivePeriod === "weekly"
            ? questData.weeklyQuests
            : questData.eventQuests
        ).map((quest) => (
          <div key={quest.id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${quest.completed ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                >
                  {quest.icon}
                </div>
                <div>
                  <div className="font-medium">{quest.description}</div>
                  <div className="text-sm text-blue-600 mt-1">{quest.reward}</div>
                  {questActivePeriod === "event" && quest.expiresIn && (
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <Clock size={12} className="mr-1" />
                      Expires in {quest.expiresIn}
                    </div>
                  )}
                </div>
              </div>
              {quest.completed ? (
                <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Completed</div>
              ) : (
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  onClick={() => completeQuest(quest)}
                >
                  Go
                </button>
              )}
            </div>
            {!quest.completed && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>
                    {quest.progress}/{quest.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quest Info */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">About Ultra Quest</h3>
        <p className="text-sm text-gray-600 mb-3">
          Complete missions to earn UltraMiles points and exclusive rewards. Missions are designed to encourage repeat
          transactions and provide a sense of progression and achievement.
        </p>
        <div className="text-xs text-gray-500">
          <p>• Daily, weekly, and event-based missions</p>
          <p>• Earn UltraMiles points or instant vouchers</p>
          <p>• Track your progress with leaderboards and badges</p>
          <p>• Reach personal milestones to unlock special rewards</p>
        </div>
      </div>
    </div>
  )

  // Render Ultra Quest Rewards
  const renderUltraQuestRewards = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Rewards</h2>
        <div className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full">
          <span className="text-blue-700 text-sm font-medium">{questData.ultraMiles}</span>
          <span className="ml-1 text-blue-500">✈️</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {questData.rewards.map((reward) => (
          <div key={reward.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="h-32 bg-gray-50 relative flex items-center justify-center">
              <Image
                src={reward.image || "/placeholder.svg"}
                alt={reward.name}
                width={80}
                height={80}
                className="object-contain"
              />
              {reward.type === "discount" && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Discount
                </div>
              )}
              {reward.type === "badge" && (
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Badge
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium mb-2">{reward.name}</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{reward.cost}</span>
                  <span className="ml-1 text-blue-500">✈️</span>
                </div>
                <button
                  className={`px-3 py-1 rounded text-xs ${questData.ultraMiles >= reward.cost ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                  onClick={() => redeemReward(reward)}
                  disabled={questData.ultraMiles < reward.cost}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">How to Earn UltraMiles</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
              <Target size={14} />
            </div>
            <div>
              <span className="font-medium">Complete Missions</span>
              <p className="text-gray-600 text-xs mt-1">
                Finish daily, weekly, and event missions to earn UltraMiles points.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
              <ShoppingCart size={14} />
            </div>
            <div>
              <span className="font-medium">Make Purchases</span>
              <p className="text-gray-600 text-xs mt-1">
                Earn UltraMiles for every purchase you make on Ultra Voucher.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
              <Users size={14} />
            </div>
            <div>
              <span className="font-medium">Refer Friends</span>
              <p className="text-gray-600 text-xs mt-1">
                Invite friends to Ultra Voucher and earn UltraMiles when they make their first purchase.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
              <Award size={14} />
            </div>
            <div>
              <span className="font-medium">Unlock Achievements</span>
              <p className="text-gray-600 text-xs mt-1">
                Complete achievements to earn bonus UltraMiles and special rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render Ultra Quest Leaderboard
  const renderUltraQuestLeaderboard = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Leaderboard</h2>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium">Your Ranking</h3>
            <p className="text-sm text-gray-600">Top 10% of all users</p>
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-1.5 rounded-full">
            <span className="text-blue-700 text-sm font-medium">{questData.ultraMiles}</span>
            <span className="ml-1 text-blue-500">✈️</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              42
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                <Image src="/placeholder.svg?height=50&width=50" alt="Your Avatar" fill className="object-cover" />
              </div>
              <span className="font-medium">You</span>
            </div>
          </div>
          <div className="font-medium">{questData.ultraMiles} pts</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-3 bg-gray-50 border-b flex justify-between items-center text-sm font-medium text-gray-600">
          <span>Rank</span>
          <span>User</span>
          <span>Points</span>
        </div>

        <div className="divide-y">
          {questData.leaderboard.map((user) => (
            <div key={user.rank} className={`p-3 flex justify-between items-center ${user.isUser ? "bg-blue-50" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${user.rank <= 3 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}
              >
                {user.rank}
              </div>
              <div className="flex items-center gap-2 flex-1 mx-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <span className={`${user.isUser ? "font-medium" : ""}`}>{user.name}</span>
                {user.isUser && <span className="text-xs text-blue-600">(You)</span>}
              </div>
              <div className="font-medium">{user.points} pts</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-600 text-sm">View Full Leaderboard</button>
      </div>
    </div>
  )

  // Render Ultra Quest Achievements
  const renderUltraQuestAchievements = () => (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Achievements</h2>

      <div className="space-y-4">
        {questData.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white border rounded-lg p-4 ${achievement.completed ? "border-green-200" : ""}`}
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
                {achievement.completed && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <Check size={14} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{achievement.name}</h3>
                  {achievement.completed ? (
                    <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">Completed</div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      {achievement.progress}/{achievement.total}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                <div className="mt-2">
                  {!achievement.completed && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      ></div>
                    </div>
                  )}
                  <div className="text-xs text-blue-600">Reward: {achievement.reward}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-blue-600" />
          <h3 className="font-medium">Achievement Benefits</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Completing achievements not only earns you UltraMiles but also unlocks special perks and badges that showcase
          your status in the Ultra Voucher community.
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Earn exclusive badges to display on your profile</p>
          <p>• Unlock special discounts and promotions</p>
          <p>• Gain access to limited-time offers</p>
          <p>• Increase your ranking on the leaderboard</p>
        </div>
      </div>
    </div>
  )

  // Render Ultra Quest Content
  const renderUltraQuestContent = () => {
    switch (questActiveTab) {
      case "missions":
        return renderUltraQuestMissions()
      case "rewards":
        return renderUltraQuestRewards()
      case "leaderboard":
        return renderUltraQuestLeaderboard()
      case "achievements":
        return renderUltraQuestAchievements()
      default:
        return renderUltraQuestMissions()
    }
  }

  // Render Ultra Pet Content
  const renderUltraPetContent = () => {
    switch (petActiveTab) {
      case "home":
        return renderUltraPetHome()
      case "shop":
        return renderUltraPetShop()
      case "missions":
        return renderUltraPetMissions()
      case "collection":
        return renderUltraPetCollection()
      default:
        return renderUltraPetHome()
    }
  }

  // Render Ultra Life Content
  const renderUltraLifeContent = () => {
    if (ultraLifeActiveTab === "pet") {
      return (
        <>
          {/* Ultra Pet Tab Navigation */}
          {renderUltraPetTabNavigation()}

          {/* Ultra Pet Content */}
          {renderUltraPetContent()}
        </>
      )
    } else {
      return (
        <>
          {/* Ultra Quest Tab Navigation */}
          {renderUltraQuestTabNavigation()}

          {/* Ultra Quest Content */}
          {renderUltraQuestContent()}
        </>
      )
    }
  }

  // Render brand detail view
  const renderBrandDetail = () => (
    <div>
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <button onClick={() => setSelectedBrand(null)} className="flex items-center gap-2 text-gray-700">
          <ArrowLeft size={20} />
          <span className="font-medium">{selectedBrandDetails?.name}</span>
        </button>
        <div className="relative">
          <ShoppingCart size={20} className="text-gray-500" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Brand Image */}
      <div className="relative">
        <div className="h-48 bg-gray-100 relative">
          <Image
            src={selectedBrandDetails?.image || "/placeholder.svg"}
            alt={selectedBrandDetails?.name || ""}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold">{selectedBrandDetails?.name}</h1>
          </div>
        </div>
      </div>

      {/* Brand Info */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">{selectedBrandDetails?.category}</div>
            <div className="text-green-600 font-medium">{selectedBrandDetails?.discount}</div>
          </div>
          <a href="#" className="text-green-600 flex items-center gap-1 text-sm" onClick={(e) => e.preventDefault()}>
            <ExternalLink size={16} />
            <span>Kunjungi Website</span>
          </a>
        </div>
      </div>

      {/* Available Vouchers */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-3">Voucher Tersedia</h2>
        <div className="space-y-4">
          {brandVouchers.map((voucher) => (
            <div key={voucher.id} className="border rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 relative">
                  <Image src={voucher.image || "/placeholder.svg"} alt={voucher.name} fill className="object-cover" />
                </div>
                <div className="p-3 flex-1">
                  <div className="flex flex-col">
                    <div className="text-xs text-green-600 font-medium">{voucher.type}</div>
                    <h3 className="text-sm font-medium line-clamp-1">{voucher.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold">{voucher.price}</span>
                      <span className="text-gray-400 text-xs line-through">{voucher.originalPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 flex items-center">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => setSelectedVoucher(voucher.id)}
                  >
                    Gunakan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render voucher detail view
  const renderVoucherDetail = () => (
    <div>
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <button
          onClick={() => {
            setSelectedVoucher(null)
            // If we came from a brand page, go back to it
            if (selectedBrandDetails && selectedVoucherDetails?.brandId === selectedBrandDetails.id) {
              // Stay on brand page
            } else {
              // Reset brand selection too
              setSelectedBrand(null)
            }
          }}
          className="flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">{selectedVoucherDetails?.brand}</span>
        </button>
        <div className="relative">
          <ShoppingCart size={20} className="text-gray-500" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Voucher Image */}
      <div className="relative">
        <div className="h-48 bg-gray-100 relative">
          <Image
            src={selectedVoucherDetails?.image || "/placeholder.svg"}
            alt={selectedVoucherDetails?.name || ""}
            fill
            className="object-cover"
          />
          {selectedVoucherDetails?.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Diskon {selectedVoucherDetails.discount}
            </div>
          )}
        </div>
      </div>

      {/* Voucher Code */}
      <div className="p-4 bg-green-50 border-b border-green-100">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Kode Voucher</div>
            <div className="font-bold text-green-700">{selectedVoucherDetails?.code}</div>
          </div>
          <button
            className="flex items-center gap-1 bg-white border border-green-200 text-green-600 px-3 py-1.5 rounded-md"
            onClick={() => copyVoucherCode(selectedVoucherDetails?.code)}
          >
            {copiedCode === selectedVoucherDetails?.code ? (
              <>
                <Check size={16} />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Salin Kode</span>
              </>
            )}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">{selectedVoucherDetails?.validity}</div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button className="py-3 px-4 border-b-2 border-green-600 text-green-600 font-medium">Deskripsi</button>
        <button className="py-3 px-4 text-gray-500">Syarat & Ketentuan</button>
      </div>

      {/* Description */}
      <div className="p-4 text-sm text-gray-700">
        <h2 className="font-bold text-lg mb-2">{selectedVoucherDetails?.name}</h2>
        <p className="mb-4">{selectedVoucherDetails?.description}</p>

        {selectedVoucherDetails?.locations && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Lokasi</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {selectedVoucherDetails.locations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        )}

        {selectedVoucherDetails?.howToUse && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Cara Penggunaan</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {selectedVoucherDetails.howToUse.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Fixed bottom bar for quick purchase */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <div>
          <div className="text-xs text-gray-500">Harga</div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{selectedVoucherDetails?.price}</span>
            <span className="text-gray-400 line-through">{selectedVoucherDetails?.originalPrice}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="border border-green-600 text-green-600 px-4 py-2 rounded-md font-medium"
            onClick={() => {
              if (selectedVoucherDetails?.code) {
                copyVoucherCode(selectedVoucherDetails.code)
              }
            }}
          >
            Gunakan Sekarang
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md font-medium"
            onClick={() => {
              if (selectedVoucherDetails && !selectedVoucherDetails.outOfStock) {
                addToCart(selectedVoucherDetails)
              }
            }}
            disabled={selectedVoucherDetails?.outOfStock}
          >
            Beli Voucher
          </button>
        </div>
      </div>

      {/* Spacing for fixed bottom bar */}
      <div className="h-20"></div>
    </div>
  )

  // Render bottom navigation
  const renderBottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex z-40">
      <button
        className={`flex-1 flex flex-col items-center py-2 ${activeBottomTab === "home" ? "text-green-600" : "text-gray-500"}`}
        onClick={() => setActiveBottomTab("home")}
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-2 ${activeBottomTab === "ultralife" ? "text-green-600" : "text-gray-500"}`}
        onClick={() => setActiveBottomTab("ultralife")}
      >
        <div className="w-6 h-6 relative">
          <Image src="/images/ultra-pet.png" alt="Ultra Life" width={24} height={24} className="object-contain" />
        </div>
        <span className="text-xs mt-1">Ultra Life</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-2 ${activeBottomTab === "article" ? "text-green-600" : "text-gray-500"}`}
        onClick={() => setActiveBottomTab("article")}
      >
        <Newspaper size={20} />
        <span className="text-xs mt-1">Article</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-2 ${activeBottomTab === "myvoucher" ? "text-green-600" : "text-gray-500"}`}
        onClick={() => setActiveBottomTab("myvoucher")}
      >
        <Gift size={20} />
        <span className="text-xs mt-1">My Voucher</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center py-2 ${activeBottomTab === "account" ? "text-green-600" : "text-gray-500"}`}
        onClick={() => setActiveBottomTab("account")}
      >
        <User size={20} />
        <span className="text-xs mt-1">Account</span>
      </button>
    </div>
  )

  // Main render function
  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen pb-16">
      {/* App download banner - always visible */}
      {renderAppDownloadBanner()}

      {/* Login info banner */}
      {renderLoginInfoBanner()}

      {/* Search bar - always visible */}
      {renderSearchBar()}

      {selectedVoucher ? (
        /* Voucher Detail View */
        renderVoucherDetail()
      ) : selectedBrand ? (
        /* Brand Detail View */
        renderBrandDetail()
      ) : (
        /* Main Content based on bottom tab */
        <>
          {activeBottomTab === "home" && (
            <>
              {/* Horizontal Promotions */}
              {renderHorizontalPromotions()}

              {/* Wallet Section */}
              <div className="flex border-t border-b">
                <div className="flex-1 flex items-center gap-2 p-4 border-r">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-white font-bold">U</span>
                  </div>
                  <div>
                    <div className="text-sm">Ultra Value</div>
                    <div className="font-bold">Rp 0</div>
                    <div className="text-green-600 text-xs">+ Topup</div>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-2 p-4 border-r">
                  <div className="bg-yellow-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-yellow-500 text-xl">🎟️</span>
                  </div>
                  <div>
                    <div className="text-sm">Voucher Saya</div>
                    <div className="font-bold">0 Voucher</div>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-2 p-4">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-gray-600 text-xl">📱</span>
                  </div>
                  <div>
                    <div className="text-sm">UVGC & Pay</div>
                    <div className="font-bold">Scan</div>
                  </div>
                </div>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-5 gap-2 px-4 py-4 border-b">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-1">
                    <span className="text-red-500 text-xl">❤️</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Favorit</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-1">
                    <span className="text-yellow-500 text-xl">🏆</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Emas</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-1">
                    <span className="text-red-500 text-xl">🎁</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Hadiah</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                    <span className="text-blue-500 text-xl">🍽️</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center">UFood</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-1">
                    <span className="text-green-500 text-xl">💳</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Topup & Tagihan</span>
                </div>
              </div>

              {/* Categories */}
              {renderCategories()}

              {/* Tabs */}
              {renderTabs()}

              {/* Content based on active tab */}
              {activeTab === "brand" ? renderBrandGrid() : renderVoucherGrid()}
            </>
          )}

          {activeBottomTab === "ultralife" && (
            <>
              {/* Ultra Life Tab Navigation */}
              {renderUltraLifeTabNavigation()}

              {/* Ultra Life Content */}
              {renderUltraLifeContent()}
            </>
          )}

          {activeBottomTab === "article" && renderArticles()}

          {activeBottomTab === "myvoucher" && renderMyVouchers()}

          {activeBottomTab === "account" && renderAccount()}
        </>
      )}

      {/* Bottom Navigation */}
      {renderBottomNavigation()}
    </div>
  )
}
