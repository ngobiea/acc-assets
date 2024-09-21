import { deleteCurrentLastEmployment } from '@/actions/declaration/currentLastEmployment';
import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { EmploymentData } from '@/utils/declaration';

export default function CurrentEmploymentGridTable({
  employment,
  reason,
}: {
  employment: EmploymentData;
  reason: string;
}) {
  const deleteEmployment = deleteCurrentLastEmployment.bind(null, {
    declarationId: employment.declarationId,
    id: employment.id,
  });
  console.log(deleteEmployment);
  return (
    <Card id={employment.id} className=''>
      <CardBody className='border border-blue-400 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Ministy / Dept / Agency:
            </Typography>
            <Typography>
              {employment?.mda.abbreviation + ' - ' + employment?.mda.name}
            </Typography>
          </div>
          <div className='grid grid-cols-2  '>
            <Typography color='gray' className=' font-bold'>
              Employee Category:
            </Typography>
            <Typography>{`${employment?.employeeCategory}`}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              {reason === 'Appointment' || reason === 'Biennial Declaration'
                ? 'Current Posting:'
                : 'Last Posting:'}
            </Typography>
            <Typography>{`
                ${employment?.posting ? employment.posting : 'N/A'}
            `}</Typography>
          </div>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Job Title / Designation:
            </Typography>
            <Typography>{`${employment?.designation}`}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Grade / Rank:
            </Typography>
            <Typography>{employment?.rank}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Annual Salary:
            </Typography>
            <Typography>
              {employment.currency + '' + employment.annualSalary}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Other Allowances:
            </Typography>
            <Typography>
              {employment?.allowances
                ? employment.allowancesCurrency + '' + employment.allowances
                : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Other Allowances Details:
            </Typography>
            <Typography>
              {employment?.allowancesDescription
                ? employment.allowancesDescription
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Social Security No(SSNo):
            </Typography>
            <Typography>
              {employment?.SSNo ? employment.SSNo : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employee ID:
            </Typography>
            <Typography>{employment?.employeeId}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Employee No:
            </Typography>
            <Typography>
              {employment.employeeNo ? employment.employeeNo : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Establishment Registration No:
            </Typography>
            <Typography>
              {employment.establishmentRegNo
                ? employment.establishmentRegNo
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Contract Type:
            </Typography>
            <Typography>{employment?.contractType}</Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Start Date (mm/dd/yyyy):
            </Typography>
            <Typography>
              {employment.contractStartDate.toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              End Date (mm/dd/yyyy):
            </Typography>
            <Typography>
              {employment?.contractEndDate
                ? employment?.contractEndDate.toLocaleDateString()
                : 'N/A'}
            </Typography>
          </div>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Source of Income:
            </Typography>
            <Typography>
              {employment.sourceOfIncome ? employment.sourceOfIncome : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mb-2'>
          <div className='grid grid-cols-2'>
            <Typography color='gray' className=' font-bold'>
              Action:
            </Typography>
            <form className='' action={deleteEmployment}>
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
