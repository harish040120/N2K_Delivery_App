import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CustomerPortal } from './pages/CustomerPortal';
import { StaffPortal } from './pages/StaffPortal';
import { useAuth } from './hooks/useAuth';

const AppContent = () => {
  useAuth(); // Initialize auth listener

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <div className="bg-gradient-to-br from-purple-50 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  N2K Logistics
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Delivering Excellence, One Parcel at a Time
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/track" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors">
                    Track Package
                  </Link>
                  <Link to="/staff-login" className="bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors border border-purple-600">
                    Staff Login
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/track" element={<CustomerPortal />} />
          <Route path="/staff-login" element={<StaffPortal />} />
          {/* Add other routes here */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;