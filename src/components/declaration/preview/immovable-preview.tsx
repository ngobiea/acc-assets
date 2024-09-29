import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { ImmovableAssetData } from '@/utils/declaration';
import ImmovablePreviewGridTable from './table/immovable-preview-table';

export default function ImmovablePreview({
  immovableAssets,
}: {
  immovableAssets: ImmovableAssetData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Immovable Assets
        </Typography>
        {immovableAssets?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {immovableAssets.map((immovable) => (
          <ImmovablePreviewGridTable immovable={immovable} key={immovable.id} />
        ))}
      </CardBody>
    </Card>
  );
}
