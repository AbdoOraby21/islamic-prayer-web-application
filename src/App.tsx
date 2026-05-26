import { useState, useEffect, useRef } from 'react'

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
    label: 'تكبير العيد المختصر',
    text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
  },
  {
    label: 'تكبير العيد الكامل',
    text: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ، اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَأَعَزَّ جُنْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ، اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ',
  },
]

const eidDuas = [
  { label: 'دعاء عيد الفطر', text: 'اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَرُكُوعَنَا وَسُجُودَنَا وَتِلَاوَتَنَا، وَتَمِّمْ تَقْصِيرَنَا، يَا أَرْحَمَ الرَّاحِمِينَ' },
  { label: 'دعاء عيد الأضحى', text: 'اللَّهُمَّ تَقَبَّلْ مِنَّا أُضْحِيَّتَنَا وَنُسُكَنَا، وَاجْعَلْهَا شَاهِدَةً لَنَا لَا عَلَيْنَا، وَبَلِّغْنَا أَعْيَادًا كَثِيرَةً وَنَحْنُ فِي طَاعَتِكَ يَا رَبَّ الْعَالَمِينَ' },
  { label: 'دعاء التهنئة بالعيد', text: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ، وَكُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ، وَجَعَلَنَا اللَّهُ وَإِيَّاكُمْ مِنَ الْعَائِدِينَ الْفَائِزِينَ' },
  { label: 'دعاء جامع في العيد', text: 'اللَّهُمَّ اجْعَلْ هَذَا الْيَوْمَ خَيْرًا لَنَا، وَاجْعَلْ مَا بَعْدَهُ خَيْرًا مِمَّا قَبْلَهُ، وَاجْعَلْنَا مِنَ الْمَقْبُولِينَ الْمَرْحُومِينَ' },
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
const amiri = "'Amiri','Traditional Arabic',serif"
const s = {
  card: { background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' } as React.CSSProperties,
  badge: (bg: string, color: string) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, background: bg, color, padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600 }) as React.CSSProperties,
  btn: (bg: string, color: string) => ({ padding: '12px 24px', borderRadius: 12, background: bg, color, border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 14, transition: 'all 0.2s' }) as React.CSSProperties,
  btnFull: (bg: string, color: string) => ({ width: '100%', padding: 16, borderRadius: 16, background: bg, color, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 16 }) as React.CSSProperties,
}

// ========== Quran Reader (Paginated, with fixed Tafseer) ==========
const AYAHS_PER_PAGE = 10

type Ayah = { number: number; numberInSurah: number; text: string }

function QuranReader() {
  const [surahNum, setSurahNum] = useState(1)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [tafseer, setTafseer] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [showTafseer, setShowTafseer] = useState<number | null>(null)
  const [loadingTafseer, setLoadingTafseer] = useState<number | null>(null)
  const [showList, setShowList] = useState(false)
  const [search, setSearch] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(ayahs.length / AYAHS_PER_PAGE)
  const pageAyahs = ayahs.slice((page - 1) * AYAHS_PER_PAGE, page * AYAHS_PER_PAGE)

  useEffect(() => {
    setLoading(true)
    setAyahs([])
    setTafseer({})
    setShowTafseer(null)
    setPage(1)
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`)
      .then(r => r.json())
      .then(d => { if (d.code === 200) setAyahs(d.data.ayahs); setLoading(false) })
      .catch(() => setLoading(false))
  }, [surahNum])

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page, surahNum])

  // Fix: use alquran.cloud tafseer edition (always available, no CORS issues)
  const loadTafseer = async (ayahNumInSurah: number) => {
    if (showTafseer === ayahNumInSurah) { setShowTafseer(null); return }
    setShowTafseer(ayahNumInSurah)
    if (tafseer[ayahNumInSurah]) return
    setLoadingTafseer(ayahNumInSurah)
    try {
      // Calculate global ayah number
      const prevAyahs = surahAyahCount.slice(0, surahNum - 1).reduce((a, b) => a + b, 0)
      const globalAyah = prevAyahs + ayahNumInSurah
      const r = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyah}/ar.muyassar`)
      const d = await r.json()
      if (d.code === 200 && d.data?.text) {
        setTafseer(p => ({ ...p, [ayahNumInSurah]: d.data.text }))
      } else {
        setTafseer(p => ({ ...p, [ayahNumInSurah]: 'تعذر تحميل التفسير' }))
      }
    } catch {
      setTafseer(p => ({ ...p, [ayahNumInSurah]: 'تعذر تحميل التفسير' }))
    }
    setLoadingTafseer(null)
  }

  const filtered = surahNames.filter(n => n.includes(search))

  return (
    <div ref={topRef}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={s.badge('#eff6ff', '#1d4ed8')}>📖 القرآن الكريم بالتفسير</span>
      </div>

      {/* Surah Selector */}
      <button
        onClick={() => setShowList(!showList)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'linear-gradient(135deg,#eff6ff,#eef2ff)', borderRadius: 16, border: '2px solid #93c5fd', cursor: 'pointer', marginBottom: 12 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#2563eb', color: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{surahNum}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b' }}>سورة {surahNames[surahNum - 1]}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{surahAyahCount[surahNum - 1]} آية</div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{showList ? '▲' : '▼'}</span>
      </button>

      {showList && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: 12, overflow: 'hidden' }}>
          <div style={{ padding: 12, borderBottom: '1px solid #f1f5f9' }}>
            <input
              type="text" placeholder="🔍 ابحث عن سورة..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 16px', background: '#f8fafc', borderRadius: 12, border: 'none', outline: 'none', fontSize: 14 }}
            />
          </div>
          <div style={{ maxHeight: 250, overflowY: 'auto' }}>
            {filtered.map(name => {
              const idx = surahNames.indexOf(name)
              return (
                <button
                  key={idx}
                  onClick={() => { setSurahNum(idx + 1); setShowList(false); setSearch('') }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: 'none', borderBottom: '1px solid #f8fafc', background: surahNum === idx + 1 ? '#eff6ff' : '#fff', cursor: 'pointer', textAlign: 'right' }}
                >
                  <span style={{ width: 28, height: 28, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b' }}>{idx + 1}</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{name}</span>
                  <span style={{ marginRight: 'auto', fontSize: 11, color: '#94a3b8' }}>{surahAyahCount[idx]} آية</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Font Size Control */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f8fafc', borderRadius: 12, padding: 4 }}>
          <button onClick={() => setFontSize(f => Math.max(16, f - 2))} style={{ width: 30, height: 30, borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700 }}>-</button>
          <span style={{ fontSize: 11, color: '#64748b', width: 20, textAlign: 'center' }}>{fontSize}</span>
          <button onClick={() => setFontSize(f => Math.min(40, f + 2))} style={{ width: 30, height: 30, borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700 }}>+</button>
        </div>
      </div>

      {/* Surah Nav */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setSurahNum(n => Math.max(1, n - 1))} disabled={surahNum === 1}
          style={{ flex: 1, padding: 10, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: 'pointer', opacity: surahNum === 1 ? 0.3 : 1 }}>
          ← السورة السابقة
        </button>
        <button onClick={() => setSurahNum(n => Math.min(114, n + 1))} disabled={surahNum === 114}
          style={{ flex: 1, padding: 10, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: 'pointer', opacity: surahNum === 114 ? 0.3 : 1 }}>
          السورة التالية →
        </button>
      </div>

      {/* Bismillah */}
      {surahNum !== 9 && (
        <div style={{ textAlign: 'center', padding: '16px 0', marginBottom: 16, background: 'linear-gradient(135deg,#eff6ff,#eef2ff,#eff6ff)', borderRadius: 16 }}>
          <p style={{ fontSize: 24, color: '#1e40af', fontFamily: amiri }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
      )}

      {/* Ayahs */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ width: 40, height: 40, border: '4px solid #bfdbfe', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#64748b', fontSize: 14 }}>جاري تحميل السورة...</p>
        </div>
      ) : (
        <>
          {/* Page indicator */}
          {totalPages > 1 && (
            <div style={{ textAlign: 'center', marginBottom: 12, fontSize: 13, color: '#64748b' }}>
              صفحة {page} من {totalPages} — آيات {(page - 1) * AYAHS_PER_PAGE + 1} إلى {Math.min(page * AYAHS_PER_PAGE, ayahs.length)}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pageAyahs.map(ayah => (
              <div key={ayah.number}>
                <div style={{ background: '#f8fafc', borderRadius: 16, padding: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: 34, height: 34, background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                      {ayah.numberInSurah}
                    </div>
                    <p style={{ fontSize, fontFamily: amiri, color: '#1e293b', lineHeight: 2.2, flex: 1 }}>{ayah.text}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <button
                      onClick={() => loadTafseer(ayah.numberInSurah)}
                      style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                        background: showTafseer === ayah.numberInSurah ? '#f59e0b' : '#fef3c7',
                        color: showTafseer === ayah.numberInSurah ? '#fff' : '#92400e' }}>
                      {loadingTafseer === ayah.numberInSurah ? '⏳' : '📜'} {showTafseer === ayah.numberInSurah ? 'إخفاء التفسير' : 'التفسير الميسر'}
                    </button>
                  </div>
                </div>
                {showTafseer === ayah.numberInSurah && (
                  <div style={{ marginRight: 24, marginTop: 8, background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#b45309', marginBottom: 8 }}>📜 التفسير الميسر</div>
                    {loadingTafseer === ayah.numberInSurah ? (
                      <p style={{ color: '#64748b', fontSize: 13 }}>⏳ جاري تحميل التفسير...</p>
                    ) : (
                      <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, fontFamily: amiri }}>{tafseer[ayah.numberInSurah] || 'تعذر تحميل التفسير'}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ marginTop: 20 }}>
              {/* Page numbers */}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                      background: page === p ? '#2563eb' : '#f1f5f9',
                      color: page === p ? '#fff' : '#475569',
                      boxShadow: page === p ? '0 2px 8px rgba(37,99,235,0.3)' : 'none' }}>
                    {p}
                  </button>
                ))}
              </div>
              {/* Prev / Next */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ flex: 1, padding: 10, background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: 'pointer', opacity: page === 1 ? 0.3 : 1 }}>
                  ← الصفحة السابقة
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ flex: 1, padding: 10, background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: 'pointer', opacity: page === totalPages ? 0.3 : 1 }}>
                  الصفحة التالية →
                </button>
              </div>
            </div>
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
  const [total, setTotal] = useState(() => { try { return parseInt(localStorage.getItem('tasbeeh_total') || '0') } catch { return 0 } })
  const [done, setDone] = useState(false)
  const cur = tasbeehOptions[sel]
  const pct = (count / cur.target) * 100
  const circ = 2 * Math.PI * 100
  const click = () => {
    if (count >= cur.target) return
    const n = count + 1
    setCount(n)
    const t = total + 1
    setTotal(t)
    try { localStorage.setItem('tasbeeh_total', t.toString()) } catch {}
    if (n >= cur.target) { setDone(true); setTimeout(() => setDone(false), 2000) }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <span style={s.badge('#ecfdf5', '#047857')}>📿 المسبحة الإلكترونية</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {tasbeehOptions.map((o, i) => (
          <button key={i} onClick={() => { setSel(i); setCount(0) }}
            style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: sel === i ? '#059669' : '#f1f5f9', color: sel === i ? '#fff' : '#374151' }}>
            {o.text}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
        <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="120" cy="120" r="100" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle cx="120" cy="120" r="100" stroke="#10b981" strokeWidth="12" fill="none"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
            style={{ transition: 'stroke-dashoffset 0.3s' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: amiri, fontSize: 22, fontWeight: 700, color: '#047857', marginBottom: 4 }}>{cur.text}</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>من {cur.target}</div>
        </div>
      </div>
      <button onClick={click}
        style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg,#34d399,#059669)', color: '#fff', border: 'none', fontSize: 32, cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.4)', marginBottom: 20, transition: 'transform 0.1s', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        📿
      </button>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setCount(0)} style={s.btn('#f1f5f9', '#374151')}>إعادة</button>
        <div style={{ background: '#f8fafc', borderRadius: 12, padding: '10px 20px' }}>
          <div style={{ fontSize: 11, color: '#64748b' }}>الإجمالي</div>
          <div style={{ fontWeight: 700, color: '#059669', fontSize: 18 }}>{total}</div>
        </div>
      </div>
      {done && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#047857', marginBottom: 8 }}>ما شاء الله!</h3>
            <p style={{ color: '#6b7280' }}>أتممت {cur.target} تسبيحة</p>
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
  const [selectedDua, setSelectedDua] = useState(0)
  const [duaCopied, setDuaCopied] = useState(false)

  const copyText = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true)
      setTimeout(() => setter(false), 2000)
    })
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={s.badge('#fff7ed', '#c2410c')}>🌙 تكبيرات العيد</span>
      </div>

      {/* Eid type selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {eidTakbeerOptions.map((opt, i) => (
          <button key={i} onClick={() => { setSelectedTakbeer(i); setCount(0) }}
            style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              background: selectedTakbeer === i ? 'linear-gradient(135deg,#f97316,#dc2626)' : '#f1f5f9',
              color: selectedTakbeer === i ? '#fff' : '#374151' }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Takbeer Text */}
      <div style={{ background: 'linear-gradient(135deg,#fff7ed,#fef3c7)', border: '2px solid #fed7aa', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <p style={{ fontFamily: amiri, fontSize: 22, color: '#7c2d12', lineHeight: 2.2, textAlign: 'center', margin: 0 }}>
          {eidTakbeerOptions[selectedTakbeer].text}
        </p>
      </div>

      {/* Copy button */}
      <button onClick={() => copyText(eidTakbeerOptions[selectedTakbeer].text, setCopied)}
        style={{ ...s.btnFull(copied ? '#059669' : '#f1f5f9', copied ? '#fff' : '#374151'), marginBottom: 20 }}>
        {copied ? '✅ تم النسخ!' : '📋 نسخ التكبير'}
      </button>

      {/* Counter */}
      <div style={{ background: 'linear-gradient(135deg,#fef2f2,#fff7ed)', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#92400e', marginBottom: 8, fontWeight: 600 }}>عداد التكبير</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#c2410c', marginBottom: 12, lineHeight: 1 }}>{count}</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setCount(c => c + 1)}
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#dc2626)', color: '#fff', border: 'none', fontSize: 28, cursor: 'pointer', boxShadow: '0 4px 16px rgba(220,38,38,0.35)' }}>
            🌙
          </button>
          <button onClick={() => setCount(0)}
            style={{ padding: '0 20px', borderRadius: 12, background: '#f1f5f9', color: '#374151', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
            إعادة
          </button>
        </div>
      </div>

      {/* Eid Duas */}
      <div style={{ background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', borderRadius: 16, padding: 20, border: '1px solid #6ee7b7' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#065f46', marginBottom: 12 }}>🤲 أدعية العيد</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {eidDuas.map((d, i) => (
            <button key={i} onClick={() => setSelectedDua(i)}
              style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: selectedDua === i ? '#059669' : '#f0fdf4', color: selectedDua === i ? '#fff' : '#047857' }}>
              {d.label}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: amiri, fontSize: 18, color: '#065f46', lineHeight: 2, marginBottom: 12 }}>
          {eidDuas[selectedDua].text}
        </p>
        <button onClick={() => copyText(eidDuas[selectedDua].text, setDuaCopied)}
          style={{ padding: '8px 16px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            background: duaCopied ? '#059669' : '#dcfce7', color: duaCopied ? '#fff' : '#065f46' }}>
          {duaCopied ? '✅ تم النسخ!' : '📋 نسخ الدعاء'}
        </button>
      </div>
    </div>
  )
}

// ========== Khatma ==========
function Khatma() {
  const [view, setView] = useState<'juz' | 'surah'>('juz')
  const [cJuz, setCJuz] = useState<boolean[]>(() => { try { return JSON.parse(localStorage.getItem('khatma_juz') || '[]') } catch { return [] } })
  const [cSur, setCSur] = useState<boolean[]>(() => { try { return JSON.parse(localStorage.getItem('khatma_surahs') || '[]') } catch { return [] } })
  if (cJuz.length !== 30) { const a = Array(30).fill(false); setCJuz(a) }
  if (cSur.length !== 114) { const a = Array(114).fill(false); setCSur(a) }
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
        <span style={s.badge('#fffbeb', '#b45309')}>✅ ختمة القرآن الكريم</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['juz', 'surah'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{ flex: 1, padding: 12, borderRadius: 12, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer',
              background: view === v ? '#d97706' : '#f1f5f9', color: view === v ? '#fff' : '#374151' }}>
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
          <div style={{ height: '100%', background: 'linear-gradient(to left,#f59e0b,#d97706)', borderRadius: 999, width: `${pct}%`, transition: 'width 0.5s' }} />
        </div>
      </div>
      <div style={{ maxHeight: 380, overflowY: 'auto' }}>
        {view === 'juz' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <button key={i} onClick={() => toggleJ(i)}
                style={{ position: 'relative', padding: 12, borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  border: cJuz[i] ? '2px solid #34d399' : '2px solid #e5e7eb', background: cJuz[i] ? '#ecfdf5' : '#fff', color: cJuz[i] ? '#047857' : '#374151' }}>
                {cJuz[i] && <div style={{ position: 'absolute', top: -4, left: -4, width: 18, height: 18, background: '#10b981', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</div>}
                <div style={{ fontWeight: 700 }}>{i + 1}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {surahNames.map((name, i) => (
              <button key={i} onClick={() => toggleS(i)}
                style={{ position: 'relative', padding: 8, borderRadius: 10, textAlign: 'center', fontSize: 13, cursor: 'pointer',
                  border: cSur[i] ? '2px solid #34d399' : '1px solid #e5e7eb', background: cSur[i] ? '#ecfdf5' : '#fff', color: cSur[i] ? '#047857' : '#374151', fontWeight: cSur[i] ? 600 : 400 }}>
                {cSur[i] && <span style={{ position: 'absolute', top: 2, left: 4, color: '#10b981', fontSize: 10 }}>✓</span>}
                <span style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>{i + 1}</span>{name}
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
  useEffect(() => {
    if (st === 'play' && !show && time > 0) {
      timerRef.current = setTimeout(() => setTime(t => t - 1), 1000)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }
    if (st === 'play' && time === 0 && !show) answer(-1)
  }, [time, st, show])
  const start = () => { setCur(0); setScore(0); setSel(null); setShow(false); setTime(15); setSt('play') }
  const answer = (idx: number) => {
    if (show) return
    setSel(idx); setShow(true)
    const ok = idx === quizQuestions[cur].correct
    if (ok) setScore(s => s + 1)
    setTimeout(() => {
      if (cur < quizQuestions.length - 1) { setCur(c => c + 1); setSel(null); setShow(false); setTime(15) }
      else {
        const f = ok ? score + 1 : score
        if (f > hi) { setHi(f); try { localStorage.setItem('quiz_hi', f.toString()) } catch {} }
        setSt('end')
      }
    }, 1500)
  }
  if (st === 'idle') return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 24 }}><span style={s.badge('#faf5ff', '#7c3aed')}>🧠 مسابقة ختمة القرآن</span></div>
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
      <button onClick={start} style={s.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>ابدأ المسابقة 🚀</button>
    </div>
  )
  if (st === 'end') {
    const p = (score / quizQuestions.length) * 100
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{p >= 70 ? '🏆' : p >= 50 ? '⭐' : '💪'}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>النتيجة</h2>
        <div style={{ background: 'linear-gradient(135deg,#faf5ff,#eef2ff)', borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#7c3aed', marginBottom: 8 }}>{score}/{quizQuestions.length}</div>
          <div style={{ color: '#6b7280' }}>إجابة صحيحة</div>
        </div>
        <button onClick={start} style={s.btnFull('linear-gradient(135deg,#7c3aed,#4f46e5)', '#fff')}>جولة جديدة 🔄</button>
        <button onClick={() => setSt('idle')} style={{ ...s.btnFull('#f1f5f9', '#374151'), marginTop: 12 }}>القائمة</button>
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
        <div style={{ height: '100%', background: 'linear-gradient(to right,#a78bfa,#7c3aed)', borderRadius: 999, width: `${((cur + 1) / quizQuestions.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700,
          border: `4px solid ${time <= 5 ? '#f87171' : '#a78bfa'}`, color: time <= 5 ? '#ef4444' : '#7c3aed', background: time <= 5 ? '#fef2f2' : '#faf5ff' }}>
          {time}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg,#faf5ff,#eef2ff)', borderRadius: 16, padding: 20, marginBottom: 20, textAlign: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', lineHeight: 1.6 }}>{q.q}</h3>
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
            <button key={i} onClick={() => answer(i)} disabled={show}
              style={{ width: '100%', padding: 16, borderRadius: 12, background: bg, border: `2px solid ${bdr}`, color: clr, fontWeight: 600, cursor: show ? 'default' : 'pointer', textAlign: 'right', fontSize: 15 }}>
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
      setTimeout(() => { setCur(c => (c + 1) % duas.length); setVis(true) }, 500)
    }, 7000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ background: 'linear-gradient(135deg,#059669,#0d9488,#065f46)', borderRadius: 16, padding: '24px 20px', marginBottom: 24, position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(5,150,105,0.3)' }}>
      <div style={{ position: 'absolute', top: 8, right: 16, fontSize: 48, opacity: 0.1, color: '#fff' }}>✦</div>
      <div style={{ position: 'absolute', bottom: 8, left: 16, fontSize: 32, opacity: 0.1, color: '#fff' }}>✦</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 16 }}><span style={{ color: '#a7f3d0', fontSize: 14, fontWeight: 600 }}>🤲 دعاء</span></div>
        <p style={{ color: '#fff', fontSize: 20, lineHeight: 1.8, textAlign: 'center', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: amiri, transition: 'all 0.5s', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)' }}>
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
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom,#ecfdf5,#ffffff,#fffbeb)', direction: 'rtl', fontFamily: "'Cairo','Segoe UI',Tahoma,Arial,sans-serif" }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #d1fae5' }}>
        <div style={{ maxWidth: 512, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#065f46', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span style={{ fontSize: 28 }}>☪️</span> ذِكْر
          </h1>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(5,150,105,0.3)', fontSize: 20 }}>🕌</div>
        </div>
      </header>
      {/* Main */}
      <main style={{ maxWidth: 512, margin: '0 auto', padding: '24px 16px' }}>
        <DuaSlider />
        {/* Tabs */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 16, padding: 6, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', gap: 4 }}>
          {tabConfig.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '10px 0', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 11,
                background: tab === t.id ? t.bg : 'transparent', color: tab === t.id ? '#fff' : '#6b7280', boxShadow: tab === t.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        {/* Content */}
        <div style={s.card}>
          {tab === 'tasbeeh' && <Tasbeeh />}
          {tab === 'quran' && <QuranReader />}
          {tab === 'khatma' && <Khatma />}
          {tab === 'quiz' && <Quiz />}
          {tab === 'eid' && <EidTakbeer />}
        </div>
        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: 32, paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: '#9ca3af', fontFamily: amiri, marginBottom: 8 }}>❝ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ❞</p>
          <p style={{ fontSize: 12, color: '#d1d5db', marginBottom: 16 }}>سورة الرعد - آية 28</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, background: 'linear-gradient(135deg,rgba(5,150,105,0.08),rgba(124,58,237,0.08))', border: '1px solid rgba(5,150,105,0.15)' }}>
            <span>💻</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>تم التطوير بواسطة</span>
            <a href="https://abdo-oraby.myftp.org/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg,#059669,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
              Abdo Oraby
            </a>
          </div>
        </footer>
      </main>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>
    </div>
  )
}
