import Link from 'next/link'
import Image from 'next/image'

export function Logo({text_one, text_two, width, height}: {text_one: string, text_two: string, width: number, height: number}) {
    return (
      <Link href='/' className='flex items-center gap-1 w-fit'>
        <>
          <Image
            alt='logo'
            width={width}
            height={height}
            src='/go_logo.jpg'
            className='border rounded-full overflow-hidden'
          />
          <div className='leading-4 tracking-tight'>
            <p>{ text_one}</p>
            <p>{text_two}</p>
          </div>
        </>
      </Link>
    );
}