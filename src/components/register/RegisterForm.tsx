import '../Styles.css';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LoadingProducts } from '../pageCards/LoadingProducts.tsx';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_USER } from '../zustand/graphql/mutations.tsx';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().regex(/^\d+$/, 'Phone number must be numeric').min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
});

type FormData = z.infer<typeof schema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const [createUser, { loading }] = useMutation(CREATE_NEW_USER);
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof schema>) {
    const { confirmPassword, ...userInput } = values;
    try {
      await createUser({
        variables: {
          input: userInput
        }
      });

      Swal.fire({
        title: 'Registration successful',
        text: '¡User created successfully',
        icon: 'success'
      });

      navigate('/login');
    } catch (err: any) {
      console.error('Error al crear usuario:', err);

      // Determina el icono y el mensaje según el tipo de error
      let errorMessage = 'An unexpected error occurred';
      let icon: SweetAlertIcon = 'error';

      if (err.message.includes('already exists')) {
        errorMessage = 'A user with this email already exists.';
        icon = 'warning';
      }

      // Muestra el error usando Swal con el icono adecuado
      Swal.fire({
        title: `Oops... ${errorMessage}`,
        text: 'Please try again',
        icon: icon
      });
    }
  }

  if (loading) return <LoadingProducts />;

  return (
    <>
      <Header />
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-[100px] img_registerForm">
        <div className="max-w-2xl mx-auto bg-colorBackground/50 rounded-xl shadow p-4 sm:p-7">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Register</h2>
            <p className="text-sm text-gray-600">be part of our best offers.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
              <div className="mt-2 space-y-3">
                <input
                  {...register('firstName')}
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="First Name"
                />
                <p className="text-red-500 text-sm font-bold">{errors.firstName?.message}</p>

                <input
                  {...register('lastName')}
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Last Name"
                />
                <p className="text-red-500 text-sm font-bold">{errors.lastName?.message}</p>

                <input
                  {...register('phoneNumber')}
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Phone Number"
                />
                <p className="text-red-500 text-sm font-bold">{errors.phoneNumber?.message}</p>

                <input
                  {...register('email')}
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Email"
                />
                <p className="text-red-500 text-sm font-bold">{errors.email?.message}</p>
              </div>
            </div>

            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
              <div className="mt-2 space-y-3">
                <input
                  {...register('address')}
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Address"
                />
                <p className="text-red-500 text-sm font-bold">{errors.address?.message}</p>
              </div>
            </div>

            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
              <div className="mt-2 space-y-3">
                <input
                  {...register('password')}
                  type="password"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Password"
                />
                <p className="text-red-500 text-sm font-bold">{errors.password?.message}</p>

                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff]"
                  placeholder="Confirm Password"
                />
                <p className="text-red-500 text-sm font-bold">{errors.confirmPassword?.message}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-x-2">
              <Link to={'/'}>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-colorBackgroundMain hover:border-colorInput"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-purple-500 text-white hover:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
