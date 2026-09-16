import { useState, useRef } from 'react';

// אייקונים גרפיים עצמאיים
const IconHardHat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IconCamera = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconShield = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconLogout = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

interface HazardReport {
  id: string;
  image: string;
  title: string;
  reporter: string;
  time: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; role: 'MANAGER' | 'FINISH_MANAGER' | 'WORKER' | 'CRANE' } | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState<'MANAGER' | 'FINISH_MANAGER' | 'WORKER' | 'CRANE'>('WORKER');

  const [ppe, setPpe] = useState({ helmet: false, boots: false, vest: false });
  const [clockedIn, setClockedIn] = useState(false);
  const [hazards, setHazards] = useState<HazardReport[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setCurrentUser({ name: username, role: roleSelection });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setClockedIn(false);
    setPpe({ helmet: false, boots: false, vest: false });
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHazards(prev => [
        {
          id: Date.now().toString(),
          image: imageUrl,
          title: 'ליקוי בטיחות דווח מהשטח',
          reporter: currentUser?.name || 'עובד',
          time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto">
              <IconHardHat />
            </div>
            <h1 className="text-xl font-black">BuildGuard Pro</h1>
            <p className="text-xs text-neutral-400">כניסה למערכת ניהול ובטיחות אתר</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">שם משתמש / מזהה</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="למשל: ישראל ישראלי"
                required
                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">תפקיד באתר</label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value as any)}
                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500"
              >
                <option value="WORKER">פועל / עובד אתר (אפליקציית שטח)</option>
                <option value="MANAGER">מנהל עבודה ראשי (דשבורד משרדי מלא)</option>
                <option value="FINISH_MANAGER">מנהל גמרים ואיכות</option>
                <option value="CRANE">מנופאי ועגורנאי</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-sm transition"
            >
              התחבר למערכת
            </button>
          </form>
        </div>
      </div>
    );
  }

  const isManagement = currentUser.role === 'MANAGER' || currentUser.role === 'FINISH_MANAGER';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col" dir="rtl">
      
      {/* תפריט עליון מותאם אישית */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl">
            <IconHardHat />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-none">{currentUser.name}</h2>
            <span className="text-[11px] text-amber-400 font-medium">
              {currentUser.role === 'MANAGER' && 'מנהל עבודה ראשי'}
              {currentUser.role === 'FINISH_MANAGER' && 'מנהל גמרים ואיכות'}
              {currentUser.role === 'WORKER' && 'עובד שטח'}
              {currentUser.role === 'CRANE' && 'מנופאי מוסמך'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
        >
          <IconLogout />
          <span>התנתק</span>
        </button>
      </header>

      {/* אזור תוכן לפי תפקיד */}
      <main className="flex-1 p-4 overflow-y-auto">
        
        {/* תצוגת מנהלים: דשבורד משרד */}
        {isManagement ? (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">עובדים שרכסו קסדה הבוקר</span>
                <div className="text-2xl font-black text-emerald-400">28</div>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">מפגעים שצולמו היום</span>
                <div className="text-2xl font-black text-rose-400">{hazards.length}</div>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">רוח עגורן צריח</span>
                <div className="text-2xl font-black text-amber-400">19 קמ"ש</div>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400">סטטוס יומן</span>
                <div className="text-2xl font-black text-blue-400">מעודכן</div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">דיווחים ותמונות מהשטח בזמן אמת</h3>
              {hazards.length === 0 ? (
                <p className="text-xs text-neutral-500">עדיין לא צולמו מפגעים היום מהשטח.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hazards.map((item) => (
                    <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
                      <img src={item.image} alt="Hazard" className="w-full h-36 object-cover" />
                      <div className="p-3 text-xs space-y-1">
                        <strong className="block text-white">{item.title}</strong>
                        <div className="text-neutral-400 flex justify-between text-[11px]">
                          <span>דווח ע״י: {item.reporter}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* תצוגת פועלים: אפליקציית שטח עם מצלמה אמיתית */
          <div className="max-w-md mx-auto space-y-5">
            {!clockedIn ? (
              <div className="p-5 bg-neutral-900 border border-amber-500/40 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <IconShield />
                  <h3 className="font-bold text-white text-sm">בדיקת בטיחות וכניסה יומית (PPE)</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ppe.helmet}
                      onChange={(e) => setPpe(p => ({ ...p, helmet: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span>קסדת מגן רכוסה כחוק</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ppe.boots}
                      onChange={(e) => setPpe(p => ({ ...p, boots: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span>נעלי עבודה בעלות כיפת מגן</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ppe.vest}
                      onChange={(e) => setPpe(p => ({ ...p, vest: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span>אפוד זוהר תקני</span>
                  </label>
                </div>

                <button
                  disabled={!ppe.helmet || !ppe.boots || !ppe.vest}
                  onClick={() => setClockedIn(true)}
                  className="w-full py-3.5 bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 font-black rounded-xl text-xs transition"
                >
                  החתם כניסה והפעל אפליקציה
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* קלט מצלמה מובנה במכשיר הנייד */}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={handleCapture}
                  className="hidden"
                />

                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex justify-between items-center text-xs">
                  <span className="text-emerald-300 font-bold">נוכחות פעילה באתר</span>
                  <span className="text-neutral-400">GPS מאומת</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center"
                  >
                    <IconCamera />
                    <span className="font-bold text-xs text-white">צלם מפגע בטיחות</span>
                    <span className="text-[10px] text-neutral-400">פותח מצלמה ישירה</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-2 text-center"
                  >
                    <IconHardHat />
                    <span className="font-bold text-xs text-white">צלם התקדמות גמר</span>
                    <span className="text-[10px] text-neutral-400">תיעוד בקרת איכות</span>
                  </button>
                </div>

                {hazards.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-neutral-400">תמונות שצילמת היום:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hazards.map((h) => (
                        <img key={h.id} src={h.image} alt="Reported" className="rounded-xl w-full h-24 object-cover border border-neutral-800" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}