import React from 'react';

const BookCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
        <div className="flex items-center mb-2">
          <div className="flex space-x-1 mr-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-300 rounded" />
            ))}
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-8 w-16 bg-gray-300 rounded" />
          <div className="h-10 w-24 bg-gray-300 rounded" />
        </div>
        <div className="mt-3 h-4 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;