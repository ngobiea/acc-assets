import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { PastEmploymentData } from '@/utils/declaration';
import { useFormState } from 'react-dom';
import { deletePastEmployment } from '@/actions/declaration/pastEmployment';

export default function PastEmploymentGridTable({
  pastEmployment,
}: {
  pastEmployment: PastEmploymentData;
}) {
  const [formState, formAction] = useFormState(
    deletePastEmployment.bind(null, {
      declarationId: pastEmployment.declarationId,
      id: pastEmployment.id,
    }),
    { errors: {} }
  );
  return (
    <Card id={pastEmployment.id}>
      <CardBody className='border-t border-blue-400'>
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
        <div className='grid md:grid-cols-2 gap-3 mb-3'>
          <div></div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Action:
            </Typography>
            <form className='' action={formAction}>
              <Button
                variant='gradient'
                color='red'
                className=''
                size='sm'
                type='submit'
              >
                Remove
              </Button>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
