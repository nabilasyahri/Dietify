import { useState } from 'react'
import './App.css'

function App() {
  const workouts = [
    { id: 1, title: 'Candle Workout', duration: '15 min', intensity: 'Low', icon: '🕯️', desc: 'A relaxing workout focused on flexibility and breathing with candle meditation' },
    { id: 2, title: 'Morning Energizer', duration: '20 min', intensity: 'Medium', icon: '☀️', desc: 'Wake up your body with this full-body morning routine' },
    { id: 3, title: 'HIIT Burn', duration: '25 min', intensity: 'High', icon: '🔥', desc: 'High intensity interval training for maximum calorie burn' },
    { id: 4, title: 'Yoga Flow', duration: '30 min', intensity: 'Low', icon: '🧘', desc: 'Improve flexibility and reduce stress with guided yoga' },
  ]

  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
    switch(activeTab) {
      case 'food':
        return <div className="page-content"><h2>Food & Nutrition</h2><p>Meal plans and recipes coming soon!</p></div>
      case 'sport':
        return <div className="page-content"><h2>Sport & Exercise</h2><p>Workout routines coming soon!</p></div>
      case 'schedule':
        return <div className="page-content"><h2>Schedule</h2><p>Your weekly schedule coming soon!</p></div>
      case 'progress':
        return <div className="page-content"><h2>Progress Tracking</h2><p>Track your fitness journey here!</p></div>
      default:
        return (
          <>
            <section className="hero">
              <div className="container">
                <h1 className="hero-title">
                  Simplify ur <span className="highlight">diet</span> with us
                </h1>
                <p className="hero-subtitle">The best diet menu for you</p>
                <div className="hero-buttons">
                  <button className="btn btn-primary">Get Started</button>
                  <button className="btn btn-secondary">Learn More</button>
                </div>
              </div>
            </section>

            <section className="workouts">
              <div className="container">
                <h2 className="section-title">Wanna do some exercise?</h2>
                <div className="workout-grid">
                  {workouts.map(workout => (
                    <div key={workout.id} className="workout-card">
                      <div className="workout-icon">{workout.icon}</div>
                      <h3>{workout.title}</h3>
                      <p className="workout-desc">{workout.desc}</p>
                      <div className="workout-footer">
                        <span className="duration">⏱️ {workout.duration}</span>
                        <span className={`intensity ${workout.intensity}`}>{workout.intensity}</span>
                      </div>
                      <button className="start-btn">Start Workout</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="diet-tips">
              <div className="container">
                <h2>Today's Diet Tip</h2>
                <div className="tip-card">
                  <div className="tip-icon">💧</div>
                  <div className="tip-content">
                    <h3>Stay Hydrated</h3>
                    <p>Drink at least 8 glasses of water throughout the day for better metabolism</p>
                    <div className="water-tracker">
                      <div className="water-bottles">
                        {[1,2,3,4,5,6,7,8].map((num) => (
                          <div key={num} className={`water-bottle ${num <= 5 ? 'filled' : ''}`}></div>
                        ))}
                      </div>
                      <p>5/8 glasses today</p>
                    </div>
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
          <div className="logo" onClick={() => setActiveTab('home')}>
            <span style={{fontSize: '24px', marginRight: '10px'}}>🥗</span>
            <h1>Dietify</h1>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeTab === 'food' ? 'active' : ''}`}
              onClick={() => setActiveTab('food')}
            >
              Food
            </button>
            <button 
              className={`nav-link ${activeTab === 'sport' ? 'active' : ''}`}
              onClick={() => setActiveTab('sport')}
            >
              Sport
            </button>
            <button 
              className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule
            </button>
            <button 
              className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App