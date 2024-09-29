import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { type SecurityData } from '@/utils/declaration';
import MovablePreviewGridTable from './table/movable';
import SecurityPreviewGridTable from './table/security-preview-table';

export default function SecurityPreview({
  securities,
}: {
  securities: SecurityData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Securities
        </Typography>
        {securities?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {securities.map((security) => (
          <SecurityPreviewGridTable security={security} key={security.id} />
        ))}
      </CardBody>
    </Card>
  );
}
