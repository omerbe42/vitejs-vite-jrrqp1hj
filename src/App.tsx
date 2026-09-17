import { useState, useRef } from 'react';

// אייקונים
const IconHardHat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IconCamera = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconShield = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconLogout = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconWind = () => <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19 12H2"/></svg>;
const IconGlobe = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconWifiOff = () => <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;

// מילון תרגומים
const translations: Record<string, any> = {
  he: { title: "שער בטיחות יומי (PPE)", subtitle: "סמן את ציוד המגן שברשותך:", helmet: "קסדת מגן", boots: "נעלי בטיחות", vest: "אפוד זוהר", enter: "החתם כניסה (GPS)", success: "נכנסת לאתר בהצלחה!", reportHazard: "צלם מפגע", reportProgress: "צלם התקדמות" },
  ar: { title: "بوابة السلامة", subtitle: "حدد معدات الحماية:", helmet: "خوذة", boots: "حذاء سلامة", vest: "سترة عاكسة", enter: "تسجيل الدخول", success: "تم تسجيل الدخول!", reportHazard: "تصوير خطر", reportProgress: "تصوير تقدم" },
  en: { title: "Safety Gate", subtitle: "Select protective gear:", helmet: "Helmet", boots: "Safety boots", vest: "Safety vest", enter: "Clock In (GPS)", success: "Clocked In!", reportHazard: "Report Hazard", reportProgress: "Report Progress" },
  ru: { title: "Пропуск безопасности", subtitle: "Отметьте средства защиты:", helmet: "Каска", boots: "Обувь", vest: "Жилет", enter: "Отметиться (GPS)", success: "Успешный вход!", reportHazard: "Опасность", reportProgress: "Прогресс" },
  hi: { title: "सुरक्षा द्वार", subtitle: "सुरक्षा गियर चुनें:", helmet: "हेलमेट", boots: "सुरक्षा जूते", vest: "वेस्ट", enter: "उपस्थिति दर्ज करें", success: "प्रवेश किया!", reportHazard: "खतरा रिपोर्ट", reportProgress: "प्रगति रिपोर्ट" }
};

interface HazardItem { id: string; image: string; title: string; time: string; reporter: string; }
type Role = 'MANAGER' | 'FINISH_MANAGER' | 'WORKER' | 'CRANE';

export default function App() {
  // סטייט התחברות
  const [currentUser, setCurrentUser] = useState<{ name: string; role: Role } | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState<Role>('WORKER');

  // סטייט אפליקציה
  const [lang, setLang] = useState('he');
  const [isOffline, setIsOffline] = useState(false);
  const [ppeChecked, setPpeChecked] = useState({ helmet: false, boots: false, vest: false });
  const [clockedIn, setClockedIn] = useState(false);
  const [hazards, setHazards] = useState<HazardItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang] || translations.he;
  const isPpeComplete = ppeChecked.helmet && ppeChecked.boots && ppeChecked.vest;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) setCurrentUser({ name: username, role: roleSelection });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setClockedIn(false);
    setPpeChecked({ helmet: false, boots: false, vest: false });
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHazards(prev => [{
        id: Date.now().toString(),
        image: url,
        title: 'תיעוד שטח חדש',
        reporter: currentUser?.name || 'לא ידוע',
        time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      }, ...prev]);
    }
  };

  // מסך התחברות
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg"><IconHardHat /></div>
            <h1 className="text-xl font-black">BuildGuard Pro</h1>
            <p className="text-xs text-neutral-400">הזדהות למערכת אתר: מגדלי נווה צדק</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">שם משתמש / מזהה עובד</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" placeholder="למשל: עומר או מוחמד"/>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">סיסמה</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" placeholder="••••••••"/>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">תפקיד</label>
              <select value={roleSelection} onChange={e => setRoleSelection(e.target.value as Role)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500">
                <option value="WORKER">פועל / עובד שטח (אפליקציה בנייד)</option>
                <option value="MANAGER">מנהל עבודה ראשי (דשבורד משרד)</option>
                <option value="FINISH_MANAGER">מנהל גמרים ואיכות (דשבורד משרד)</option>
                <option value="CRANE">מנופאי ועגורנאי (אפליקציה בנייד)</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-sm transition">היכנס למערכת</button>
          </form>
        </div>
      </div>
    );
  }

  // הגדרת הרשאות: האם מנהל או עובד שטח
  const isManagement = currentUser.role === 'MANAGER' || currentUser.role === 'FINISH_MANAGER';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col select-none" dir="rtl">
      
      {/* סרגל עליון */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl"><IconHardHat /></div>
          <div>
            <h2 className="text-sm font-bold text-white">{currentUser.name}</h2>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="text-amber-400 font-medium">
                {currentUser.role === 'MANAGER' ? 'מנהל עבודה' : currentUser.role === 'FINISH_MANAGER' ? 'מנהל גמרים' : currentUser.role === 'CRANE' ? 'מנופאי' : 'עובד שטח'}
              </span>
              <span>•</span>
              <button onClick={() => setIsOffline(!isOffline)} className="flex items-center gap-1 hover:text-white">
                {isOffline ? <IconWifiOff /> : <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                <span>{isOffline ? 'אופליין' : 'מחובר'}</span>
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs text-neutral-300">
          <IconLogout /> <span>יציאה</span>
        </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {/* =========================================
            דשבורד משרדי (מוצג רק למנהלים)
            ========================================= */}
        {isManagement ? (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">עובדים מאומתים באתר (PPE)</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">34</div>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">עגורן מס' 1</span>
                  <div className="text-xl font-black text-amber-400">22 קמ"ש</div>
                  <span className="text-[11px] text-emerald-400">רוח תקינה (מקס' 38)</span>
                </div>
                <IconWind />
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">תמונות מהשטח היום</span>
                <div className="text-2xl font-black text-blue-400 font-mono">{hazards.length}</div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><IconCamera /> פיד דיווחי שטח בזמן אמת</h3>
              {hazards.length === 0 ? (
                <p className="text-xs text-neutral-500">עדיין לא הועלו תמונות היום.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hazards.map(item => (
                    <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
                      <img src={item.image} alt="Hazard" className="w-full h-32 object-cover" />
                      <div className="p-3 text-xs space-y-1">
                        <strong className="block text-white truncate">{item.title}</strong>
                        <div className="flex justify-between text-[11px] text-neutral-400">
                          <span>{item.reporter}</span>
                          <span className="font-mono">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* =========================================
             אפליקציית שטח (מוצגת רק לפועלים ומנופאים)
             ========================================= */
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-2xl border border-neutral-800">
              <span className="text-xs text-neutral-400 flex items-center gap-1.5"><IconGlobe />שפה:</span>
              <div className="flex gap-1">
                {[{ code: 'he', label: 'עב' }, { code: 'ar', label: 'عرب' }, { code: 'en', label: 'EN' }, { code: 'ru', label: 'РУ' }, { code: 'hi', label: 'हि' }].map(l => (
                  <button key={l.code} onClick={() => setLang(l.code)} className={`px-2 py-1 rounded-lg text-[10px] font-bold ${lang === l.code ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>{l.label}</button>
                ))}
              </div>
            </div>

            {!clockedIn ? (
              <div className="p-5 bg-neutral-900 border-2 border-amber-500/50 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400"><IconShield /><h3 className="text-sm font-black text-white">{t.title}</h3></div>
                <p className="text-xs text-neutral-300">{t.subtitle}</p>
                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80"><input type="checkbox" checked={ppeChecked.helmet} onChange={e => setPpeChecked(p => ({ ...p, helmet: e.target.checked }))} className="w-4 h-4 accent-amber-500 rounded"/><span>{t.helmet}</span></label>
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80"><input type="checkbox" checked={ppeChecked.boots} onChange={e => setPpeChecked(p => ({ ...p, boots: e.target.checked }))} className="w-4 h-4 accent-amber-500 rounded"/><span>{t.boots}</span></label>
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer hover:bg-neutral-800/80"><input type="checkbox" checked={ppeChecked.vest} onChange={e => setPpeChecked(p => ({ ...p, vest: e.target.checked }))} className="w-4 h-4 accent-amber-500 rounded"/><span>{t.vest}</span></label>
                </div>
                <button disabled={!isPpeComplete} onClick={() => setClockedIn(true)} className="w-full py-3.5 bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 font-black rounded-xl text-xs transition active:scale-95">{t.enter}</button>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleCapture} className="hidden" />
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs"><span className="text-emerald-300 font-bold">{t.success}</span><span className="text-[10px] text-neutral-400">GPS V</span></div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => fileInputRef.current?.click()} className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center transition"><IconCamera /><span className="font-bold text-xs text-white">{t.reportHazard}</span></button>
                  <button onClick={() => fileInputRef.current?.click()} className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center transition"><IconHardHat /><span className="font-bold text-xs text-white">{t.reportProgress}</span></button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}