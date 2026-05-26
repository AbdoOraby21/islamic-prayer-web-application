import { useState, useEffect, useRef, useCallback } from 'react'

// ========== Data ==========
const tasbeehOptions = [
  { text: 'سبحان الله', target: 33 },
  { text: 'الحمد لله', target: 33 },
  { text: 'الله أكبر', target: 34 },
  { text: 'لا إله إلا الله', target: 100 },
  { text: 'سبحان الله وبحمده', target: 100 },
  { text: 'أستغفر الله', target: 100 },
  { text: 'لا حول ولا قوة إلا بالله', target: 100 },
]

const eidTakbeerOptions = [
  {
    label: 'المختصر',
    text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    color: '#dc2626',
    bg: 'linear-gradient(135deg,#fef2f2,#fff7ed)',
    border: '#fca5a5',
  },
  {
    label: 'الكامل',
    text: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ، اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَأَعَزَّ جُنْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ، اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ',
    color: '#b45309',
    bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)',
    border: '#fcd34d',
  },
  {
    label: 'التكبير المطلق',
    text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    color: '#065f46',
    bg: 'linear-gradient(135deg,#ecfdf5,#d1fae5)',
    border: '#6ee7b7',
  },
  {
    label: 'تكبير الإحرام',
    text: 'اللَّهُ أَكْبَرُ',
    color: '#1d4ed8',
    bg: 'linear-gradient(135deg,#eff6ff,#eef2ff)',
    border: '#93c5fd',
  },
]

const eidDuas = [
  { label: 'عيد الفطر', text: 'اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَرُكُوعَنَا وَسُجُودَنَا وَتِلَاوَتَنَا، وَتَمِّمْ تَقْصِيرَنَا، يَا أَرْحَمَ الرَّاحِمِينَ' },
  { label: 'عيد الأضحى', text: 'اللَّهُمَّ تَقَبَّلْ مِنَّا أُضْحِيَّتَنَا وَنُسُكَنَا، وَاجْعَلْهَا شَاهِدَةً لَنَا لَا عَلَيْنَا، وَبَلِّغْنَا أَعْيَادًا كَثِيرَةً وَنَحْنُ فِي طَاعَتِكَ يَا رَبَّ الْعَالَمِينَ' },
  { label: 'التهنئة', text: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ، وَكُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ، وَجَعَلَنَا اللَّهُ وَإِيَّاكُمْ مِنَ الْعَائِدِينَ الْفَائِزِينَ' },
  { label: 'دعاء جامع', text: 'اللَّهُمَّ اجْعَلْ هَذَا الْيَوْمَ خَيْرًا لَنَا، وَاجْعَلْ مَا بَعْدَهُ خَيْرًا مِمَّا قَبْلَهُ، وَاجْعَلْنَا مِنَ الْمَقْبُولِينَ الْمَرْحُومِينَ' },
]

const duas = [
  'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
  'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
  'رَبِّ زِدْنِي عِلْمًا',
  'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
  'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
  'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا',
]

const surahNames = [
  'الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال',
  'التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل',
  'الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور',
  'الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة',
  'الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر',
  'فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح',
  'الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة',
  'الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن',
  'الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن',
  'المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس',
  'التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية',
  'الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق',
  'القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة',
  'الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص',
  'الفلق','الناس',
]

const surahAyahCount = [
  7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,
  111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,
  73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,
  18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,
  12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,
  29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,
  5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6
]

// قائمة القراء المتاحين
const reciters = [
  { id: 'ar.alafasy', name: 'مشاري العفاسي', server: 'alafasy' },
  { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد (مرتل)', server: 'abdulbasit_murattal' },
  { id: 'ar.abdulsamad', name: 'عبد الباسط عبد الصمد (مجود)', server: 'abdulbasit_mujawwad' },
  { id: 'ar.husary', name: 'محمود خليل الحصري', server: 'husary' },
  { id: 'ar.minshawi', name: 'محمد صديق المنشاوي', server: 'minshawi' },
  { id: 'ar.minshawimujawwad', name: 'المنشاوي (مجود)', server: 'minshawi_mujawwad' },
  { id: 'ar.ahmedajamy', name: 'أحمد العجمي', server: 'ajamy' },
  { id: 'ar.sudais', name: 'عبد الرحمن السديس', server: 'sudais' },
  { id: 'ar.shuraym', name: 'سعود الشريم', server: 'shuraym' },
  { id: 'ar.maaborheal', name: 'ماهر المعيقلي', server: 'maher' },
  { id: 'ar.haborheel', name: 'محمد أيوب', server: 'ayyub' },
  { id: 'ar.parhizgar', name: 'ياسر الدوسري', server: 'yasser' },
]

const quizQuestions = [
  { q: 'كم عدد سور القرآن الكريم؟', options: ['112','113','114','115'], correct: 2 },
  { q: 'ما هي أطول سورة في القرآن؟', options: ['آل عمران','البقرة','النساء','المائدة'], correct: 1 },
  { q: 'ما هي أقصر سورة في القرآن؟', options: ['الكوثر','الإخلاص','الفلق','الناس'], correct: 0 },
  { q: 'كم عدد أجزاء القرآن؟', options: ['28','29','30','31'], correct: 2 },
  { q: 'في أي سورة آية الكرسي؟', options: ['آل عمران','البقرة','النساء','المائدة'], correct: 1 },
  { q: 'ما السورة التي تسمى قلب القرآن؟', options: ['يس','الرحمن','الملك','الكهف'], correct: 0 },
  { q: 'كم مرة ذُكر اسم محمد في القرآن؟', options: ['3','4','5','6'], correct: 1 },
  { q: 'ما السورة التي لا تبدأ بالبسملة؟', options: ['الأنفال','التوبة','الحجرات','محمد'], correct: 1 },
]

// ========== Styles ==========
const amiri = "'Amiri', 'Traditional Arabic', serif"
const cairo = "'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif"

const styles = {
  card: { 
    background: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)' 
  } as React.CSSProperties,
  badge: (bg: string, color: string) => ({ 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: 8, 
    background: bg, 
    color, 
    padding: '8px 16px', 
    borderRadius: 999, 
    fontSize: 14, 
    fontWeight: 600 
  }) as React.CSSProperties,
  btn: (bg: string, color: string) => ({ 
    padding: '12px 24px', 
    borderRadius: 12, 
    background: bg, 
    color, 
    border: 'none', 
    fontWeight: 600, 
    cursor: 'pointer', 
    fontSize: 14, 
    transition: 'all 0.2s' 
  }) as React.CSSProperties,
  btnFull: (bg: string, color: string) => ({ 
    width: '100%', 
    padding: 16, 
    borderRadius: 16, 
    background: bg, 
    color, 
    border: 'none', 
    fontWeight: 700, 
    cursor: 'pointer', 
    fontSize: 16 
  }) as React.CSSProperties,
}

// ========== Speech Helper ==========
function speakArabic(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'ar-SA'
  utter.rate = 0.75
  utter.pitch = 1
  const voices = window.speechSynthesis.getVoices()
  const arabicVoice = voices.find(v => v.lang.startsWith('ar'))
  if (arabicVoice) utter.voice = arabicVoice
  window.speechSynthesis.speak(utter)
}

// ========== Audio Player Component ==========
function AudioPlayer({ 
  surahNum, 
  reciterId, 
  onReciterChange 
}: { 
  surahNum: number
  reciterId: string
  onReciterChange: (id: string) => void 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showReciters, setShowReciters] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const reciter = reciters.find(r => r.id === reciterId) || reciters[0]
  
  // بناء رابط الصوت
  const getAudioUrl = () => {
    const surahStr = surahNum.toString().padStart(3, '0')
    return `https://cdn.islamic.network/quran/audio-surah/128/${reciter.server}/${surahStr}.mp3`
  }

  useEffect(() => {
    // إيقاف الصوت عند تغيير السورة أو القارئ
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [surahNum, reciterId])

  const togglePlay = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getAudioUrl())
      
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true))
      audioRef.current.addEventListener('canplay', () => setIsLoading(false))
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
      audioRef.current.addEventListener('timeupdate', () => {
        const audio = audioRef.current
        if (audio) {
          setCurrentTime(audio.currentTime)
          setProgress((audio.currentTime / audio.duration) * 100)
        }
      })
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      })
      audioRef.current.addEventListener('error', () => {
        setIsLoading(false)
        setIsPlaying(false)
        alert('تعذر تحميل الملف الصوتي')
      })
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Error playing audio:', err)
      }
      setIsLoading(false)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audioRef.current.currentTime = percentage * duration
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleReciterChange = (id: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    onReciterChange(id)
    setShowReciters(false)
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1e40af, #3b82f6)', 
      borderRadius: 16, 
      padding: 16, 
      marginBottom: 16 
    }}>
      {/* اختيار القارئ */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setShowReciters(!showReciters)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            color: '#fff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🎙️</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{reciter.name}</span>
          </div>
          <span style={{ fontSize: 10 }}>{showReciters ? '▲' : '▼'}</span>
        </button>
        
        {showReciters && (
          <div style={{ 
            marginTop: 8, 
            background: '#fff', 
            borderRadius: 12, 
            maxHeight: 200, 
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            {reciters.map(r => (
              <button
                key={r.id}
                onClick={() => handleReciterChange(r.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  borderBottom: '1px solid #f1f5f9',
                  background: reciterId === r.id ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'right',
                  fontSize: 14,
                  fontWeight: reciterId === r.id ? 600 : 400,
                  color: reciterId === r.id ? '#1d4ed8' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                {reciterId === r.id && <span>✓</span>}
                <span>{r.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* شريط التقدم */}
      <div 
        onClick={handleSeek}
        style={{ 
          height: 6, 
          background: 'rgba(255,255,255,0.3)', 
          borderRadius: 999, 
          marginBottom: 12,
          cursor: 'pointer',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          height: '100%', 
          background: '#fff', 
          borderRadius: 999,
          width: `${progress}%`,
          transition: 'width 0.1s'
        }} />
      </div>

      {/* الوقت والأزرار */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
          {formatTime(currentTime)}
        </span>
        
        <button
          onClick={togglePlay}
          disabled={isLoading}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#fff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <div style={{
              width: 24,
              height: 24,
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          ) : isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
          {duration ? formatTime(duration) : '--:--'}
        </span>
      </div>

      {/* اسم السورة */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <span style={{ 
          color: '#fff', 
          fontSize: 16, 
          fontWeight: 700,
          fontFamily: amiri
        }}>
          سورة {surahNames[surahNum - 1]}
        </span>
      </div>
    </div>
  )
}

// ========== Quran Reader — by PAGE (Mushaf) ==========
const TOTAL_PAGES = 604

type PageAyah = {
  number: number
  numberInSurah: number
  text: string
  surah: { number: number; name: string; englishName: string }
}

type AyahData = {
  number: number
  numberInSurah: number
  text: string
}

function QuranReader() {
  const [mode, setMode] = useState<'page' | 'surah'>('page')
  const [selectedReciter, setSelectedReciter] = useState(reciters[0].id)

  // --- Page mode state ---
  const [pageNum, setPageNum] = useState(1)
  const [pageAyahs, setPageAyahs] = useState<PageAyah[]>([])
  const [loadingPage, setLoadingPage] = useState(false)
  const [pageInput, setPageInput] = useState('')

  // --- Surah mode state ---
  const [surahNum, setSurahNum] = useState(1)
  const [ayahs, setAyahs] = useState<AyahData[]>([])
  const [loadingSurah, setLoadingSurah] = useState(false)
  const [surahPage, setSurahPage] = useState(1)
  const [showList, setShowList] = useState(false)
  const [search, setSearch] = useState('')
  const AYAHS_PER_SURAH_PAGE = 10

  // --- Shared state ---
  const [tafseer, setTafseer] = useState<Record<number, string>>({})
  const [showTafseer, setShowTafseer] = useState<number | null>(null)
  const [loadingTafseer, setLoadingTafseer] = useState<number | null>(null)
  const [fontSize, setFontSize] = useState(24)
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const ayahAudioRef = useRef<HTMLAudioElement | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // Fetch page
  useEffect(() => {
    if (mode !== 'page') return
    setLoadingPage(true)
    setPageAyahs([])
    setTafseer({})
    setShowTafseer(null)
    fetch(`https://api.alquran.cloud/v1/page/${pageNum}/quran-uthmani`)
      .then(r => r.json())
      .then(d => {
        if (d.code === 200) setPageAyahs(d.data.ayahs)
        setLoadingPage(false)
      })
      .catch(() => setLoadingPage(false))
  }, [pageNum, mode])

  // Fetch surah
  useEffect(() => {
    if (mode !== 'surah') return
    setLoadingSurah(true)
    setAyahs([])
    setTafseer({})
    setShowTafseer(null)
    setSurahPage(1)
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`)
      .then(r => r.json())
      .then(d => { 
        if (d.code === 200) setAyahs(d.data.ayahs)
        setLoadingSurah(false) 
      })
      .catch(() => setLoadingSurah(false))
  }, [surahNum, mode])

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pageNum, surahNum, surahPage, mode])

  // إيقاف الصوت عند تغيير الصفحة
  useEffect(() => {
    if (ayahAudioRef.current) {
      ayahAudioRef.current.pause()
      setPlayingAyah(null)
    }
  }, [pageNum, surahNum, surahPage])

  const loadTafseer = async (globalAyahNum: number) => {
    const key = globalAyahNum
    if (showTafseer === key) { setShowTafseer(null); return }
    setShowTafseer(key)
    if (tafseer[key]) return
    setLoadingTafseer(key)
    try {
      const r = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar.muyassar`)
      const d = await r.json()
      if (d.code === 200 && d.data?.text) {
        setTafseer(p => ({ ...p, [key]: d.data.text }))
      } else {
        setTafseer(p => ({ ...p, [key]: 'تعذر تحميل التفسير' }))
      }
    } catch {
      setTafseer(p => ({ ...p, [key]: 'تعذر تحميل التفسير' }))
    }
    setLoadingTafseer(null)
  }

  // تشغيل صوت آية معينة
  const playAyahAudio = async (ayahNumber: number) => {
    // إيقاف الصوت الحالي
    if (ayahAudioRef.current) {
      ayahAudioRef.current.pause()
    }

    if (playingAyah === ayahNumber) {
      setPlayingAyah(null)
      return
    }

    const reciter = reciters.find(r => r.id === selectedReciter) || reciters[0]
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reciter.server}/${ayahNumber}.mp3`
    
    ayahAudioRef.current = new Audio(audioUrl)
    setPlayingAyah(ayahNumber)
    
    ayahAudioRef.current.onended = () => setPlayingAyah(null)
    ayahAudioRef.current.onerror = () => {
      setPlayingAyah(null)
      alert('تعذر تحميل صوت الآية')
    }
    
    try {
      await ayahAudioRef.current.play()
    } catch (err) {
      console.error('Error playing ayah:', err)
      setPlayingAyah(null)
    }
  }

  // Group page ayahs by surah
  const groupedBySurah = pageAyahs.reduce<{ surahNum: number; surahName: string; ayahs: PageAyah[] }[]>((acc, ayah) => {
    const last = acc[acc.length - 1]
    if (!last || last.surahNum !== ayah.surah.number) {
      acc.push({ surahNum: ayah.surah.number, surahName: ayah.surah.name, ayahs: [ayah] })
    } else {
      last.ayahs.push(ayah)
    }
    return acc
  }, [])

  const totalSurahPages = Math.ceil(ayahs.length / AYAHS_PER_SURAH_PAGE)
  const displayedSurahAyahs = ayahs.slice((surahPage - 1) * AYAHS_PER_SURAH_PAGE, surahPage * AYAHS_PER_SURAH_PAGE)
  const filteredSurahs = surahNames.filter(n => n.includes(search))

  const AyahBlock = ({ ayah, globalNum, ayahInSurah }: { ayah: { text: string }; globalNum: number; ayahInSurah: number }) => (
    <div key={globalNum}>
      <div style={{ background: '#f8fafc', borderRadius: 16, padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ 
            flexShrink: 0, 
            width: 34, 
            height: 34, 
            background: '#2563eb', 
            color: '#fff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 12, 
            fontWeight: 700, 
            marginTop: 4 
          }}>
            {ayahInSurah}
          </div>
          <p style={{ 
            fontSize, 
            fontFamily: amiri, 
            color: '#1e293b', 
            lineHeight: 2.2, 
            flex: 1,
            margin: 0
          }}>
            {ayah.text}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => playAyahAudio(globalNum)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: 8, 
              fontSize: 12, 
              fontWeight: 600, 
              border: 'none', 
              cursor: 'pointer', 
              background: playingAyah === globalNum ? '#2563eb' : '#eff6ff', 
              color: playingAyah === globalNum ? '#fff' : '#2563eb',
              transition: 'all 0.2s'
            }}>
            {playingAyah === globalNum ? '⏹ إيقاف' : '🔊 استماع'}
          </button>
          <button
            onClick={() => loadTafseer(globalNum)}
            style={{ 
              padding: '6px 14px', 
              borderRadius: 8, 
              fontSize: 12, 
              fontWeight: 600, 
              border: 'none', 
              cursor: 'pointer',
              background: showTafseer === globalNum ? '#f59e0b' : '#fef3c7',
              color: showTafseer === globalNum ? '#fff' : '#92400e' 
            }}>
            {loadingTafseer === globalNum ? '⏳' : '📜'} {showTafseer === globalNum ? 'إخفاء' : 'التفسير'}
          </button>
        </div>
      </div>
      {showTafseer === globalNum && (
        <div style={{ 
          marginRight: 24, 
          marginTop: 8, 
          background: '#fffbeb', 
          border: '1px solid #fcd34d', 
          borderRadius: 12, 
          padding: 16 
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#b45309', marginBottom: 8 }}>📜 التفسير الميسر</div>
          {loadingTafseer === globalNum ? (
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>⏳ جاري تحميل التفسير...</p>
          ) : (
            <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, fontFamily: amiri, margin: 0 }}>
              {tafseer[globalNum] || 'تعذر تحميل التفسير'}
            </p>
          )}
        </div>
      )}
    </div>
  )

  const handlePageInputSubmit = () => {
    const n = parseInt(pageInput)
    if (n >= 1 && n <= 604) { 
      setPageNum(n)
      setPageInput('') 
    }
  }

  // الحصول على رقم السورة الحالية في وضع الصفحة
  const getCurrentSurahInPage = () => {
    if (groupedBySurah.length > 0) {
      return groupedBySurah[0].surahNum
    }
    return 1
  }

  return (
    <div ref={topRef}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#eff6ff', '#1d4ed8')}>📖 القرآن الكريم</span>
      </div>

      {/* Mode switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['page', 'surah'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ 
              flex: 1, 
              padding: 10, 
              borderRadius: 12, 
              border: 'none', 
              fontWeight: 700, 
              fontSize: 13, 
              cursor: 'pointer',
              background: mode === m ? '#2563eb' : '#f1f5f9',
              color: mode === m ? '#fff' : '#374151' 
            }}>
            {m === 'page' ? '📄 تصفح بالصفحة' : '📚 تصفح بالسورة'}
          </button>
        ))}
      </div>

      {/* مشغل الصوت للسورة كاملة */}
      {mode === 'surah' && (
        <AudioPlayer 
          surahNum={surahNum} 
          reciterId={selectedReciter}
          onReciterChange={setSelectedReciter}
        />
      )}

      {/* Font size */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>القارئ:</span>
          <select
            value={selectedReciter}
            onChange={(e) => setSelectedReciter(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              fontSize: 12,
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            {reciters.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f8fafc', borderRadius: 12, padding: 4 }}>
          <button 
            onClick={() => setFontSize(f => Math.max(16, f - 2))} 
            style={{ 
              width: 30, 
              height: 30, 
              borderRadius: 8, 
              background: '#fff', 
              border: '1px solid #e2e8f0', 
              cursor: 'pointer', 
              fontWeight: 700 
            }}>
            -
          </button>
          <span style={{ fontSize: 11, color: '#64748b', width: 20, textAlign: 'center' }}>{fontSize}</span>
          <button 
            onClick={() => setFontSize(f => Math.min(40, f + 2))} 
            style={{ 
              width: 30, 
              height: 30, 
              borderRadius: 8, 
              background: '#fff', 
              border: '1px solid #e2e8f0', 
              cursor: 'pointer', 
              fontWeight: 700 
            }}>
            +
          </button>
        </div>
      </div>

      {/* ===== PAGE MODE ===== */}
      {mode === 'page' && (
        <>
          {/* مشغل صوت السورة في وضع الصفحة */}
          {!loadingPage && groupedBySurah.length > 0 && (
            <AudioPlayer 
              surahNum={getCurrentSurahInPage()} 
              reciterId={selectedReciter}
              onReciterChange={setSelectedReciter}
            />
          )}

          {/* Page number input */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <button 
              onClick={() => setPageNum(p => Math.max(1, p - 1))} 
              disabled={pageNum === 1}
              style={{ 
                padding: '10px 16px', 
                borderRadius: 12, 
                background: '#f1f5f9', 
                border: 'none', 
                fontWeight: 700, 
                cursor: 'pointer', 
                fontSize: 16, 
                opacity: pageNum === 1 ? 0.3 : 1 
              }}>
              ←
            </button>
            <div style={{ 
              flex: 1, 
              background: 'linear-gradient(135deg,#eff6ff,#eef2ff)', 
              borderRadius: 12, 
              padding: '10px 16px', 
              textAlign: 'center', 
              border: '2px solid #93c5fd' 
            }}>
              <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: 16 }}>صفحة {pageNum}</span>
              <span style={{ color: '#64748b', fontSize: 12, marginRight: 8 }}>من {TOTAL_PAGES}</span>
            </div>
            <button 
              onClick={() => setPageNum(p => Math.min(TOTAL_PAGES, p + 1))} 
              disabled={pageNum === TOTAL_PAGES}
              style={{ 
                padding: '10px 16px', 
                borderRadius: 12, 
                background: '#f1f5f9', 
                border: 'none', 
                fontWeight: 700, 
                cursor: 'pointer', 
                fontSize: 16, 
                opacity: pageNum === TOTAL_PAGES ? 0.3 : 1 
              }}>
              →
            </button>
          </div>

          {/* Jump to page */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              type="number" 
              min={1} 
              max={604}
              placeholder="اذهب إلى صفحة (1-604)..."
              value={pageInput}
              onChange={e => setPageInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handlePageInputSubmit() }}
              style={{ 
                flex: 1, 
                padding: '10px 14px', 
                borderRadius: 12, 
                border: '1px solid #e2e8f0', 
                background: '#f8fafc', 
                fontSize: 14, 
                outline: 'none', 
                textAlign: 'center' 
              }}
            />
            <button
              onClick={handlePageInputSubmit}
              style={{ 
                padding: '10px 16px', 
                borderRadius: 12, 
                background: '#2563eb', 
                color: '#fff', 
                border: 'none', 
                fontWeight: 700, 
                cursor: 'pointer', 
                fontSize: 14 
              }}>
              انتقل
            </button>
          </div>

          {loadingPage ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                border: '4px solid #bfdbfe', 
                borderTop: '4px solid #2563eb', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite', 
                margin: '0 auto 16px' 
              }} />
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>جاري تحميل الصفحة...</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {groupedBySurah.map(group => (
                <div key={group.surahNum}>
                  {/* Surah header within page */}
                  <div style={{ 
                    background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', 
                    borderRadius: 12, 
                    padding: '10px 16px', 
                    marginBottom: 10, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 10 
                  }}>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      background: 'rgba(255,255,255,0.2)', 
                      borderRadius: 8, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: 12, 
                      fontWeight: 700, 
                      color: '#fff' 
                    }}>
                      {group.surahNum}
                    </div>
                    <span style={{ fontFamily: amiri, fontSize: 18, fontWeight: 700, color: '#fff' }}>
                      سورة {group.surahName}
                    </span>
                  </div>
                  {/* Bismillah if first ayah of surah (except At-Tawbah) */}
                  {group.ayahs[0].numberInSurah === 1 && group.surahNum !== 9 && (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '12px 0', 
                      marginBottom: 10, 
                      background: 'linear-gradient(135deg,#eff6ff,#eef2ff)', 
                      borderRadius: 12 
                    }}>
                      <p style={{ fontSize: 20, color: '#1e40af', fontFamily: amiri, margin: 0 }}>
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {group.ayahs.map(ayah => (
                      <AyahBlock 
                        key={ayah.number} 
                        ayah={ayah} 
                        globalNum={ayah.number} 
                        ayahInSurah={ayah.numberInSurah} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom page nav */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button 
              onClick={() => setPageNum(p => Math.max(1, p - 1))} 
              disabled={pageNum === 1}
              style={{ 
                flex: 1, 
                padding: 12, 
                background: '#eff6ff', 
                color: '#2563eb', 
                border: 'none', 
                borderRadius: 12, 
                fontWeight: 700, 
                fontSize: 14, 
                cursor: 'pointer', 
                opacity: pageNum === 1 ? 0.3 : 1 
              }}>
              ← الصفحة السابقة
            </button>
            <button 
              onClick={() => setPageNum(p => Math.min(TOTAL_PAGES, p + 1))} 
              disabled={pageNum === TOTAL_PAGES}
              style={{ 
                flex: 1, 
                padding: 12, 
                background: '#eff6ff', 
                color: '#2563eb', 
                border: 'none', 
                borderRadius: 12, 
                fontWeight: 700, 
                fontSize: 14, 
                cursor: 'pointer', 
                opacity: pageNum === TOTAL_PAGES ? 0.3 : 1 
              }}>
              الصفحة التالية →
            </button>
          </div>
        </>
      )}

      {/* ===== SURAH MODE ===== */}
      {mode === 'surah' && (
        <>
          {/* Surah selector */}
          <button
            onClick={() => setShowList(!showList)}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: 16, 
              background: 'linear-gradient(135deg,#eff6ff,#eef2ff)', 
              borderRadius: 16, 
              border: '2px solid #93c5fd', 
              cursor: 'pointer', 
              marginBottom: 12 
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                background: '#2563eb', 
                color: '#fff', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: 14 
              }}>
                {surahNum}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b' }}>سورة {surahNames[surahNum - 1]}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{surahAyahCount[surahNum - 1]} آية</div>
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{showList ? '▲' : '▼'}</span>
          </button>

          {showList && (
            <div style={{ 
              background: '#fff', 
              borderRadius: 16, 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
              marginBottom: 12, 
              overflow: 'hidden' 
            }}>
              <div style={{ padding: 12, borderBottom: '1px solid #f1f5f9' }}>
                <input 
                  type="text" 
                  placeholder="🔍 ابحث عن سورة..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px 16px', 
                    background: '#f8fafc', 
                    borderRadius: 12, 
                    border: 'none', 
                    outline: 'none', 
                    fontSize: 14 
                  }} 
                />
              </div>
              <div style={{ maxHeight: 250, overflowY: 'auto' }}>
                {filteredSurahs.map(name => {
                  const idx = surahNames.indexOf(name)
                  return (
                    <button 
                      key={idx} 
                      onClick={() => { setSurahNum(idx + 1); setShowList(false); setSearch('') }}
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 12, 
                        padding: '12px 16px', 
                        border: 'none', 
                        borderBottom: '1px solid #f8fafc', 
                        background: surahNum === idx + 1 ? '#eff6ff' : '#fff', 
                        cursor: 'pointer', 
                        textAlign: 'right' 
                      }}>
                      <span style={{ 
                        width: 28, 
                        height: 28, 
                        background: '#f1f5f9', 
                        borderRadius: 8, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: 11, 
                        fontWeight: 700, 
                        color: '#64748b' 
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{name}</span>
                      <span style={{ marginRight: 'auto', fontSize: 11, color: '#94a3b8' }}>{surahAyahCount[idx]} آية</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Surah nav arrows */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button 
              onClick={() => setSurahNum(n => Math.max(1, n - 1))} 
              disabled={surahNum === 1}
              style={{ 
                flex: 1, 
                padding: 10, 
                background: '#f1f5f9', 
                color: '#475569', 
                border: 'none', 
                borderRadius: 12, 
                fontWeight: 600, 
                fontSize: 13, 
                cursor: 'pointer', 
                opacity: surahNum === 1 ? 0.3 : 1 
              }}>
              ← السابقة
            </button>
            <button 
              onClick={() => setSurahNum(n => Math.min(114, n + 1))} 
              disabled={surahNum === 114}
              style={{ 
                flex: 1, 
                padding: 10, 
                background: '#f1f5f9', 
                color: '#475569', 
                border: 'none', 
                borderRadius: 12, 
                fontWeight: 600, 
                fontSize: 13, 
                cursor: 'pointer', 
                opacity: surahNum === 114 ? 0.3 : 1 
              }}>
              التالية →
            </button>
          </div>

          {/* Bismillah */}
          {surahNum !== 9 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '16px 0', 
              marginBottom: 16, 
              background: 'linear-gradient(135deg,#eff6ff,#eef2ff,#eff6ff)', 
              borderRadius: 16 
            }}>
              <p style={{ fontSize: 24, color: '#1e40af', fontFamily: amiri, margin: 0 }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {loadingSurah ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                border: '4px solid #bfdbfe', 
                borderTop: '4px solid #2563eb', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite', 
                margin: '0 auto 16px' 
              }} />
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>جاري تحميل السورة...</p>
            </div>
          ) : (
            <>
              {totalSurahPages > 1 && (
                <div style={{ textAlign: 'center', marginBottom: 12, fontSize: 13, color: '#64748b' }}>
                  صفحة {surahPage} من {totalSurahPages} — آيات {(surahPage - 1) * AYAHS_PER_SURAH_PAGE + 1} إلى {Math.min(surahPage * AYAHS_PER_SURAH_PAGE, ayahs.length)}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {displayedSurahAyahs.map(ayah => (
                  <AyahBlock 
                    key={ayah.number} 
                    ayah={ayah} 
                    globalNum={ayah.number} 
                    ayahInSurah={ayah.numberInSurah} 
                  />
                ))}
              </div>
              {totalSurahPages > 1 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                    {Array.from({ length: totalSurahPages }, (_, i) => i + 1).map(p => (
                      <button 
                        key={p} 
                        onClick={() => setSurahPage(p)}
                        style={{ 
                          width: 36, 
                          height: 36, 
                          borderRadius: 10, 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontWeight: 700, 
                          fontSize: 13,
                          background: surahPage === p ? '#2563eb' : '#f1f5f9',
                          color: surahPage === p ? '#fff' : '#475569' 
                        }}>
                        {p}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button 
                      onClick={() => setSurahPage(p => Math.max(1, p - 1))} 
                      disabled={surahPage === 1}
                      style={{ 
                        flex: 1, 
                        padding: 10, 
                        background: '#eff6ff', 
                        color: '#2563eb', 
                        border: 'none', 
                        borderRadius: 12, 
                        fontWeight: 600, 
                        fontSize: 13, 
                        cursor: 'pointer', 
                        opacity: surahPage === 1 ? 0.3 : 1 
                      }}>
                      ← السابقة
                    </button>
                    <button 
                      onClick={() => setSurahPage(p => Math.min(totalSurahPages, p + 1))} 
                      disabled={surahPage === totalSurahPages}
                      style={{ 
                        flex: 1, 
                        padding: 10, 
                        background: '#eff6ff', 
                        color: '#2563eb', 
                        border: 'none', 
                        borderRadius: 12, 
                        fontWeight: 600, 
                        fontSize: 13, 
                        cursor: 'pointer', 
                        opacity: surahPage === totalSurahPages ? 0.3 : 1 
                      }}>
                      التالية →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

// ========== Tasbeeh ==========
function Tasbeeh() {
  const [sel, setSel] = useState(0)
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(() => { 
    try { return parseInt(localStorage.getItem('tasbeeh_total') || '0') } 
    catch { return 0 } 
  })
  const [done, setDone] = useState(false)
  const [vibrate, setVibrate] = useState(false)
  
  const cur = tasbeehOptions[sel]
  const pct = (count / cur.target) * 100
  const circ = 2 * Math.PI * 100

  const handleClick = () => {
    if (count >= cur.target) return
    const n = count + 1
    setCount(n)
    const t = total + 1
    setTotal(t)
    try { localStorage.setItem('tasbeeh_total', t.toString()) } catch {}
    
    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }
    setVibrate(true)
    setTimeout(() => setVibrate(false), 100)
    
    if (n >= cur.target) { 
      setDone(true)
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
      setTimeout(() => setDone(false), 2000) 
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <span style={styles.badge('#ecfdf5', '#047857')}>📿 المسبحة الإلكترونية</span>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {tasbeehOptions.map((o, i) => (
          <button 
            key={i} 
            onClick={() => { setSel(i); setCount(0) }}
            style={{ 
              padding: '8px 16px', 
              borderRadius: 999, 
              fontSize: 13, 
              fontWeight: 600, 
              border: 'none', 
              cursor: 'pointer', 
              background: sel === i ? '#059669' : '#f1f5f9', 
              color: sel === i ? '#fff' : '#374151',
              transition: 'all 0.2s'
            }}>
            {o.text}
          </button>
        ))}
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
        <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="120" cy="120" r="100" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle 
            cx="120" 
            cy="120" 
            r="100" 
            stroke="#10b981" 
            strokeWidth="12" 
            fill="none"
            strokeLinecap="round" 
            strokeDasharray={circ} 
            strokeDashoffset={circ * (1 - pct / 100)}
            style={{ transition: 'stroke-dashoffset 0.3s' }} 
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ fontFamily: amiri, fontSize: 22, fontWeight: 700, color: '#047857', marginBottom: 4 }}>
            {cur.text}
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>من {cur.target}</div>
        </div>
      </div>
      
      <button 
        onClick={handleClick}
        style={{ 
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg,#34d399,#059669)', 
          color: '#fff', 
          border: 'none', 
          fontSize: 32, 
          cursor: 'pointer', 
          boxShadow: '0 8px 24px rgba(5,150,105,0.4)', 
          margin: '0 auto 20px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: vibrate ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s'
        }}>
        📿
      </button>
      
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setCount(0)} style={styles.btn('#f1f5f9', '#374151')}>إعادة</button>
        <div style={{ background: '#f8fafc', borderRadius: 12, padding: '10px 20px' }}>
          <div style={{ fontSize: 11, color: '#64748b' }}>الإجمالي</div>
          <div style={{ fontWeight: 700, color: '#059669', fontSize: 18 }}>{total.toLocaleString('ar-EG')}</div>
        </div>
      </div>
      
      {done && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'rgba(0,0,0,0.5)', 
          zIndex: 50 
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#047857', marginBottom: 8, margin: '0 0 8px' }}>ما شاء الله!</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>أتممت {cur.target} تسبيحة</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== Eid Takbeer (with audio) ==========
function EidTakbeer() {
  const [selectedTakbeer, setSelectedTakbeer] = useState(0)
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [selectedDua, setSelectedDua] = useState(0)
  const [duaCopied, setDuaCopied] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [loopActive, setLoopActive] = useState(false)
  const loopRef = useRef(false)

  const copyText = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true)
      setTimeout(() => setter(false), 2000)
    }).catch(() => {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setter(true)
      setTimeout(() => setter(false), 2000)
    })
  }

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    const utter = new SpeechSynthesisUtterance(eidTakbeerOptions[selectedTakbeer].text)
    utter.lang = 'ar-SA'
    utter.rate = 0.7
    utter.pitch = 1.1
    const voices = window.speechSynthesis.getVoices()
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'))
    if (arabicVoice) utter.voice = arabicVoice
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
  }

  const speakOnce = useCallback(() => {
    if (!loopRef.current) return
    const utter = new SpeechSynthesisUtterance(eidTakbeerOptions[selectedTakbeer].text)
    utter.lang = 'ar-SA'
    utter.rate = 0.7
    utter.pitch = 1.1
    const voices = window.speechSynthesis.getVoices()
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'))
    if (arabicVoice) utter.voice = arabicVoice
    utter.onend = () => {
      if (loopRef.current) setTimeout(() => speakOnce(), 1000)
    }
    utter.onerror = () => {
      loopRef.current = false
      setLoopActive(false)
    }
    window.speechSynthesis.speak(utter)
  }, [selectedTakbeer])

  const handleLoop = () => {
    if (loopActive) {
      loopRef.current = false
      setLoopActive(false)
      window.speechSynthesis.cancel()
      return
    }
    loopRef.current = true
    setLoopActive(true)
    speakOnce()
  }

  const selectTakbeer = (i: number) => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
    loopRef.current = false
    setLoopActive(false)
    setSelectedTakbeer(i)
    setCount(0)
  }

  const opt = eidTakbeerOptions[selectedTakbeer]

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#fff7ed', '#c2410c')}>🌙 تكبيرات العيد</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {eidTakbeerOptions.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => selectTakbeer(i)}
            style={{ 
              padding: '10px 8px', 
              borderRadius: 12, 
              border: selectedTakbeer === i ? `2px solid ${opt.color}` : '2px solid #e5e7eb',
              fontWeight: 600, 
              fontSize: 13, 
              cursor: 'pointer',
              background: selectedTakbeer === i ? opt.bg : '#fff',
              color: selectedTakbeer === i ? opt.color : '#374151',
              transition: 'all 0.2s'
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ 
        background: opt.bg, 
        border: `2px solid ${opt.border}`, 
        borderRadius: 16, 
        padding: 20, 
        marginBottom: 16 
      }}>
        <p style={{ 
          fontFamily: amiri, 
          fontSize: 22, 
          color: opt.color, 
          lineHeight: 2.2, 
          textAlign: 'center', 
          margin: 0 
        }}>
          {opt.text}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        <button 
          onClick={handleSpeak}
          style={{ 
            padding: '12px 8px', 
            borderRadius: 12, 
            border: 'none', 
            fontWeight: 700, 
            fontSize: 13, 
            cursor: 'pointer',
            background: speaking ? '#dc2626' : 'linear-gradient(135deg,#3b82f6,#1d4ed8)', 
            color: '#fff',
            boxShadow: speaking ? '0 4px 12px rgba(220,38,38,0.35)' : '0 4px 12px rgba(29,78,216,0.35)' 
          }}>
          {speaking ? '⏹ إيقاف' : '🔊 استماع'}
        </button>
        <button 
          onClick={handleLoop}
          style={{ 
            padding: '12px 8px', 
            borderRadius: 12, 
            border: 'none', 
            fontWeight: 700, 
            fontSize: 13, 
            cursor: 'pointer',
            background: loopActive ? '#7c3aed' : '#f1f5f9',
            color: loopActive ? '#fff' : '#374151',
            boxShadow: loopActive ? '0 4px 12px rgba(124,58,237,0.35)' : 'none' 
          }}>
          {loopActive ? '🔁 إيقاف التكرار' : '🔁 تكرار'}
        </button>
        <button 
          onClick={() => copyText(opt.text, setCopied)}
          style={{ 
            padding: '12px 8px', 
            borderRadius: 12, 
            border: 'none', 
            fontWeight: 700, 
            fontSize: 13, 
            cursor: 'pointer',
            background: copied ? '#059669' : '#f1f5f9', 
            color: copied ? '#fff' : '#374151',
            transition: 'all 0.2s'
          }}>
          {copied ? '✅ تم' : '📋 نسخ'}
        </button>
      </div>

      <div style={{ 
        background: '#f0fdf4', 
        borderRadius: 10, 
        padding: '8px 14px', 
        marginBottom: 16, 
        fontSize: 12, 
        color: '#065f46', 
        textAlign: 'center' 
      }}>
        💡 الصوت يعتمد على محرك النص الموجود في جهازك — قد يختلف الصوت من جهاز لآخر
      </div>

      <div style={{ 
        background: opt.bg, 
        border: `1px solid ${opt.border}`, 
        borderRadius: 16, 
        padding: 20, 
        textAlign: 'center', 
        marginBottom: 20 
      }}>
        <div style={{ fontSize: 13, color: opt.color, marginBottom: 8, fontWeight: 700 }}>عداد التكبير</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: opt.color, marginBottom: 16, lineHeight: 1 }}>
          {count}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button 
            onClick={() => setCount(c => c + 1)}
            style={{ 
              width: 72, 
              height: 72, 
              borderRadius: '50%', 
              background: `linear-gradient(135deg,${opt.color},${opt.color}cc)`, 
              color: '#fff', 
              border: 'none', 
              fontSize: 30, 
              cursor: 'pointer', 
              boxShadow: `0 4px 16px ${opt.color}55`,
              transition: 'transform 0.1s'
            }}>
            🌙
          </button>
          <button 
            onClick={() => setCount(0)}
            style={{ 
              padding: '0 20px', 
              borderRadius: 12, 
              background: '#f1f5f9', 
              color: '#374151', 
              border: 'none', 
              fontWeight: 600, 
              cursor: 'pointer', 
              fontSize: 13 
            }}>
            إعادة
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', 
        borderRadius: 16, 
        padding: 20, 
        border: '1px solid #6ee7b7' 
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#065f46', marginBottom: 12 }}>🤲 أدعية العيد</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {eidDuas.map((d, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedDua(i)}
              style={{ 
                padding: '6px 12px', 
                borderRadius: 999, 
                fontSize: 12, 
                fontWeight: 600, 
                border: 'none', 
                cursor: 'pointer',
                background: selectedDua === i ? '#059669' : '#f0fdf4', 
                color: selectedDua === i ? '#fff' : '#047857',
                transition: 'all 0.2s'
              }}>
              {d.label}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: amiri, fontSize: 18, color: '#065f46', lineHeight: 2, marginBottom: 12, margin: '0 0 12px' }}>
          {eidDuas[selectedDua].text}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            onClick={() => speakArabic(eidDuas[selectedDua].text)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: 10, 
              border: 'none', 
              fontWeight: 600, 
              fontSize: 13, 
              cursor: 'pointer', 
              background: '#dcfce7', 
              color: '#065f46' 
            }}>
            🔊 استماع
          </button>
          <button 
            onClick={() => copyText(eidDuas[selectedDua].text, setDuaCopied)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: 10, 
              border: 'none', 
              fontWeight: 600, 
              fontSize: 13, 
              cursor: 'pointer',
              background: duaCopied ? '#059669' : '#dcfce7', 
              color: duaCopied ? '#fff' : '#065f46',
              transition: 'all 0.2s'
            }}>
            {duaCopied ? '✅ تم النسخ!' : '📋 نسخ'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ========== Khatma ==========
function Khatma() {
  const [view, setView] = useState<'juz' | 'surah'>('juz')
  const [cJuz, setCJuz] = useState<boolean[]>(() => { 
    try { 
      const stored = JSON.parse(localStorage.getItem('khatma_juz') || '[]')
      return stored.length === 30 ? stored : Array(30).fill(false)
    } catch { return Array(30).fill(false) } 
  })
  const [cSur, setCSur] = useState<boolean[]>(() => { 
    try { 
      const stored = JSON.parse(localStorage.getItem('khatma_surahs') || '[]')
      return stored.length === 114 ? stored : Array(114).fill(false)
    } catch { return Array(114).fill(false) } 
  })

  useEffect(() => { 
    try { localStorage.setItem('khatma_juz', JSON.stringify(cJuz)) } catch {} 
  }, [cJuz])
  
  useEffect(() => { 
    try { localStorage.setItem('khatma_surahs', JSON.stringify(cSur)) } catch {} 
  }, [cSur])

  const toggleJ = (i: number) => { 
    const c = [...cJuz]
    c[i] = !c[i]
    setCJuz(c) 
  }
  
  const toggleS = (i: number) => { 
    const c = [...cSur]
    c[i] = !c[i]
    setCSur(c) 
  }

  const resetProgress = () => {
    if (view === 'juz') {
      setCJuz(Array(30).fill(false))
    } else {
      setCSur(Array(114).fill(false))
    }
  }

  const jN = cJuz.filter(Boolean).length
  const sN = cSur.filter(Boolean).length
  const pct = view === 'juz' ? (jN / 30) * 100 : (sN / 114) * 100

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#fffbeb', '#b45309')}>✅ ختمة القرآن الكريم</span>
      </div>
      
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['juz', 'surah'] as const).map(v => (
          <button 
            key={v} 
            onClick={() => setView(v)}
            style={{ 
              flex: 1, 
              padding: 12, 
              borderRadius: 12, 
              fontWeight: 600, 
              fontSize: 14, 
              border: 'none', 
              cursor: 'pointer',
              background: view === v ? '#d97706' : '#f1f5f9', 
              color: view === v ? '#fff' : '#374151',
              transition: 'all 0.2s'
            }}>
            {v === 'juz' ? `الأجزاء (${jN}/30)` : `السور (${sN}/114)`}
          </button>
        ))}
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
          <span style={{ color: '#6b7280' }}>التقدم</span>
          <strong style={{ color: '#b45309' }}>{Math.round(pct)}%</strong>
        </div>
        <div style={{ height: 16, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            background: 'linear-gradient(to left,#f59e0b,#d97706)', 
            borderRadius: 999, 
            width: `${pct}%`, 
            transition: 'width 0.5s' 
          }} />
        </div>
      </div>

      {pct === 100 && (
        <div style={{ 
          background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', 
          borderRadius: 12, 
          padding: 16, 
          textAlign: 'center', 
          marginBottom: 16,
          border: '1px solid #6ee7b7'
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
          <div style={{ fontWeight: 700, color: '#047857', fontSize: 16 }}>
            ما شاء الله! أتممت الختمة
          </div>
        </div>
      )}

      <button 
        onClick={resetProgress}
        style={{ 
          width: '100%', 
          padding: 10, 
          marginBottom: 16, 
          borderRadius: 10, 
          background: '#fef2f2', 
          color: '#dc2626', 
          border: 'none', 
          fontWeight: 600, 
          cursor: 'pointer',
          fontSize: 13
        }}>
        🔄 إعادة تعيين {view === 'juz' ? 'الأجزاء' : 'السور'}
      </button>
      
      <div style={{ maxHeight: 380, overflowY: 'auto' }}>
        {view === 'juz' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <button 
                key={i} 
                onClick={() => toggleJ(i)}
                style={{ 
                  position: 'relative', 
                  padding: 12, 
                  borderRadius: 12, 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  border: cJuz[i] ? '2px solid #34d399' : '2px solid #e5e7eb', 
                  background: cJuz[i] ? '#ecfdf5' : '#fff', 
                  color: cJuz[i] ? '#047857' : '#374151',
                  transition: 'all 0.2s'
                }}>
                {cJuz[i] && (
                  <div style={{ 
                    position: 'absolute', 
                    top: -4, 
                    left: -4, 
                    width: 18, 
                    height: 18, 
                    background: '#10b981', 
                    borderRadius: '50%', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: 10 
                  }}>
                    ✓
                  </div>
                )}
                <div style={{ fontWeight: 700 }}>{i + 1}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {surahNames.map((name, i) => (
              <button 
                key={i} 
                onClick={() => toggleS(i)}
                style={{ 
                  position: 'relative', 
                  padding: 8, 
                  borderRadius: 10, 
                  textAlign: 'center', 
                  fontSize: 13, 
                  cursor: 'pointer',
                  border: cSur[i] ? '2px solid #34d399' : '1px solid #e5e7eb', 
                  background: cSur[i] ? '#ecfdf5' : '#fff', 
                  color: cSur[i] ? '#047857' : '#374151', 
                  fontWeight: cSur[i] ? 600 : 400,
                  transition: 'all 0.2s'
                }}>
                {cSur[i] && (
                  <span style={{ position: 'absolute', top: 2, left: 4, color: '#10b981', fontSize: 10 }}>✓</span>
                )}
                <span style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>{i + 1}</span>
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ========== Quiz ==========
function Quiz() {
  const [st, setSt] = useState<'idle' | 'play' | 'end'>('idle')
  const [cur, setCur] = useState(0)
  const [score, setScore] = useState(0)
  const [sel, setSel] = useState<number | null>(null)
  const [show, setShow] = useState(false)
  const [time, setTime] = useState(15)
  const [hi, setHi] = useState(() => { 
    try { return parseInt(localStorage.getItem('quiz_hi') || '0') } 
    catch { return 0 } 
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const answer = useCallback((idx: number) => {
    if (show) return
    setSel(idx)
    setShow(true)
    const ok = idx === quizQuestions[cur].correct
    if (ok) setScore(s => s + 1)
    setTimeout(() => {
      if (cur < quizQuestions.length - 1) { 
        setCur(c => c + 1)
        setSel(null)
        setShow(false)
        setTime(15) 
      } else {
        const f = ok ? score + 1 : score
        if (f > hi) { 
          setHi(f)
          try { localStorage.setItem('quiz_hi', f.toString()) } catch {} 
        }
        setSt('end')
      }
    }, 1500)
  }, [show, cur, score, hi])

  useEffect(() => {
    if (st === 'play' && !show && time > 0) {
      timerRef.current = setTimeout(() => setTime(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }
    if (st === 'play' && time === 0 && !show) answer(-1)
  }, [time, st, show, answer])

  const start = () => { 
    setCur(0)
    setScore(0)
    setSel(null)
    setShow(false)
    setTime(15)
    setSt('play') 
  }

  if (st === 'idle') return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 24 }}>
        <span style={styles.badge('#faf5ff', '#7c3aed')}>🧠 مسابقة ختمة القرآن</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{ background: 'linear-gradient(135deg,#faf5ff,#eef2ff)', padding: 20, borderRadius: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#7c3aed' }}>{hi}</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>أعلى نتيجة</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#fffbeb,#fff7ed)', padding: 20, borderRadius: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#b45309' }}>{quizQuestions.length}</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>سؤال</div>
        </div>
      </div>
      <button onClick={start} style={styles.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>
        ابدأ المسابقة 🚀
      </button>
    </div>
  )

  if (st === 'end') {
    const p = (score / quizQuestions.length) * 100
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{p >= 70 ? '🏆' : p >= 50 ? '⭐' : '💪'}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8, margin: '0 0 8px' }}>النتيجة</h2>
        <div style={{ background: 'linear-gradient(135deg,#faf5ff,#eef2ff)', borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#7c3aed', marginBottom: 8 }}>{score}/{quizQuestions.length}</div>
          <div style={{ color: '#6b7280' }}>إجابة صحيحة</div>
        </div>
        <button onClick={start} style={styles.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>
          جولة جديدة 🔄
        </button>
        <button 
          onClick={() => setSt('idle')} 
          style={{ ...styles.btnFull('#f1f5f9', '#374151'), marginTop: 12 }}>
          القائمة
        </button>
      </div>
    )
  }

  const q = quizQuestions[cur]
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
        <span style={{ color: '#6b7280' }}>السؤال {cur + 1}/{quizQuestions.length}</span>
        <strong style={{ color: '#7c3aed' }}>النتيجة: {score}</strong>
      </div>
      <div style={{ height: 10, background: '#f1f5f9', borderRadius: 999, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          background: 'linear-gradient(to right,#a78bfa,#7c3aed)', 
          borderRadius: 999, 
          width: `${((cur + 1) / quizQuestions.length) * 100}%`, 
          transition: 'width 0.3s' 
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{ 
          width: 56, 
          height: 56, 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: 22, 
          fontWeight: 700,
          border: `4px solid ${time <= 5 ? '#f87171' : '#a78bfa'}`, 
          color: time <= 5 ? '#ef4444' : '#7c3aed', 
          background: time <= 5 ? '#fef2f2' : '#faf5ff',
          animation: time <= 5 ? 'pulse 1s infinite' : 'none'
        }}>
          {time}
        </div>
      </div>
      <div style={{ 
        background: 'linear-gradient(135deg,#faf5ff,#eef2ff)', 
        borderRadius: 16, 
        padding: 20, 
        marginBottom: 20, 
        textAlign: 'center' 
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', lineHeight: 1.6, margin: 0 }}>{q.q}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((o, i) => {
          let bg = '#fff', bdr = '#e5e7eb', clr = '#374151'
          if (show) {
            if (i === q.correct) { bg = '#ecfdf5'; bdr = '#34d399'; clr = '#047857' }
            else if (i === sel) { bg = '#fef2f2'; bdr = '#f87171'; clr = '#dc2626' }
            else { bg = '#f9fafb'; bdr = '#e5e7eb'; clr = '#9ca3af' }
          }
          return (
            <button 
              key={i} 
              onClick={() => answer(i)} 
              disabled={show}
              style={{ 
                width: '100%', 
                padding: 16, 
                borderRadius: 12, 
                background: bg, 
                border: `2px solid ${bdr}`, 
                color: clr, 
                fontWeight: 600, 
                cursor: show ? 'default' : 'pointer', 
                textAlign: 'right', 
                fontSize: 15,
                transition: 'all 0.2s'
              }}>
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ========== Dua Slider ==========
function DuaSlider() {
  const [cur, setCur] = useState(0)
  const [vis, setVis] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVis(false)
      setTimeout(() => { 
        setCur(c => (c + 1) % duas.length)
        setVis(true) 
      }, 500)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ 
      background: 'linear-gradient(135deg,#059669,#0d9488,#065f46)', 
      borderRadius: 16, 
      padding: '24px 20px', 
      marginBottom: 24, 
      position: 'relative', 
      overflow: 'hidden', 
      boxShadow: '0 10px 30px rgba(5,150,105,0.3)' 
    }}>
      <div style={{ position: 'absolute', top: 8, right: 16, fontSize: 48, opacity: 0.1, color: '#fff' }}>✦</div>
      <div style={{ position: 'absolute', bottom: 8, left: 16, fontSize: 32, opacity: 0.1, color: '#fff' }}>✦</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: '#a7f3d0', fontSize: 14, fontWeight: 600 }}>🤲 دعاء</span>
        </div>
        <p style={{ 
          color: '#fff', 
          fontSize: 20, 
          lineHeight: 1.8, 
          textAlign: 'center', 
          minHeight: 80, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontFamily: amiri, 
          transition: 'all 0.5s', 
          opacity: vis ? 1 : 0, 
          transform: vis ? 'translateY(0)' : 'translateY(16px)',
          margin: 0
        }}>
          {duas[cur]}
        </p>
      </div>
    </div>
  )
}

// ========== Main App ==========
type Tab = 'tasbeeh' | 'quran' | 'khatma' | 'quiz' | 'eid'

const tabConfig: { id: Tab; label: string; icon: string; bg: string }[] = [
  { id: 'tasbeeh', label: 'المسبحة', icon: '📿', bg: '#059669' },
  { id: 'quran', label: 'القرآن', icon: '📖', bg: '#2563eb' },
  { id: 'khatma', label: 'الختمة', icon: '✅', bg: '#d97706' },
  { id: 'quiz', label: 'مسابقة', icon: '🧠', bg: '#7c3aed' },
  { id: 'eid', label: 'العيد', icon: '🌙', bg: '#dc2626' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('tasbeeh')

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom,#ecfdf5,#ffffff,#fffbeb)', 
      direction: 'rtl', 
      fontFamily: cairo 
    }}>
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 40, 
        background: 'rgba(255,255,255,0.85)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid #d1fae5' 
      }}>
        <div style={{ 
          maxWidth: 512, 
          margin: '0 auto', 
          padding: '12px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <h1 style={{ 
            fontSize: 20, 
            fontWeight: 700, 
            color: '#065f46', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            margin: 0 
          }}>
            <span style={{ fontSize: 28 }}>☪️</span> ذِكْر
          </h1>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg,#34d399,#059669)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(5,150,105,0.3)', 
            fontSize: 20 
          }}>
            🕌
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 512, margin: '0 auto', padding: '24px 16px' }}>
        <DuaSlider />
        
        <div style={{ 
          display: 'flex', 
          background: '#fff', 
          borderRadius: 16, 
          padding: 6, 
          marginBottom: 24, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
          gap: 4 
        }}>
          {tabConfig.map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)}
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2, 
                padding: '10px 0', 
                borderRadius: 12, 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: 600, 
                fontSize: 11,
                background: tab === t.id ? t.bg : 'transparent', 
                color: tab === t.id ? '#fff' : '#6b7280', 
                boxShadow: tab === t.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none', 
                transition: 'all 0.2s' 
              }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div style={styles.card}>
          {tab === 'tasbeeh' && <Tasbeeh />}
          {tab === 'quran' && <QuranReader />}
          {tab === 'khatma' && <Khatma />}
          {tab === 'quiz' && <Quiz />}
          {tab === 'eid' && <EidTakbeer />}
        </div>

        <footer style={{ textAlign: 'center', marginTop: 32, paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: '#9ca3af', fontFamily: amiri, marginBottom: 8, margin: '0 0 8px' }}>
            ❝ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ❞
          </p>
          <p style={{ fontSize: 12, color: '#d1d5db', marginBottom: 16, margin: '0 0 16px' }}>سورة الرعد - آية 28</p>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            padding: '8px 16px', 
            borderRadius: 12, 
            background: 'linear-gradient(135deg,rgba(5,150,105,0.08),rgba(124,58,237,0.08))', 
            border: '1px solid rgba(5,150,105,0.15)' 
          }}>
            <span>💻</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>تم التطوير بواسطة</span>
            <a 
              href="https://abdo-oraby.myftp.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                background: 'linear-gradient(135deg,#059669,#7c3aed)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                textDecoration: 'none' 
              }}>
              Abdo Oraby
            </a>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes spin { 
          from { transform: rotate(0deg) } 
          to { transform: rotate(360deg) } 
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }
        html {
          scroll-behavior: smooth;
        }
        body { 
          margin: 0; 
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        button { 
          font-family: inherit; 
        }
        button:active {
          transform: scale(0.98);
        }
        ::-webkit-scrollbar { 
          width: 4px; 
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb { 
          background: #d1d5db; 
          border-radius: 4px; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}
