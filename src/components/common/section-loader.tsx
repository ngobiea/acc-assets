import { Spinner } from '@/components/materialTailwind';

export default function SectionLoader() {
  return (
    <div className='flex justify-center items-center w-full'>
      <Spinner color='blue' className='h-16 w-16' />
    </div>
  );
}
