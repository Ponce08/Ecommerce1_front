import { Link } from 'react-router-dom';
import { Home, Users, PackageSearch } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X as CloseIcon } from 'react-feather';
import img7 from '@/imagenes/img7.png';

type TitleMain = {
  title: string;
};

export function Sidebar({ title }: TitleMain) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Cerrar el Sidebar si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`pt-16 bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute left-0 transform transition-transform duration-300 ease-in-out rounded-br-xl z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav>
          <Link to="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
            <Home className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link to="/products_dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
            <PackageSearch className="inline-block mr-2" size={20} />
            Productos
          </Link>
          <Link to="" className="block py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white">
            <Users className="inline-block mr-2" size={20} />
            Clientes
          </Link>
          <Link to="/" className="block py-2.5 px-3 rounded hover:bg-gray-700 hover:text-white">
            <img src={img7} className="w-6 h-6 inline-block mr-2" />
            Back F&T
          </Link>
        </nav>
      </div>
      <div className="flex items-center ml-6">
        {isOpen ? (
          <CloseIcon size={24} onClick={() => setIsOpen(!isOpen)} className="absolute text-white cursor-pointer z-50" />
        ) : (
          <MenuIcon size={24} onClick={() => setIsOpen(!isOpen)} className="absolute cursor-pointer" />
        )}
        <h1 className="text-3xl font-bold p-4 ml-6">{title}</h1>
      </div>
    </>
  );
}
