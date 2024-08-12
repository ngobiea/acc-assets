import { IoMdLogIn } from 'react-icons/io';
import LoginForm from '@/components/auth/login-form';
import { CardHeader } from '@/components/materialTailwind';

const LoginPage: React.FC = () => {
  return (
    <>
      <CardHeader
        variant='gradient'
        color='green'
        className='mb-4 grid h-28 place-items-center'
      >
        <IoMdLogIn className='text-white text-6xl mx-auto' />
        <h2 className='text-white  text-2xl font-bold text-center'>Login</h2>
        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'></hr>
      </CardHeader>
      <LoginForm />
    </>
  );
};

export default LoginPage;

/**
 *    <div className='p-6 max-w-sm mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg space-y-4 text-white transform transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105'>
          <h2 className='text-2xl font-bold'>Visually Appealing Div</h2>
          <p>This is a simple div styled with Tailwind CSS.</p>
        </div>

        <div className='p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6 transform transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:animate-bounce'>
          <h2 className='text-2xl font-bold text-gray-900'>Login</h2>
          <form action='#'>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6 transition-transform transform hover:scale-105'
            >
              Sign in
            </button>
          </form>
        </div>
 */
