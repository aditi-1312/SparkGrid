import React from 'react';

export const OrderList = ({ orders, onOrderClick }) => {
  return (
    <div className="w-full space-y-4 gap-4">
      {orders.map(order => (
        <div 
          key={order.id} 
          className="w-full bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-lg cursor-pointer 
            hover:bg-white/15 transition-all duration-300 flex justify-between items-center
            border border-white/10 hover:border-white/20 shadow-lg mr-8"
          onClick={() => onOrderClick(order)}
        >
          <h3 className="text-lg font-semibold text-white/90">
            {order.energyCredits} Energy Credits
          </h3>
          <div className='flex flex-col items-end space-y-1'>
            <p className="text-lg font-medium text-white/90">${order.price}</p>
            <p className="text-sm text-white/60">{order.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};