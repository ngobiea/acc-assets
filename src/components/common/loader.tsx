import { Spinner } from '@/components/materialTailwind';



export default function Loader() { 
    return (
      <div className=' h-[calc(100vh-200px)] flex justify-center items-center'>
        <Spinner color='blue' className='h-16 w-16' />
      </div>
    );
}