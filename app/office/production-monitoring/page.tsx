'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface Order {
  id: number;
  material: string;
  description: string;
  status: 'Beklemede' | 'Devam Ediyor' | 'Tamamlandı' | 'Hata/İptal';
  messages: string[];
}

export default function ProductionMonitoringPage() {
  const [filterStatus, setFilterStatus] = useState('Tümü');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      material: 'Çelik Sac',
      description: '10mm kalınlık, 2x1 metre',
      status: 'Devam Ediyor',
      messages: [
        'Kesim devam ediyor.',
        'Malzeme depodan çıkarıldı.',
        'Üretim planlandı.',
      ],
    },
    {
      id: 2,
      material: 'Kutu Profil',
      description: '50x50x3mm, 6 metre boy',
      status: 'Beklemede',
      messages: [
        'Malzeme bekleniyor.',
        'Sipariş onaylandı.',
      ],
    },
    {
      id: 3,
      material: 'L Profil',
      description: '40x40x4mm, 3 metre boy',
      status: 'Tamamlandı',
      messages: [
        'Paketlendi, sevkiyata hazır.',
        'Kalite kontrol yapıldı.',
        'Üretim tamamlandı.',
      ],
    },
    {
      id: 4,
      material: 'Kare Demir',
      description: '20x20mm, 12 metre boy',
      status: 'Hata/İptal',
      messages: [
        'Üretim hatası nedeniyle iptal edildi.',
      ],
    },
    {
      id: 5,
      material: 'Çelik Boru',
      description: 'DN100, SCH40, 6 metre',
      status: 'Devam Ediyor',
      messages: [
        'Kaynak işlemleri devam ediyor.',
        'Malzeme işleniyor.',
      ],
    },
  ]);

  const handleAddNote = (orderId: number, newNote: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, messages: [...order.messages, newNote].slice(-5) }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    filterStatus === 'Tümü' ? true : order.status === filterStatus
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800'; // #FFC107 - açık sarı
      case 'Devam Ediyor':
        return 'bg-green-100 text-green-800'; // #28A745 - yeşil
      case 'Tamamlandı':
        return 'bg-gray-100 text-gray-800'; // #6C757D - gri
      case 'Hata/İptal':
        return 'bg-red-100 text-red-800'; // #DC3545 - kırmızı
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-full" style={{ backgroundColor: 'var(--background)' }}>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Ofis - Üretim Takibi</h1>

      <div className="mb-6">
        <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
          Duruma Göre Filtrele:
        </label>
        <select
          id="statusFilter"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          style={{ borderColor: '#CED4DA' }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Tümü">Tümü</option>
          <option value="Beklemede">Beklemede</option>
          <option value="Devam Ediyor">Devam Ediyor</option>
          <option value="Tamamlandı">Tamamlandı</option>
          <option value="Hata/İptal">Hata/İptal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-2" style={{ color: 'black' }}>{order.material}</h2>
            <p className="text-sm text-gray-700 mb-3" style={{ color: 'black' }}>
              <span className="font-medium">Açıklama:</span> {order.description}
            </p>
            <div className="mb-3">
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            <h3 className="text-md font-semibold mb-2" style={{ color: 'black' }}>Son Mesajlar:</h3>
            <ul className="list-disc list-inside text-sm mb-4" style={{ color: 'black' }}>
              {order.messages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>

            <div className="space-y-2">
              <textarea
                placeholder="Yeni not ekle..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
                style={{ borderColor: '#CED4DA' }}
                id={`note-${order.id}`}
              ></textarea>
              <button
                onClick={() => {
                  const textarea = document.getElementById(`note-${order.id}`) as HTMLTextAreaElement;
                  if (textarea && textarea.value.trim()) {
                    handleAddNote(order.id, textarea.value.trim());
                    textarea.value = '';
                  }
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 transition-colors duration-200 shadow-sm text-sm"
                style={{ backgroundColor: 'var(--accent-blue)' }}
              >
                <FaPlus className="inline mr-2" />Not Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
