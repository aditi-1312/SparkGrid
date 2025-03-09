import React from 'react';

export const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-green-50 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          {order.type === 'buy' ? 'Buy' : 'Sell'} Order Details
        </h2>
        <div className="mb-4">
          <p className="text-lg font-semibold text-green-700">{order.energyCredits} Energy Credits</p>
          <p className="text-green-600">Price: ${order.price}</p>
          <p className="text-green-600">Location: {order.location}</p>
          <p className="text-green-600">Expiration Date: {order.expirationDate}</p>
          <p className="text-green-700 mt-2">{order.description}</p>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
