import { useState, useEffect, useRef } from 'react';

// === אייקונים ===
const IconHardHat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IconCamera = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconShield = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconLogout = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconWind = () => <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19 12H2"/></svg>;
const IconRadio = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>;
const IconMap = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconFileText = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconShoppingCart = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const IconBell = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconUsers = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

// === מילון תרגומים (הוחזר!) ===
const translations: Record<string, any> = {
  he: { title: "מערכת בטיחות וניהול אתר", user: "שם משתמש", pass: "סיסמה", login: "התחבר למערכת" },
  ar: { title: "نظام إدارة السلامة", user: "اسم المستخدم", pass: "كلمة المرور", login: "تسجيل الدخول" },
  en: { title: "Site Safety & Management", user: "Username", pass: "Password", login: "Login" },
  ru: { title: "Система безопасности", user: "Имя пользователя", pass: "Пароль", login: "Войти" }
};

type Role = 'MANAGER' | 'WORKER' | 'CRANE' | 'SIGNALER' | 'CONTRACTOR';
interface User { id: string; username: string; password: string; name: string; role: Role; }
interface DocumentItem { id: string; title: string; type: 'DOC' | 'BLUEPRINT'; date: string; }

export default function App() {
  // החלפנו את המפתח ל-v3 כדי לנקות נתונים שגויים מהעבר
  const [usersDb, setUsersDb] = useState<User[]>(() => {
    const saved = localStorage.getItem('bg_users_v3');
    return saved ? JSON.parse(saved) : [
      { id: '1', username: 'admin', password: '123', name: 'עומר בצלאל (מנהל)', role: 'MANAGER' },
      { id: '2', username: 'worker', password: '123', name: 'אחמד (פועל)', role: 'WORKER' },
      { id: '3', username: 'crane', password: '123', name: 'משה (מנופאי)', role: 'CRANE' },
      { id: '4', username: 'contractor', password: '123', name: 'יוסי (קבלן)', role: 'CONTRACTOR' }
    ];
  });

  const [documentsDb, setDocumentsDb] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('bg_docs_v3');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'היתר בניה מעודכן.pdf', type: 'DOC', date: '01/09/2026' }
    ];
  });

  useEffect(() => { localStorage.setItem('bg_users_v3', JSON.stringify(usersDb)); }, [usersDb]);
  useEffect(() => { localStorage.setItem('bg_docs_v3', JSON.stringify(documentsDb)); }, [documentsDb]);

  const [lang, setLang] = useState('he');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [pushNotification, setPushNotification] = useState<string | null>(null);

  const [adminTab, setAdminTab] = useState<'OVERVIEW' | 'USERS' | 'DOCS'>('OVERVIEW');
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', role: 'WORKER' as Role });
  
  // משתנים להעלאת קבצים אמיתית
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newDocType, setNewDocType] = useState<'DOC' | 'BLUEPRINT'>('DOC');
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [clockedIn, setClockedIn] = useState(false);
  const [ppeChecked, setPpeChecked] = useState({ helmet: false, boots: false, vest: false });
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobileDevice(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const triggerPush = (msg: string) => {
    setPushNotification(msg);
    setTimeout(() => setPushNotification(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = loginInput.username.trim().toLowerCase();
    const cleanPass = loginInput.password.trim();

    const user = usersDb.find(u => u.username.trim().toLowerCase() === cleanUser && u.password.trim() === cleanPass);
    
    if (user) {
      setCurrentUser(user);
      setLoginInput({ username: '', password: '' });
    } else {
      alert('שם משתמש או סיסמה שגויים.\nשים לב: אם יצרת את המשתמש במחשב ואתה מנסה להתחבר אליו בנייד - המכשירים עדיין לא מחוברים לענן משותף.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const addDocumentToDb = () => {
    if (selectedFile) {
      setDocumentsDb([{ 
        id: Date.now().toString(), 
        title: selectedFile.name, 
        type: newDocType, 
        date: new Date().toLocaleDateString('he-IL') 
      }, ...documentsDb]);
      setSelectedFile(null); // איפוס הבחירה לאחר העלאה
    }
  };

  const t = translations[lang] || translations.he;

  const PushNotificationOverlay = () => (
    pushNotification ? (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
        <div className="bg-neutral-800 border-2 border-amber-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold">
          <div className="text-amber-500 animate-pulse"><IconBell /></div>{pushNotification}
        </div>
      </div>
    ) : null
  );

  // ==========================================
  // מסך התחברות (שפות עובדות!)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4" dir={lang === 'en' || lang === 'ru' ? 'ltr' : 'rtl'}>
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex justify-center gap-2 mb-4" dir="rtl">
            {[{ code: 'he', label: 'עברית' }, { code: 'ar', label: 'عربي' }, { code: 'en', label: 'EN' }, { code: 'ru', label: 'РУ' }].map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} className={`px-3 py-1 rounded-lg text-xs font-bold transition ${lang === l.code ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>{l.label}</button>
            ))}
          </div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg"><IconHardHat /></div>
            <h1 className="text-2xl font-black">BuildGuard Pro</h1>
            <p className="text-xs text-neutral-400">{t.title}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div><label className="block text-neutral-400 mb-1">{t.user}</label><input type="text" value={loginInput.username} onChange={e => setLoginInput({...loginInput, username: e.target.value})} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" dir="ltr" /></div>
            <div><label className="block text-neutral-400 mb-1">{t.pass}</label><input type="password" value={loginInput.password} onChange={e => setLoginInput({...loginInput, password: e.target.value})} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" dir="ltr" /></div>
            <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-xl text-base transition">{t.login}</button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // דשבורד משרדי (מנהל במחשב)
  // ==========================================
  if (currentUser.role === 'MANAGER' && !isMobileDevice) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col select-none" dir="rtl">
        <PushNotificationOverlay />
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl"><IconHardHat /></div>
            <div><h2 className="text-base font-bold">{currentUser.name}</h2><span className="text-[11px] text-neutral-400">דשבורד משרדי מורחב</span></div>
          </div>
          <button onClick={() => setCurrentUser(null)} className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs"><IconLogout /> ניתוק</button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-neutral-900/50 border-l border-neutral-800 p-4 space-y-2">
            <button onClick={() => setAdminTab('OVERVIEW')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold ${adminTab === 'OVERVIEW' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconMap /> מדדים ושטח</button>
            <button onClick={() => setAdminTab('DOCS')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold ${adminTab === 'DOCS' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconFileText /> פנקס מסמכים</button>
            <button onClick={() => setAdminTab('USERS')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold ${adminTab === 'USERS' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}><IconUsers /> ניהול משתמשים</button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {adminTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">עובדים באתר (PPE)</span><div className="text-4xl font-black mt-2 text-emerald-400">42</div></div>
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">רוח עגורן 1</span><div className="text-4xl font-black mt-2 text-amber-400">22 קמ"ש</div></div>
                  <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl"><span className="text-sm text-neutral-400">הזמנות חומרים</span><div className="text-4xl font-black mt-2 text-blue-400">1</div></div>
                </div>
              </div>
            )}

            {/* העלאת מסמכים אמיתית */}
            {adminTab === 'DOCS' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-black text-white flex items-center gap-2"><IconFileText /> העלאת מסמכים ותוכניות</h3>
                
                <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-3xl space-y-4">
                  <input type="file" ref={fileUploadRef} onChange={handleFileUpload} className="hidden" />
                  
                  <div className="flex gap-4 items-center">
                    <button onClick={() => fileUploadRef.current?.click()} className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl border border-neutral-700 transition">
                      בחר קובץ מהמחשב
                    </button>
                    
                    <span className="text-sm text-neutral-400">
                      {selectedFile ? `נבחר: ${selectedFile.name}` : 'לא נבחר קובץ'}
                    </span>
                  </div>

                  {selectedFile && (
                    <div className="flex gap-2 items-center border-t border-neutral-800 pt-4 mt-2">
                      <select value={newDocType} onChange={e=>setNewDocType(e.target.value as any)} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none">
                        <option value="DOC">מסמך (היתר/ביטוח/וכו')</option>
                        <option value="BLUEPRINT">תוכנית עבודה (שרטוט לשטח)</option>
                      </select>
                      <button onClick={addDocumentToDb} className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition">
                        העלה לאתר
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden mt-6">
                  <table className="w-full text-sm text-right text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-500"><tr><th className="p-4">שם הקובץ</th><th className="p-4">סוג</th><th className="p-4">תאריך העלאה</th><th className="p-4">פעולה</th></tr></thead>
                    <tbody>
                      {documentsDb.map(doc => (
                        <tr key={doc.id} className="border-t border-neutral-800">
                          <td className="p-4 font-bold text-white">{doc.title}</td>
                          <td className="p-4">{doc.type === 'DOC' ? <span className="text-amber-400">מסמך</span> : <span className="text-blue-400">שרטוט</span>}</td>
                          <td className="p-4">{doc.date}</td>
                          <td className="p-4"><button onClick={() => setDocumentsDb(documentsDb.filter(d => d.id !== doc.id))} className="text-rose-400">מחק</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === 'USERS' && (
              <div className="space-y-6 max-w-4xl">
                <h3 className="text-xl font-black text-white flex items-center gap-2"><IconUsers /> ניהול משתמשים</h3>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if(newUser.username) { 
                    setUsersDb([...usersDb, { ...newUser, username: newUser.username.trim().toLowerCase(), password: newUser.password.trim(), id: Date.now().toString() }]); 
                    setNewUser({ username: '', password: '', name: '', role: 'WORKER' }); 
                  } 
                }} className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-neutral-900 p-5 rounded-3xl border border-neutral-800 text-sm">
                  <div className="col-span-2 md:col-span-1"><label className="text-neutral-400 block mb-1">שם מלא</label><input type="text" value={newUser.name} onChange={e=>setNewUser({...newUser, name: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"/></div>
                  <div className="col-span-2 md:col-span-1"><label className="text-neutral-400 block mb-1">שם משתמש (Login)</label><input type="text" value={newUser.username} onChange={e=>setNewUser({...newUser, username: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white" dir="ltr"/></div>
                  <div className="col-span-2 md:col-span-1"><label className="text-neutral-400 block mb-1">סיסמה</label><input type="text" value={newUser.password} onChange={e=>setNewUser({...newUser, password: e.target.value})} required className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white" dir="ltr"/></div>
                  <div className="col-span-2 md:col-span-1"><label className="text-neutral-400 block mb-1">תפקיד</label><select value={newUser.role} onChange={e=>setNewUser({...newUser, role: e.target.value as Role})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white"><option value="WORKER">פועל</option><option value="CONTRACTOR">קבלן משנה</option><option value="CRANE">מנופאי</option><option value="MANAGER">מנהל</option></select></div>
                  <button type="submit" className="col-span-2 md:col-span-4 py-3 bg-emerald-500 text-neutral-950 font-black rounded-xl mt-2">הוסף משתמש</button>
                </form>
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                  <table className="w-full text-sm text-right text-neutral-300">
                    <thead className="bg-neutral-950 text-neutral-500"><tr><th className="p-4">שם עובד</th><th className="p-4">שם משתמש</th><th className="p-4">סיסמה</th><th className="p-4">תפקיד</th><th className="p-4">פעולה</th></tr></thead>
                    <tbody>{usersDb.map(u => (<tr key={u.id} className="border-t border-neutral-800"><td className="p-4 text-white font-bold">{u.name}</td><td className="p-4 font-mono text-amber-400">{u.username}</td><td className="p-4 font-mono">{u.password}</td><td className="p-4">{u.role}</td><td className="p-4"><button onClick={() => setUsersDb(usersDb.filter(user => user.id !== u.id))} className="text-rose-400">מחק</button></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // אפליקציית נייד
  // ==========================================
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col select-none" dir="rtl">
      <PushNotificationOverlay />
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between z-30 sticky top-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-neutral-950 rounded-xl"><IconHardHat /></div>
          <div><h2 className="text-sm font-bold text-white truncate max-w-[150px]">{currentUser.name}</h2><span className="text-[10px] text-neutral-400 font-medium bg-neutral-800 px-1.5 py-0.5 rounded">{currentUser.role === 'MANAGER' ? 'סיור מנהל' : 'אפליקציית שטח'}</span></div>
        </div>
        <button onClick={() => setCurrentUser(null)} className="text-neutral-400 p-2 hover:bg-neutral-800 rounded-lg"><IconLogout /></button>
      </header>

      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-5 pb-20">
        {!clockedIn && currentUser.role !== 'MANAGER' ? (
           <div className="p-5 bg-neutral-900 border-2 border-amber-500/50 rounded-3xl space-y-4">
             <div className="flex items-center gap-2 text-amber-400"><IconShield /><h3 className="text-sm font-black">שער בטיחות</h3></div>
             <div className="space-y-2.5 text-xs">
               <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl"><input type="checkbox" onChange={e => setPpeChecked(p => ({...p, helmet: e.target.checked}))} className="w-4 h-4 accent-amber-500"/><span>קסדת מגן</span></label>
               <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl"><input type="checkbox" onChange={e => setPpeChecked(p => ({...p, boots: e.target.checked}))} className="w-4 h-4 accent-amber-500"/><span>נעלי עבודה</span></label>
               <label className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl"><input type="checkbox" onChange={e => setPpeChecked(p => ({...p, vest: e.target.checked}))} className="w-4 h-4 accent-amber-500"/><span>אפוד זוהר</span></label>
               <button disabled={!ppeChecked.helmet || !ppeChecked.boots || !ppeChecked.vest} onClick={() => setClockedIn(true)} className="w-full py-4 bg-amber-500 disabled:bg-neutral-800 disabled:text-neutral-950 font-black rounded-xl text-xs mt-4">החתם כניסה</button>
             </div>
           </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
            <button onMouseDown={() => setIsTalking(true)} onMouseUp={() => setIsTalking(false)} onTouchStart={() => setIsTalking(true)} onTouchEnd={() => setIsTalking(false)} className={`w-full py-8 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all ${isTalking ? 'bg-amber-500 text-neutral-950 scale-95' : 'bg-neutral-900 border-2 border-neutral-800 text-neutral-400'}`}>
              <IconRadio /><span className="font-black text-sm">{isTalking ? 'מקליט...' : 'החזק כדי לדבר'}</span>
            </button>
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm"><IconFileText /> מסמכים ותוכניות קיימים במערכת</div>
              {documentsDb.map(doc => (
                <div key={doc.id} className="p-3 bg-neutral-950 rounded-xl flex justify-between items-center text-xs text-neutral-400 border border-neutral-800">
                  <span className="truncate">{doc.title}</span><span className="text-amber-400">פתח</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}