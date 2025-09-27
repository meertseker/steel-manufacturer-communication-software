'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash, FaArrowUp, FaPrint, FaFileCsv, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | 'none' } | null>(null);

  const orders = [
    {
      id: 1,
      material: 'Çelik Sac',
      description: '10mm kalınlık, 2x1 metre',
      customerName: 'ABC Demir Çelik A.Ş.',
      productionDate: '2025-09-20',
      orderTakenDate: '2025-09-15',
      status: 'Beklemede',
    },
    {
      id: 2,
      material: 'Kutu Profil',
      description: '50x50x3mm, 6 metre boy',
      customerName: 'XYZ İnşaat Ltd. Şti.',
      productionDate: '2025-09-25',
      orderTakenDate: '2025-09-18',
      status: 'Devam Ediyor',
    },
    {
      id: 3,
      material: 'L Profil',
      description: '40x40x4mm, 3 metre boy',
      customerName: 'Demirpen Ticaret',
      productionDate: '2025-09-28',
      orderTakenDate: '2025-09-22',
      status: 'Tamamlandı',
    },
    {
      id: 4,
      material: 'Kare Demir',
      description: '20x20mm, 12 metre boy',
      customerName: 'Beta Metal',
      productionDate: '2025-10-01',
      orderTakenDate: '2025-09-26',
      status: 'Hata/İptal',
    },
    {
      id: 5,
      material: 'Çelik Boru',
      description: 'DN100, SCH40, 6 metre',
      customerName: 'Mega Boru Sanayi',
      productionDate: '2025-10-05',
      orderTakenDate: '2025-09-30',
      status: 'Beklemede',
    },
    {
      id: 6,
      material: 'Çelik Sac',
      description: '8mm kalınlık, 1x1 metre',
      customerName: 'ABC Demir Çelik A.Ş.',
      productionDate: '2025-10-10',
      orderTakenDate: '2025-10-03',
      status: 'Devam Ediyor',
    },
  ];

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | 'none' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const handleExportCsv = () => {
    const headers = ["ID", "Malzeme", "Açıklama", "Müşteri Adı", "Üretim Tarihi", "Sipariş Alma Tarihi", "Durum"];
    const rows = orders.map(order => [
      order.id,
      order.material,
      order.description,
      order.customerName,
      order.productionDate,
      order.orderTakenDate,
      order.status,
    ].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "siparisler.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'material', label: 'Malzeme' },
    { key: 'description', label: 'Açıklama' },
    { key: 'customerName', label: 'Müşteri Adı' },
    { key: 'productionDate', label: 'Üretim Tarihi' },
    { key: 'orderTakenDate', label: 'Sipariş Alma Tarihi' },
    { key: 'status', label: 'Durum' },
    { key: 'actions', label: 'Eylemler' },
  ];

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-full" style={{ backgroundColor: 'var(--background)' }}>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Ofis - Sipariş Yönetimi</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Siparişlerde ara..."
          className="w-1/3 px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          style={{ borderColor: '#CED4DA' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            onClick={handleExportCsv}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 transition-colors duration-200 shadow-sm"
            style={{ backgroundColor: '#28A745' }}
            title="CSV Olarak Dışa Aktar"
          >
            <FaFileCsv className="inline mr-2" /> Export (CSV)
          </button>
          <Link href="/office/order-entry">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 transition-colors duration-200 shadow-sm"
              style={{ backgroundColor: 'var(--accent-blue)' }}
            >
              Yeni Sipariş Ekle
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(header.key)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {
                      getClassNamesFor(header.key) === 'ascending' ? <FaSortUp className="ml-2" /> :
                      getClassNamesFor(header.key) === 'descending' ? <FaSortDown className="ml-2" /> :
                      (header.key !== 'actions' && header.key !== 'description' ) ? <FaSort className="ml-2 opacity-40" /> : null
                    }
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order, index) => (
              <tr key={order.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.material}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{order.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.productionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderTakenDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold ${getStatusBadgeClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3" title="Düzenle">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900 mr-3" title="Sil">
                    <FaTrash />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3" title="Yukarı Taşı">
                    <FaArrowUp />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900" title="Etiket Yükle">
                    <FaPrint />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700" style={{ color: 'var(--text-body)' }}>Sayfa başına:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            style={{ borderColor: '#CED4DA' }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
                ${currentPage === index + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : ''}
              `}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
