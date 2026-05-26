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
    text: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ، اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا',
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

// أذكار الصباح والمساء مع روابط الصوت
const azkarCategories = [
  {
    id: 'morning',
    name: 'أذكار الصباح',
    icon: '🌅',
    color: '#f59e0b',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/034.mp3'
  },
  {
    id: 'evening',
    name: 'أذكار المساء',
    icon: '🌙',
    color: '#6366f1',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/035.mp3'
  },
  {
    id: 'sleep',
    name: 'أذكار النوم',
    icon: '😴',
    color: '#8b5cf6',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/036.mp3'
  },
  {
    id: 'wakeup',
    name: 'أذكار الاستيقاظ',
    icon: '☀️',
    color: '#ec4899',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/037.mp3'
  },
  {
    id: 'afterprayer',
    name: 'أذكار بعد الصلاة',
    icon: '🕌',
    color: '#10b981',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/038.mp3'
  },
]

// أدعية مأثورة مع روابط صوت
const duasList = [
  {
    id: 1,
    title: 'دعاء ختم القرآن',
    text: 'اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/064.mp3'
  },
  {
    id: 2,
    title: 'دعاء السفر',
    text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/042.mp3'
  },
  {
    id: 3,
    title: 'دعاء الاستخارة',
    text: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/051.mp3'
  },
  {
    id: 4,
    title: 'دعاء دخول المسجد',
    text: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/018.mp3'
  },
  {
    id: 5,
    title: 'دعاء الخروج من المنزل',
    text: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    audioUrl: 'https://download.tvquran.com/download/selections/azkar/016.mp3'
  },
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

// قائمة القراء المتاحين
const reciters = [
  { id: 'alafasy', name: 'مشاري العفاسي', folder: 'Alafasy_128kbps', surahEdition: 'ar.alafasy' },
  { id: 'abdulbasit', name: 'عبد الباسط عبد الصمد', folder: 'Abdul_Basit_Murattal_192kbps', surahEdition: 'ar.abdulbasitmurattal' },
  { id: 'husary', name: 'محمود خليل الحصري', folder: 'Husary_128kbps', surahEdition: 'ar.husary' },
  { id: 'minshawi', name: 'محمد صديق المنشاوي', folder: 'Minshawy_Murattal_128kbps', surahEdition: 'ar.minshawi' },
  { id: 'sudais', name: 'عبد الرحمن السديس', folder: 'Sudais_128kbps', surahEdition: 'ar.sudais' },
  { id: 'shuraym', name: 'سعود الشريم', folder: 'Shuraym_128kbps', surahEdition: 'ar.shuraym' },
  { id: 'maher', name: 'ماهر المعيقلي', folder: 'MaherAlMuaiqly128kbps', surahEdition: 'ar.mahermuaiqly' },
  { id: 'ajamy', name: 'أحمد العجمي', folder: 'Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net', surahEdition: 'ar.ahmedajamy' },
]

const quizQuestions = [
  { q: 'كم عدد سور القرآن الكريم؟', options: ['112','113','114','115'], correct: 2 },
  { q: 'ما هي أطول سورة في القرآن؟', options: ['آل عمران','البقرة','النساء','المائدة'], correct: 1 },
  { q: 'ما هي أقصر سورة في القرآن؟', options: ['الكوثر','الإخلاص','الفلق','الناس'], correct: 0 },
  { q: 'كم عدد أجزاء القرآن؟', options: ['28','29','30','31'], correct: 2 },
  { q: 'في أي سورة آية الكرسي؟', options: ['آل عمران','البقرة','النساء','المائدة'], correct: 1 },
  { q: 'ما السورة التي تسمى قلب القرآن؟', options: ['يس','الرحمن','الملك','الكهف'], correct: 0 },
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

// ========== Mushaf Quran Reader ==========
const TOTAL_PAGES = 604

type PageAyah = {
  number: number
  numberInSurah: number
  text: string
  surah: { number: number; name: string }
}

function MushafReader() {
  const [pageNum, setPageNum] = useState(1)
  const [pageData, setPageData] = useState<PageAyah[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAyah, setSelectedAyah] = useState<PageAyah | null>(null)
  const [tafseer, setTafseer] = useState<string>('')
  const [loadingTafseer, setLoadingTafseer] = useState(false)
  const [selectedReciter, setSelectedReciter] = useState(reciters[0])
  const [, setIsPlaying] = useState(false)
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [showReciterList, setShowReciterList] = useState(false)
  const [surahAudioPlaying, setSurahAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const surahAudioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoading(true)
    setSelectedAyah(null)
    setTafseer('')
    fetch(`https://api.alquran.cloud/v1/page/${pageNum}/quran-uthmani`)
      .then(r => r.json())
      .then(d => {
        if (d.code === 200) setPageData(d.data.ayahs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [pageNum])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayingAyah(null)
      setIsPlaying(false)
    }
    if (surahAudioRef.current) {
      surahAudioRef.current.pause()
      setSurahAudioPlaying(false)
    }
  }, [pageNum])

  const loadTafseer = async (ayah: PageAyah) => {
    setSelectedAyah(ayah)
    setLoadingTafseer(true)
    try {
      const r = await fetch(`https://api.alquran.cloud/v1/ayah/${ayah.number}/ar.muyassar`)
      const d = await r.json()
      if (d.code === 200 && d.data?.text) {
        setTafseer(d.data.text)
      } else {
        setTafseer('تعذر تحميل التفسير')
      }
    } catch {
      setTafseer('تعذر تحميل التفسير')
    }
    setLoadingTafseer(false)
  }

  const playAyah = async (ayah: PageAyah) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    if (playingAyah === ayah.number) {
      setPlayingAyah(null)
      setIsPlaying(false)
      return
    }

    const surahStr = ayah.surah.number.toString().padStart(3, '0')
    const ayahStr = ayah.numberInSurah.toString().padStart(3, '0')
    const audioUrl = `https://everyayah.com/data/${selectedReciter.folder}/${surahStr}${ayahStr}.mp3`
    
    audioRef.current = new Audio(audioUrl)
    setPlayingAyah(ayah.number)
    setIsPlaying(true)

    audioRef.current.onended = () => {
      setPlayingAyah(null)
      setIsPlaying(false)
    }
    audioRef.current.onerror = () => {
      setPlayingAyah(null)
      setIsPlaying(false)
    }

    try {
      await audioRef.current.play()
    } catch {
      setPlayingAyah(null)
      setIsPlaying(false)
    }
  }

  const playSurah = async (surahNum: number) => {
    if (surahAudioRef.current) {
      surahAudioRef.current.pause()
    }

    if (surahAudioPlaying) {
      setSurahAudioPlaying(false)
      return
    }

    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter.surahEdition}/${surahNum}.mp3`
    
    surahAudioRef.current = new Audio(audioUrl)
    setSurahAudioPlaying(true)

    surahAudioRef.current.onended = () => setSurahAudioPlaying(false)
    surahAudioRef.current.onerror = () => setSurahAudioPlaying(false)

    try {
      await surahAudioRef.current.play()
    } catch {
      setSurahAudioPlaying(false)
    }
  }

  const groupedBySurah = pageData.reduce<{ surahNum: number; surahName: string; ayahs: PageAyah[] }[]>((acc, ayah) => {
    const last = acc[acc.length - 1]
    if (!last || last.surahNum !== ayah.surah.number) {
      acc.push({ surahNum: ayah.surah.number, surahName: ayah.surah.name, ayahs: [ayah] })
    } else {
      last.ayahs.push(ayah)
    }
    return acc
  }, [])

  const toArabicNumber = (num: number) => {
    const arabicNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
    return num.toString().split('').map(d => arabicNums[parseInt(d)]).join('')
  }

  return (
    <div ref={containerRef}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={styles.badge('#eff6ff', '#1d4ed8')}>📖 المصحف الشريف</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowReciterList(!showReciterList)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            color: '#fff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>🎙️</span>
            <span style={{ fontWeight: 600 }}>{selectedReciter.name}</span>
          </div>
          <span>{showReciterList ? '▲' : '▼'}</span>
        </button>

        {showReciterList && (
          <div style={{ 
            marginTop: 8, 
            background: '#fff', 
            borderRadius: 12, 
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {reciters.map(r => (
              <button
                key={r.id}
                onClick={() => { setSelectedReciter(r); setShowReciterList(false) }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  borderBottom: '1px solid #f1f5f9',
                  background: selectedReciter.id === r.id ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'right',
                  fontWeight: selectedReciter.id === r.id ? 700 : 400,
                  color: selectedReciter.id === r.id ? '#1d4ed8' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                {selectedReciter.id === r.id && <span>✓</span>}
                {r.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        marginBottom: 16,
        background: '#f8fafc',
        padding: 8,
        borderRadius: 12
      }}>
        <button
          onClick={() => setPageNum(p => Math.max(1, p - 1))}
          disabled={pageNum === 1}
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
            opacity: pageNum === 1 ? 0.3 : 1
          }}
        >
          →
        </button>

        <div style={{ 
          flex: 1, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          padding: '10px 16px',
          borderRadius: 10,
          border: '2px solid #d97706'
        }}>
          <div style={{ fontSize: 12, color: '#92400e' }}>الصفحة</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#78350f', fontFamily: amiri }}>
            {toArabicNumber(pageNum)}
          </div>
        </div>

        <button
          onClick={() => setPageNum(p => Math.min(TOTAL_PAGES, p + 1))}
          disabled={pageNum === TOTAL_PAGES}
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
            opacity: pageNum === TOTAL_PAGES ? 0.3 : 1
          }}
        >
          ←
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="number"
          min={1}
          max={604}
          placeholder="رقم الصفحة..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            fontSize: 14,
            textAlign: 'center'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = parseInt((e.target as HTMLInputElement).value)
              if (val >= 1 && val <= 604) {
                setPageNum(val);
                (e.target as HTMLInputElement).value = ''
              }
            }
          }}
        />
        <select
          onChange={(e) => {
            const idx = parseInt(e.target.value)
            const surahPages = [1,2,50,77,106,128,151,177,187,208,221,235,249,255,262,267,282,293,305,312,322,332,342,350,359,367,377,385,392,399,404,411,415,418,428,434,440,453,458,467,477,483,489,496,499,502,507,511,515,518,520,523,526,528,531,534,537,542,545,549,551,553,554,556,558,560,562,564,566,568,570,572,574,575,577,578,580,582,583,585,586,587,587,589,590,591,591,592,593,594,595,595,596,596,597,597,598,598,599,599,600,600,601,601,601,602,602,602,603,603,603,604,604,604]
            if (idx >= 0 && idx < surahPages.length) {
              setPageNum(surahPages[idx])
            }
          }}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            fontSize: 13,
            background: '#fff',
            cursor: 'pointer'
          }}
        >
          <option value="">اختر سورة...</option>
          {surahNames.map((name, i) => (
            <option key={i} value={i}>{i + 1}. {name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{
            width: 50,
            height: 50,
            border: '4px solid #fde68a',
            borderTop: '4px solid #d97706',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#92400e' }}>جاري تحميل الصفحة...</p>
        </div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
          border: '3px solid #d97706',
          borderRadius: 16,
          padding: 20,
          minHeight: 400,
          boxShadow: 'inset 0 0 30px rgba(217, 119, 6, 0.1), 0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 16,
            padding: '8px 0',
            borderBottom: '2px solid #d97706',
            borderTop: '2px solid #d97706'
          }}>
            <span style={{ color: '#92400e', fontSize: 24 }}>۞</span>
          </div>

          {groupedBySurah.map((group, groupIdx) => (
            <div key={groupIdx} style={{ marginBottom: 20 }}>
              {group.ayahs[0].numberInSurah === 1 && (
                <>
                  <div style={{
                    background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                    borderRadius: 12,
                    padding: '12px 20px',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700
                      }}>
                        {group.surahNum}
                      </div>
                      <span style={{ 
                        fontFamily: amiri, 
                        fontSize: 22, 
                        color: '#fff', 
                        fontWeight: 700 
                      }}>
                        سورة {group.surahName}
                      </span>
                    </div>
                    <button
                      onClick={() => playSurah(group.surahNum)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: 'none',
                        background: surahAudioPlaying ? '#dc2626' : 'rgba(255,255,255,0.2)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 12
                      }}
                    >
                      {surahAudioPlaying ? '⏹ إيقاف' : '▶️ تشغيل السورة'}
                    </button>
                  </div>

                  {group.surahNum !== 9 && group.surahNum !== 1 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '12px 0',
                      marginBottom: 12
                    }}>
                      <span style={{ 
                        fontFamily: amiri, 
                        fontSize: 26, 
                        color: '#1e40af' 
                      }}>
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                      </span>
                    </div>
                  )}
                </>
              )}

              <div style={{
                fontFamily: amiri,
                fontSize: 26,
                lineHeight: 2.4,
                textAlign: 'justify',
                color: '#1e293b',
                direction: 'rtl'
              }}>
                {group.ayahs.map((ayah, ayahIdx) => (
                  <span key={ayahIdx}>
                    <span
                      onClick={() => loadTafseer(ayah)}
                      style={{
                        cursor: 'pointer',
                        padding: '4px 2px',
                        borderRadius: 4,
                        background: selectedAyah?.number === ayah.number ? '#bfdbfe' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      {ayah.text}
                    </span>
                    <span 
                      onClick={() => playAyah(ayah)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        background: playingAyah === ayah.number 
                          ? 'linear-gradient(135deg, #dc2626, #ef4444)' 
                          : 'linear-gradient(135deg, #d97706, #f59e0b)',
                        borderRadius: '50%',
                        margin: '0 4px',
                        cursor: 'pointer',
                        fontSize: 14,
                        color: '#fff',
                        fontWeight: 700,
                        verticalAlign: 'middle',
                        boxShadow: '0 2px 6px rgba(217,119,6,0.4)'
                      }}
                    >
                      {playingAyah === ayah.number ? '⏸' : toArabicNumber(ayah.numberInSurah)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            textAlign: 'center',
            marginTop: 16,
            padding: '8px 0',
            borderBottom: '2px solid #d97706',
            borderTop: '2px solid #d97706'
          }}>
            <span style={{ color: '#92400e', fontSize: 24 }}>۞</span>
          </div>
        </div>
      )}

      {selectedAyah && (
        <div style={{
          marginTop: 16,
          background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
          border: '2px solid #10b981',
          borderRadius: 16,
          padding: 20,
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>📜</span>
              <span style={{ fontWeight: 700, color: '#065f46' }}>
                التفسير الميسر - {selectedAyah.surah.name} ({selectedAyah.numberInSurah})
              </span>
            </div>
            <button
              onClick={() => setSelectedAyah(null)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: '#fef2f2',
                color: '#dc2626',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ✕
            </button>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12
          }}>
            <p style={{ 
              fontFamily: amiri, 
              fontSize: 20, 
              color: '#1e40af',
              lineHeight: 2,
              marginBottom: 12
            }}>
              {selectedAyah.text}
            </p>
          </div>

          {loadingTafseer ? (
            <p style={{ color: '#065f46', textAlign: 'center' }}>⏳ جاري تحميل التفسير...</p>
          ) : (
            <p style={{ 
              fontFamily: amiri, 
              fontSize: 16, 
              color: '#374151',
              lineHeight: 2
            }}>
              {tafseer}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={() => playAyah(selectedAyah)}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 10,
                border: 'none',
                background: playingAyah === selectedAyah.number ? '#dc2626' : '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {playingAyah === selectedAyah.number ? '⏹ إيقاف' : '🔊 استماع للآية'}
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={() => setPageNum(p => Math.max(1, p - 1))}
          disabled={pageNum === 1}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 700,
            opacity: pageNum === 1 ? 0.3 : 1
          }}
        >
          → الصفحة السابقة
        </button>
        <button
          onClick={() => setPageNum(p => Math.min(TOTAL_PAGES, p + 1))}
          disabled={pageNum === TOTAL_PAGES}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 700,
            opacity: pageNum === TOTAL_PAGES ? 0.3 : 1
          }}
        >
          الصفحة التالية ←
        </button>
      </div>
    </div>
  )
}

// ========== Azkar & Dua Section ==========
function AzkarDua() {
  const [activeTab, setActiveTab] = useState<'azkar' | 'dua'>('azkar')
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [selectedDua, setSelectedDua] = useState(duasList[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = (url: string, id: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    if (playingAudio === id) {
      setPlayingAudio(null)
      return
    }

    audioRef.current = new Audio(url)
    setPlayingAudio(id)

    audioRef.current.onended = () => setPlayingAudio(null)
    audioRef.current.onerror = () => {
      setPlayingAudio(null)
    }

    audioRef.current.play().catch(() => setPlayingAudio(null))
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayingAudio(null)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#fef3c7', '#d97706')}>🤲 الأذكار والأدعية</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => { setActiveTab('azkar'); stopAudio() }}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: 'none',
            background: activeTab === 'azkar' ? '#d97706' : '#f1f5f9',
            color: activeTab === 'azkar' ? '#fff' : '#374151',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          📿 الأذكار
        </button>
        <button
          onClick={() => { setActiveTab('dua'); stopAudio() }}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            border: 'none',
            background: activeTab === 'dua' ? '#d97706' : '#f1f5f9',
            color: activeTab === 'dua' ? '#fff' : '#374151',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🤲 الأدعية
        </button>
      </div>

      {activeTab === 'azkar' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {azkarCategories.map(cat => (
            <div
              key={cat.id}
              style={{
                background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}08)`,
                border: `2px solid ${cat.color}40`,
                borderRadius: 16,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <span style={{ fontWeight: 700, color: cat.color, fontSize: 16 }}>{cat.name}</span>
              </div>
              <button
                onClick={() => playAudio(cat.audioUrl, cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  background: playingAudio === cat.id ? '#dc2626' : cat.color,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                {playingAudio === cat.id ? '⏹ إيقاف' : '▶️ استماع'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            flexWrap: 'wrap', 
            marginBottom: 16 
          }}>
            {duasList.map(dua => (
              <button
                key={dua.id}
                onClick={() => { setSelectedDua(dua); stopAudio() }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: 'none',
                  background: selectedDua.id === dua.id ? '#d97706' : '#f1f5f9',
                  color: selectedDua.id === dua.id ? '#fff' : '#374151',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                {dua.title}
              </button>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            border: '2px solid #d97706',
            borderRadius: 16,
            padding: 20
          }}>
            <h3 style={{ 
              color: '#92400e', 
              marginBottom: 16, 
              fontSize: 18,
              textAlign: 'center'
            }}>
              {selectedDua.title}
            </h3>
            <p style={{
              fontFamily: amiri,
              fontSize: 22,
              color: '#1e293b',
              lineHeight: 2.2,
              textAlign: 'center',
              marginBottom: 16
            }}>
              {selectedDua.text}
            </p>
            <button
              onClick={() => playAudio(selectedDua.audioUrl, `dua-${selectedDua.id}`)}
              style={{
                width: '100%',
                padding: 14,
                borderRadius: 12,
                border: 'none',
                background: playingAudio === `dua-${selectedDua.id}` 
                  ? '#dc2626' 
                  : 'linear-gradient(135deg, #d97706, #f59e0b)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 16
              }}
            >
              {playingAudio === `dua-${selectedDua.id}` ? '⏹ إيقاف الصوت' : '🔊 استماع للدعاء'}
            </button>
          </div>
        </div>
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
    
    if (navigator.vibrate) navigator.vibrate(30)
    setVibrate(true)
    setTimeout(() => setVibrate(false), 100)
    
    if (n >= cur.target) { 
      setDone(true)
      if (navigator.vibrate) navigator.vibrate([100, 50, 100])
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
              color: sel === i ? '#fff' : '#374151'
            }}>
            {o.text}
          </button>
        ))}
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
        <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="120" cy="120" r="100" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle 
            cx="120" cy="120" r="100" 
            stroke="#10b981" strokeWidth="12" fill="none"
            strokeLinecap="round" 
            strokeDasharray={circ} 
            strokeDashoffset={circ * (1 - pct / 100)}
            style={{ transition: 'stroke-dashoffset 0.3s' }} 
          />
        </svg>
        <div style={{ 
          position: 'absolute', inset: 0, 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          <div style={{ fontFamily: amiri, fontSize: 22, fontWeight: 700, color: '#047857' }}>{cur.text}</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>من {cur.target}</div>
        </div>
      </div>
      
      <button 
        onClick={handleClick}
        style={{ 
          width: 120, height: 120, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg,#34d399,#059669)', 
          color: '#fff', border: 'none', 
          fontSize: 32, cursor: 'pointer', 
          boxShadow: '0 8px 24px rgba(5,150,105,0.4)', 
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: vibrate ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s'
        }}>
        📿
      </button>
      
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setCount(0)} style={styles.btn('#f1f5f9', '#374151')}>إعادة</button>
        <div style={{ background: '#f8fafc', borderRadius: 12, padding: '10px 20px' }}>
          <div style={{ fontSize: 11, color: '#64748b' }}>الإجمالي</div>
          <div style={{ fontWeight: 700, color: '#059669', fontSize: 18 }}>{total.toLocaleString('ar-EG')}</div>
        </div>
      </div>
      
      {done && (
        <div style={{ 
          position: 'fixed', inset: 0, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: 'rgba(0,0,0,0.5)', zIndex: 50 
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#047857', margin: '0 0 8px' }}>ما شاء الله!</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>أتممت {cur.target} تسبيحة</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== Eid Takbeer ==========
function EidTakbeer() {
  const [selectedTakbeer, setSelectedTakbeer] = useState(0)
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const opt = eidTakbeerOptions[selectedTakbeer]

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#fff7ed', '#c2410c')}>🌙 تكبيرات العيد</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {eidTakbeerOptions.map((o, i) => (
          <button 
            key={i} 
            onClick={() => { setSelectedTakbeer(i); setCount(0) }}
            style={{ 
              padding: '10px 8px', borderRadius: 12, 
              border: selectedTakbeer === i ? `2px solid ${o.color}` : '2px solid #e5e7eb',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              background: selectedTakbeer === i ? o.bg : '#fff',
              color: selectedTakbeer === i ? o.color : '#374151'
            }}>
            {o.label}
          </button>
        ))}
      </div>

      <div style={{ 
        background: opt.bg, 
        border: `2px solid ${opt.border}`, 
        borderRadius: 16, padding: 20, marginBottom: 16 
      }}>
        <p style={{ 
          fontFamily: amiri, fontSize: 22, color: opt.color, 
          lineHeight: 2.2, textAlign: 'center', margin: 0 
        }}>
          {opt.text}
        </p>
      </div>

      <button 
        onClick={() => copyText(opt.text)}
        style={{ 
          width: '100%', padding: 14, borderRadius: 12, 
          border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          background: copied ? '#059669' : '#f1f5f9', 
          color: copied ? '#fff' : '#374151', marginBottom: 16
        }}>
        {copied ? '✅ تم النسخ' : '📋 نسخ التكبير'}
      </button>

      <div style={{ 
        background: opt.bg, border: `1px solid ${opt.border}`, 
        borderRadius: 16, padding: 20, textAlign: 'center' 
      }}>
        <div style={{ fontSize: 13, color: opt.color, marginBottom: 8, fontWeight: 700 }}>عداد التكبير</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: opt.color, marginBottom: 16 }}>{count}</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button 
            onClick={() => setCount(c => c + 1)}
            style={{ 
              width: 72, height: 72, borderRadius: '50%', 
              background: `linear-gradient(135deg,${opt.color},${opt.color}cc)`, 
              color: '#fff', border: 'none', fontSize: 30, cursor: 'pointer'
            }}>
            🌙
          </button>
          <button onClick={() => setCount(0)} style={styles.btn('#f1f5f9', '#374151')}>إعادة</button>
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
      const s = JSON.parse(localStorage.getItem('khatma_juz') || '[]')
      return s.length === 30 ? s : Array(30).fill(false)
    } catch { return Array(30).fill(false) } 
  })
  const [cSur, setCSur] = useState<boolean[]>(() => { 
    try { 
      const s = JSON.parse(localStorage.getItem('khatma_surahs') || '[]')
      return s.length === 114 ? s : Array(114).fill(false)
    } catch { return Array(114).fill(false) } 
  })

  useEffect(() => { try { localStorage.setItem('khatma_juz', JSON.stringify(cJuz)) } catch {} }, [cJuz])
  useEffect(() => { try { localStorage.setItem('khatma_surahs', JSON.stringify(cSur)) } catch {} }, [cSur])

  const toggleJ = (i: number) => { const c = [...cJuz]; c[i] = !c[i]; setCJuz(c) }
  const toggleS = (i: number) => { const c = [...cSur]; c[i] = !c[i]; setCSur(c) }

  const jN = cJuz.filter(Boolean).length
  const sN = cSur.filter(Boolean).length
  const pct = view === 'juz' ? (jN / 30) * 100 : (sN / 114) * 100

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={styles.badge('#fffbeb', '#b45309')}>✅ ختمة القرآن</span>
      </div>
      
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['juz', 'surah'] as const).map(v => (
          <button 
            key={v} onClick={() => setView(v)}
            style={{ 
              flex: 1, padding: 12, borderRadius: 12, fontWeight: 600, 
              border: 'none', cursor: 'pointer',
              background: view === v ? '#d97706' : '#f1f5f9', 
              color: view === v ? '#fff' : '#374151'
            }}>
            {v === 'juz' ? `الأجزاء (${jN}/30)` : `السور (${sN}/114)`}
          </button>
        ))}
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#6b7280' }}>التقدم</span>
          <strong style={{ color: '#b45309' }}>{Math.round(pct)}%</strong>
        </div>
        <div style={{ height: 16, background: '#f1f5f9', borderRadius: 999 }}>
          <div style={{ 
            height: '100%', background: 'linear-gradient(to left,#f59e0b,#d97706)', 
            borderRadius: 999, width: `${pct}%`, transition: 'width 0.5s' 
          }} />
        </div>
      </div>

      {pct === 100 && (
        <div style={{ 
          background: '#ecfdf5', borderRadius: 12, padding: 16, 
          textAlign: 'center', marginBottom: 16, border: '1px solid #6ee7b7'
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
          <div style={{ fontWeight: 700, color: '#047857' }}>ما شاء الله! أتممت الختمة</div>
        </div>
      )}
      
      <div style={{ maxHeight: 350, overflowY: 'auto' }}>
        {view === 'juz' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <button key={i} onClick={() => toggleJ(i)}
                style={{ 
                  position: 'relative', padding: 12, borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  border: cJuz[i] ? '2px solid #34d399' : '2px solid #e5e7eb', 
                  background: cJuz[i] ? '#ecfdf5' : '#fff', color: cJuz[i] ? '#047857' : '#374151'
                }}>
                {cJuz[i] && <div style={{ position: 'absolute', top: -4, left: -4, width: 18, height: 18, background: '#10b981', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</div>}
                <div style={{ fontWeight: 700 }}>{i + 1}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {surahNames.map((name, i) => (
              <button key={i} onClick={() => toggleS(i)}
                style={{ 
                  position: 'relative', padding: 8, borderRadius: 10, textAlign: 'center', fontSize: 12, cursor: 'pointer',
                  border: cSur[i] ? '2px solid #34d399' : '1px solid #e5e7eb', 
                  background: cSur[i] ? '#ecfdf5' : '#fff', color: cSur[i] ? '#047857' : '#374151'
                }}>
                {cSur[i] && <span style={{ position: 'absolute', top: 2, left: 4, color: '#10b981', fontSize: 10 }}>✓</span>}
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
  const [hi, setHi] = useState(() => { try { return parseInt(localStorage.getItem('quiz_hi') || '0') } catch { return 0 } })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const answer = useCallback((idx: number) => {
    if (show) return
    setSel(idx); setShow(true)
    const ok = idx === quizQuestions[cur].correct
    if (ok) setScore(s => s + 1)
    setTimeout(() => {
      if (cur < quizQuestions.length - 1) { 
        setCur(c => c + 1); setSel(null); setShow(false); setTime(15) 
      } else {
        const f = ok ? score + 1 : score
        if (f > hi) { setHi(f); try { localStorage.setItem('quiz_hi', f.toString()) } catch {} }
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

  const start = () => { setCur(0); setScore(0); setSel(null); setShow(false); setTime(15); setSt('play') }

  if (st === 'idle') return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 24 }}><span style={styles.badge('#faf5ff', '#7c3aed')}>🧠 مسابقة القرآن</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{ background: '#faf5ff', padding: 20, borderRadius: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#7c3aed' }}>{hi}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>أعلى نتيجة</div>
        </div>
        <div style={{ background: '#fffbeb', padding: 20, borderRadius: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#b45309' }}>{quizQuestions.length}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>سؤال</div>
        </div>
      </div>
      <button onClick={start} style={styles.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>ابدأ 🚀</button>
    </div>
  )

  if (st === 'end') {
    const p = (score / quizQuestions.length) * 100
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{p >= 70 ? '🏆' : '⭐'}</div>
        <div style={{ background: '#faf5ff', borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#7c3aed' }}>{score}/{quizQuestions.length}</div>
          <div style={{ color: '#6b7280' }}>إجابة صحيحة</div>
        </div>
        <button onClick={start} style={styles.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>إعادة 🔄</button>
      </div>
    )
  }

  const q = quizQuestions[cur]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ color: '#6b7280' }}>السؤال {cur + 1}/{quizQuestions.length}</span>
        <strong style={{ color: '#7c3aed' }}>النتيجة: {score}</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{ 
          width: 56, height: 56, borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: 22, fontWeight: 700,
          border: `4px solid ${time <= 5 ? '#f87171' : '#a78bfa'}`, 
          color: time <= 5 ? '#ef4444' : '#7c3aed'
        }}>{time}</div>
      </div>
      <div style={{ background: '#faf5ff', borderRadius: 16, padding: 20, marginBottom: 20, textAlign: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>{q.q}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((o, i) => {
          let bg = '#fff', bdr = '#e5e7eb', clr = '#374151'
          if (show) {
            if (i === q.correct) { bg = '#ecfdf5'; bdr = '#34d399'; clr = '#047857' }
            else if (i === sel) { bg = '#fef2f2'; bdr = '#f87171'; clr = '#dc2626' }
          }
          return (
            <button key={i} onClick={() => answer(i)} disabled={show}
              style={{ 
                width: '100%', padding: 16, borderRadius: 12, 
                background: bg, border: `2px solid ${bdr}`, color: clr, 
                fontWeight: 600, cursor: show ? 'default' : 'pointer', textAlign: 'right'
              }}>{o}</button>
          )
        })}
      </div>
    </div>
  )
}

// ========== Dua Requests (ادعوا لي بظهر الغيب) ==========
// استخدام JSONBin المجاني
const JSONBIN_API = 'https://api.jsonbin.io/v3/b'
const BIN_ID = '683ee8418960c979a5a075f1' // سيتم إنشاؤه تلقائياً

type DuaRequestItem = {
  id: string
  name: string
  reason: string
  prayersCount: number
  createdAt: number
}

function DuaRequests() {
  const [requests, setRequests] = useState<DuaRequestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [nameInput, setNameInput] = useState('')
  const [reasonInput, setReasonInput] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [prayedForIds, setPrayedForIds] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('prayed_for_ids') || '{}')
    } catch { return {} }
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // حفظ الأشخاص اللي دعينا لهم
  useEffect(() => {
    try {
      localStorage.setItem('prayed_for_ids', JSON.stringify(prayedForIds))
    } catch {}
  }, [prayedForIds])

  // جلب البيانات من السيرفر
  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch(`${JSONBIN_API}/${BIN_ID}/latest`, {
        headers: {
          'X-Access-Key': '$2a$10$YOUR_ACCESS_KEY' // مفتاح عام للقراءة
        }
      })
      
      if (res.ok) {
        const data = await res.json()
        const items: DuaRequestItem[] = data.record?.requests || []
        // ترتيب حسب الأحدث وحذف القديم (أكثر من أسبوع)
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
        const filtered = items
          .filter(item => item.createdAt > weekAgo)
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 50)
        setRequests(filtered)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      // استخدام البيانات المحلية كاحتياط
      try {
        const local = JSON.parse(localStorage.getItem('dua_requests_backup') || '[]')
        setRequests(local)
      } catch {}
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRequests()
    // تحديث كل 30 ثانية
    const interval = setInterval(fetchRequests, 30000)
    return () => clearInterval(interval)
  }, [fetchRequests])

  // حفظ البيانات
  const saveRequests = async (newRequests: DuaRequestItem[]) => {
    try {
      // حفظ محلي كاحتياط
      localStorage.setItem('dua_requests_backup', JSON.stringify(newRequests))
      
      await fetch(`${JSONBIN_API}/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': '$2a$10$YOUR_ACCESS_KEY'
        },
        body: JSON.stringify({ requests: newRequests })
      })
    } catch (err) {
      console.error('Save error:', err)
    }
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'الآن'
    if (minutes < 60) return `منذ ${minutes} دقيقة`
    if (hours < 24) return `منذ ${hours} ساعة`
    return `منذ ${days} يوم`
  }

  const handleAddRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameInput.trim() || !reasonInput.trim()) return

    setSubmitting(true)

    const newItem: DuaRequestItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 6),
      name: nameInput.trim(),
      reason: reasonInput.trim(),
      prayersCount: 0,
      createdAt: Date.now()
    }

    const newRequests = [newItem, ...requests].slice(0, 50)
    setRequests(newRequests)
    await saveRequests(newRequests)

    setNameInput('')
    setReasonInput('')
    setShowAddForm(false)
    setSubmitting(false)
    showToast('تمت إضافة طلبك بنجاح! أسأل الله أن يستجيب 🤲')
  }

  const handlePray = async (id: string) => {
    if (prayedForIds[id]) return

    setPrayedForIds(prev => ({ ...prev, [id]: true }))
    
    const newRequests = requests.map(req => {
      if (req.id === id) {
        return { ...req, prayersCount: req.prayersCount + 1 }
      }
      return req
    })
    
    setRequests(newRequests)
    await saveRequests(newRequests)
    showToast('تقبل الله منك! ولك بالمثل 🤲')
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{
          width: 50,
          height: 50,
          border: '4px solid #d1fae5',
          borderTop: '4px solid #059669',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: '#065f46' }}>جاري تحميل طلبات الدعاء...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={styles.badge('#f0fdf4', '#047857')}>🤲 ادعوا لي بظهر الغيب</span>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
        border: '1px solid #6ee7b7',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20
      }}>
        <p style={{ 
          color: '#065f46', 
          fontSize: 13, 
          textAlign: 'center', 
          lineHeight: 1.8,
          fontFamily: amiri,
          margin: 0
        }}>
          ❝ دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكل كلما دعا لأخيه بخير، قال الملك: آمين ولك بالمثل ❞
        </p>
      </div>

      {/* زر إضافة طلب جديد */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 20,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
          }}
        >
          ✍️ اطلب من إخوانك الدعاء
        </button>
      ) : (
        <form 
          onSubmit={handleAddRequest}
          style={{
            background: '#fff',
            border: '2px solid #d1fae5',
            borderRadius: 16,
            padding: 16,
            marginBottom: 20
          }}
        >
          <h4 style={{ color: '#047857', marginBottom: 12, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🤲</span> طلب دعاء جديد
          </h4>
          
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>الاسم (أو صفة)</label>
            <input
              type="text"
              placeholder="مثال: والدي، أختي مريم، طالب علم..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              maxLength={50}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #d1fae5',
                fontSize: 14,
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 4 }}>الدعاء المطلوب</label>
            <textarea
              placeholder="بالشفاء، بالتوفيق، بالذرية الصالحة..."
              value={reasonInput}
              onChange={e => setReasonInput(e.target.value)}
              rows={3}
              maxLength={200}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #d1fae5',
                fontSize: 14,
                outline: 'none',
                resize: 'none',
                fontFamily: cairo
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: submitting ? '#94a3b8' : '#059669',
                color: '#fff',
                fontWeight: 700,
                cursor: submitting ? 'wait' : 'pointer'
              }}
            >
              {submitting ? '⏳ جاري النشر...' : '✓ نشر الطلب'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                color: '#64748b',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {/* إحصائيات */}
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        marginBottom: 16 
      }}>
        <div style={{ 
          flex: 1, 
          background: '#f0fdf4', 
          borderRadius: 12, 
          padding: 12, 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#059669' }}>{requests.length}</div>
          <div style={{ fontSize: 11, color: '#065f46' }}>طلب دعاء</div>
        </div>
        <div style={{ 
          flex: 1, 
          background: '#eff6ff', 
          borderRadius: 12, 
          padding: 12, 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#2563eb' }}>
            {requests.reduce((sum, r) => sum + r.prayersCount, 0)}
          </div>
          <div style={{ fontSize: 11, color: '#1e40af' }}>دعوة</div>
        </div>
      </div>

      {/* قائمة الطلبات */}
      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤲</div>
          <p>لا توجد طلبات حالياً</p>
          <p style={{ fontSize: 13 }}>كن أول من يطلب الدعاء!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {requests.map(req => {
            const isPrayed = prayedForIds[req.id]
            return (
              <div
                key={req.id}
                style={{
                  background: '#fff',
                  border: isPrayed ? '2px solid #10b981' : '1px solid #e2e8f0',
                  borderRadius: 16,
                  padding: 14,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 14
                    }}>🙏</span>
                    <h5 style={{ fontWeight: 700, color: '#1e293b', fontSize: 14, margin: 0 }}>{req.name}</h5>
                  </div>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{getTimeAgo(req.createdAt)}</span>
                </div>

                <p style={{ 
                  color: '#334155', 
                  fontSize: 14, 
                  lineHeight: 1.7, 
                  marginBottom: 12,
                  background: '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: 8,
                  fontFamily: amiri
                }}>
                  {req.reason}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    🤲 <strong style={{ color: '#059669' }}>{req.prayersCount}</strong> دعوا له
                  </span>

                  <button
                    onClick={() => handlePray(req.id)}
                    disabled={isPrayed}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: isPrayed 
                        ? '#ecfdf5' 
                        : 'linear-gradient(135deg, #059669, #047857)',
                      color: isPrayed ? '#10b981' : '#fff',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: isPrayed ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isPrayed ? 'none' : '0 2px 8px rgba(5,150,105,0.3)'
                    }}
                  >
                    {isPrayed ? '✓ دعوت له' : '🤲 ادعُ له'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* زر التحديث */}
      <button
        onClick={() => { setLoading(true); fetchRequests() }}
        style={{
          width: '100%',
          marginTop: 16,
          padding: 12,
          borderRadius: 10,
          border: '1px solid #d1fae5',
          background: '#fff',
          color: '#059669',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >
        🔄 تحديث القائمة
      </button>

      {/* رسالة التنبيه */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#047857',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 700,
          boxShadow: '0 10px 25px rgba(4, 120, 87, 0.4)',
          zIndex: 100,
          animation: 'fadeIn 0.3s'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  )
}

// ========== Main App ==========
type Tab = 'quran' | 'tasbeeh' | 'azkar' | 'khatma' | 'quiz' | 'eid' | 'duarequests'

const tabConfig: { id: Tab; label: string; icon: string; bg: string }[] = [
  { id: 'quran', label: 'المصحف', icon: '📖', bg: '#2563eb' },
  { id: 'tasbeeh', label: 'المسبحة', icon: '📿', bg: '#059669' },
  { id: 'azkar', label: 'الأذكار', icon: '🤲', bg: '#d97706' },
  { id: 'duarequests', label: 'ادعوا لي', icon: '🧎', bg: '#047857' },
  { id: 'khatma', label: 'الختمة', icon: '✅', bg: '#b45309' },
  { id: 'quiz', label: 'مسابقة', icon: '🧠', bg: '#7c3aed' },
  { id: 'eid', label: 'العيد', icon: '🌙', bg: '#dc2626' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('quran')

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom,#ecfdf5,#ffffff,#fffbeb)', 
      direction: 'rtl', 
      fontFamily: cairo 
    }}>
      <header style={{ 
        position: 'sticky', top: 0, zIndex: 40, 
        background: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid #d1fae5' 
      }}>
        <div style={{ 
          maxWidth: 512, margin: '0 auto', padding: '12px 16px', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
        }}>
          <h1 style={{ 
            fontSize: 20, fontWeight: 700, color: '#065f46', 
            display: 'flex', alignItems: 'center', gap: 8, margin: 0 
          }}>
            <span style={{ fontSize: 28 }}>☪️</span> ذِكْر
          </h1>
          <div style={{ 
            width: 40, height: 40, borderRadius: '50%', 
            background: 'linear-gradient(135deg,#34d399,#059669)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 
          }}>🕌</div>
        </div>
      </header>

      <main style={{ maxWidth: 512, margin: '0 auto', padding: '20px 16px' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          background: '#fff', borderRadius: 16, padding: 6, marginBottom: 20, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)', gap: 2 
        }}>
          {tabConfig.map(t => (
            <button 
              key={t.id} onClick={() => setTab(t.id)}
              style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                gap: 2, padding: '8px 0', borderRadius: 12, border: 'none', cursor: 'pointer', 
                fontWeight: 600, fontSize: 10,
                background: tab === t.id ? t.bg : 'transparent', 
                color: tab === t.id ? '#fff' : '#6b7280',
                transition: 'all 0.2s' 
              }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div style={styles.card}>
          {tab === 'quran' && <MushafReader />}
          {tab === 'tasbeeh' && <Tasbeeh />}
          {tab === 'azkar' && <AzkarDua />}
          {tab === 'duarequests' && <DuaRequests />}
          {tab === 'khatma' && <Khatma />}
          {tab === 'quiz' && <Quiz />}
          {tab === 'eid' && <EidTakbeer />}
        </div>

        <footer style={{ textAlign: 'center', marginTop: 32, paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: '#9ca3af', fontFamily: amiri, margin: '0 0 8px' }}>
            ❝ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ❞
          </p>
          <p style={{ fontSize: 12, color: '#d1d5db', margin: '0 0 16px' }}>سورة الرعد - آية 28</p>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, 
            padding: '8px 16px', borderRadius: 12, 
            background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.15)' 
          }}>
            <span>💻</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>تم التطوير بواسطة</span>
            <a href="https://abdo-oraby.myftp.org/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, fontWeight: 700, color: '#059669', textDecoration: 'none' }}>
              Abdo Oraby
            </a>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        button { font-family: inherit; }
        button:active { transform: scale(0.98); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>
    </div>
  )
}
