import '../Styles.css';
import { LoadingProducts } from '../pageCards/LoadingProducts.tsx';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Footer } from '../header&footer/Footer.tsx';
import { Header } from '../header&footer/Header.tsx';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_USER } from '../../zustand/graphql/mutations.tsx';
import SectionRef from '../../utils/SectionRef.tsx';
import { swalRegister } from '../../utils/FunctionsRegister.tsx';
import { schema } from '../../utils/FunctionsRegister.tsx';

export const RegisterForm = () => {
  const targetSectionRef = SectionRef(150);
  const { successSwal, errorSwal } = swalRegister();

  type FormData = z.infer<typeof schema>;
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

      successSwal();

      navigate('/login');
    } catch (err: any) {
      console.error('Error al crear usuario:', err);
      errorSwal(err);
    }
  }

  if (loading) return <LoadingProducts />;

  return (
    <>
      <Header />
      <div className="w-full px-4 py-10 sm:px-6 md:py-32 lg:px-8 lg:py-32 mx-auto mt-[100px] img_registerForm">
        <div className="max-w-2xl mx-auto bg-colorBackground/50 rounded-xl shadow p-4 sm:p-7">
          <div ref={targetSectionRef} className="text-center mb-8">
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
