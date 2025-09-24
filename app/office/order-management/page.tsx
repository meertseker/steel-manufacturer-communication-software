'use client';

import { useState } from 'react';

interface Order {
  id: number;
  material: string;
  description: string;
  customerName: string;
  productionDate: string;
  orderTakenDate: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, material: 'Çelik Levha', description: '10x20m, 5mm kalınlık', customerName: 'Müşteri A', productionDate: '2025-10-15', orderTakenDate: '2025-09-24', status: 'pending' },
    { id: 2, material: 'Alüminyum Çubuklar', description: '50 adet, 2m uzunluk', customerName: 'Müşteri B', productionDate: '2025-11-01', orderTakenDate: '2025-09-23', status: 'in_progress' },
  ]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleDelete = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEdit = (order: Order) => {
    setEditingOrder({ ...order });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(orders.map(order => order.id === editingOrder.id ? editingOrder : order));
      setEditingOrder(null);
    }
  };

  const handleReorder = (id: number) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex > 0) {
      const newOrders = [...orders];
      const [reorderedItem] = newOrders.splice(orderIndex, 1);
      newOrders.splice(orderIndex - 1, 0, reorderedItem);
      setOrders(newOrders);
    }
  };

  return (
    <div className="container mx-auto p-8 text-black bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Ofis - Sipariş Yönetimi</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Malzeme
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Müşteri Adı
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Üretim Tarihi
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sipariş Alınma Tarihi
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                Eylemler
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.id}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.material}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.description}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.customerName}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.productionDate}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.orderTakenDate}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      order.status === 'pending'
                        ? 'text-yellow-900'
                        : order.status === 'in_progress'
                        ? 'text-blue-900'
                        : 'text-green-900'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 opacity-50 rounded-full ${
                        order.status === 'pending'
                          ? 'bg-yellow-200'
                          : order.status === 'in_progress'
                          ? 'bg-blue-200'
                          : 'bg-green-200'
                      }`}
                    ></span>
                    <span className="relative">
                      {order.status === 'pending' ? 'Beklemede' : order.status === 'in_progress' ? 'Devam Ediyor' : 'Tamamlandı'}
                    </span>
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={order.status !== 'pending'}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={order.status !== 'pending'}
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => handleReorder(order.id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={order.status !== 'pending'}
                  >
                    Yukarı Taşı
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingOrder && (editingOrder.status === 'pending') && (
        <div className="mt-10 max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg space-y-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Siparişi Düzenle: {editingOrder.id}</h2>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label htmlFor="editMaterial" className="block text-gray-700 text-sm font-semibold mb-2">Malzeme:</label>
              <input
                type="text"
                id="editMaterial"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
                value={editingOrder.material}
                onChange={(e) => setEditingOrder({ ...editingOrder, material: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="editDescription" className="block text-gray-700 text-sm font-semibold mb-2">Açıklama:</label>
              <textarea
                id="editDescription"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
                value={editingOrder.description}
                onChange={(e) => setEditingOrder({ ...editingOrder, description: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="editCustomerName" className="block text-gray-700 text-sm font-semibold mb-2">Müşteri Adı:</label>
              <input
                type="text"
                id="editCustomerName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
                value={editingOrder.customerName}
                onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="editProductionDate" className="block text-gray-700 text-sm font-semibold mb-2">Üretim Tarihi:</label>
              <input
                type="date"
                id="editProductionDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out"
                value={editingOrder.productionDate}
                onChange={(e) => setEditingOrder({ ...editingOrder, productionDate: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Değişiklikleri Kaydet
              </button>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
