import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage/>} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute/>}>
            <Route element={<MainLayout/>}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
