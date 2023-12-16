import { cn } from '@/lib/utils'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
    href: string
}

const textFont = Jost({
  subsets:["latin"]
})

const Logo = ({
    href
}: LogoProps) => {
  return (
    <div>
        <Link href={href} className='flex items-center gap-x-2 font-semibold'>
            <Image src="/logo.png" alt='' height={30} width={30}/>
            <p className={cn('text-lg', textFont)}>Next Note</p>
        </Link>
    </div>
  )
}

export default Logo