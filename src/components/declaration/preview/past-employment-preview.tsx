import { Card, CardBody, Typography } from '@/components/materialTailwind';
import type { PastEmploymentData } from '@/utils/declaration';
import PastEmploymentPreviewGridTable from './table/past-employment-preview';

export default function PastEmploymentPreview({
  pastEmployments,
}: {
  pastEmployments: PastEmploymentData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0 '>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          Past Employment
        </Typography>
        {pastEmployments?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {pastEmployments.map((employment) => (
          <PastEmploymentPreviewGridTable
            pastEmployment={employment}
            key={employment.id}
          />
        ))}
      </CardBody>
    </Card>
  );
}
