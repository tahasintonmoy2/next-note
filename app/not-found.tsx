import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'
import NotFoundItem from '@/components/not-found-item'
import { siteConfig } from '@/config/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "This page could not be found.",
  description: siteConfig.description,
};

const NotFound = () => {
    const { orgId } = auth();

  return (
    <div className="mt-14 lg:grid lg:items-start gap-x-12">
    <div className="lg:col-span-7 flex flex-col items-center justify-center">
      <Image
       src="/404-error.png"
       alt=''
       width={350}
       height={350}
      />
      <div className='my-5 text-base font-bold'>
        <NotFoundItem title='Sorry about that. this page could not be found.'/>
      </div>
      <Link href={`/organization/${orgId}`}>
        <Button size="sm">Go back to organization page</Button>
      </Link>
    </div>
  </div>
  )
}

export default NotFound