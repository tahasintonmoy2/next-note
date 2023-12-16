import React from 'react'
import { Navbar } from './_components/navbar'

const Dashboardlayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div className='h-screen'>
      <Navbar />
        <main>
         {children}
        </main>
    </div>
  )
}

export default Dashboardlayout