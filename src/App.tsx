import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginLogPage from './pages/LoginLogPage';
import AcquisitionsDashboard from './pages/Acquisitions/AcquisitionsDashboard';
import Purchases from './pages/Acquisitions/Purchases';
import EmployeesManagement from './pages/HumanResources/EmployeesManagement';
import AccountsPage from './pages/Financial/AccountsPage';
import SuppliersManagement from './pages/Acquisitions/suppliersManagement';
import FleetManagementPage from './pages/Operations/FleetManagementPage';
import ShipmentsManagementPage from './pages/Operations/ShipmentsManagementPage';
import InternalRequestsPage from './pages/HumanResources/InternalRequestsPage';
import ClientsManagementPage from './pages/BranchManagement/ClientsManagementPage';
import BranchAttendancePage from './pages/BranchManagement/BranchAttendancePage';
import DashboardCEOGeneralPage from './pages/CEO/DashboardCEOGeneralPage';
import PackageReceptionPage from './pages/ShiftSupervisor/PackageReceptionPage';

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
              <Route path="/LoginLog" element={<LoginLogPage />} />
              
              <Route path='/Acquisitions'>
                <Route index element={<AcquisitionsDashboard />} />
                <Route path='Purchases' element={<Purchases />} />
                <Route path='SuppliersManagement' element={<SuppliersManagement />} />
              </Route>

              <Route path='/HumanResources'>
                <Route path='EmployeesManagement' element={<EmployeesManagement />} />
                <Route path='InternalRequests' element={<InternalRequestsPage />} />
              </Route>

              <Route path='/Financial'>
                <Route path='Accounts' element={<AccountsPage />} />
              </Route>

              <Route path='/Operations'>
                <Route path='FleetManagement' element={<FleetManagementPage />} />
                <Route path='ShipmentsManagement' element={<ShipmentsManagementPage />} />
              </Route>

              <Route path='/BranchManaging'>
                <Route path='ClientsManagement' element={<ClientsManagementPage />} />
                <Route path='BranchAttendance' element={<BranchAttendancePage />} />
              </Route>

              <Route path='/CEO'>
                <Route path='Dashboard' element={<DashboardCEOGeneralPage />} />
              </Route>

              <Route path='/ShiftSupervisor'>
                <Route path='PackageReception' element={<PackageReceptionPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
