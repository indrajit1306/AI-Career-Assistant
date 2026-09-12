import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Resume } from './pages/Resume';
import { Jobs } from './pages/Jobs';
import { ATS } from './pages/ATS';
import { Interview } from './pages/Interview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* App Shell routes */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/ats" element={<ATS />} />
          <Route path="/interview" element={<Interview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
