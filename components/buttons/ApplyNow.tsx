import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ApplyNow() {
  return (
    <Button
      asChild
      className='relative overflow-hidden text-sm xs:text-base sm:text-lg p-5 sm:p-5 md:p-6 text-white bg-gray-950 border-gray-950'
      size='lg'
      variant='outline'>
      <Link href='/programs'>
        <>
         Explore our Programs
          <BorderBeam
            size={40}
            initialOffset={20}
            className='from-red-500 via-yellow-500 to-red-500'
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
            }}
          />
        </>{" "}
      </Link>
    </Button>
  );
}
