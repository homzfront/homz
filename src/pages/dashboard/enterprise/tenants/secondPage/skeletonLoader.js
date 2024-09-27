import React from 'react';

const SkeletonLoader = ({ rows = 3 }) => {
  return (
      <div className="max-w-[600px] overflow-x-auto animate-pulse">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-300 h-[50px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-4" style={{ width: '120px' }}>Tenant</th>
              <th className="text-left" style={{ width: '100px' }}>Rent Amount</th>
              <th className="text-left" style={{ width: '110px' }}>Due Date</th>
              <th className="text-left" style={{ width: '110px' }}>Payment Status</th>
              <th className="text-left" style={{ width: '110px' }}>Amount Paid</th>
              <th className="text-left" style={{ width: '120px' }}>Description</th>
              <th className="text-left" style={{ width: '120px' }}>Rent Duration</th>
              <th className="text-left" style={{ width: '120px' }}>Payment Method</th>
              <th className="text-left" style={{ width: '120px' }}>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {Array(rows).fill().map((_, i) => (
              <tr key={i} className="w-2 border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2 py-[15px] pl-4">
                    <div className="bg-gray-300 h-[40px] w-[40px] rounded-full"></div>
                    <div className="bg-gray-300 h-[20px] w-[100px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[100px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[100px] rounded"></div>
                </td>
                <td className="py-[15px]">
                  <div className="bg-gray-300 h-[20px] w-[80px] rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default SkeletonLoader;
