import React from 'react';
import { Truck } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Truck className="h-8 w-8 text-purple-600" />
    <div className="flex flex-col">
      <span className="text-xl font-bold text-gray-900">N2K Logistics</span>
      <span className="text-xs text-gray-600">Delivering Excellence</span>
    </div>
  </div>
);