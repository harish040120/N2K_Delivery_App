import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isStaffPortal = location.pathname.startsWith('/staff');

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/track" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
            >
              Track Package
            </Link>
            {!isStaffPortal ? (
              <>
                <Link 
                  to="/staff-login" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Staff Portal
                </Link>
                <Link 
                  to="/customer-login" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Customer Portal
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/staff/dashboard" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/staff/orders" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Orders
                </Link>
                <Link 
                  to="/staff/routes" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Routes
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to={isStaffPortal ? "/staff/profile" : "/login"} 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              <User className="h-6 w-6" />
            </Link>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};