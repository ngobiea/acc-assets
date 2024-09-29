import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { MovableAssetData } from '@/utils/declaration';
import MovablePreviewGridTable from './table/movable';

export default function MovablePreview({
  movableAssets,
}: {
  movableAssets: MovableAssetData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Movable Assets
        </Typography>
        {movableAssets?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {movableAssets.map((movable) => (
          <MovablePreviewGridTable movable={movable} key={movable.id} />
        ))}
      </CardBody>
    </Card>
  );
}
