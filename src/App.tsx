import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginLogPage from './pages/LoginLogPage';
import EmployeesManagement from './pages/HumanResources/EmployeesManagement';
import FleetManagementPage from './pages/Operations/FleetManagementPage';
import FleetMapPage from './pages/Operations/FleetMapPage';
import PurchaseRequestsPage from './pages/Financial/PurchaseRequestsPage';
import SuppliersManagement from './pages/Financial/SuppliersManagement';
import PurchaseReviewPage from './pages/Acquisitions/PurchaseReviewPage';
import BillingPage from './pages/ShiftSupervisor/BillingPage';
import PackageManagement from './pages/ShiftSupervisor/PackageManagement';
import MultipleMarkersMap from './pages/Driver/PackagesMap';
import PackageDelivery from './pages/Driver/PackageDelivery';

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
                <Route path='SuppliersManagement' element={<SuppliersManagement />} />
                <Route path='PurchaseRequests' element={<PurchaseRequestsPage />} />
              </Route>

              <Route path='/HumanResources'>
                <Route path='EmployeesManagement' element={<EmployeesManagement />} />
              </Route>

              <Route path='/Financial'>
                <Route path='PurchaseReview' element={<PurchaseReviewPage />} />
              </Route>

              <Route path='/Operations'>
                <Route path='FleetManagement' element={<FleetManagementPage />} />
                <Route path='FleetMap' element={<FleetMapPage />} />
              </Route>

              <Route path='/ShiftSupervisor'>
                <Route path='Billing' element={<BillingPage />} />
                <Route path='PackageManagement' element={<PackageManagement />} />
              </Route>

              <Route path='/Driving'>
                <Route path='Map' element={<MultipleMarkersMap />} />
                <Route path='PackageDelivery' element={<PackageDelivery />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
