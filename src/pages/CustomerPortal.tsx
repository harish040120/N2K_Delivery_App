import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackingForm } from '../components/customer/TrackingForm';

export const CustomerPortal: React.FC = () => {
  const navigate = useNavigate();

  const handleTrackingSuccess = (trackingNumber: string) => {
    navigate(`/track/${trackingNumber}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Track Your Package</h1>
        <p className="mt-2 text-gray-600">
          Enter your tracking number to get real-time updates on your delivery
        </p>
      </div>
      <TrackingForm onTrackingSuccess={handleTrackingSuccess} />
    </div>
  );
};