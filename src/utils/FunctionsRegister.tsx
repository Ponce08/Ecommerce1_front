import Swal, { SweetAlertIcon } from 'sweetalert2';
import { z } from 'zod';

export const swalRegister = () => {
  return {
    errorSwal: (err: any) => {
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
        icon: icon,
        customClass: {
          confirmButton: 'bg-purple-600'
        }
      });
    },
    successSwal: () => {
      Swal.fire({
        title: 'Registration successful',
        text: '¡User created successfully',
        icon: 'success',
        customClass: {
          confirmButton: 'bg-purple-600'
        }
      });
    }
  };
};

export const schema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });
