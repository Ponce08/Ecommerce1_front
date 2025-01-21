import { FaDollarSign, FaShoppingCart, FaUserPlus, FaChartLine } from 'react-icons/fa';
import { RecentOrders } from '@/components/dashboard/RecentOrders.tsx';
import { SalesChart } from '@/components/dashboard/SalesChart.tsx';
import { Sidebar } from '@/components/dashboard/Sidebar.tsx';

export default function Dashboard() {
  return (
    <div className="relative">
      <Sidebar title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 ml-6">
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FaDollarSign size={20} className="text-green-500" />
              <span className="text-sm font-medium">Ventas Totales</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
          </div>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FaShoppingCart size={20} className="text-blue-500" />
              <span className="text-sm font-medium">Pedidos Nuevos</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 respecto a la semana pasada</p>
          </div>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FaUserPlus size={20} className="text-purple-500" />
              <span className="text-sm font-medium">Clientes Nuevos</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">+249</div>
            <p className="text-xs text-muted-foreground">+30% respecto al mes anterior</p>
          </div>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FaChartLine size={20} className="text-red-500" />
              <span className="text-sm font-medium">Tasa de Conversión</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% respecto al mes anterior</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ml-6 mb-6">
        <div className="p-4 border rounded-lg shadow-sm col-span-4">
          <div className="pb-2">
            <h2 className="text-sm font-medium">Resumen de Ventas</h2>
          </div>
          <div className="pl-2">
            <SalesChart />
          </div>
        </div>
        <div className="p-4 border rounded-lg shadow-sm col-span-3">
          <div className="pb-2">
            <h2 className="text-sm font-medium">Pedidos Recientes</h2>
          </div>
          <div>
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}
