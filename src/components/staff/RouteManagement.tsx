import React from 'react';
import { MapPin, Truck } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  parcels: number;
  vehicleType: string;
  status: 'active' | 'pending' | 'completed';
}

const routes: Route[] = [
  { id: '1', name: 'Nambiyur - Trichy', parcels: 45, vehicleType: 'Large Truck', status: 'active' },
  { id: '2', name: 'Nambiyur - Salem', parcels: 32, vehicleType: 'Medium Truck', status: 'active' },
  { id: '3', name: 'Nambiyur - Coimbatore', parcels: 28, vehicleType: 'Medium Truck', status: 'pending' },
];

export const RouteManagement: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Add Route
        </button>
      </div>

      <div className="grid gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="border rounded-lg p-4 flex items-center justify-between bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{route.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{route.parcels} parcels</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{route.vehicleType}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                route.status === 'active' ? 'bg-green-100 text-green-800' :
                route.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}