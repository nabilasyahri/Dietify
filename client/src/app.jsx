import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  
  // Auth State
  const [user, setUser] = useState(null) 
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  // Form State (Login/Register)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  
  // Data State
  const [userProgress, setUserProgress] = useState(null)
  const [userSchedule, setUserSchedule] = useState([])
  const [foodCategory, setFoodCategory] = useState('All')

  // INPUT DATA SENDIRI ---
  const [newSchedule, setNewSchedule] = useState({ day: 'Monday', time: '07:00', meal: '', workout: '' })
  const [editProgress, setEditProgress] = useState(false) // Mode edit progress
  const [tempProgress, setTempProgress] = useState({}) // Menampung inputan progress sementara

  // State air minum
  const [waterCount, setWaterCount] = useState(0)

  // --- DATA STATIC ---
  const workouts = [
    { id: 1, title: 'Candle Workout', duration: '15 min', intensity: 'Low', icon: '🕯️', desc: 'Relaxing yoga & breathing.', category: 'exercise' },
    { id: 2, title: 'Morning Energizer', duration: '20 min', intensity: 'Medium', icon: '☀️', desc: 'Full body wake up routine.', category: 'workout' },
    { id: 3, title: 'HIIT Burn', duration: '25 min', intensity: 'High', icon: '🔥', desc: 'High intensity cardio.', category: 'workout' },
    { id: 4, title: 'Yoga Flow', duration: '30 min', intensity: 'Low', icon: '🧘', desc: 'Flexibility & stress relief.', category: 'exercise' },
  ]

  const healthyRecipes = [
    { id: 1, name: 'Nasi Merah + Tumis Kangkung', calories: '280 kalori', prepTime: '20 menit', difficulty: 'Mudah', icon: '🍚', category: 'Makanan Pokok', type: 'Lunch', description: 'Nasi merah sehat dengan tumis kangkung.', ingredients: ['100g nasi merah', '1 ikat kangkung', 'Bawang putih'], steps: ['Tumis bumbu', 'Masak kangkung', 'Sajikan'], tips: 'Jangan overcooked.' },
    { id: 2, name: 'Smoothie Berry', calories: '120 kalori', prepTime: '5 menit', difficulty: 'Mudah', icon: '🥤', category: 'Minuman', type: 'Drink', description: 'Minuman segar antioksidan.', ingredients: ['Berry', 'Yoghurt', 'Madu'], steps: ['Blender semua'], tips: 'Pakai buah beku.' },
    { id: 3, name: 'Oatmeal Pisang', calories: '200 kalori', prepTime: '10 menit', difficulty: 'Mudah', icon: '🥣', category: 'Sarapan', type: 'Breakfast', description: 'Sarapan kaya serat.', ingredients: ['Oat', 'Susu', 'Pisang'], steps: ['Masak oat', 'Toping pisang'], tips: 'Tambah chia seeds.' },
    { id: 4, name: 'Ayam Bakar Kuning', calories: '250 kalori', prepTime: '40 menit', difficulty: 'Sedang', icon: '🍗', category: 'Lauk Protein', type: 'Dinner', description: 'Ayam bakar tanpa minyak.', ingredients: ['Ayam', 'Kunyit', 'Jahe'], steps: ['Ungkep', 'Panggang'], tips: 'Pakai teflon.' },
    { id: 5, name: 'Salad Telur', calories: '180 kalori', prepTime: '15 menit', difficulty: 'Mudah', icon: '🥗', category: 'Sayuran', type: 'Dinner', description: 'Salad segar protein.', ingredients: ['Selada', 'Telur', 'Tomat'], steps: ['Potong', 'Campur'], tips: 'Dressing lemon.' }
  ]

  // API ACTIONS 

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = authMode === 'login' ? `http://localhost:5000/api/login` : `http://localhost:5000/api/register`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setShowAuthModal(false);
        fetchUserData(data.id);
        alert(`Berhasil ${authMode === 'login' ? 'Login' : 'Daftar'}!`);
      } else {
        alert(typeof data === 'string' ? data : 'Gagal login/register');
      }
    } catch (error) { alert("Cek Backend Server!"); }
  };

  const fetchUserData = async (userId) => {
    try {
        const resProgress = await fetch(`http://localhost:5000/api/progress/${userId}`);
        if(resProgress.ok) {
            const data = await resProgress.json();
            setUserProgress(data);
            setTempProgress(data); // Set data awal untuk form edit
        }
        const resSchedule = await fetch(`http://localhost:5000/api/schedule/${userId}`);
        if(resSchedule.ok) {
            const data = await resSchedule.json();
            setUserSchedule(data);
        }
    } catch (err) { console.error(err); }
  }

  // FUNCTION: TAMBAH JADWAL BARU
  const handleAddSchedule = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch('http://localhost:5000/api/schedule', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  user_id: user.id,
                  day: newSchedule.day,
                  time: newSchedule.time,
                  meal_plan: newSchedule.meal,
                  workout_plan: newSchedule.workout
              })
          });
          if(res.ok) {
              const savedSchedule = await res.json();
              setUserSchedule([savedSchedule, ...userSchedule]); // Update UI langsung
              setNewSchedule({ day: 'Monday', time: '07:00', meal: '', workout: '' }); // Reset form
              alert("Jadwal Berhasil Disimpan!");
          }
      } catch (err) { alert("Gagal menyimpan jadwal"); }
  }

  // FUNCTION: UPDATE PROGRESS
  const handleUpdateProgress = async () => {
      try {
          const res = await fetch('http://localhost:5000/api/progress', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...tempProgress, user_id: user.id })
          });
          if(res.ok) {
              const updated = await res.json();
              setUserProgress(updated);
              setEditProgress(false);
              alert("Data Progress Diupdate!");
          }
      } catch (err) { alert("Gagal update progress"); }
  }

  const handleTabChange = (tab) => {
    if ((tab === 'schedule' || tab === 'progress') && !user) {
        setShowAuthModal(true); return;
    }
    setActiveTab(tab);
  }

  const filteredRecipes = foodCategory === 'All' ? healthyRecipes : healthyRecipes.filter(r => r.type === foodCategory);

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch(activeTab) {
      case 'food':
        return (
          <div className="food-page">
            <div className="container">
              <h2 className="section-title">🍽️ Healthy Menu</h2>
              <div className="category-filter">
                  {['All', 'Breakfast', 'Lunch', 'Dinner', 'Drink'].map(cat => (
                      <button key={cat} className={`category-btn ${foodCategory === cat ? 'active' : ''}`} onClick={() => setFoodCategory(cat)}>{cat}</button>
                  ))}
              </div>
              <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card" onClick={() => setSelectedRecipe(recipe)}>
                    <div className="recipe-card-header">
                      <div className="recipe-icon">{recipe.icon}</div>
                      <div><h3>{recipe.name}</h3><span className="recipe-card-category">{recipe.type}</span></div>
                    </div>
                    <p className="recipe-card-desc">{recipe.description}</p>
                    <button className="view-recipe-btn">👩‍🍳 Lihat Resep</button>
                  </div>
                ))}
              </div>
            </div>
            {selectedRecipe && (
                 <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
                 <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                   <button className="close-btn" onClick={() => setSelectedRecipe(null)}>×</button>
                   <h2>{selectedRecipe.name}</h2>
                   <p>{selectedRecipe.description}</p>
                   <div className="recipe-section"><h3>📝 Bahan:</h3><ul>{selectedRecipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                 </div>
               </div>
            )}
          </div>
        )
      
      case 'sport':
        return (
            <div className="page-content">
                <div className="container">
                    <h2 className="section-title">🏃‍♂️ Sport & Tutorials</h2>
                    <p className="section-subtitle">Categorized for your needs</p>
                    
                    <div className="sport-section">
                        <h3 className="category-title">🔥 Workout (High Intensity)</h3>
                        <div className="workout-grid">
                            {workouts.filter(w => w.category === 'workout').map(w => (
                                <div key={w.id} className="workout-card">
                                    <div className="workout-icon">{w.icon}</div>
                                    <h3>{w.title}</h3>
                                    <p className="workout-desc">{w.desc}</p>
                                    <div className="workout-footer">
                                        <span className="duration">⏱️ {w.duration}</span>
                                        <span className={`intensity ${w.intensity}`}>{w.intensity}</span>
                                    </div>
                                    <button className="start-btn">Watch Tutorial</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sport-section" style={{marginTop: '40px'}}>
                        <h3 className="category-title">🧘 Exercise (Low Impact)</h3>
                        <div className="workout-grid">
                            {workouts.filter(w => w.category === 'exercise').map(w => (
                                <div key={w.id} className="workout-card">
                                    <div className="workout-icon">{w.icon}</div>
                                    <h3>{w.title}</h3>
                                    <p className="workout-desc">{w.desc}</p>
                                    <div className="workout-footer">
                                        <span className="duration">⏱️ {w.duration}</span>
                                        <span className={`intensity ${w.intensity}`}>{w.intensity}</span>
                                    </div>
                                    <button className="start-btn">Watch Tutorial</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    
      
      case 'schedule':
        return (
            <div className="page-content">
                <div className="container">
                    <h2 className="section-title">📅 Your Weekly Schedule</h2>
                    
                    {/* FORM TAMBAH JADWAL */}
                    <div className="card" style={{maxWidth: '600px', margin: '0 auto 40px', textAlign: 'left'}}>
                        <h3 style={{color: 'var(--primary)', marginBottom: '15px'}}>➕ Add New Plan</h3>
                        <form onSubmit={handleAddSchedule} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <select 
                                    value={newSchedule.day} 
                                    onChange={e => setNewSchedule({...newSchedule, day: e.target.value})}
                                    style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                                >
                                    {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <input 
                                    type="time" 
                                    value={newSchedule.time} 
                                    onChange={e => setNewSchedule({...newSchedule, time: e.target.value})}
                                    style={{padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                                />
                            </div>
                            <input 
                                type="text" placeholder="What will you eat?" required
                                value={newSchedule.meal}
                                onChange={e => setNewSchedule({...newSchedule, meal: e.target.value})}
                                style={{padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                            />
                            <input 
                                type="text" placeholder="What is the workout?" required
                                value={newSchedule.workout}
                                onChange={e => setNewSchedule({...newSchedule, workout: e.target.value})}
                                style={{padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                            />
                            <button type="submit" className="btn btn-primary">Save to Schedule</button>
                        </form>
                    </div>

                    {userSchedule.length > 0 ? (
                         <div className="schedule-list">
                            {userSchedule.map((item, idx) => (
                                <div key={idx} className="schedule-card">
                                    <h3>{item.day}</h3>
                                    <div className="schedule-items">
                                        <div className="schedule-item">
                                            <span className="time">{item.time}</span>
                                            <span className="activity">🍽️ {item.meal_plan}</span>
                                        </div>
                                        <div className="schedule-item">
                                            <span className="time">Workout</span>
                                            <span className="activity">🏃‍♂️ {item.workout_plan}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    ) : <p className="section-subtitle">No plans yet. Add one above!</p>}
                </div>
            </div>
        )
      
      case 'progress':
        const WORKOUT_TARGET = 20; 
        const CALORIE_TARGET = 5000;
        
        // --- LOGIKA BARU YANG LEBIH PINTAR ---
        const currentW = Number(userProgress?.current_weight || 0);
        const goalW = Number(userProgress?.weight_goal || 0);
        
        let weightStatus = "";
        let weightPercent = 0;
        let barColor = "var(--primary)"; // Default hijau

        // Skenario 1: Belum isi data
        if (currentW === 0 || goalW === 0) {
            weightStatus = "Set data first";
            weightPercent = 0;
        } 
        // Skenario 2: SUKSES (Berat Sekarang <= Target)
        else if (currentW <= goalW) {
            weightStatus = "Goal Reached! 🎉";
            weightPercent = 100;
        } 
        // Skenario 3: MASIH PROSES (Diet)
        else {
            const diff = currentW - goalW; // Contoh: 50 - 48 = 2kg
            weightStatus = `${diff.toFixed(1)} kg to go`; 

            // RUMUS PINTAR: Semakin dekat (selisih kecil), persen semakin besar.
            // Kita anggap "Selisih 20kg" itu titik nol (0%).
            // Jadi kalau selisih cuma 2kg, persennya tinggi.
            // Rumus: 100 - (Selisih * 5)
            // Contoh kamu (50 - 48 = 2): 100 - (2 * 5) = 90% (HIJAU TEBAL!)
            
            let calculatedPercent = 100 - (diff * 5); 
            if (calculatedPercent < 5) calculatedPercent = 5; // Minimal 5% biar ada isinya dikit
            weightPercent = calculatedPercent;

            // Atur Warna Bar berdasarkan kedekatan
            if (weightPercent < 30) barColor = "#ff4757"; // Merah (Masih jauh)
            else if (weightPercent < 70) barColor = "#ffa502"; // Kuning (Lumayan)
            else barColor = "#2ed573"; // Hijau (Dikit lagi!)
        }

        // Hitung Persen Workout & Kalori
        const calculatePercent = (curr, max) => Math.min(Math.round((curr / max) * 100), 100);
        const workoutPercent = calculatePercent(userProgress?.workouts_completed, WORKOUT_TARGET);
        const caloriePercent = calculatePercent(userProgress?.calories_burned, CALORIE_TARGET);
        
        // Overall Score (Rata-rata)
        const totalProgress = Math.round((weightPercent + workoutPercent + caloriePercent) / 3);

        return (
            <div className="page-content">
                <div className="container">
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                        <h2 className="section-title" style={{marginBottom: 0}}>📊 Your Progress</h2>
                        {!editProgress ? (
                            <button className="btn btn-secondary" style={{fontSize: '0.8rem', padding: '5px 15px'}} onClick={() => setEditProgress(true)}>✏️ Edit Data</button>
                        ) : (
                            <div style={{display: 'flex', gap: '5px'}}>
                                <button className="btn btn-primary" style={{fontSize: '0.8rem'}} onClick={handleUpdateProgress}>💾 Save</button>
                                <button className="btn btn-secondary" style={{fontSize: '0.8rem', borderColor: '#ccc', color: '#666'}} onClick={() => setEditProgress(false)}>❌ Cancel</button>
                            </div>
                        )}
                    </div>
                    
                    {editProgress && (
                        <div className="card" style={{maxWidth: '800px', margin: '0 auto 30px', background: '#e8f5e9'}}>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                                <div>
                                    <label style={{fontSize: '0.8rem', color: '#666'}}>Current Weight (kg)</label>
                                    <input type="number" className="full-width" style={{padding: '8px'}} 
                                        value={tempProgress.current_weight || ''} 
                                        onChange={e => setTempProgress({...tempProgress, current_weight: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label style={{fontSize: '0.8rem', color: '#666'}}>Target Weight (kg)</label>
                                    <input type="number" className="full-width" style={{padding: '8px'}} 
                                        value={tempProgress.weight_goal || ''} 
                                        onChange={e => setTempProgress({...tempProgress, weight_goal: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label style={{fontSize: '0.8rem', color: '#666'}}>Workouts Done</label>
                                    <input type="number" className="full-width" style={{padding: '8px'}} 
                                        value={tempProgress.workouts_completed || ''} 
                                        onChange={e => setTempProgress({...tempProgress, workouts_completed: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label style={{fontSize: '0.8rem', color: '#666'}}>Calories Burned</label>
                                    <input type="number" className="full-width" style={{padding: '8px'}} 
                                        value={tempProgress.calories_burned || ''} 
                                        onChange={e => setTempProgress({...tempProgress, calories_burned: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="progress-dashboard">
                        {/* Lingkaran Utama */}
                        <div className="progress-card main-stats">
                             <h3>Overall Score</h3>
                             <div className="circular-progress" 
                                  style={{background: `conic-gradient(var(--primary) ${totalProgress}%, #eee 0)`}}
                             >
                                 <div className="percent">{totalProgress}%</div>
                                 <p>Success Rate</p>
                             </div>
                        </div>

                        <div className="progress-cards">
                            {/* KARTU BERAT BADAN */}
                            <div className="progress-card">
                                <h3>Weight Loss</h3>
                                <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: barColor}}>
                                    {weightStatus}
                                </p>
                                <p style={{fontSize: '0.8rem', color: '#666'}}>
                                    Current: {currentW}kg / Target: {goalW}kg
                                </p>
                                {/* Progress Bar Visual */}
                                <div style={{height: '10px', background: '#eee', marginTop: '10px', borderRadius: '5px', overflow: 'hidden'}}>
                                    <div style={{
                                        width: `${weightPercent}%`, 
                                        height: '100%', 
                                        background: barColor, /* Warna berubah sesuai progres */
                                        transition: 'width 1s ease-in-out'
                                    }}></div>
                                </div>
                                <p style={{fontSize: '0.7rem', marginTop:'5px', color:'#999'}}>
                                    {weightPercent >= 90 ? "You're extremely close!" : "Keep going!"}
                                </p>
                            </div>

                            <div className="progress-card">
                                <h3>Workouts</h3>
                                <p>{userProgress?.workouts_completed || 0} / {WORKOUT_TARGET} Sessions</p>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: `${workoutPercent}%`}}></div>
                                </div>
                            </div>

                            <div className="progress-card">
                                <h3>Calories</h3>
                                <p>{userProgress?.calories_burned || 0} / {CALORIE_TARGET} kcal</p>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: `${caloriePercent}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
      
      default: return (
          <>
            <section className="hero">
              <div className="container">
                <h1 className="hero-title">Simplify ur <span className="highlight">diet</span> with us</h1>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={() => setActiveTab('food')}>Get Started</button>
                  <button className="btn btn-secondary" onClick={() => handleTabChange('schedule')}>My Schedule</button>
                </div>
              </div>
            </section>
            <section className="features-info container">
                <div className="feature-box"><h3>🥗 Healthy Food</h3><p>Curated recipes for daily meals.</p></div>
                <div className="feature-box"><h3>🏃 Sport Guides</h3><p>Workouts tailored for diet.</p></div>
                <div className="feature-box"><h3>📅 Smart Schedule</h3><p>Organize your plan easily.</p></div>
            </section>
            <section className="diet-tips">
              <div className="container">
                <h2>Today's Diet Tip</h2>
                <div className="tip-card">
                  <div className="tip-icon">💧</div>
                  <div className="tip-content">
                    <h3>Stay Hydrated</h3>
                    <p>Drink at least 8 glasses of water today.</p>
                    <div className="water-tracker">
                      <div className="water-bottles">
                        {[1,2,3,4,5,6,7,8].map((num) => (
                          <div 
                            key={num} 
                            // Logika warna: Jika nomor botol <= jumlah minum, jadi biru
                            className={`water-bottle ${num <= waterCount ? 'filled' : ''}`}
                            // Logika klik: Ubah jumlah minum sesuai botol yg diklik
                            onClick={() => setWaterCount(num)}
                            style={{cursor: 'pointer'}}
                          ></div>
                        ))}
                      </div>
                      <p><b>{waterCount}</b>/8 glasses today</p>
                      <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>
                        {waterCount >= 8 ? "Great job! You're fully hydrated! 💧" : "Keep drinking!"}
                      </p>
                    </div>
                    {/* ------------------------- */}

                  </div>
                </div>
              </div>
            </section>
          </>
        )
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo" onClick={() => setActiveTab('home')}><span style={{fontSize: '24px', marginRight: '10px'}}>🥗</span><h1>Dietify</h1></div>
          <div className="nav-links">
            <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Home</button>
            <button className={`nav-link ${activeTab === 'food' ? 'active' : ''}`} onClick={() => setActiveTab('food')}>Food</button>
            <button className={`nav-link ${activeTab === 'sport' ? 'active' : ''}`} onClick={() => setActiveTab('sport')}>Sport</button>
            <button className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => handleTabChange('schedule')}>{user ? 'Schedule' : '🔒 Schedule'}</button>
            <button className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => handleTabChange('progress')}>{user ? 'Progress' : '🔒 Progress'}</button>
            {!user ? (
                <button className="btn btn-primary" style={{marginLeft: '10px', padding: '5px 15px'}} onClick={() => setShowAuthModal(true)}>Login</button>
            ) : (
                <button className="btn btn-secondary" style={{marginLeft: '10px', padding: '5px 15px'}} onClick={() => {setUser(null); setActiveTab('home')}}>Logout</button>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">{renderContent()}</main>

      {showAuthModal && (
        <div className="modal-overlay">
            <div className="modal-content auth-modal">
                <button className="close-btn" onClick={() => setShowAuthModal(false)}>×</button>
                <h2>{authMode === 'login' ? 'Welcome Back!' : 'Join Dietify'}</h2>
                <form onSubmit={handleAuth} className="auth-form">
                    {authMode === 'register' && (
                        <input type="text" placeholder="Username" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                    )}
                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    <button type="submit" className="btn btn-primary full-width">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
                </form>
                <p className="auth-switch">
                    {authMode === 'login' ? "New here? " : "Have account? "}
                    <span onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>{authMode === 'login' ? 'Sign Up' : 'Login'}</span>
                </p>
            </div>
        </div>
      )}
    </div>
  )
}

export default App