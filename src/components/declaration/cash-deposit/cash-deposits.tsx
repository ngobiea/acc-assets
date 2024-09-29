'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardFooter,
  Button,
} from '@/components/materialTailwind';
import { BsCashCoin } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setIsCashDepositFormOpen,
  setIsCashAtHandFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import type { CashAtHandData, CashDepositData } from '@/utils/declaration';
import CashDepositGridTable from './table-cash-deposit';
import CashAtHandGridTable from '../cash-at-hand/cash-at-hand';
export default function CashDepositAccordion({
  cashAtHand,
  cashDeposits,
}: {
  cashAtHand: CashAtHandData | null;
  cashDeposits: CashDepositData[];
}) {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.declaration);
  return (
    <Card className='my-5'>
      <div className='bg-blue-100 px-5 py-5 rounded-t-xl border border-blue-500'>
        <div
          className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0
        '
        >
          <div className='flex space-x-2'>
            <BsCashCoin className='text-3xl' />
            <Typography variant='h5' color='blue-gray'>
              Cash Deposits
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() => dispatch(setIsCashDepositFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {cashDeposits?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-x border-b border-blue-400 rounded-b-xl'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {cashDeposits?.map((cashDeposit) => {
        return (
          <CashDepositGridTable
            key={cashDeposit.id}
            cashDeposit={cashDeposit}
          />
        );
      })}
      <div className='bg-blue-100 px-5 py-5 mt-5 rounded-t-xl border border-blue-500'>
        <div
          className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0
        '
        >
          <div className='flex space-x-1'>
            <GiTakeMyMoney className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Cash At Hand <sup>(Optional)</sup>
            </Typography>
          </div>
          {!cashAtHand && (
            <div>
              <Button
                color='blue'
                className='w-full sm:w-min hover:animate-bounce'
                onClick={() => dispatch(setIsCashAtHandFormOpen(true))}
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
      {!cashAtHand && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-x border-b border-blue-400 '
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {cashAtHand && <CashAtHandGridTable cashAtHand={cashAtHand} />}
      <CardFooter className='border-x border-b border-blue-400 rounded-b-xl '>
        <div className='flex justify-between'>
          <Button
            onClick={() => dispatch(handlePrevDeclarationStep())}
            color='blue'
          >
            Prev
          </Button>
          <Button
            color='blue'
            onClick={() => dispatch(handleNextDeclarationStep())}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
