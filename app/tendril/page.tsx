"use client"
import React, { useState } from 'react';
import { Heart, Home, Compass, User, CheckCircle2, XCircle, Share2, Zap, TrendingUp, Award, Calendar } from 'lucide-react';

const DefinitionWord = ({ word, definition }) => {
  const [showDef, setShowDef] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onMouseEnter={() => setShowDef(true)}
        onMouseLeave={() => setShowDef(false)}
        onClick={() => setShowDef(!showDef)}
        className="border-b-2 border-dotted border-rose-400 text-gray-800 cursor-help hover:text-rose-600 transition-colors"
      >
        {word}
      </button>
      {showDef && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
          {definition}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </span>
  );
};

const PulseDesign1V2 = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentPage, setCurrentPage] = useState(0);
  
  // Case state
  const [caseAnswer, setCaseAnswer] = useState(null);
  const [caseResult, setCaseResult] = useState(false);
  
  // Red Flag state
  const [redFlagAnswer, setRedFlagAnswer] = useState(null);
  const [redFlagResult, setRedFlagResult] = useState(false);
  
  // Connections state
  const [connectionsState, setConnectionsState] = useState({
    selected: [],
    solved: [],
    mistakes: 0,
    showResult: false
  });
  
  // Mystery state
  const [mysteryState, setMysteryState] = useState({
    clueFound: false,
    answer: null,
    showResult: false
  });

  const connectionsItems = [
    'Saddle anaesthesia', 'Urinary retention', 'Bilateral leg weakness', 'Loss of anal tone',
    'Chest pain to back', 'Unequal BP in arms', 'Widened mediastinum', 'New aortic regurg',
    'Petechial rash', 'Neck stiffness', 'Photophobia', 'Altered consciousness'
  ];

  const toggleConnectionsItem = (item) => {
    if (connectionsState.selected.includes(item)) {
      setConnectionsState({
        ...connectionsState,
        selected: connectionsState.selected.filter(i => i !== item)
      });
    } else if (connectionsState.selected.length < 4) {
      setConnectionsState({
        ...connectionsState,
        selected: [...connectionsState.selected, item]
      });
    }
  };

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-lg z-50">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentPage(0)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === 0 ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" fill={currentPage === 0 ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">Today</span>
          </button>
          
          <button
            onClick={() => setCurrentPage(1)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === 1 ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Compass className="w-6 h-6" fill={currentPage === 1 ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">Wander</span>
          </button>
          
          <button
            onClick={() => setCurrentPage(2)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === 2 ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <User className="w-6 h-6" fill={currentPage === 2 ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-10 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-800">Pulse</h1>
              <p className="text-sm text-gray-500 font-medium">Tuesday, Dec 2</p>
            </div>
          </div>

          {/* Streak */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-orange-200/50">
            <Zap className="w-4 h-4 text-orange-500" fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">52 day streak</span>
          </div>
        </div>

        {/* Today's Challenges */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Challenges</h2>
          
          <button 
            onClick={() => setCurrentView('case')}
            className="w-full mb-4 p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50 text-left transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-rose-500 mb-2 tracking-wider">DAILY CASE #52</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Chest Pain</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  32-year-old with sudden pleuritic pain...
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center ml-4 flex-shrink-0 shadow-sm">
                <span className="text-3xl">🫀</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 font-medium">
              <Calendar className="w-3 h-3 mr-1" />
              <span>2 min</span>
            </div>
          </button>

          <button 
            onClick={() => setCurrentView('redFlag')}
            className="w-full mb-4 p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50 text-left transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-red-500 mb-2 tracking-wider">SILENT KILLER</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Red Flag Hunt</h3>
                <p className="text-sm text-gray-600">Spot the dangerous sign in the noise</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center ml-4 flex-shrink-0 shadow-sm">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentView('connections')}
            className="w-full mb-4 p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50 text-left transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-purple-500 mb-2 tracking-wider">CONNECTIONS</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Patterns</h3>
                <p className="text-sm text-gray-600">Group signs by syndrome</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center ml-4 flex-shrink-0 shadow-sm">
                <span className="text-3xl">🧩</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentView('mystery')}
            className="w-full mb-4 p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50 text-left transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-violet-500 mb-2 tracking-wider">MINI-MYSTERY</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Decisive Clue</h3>
                <p className="text-sm text-gray-600">One finding changes everything</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center ml-4 flex-shrink-0 shadow-sm">
                <span className="text-3xl">🔍</span>
              </div>
            </div>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );

  const CaseView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 mt-4">
          <button 
            onClick={() => { setCurrentView('home'); setCaseResult(false); setCaseAnswer(null); }}
            className="text-gray-600 text-sm font-semibold"
          >
            ← Back
          </button>
          <div className="text-xs font-bold text-rose-500 tracking-wider">DAILY CASE #52</div>
        </div>

        <div className="mb-8 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center shadow-sm">
            <span className="text-4xl">🫀</span>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Chest Pain Case</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              A <span className="font-semibold text-rose-600">32-year-old</span> man presents to the emergency department with sudden onset of sharp, left-sided <DefinitionWord word="pleuritic chest pain" definition="Pain that worsens with breathing" />. Started <span className="font-semibold text-rose-600">2 hours ago</span>.
            </p>
            <p>
              He reports mild <DefinitionWord word="dyspnoea" definition="Shortness of breath" /> but denies cough, fever, or recent trauma. Non-smoker, no significant past history.
            </p>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">Examination</div>
              <p>Appears comfortable at rest but grimaces with deep breaths.</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="text-xs text-gray-600 mb-1">Heart Rate</div>
                  <div className="font-mono text-lg font-bold text-gray-800">88</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <div className="text-xs text-gray-600 mb-1">BP</div>
                  <div className="font-mono text-lg font-bold text-gray-800">125/78</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <div className="text-xs text-gray-600 mb-1">RR</div>
                  <div className="font-mono text-lg font-bold text-gray-800">20</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="text-xs text-gray-600 mb-1">SpO₂</div>
                  <div className="font-mono text-lg font-bold text-gray-800">96%</div>
                </div>
              </div>
              <p className="mt-3">Chest clear to auscultation bilaterally.</p>
            </div>
            <div className="pt-4">
              <p className="font-semibold text-gray-800">What is the most appropriate next investigation?</p>
            </div>
          </div>
        </div>

        {!caseResult && (
          <div className="space-y-3">
            {[
              { text: 'Chest X-ray', correct: false },
              { text: 'ECG', correct: false },
              { text: 'D-dimer', correct: true },
              { text: 'CT pulmonary angiogram', correct: false }
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setCaseAnswer(index);
                  setTimeout(() => setCaseResult(true), 300);
                }}
                className={`w-full p-5 rounded-2xl text-left font-medium transition-all ${
                  caseAnswer === index
                    ? 'bg-rose-100 border-2 border-rose-300 scale-[0.98]'
                    : 'bg-white/70 backdrop-blur-sm border-2 border-gray-200/50 hover:border-rose-200 hover:shadow-md'
                }`}
              >
                <span className="text-gray-800">{option.text}</span>
              </button>
            ))}
          </div>
        )}

        {caseResult && (
          <div className="animate-in fade-in duration-500">
            <div className={`p-6 rounded-3xl mb-6 ${
              caseAnswer === 2
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200' 
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
            }`}>
              <div className="flex items-start gap-4">
                {caseAnswer === 2 ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    caseAnswer === 2 ? 'text-emerald-800' : 'text-amber-800'
                  }`}>
                    {caseAnswer === 2 ? 'Nice catch.' : 'Not quite—here is the thinking.'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {caseAnswer === 2 
                      ? 'D-dimer is the right first step for low-to-moderate risk PE. Good clinical reasoning on risk stratification.'
                      : 'For suspected PE in a low-risk patient, D-dimer is more appropriate as a first-line test. It has high negative predictive value and can help avoid unnecessary radiation.'}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 flex items-center justify-center gap-2 text-gray-700 font-semibold hover:bg-white hover:shadow-md transition-all">
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );

  const RedFlagView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 mt-4">
          <button 
            onClick={() => { setCurrentView('home'); setRedFlagResult(false); setRedFlagAnswer(null); }}
            className="text-gray-600 text-sm font-semibold"
          >
            ← Back
          </button>
          <div className="text-xs font-bold text-red-500 tracking-wider">SILENT KILLER</div>
        </div>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400/20 to-rose-400/20 backdrop-blur-sm flex items-center justify-center border border-red-200/30 shadow-sm">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Spot the Red Flag</h2>
          <p className="text-sm text-gray-600">One sign demands immediate action</p>
        </div>

        <div className="mb-8 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              A <span className="font-semibold text-red-600">67-year-old</span> man presents with lower back pain for <span className="font-semibold text-red-600">3 days</span>. He describes it as "the worst pain I've ever had" and rates it <span className="font-mono font-bold text-red-600">8/10</span>.
            </p>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">History</div>
              <p>Slight difficulty passing urine since yesterday. No trauma. No fever. Takes aspirin for previous MI.</p>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">Examination</div>
              <p className="mb-3">Tender over L4-L5. <DefinitionWord word="Reduced perianal sensation" definition="Saddle anaesthesia - emergency!" />. Power 4/5 in both legs. Reflexes present but reduced.</p>
            </div>
          </div>
        </div>

        {!redFlagResult && (
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-700 mb-4">Which finding is the red flag?</h3>
            <div className="space-y-3">
              {[
                { text: 'Reduced perianal sensation', isFlag: true },
                { text: 'Difficulty passing urine', isFlag: true },
                { text: 'Power 4/5 in both legs', isFlag: false },
                { text: 'Pain rated 8/10', isFlag: false }
              ].map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setRedFlagAnswer(i);
                    setTimeout(() => setRedFlagResult(true), 300);
                  }}
                  className={`w-full p-5 rounded-2xl text-left font-medium transition-all ${
                    redFlagAnswer === i
                      ? 'bg-red-100 border-2 border-red-300 scale-[0.98]'
                      : 'bg-white/70 backdrop-blur-sm border-2 border-gray-200/50 hover:border-red-200 hover:shadow-md'
                  }`}
                >
                  <span className="text-gray-800">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {redFlagResult && (
          <div className="animate-in fade-in duration-500">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl mb-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Excellent catch.</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    You spotted the red flags for <span className="font-semibold">cauda equina syndrome</span>.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/60 rounded-xl">
                      <div className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">The Flags</div>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Saddle anaesthesia</span> + <span className="font-semibold">urinary retention</span> = surgical emergency requiring immediate MRI.
                      </p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-xl">
                      <div className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Why It Matters</div>
                      <p className="text-sm text-gray-700">
                        Delayed diagnosis can lead to permanent paralysis and loss of bowel/bladder function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 flex items-center justify-center gap-2 text-gray-700 font-semibold hover:bg-white hover:shadow-md transition-all">
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );

  const ConnectionsView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 mt-4">
          <button 
            onClick={() => { setCurrentView('home'); setConnectionsState({ selected: [], solved: [], mistakes: 0, showResult: false }); }}
            className="text-gray-600 text-sm font-semibold"
          >
            ← Back
          </button>
          <div className="text-xs font-bold text-purple-600 tracking-wider">CONNECTIONS #52</div>
        </div>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 backdrop-blur-sm flex items-center justify-center border border-purple-200/30 shadow-sm">
            <span className="text-3xl">🧩</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Emergency Connections</h2>
          <p className="text-sm text-gray-600">Group the signs by syndrome</p>
        </div>

        {connectionsState.solved.map((group, idx) => (
          <div key={idx} className={`mb-4 p-5 rounded-2xl shadow-sm ${
            idx === 0 ? 'bg-gradient-to-br from-purple-100 to-fuchsia-100 border border-purple-200' :
            idx === 1 ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200' :
            'bg-gradient-to-br from-rose-100 to-orange-100 border border-rose-200'
          }`}>
            <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">{group.category}</div>
            <div className="text-sm text-gray-700 font-medium">{group.items.join(' • ')}</div>
          </div>
        ))}

        {!connectionsState.showResult && (
          <>
            {connectionsState.selected.length > 0 && (
              <div className="mb-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Selected ({connectionsState.selected.length}/4)
                  </span>
                  {connectionsState.selected.length === 4 && (
                    <button
                      onClick={() => {
                        const group1 = ['Saddle anaesthesia', 'Urinary retention', 'Bilateral leg weakness', 'Loss of anal tone'];
                        if (connectionsState.selected.every(item => group1.includes(item))) {
                          setConnectionsState({
                            ...connectionsState,
                            solved: [...connectionsState.solved, { category: 'Cauda Equina Syndrome', items: connectionsState.selected }],
                            selected: [],
                            showResult: connectionsState.solved.length === 2
                          });
                        } else {
                          setConnectionsState({
                            ...connectionsState,
                            mistakes: connectionsState.mistakes + 1,
                            selected: []
                          });
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {connectionsState.selected.map((item, i) => (
                    <div key={i} className="px-3 py-1.5 bg-purple-500 text-white text-xs font-semibold rounded-lg">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {connectionsState.mistakes > 0 && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center shadow-sm">
                <span className="text-sm text-amber-700 font-semibold">Mistakes: {connectionsState.mistakes}/4</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {connectionsItems.filter(item => !connectionsState.solved.some(g => g.items.includes(item))).map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleConnectionsItem(item)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    connectionsState.selected.includes(item)
                      ? 'bg-purple-500 text-white scale-95 shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {connectionsState.showResult && (
          <div className="animate-in fade-in duration-500">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl mb-6 shadow-md">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-1">Perfect grouping!</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    You identified all three emergency syndromes. Strong pattern recognition.
                  </p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 flex items-center justify-center gap-2 text-gray-700 font-semibold hover:bg-white hover:shadow-md transition-all">
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );

  const MysteryView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 mt-4">
          <button 
            onClick={() => { setCurrentView('home'); setMysteryState({ clueFound: false, answer: null, showResult: false }); }}
            className="text-gray-600 text-sm font-semibold"
          >
            ← Back
          </button>
          <div className="text-xs font-bold text-violet-600 tracking-wider">MINI-MYSTERY #52</div>
        </div>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-400/20 to-purple-400/20 backdrop-blur-sm flex items-center justify-center border border-violet-200/30 shadow-sm">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">The Decisive Clue</h2>
          <p className="text-sm text-gray-600">One finding changes everything</p>
        </div>

        <div className="mb-8 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-md border border-gray-200/50">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Presentation</div>
              <p className="text-gray-800 leading-relaxed">
                A <span className="font-semibold text-violet-600">58-year-old</span> man presents with severe{' '}
                <DefinitionWord word="tearing chest pain" definition="Classic for aortic dissection" /> radiating to his back. 
                Started <span className="font-semibold text-violet-600">3 hours ago</span> while lifting boxes.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-violet-600 mb-3 uppercase tracking-wider">Vital Signs</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => !mysteryState.clueFound && setMysteryState({ ...mysteryState, clueFound: true })}
                  className={`p-3 rounded-xl border transition-all ${
                    mysteryState.clueFound 
                      ? 'bg-gradient-to-br from-rose-100 to-red-100 border-rose-300 ring-2 ring-rose-300'
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 hover:border-blue-200'
                  }`}
                >
                  <div className="text-xs text-gray-600 mb-1">Blood Pressure</div>
                  <div className="font-mono text-lg font-bold text-gray-800">
                    <span className="text-rose-600">165</span>/95
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Right arm</div>
                </button>
                <button
                  onClick={() => !mysteryState.clueFound && setMysteryState({ ...mysteryState, clueFound: true })}
                  className={`p-3 rounded-xl border transition-all ${
                    mysteryState.clueFound 
                      ? 'bg-gradient-to-br from-rose-100 to-red-100 border-rose-300 ring-2 ring-rose-300'
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 hover:border-blue-200'
                  }`}
                >
                  <div className="text-xs text-gray-600 mb-1">Blood Pressure</div>
                  <div className="font-mono text-lg font-bold text-gray-800">
                    <span className="text-rose-600">125</span>/80
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Left arm</div>
                </button>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <div className="text-xs text-gray-600 mb-1">Heart Rate</div>
                  <div className="font-mono text-lg font-bold text-gray-800">102</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <div className="text-xs text-gray-600 mb-1">SpO₂</div>
                  <div className="font-mono text-lg font-bold text-gray-800">97%</div>
                </div>
              </div>
            </div>

            {!mysteryState.clueFound && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center italic">
                  Tap the vital sign that reveals the diagnosis
                </p>
              </div>
            )}
          </div>
        </div>

        {mysteryState.clueFound && !mysteryState.showResult && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-6 p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-3xl shadow-sm">
              <h3 className="font-semibold text-violet-800 mb-3">What does this clue suggest?</h3>
              <div className="space-y-2">
                {[
                  'Aortic dissection',
                  'Myocardial infarction',
                  'Pulmonary embolism',
                  'Musculoskeletal pain'
                ].map((option, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMysteryState({ ...mysteryState, answer: i, showResult: true });
                    }}
                    className="w-full p-4 bg-white/80 backdrop-blur-sm rounded-xl text-left hover:bg-white hover:shadow-md transition-all border border-violet-200/50 font-medium text-gray-800"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mysteryState.showResult && (
          <div className="animate-in fade-in duration-500">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl mb-6 shadow-md">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Excellent detective work.</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    The <span className="font-semibold text-rose-600">40 mmHg BP difference</span> between arms is the decisive clue for aortic dissection.
                  </p>
                  <div className="p-4 bg-white/60 rounded-xl">
                    <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Key Learning</div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Always check BP in <span className="font-semibold">both arms</span> for chest pain. A difference {'>'} 20 mmHg suggests dissection involving the subclavian artery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 flex items-center justify-center gap-2 text-gray-700 font-semibold hover:bg-white hover:shadow-md transition-all">
              <Share2 className="w-4 h-4" />
              Share Result
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );

  const WanderView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="mb-10 mt-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Wander</h1>
          <p className="text-sm text-gray-600">What clinicians are learning today</p>
        </div>

        <div className="space-y-4">
          {[
            { text: "Saw Kawasaki disease today. Key features: cracked lips, strawberry tongue, lymphadenopathy. Don't miss it.", time: '2h ago', role: 'Paeds Registrar', color: 'from-teal-400 to-cyan-400' },
            { text: 'Reminder: Always check glucose in altered consciousness. Saved a patient today with this basic step.', time: '4h ago', role: 'ED Consultant', color: 'from-purple-400 to-pink-400' },
            { text: 'Elderly lady with confusion turned out to be hyponatraemia. Electrolytes matter more than you think.', time: '6h ago', role: 'Medicine Intern', color: 'from-rose-400 to-orange-400' },
            { text: 'Never forget to ask about occupational exposures in respiratory cases. Found asbestosis today.', time: '8h ago', role: 'Resp Registrar', color: 'from-blue-400 to-indigo-400' },
            { text: 'ECG pearl: ST elevation in aVR with widespread ST depression = left main occlusion. Time is myocardium.', time: '10h ago', role: 'Cardiology Fellow', color: 'from-emerald-400 to-teal-400' }
          ].map((log, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-200/50 hover:shadow-md transition-all">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${log.color} flex-shrink-0 shadow-sm`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    "{log.text}"
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{log.role}</span>
                    <span>•</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all">
          Add Your Learning
        </button>
      </div>
      <BottomNav />
    </div>
  );

  const ProfileView = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="mb-10 mt-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-lg">
            <span className="text-5xl">👨‍⚕️</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Dr. Sarah Chen</h1>
          <p className="text-sm text-gray-600">Emergency Medicine Registrar</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center shadow-sm border border-gray-200/50">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-400/20 to-rose-400/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-500" fill="currentColor" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">52</div>
            <div className="text-xs text-gray-600 font-medium">Day Streak</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center shadow-sm border border-gray-200/50">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">87%</div>
            <div className="text-xs text-gray-600 font-medium">Accuracy</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center shadow-sm border border-gray-200/50">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
            <div className="text-xs text-gray-600 font-medium">Badges</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { type: 'Daily Case', result: 'Correct', color: 'emerald', time: 'Today, 8:30am' },
              { type: 'Red Flag', result: 'Correct', color: 'emerald', time: 'Today, 8:32am' },
              { type: 'Connections', result: '1 mistake', color: 'amber', time: 'Today, 8:35am' },
              { type: 'Daily Case', result: 'Correct', color: 'emerald', time: 'Yesterday' }
            ].map((activity, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{activity.type}</div>
                  <div className="text-xs text-gray-600">{activity.time}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.color === 'emerald' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {activity.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Badges</h2>
          <div className="grid grid-cols-4 gap-3">
            {['🔥', '⚡', '🎯', '🧠', '💎', '🏆', '⭐', '🌟'].map((badge, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm border border-gray-200/50">
                <div className="text-3xl mb-1">{badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );

  return (
    <>
      {currentPage === 0 && currentView === 'home' && <HomeView />}
      {currentView === 'case' && <CaseView />}
      {currentView === 'redFlag' && <RedFlagView />}
      {currentView === 'connections' && <ConnectionsView />}
      {currentView === 'mystery' && <MysteryView />}
      {currentPage === 1 && <WanderView />}
      {currentPage === 2 && <ProfileView />}
    </>
  );
};

export default PulseDesign1V2;