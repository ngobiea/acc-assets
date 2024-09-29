import { Card, CardBody, Typography } from '@/components/materialTailwind';
import type { EmploymentData } from '@/utils/declaration';

import EmploymentPreviewGridTable from './table/employment-table';

export default function EmploymentPreview({
  reason,
  employments,
}: {
  reason: string;
  employments: EmploymentData[];
}) {
  return (
    <Card className='bg-blue-50/50 p-0 mb-8 border border-blue-500'>
      <CardBody className=' px-0 pb-0'>
        <Typography variant='h4' color='gray' className='px-6 pb-6'>
          {reason === 'Appointment' || reason === 'Biennial Declaration'
            ? 'Current Employment List'
            : 'Last Employment List'}
        </Typography>
        {employments?.length === 0 && (
          <Typography
            className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
            variant='h6'
          >
            No data available
          </Typography>
        )}
        {employments.map((employment) => (
          <EmploymentPreviewGridTable
            employment={employment}
            key={employment.id}
            reason={reason}
          />
        ))}
      </CardBody>
    </Card>
  );
}
