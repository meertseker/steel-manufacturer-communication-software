'use client';

import { useState } from 'react';

export default function OrderEntryPage() {
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [productionDate, setProductionDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderTakenDate = new Date().toISOString().slice(0, 10);
    console.log({
      material,
      description,
      customerName,
      productionDate,
      orderTakenDate,
    });
    // Here you would typically send this data to a backend API
    alert('Sipariş Gönderildi!');
    setMaterial('');
    setDescription('');
    setCustomerName('');
    setProductionDate('');
  };

  return (
    <div className="container mx-auto p-8 text-black bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Ofis - Sipariş Girişi</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg space-y-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="material" className="block text-gray-700 text-sm font-semibold mb-2">
              Malzeme:
            </label>
            <input
              type="text"
              id="material"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder-gray-400"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Malzeme Adı"
              required
            />
          </div>
          <div>
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-semibold mb-2">
              Müşteri Adı:
            </label>
            <input
              type="text"
              id="customerName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder-gray-400"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Müşteri Tam Adı"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
            Açıklama:
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Siparişin detaylı açıklaması"
            required
          />
        </div>
        <div>
          <label htmlFor="productionDate" className="block text-gray-700 text-sm font-semibold mb-2">
            Üretim Tarihi:
          </label>
          <input
            type="date"
            id="productionDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            value={productionDate}
            onChange={(e) => setProductionDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sipariş Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
