import { checkSubscription } from '@/lib/subscription';
import React from 'react'
import { Info } from '../_components/info';
import { Separator } from '@/components/ui/separator';
import { SubscriptionButton } from './_components/subscription-button';

const BillingPage = async() => {
    const isPro = await checkSubscription();

  return (
    <div className='w-full'>
       <Info isPro={isPro} />
       <Separator className="my-3 max-w-[66.5rem] md:block hidden" />
       <Separator className="my-3 w-[23rem] md:hidden block" />
       <SubscriptionButton isPro={isPro} />
    </div>
  )
}

export default BillingPage