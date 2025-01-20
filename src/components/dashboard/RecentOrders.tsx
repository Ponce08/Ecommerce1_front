import { FaCheckCircle, FaShippingFast, FaHourglassHalf } from 'react-icons/fa';

const recentOrders = [
  { id: '1', customer: 'Juan Pérez', product: 'Camiseta', total: '$25.00', status: 'Completado' },
  { id: '2', customer: 'María García', product: 'Zapatos', total: '$89.99', status: 'Procesando' },
  { id: '3', customer: 'Carlos López', product: 'Pantalón', total: '$45.50', status: 'Enviado' },
  { id: '4', customer: 'Ana Martínez', product: 'Bolso', total: '$59.99', status: 'Completado' },
  { id: '5', customer: 'Pedro Sánchez', product: 'Gorra', total: '$15.00', status: 'Procesando' },
  { id: '5', customer: 'Pedro Sánchez', product: 'Gorra', total: '$15.00', status: 'Procesando' },
  { id: '5', customer: 'Pedro Sánchez', product: 'Gorra', total: '$15.00', status: 'Procesando' },
  { id: '5', customer: 'Pedro Sánchez', product: 'Gorra', total: '$15.00', status: 'Procesando' }
];

// Función para renderizar el ícono dinámico
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'Completado':
      return <FaCheckCircle className="text-green-600" title="Completado" />;
    case 'Procesando':
      return <FaHourglassHalf className="text-yellow-600" title="Procesando" />;
    case 'Enviado':
      return <FaShippingFast className="text-blue-600" title="Enviado" />;
    default:
      return null;
  }
};

export function RecentOrders() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Cliente</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Producto</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">{order.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{order.customer}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{order.product}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{order.total}</td>
              <td className="px-4 py-2 text-sm font-medium flex items-center gap-2">
                <StatusIcon status={order.status} />
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
