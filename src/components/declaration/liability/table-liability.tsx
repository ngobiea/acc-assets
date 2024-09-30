import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';

import type { LiabilitiesData } from '@/utils/declaration';
import { deleteLiability } from '@/actions/declaration/liability';
import { useFormState } from 'react-dom';


export default function LiabilityGridTable({
  liability,
}: {
  liability: LiabilitiesData;
  }) {
  const [formState, formAction] = useFormState(
    deleteLiability.bind(null, {
      declarationId: liability.declarationId,
      id: liability.id,
    }),
    { errors: {} }
  );
  return (
    <Card className=''>
      <CardBody className='border-t border-blue-400 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Debtor's Name:`}
            </Typography>
            <Typography>{liability?.debtorName}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{liability?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Creditor:
            </Typography>
            <Typography>{liability?.creditor}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Creditor Location:
            </Typography>
            <Typography>{liability?.creditorAddress || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Loan Amount:
            </Typography>
            <Typography>
              {liability?.currency + liability.loanAmount}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Year Contracted:
            </Typography>
            <Typography>{liability?.yearContracted || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Loan Repayment:
            </Typography>
            <Typography>{liability?.loanRepayment}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Payment Period:
            </Typography>
            <Typography>{liability?.paymentPeriod}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Purpose of Loan:
            </Typography>
            <Typography>{liability?.loanPurpose}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Loan Outstanding:
            </Typography>
            <Typography>
              {liability?.currencyOutstanding + liability.loanOutstanding}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Maturity Date:
            </Typography>
            <Typography>
              {liability?.maturityDate?.toLocaleDateString() || 'N/A'}
            </Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Remarks:
            </Typography>
            <Typography>{liability?.remarks || 'N/A'}</Typography>
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
