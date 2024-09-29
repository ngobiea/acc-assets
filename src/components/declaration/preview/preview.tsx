import { Card, Typography } from '@/components/materialTailwind';
import type { DeclarationData } from '@/utils/declaration';
import { VscPreview } from 'react-icons/vsc';
import PersonalPreview from './table/personal-table';
import EmploymentPreview from './employment-preview';
import PastEmploymentPreview from './past-employment-preview';
import ContactPreview from './table/contact-preview';
import FamilyPreview from './family-preview';
import CashDepositPreview from './cash-deposit-preview';
import CashAtHandPreviewGridTable from './table/cash-at-hand';
import ImmovablePreview from './immovable-preview';
import MovablePreview from './movable-preview';
import SecurityPreview from './security-preview';
import OtherPreview from './other-preview';
import LiabilityPreview from './liability-preview';
import PreviewForm from './form';

export default function Preview({
  declaration,
}: {
  declaration: DeclarationData;
}) {
  return (
    <Card className=' mt-5'>
      {' '}
      <div className='bg-blue-100 px-5 py-5 rounded-t-md'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <VscPreview className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Preview
            </Typography>
          </div>
        </div>
      </div>
      <PersonalPreview personal={declaration?.personal} />
      <ContactPreview
        contact={declaration?.contact}
        email='ngobiea@gmail.com'
      />
      <EmploymentPreview
        employments={declaration?.employments}
        reason={declaration.reason}
      />
      <PastEmploymentPreview pastEmployments={declaration?.pastEmployments} />
      <FamilyPreview families={declaration?.families} />
      <CashAtHandPreviewGridTable cashAtHand={declaration?.cashAtHand} />
      <CashDepositPreview cashDeposits={declaration?.cashDeposits} />
      <ImmovablePreview immovableAssets={declaration?.immovableAssets} />
      <MovablePreview movableAssets={declaration?.movableAssets} />
      <SecurityPreview securities={declaration?.securities} />
      <OtherPreview otherAssets={declaration?.otherAssets} />
      <LiabilityPreview liabilities={declaration?.liabilities} />
      <PreviewForm declarationId={declaration.id} />

    </Card>
  );
}
