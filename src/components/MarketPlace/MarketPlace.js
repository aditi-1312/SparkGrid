import React, { useState } from 'react';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetails';
import { mockOrders } from './mockOrders';

export const Marketplace = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('buy');
  const [sortBy, setSortBy] = useState('price');

  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'credits':
          return a.energyCredits - b.energyCredits;
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });
  };

  const buyOrders = sortOrders(mockOrders.filter(order => order.type === 'buy'));
  const sellOrders = sortOrders(mockOrders.filter(order => order.type === 'sell'));

  return (
    <div className="w-full mx-auto min-h-screen bg-transparent flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Green Energy Marketplace
      </h1>
      
      <div className="max-w-3xl flex justify-around items-center mb-6 gap-4">
        <div className="flex">
          <button
            className={`px-6 py-2 rounded-t-lg transition-all duration-300 ${
              activeTab === 'buy'
                ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'bg-transparent text-white hover:bg-cyan-500/10'
            }`}
            onClick={() => setActiveTab('buy')}
          >
            Buy Orders
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg transition-all duration-300 ${
              activeTab === 'sell'
                ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'bg-transparent text-white hover:bg-cyan-500/10'
            }`}
            onClick={() => setActiveTab('sell')}
          >
            Sell Orders
          </button>
        </div>
        
        <select
          className="bg-[#2E5077]/20 text-white px-4 py-2 rounded-lg border border-[#4DA1A9]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Sort by Price</option>
          <option value="credits">Sort by Credits</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30 
        shadow-[0_0_20px_rgba(34,211,238,0.2)] min-h-[400px] flex justify-center max-w-[50%]">
        <div className="">
          {activeTab === 'buy' && (
            <div className="space-y-4">
              {buyOrders.map(order => (
                <div key={order.id} 
                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg cursor-pointer 
                    transition-all duration-300 border 
                    hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  onClick={() => setSelectedOrder(order)}>
                  <div className="w-full"><OrderList orders={[order]} onOrderClick={setSelectedOrder} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'sell' && (
            <div className="grid gap-4">
              {sellOrders.map(order => (
              
                <div key={order.id} 
                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg cursor-pointer 
                    transition-all duration-300 border 
                    hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  onClick={() => setSelectedOrder(order)}>
                  <OrderList orders={[order]} onOrderClick={setSelectedOrder} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};