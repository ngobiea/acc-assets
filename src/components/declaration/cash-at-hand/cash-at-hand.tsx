import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { CashAtHandData } from '@/utils/declaration';

export default function CashAtHandGridTable({
  cashAtHand,
}: {
  cashAtHand: CashAtHandData;
}) {
  return (
    <Card id={cashAtHand.id} className=''>
      <CardBody className='border-x border-b border-blue-400 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Amount:`}
            </Typography>
            <Typography>
              {cashAtHand?.currency + cashAtHand?.amount}
            </Typography>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Description:
            </Typography>
            <Typography>{cashAtHand?.details}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Joint Income / Properties Details:
            </Typography>
            <Typography>{cashAtHand?.jointIncome || 'N/A'}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-3 mb-2'>
          <div></div>
          <div className='grid grid-cols-2 gap-2'>
            <Typography color='gray' className=' font-bold'>
              Action:
            </Typography>
            <form className='' action={''}>
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
