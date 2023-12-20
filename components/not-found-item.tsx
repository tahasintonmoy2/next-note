import React from 'react'

interface NotFoundItemProps {
  title: string
}

const NotFoundItem: React.FC<NotFoundItemProps> = ({
  title
}) => {
  return (
    <p className='flex items-center justify-center h-full w-full text-slate-500'>
      {title}
    </p>
  )
}

export default NotFoundItem