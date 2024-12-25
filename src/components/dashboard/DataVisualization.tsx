import React from 'react';
import { BarChart, TrendingUp, Package } from 'lucide-react';

interface RouteStats {
  route: string;
  volume: number;
  growth: number;
}

const routeStats: RouteStats[] = [
  { route: 'Nambiyur - Trichy', volume: 150, growth: 12 },
  { route: 'Nambiyur - Salem', volume: 120, growth: 8 },
  { route: 'Nambiyur - Coimbatore', volume: 90, growth: 15 },
];

export const DataVisualization: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
          <Package className="h-6 w-6 text-purple-600" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
        <p className="text-sm text-green-600 flex items-center mt-2">
          <TrendingUp className="h-4 w-4 mr-1" />
          +15% from last week
        </p>
      </div>

      {/* Route Performance */}
      <div className="bg-white rounded-lg shadow p-6 col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Performance</h3>
        <div className="space-y-4">
          {routeStats.map((stat) => (
            <div key={stat.route} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{stat.route}</span>
                <span className="text-sm text-gray-600">{stat.volume} parcels</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-100">
                <div
                  style={{ width: `${(stat.volume / 150) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}