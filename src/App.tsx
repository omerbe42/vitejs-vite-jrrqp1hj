import { useState } from 'react';

// אייקונים מובנים כ-SVG עצמאי ללא תלות בספריות חיצוניות
const IconHardHat = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
  </svg>
);
const IconShield = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconAlert = () => (
  <svg
    className="w-5 h-5 text-rose-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconCheck = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconMonitor = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);
const IconPhone = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <line x1="12" x2="12.01" y1="18" y2="18" />
  </svg>
);
const IconClock = () => (
  <svg
    className="w-4 h-4 text-amber-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconFile = () => (
  <svg
    className="w-4 h-4 text-amber-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export default function App() {
  const [viewMode, setViewMode] = useState<'DESKTOP' | 'MOBILE'>('DESKTOP');
  const [selectedLang, setSelectedLang] = useState('he');
  const [ppeChecked, setPpeChecked] = useState({
    helmet: false,
    boots: false,
    vest: false,
  });
  const [clockedIn, setClockedIn] = useState(false);

  const isPpeComplete =
    ppeChecked.helmet && ppeChecked.boots && ppeChecked.vest;

  return (
    <div
      className="min-h-screen bg-neutral-950 text-neutral-100 font-sans select-none flex flex-col"
      dir="rtl"
    >
      {/* סרגל עליון */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl font-black">
            <IconHardHat />
          </div>
          <div>
            <h1 className="text-sm font-black text-white flex items-center gap-2">
              <span>BuildGuard Pro</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                פעיל בענן
              </span>
            </h1>
            <span className="text-[11px] text-neutral-400">
              מגדלי נווה צדק - שלב ב'
            </span>
          </div>
        </div>

        {/* מעבר בין דשבורד משרד לאפליקציית סמארטפון */}
        <div className="flex items-center gap-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setViewMode('DESKTOP')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'DESKTOP'
                ? 'bg-amber-500 text-neutral-950 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <IconMonitor />
            <span>דשבורד משרד</span>
          </button>

          <button
            onClick={() => setViewMode('MOBILE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'MOBILE'
                ? 'bg-amber-500 text-neutral-950 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <IconPhone />
            <span>אפליקציית שטח (נייד)</span>
          </button>
        </div>
      </header>

      {/* אזור תוכן ראשי */}
      <main className="flex-1 flex overflow-hidden">
        {viewMode === 'DESKTOP' ? (
          <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
            {/* מדדים מרכזיים */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400 font-medium">
                  עובדים פעילים באתר
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  34{' '}
                  <span className="text-xs text-emerald-400 font-sans">
                    נוכחים
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 block">
                  100% עמידה ב-PPE הבוקר
                </span>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400 font-medium">
                  עגורן צריח מס' 1
                </span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  22 <span className="text-xs font-sans">קמ"ש</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  מהירות רוח תקינה (מקס' 38)
                </span>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400 font-medium">
                  מפגעי בטיחות פתוחים
                </span>
                <div className="text-2xl font-black text-blue-400 font-mono">
                  0 <span className="text-xs font-sans">מפגעים</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  כל הליקויים נסגרו ואומתו
                </span>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400 font-medium">
                  יומן עבודה יומי
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  מוכן
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  סנכרון מלא של כל הנתונים
                </span>
              </div>
            </div>

            {/* פעילות ואירועים */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <IconClock />
                    <span>יומן אירועים ונוכחות בזמן אמת</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    עודכן הרגע
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <strong className="text-white">
                        דימיטרי קובלב (מנופאי)
                      </strong>
                      <span className="text-neutral-400">
                        • אישר בדיקת תקינות בוקר לעגורן
                      </span>
                    </div>
                    <span className="text-neutral-500 font-mono">07:30</span>
                  </div>

                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <strong className="text-white">
                        סמיר עבד (אינסטלציה)
                      </strong>
                      <span className="text-neutral-400">
                        • העלה תמונת בדיקת לחץ במרתף 2- (סונכרן מ-Offline)
                      </span>
                    </div>
                    <span className="text-neutral-500 font-mono">10:15</span>
                  </div>

                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <strong className="text-white">ראג' קומאר (טיח)</strong>
                      <span className="text-neutral-400">
                        • אימת שער PPE וכניסת GPS בשער הראשי
                      </span>
                    </div>
                    <span className="text-neutral-500 font-mono">07:02</span>
                  </div>
                </div>
              </div>

              {/* הפקת יומן יומי */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <IconFile />
                    <span>הפקת יומן עבודה יומי</span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    מרכז אוטומטית נוכחות, בטיחות עגורן, דוחות קבלנים ותמונות של
                    היום בלחיצה אחת.
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={() =>
                      alert('יומן עבודה יומי מעוצב הופק ונשמר כ-PDF!')
                    }
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <span>הפק יומן עבודה ל-PDF</span>
                  </button>

                  <button
                    onClick={() =>
                      alert('תקציר היומן נשלח בוואטסאפ ליזם ולמהנדס הראשי!')
                    }
                    className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold rounded-xl text-xs transition"
                  >
                    שתף תקציר בוואטסאפ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* סימולטור אפליקציית שטח בסמארטפון */
          <div className="flex-1 flex items-center justify-center p-4 bg-neutral-950">
            <div className="w-full max-w-sm bg-neutral-900 border-4 border-neutral-800 rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[620px] relative">
              <div className="bg-neutral-950 px-6 py-2 flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800/60">
                <span className="font-mono">07:05</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    GPS מחובר
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between bg-neutral-950 p-2 rounded-2xl border border-neutral-800">
                  <span className="text-xs text-neutral-400">שפת ממשק:</span>
                  <div className="flex gap-1">
                    {['he', 'ar', 'en', 'ru', 'hi', 'zh'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLang(lang)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                          selectedLang === lang
                            ? 'bg-amber-500 text-neutral-950'
                            : 'text-neutral-400'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {!clockedIn ? (
                  <div className="p-4 bg-neutral-950 rounded-3xl border-2 border-amber-500/50 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <IconShield />
                      <h4 className="text-xs font-black text-white">
                        שער בטיחות יומי חוסם (PPE)
                      </h4>
                    </div>

                    <p className="text-[11px] text-neutral-300">
                      סמן את ציוד המגן שברשותך לפני כניסה לאתר:
                    </p>

                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ppeChecked.helmet}
                          onChange={(e) =>
                            setPpeChecked((p) => ({
                              ...p,
                              helmet: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span>קסדת מגן תקנית מונחת ורכוסה</span>
                      </label>

                      <label className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ppeChecked.boots}
                          onChange={(e) =>
                            setPpeChecked((p) => ({
                              ...p,
                              boots: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span>נעלי בטיחות עם כיפת מגן</span>
                      </label>

                      <label className="flex items-center gap-2 p-2 bg-neutral-900 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ppeChecked.vest}
                          onChange={(e) =>
                            setPpeChecked((p) => ({
                              ...p,
                              vest: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span>אפוד זוהר תקני</span>
                      </label>
                    </div>

                    <button
                      disabled={!isPpeComplete}
                      onClick={() => setClockedIn(true)}
                      className="w-full py-3 bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 font-black rounded-xl text-xs transition active:scale-95"
                    >
                      החתם כניסה (GPS) והתחל עבודה
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <IconCheck />
                        <span>נכנסת לאתר בהצלחה!</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        07:05
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => alert('מצלמה נפתחה לדיווח מפגע')}
                        className="p-3 bg-neutral-950 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-1.5 text-center transition"
                      >
                        <IconAlert />
                        <span className="font-bold text-white">דיווח מפגע</span>
                      </button>

                      <button
                        onClick={() => alert('מצלמה נפתחה לצילום התקדמות')}
                        className="p-3 bg-neutral-950 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-1.5 text-center transition"
                      >
                        <IconHardHat />
                        <span className="font-bold text-white">
                          צילום התקדמות
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => setClockedIn(false)}
                      className="w-full py-2.5 bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs rounded-xl hover:text-white"
                    >
                      החתמת יציאה מהאתר
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
