import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Resume } from './pages/Resume';
import { Jobs } from './pages/Jobs';
import { ATS } from './pages/ATS';
import { Interview } from './pages/Interview';
import { Assistant } from './pages/Assistant';
import Settings from './pages/Settings';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { useSettings } from './hooks/useSettings';

function AppEffects() {
  useSettings();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppEffects />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* App Shell routes - Protected */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/ats" element={<ATS />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
