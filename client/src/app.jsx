import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  
  // auth State
  const [user, setUser] = useState(null) 
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  // form State (login/register)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  
  // data State
  const [userProgress, setUserProgress] = useState(null)
  const [userSchedule, setUserSchedule] = useState([])
  const [foodCategory, setFoodCategory] = useState('All')

  // INPUT DATA SENDIRI ---
  const [newSchedule, setNewSchedule] = useState({ day: 'Monday', time: '07:00', meal: '', workout: '' })
  const [editProgress, setEditProgress] = useState(false) // Mode edit progress
  const [tempProgress, setTempProgress] = useState({}) // Menampung inputan progress sementara

  // state air minum
  const [waterCount, setWaterCount] = useState(0)

  // DATA STATIC
  const workouts = [
    { 
      id: 1, 
      title: 'Candle Workout', 
      duration: '15 min', 
      intensity: 'Low', 
      icon: '🕯️', 
      desc: 'Relaxing yoga & breathing.', 
      category: 'exercise', 
      link: 'https://youtu.be/VCcar3MA07w?si=-kXjE09vmKbAvWYB' 
    },
    { 
      id: 2, 
      title: 'Morning Energizer', 
      duration: '20 min', 
      intensity: 'Medium', 
      icon: '☀️', 
      desc: 'Full body wake up routine.', 
      category: 'workout', 
      link: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' 
    },
    { 
      id: 3, 
      title: 'HIIT Burn', 
      duration: '30 min', 
      intensity: 'High', 
      icon: '🔥', 
      desc: 'High intensity cardio.', 
      category: 'workout', 
      link: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' 
    },
    { 
      id: 4, 
      title: 'Yoga Flow', 
      duration: '25 min', 
      intensity: 'Low', 
      icon: '🧘', 
      desc: 'Flexibility & stress relief.', 
      category: 'exercise', 
      link: 'https://www.youtube.com/watch?v=Eml2xnoLpYE' 
    },
    { 
      id: 5, 
      title: 'Wall Workspace', 
      duration: '15 min', 
      intensity: 'Low', 
      icon: '🧱', 
      desc: 'Stability & posture support.', 
      category: 'exercise', 
      link: 'https://youtube.com/shorts/OOUdZAdemRI?si=8_XMf9uMmSB6Jylj' 
    },
        { 
      id: 6, 
      title: 'Metabolic Blast', 
      duration: '15 min', 
      intensity: 'High', 
      icon: '🥊', 
      desc: 'Max calorie shredding.', 
      category: 'workout', 
      link: 'https://youtu.be/7lLLBC3ppNY?si=wWdAuFjfOpqbtIQD' 
    },

  ]

  const educationalContent = [
  { 
    id: 101, 
    title: 'Cara pemanasan yang Benar', 
    desc: 'Teknik dasar pemanasan.', 
    duration: '6 min', 
    intensity: 'Education', 
    icon: '🏃', 
    link: 'https://youtu.be/LBUpt3ymFHQ?si=AobRExArUVRePc0n' 
  },
  { 
    id: 102, 
    title: 'Pentingnya Rest Day', 
    desc: 'Kenapa istirahat krusial bagi otot.', 
    duration: '13 min', 
    intensity: 'Knowledge', 
    icon: '🛌', 
    link: 'http://www.youtube.com/watch?v=PxSCQ8IC9xw' 
  },
  { 
    id: 103, 
    title: 'Edukasi pemula', 
    desc: 'Kesalahan pemula saat berolahraga.', 
    duration: '6 min', 
    intensity: 'Educatiom', 
    icon: '🏋️‍♂️', 
    link: 'https://youtu.be/p_3ywg5vhjY?si=3QaHz9Wjkm7pXcMA' 
  },
  { 
    id: 104, 
    title: 'Program Latihan', 
    desc: 'Panduan menyusun jadwal latihan.', 
    duration: '21 min', 
    intensity: 'Guide', 
    icon: '📝', 
    link: 'http://www.youtube.com/watch?v=rN92rbUoQDE' 
  }
];

  const healthyRecipes = [
    { 
      id: 1, name: 'Nasi Merah + Tumis Kangkung', calories: '280 kalori', prepTime: '20 menit', difficulty: 'Mudah', icon: '🍚', category: 'Makanan Pokok', type: 'Lunch', 
      description: 'Nasi merah sehat dengan tumis kangkung rendah minyak.', 
      ingredients: ['100g nasi merah', '1 ikat kangkung', '2 siung bawang putih', 'Sedikit garam & kaldu jamur'], 
      steps: ['Masak nasi merah hingga matang.', 'Tumis bawang putih dengan sedikit minyak zaitun.', 'Masukkan kangkung, beri sedikit air dan bumbu.', 'Sajikan selagi hangat.'], 
      tips: 'Jangan masak kangkung terlalu lama agar tetap renyah.' 
    },
    { 
      id: 2, name: 'Smoothie Berry Yogurt', calories: '120 kalori', prepTime: '5 menit', difficulty: 'Mudah', icon: '🥤', category: 'Minuman', type: 'Drink', 
      description: 'Minuman segar kaya antioksidan.', 
      ingredients: ['50g blueberry/strawberry', '150ml Greek yogurt', '1 sdt madu'], 
      steps: ['Cuci bersih semua buah.', 'Masukkan semua bahan ke dalam blender.', 'Blender hingga halus.', 'Tuang ke gelas dan sajikan dingin.'], 
      tips: 'Gunakan buah beku agar tekstur lebih kental.' 
    },
    { 
      id: 3, name: 'Oatmeal Pisang Kayu Manis', calories: '200 kalori', prepTime: '10 menit', difficulty: 'Mudah', icon: '🥣', category: 'Sarapan', type: 'Breakfast', 
      description: 'Sarapan kaya serat yang bikin kenyang lebih lama.', 
      ingredients: ['4 sdm rolled oat', '200ml susu rendah lemak', '1 buah pisang', 'Sedikit kayu manis bubuk'], 
      steps: ['Masak oat dengan susu hingga tekstur menjadi bubur.', 'Iris pisang tipis-tipis.', 'Letakkan oat di mangkuk, hiasi dengan pisang.', 'Taburkan kayu manis bubuk di atasnya.'], 
      tips: 'Tambah chia seeds untuk tambahan protein.' 
    },
    { 
      id: 4, name: 'Salad Telur Rebus', calories: '180 kalori', prepTime: '15 menit', difficulty: 'Mudah', icon: '🥗', category: 'Sayuran', type: 'Dinner', 
      description: 'Salad segar praktis untuk makan malam ringan.', 
      ingredients: ['2 butir telur rebus', 'Selada secukupnya', 'Tomat ceri', 'Perasan jeruk lemon'], 
      steps: ['Potong selada dan tomat ceri sesuai selera.', 'Kupas telur rebus dan belah menjadi dua.', 'Campurkan semua bahan di mangkuk.', 'Siram dengan perasan lemon sebagai dressing.'], 
      tips: 'Jangan gunakan mayones berlebihan jika sedang diet ketat.' 
    },
    { 
      id: 5, name: 'Dada Ayam Panggang', calories: '250 kalori', prepTime: '30 menit', difficulty: 'Sedang', icon: '🍗', category: 'Lauk Protein', type: 'Dinner', 
      description: 'Protein tinggi tanpa digoreng.', 
      ingredients: ['150g dada ayam fillet', 'Lada hitam & garam', 'Bawang putih bubuk'], 
      steps: ['Marinasi ayam dengan lada, garam, dan bawang putih selama 10 menit.', 'Panaskan teflon anti lengket.', 'Panggang ayam hingga berubah warna kecokelatan di kedua sisi.', 'Pastikan bagian dalam matang sempurna.'], 
      tips: 'Panggang dengan api sedang agar tidak keras.' 
    },
    { 
      id: 6, name: 'Infused Water Lemon', calories: '10 kalori', prepTime: '5 menit', difficulty: 'Mudah', icon: '🍋', category: 'Minuman', type: 'Drink', 
      description: 'Detoks alami untuk membakar lemak.', 
      ingredients: ['500ml air mineral', '1/2 buah lemon', 'Beberapa lembar daun mint'], 
      steps: ['Iris tipis buah lemon.', 'Masukkan lemon dan daun mint ke dalam botol air.', 'Simpan di kulkas minimal 2 jam.', 'Minum sepanjang hari.'], 
      tips: 'Jangan diamkan lebih dari 24 jam agar tidak pahit.' 
    },

    { 
      id: 7, name: 'Tortilla Wrap', calories: '300 kalori', prepTime: '8 menit', difficulty: 'Mudah', icon: '🌯', category: 'Makanan pokok', type: 'Lunch', 
      description: 'Menu "on-the-go" jika sedang sedang sibuk.', 
      ingredients: ['1 lembar kulit tortilla', 'Irisan dada ayam', 'Selada dan parutan wortel'], 
      steps: ['Tata semua bahan di atas tortilla.', 'Gulung kulit tortila.', 'Panggang sebentar di teflon jika ingin garing.'], 
      tips: 'berikan Greek yogurt polos sebagai dressing pengganti mayones agar lebih rendah kalori.' 
    },

    { 
      id: 8, name: 'Orak-Arik Telur Bayam', calories: '300 kalori', prepTime: '8 menit', difficulty: 'Mudah', icon: '🍳', category: 'Sarapan', type: 'Breakfast', 
      description: 'Menu hangat kaya zat besi.', 
      ingredients: ['2 butir telur', 'Segenggam bayam', 'sedikit tomat'], 
      steps: ['Tumis bayam dan tomat sebentar', 'Masukkan telur yang sudah dikocok.', 'Aduk rata sampai matang.'], 
      tips: 'Gunakan sedikit minyak atau cooking spray.' 
    },

     { 
      id: 9, name: 'Iced Green Tea Honey', calories: '25 kalori', prepTime: '8 menit', difficulty: 'Mudah', icon: '🍵', category: 'Minuman', type: 'Drink', 
      description: 'Teh hijau pembakar lemak.', 
      ingredients: ['1 kantong teh hijau', 'air panas', 'es batu', '1 sdt madu murni'], 
      steps: ['Seduh teh', 'Tunggu agak dingin.', 'Tambahkan madu dan es batu.'], 
      tips: 'Jangan campur madu saat air mendidih.' 
    },

     { 
      id: 10, name: 'Sup Ayam Sayur Bening', calories: '200 kalori', prepTime: '15 menit', difficulty: 'Sedang', icon: '🍲', category: 'Lauk protein', type: 'Dinner', 
      description: 'Comfort food penghidrasi tubuh.', 
      ingredients: ['100g dada ayam (potong dadu)', 'wortel', 'buncis', 'daun seldri', 'bawang putih geprek', 'garam', 'lada putih'], 
      steps: ['Rebus ayam hingga matang', 'Masukkan sayuran.', 'Tambahkan bumbu.', 'Masak hingga sayur empuk'], 
      tips: 'jangan masak ayam terlalu lama.' 
    },

     { 
      id: 11, name: 'Apple Peanut Butter Toast', calories: '220 kalori', prepTime: '3 menit', difficulty: 'Mudah', icon: '🥪', category: 'Sarapan', type: 'Breakfast', 
      description: 'Roti dengan tekstur yang renyah dan manis.', 
      ingredients: ['1 lembar roti gandum', '1 sdm selai kacang (tanpa gula)', 'iris tipis ½ buah apel'], 
      steps: ['Panggang roti', 'Oleskan selai kacang di atas roti.', 'tata irisan apel.'], 
      tips: 'taburkan sedikit kayu manis bubuk.' 
    },

     { 
      id: 12, name: 'Rice Bowl Ayam Teriyaki', calories: '350 kalori', prepTime: '12 menit', difficulty: 'Sedang', icon: '🍱', category: 'Makanan pokok', type: 'Lunch', 
      description: 'Menu resto mudah dirumah.', 
      ingredients: ['3-4 sdm nasi merah', '100g dada ayam (potong kotak)', 'brokoli', 'sedikit saus teriyaki'], 
      steps: ['Tumis ayam di teflon dengan sedikit minyak zaitun hingga matang', 'Masukkan brokoli dan saus teriyaki.', 'Sajikan di atas nasi merah.'], 
      tips: 'jangan masak ayam terlalu lama.' 
    }
  ]

  // Fungsi untuk menghitung BMI
const [bmiInput, setBmiInput] = useState({ weight: '', height: '' });
const [bmiResult, setBmiResult] = useState(null);

const handleCalculateBMI = (e) => {
  e.preventDefault();
  const w = parseFloat(bmiInput.weight);
  const h = parseFloat(bmiInput.height) / 100; // ubah ke meter

  if (w > 0 && h > 0) {
    const bmiValue = (w / (h * h)).toFixed(1);
    let status = "";
    let color = "";

    if (bmiValue < 18.5) { status = "Underweight"; color = "#3498db"; }
    else if (bmiValue < 25) { status = "Normal"; color = "#2ecc71"; }
    else if (bmiValue < 30) { status = "Overweight"; color = "#f1c40f"; }
    else { status = "Obese"; color = "#e74c3c"; }

    setBmiResult({ value: bmiValue, status, color });
  }
};


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
              <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxHeight: '80vh', overflowY: 'auto'}}>
                <button className="close-btn" onClick={() => setSelectedRecipe(null)}>×</button>
                <h2>{selectedRecipe.icon} {selectedRecipe.name}</h2>
                <p style={{color: '#666', marginBottom: '20px'}}>{selectedRecipe.description}</p>
                
                {/* Bagian Bahan */}
                <div className="recipe-section">
                  <h3>📝 Bahan-bahan:</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                {/* Bagian Langkah-langkah */}
                <div className="recipe-section" style={{marginTop: '20px'}}>
                  <h3>👩‍🍳 Langkah Memasak:</h3>
                  <ol>
                    {selectedRecipe.steps.map((step, i) => <li key={i} style={{marginBottom: '8px'}}>{step}</li>)}
                  </ol>
                </div>

                {/* Bagian Tips */}
                <div className="recipe-tips" style={{marginTop: '20px', padding: '10px', background: '#f9f9f9', borderRadius: '8px'}}>
                  <p><b>💡 Tips:</b> {selectedRecipe.tips}</p>
                </div>
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
                                    <button className="start-btn" onClick={() => window.open(w.link, '_blank')}>Watch Tutorial</button>
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
                                    <button className="start-btn" onClick={() => window.open(w.link, '_blank')}>Watch Tutorial</button>
                                </div>
                            ))}
                        </div>
                    </div>

{/* KATEGORI 3: EDUCATIONAL */}
        <div className="sport-section" style={{ marginTop: '40px' }}>
          <h3 className="category-title">📚 Educational Content (Pro Tips)</h3>
          <div className="workout-grid">
            {educationalContent.map(edu => (
              <div key={edu.id} className="workout-card">
                <div className="workout-icon">{edu.icon}</div>
                <h3>{edu.title}</h3>
                <p className="workout-desc">{edu.desc}</p>
                <div className="workout-footer">
                  <span className="duration">⏱️ {edu.duration}</span>
                  {/* Class 'intensity Low' digunakan agar warna badge mengikuti style CSS Low Impact */}
                  <span className="intensity Low">{edu.intensity}</span>
                </div>
                <button className="start-btn" onClick={() => window.open(edu.link, '_blank')}>Watch Tutorial</button>
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
              <div className="welcome-header" style={{marginBottom: '20px'}}>
                <h2>Hi, {user?.username || 'User'}! 👋</h2>
                <p>This is your plan for the week.</p>
              </div>
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
        
        // LOGIKA 
        const currentW = Number(userProgress?.current_weight || 0);
        const goalW = Number(userProgress?.weight_goal || 0);
        
        let weightStatus = "";
        let weightPercent = 0;
        let barColor = "var(--primary)"; 

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

            // RUMUS: Semakin dekat (selisih kecil), persen semakin besar.
            // Kita anggap "Selisih 20kg" itu titik nol (0%).
            // Jadi kalau selisih cuma 2kg, persennya tinggi.
            // Rumus: 100 - (Selisih * 5)
            // Contoh (50 - 48 = 2): 100 - (2 * 5) = 90% (HIJAU TEBAL!)
            
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
              <div className="welcome-header">
              <h2>Hi, {user?.username || 'User'}! 👋</h2>
              <p>Here's your fitness journey so far.</p>
            </div>
                <div className="container">
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                        <h2 className="section-title" style={{marginTop: 0}}>📊 Your Progress</h2>
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
            <section className="container" style={{marginTop: '40px', padding: '0 10%'}}>
  <div className="card" style={{display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center', background: '#fff'}}>
    <div style={{flex: 1, minWidth: '300px'}}>
      <h2 style={{color: 'var(--primary)'}}>Check Your BMI ⚖️</h2>
      <p style={{color: '#666'}}>Calculate your Body Mass Index to know your health status.</p>
      
      <form onSubmit={handleCalculateBMI} style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
        <input 
          type="number" 
          placeholder="Weight (kg)" 
          style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd', flex: 1}}
          value={bmiInput.weight}
          onChange={(e) => setBmiInput({...bmiInput, weight: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Height (cm)" 
          style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd', flex: 1}}
          value={bmiInput.height}
          onChange={(e) => setBmiInput({...bmiInput, height: e.target.value})}
        />
        <button type="submit" style={{padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Calculate</button>
      </form>
    </div>

    {bmiResult && (
      <div style={{flex: 1, minWidth: '250px', textAlign: 'center', padding: '20px', borderRadius: '15px', background: '#f9f9f9', borderLeft: `8px solid ${bmiResult.color}`}}>
        <p style={{margin: 0, fontSize: '0.9rem', color: '#666'}}>Your BMI Result</p>
        <h1 style={{margin: '10px 0', fontSize: '3rem', color: '#333'}}>{bmiResult.value}</h1>
        <div style={{display: 'inline-block', padding: '5px 15px', borderRadius: '20px', background: bmiResult.color, color: 'white', fontWeight: 'bold'}}>
          {bmiResult.status}
        </div>
      </div>
    )}
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