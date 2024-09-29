import { Card, CardBody, Typography } from '@/components/materialTailwind';
import type { FamilyData } from '@/utils/declaration';
import FamilyPreviewGridTable from './table/family-preview-table';

export default function FamilyPreview({
  families,
}: {
  families: FamilyData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Family
        </Typography>
        {families?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {families.map((family) => (
          <FamilyPreviewGridTable family={family} key={family.id} />
        ))}
      </CardBody>
    </Card>
  );
}
