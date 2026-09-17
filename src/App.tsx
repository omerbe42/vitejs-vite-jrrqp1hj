import { useState, useRef, useEffect } from 'react';

// אייקונים גרפיים עצמאיים (SVG)
const IconHardHat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IconShield = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconCamera = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconWind = () => <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19 12H2"/></svg>;
const IconGlobe = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconWifiOff = () => <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;

// מילון תרגומים רב-לשוני לשטח
const translations: Record<string, any> = {
  he: {
    title: "שער בטיחות יומי (PPE)",
    subtitle: "סמן את ציוד המגן שברשותך לפני כניסה לאתר:",
    helmet: "קסדת מגן תקנית רכוסה",
    boots: "נעלי בטיחות עם כיפת מגן",
    vest: "אפוד זוהר תקני",
    enter: "החתם כניסה (GPS) והתחל עבודה",
    success: "נכנסת לאתר בהצלחה! נוכחות פעילה",
    reportHazard: "צלם מפגע בטיחות",
    reportProgress: "צלם התקדמות גמר",
    craneStatus: "עגורן צריח מס' 1: רוח תקינה (22 קמ\"ש)"
  },
  ar: {
    title: "בوابة السلامة اليومية (PPE)",
    subtitle: "حدد معدات الحماية الخاصة بك قبل دخول الموقع:",
    helmet: "خوذة حماية معتمدة ومربوطة",
    boots: "حذاء سلامة مع غطاء واقي",
    vest: "سترة عاكسة معتمدة",
    enter: "تسجيل الدخول (GPS) وبدء العمل",
    success: "تم تسجيل الدخول بنجاح!",
    reportHazard: "تصوير خطر سلامة",
    reportProgress: "تصوير تقدم العمل",
    craneStatus: "الرافعة رقم 1: سرعة الرياح طبيعية (22 كم/س)"
  },
  en: {
    title: "Daily Safety Gate (PPE)",
    subtitle: "Select your required protective gear before entering:",
    helmet: "Approved safety helmet",
    boots: "Safety boots with steel toe",
    vest: "High-visibility safety vest",
    enter: "Clock In (GPS) & Start Work",
    success: "Successfully Clocked In!",
    reportHazard: "Report Safety Hazard",
    reportProgress: "Report Work Progress",
    craneStatus: "Tower Crane #1: Safe Wind Speed (22 km/h)"
  },
  ru: {
    title: "Ежедневный пропуск безопасности (PPE)",
    subtitle: "Отметьте средства защиты перед входом на объект:",
    helmet: "Защитная каска",
    boots: "Защитная обувь с подноском",
    vest: "Сигнальный жилет",
    enter: "Отметиться (GPS) и начать работу",
    success: "Успешный вход на объект!",
    reportHazard: "Сообщить об опасности",
    reportProgress: "Отчет о прогрессе",
    craneStatus: "Башенный кран №1: Ветер в норме (22 км/ч)"
  },
  hi: {
    title: "दैनिक सुरक्षा द्वार (PPE)",
    subtitle: "साइट में प्रवेश करने से पहले अपने सुरक्षा गियर की जाँच करें:",
    helmet: "मानक सुरक्षा हेलमेट",
    boots: "स्टील-टू सुरक्षा जूते",
    vest: "हाई-विजिबिलिटी वेस्ट",
    enter: "उपस्थिति दर्ज करें (GPS)",
    success: "सफलतापूर्वक प्रवेश किया!",
    reportHazard: "खतरा रिपोर्ट करें",
    reportProgress: "प्रगति रिपोर्ट करें",
    craneStatus: "क्रेन #1: सुरक्षित हवा की गति (22 किमी/घंटा)"
  }
};

interface HazardItem {
  id: string;
  image: string;
  title: string;
  time: string;
}

export default function App() {
  const [lang, setLang] = useState('he');
  const [viewMode, setViewMode] = useState<'OFFICE' | 'FIELD'>('OFFICE');
  const [isOffline, setIsOffline] = useState(false);
  
  // מצב פועל בשטח
  const [ppeChecked, setPpeChecked] = useState({ helmet: false, boots: false, vest: false });
  const [clockedIn, setClockedIn] = useState(false);
  const [hazards, setHazards] = useState<HazardItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang] || translations.he;
  const isPpeComplete = ppeChecked.helmet && ppeChecked.boots && ppeChecked.vest;

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHazards(prev => [{
        id: Date.now().toString(),
        image: url,
        title: 'תיעוד חדש מהשטח (ממתין לסנכרון אופליין)',
        time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      }, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col select-none" dir="rtl">
      
      {/* סרגל עליון אוניברסלי */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl font-black shadow">
            <IconHardHat />
          </div>
          <div>
            <h1 className="text-sm font-black text-white flex items-center gap-2">
              <span>BuildGuard Pro</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                מגדלי נווה צדק - שלב ב'
              </span>
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <button onClick={() => setIsOffline(!isOffline)} className="flex items-center gap-1 hover:text-white">
                {isOffline ? <IconWifiOff /> : <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                <span>{isOffline ? 'מצב אופליין (ללא קליטה)' : 'מקוון (סנכרון פעיל)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* בורר תצוגה: משרד מול שטח */}
        <div className="flex items-center gap-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setViewMode('OFFICE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'OFFICE' ? 'bg-amber-500 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            דשבורד משרדי
          </button>
          <button
            onClick={() => setViewMode('FIELD')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'FIELD' ? 'bg-amber-500 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            אפליקציית שטח (נייד)
          </button>
        </div>
      </header>

      {/* אזור תוכן ראשי */}
      <main className="flex-1 p-6 overflow-y-auto max-w-6xl mx-auto w-full space-y-6">
        
        {viewMode === 'OFFICE' ? (
          /* דשבורד משרדי מנוהל */
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400">עובדים שרכסו קסדה הבוקר</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">34 / 34</div>
                <span className="text-[11px] text-neutral-500">100% עמידה בשער בטיחות</span>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">מוניטור עגורן צריח</span>
                  <div className="text-xl font-black text-amber-400">22 קמ"ש</div>
                  <span className="text-[11px] text-emerald-400">תקין לעבודה (מקס' 38)</span>
                </div>
                <IconWind />
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-1">
                <span className="text-xs text-neutral-400">מפגעים פתוחים לטיפול</span>
                <div className="text-2xl font-black text-blue-400 font-mono">{hazards.length}</div>
                <span className="text-[11px] text-neutral-500">סנכרון אחרון: הרגע</span>
              </div>
            </div>

            {/* מעקב מפגעים ותמונות מהשטח */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <IconCamera />
                <span>דיווחים ותמונות שהועלו מהשטח (כולל מצב אופליין)</span>
              </h3>
              {hazards.length === 0 ? (
                <p className="text-xs text-neutral-500">טרם הועלו תמונות מהשטח היום. עובדים יכולים לצלם דרך אפליקציית השטח בנייד.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hazards.map(item => (
                    <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
                      <img src={item.image} alt="Field" className="w-full h-36 object-cover" />
                      <div className="p-3 text-xs space-y-1">
                        <strong className="block text-white">{item.title}</strong>
                        <span className="text-neutral-400 text-[11px] font-mono">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* אפליקציית שטח לסמארטפון עם בחירת שפות ומצלמה */
          <div className="max-w-md mx-auto space-y-4">
            
            {/* בורר שפות מהיר לפועלים זרים */}
            <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-2xl border border-neutral-800">
              <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                <IconGlobe />
                <span>שפה / Language:</span>
              </span>
              <div className="flex gap-1">
                {[
                  { code: 'he', label: 'עב' },
                  { code: 'ar', label: 'عرب' },
                  { code: 'en', label: 'EN' },
                  { code: 'ru', label: 'РУ' },
                  { code: 'hi', label: 'हि' }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      lang === l.code ? 'bg-amber-500 text-neutral-950 shadow' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* מצב שער בטיחות PPE */}
            {!clockedIn ? (
              <div className="p-5 bg-neutral-900 border-2 border-amber-500/50 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400">
                  <IconShield />
                  <h3 className="text-sm font-black text-white">{t.title}</h3>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{t.subtitle}</p>

                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition">
                    <input
                      type="checkbox"
                      checked={ppeChecked.helmet}
                      onChange={e => setPpeChecked(p => ({ ...p, helmet: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span>{t.helmet}</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition">
                    <input
                      type="checkbox"
                      checked={ppeChecked.boots}
                      onChange={e => setPpeChecked(p => ({ ...p, boots: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span>{t.boots}</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition">
                    <input
                      type="checkbox"
                      checked={ppeChecked.vest}
                      onChange={e => setPpeChecked(p => ({ ...p, vest: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span>{t.vest}</span>
                  </label>
                </div>

                <button
                  disabled={!isPpeComplete}
                  onClick={() => setClockedIn(true)}
                  className="w-full py-3.5 bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 font-black rounded-xl text-xs shadow-lg transition active:scale-95"
                >
                  {t.enter}
                </button>
              </div>
            ) : (
              /* תצוגת שטח פעילה לאחר כניסה */
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={handleCapture}
                  className="hidden"
                />

                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold">{t.success}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">GPS מחובר</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center transition"
                  >
                    <IconCamera />
                    <span className="font-bold text-xs text-white">{t.reportHazard}</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center transition"
                  >
                    <IconHardHat />
                    <span className="font-bold text-xs text-white">{t.reportProgress}</span>
                  </button>
                </div>

                <button
                  onClick={() => setClockedIn(false)}
                  className="w-full py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs rounded-xl hover:text-white transition"
                >
                  החתמת יציאה מהאתר
                </button>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}