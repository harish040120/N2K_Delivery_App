import React from 'react';
import { Package, MapPin, Truck, CheckCircle } from 'lucide-react';

interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

interface TrackingDetailsProps {
  orderId: string;
  currentStatus: string;
  steps: TrackingStep[];
}

export const TrackingDetails: React.FC<TrackingDetailsProps> = ({ orderId, currentStatus, steps }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Tracking Details</h2>
          <span className="text-sm text-gray-500">Order ID: {orderId}</span>
        </div>
        <p className="mt-2 text-purple-600 font-semibold">{currentStatus}</p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed ? 'bg-purple-600' : 'bg-gray-200'
            }`}>
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-white" />
              ) : (
                <div className="h-3 w-3 rounded-full bg-gray-400" />
              )}
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">{step.status}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {step.location}
              </div>
              <span className="text-sm text-gray-400">{step.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Print Receipt
        </button>
      </div>
    </div>
  );
}