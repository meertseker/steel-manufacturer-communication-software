'use client';

import { useState } from 'react';

interface Order {
  id: number;
  material: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed'; // Re-added status
  messages: string[];
}

export default function ProductionLinePage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, material: 'Çelik Levha', description: '10x20m, 5mm kalınlık', status: 'pending', messages: [] },
    { id: 2, material: 'Alüminyum Çubuklar', description: '50 adet, 2m uzunluk', status: 'in_progress', messages: ['Kesim başladı'] },
  ]);
  const [newMessage, setNewMessage] = useState<{ [key: number]: string }>({});

  const handleAddMessage = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, messages: [...order.messages, newMessage[id]] } : order
    ));
    setNewMessage(prev => ({ ...prev, [id]: '' }));
  };

  const handleStatusChange = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="container mx-auto p-8 text-black bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Üretim Hattı</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sipariş ID: {order.id}</h2>
              <p className="mb-2 text-gray-700"><strong>Malzeme:</strong> {order.material}</p>
              <p className="mb-4 text-gray-700"><strong>Açıklama:</strong> {order.description}</p>
              {/* Status display for Production Line */}
              <p className="mb-4 text-lg font-semibold">
                <strong>Durum:</strong>
                <span
                  className={`relative inline-block px-3 py-1 ml-2 font-semibold leading-tight rounded-full ${
                    order.status === 'pending'
                      ? 'text-yellow-900 bg-yellow-200'
                      : order.status === 'in_progress'
                      ? 'text-blue-900 bg-blue-200'
                      : 'text-green-900 bg-green-200'
                  }`}
                >
                  {order.status === 'pending' ? 'Beklemede' : order.status === 'in_progress' ? 'Devam Ediyor' : 'Tamamlandı'}
                </span>
              </p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mesajlar:</h3>
              {order.messages.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700 bg-gray-100 p-3 rounded-lg border border-gray-200 max-h-24 overflow-y-auto">
                  {order.messages.map((msg, index) => (
                    <li key={index} className="text-sm">{msg}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Henüz mesaj yok.</p>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder-gray-400"
                placeholder="Üretim için mesaj ekle..."
                rows={2}
                value={newMessage[order.id] || ''}
                onChange={(e) => setNewMessage(prev => ({ ...prev, [order.id]: e.target.value }))}
              ></textarea>
              <button
                onClick={() => handleAddMessage(order.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Mesaj Ekle
              </button>
            </div>

            {/* Status update for Production Line */}
            <div className="mt-4">
              <label htmlFor={`status-${order.id}`} className="block text-gray-700 text-sm font-semibold mb-2">Durumu Güncelle:</label>
              <select
                id={`status-${order.id}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out bg-white"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
              >
                <option value="pending">Beklemede</option>
                <option value="in_progress">Devam Ediyor</option>
                <option value="completed">Tamamlandı</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
