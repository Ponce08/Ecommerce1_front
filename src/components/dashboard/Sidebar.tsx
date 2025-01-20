import { Link } from 'react-router-dom';
import { Home, ShoppingCart, Users, BarChart } from 'lucide-react';

export function Sidebar() {
  return (
    <div>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link to="/orders" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
          <ShoppingCart className="inline-block mr-2" size={20} />
          Pedidos
        </Link>
        <Link to="/customers" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
          <Users className="inline-block mr-2" size={20} />
          Clientes
        </Link>
        <Link to="/analytics" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
          <BarChart className="inline-block mr-2" size={20} />
          Análisis
        </Link>
      </nav>
    </div>
  );
}
