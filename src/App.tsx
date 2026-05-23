import { useState, useEffect, useCallback } from "react";

// ==================== DATA ====================

const tasbeehOptions = [
  { id: 1, text: "سبحان الله", target: 33 },
  { id: 2, text: "الحمد لله", target: 33 },
  { id: 3, text: "الله أكبر", target: 34 },
  { id: 4, text: "لا إله إلا الله", target: 100 },
  { id: 5, text: "سبحان الله وبحمده", target: 100 },
  { id: 6, text: "سبحان الله العظيم", target: 100 },
  { id: 7, text: "لا حول ولا قوة إلا بالله", target: 100 },
  { id: 8, text: "أستغفر الله", target: 100 },
  { id: 9, text: "اللهم صل على محمد", target: 100 },
  { id: 10, text: "سبحان الله وبحمده سبحان الله العظيم", target: 100 },
];

const duas = [
  "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ",
  "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
  "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
  "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً",
  "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي",
  "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
  "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
  "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
  "رَبِّ زِدْنِي عِلْمًا",
  "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
  "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
];

const quranJuz = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `الجزء ${i + 1}`,
}));

const quranSurahs = [
  "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال",
  "التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل",
  "الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور",
  "الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة",
  "الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
  "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح",
  "الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة",
  "الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن",
  "الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن",
  "المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
  "التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية",
  "الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق",
  "القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة",
  "الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص",
  "الفلق","الناس",
];

const quizQuestions = [
  { question: "كم عدد سور القرآن الكريم؟", options: ["112","113","114","115"], correct: 2 },
  { question: "ما هي أطول سورة في القرآن الكريم؟", options: ["آل عمران","النساء","البقرة","المائدة"], correct: 2 },
  { question: "ما هي أقصر سورة في القرآن الكريم؟", options: ["الإخلاص","الكوثر","العصر","الفلق"], correct: 1 },
  { question: "كم عدد أجزاء القرآن الكريم؟", options: ["28","29","30","31"], correct: 2 },
  { question: "في أي سورة وردت آية الكرسي؟", options: ["آل عمران","البقرة","النساء","المائدة"], correct: 1 },
  { question: "ما هي السورة التي تسمى قلب القرآن؟", options: ["الرحمن","يس","الملك","الكهف"], correct: 1 },
  { question: "كم مرة ذُكر اسم محمد ﷺ في القرآن؟", options: ["3","4","5","6"], correct: 1 },
  { question: "ما هي السورة التي تبدأ بـ 'تبارك'؟", options: ["الفرقان","الملك","الرحمن","غافر"], correct: 1 },
  { question: "ما السورة التي تُلقب بعروس القرآن؟", options: ["يس","الرحمن","مريم","البقرة"], correct: 1 },
  { question: "كم عدد السجدات في القرآن الكريم؟", options: ["13","14","15","16"], correct: 2 },
  { question: "ما هي السورة التي ذُكرت فيها البسملة مرتين؟", options: ["الفاتحة","النمل","يس","الرحمن"], correct: 1 },
  { question: "ما هي السورة التي لا تبدأ بالبسملة؟", options: ["الأنفال","التوبة","الحجرات","محمد"], correct: 1 },
  { question: "ما عدد آيات سورة الفاتحة؟", options: ["5","6","7","8"], correct: 2 },
  { question: "أي سورة تنتهي بها القرآن الكريم؟", options: ["الفلق","الإخلاص","الناس","المسد"], correct: 2 },
  { question: "ما هي السورة الملقبة بالسبع المثاني؟", options: ["البقرة","الفاتحة","آل عمران","النساء"], correct: 1 },
];

// ==================== COMPONENTS ====================

// ===== DUA SLIDER =====
function DuaSlider() {
  const [currentDua, setCurrentDua] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentDua((prev) => (prev + 1) % duas.length);
        setIsVisible(true);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentDua((prev) => (prev + 1) % duas.length);
      setIsVisible(true);
    }, 300);
  };

  const goPrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentDua((prev) => (prev - 1 + duas.length) % duas.length);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #059669, #0d9488, #065f46)",
        borderRadius: 16,
        padding: "24px 20px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)",
      }}
    >
      {/* Decorative */}
      <div style={{ position: "absolute", top: 8, right: 16, fontSize: 48, opacity: 0.1, color: "#fff" }}>✦</div>
      <div style={{ position: "absolute", bottom: 8, left: 16, fontSize: 32, opacity: 0.1, color: "#fff" }}>✦</div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: "#a7f3d0", fontSize: 14, fontWeight: 600 }}>🤲 دعاء</span>
          <div style={{ display: "flex", gap: 4 }}>
            {duas.slice(0, 8).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentDua % 8 ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === currentDua % 8 ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            transition: "all 0.5s ease",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: 20,
              lineHeight: 1.8,
              textAlign: "center",
              minHeight: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Amiri', 'Traditional Arabic', serif",
            }}
          >
            {duas[currentDua]}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <button
            onClick={goPrev}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", color: "#fff",
              border: "none", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ▶
          </button>
          <button
            onClick={goNext}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", color: "#fff",
              border: "none", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ◀
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== TASBEEH =====
function Tasbeeh() {
  const [selectedTasbeeh, setSelectedTasbeeh] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(() => {
    try { return parseInt(localStorage.getItem("tasbeeh_total") || "0"); } catch { return 0; }
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const currentTasbeeh = tasbeehOptions[selectedTasbeeh];

  useEffect(() => {
    try { localStorage.setItem("tasbeeh_total", totalCount.toString()); } catch {}
  }, [totalCount]);

  const handleClick = useCallback(() => {
    if (count >= currentTasbeeh.target) return;
    setIsAnimating(true);
    setCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= currentTasbeeh.target) {
        setShowCompleted(true);
        setTimeout(() => setShowCompleted(false), 3000);
      }
      return newCount;
    });
    setTotalCount((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 200);
  }, [count, currentTasbeeh.target]);

  const progress = (count / currentTasbeeh.target) * 100;
  const circumference = 2 * Math.PI * 110;

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#ecfdf5", color: "#047857",
            padding: "8px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600,
          }}
        >
          📿 المسبحة الإلكترونية
        </span>
        <p style={{ color: "#6b7280", fontSize: 14, marginTop: 8 }}>
          إجمالي التسبيحات: <strong style={{ color: "#059669" }}>{totalCount.toLocaleString("ar-EG")}</strong>
        </p>
      </div>

      {/* Selector */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 24 }} className="scrollbar-hide">
        {tasbeehOptions.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => { setSelectedTasbeeh(i); setCount(0); }}
            style={{
              flexShrink: 0, padding: "8px 16px", borderRadius: 999,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: selectedTasbeeh === i ? "none" : "1px solid #e5e7eb",
              background: selectedTasbeeh === i ? "#059669" : "#fff",
              color: selectedTasbeeh === i ? "#fff" : "#4b5563",
              boxShadow: selectedTasbeeh === i ? "0 4px 15px rgba(5,150,105,0.3)" : "none",
              transition: "all 0.3s",
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {/* Circular Counter */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <svg width="240" height="240" viewBox="0 0 256 256" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="128" cy="128" r="110" stroke="#e5e7eb" strokeWidth="12" fill="none" />
            <circle
              cx="128" cy="128" r="110"
              stroke="#059669" strokeWidth="12" fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>

          <button
            onClick={handleClick}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: `translate(-50%, -50%) scale(${isAnimating ? 1.08 : 1})`,
              width: 160, height: 160, borderRadius: "50%",
              background: count >= currentTasbeeh.target
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "linear-gradient(135deg, #10b981, #047857)",
              color: "#fff", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              boxShadow: isAnimating
                ? "0 0 50px rgba(16,185,129,0.5)"
                : "0 8px 30px rgba(16,185,129,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 700 }}>{count}</span>
            <span style={{ fontSize: 13, opacity: 0.8 }}>/ {currentTasbeeh.target}</span>
          </button>
        </div>

        {/* Current Text */}
        <h2 style={{ fontSize: 28, color: "#065f46", marginBottom: 8, fontFamily: "'Amiri','Traditional Arabic',serif" }}>
          {currentTasbeeh.text}
        </h2>
        <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 24 }}>اضغط على الدائرة للتسبيح</p>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: "12px 24px", borderRadius: 12,
              background: "#fef2f2", color: "#dc2626", border: "none",
              fontWeight: 600, cursor: "pointer", fontSize: 14,
            }}
          >
            🔄 إعادة
          </button>
          <button
            onClick={() => { setSelectedTasbeeh((p) => (p + 1) % tasbeehOptions.length); setCount(0); }}
            style={{
              padding: "12px 24px", borderRadius: 12,
              background: "#ecfdf5", color: "#059669", border: "none",
              fontWeight: 600, cursor: "pointer", fontSize: 14,
            }}
          >
            التالي ←
          </button>
        </div>
      </div>

      {/* Completed Popup */}
      {showCompleted && (
        <div style={{
          position: "fixed", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          zIndex: 50, pointerEvents: "none",
        }}>
          <div className="animate-fade-in-up" style={{
            background: "#059669", color: "#fff",
            padding: "24px 32px", borderRadius: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>ما شاء الله!</h3>
            <p style={{ opacity: 0.8 }}>أتممت {currentTasbeeh.target} تسبيحة</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== KHATMA =====
type KhatmaData = {
  completedJuz: boolean[];
  completedSurahs: boolean[];
  khatmaCount: number;
};

const defaultKhatma: KhatmaData = {
  completedJuz: Array(30).fill(false),
  completedSurahs: Array(114).fill(false),
  khatmaCount: 0,
};

function Khatma() {
  const [khatma, setKhatma] = useState<KhatmaData>(() => {
    try {
      const saved = localStorage.getItem("khatma_data");
      return saved ? JSON.parse(saved) : defaultKhatma;
    } catch { return defaultKhatma; }
  });
  const [viewMode, setViewMode] = useState<"juz" | "surah">("juz");
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("khatma_data", JSON.stringify(khatma)); } catch {}
  }, [khatma]);

  const toggleJuz = (index: number) => {
    setKhatma((prev) => {
      const c = [...prev.completedJuz];
      c[index] = !c[index];
      return { ...prev, completedJuz: c };
    });
  };

  const toggleSurah = (index: number) => {
    setKhatma((prev) => {
      const c = [...prev.completedSurahs];
      c[index] = !c[index];
      return { ...prev, completedSurahs: c };
    });
  };

  const completedJuzCount = khatma.completedJuz.filter(Boolean).length;
  const completedSurahCount = khatma.completedSurahs.filter(Boolean).length;
  const juzProgress = (completedJuzCount / 30) * 100;
  const surahProgress = (completedSurahCount / 114) * 100;

  const currentProgress = viewMode === "juz" ? juzProgress : surahProgress;
  const isComplete = viewMode === "juz" ? completedJuzCount === 30 : completedSurahCount === 114;

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#fffbeb", color: "#b45309",
          padding: "8px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600,
        }}>
          📖 ختمة القرآن الكريم
        </span>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 16, fontSize: 14 }}>
          <div style={{ background: "#ecfdf5", padding: "6px 12px", borderRadius: 8 }}>
            <span style={{ color: "#6b7280" }}>الختمات المكتملة: </span>
            <strong style={{ color: "#059669" }}>{khatma.khatmaCount}</strong>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 20 }}>
        {(["juz", "surah"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
              background: viewMode === mode ? "#fff" : "transparent",
              color: viewMode === mode ? "#047857" : "#6b7280",
              boxShadow: viewMode === mode ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            {mode === "juz" ? `بالأجزاء (${completedJuzCount}/30)` : `بالسور (${completedSurahCount}/114)`}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
          <span style={{ color: "#6b7280" }}>التقدم</span>
          <strong style={{ color: "#059669" }}>{Math.round(currentProgress)}%</strong>
        </div>
        <div style={{ height: 16, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 999,
            background: "linear-gradient(to left, #34d399, #059669)",
            width: `${currentProgress}%`,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Grid */}
      {viewMode === "juz" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 20 }}>
          {quranJuz.map((juz, i) => (
            <button
              key={juz.id}
              onClick={() => toggleJuz(i)}
              style={{
                position: "relative", padding: 12, borderRadius: 12,
                textAlign: "center", cursor: "pointer",
                border: khatma.completedJuz[i] ? "2px solid #34d399" : "2px solid #e5e7eb",
                background: khatma.completedJuz[i] ? "#ecfdf5" : "#fff",
                color: khatma.completedJuz[i] ? "#047857" : "#4b5563",
                transition: "all 0.2s",
              }}
            >
              {khatma.completedJuz[i] && (
                <div style={{
                  position: "absolute", top: -6, left: -6,
                  width: 20, height: 20, borderRadius: "50%",
                  background: "#10b981", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12,
                }}>✓</div>
              )}
              <div style={{ fontSize: 18, fontWeight: 700 }}>{juz.id}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>الجزء</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
          marginBottom: 20, maxHeight: 350, overflowY: "auto",
        }} className="scrollbar-hide">
          {quranSurahs.map((surah, i) => (
            <button
              key={i}
              onClick={() => toggleSurah(i)}
              style={{
                position: "relative", padding: "8px 4px", borderRadius: 10,
                textAlign: "center", fontSize: 13, cursor: "pointer",
                border: khatma.completedSurahs[i] ? "1px solid #34d399" : "1px solid #e5e7eb",
                background: khatma.completedSurahs[i] ? "#ecfdf5" : "#fff",
                color: khatma.completedSurahs[i] ? "#047857" : "#4b5563",
                fontWeight: khatma.completedSurahs[i] ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 10, color: "#d1d5db", display: "block" }}>{i + 1}</span>
              {surah}
              {khatma.completedSurahs[i] && <span style={{ position: "absolute", top: 2, left: 4, color: "#10b981", fontSize: 10 }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 12 }}>
        {isComplete && (
          <button
            onClick={() => {
              setKhatma({ ...defaultKhatma, khatmaCount: khatma.khatmaCount + 1 });
            }}
            style={{
              flex: 1, padding: 14, borderRadius: 12,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#fff", border: "none", fontWeight: 700,
              fontSize: 16, cursor: "pointer",
              boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
            }}
          >
            🎉 إتمام الختمة
          </button>
        )}
        <button
          onClick={() => setShowConfirmReset(true)}
          style={{
            padding: "14px 20px", borderRadius: 12,
            background: "#fef2f2", color: "#ef4444",
            border: "none", fontWeight: 600, cursor: "pointer",
          }}
        >
          🔄 إعادة
        </button>
      </div>

      {/* Confirm Reset */}
      {showConfirmReset && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}>
          <div className="animate-fade-in-up" style={{
            background: "#fff", borderRadius: 20, padding: 24,
            maxWidth: 360, width: "100%", textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>إعادة ضبط الختمة</h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>هل أنت متأكد من إعادة ضبط الختمة الحالية؟</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => { setKhatma({ ...defaultKhatma, khatmaCount: khatma.khatmaCount }); setShowConfirmReset(false); }}
                style={{
                  flex: 1, padding: 12, borderRadius: 12,
                  background: "#ef4444", color: "#fff",
                  border: "none", fontWeight: 600, cursor: "pointer",
                }}
              >
                نعم، إعادة
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                style={{
                  flex: 1, padding: 12, borderRadius: 12,
                  background: "#f3f4f6", color: "#4b5563",
                  border: "none", fontWeight: 600, cursor: "pointer",
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== QUIZ =====
function Quiz() {
  const [state, setState] = useState<"idle" | "playing" | "result">("idle");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffled, setShuffled] = useState(quizQuestions);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem("quiz_high_score") || "0"); } catch { return 0; }
  });
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (state === "playing" && !showAnswer && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
    if (state === "playing" && timeLeft === 0 && !showAnswer) {
      doAnswer(-1);
    }
  }, [timeLeft, state, showAnswer]);

  const startQuiz = () => {
    const s = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setShuffled(s);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setState("playing");
    setTimeLeft(15);
  };

  const doAnswer = (idx: number) => {
    if (showAnswer) return;
    setSelectedAnswer(idx);
    setShowAnswer(true);
    const isCorrect = idx === shuffled[currentQuestion].correct;
    if (isCorrect) setScore((p) => p + 1);
    setTimeout(() => {
      if (currentQuestion < shuffled.length - 1) {
        setCurrentQuestion((p) => p + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(15);
      } else {
        const final = isCorrect ? score + 1 : score;
        if (final > highScore) {
          setHighScore(final);
          try { localStorage.setItem("quiz_high_score", final.toString()); } catch {}
        }
        setState("result");
      }
    }, 1500);
  };

  // IDLE
  if (state === "idle") {
    return (
      <div style={{ textAlign: "center" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#faf5ff", color: "#7c3aed",
          padding: "8px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600,
          marginBottom: 24,
        }}>
          🧠 مسابقة ختمة القرآن
        </span>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32, marginTop: 24 }}>
          <div style={{ background: "linear-gradient(135deg, #faf5ff, #eef2ff)", padding: 16, borderRadius: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#7c3aed" }}>{highScore}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>أعلى نتيجة</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #fffbeb, #fff7ed)", padding: 16, borderRadius: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#b45309" }}>{quizQuestions.length}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>سؤال متاح</div>
          </div>
        </div>

        <div style={{ background: "#f9fafb", borderRadius: 16, padding: 20, marginBottom: 32, textAlign: "right" }}>
          <h3 style={{ fontWeight: 700, color: "#1f2937", marginBottom: 12 }}>📋 قواعد المسابقة</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#4b5563" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
              10 أسئلة عشوائية في كل جولة
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
              15 ثانية لكل سؤال
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
              اختبر معلوماتك عن القرآن الكريم
            </div>
          </div>
        </div>

        <button
          onClick={startQuiz}
          style={{
            width: "100%", padding: 16, borderRadius: 16,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            color: "#fff", border: "none", fontWeight: 700,
            fontSize: 18, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
          }}
        >
          ابدأ المسابقة 🚀
        </button>
      </div>
    );
  }

  // RESULT
  if (state === "result") {
    const pct = (score / shuffled.length) * 100;
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 50 ? "👍" : "💪";
    const msg = pct >= 90 ? "ما شاء الله! ممتاز" : pct >= 70 ? "أحسنت! جيد جداً" : pct >= 50 ? "لا بأس، حاول مرة أخرى" : "استمر في التعلم!";

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{emoji}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>النتيجة</h2>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>{msg}</p>
        <div style={{ background: "linear-gradient(135deg, #faf5ff, #eef2ff)", borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>{score}/{shuffled.length}</div>
          <div style={{ color: "#6b7280", marginBottom: 16 }}>إجابة صحيحة</div>
          <div style={{ height: 12, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 999,
              background: "linear-gradient(to left, #a78bfa, #7c3aed)",
              width: `${pct}%`, transition: "width 1s ease",
            }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={startQuiz}
            style={{
              flex: 1, padding: 14, borderRadius: 12,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "#fff", border: "none", fontWeight: 600, cursor: "pointer",
            }}
          >
            جولة جديدة 🔄
          </button>
          <button
            onClick={() => setState("idle")}
            style={{
              padding: "14px 20px", borderRadius: 12,
              background: "#f3f4f6", color: "#4b5563",
              border: "none", fontWeight: 600, cursor: "pointer",
            }}
          >
            القائمة
          </button>
        </div>
      </div>
    );
  }

  // PLAYING
  const q = shuffled[currentQuestion];

  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}>
        <span style={{ color: "#6b7280" }}>السؤال {currentQuestion + 1}/{shuffled.length}</span>
        <strong style={{ color: "#7c3aed" }}>النتيجة: {score}</strong>
      </div>
      <div style={{ height: 8, background: "#f3f4f6", borderRadius: 999, marginBottom: 24, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 999,
          background: "linear-gradient(to left, #a78bfa, #7c3aed)",
          width: `${((currentQuestion + 1) / shuffled.length) * 100}%`,
          transition: "width 0.3s",
        }} />
      </div>

      {/* Timer */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 700,
          border: `4px solid ${timeLeft <= 5 ? "#f87171" : "#a78bfa"}`,
          color: timeLeft <= 5 ? "#ef4444" : "#7c3aed",
          background: timeLeft <= 5 ? "#fef2f2" : "#faf5ff",
          transition: "all 0.3s",
        }}>
          {timeLeft}
        </div>
      </div>

      {/* Question */}
      <div style={{
        background: "linear-gradient(135deg, #faf5ff, #eef2ff)",
        borderRadius: 16, padding: 24, marginBottom: 24,
        textAlign: "center",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", lineHeight: 1.6 }}>{q.question}</h3>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {q.options.map((opt, i) => {
          let bg = "#fff", border = "#e5e7eb", color = "#374151";
          if (showAnswer) {
            if (i === q.correct) { bg = "#ecfdf5"; border = "#34d399"; color = "#047857"; }
            else if (i === selectedAnswer) { bg = "#fef2f2"; border = "#f87171"; color = "#dc2626"; }
            else { bg = "#f9fafb"; border = "#e5e7eb"; color = "#9ca3af"; }
          } else if (i === selectedAnswer) { bg = "#faf5ff"; border = "#a78bfa"; color = "#7c3aed"; }

          let dotBg = "#f3f4f6", dotColor = "#6b7280";
          if (showAnswer && i === q.correct) { dotBg = "#10b981"; dotColor = "#fff"; }
          else if (showAnswer && i === selectedAnswer) { dotBg = "#ef4444"; dotColor = "#fff"; }

          return (
            <button
              key={i}
              onClick={() => doAnswer(i)}
              disabled={showAnswer}
              style={{
                width: "100%", padding: 16, borderRadius: 12,
                background: bg, border: `2px solid ${border}`, color,
                fontWeight: 600, cursor: showAnswer ? "default" : "pointer",
                textAlign: "right", display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dotBg, color: dotColor, fontSize: 13, flexShrink: 0,
              }}>
                {showAnswer && i === q.correct ? "✓" : showAnswer && i === selectedAnswer ? "✗" : ["أ","ب","ج","د"][i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


// ==================== MAIN APP ====================

type Tab = "tasbeeh" | "khatma" | "quiz";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("tasbeeh");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "صباح الخير 🌅";
    if (hour >= 12 && hour < 17) return "مساء النور ☀️";
    if (hour >= 17 && hour < 21) return "مساء الخير 🌇";
    return "طابت ليلتك 🌙";
  };

  const tabs: { id: Tab; label: string; icon: string; bgActive: string; shadow: string }[] = [
    { id: "tasbeeh", label: "المسبحة", icon: "📿", bgActive: "#059669", shadow: "rgba(5,150,105,0.3)" },
    { id: "khatma", label: "الختمة", icon: "📖", bgActive: "#d97706", shadow: "rgba(217,119,6,0.3)" },
    { id: "quiz", label: "المسابقة", icon: "🧠", bgActive: "#7c3aed", shadow: "rgba(124,58,237,0.3)" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #ecfdf5, #ffffff, #fffbeb)",
    }} className="islamic-pattern">
      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #d1fae5",
      }}>
        <div style={{ maxWidth: 512, margin: "0 auto", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#065f46", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 28 }}>☪️</span>
                ذِكْر
              </h1>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{getGreeting()}</p>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #34d399, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 15px rgba(5,150,105,0.3)",
              fontSize: 20,
            }}>
              🕌
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 512, margin: "0 auto", padding: "24px 16px" }}>
        <DuaSlider />

        {/* Tabs */}
        <div style={{
          display: "flex", background: "#fff", borderRadius: 16,
          padding: 6, marginBottom: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #f3f4f6",
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, padding: "12px 0", borderRadius: 12,
                fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                background: activeTab === tab.id ? tab.bgActive : "transparent",
                color: activeTab === tab.id ? "#fff" : "#6b7280",
                boxShadow: activeTab === tab.id ? `0 4px 15px ${tab.shadow}` : "none",
                transition: "all 0.3s",
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: "#fff", borderRadius: 24,
          padding: 24,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid #f3f4f6",
        }}>
          {activeTab === "tasbeeh" && <Tasbeeh />}
          {activeTab === "khatma" && <Khatma />}
          {activeTab === "quiz" && <Quiz />}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", marginTop: 32, paddingBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#9ca3af", fontFamily: "'Amiri','Traditional Arabic',serif" }}>
            ❝ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ❞
          </p>
          <p style={{ fontSize: 12, color: "#d1d5db", marginTop: 8 }}>سورة الرعد - آية 28</p>
          
          <div style={{
            marginTop: 24,
            padding: "12px 20px",
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(5,150,105,0.08), rgba(124,58,237,0.08))",
            border: "1px solid rgba(5,150,105,0.15)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>💻</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              تم التطوير بواسطة
            </span>
            <a
              href="https://abdo-oraby.myftp.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 700,
                background: "linear-gradient(135deg, #059669, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
                borderBottom: "2px solid rgba(124,58,237,0.3)",
                paddingBottom: 2,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "#7c3aed"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "rgba(124,58,237,0.3)"; }}
            >
              Abdo Oraby
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
