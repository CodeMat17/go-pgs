import Link from 'next/link'
import Image from 'next/image'

export function Logo({text, width, height}: {text: string, width: number, height: number}) {
    return (
      <Link href='/' className='flex items-center gap-2'>
        <>
          <Image
            alt='logo'
            width={width}
            height={height}
            src='/go_logo.jpg'
            className='border rounded-full overflow-hidden'
          />
          <span className='text-xl font-bold tracking-tight text-primary'>
          {text}
          </span>
        </>
      </Link>
    );
}