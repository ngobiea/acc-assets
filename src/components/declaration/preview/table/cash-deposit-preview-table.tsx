import { Card, CardBody, Typography } from '@/components/materialTailwind';
import type { CashDepositData } from '@/utils/declaration';


export default function CashDepositPreviewGridTable({
  cashDeposit,
}: {
  cashDeposit: CashDepositData;
}) {
  return (
    <Card id={cashDeposit.id} className=''>
      <CardBody className='border-t border-blue-400  bg-blue-50/50 '>
        <div className='grid md:grid-cols-2 mb-3 gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              {`Owner's Name:`}
            </Typography>
            <Typography>{cashDeposit?.ownerName}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Register Owner:
            </Typography>
            <Typography>{cashDeposit?.registerOwner}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3 gap-3 '>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Deposit Type:
            </Typography>
            <Typography>{cashDeposit?.type}</Typography>
          </div>
          <div className='grid grid-cols-2 '>
            <Typography color='gray' className=' font-bold'>
              Relation:
            </Typography>
            <Typography>{cashDeposit?.relation}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Account No:
            </Typography>
            <Typography>{cashDeposit?.accountNo}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Institution Or Bank:
            </Typography>
            <Typography>{cashDeposit?.institutionOrBank}</Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Bank Location / Branch:
            </Typography>
            <Typography>{cashDeposit?.location || 'N/A'}</Typography>
          </div>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Account Balance:
            </Typography>
            <Typography>
              {cashDeposit?.currency + cashDeposit?.accountBalance}
            </Typography>
          </div>
        </div>
        <div className='grid md:grid-cols-2 mb-3  gap-3'>
          <div className='grid sm:grid-cols-2 sm:gap-2'>
            <Typography color='gray' className=' font-bold'>
              Source of Deposit:
            </Typography>
            <Typography>{cashDeposit?.source || 'N/A'}</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
