import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Logo({
  text_one,
  text_two,
  width,
  height,
  classnames,
  light = false,
}: {
  text_one: string;
  text_two: string;
  width: number;
  height: number;
  classnames?: string;
  /** Render the wordmark in white for dark surfaces */
  light?: boolean;
}) {
  return (
    <Link
      href='/'
      className='group flex w-fit items-center gap-2.5 sm:gap-3'>
      <span className='relative shrink-0 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105'>
        <Image
          alt={text_one || text_two ? "" : "Godfrey Okoye University — Home"}
          width={width}
          height={height}
          src='/go_logo.jpg'
          className='rounded-full'
          loading='eager'
        />
      </span>
      {(text_one || text_two) && (
        <span className={cn("flex flex-col leading-tight", classnames)}>
          <span
            className={cn(
              "text-[13px] font-extrabold tracking-tight sm:text-[15px]",
              light ? "text-white" : "text-foreground"
            )}>
            {text_one}
          </span>
          <span
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs",
              light ? "text-gold" : "text-brand-600 dark:text-gold"
            )}>
            {text_two}
          </span>
        </span>
      )}
    </Link>
  );
}
