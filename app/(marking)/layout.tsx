import { cn } from '@/lib/utils'
import { Jost } from 'next/font/google'
import React from 'react'
import { Navbar } from './_components/navbar'
import Footer from './_components/footer'

const textFont = Jost({
  subsets:["latin"]
})

const Markinglayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div className='h-screen bg-slate-100'>
      <Navbar />
        <main className={cn('pt-40 pb-20 bg-slate-100', textFont.className)}>
            {children}
        </main>
      <Footer />  
    </div>
  )
}

export default Markinglayout