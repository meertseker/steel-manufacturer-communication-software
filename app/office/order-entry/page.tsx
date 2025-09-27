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
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-full" style={{ backgroundColor: 'var(--background)' }}>
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-heading)' }}>Ofis - Sipariş Girişi</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 shadow-md border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="material" className="block text-sm font-medium mb-2 text-gray-900">
              Malzeme <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="material"
              className={`w-full px-3 py-2 border ${material ? 'border-gray-300' : 'border-red-500'} focus:outline-none focus:border-blue-500 placeholder-gray-400`}
              style={{ borderColor: '#CED4DA', fontSize: '14px' }}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Malzeme Adı"
              required
            />
          </div>
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium mb-2 text-gray-900">
              Müşteri Adı <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="customerName"
              className={`w-full px-3 py-2 border ${customerName ? 'border-gray-300' : 'border-red-500'} focus:outline-none focus:border-blue-500 placeholder-gray-400`}
              style={{ borderColor: '#CED4DA', fontSize: '14px' }}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Müşteri Tam Adı"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-900">
            Açıklama <span className="text-red-500">*</span>:
          </label>
          <textarea
            id="description"
            rows={4}
            className={`w-full px-3 py-2 border ${description ? 'border-gray-300' : 'border-red-500'} focus:outline-none focus:border-blue-500 placeholder-gray-400`}
            style={{ borderColor: '#CED4DA', fontSize: '14px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Sipariş detay açıklaması"
            required
          />
        </div>
        <div>
          <label htmlFor="productionDate" className="block text-sm font-medium mb-2 text-gray-900">
            Üretim Tarihi <span className="text-red-500">*</span>:
          </label>
          <input
            type="date"
            id="productionDate"
            className={`w-full px-3 py-2 border ${productionDate ? 'border-gray-300' : 'border-red-500'} focus:outline-none focus:border-blue-500`}
            style={{ borderColor: '#CED4DA', fontSize: '14px' }}
            value={productionDate}
            onChange={(e) => setProductionDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 transition-colors duration-200 shadow-sm hover:bg-blue-800"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          >
            Sipariş Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
