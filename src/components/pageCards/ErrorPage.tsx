import { Link } from 'react-router-dom';

type MessageError = {
  messageError: string;
};

export const ErrorPage = ({ messageError }: MessageError) => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

        <p className="mt-4 text-gray-500">We can't find that page. {messageError}</p>
        <Link
          to={'/'}
          className="mt-6 inline-block rounded bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring"
        >
          <a>Go Back Home</a>
        </Link>
      </div>
    </div>
  );
};
