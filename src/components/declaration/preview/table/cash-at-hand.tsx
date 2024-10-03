import {
  Button,
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
import type { CashAtHandData } from '@/utils/declaration';
import React from 'react';

export default function CashAtHandPreviewGridTable({
  cashAtHand,
}: {
  cashAtHand: CashAtHandData | null;
}) {
  return (
    <Card
      id={cashAtHand?.id}
      className='bg-blue-50/50 border border-blue-500 mb-8'
    >
      <CardBody className=''>
        <div className='flex w-full justify-between'>
          <Typography variant='h4' className='mb-5'>
            Cash At Hand
          </Typography>
        </div>
        {!cashAtHand ? (
          <Typography
            className='text-blue-gray-400 text-center'
            variant='h6'
          >
            No data available
          </Typography>
        ) : (
          <>
            <div className='grid md:grid-cols-2 mb-3 gap-3'>
              <div className='grid sm:grid-cols-2 sm:gap-2'>
                <Typography color='gray' className=' font-bold'>
                  {`Amount:`}
                </Typography>
                <Typography>
                  {cashAtHand?.currency + '' + cashAtHand?.amount}
                </Typography>
              </div>
              <div className='grid sm:grid-cols-2 sm:gap-2'>
                <Typography color='gray' className=' font-bold'>
                  Description:
                </Typography>
                <Typography>{cashAtHand?.details}</Typography>
              </div>
            </div>
            <div className='grid md:grid-cols-2 mb-3 gap-3 '>
              <div className='grid sm:grid-cols-2 sm:gap-2'>
                <Typography color='gray' className=' font-bold'>
                  Joint Income / Properties Details:
                </Typography>
                <Typography>{cashAtHand?.jointIncome || 'N/A'}</Typography>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
