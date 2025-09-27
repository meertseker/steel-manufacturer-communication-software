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
    { id: 3, material: 'Bakır Borular', description: '20 adet, 3m uzunluk, 1cm çap', status: 'completed', messages: ['Sevkiyata hazır'] },
    { id: 4, material: 'Paslanmaz Sac', description: '5x10m, 2mm kalınlık', status: 'pending', messages: [] },
    { id: 5, material: 'Pirinç Profiller', description: '30 adet, 1.5m uzunluk', status: 'in_progress', messages: ['İşleme alınıyor'] },
    { id: 6, material: 'Titanyum Plaka', description: '2x2m, 1mm kalınlık', status: 'pending', messages: [] },
    { id: 7, material: 'Nikel Alaşım', description: '10 adet, özel sipariş', status: 'in_progress', messages: ['Fırınlama aşamasında'] },
    { id: 8, material: 'Karbon Fiber', description: '5 rulo, havacılık kalitesi', status: 'completed', messages: ['Kalite kontrol geçti'] },
  ]);
  const [newMessage, setNewMessage] = useState<{ [key: number]: string }>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | null>(null);

  const handleAddMessage = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, messages: [...order.messages, newMessage[id]] } : order
    ));
    setNewMessage(prev => ({ ...prev, [id]: '' }));
  };

  const handleStatusChange = (id: number, newStatus: Order['status']) => {
    setSelectedOrderId(id);
    setSelectedStatus(newStatus);
    setShowConfirmDialog(true);
  };

  const confirmStatusChange = () => {
    if (selectedOrderId !== null && selectedStatus !== null) {
      setOrders(orders.map(order => 
        order.id === selectedOrderId ? { ...order, status: selectedStatus } : order
      ));
      setShowConfirmDialog(false);
      setSelectedOrderId(null);
      setSelectedStatus(null);
    }
  };

  const cancelStatusChange = () => {
    setShowConfirmDialog(false);
    setSelectedOrderId(null);
    setSelectedStatus(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const currentTime = new Date();

  return (
    <div className="container mx-auto p-8 text-black bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Üretim Hattı</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div key={order.id} className={`rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between
            ${order.status === 'pending'
              ? 'bg-yellow-100'
              : order.status === 'in_progress'
              ? 'bg-blue-100'
              : 'bg-green-100'
            }`}>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{order.material}</h2>
              <p className="mb-2 text-gray-700"><strong>Açıklama:</strong> {order.description}</p>
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

            <div className="mt-4">
              <p className="text-gray-700"><strong>Sipariş ID:</strong> {order.id}</p>
            </div>

            {/* Status update for Production Line */}
            <div className="mt-4">
              <label htmlFor={`status-${order.id}`} className="block text-gray-700 text-sm font-semibold mb-2">Durumu Güncelle:</label>
              <div className="flex space-x-2">
                {(['pending', 'in_progress', 'completed'] as const).map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => handleStatusChange(order.id, statusOption)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 ease-in-out
                      ${order.status === statusOption
                        ? (statusOption === 'pending' ? 'bg-yellow-500 text-white' : statusOption === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white')
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    `}
                  >
                    {statusOption === 'pending' ? 'Beklemede' : statusOption === 'in_progress' ? 'Islemde' : 'Tamamlandi'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    {showConfirmDialog && (selectedOrderId !== null && selectedStatus !== null) && (
      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-auto text-black">
          <h2 className="text-xl font-bold mb-4">Durum Güncellemesini Onayla</h2>
          <p className="mb-2">Şu anki durumunu değiştirmek üzeresiniz: <strong>ID: {selectedOrderId}</strong></p>
          <p className="mb-2">Yeni durum: <strong>{selectedStatus === 'pending' ? 'Beklemede' : selectedStatus === 'in_progress' ? 'Islemde' : 'Tamamlandı'}</strong></p>
          <p className="mb-4">Tarih ve Saat: <strong>{formatDate(currentTime)}</strong></p>
          <p className="mb-4">Bu işlemi yapmak istediğinize emin misiniz?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={cancelStatusChange}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              İptal
            </button>
            <button
              onClick={confirmStatusChange}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Onayla
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
