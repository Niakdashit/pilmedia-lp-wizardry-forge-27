
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, positive, stat }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-[#841b60] bg-opacity-10 flex items-center justify-center">
          <div className="w-5 h-5 text-[#841b60]" dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
      </div>
      <div className="flex items-end">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'} ml-2 mb-1 flex items-center`}>
          {positive ? (
            <ChevronUp className="w-4 h-4 mr-1" />
          ) : (
            <ChevronDown className="w-4 h-4 mr-1" />
          )}
          {change}
        </span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{stat}</div>
    </div>
  );
};

export default StatCard;
