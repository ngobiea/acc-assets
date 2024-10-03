import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { PastEmploymentData } from '@/utils/declaration';

export default function PastEmploymentPreviewGridTable({
  pastEmployment,
}: {
  pastEmployment: PastEmploymentData;
}) {
  return (
    <Card id={pastEmployment.id}>
      <CardBody className='border-t border-blue-400 bg-blue-50/50'>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Previous Employer:
            </Typography>
            <Typography>{pastEmployment?.employerName}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Job Title / Designation:
            </Typography>
            <Typography>{`${pastEmployment.designation}`}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Grade / Rank:
            </Typography>
            <Typography>{`
                ${pastEmployment?.rank ? pastEmployment.rank : 'N/A'}
            `}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Source of Income:
            </Typography>
            <Typography>
              {pastEmployment.sourceOfIncome
                ? pastEmployment.sourceOfIncome
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Annual Salary:
            </Typography>
            <Typography>
              {pastEmployment.currency + pastEmployment.annualSalary}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Other Allowances:
            </Typography>
            <Typography>
              {pastEmployment?.allowances
                ? pastEmployment.allowancesCurrency + pastEmployment.allowances
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Start Date<sup> (mm/dd/yyyy):</sup>
            </Typography>
            <Typography>
              {pastEmployment.contractStartDate.toLocaleDateString()}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              End Date <sup>(mm/dd/yyyy)</sup> :
            </Typography>
            <Typography>
              {pastEmployment?.contractEndDate
                ? pastEmployment?.contractEndDate.toLocaleDateString()
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Other Allowances Details:
            </Typography>
            <Typography>
              {pastEmployment?.allowancesDescription
                ? pastEmployment.allowancesDescription
                : 'N/A'}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
