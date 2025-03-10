// components/Nav.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { AlignRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BorderBeam } from "./magicui/border-beam";
import ThemeToggle from "./theme/theme-toggle";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Admissions",
      href: "/admissions",
      subLinks: [
        { name: "Requirements", href: "/admissions/requirements" },
        { name: "How to Apply", href: "/admissions/apply" },
        { name: "Deadlines", href: "/admissions/deadlines" },
      ],
    },
    {
      name: "Programs",
      href: "/programs",
      subLinks: [
        { name: "Master's Degrees", href: "/programs/masters" },
        { name: "PhD Programs", href: "/programs/phd" },
        { name: "Certificates", href: "/programs/certificates" },
      ],
    },
    { name: "Research", href: "/research" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className=' flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-xl font-bold tracking-tight text-primary'>
            GO Postgrad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-6'>
          {navLinks.map((link) => (
            <div key={link.name} className='relative group'>
              {link.subLinks ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none'>
                    {link.name}
                    <span className='h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform'>
                      ▼
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    className='min-w-[200px] rounded-lg shadow-lg'>
                    {link.subLinks.map((subLink) => (
                      <DropdownMenuItem key={subLink.name} asChild>
                        <Link
                          href={subLink.href}
                          className='px-4 py-2 hover:bg-accent rounded-md transition-colors'>
                          {subLink.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={link.href}
                  className='text-sm font-medium transition-colors hover:text-primary'>
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          {/* Apply Button - Desktop */}
          <div className='hidden lg:flex items-center gap-4'>
            <Button asChild variant='secondary' className='relative'>
              <Link href='/admissions/apply'>
                <>
                  Apply Now
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
                </>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className='lg:hidden'>
              <AlignRightIcon className='h-8 w-8 text-3xl font-bold' />
            </SheetTrigger>

            {/* Mobile Navigation */}
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='flex flex-col h-full pt-8'>
                {navLinks.map((link) => (
                  <div key={link.name} className='border-b py-2'>
                    {link.subLinks ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className='w-full text-left px-4 py-2 font-medium flex justify-between items-center'>
                          {link.name}
                          <span>▼</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-full ml-4'>
                          {link.subLinks.map((subLink) => (
                            <DropdownMenuItem key={subLink.name} asChild>
                              <Link
                                href={subLink.href}
                                className='block px-4 py-2 text-sm'
                                onClick={() => setIsOpen(false)}>
                                {subLink.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={link.href}
                        className='block px-4 py-2 font-medium'
                        onClick={() => setIsOpen(false)}>
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Button className='mt-4 mx-4' asChild>
                  <Link
                    href='/admissions/apply'
                    onClick={() => setIsOpen(false)}>
                    Apply Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
