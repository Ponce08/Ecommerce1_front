//Supabase Client
import { supabase } from '@/supabaseClient/supabaseClient.tsx';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LoadingProducts } from '@/components/pageCards/LoadingProducts.tsx';
import useStore from '@/zustand/store.tsx';

export interface ProductAdmin {
  title: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
  brand: string;
}

// 'fetchProductById': Función para obtener un producto por ID desde Supabase
export const fetchProductById = async (id: number) => {
  try {
    if (!id) {
      console.error('No se proporcionó un ID válido.');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id) // Filtro por ID
      .single(); // Obtiene un único registro

    if (error) {
      console.error('Error fetching product by ID:', error.message);
      return;
    }

    console.log('Producto encontrado:', data);
    return data; // Devuelve el producto encontrado
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

// Función para actualizar el producto
export const updateProduct = async (updatedProduct: ProductAdmin, id: number) => {
  if (!id) {
    console.error('No se ha proporcionado un ID válido.');
    return;
  }

  try {
    // Realizar la actualización en la base de datos
    const { data, error } = await supabase
      .from('products') // Nombre de la tabla en Supabase
      .update(updatedProduct) // Datos del producto actualizados
      .eq('id', id); // Filtro para encontrar el producto por su ID

    if (error) {
      console.error('Error al actualizar el producto:', error.message);
      return;
    }

    // Actualizar el estado con el producto actualizado (si necesario)
    if (data) {
      console.log('Producto actualizado correctamente:', data[0]);
    } else {
      console.warn('No se encontró el producto para actualizar.');
    }
  } catch (err) {
    console.error('Error inesperado al actualizar el producto:', err);
  }
};

export const deleteProductById = async (productId: number) => {
  try {
    // Realiza la eliminación en la tabla 'products'
    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error) {
      console.error('Error al eliminar el producto:', error.message);
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Producto eliminado con éxito.' };
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, message: 'Ocurrió un error inesperado.' };
  }
};

export const createProduct = async (loadedProduct: ProductAdmin) => {
  const { data, error } = await supabase.from('products').insert([{ ...loadedProduct }]);

  if (error) {
    console.error('Error al crear el producto:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const { userLogin } = useStore();

  useEffect(() => {
    // Definir las rutas protegidas
    const protectedRoutes = ['/dashboard', '/products_dashboard', '/add_product_admin'];

    // Verificar si la ruta actual coincide con una protegida
    const isProtectedRoute = protectedRoutes.includes(location.pathname) || location.pathname.startsWith('/products_dashboard/'); // Soporta rutas dinámicas

    if (isProtectedRoute && !userLogin) {
      navigate('/login');
      Swal.fire({
        title: 'Please log in',
        icon: 'warning',
        customClass: {
          confirmButton: 'bg-purple-600'
        }
      });
    } else {
      setIsChecking(false); // Permitir renderizado cuando termine la validación
    }
  }, [location.pathname, navigate]);

  if (isChecking) return <LoadingProducts />; // Mostrar carga mientras se valida

  return <>{children}</>; // Renderizar el contenido solo si está autenticado
};
