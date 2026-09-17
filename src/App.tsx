import { useState, useRef } from 'react';

// === אייקונים ===
const IconHardHat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IconCamera = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconShield = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconLogout = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconUsers = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconRadio = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>;
const IconMap = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;

// === טיפוסים ומסדי נתונים וירטואליים ===
type Role = 'MANAGER' | 'WORKER' | 'CRANE';
interface User { id: string; username: string; password: string; name: string; role: Role; }
interface Blueprint { id: string; title: string; date: string; }

export default function App() {
  // מסד נתונים של משתמשים (כולל משתמשי ברירת מחדל לבדיקה)
  const [usersDb, setUsersDb] = useState<User[]>([
    { id: '1', username: 'admin', password: '123', name: 'עומר בצלאל (מנהל)', role: 'MANAGER' },
    { id: '2', username: 'worker', password: '123', name: 'אחמד (פועל שלד)', role: 'WORKER' }
  ]);

  // מסד נתונים של תוכניות עבודה
  const [blueprints, setBlueprints] = useState<Blueprint[]>([
    { id: '1', title: 'תוכנית קומת מרתף - אינסטלציה', date: '15/09/2026' }
  ]);

  // סטייט התחברות
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // סטייט דשבורד מנהל
  const [adminTab, setAdminTab] = useState<'OVERVIEW' | 'USERS' | 'BLUEPRINTS'>('OVERVIEW');
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', role: 'WORKER' as Role });
  const [newBlueprint, setNewBlueprint] = useState('');

  // סטייט אפליקציית שטח
  const [ppeChecked, setPpeChecked] = useState({ helmet: false, boots: false, vest: false });
  const [clockedIn, setClockedIn] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === פונקציות התחברות ===
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usersDb.find(u => u.username === loginInput.username && u.password === loginInput.password);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
    } else {
      setLoginError('שם משתמש או סיסמה שגויים');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginInput({ username: '', password: '' });
    setClockedIn(false);
  };

  // === מסך התחברות חכם ===
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg"><IconHardHat /></div>
            <h1 className="text-xl font-black">BuildGuard Pro</h1>
            <p className="text-xs text-neutral-400">הזן פרטים מזהים לכניסה לאתר</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {loginError && <div className="p-3 bg-rose-500/10 border border-rose-500/50 text-rose-400 rounded-xl text-center">{loginError}</div>}
            <div>
              <label className="block text-neutral-400 mb-1">שם משתמש (User)</label>
              <input type="text" value={loginInput.username} onChange={e => setLoginInput({...loginInput, username: e.target.value})} required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" placeholder="admin / worker"/>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">סיסמה (Password)</label>
              <input type="password" value={loginInput.password} onChange={e => setLoginInput({...loginInput, password: e.target.value})} required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" placeholder="123"/>
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-sm transition">כניסה</button>
          </form>
        </div>
      </div>
    );
  }

  // === דשבורד מנהל (מחשב) ===
  if (currentUser.role === 'MANAGER') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col" dir="rtl">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl"><IconHardHat /></div>
            <div>
              <h2 className="text-sm font-bold">{currentUser.name} <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded ml-2">מנהל מערכת</span></h2>
              <span className="text-[11px] text-neutral-400">פאנל ניהול משרדי</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs transition"><IconLogout /> יציאה</button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* תפריט צד */}
          <div className="w-64 bg-neutral-900/50 border-l border-neutral-800 p-4 space-y-2">
            <button onClick={() => setAdminTab('OVERVIEW')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition ${adminTab === 'OVERVIEW' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconCamera /> מדדים ושטח</button>
            <button onClick={() => setAdminTab('USERS')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition ${adminTab === 'USERS' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconUsers /> ניהול משתמשים</button>
            <button onClick={() => setAdminTab('BLUEPRINTS')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition ${adminTab === 'BLUEPRINTS' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconMap /> שרטוטים ותוכניות</button>
          </div>

          {/* תוכן הפאנל */}
          <div className="flex-1 p-6 overflow-y-auto">
            {adminTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <h3 className="text-xl font-black text-white">סקירה כללית</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">משתמשים רשומים</span><div className="text-3xl font-black mt-2 text-emerald-400">{usersDb.length}</div></div>
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">תוכניות עבודה באוויר</span><div className="text-3xl font-black mt-2 text-blue-400">{blueprints.length}</div></div>
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">סטטוס מערכת קשר</span><div className="text-3xl font-black mt-2 text-amber-400">פעיל</div></div>
                </div>
              </div>
            )}

            {adminTab === 'USERS' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-black text-white flex items-center gap-2"><IconUsers /> יצירת משתמש / קבלן חדש</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if(newUser.username) {
                    setUsersDb([...usersDb, { ...newUser, id: Date.now().toString() }]);
                    setNewUser({ username: '', password: '', name: '', role: 'WORKER' });
                  }
                }} className="grid grid-cols-2 gap-4 bg-neutral-900 p-5 rounded-3xl border border-neutral-800 text-sm">
                  <div><label className="text-neutral-400 block mb-1">שם מלא / חברה</label><input type="text" value={newUser.name} onChange={e=>setNewUser({...newUser, name: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"/></div>
                  <div><label className="text-neutral-400 block mb-1">שם משתמש (Login)</label><input type="text" value={newUser.username} onChange={e=>setNewUser({...newUser, username: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"/></div>
                  <div><label className="text-neutral-400 block mb-1">סיסמה</label><input type="text" value={newUser.password} onChange={e=>setNewUser({...newUser, password: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"/></div>
                  <div><label className="text-neutral-400 block mb-1">תפקיד</label><select value={newUser.role} onChange={e=>setNewUser({...newUser, role: e.target.value as Role})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"><option value="WORKER">פועל / קבלן (אפליקציה)</option><option value="MANAGER">מנהל (דשבורד)</option></select></div>
                  <button type="submit" className="col-span-2 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-xl mt-2">הוסף משתמש</button>
                </form>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                  <table className="w-full text-sm text-right text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-500"><tr><th className="p-4">שם / חברה</th><th className="p-4">שם משתמש</th><th className="p-4">סיסמה</th><th className="p-4">הרשאה</th></tr></thead>
                    <tbody>
                      {usersDb.map(u => (
                        <tr key={u.id} className="border-t border-neutral-800"><td className="p-4">{u.name}</td><td className="p-4 font-mono text-amber-400">{u.username}</td><td className="p-4 font-mono">{u.password}</td><td className="p-4">{u.role}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === 'BLUEPRINTS' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-black text-white flex items-center gap-2"><IconMap /> שרטוטים ותוכניות לקבלנים</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="שם התוכנית (למשל: חשמל קומה 2)" value={newBlueprint} onChange={e=>setNewBlueprint(e.target.value)} className="flex-1 p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white outline-none"/>
                  <button onClick={() => { if(newBlueprint) { setBlueprints([{ id: Date.now().toString(), title: newBlueprint, date: new Date().toLocaleDateString('he-IL') }, ...blueprints]); setNewBlueprint(''); } }} className="px-6 bg-blue-500 text-white font-bold rounded-xl">העלה שרטוט</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {blueprints.map(bp => (
                    <div key={bp.id} className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex justify-between items-center">
                      <div><strong className="block text-white text-sm">{bp.title}</strong><span className="text-xs text-neutral-500">{bp.date}</span></div>
                      <IconMap />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // === אפליקציית שטח (נייד) ===
  const isPpeComplete = ppeChecked.helmet && ppeChecked.boots && ppeChecked.vest;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col select-none" dir="rtl">
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl"><IconHardHat /></div>
          <div><h2 className="text-sm font-bold text-white">{currentUser.name}</h2><span className="text-[11px] text-neutral-400">אפליקציית שטח</span></div>
        </div>
        <button onClick={handleLogout} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"><IconLogout /> ניתוק</button>
      </header>

      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4">
        {!clockedIn ? (
          <div className="p-5 bg-neutral-900 border-2 border-amber-500/50 rounded-3xl space-y-4 shadow-xl mt-4">
            <div className="flex items-center gap-2 text-amber-400"><IconShield /><h3 className="text-sm font-black">שער בטיחות יומי (PPE)</h3></div>
            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer"><input type="checkbox" checked={ppeChecked.helmet} onChange={e => setPpeChecked(p => ({ ...p, helmet: e.target.checked }))} className="w-4 h-4 accent-amber-500"/><span>קסדת מגן</span></label>
              <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer"><input type="checkbox" checked={ppeChecked.boots} onChange={e => setPpeChecked(p => ({ ...p, boots: e.target.checked }))} className="w-4 h-4 accent-amber-500"/><span>נעלי עבודה</span></label>
              <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl cursor-pointer"><input type="checkbox" checked={ppeChecked.vest} onChange={e => setPpeChecked(p => ({ ...p, vest: e.target.checked }))} className="w-4 h-4 accent-amber-500"/><span>אפוד זוהר</span></label>
            </div>
            <button disabled={!isPpeComplete} onClick={() => setClockedIn(true)} className="w-full py-3.5 bg-amber-500 disabled:bg-neutral-800 text-neutral-950 font-black rounded-xl text-xs transition">החתם נוכחות וכנס</button>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" />
            
            {/* כפתור מכשיר קשר PTT (Push To Talk) */}
            <button 
              onMouseDown={() => setIsTalking(true)} onMouseUp={() => setIsTalking(false)}
              onTouchStart={() => setIsTalking(true)} onTouchEnd={() => setIsTalking(false)}
              className={`w-full py-6 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${isTalking ? 'bg-rose-500 text-white scale-95 shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-amber-500'}`}
            >
              <IconRadio />
              <span className="font-black text-sm">{isTalking ? 'מקליט... שחרר לשליחה' : 'לחץ והחזק כדי לדבר (קשר)'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => fileInputRef.current?.click()} className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center gap-2"><IconCamera /><span className="text-xs font-bold text-white">צלם מהשטח</span></button>
              <button onClick={() => alert('מציג את התוכנית המעודכנת ביותר מהמשרד')} className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center gap-2"><IconMap /><span className="text-xs font-bold text-white">תוכניות ושרטוטים</span></button>
            </div>

            {/* רשימת התוכניות שהמנהל העלה */}
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-bold text-neutral-400">תוכניות עבודה עדכניות לקבלן:</h4>
              {blueprints.map(bp => (
                <div key={bp.id} className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-blue-400 font-medium">{bp.title}</span><span className="text-neutral-500">{bp.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}