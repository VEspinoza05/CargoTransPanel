import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ShipmentsPage from './pages/ShipmentsPage';
import HomePage from './pages/HomePage';
import OutgoingPage from './pages/OutgoingPage';
import IncomingPage from './pages/IncomingPage';
import LoginLogPage from './pages/LoginLogPage';
import AcquisitionsDashboard from './pages/Acquisitions/AcquisitionsDashboard';
import Purchases from './pages/Acquisitions/Purchases';
import EmployeesManagement from './pages/HumanResources/EmployeesManagement';
import AccountsPage from './pages/Financial/AccountsPage';
import SuppliersManagement from './pages/Acquisitions/suppliersManagement';

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
              <Route path="/" element={<HomePage/>} />
              <Route path="/shipments" element={<ShipmentsPage />} />
              <Route path="/Outgoing" element={<OutgoingPage />} />
              <Route path="/Incoming" element={<IncomingPage />} />
              <Route path="/LoginLog" element={<LoginLogPage />} />
              
              <Route path='/Acquisitions'>
                <Route index element={<AcquisitionsDashboard />} />
                <Route path='Purchases' element={<Purchases />} />
                <Route path='SuppliersManagement' element={<SuppliersManagement />} />
              </Route>

              <Route path='/HumanResources'>
                <Route path='EmployeesManagement' element={<EmployeesManagement />} />
              </Route>

              <Route path='/Financial'>
                <Route path='Accounts' element={<AccountsPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
