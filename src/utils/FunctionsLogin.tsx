import Swal, { SweetAlertIcon } from 'sweetalert2';
import { supabase } from '../supabaseClient/supabaseClient.tsx';
import { z } from 'zod';

export const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  });

  if (error) {
    console.error('Error logging in with Google:', error.message);
    Swal.fire({
      title: 'Login failed',
      text: 'Error logging in with Google',
      icon: 'error',
      customClass: {
        confirmButton: 'bg-purple-600'
      }
    });
  }
};

export const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
});

export const swalLogin = (user: string) => {
  Swal.fire({
    title: 'Login successful',
    text: `! Welcome ${user}`,
    icon: 'success',
    customClass: {
      confirmButton: 'bg-purple-600'
    }
  });
};

export const swalLoginError = (err: any) => {
  if (err) {
    // Determina el icono y el mensaje según el tipo de error
    let errorMessage = 'An unexpected error occurred';
    let icon: SweetAlertIcon = 'error';

    if (err.message.includes('User not found')) {
      errorMessage = 'User not found';
      icon = 'warning';
    } else if (err.message.includes('Wrong password')) {
      errorMessage = 'Wrong password';
      icon = 'error';
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
  }
};
