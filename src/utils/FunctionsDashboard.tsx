//Supabase Client
import { supabase } from '@/supabaseClient/supabaseClient.tsx';

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
    const { error } = await supabase
      .from('products') 
      .delete()
      .eq('id', productId);

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
