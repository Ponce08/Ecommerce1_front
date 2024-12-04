import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import '../Styles.css';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().regex(/^\d+$/, 'Phone number must be numeric').min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
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

  function onSubmit(values: z.infer<typeof schema>) {
    console.log('Datos del formulario:', values);
  }

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto img_registerForm">
      <div className="max-w-2xl mx-auto bg-colorBackground/50 rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">Register</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">be part of our best offers.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <div className="mt-2 space-y-3">
              <input
                {...register('firstName')}
                type="text"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">{errors.firstName?.message}</p>

              <input
                {...register('lastName')}
                type="text"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Last Name"
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>

              <input
                {...register('phoneNumber')}
                type="text"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Phone Number"
              />
              <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>

              <input
                {...register('email')}
                type="text"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Email"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </div>

          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <div className="mt-2 space-y-3">
              <input
                {...register('address')}
                type="text"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Address"
              />
              <p className="text-red-500 text-sm">{errors.address?.message}</p>
            </div>
          </div>

          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <div className="mt-2 space-y-3">
              <input
                {...register('password')}
                type="password"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Password"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>

              <input
                {...register('confirmPassword')}
                type="password"
                className="py-2 px-3 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#8c52ff] focus:ring-[#8c52ff] dark:bg-neutral-900 dark:border-neutral-700"
                placeholder="Confirm Password"
              />
              <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-white hover:bg-colorBackgroundMain hover:border-colorInput"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg bg-[#8c52ff] text-white hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
