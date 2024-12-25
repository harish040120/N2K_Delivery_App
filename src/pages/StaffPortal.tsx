import React from 'react';
import { LoginForm } from '../components/staff/LoginForm';

export const StaffPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Portal</h1>
        <p className="mt-2 text-gray-600">
          Sign in to access the N2K Logistics management system
        </p>
      </div>
      <LoginForm />
    </div>
  );
};