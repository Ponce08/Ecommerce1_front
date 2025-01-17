import { supabase } from '../supabaseClient/supabaseClient.tsx';
import { useNavigate } from 'react-router-dom';
import useStore from '@/zustand/store.tsx';

const FunctionsGlobalHeader = () => {
  const navigate = useNavigate();
  const { setUserLogin } = useStore();

  return {
    signOut: async (): Promise<void> => {
        await supabase.auth.signOut();
        setUserLogin(null);
        navigate('/login')
    },
    LoadPage: (to: string) => {
      window.location.href = to;
    },
    navigation: {
      categories: [
        {
          id: '1',
          name: 'Fashion',
          featured: [
            {
              name: 'New Arrivals',
              category: 'womens-bags',
              imageSrc: "https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/1.png",
              imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
            },
            {
              name: 'Basic Dress',
              category: 'womens-dresses',
              imageSrc: 'https://cdn.dummyjson.com/products/images/womens-dresses/Dress%20Pea/1.png',
              imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
            }
          ],
          sections: [
            {
              id: 'clothing',
              name: 'Clothing',
              items: [
                { name: 'Tops', category: 'tops' },
                { name: 'Dresses', category: 'womens-dresses' },
                { name: 'T-Shirts', category: 'mens-shirts' },
                { name: 'Browse All', category: '' }
              ]
            },
            {
              id: 'accessories',
              name: 'Accessories',
              items: [
                { name: 'Watches', category: 'womens-watches' },
                { name: 'Bags', category: 'womens-bags' },
                { name: 'Sunglasses', category: 'sunglasses' }
              ]
            }
          ]
        },
        {
          id: '2',
          name: 'Tecnology',
          featured: [
            {
              name: 'Latest in technology',
              category: 'laptops',
              imageSrc:
                'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png',
              imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.'
            },
            {
              name: 'Creative tools',
              category: 'mobile-accessories',
              imageSrc: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Selfie%20Stick%20Monopod/1.png',
              imageAlt:
                'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
            }
          ],
          sections: [
            {
              id: 'clothing',
              name: 'Clothing',
              items: [
                { name: 'Tops', category: 'tops' },
                { name: 'Dresses', category: 'womens-dresses' },
                { name: 'T-Shirts', category: 'mens-shirts' },
                { name: 'Browse All', category: '' }
              ]
            },
            {
              id: 'accessories',
              name: 'Accessories',
              items: [
                { name: 'Watches', category: 'mens-watches' },
                { name: 'Bags', category: 'womens-bags' },
                { name: 'Sunglasses', category: 'sunglasses' }
              ]
            }
          ]
        }
      ],
      pages: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' }
      ]
    }
  };
};

export default FunctionsGlobalHeader;
