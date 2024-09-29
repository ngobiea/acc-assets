import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { OtherAssetData } from '@/utils/declaration';
import OtherPreviewGridTable from './table/other-preview-table';

export default function OtherPreview({
  otherAssets,
}: {
  otherAssets: OtherAssetData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Other Assets
        </Typography>
        {otherAssets?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {otherAssets.map((other) => (
          <OtherPreviewGridTable other={other} key={other.id} />
        ))}
      </CardBody>
    </Card>
  );
}
