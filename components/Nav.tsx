"use client";

import { Logo } from "@/components/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { AlignRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },

    {
      name: "Programs",
      href: "/programs",
      subLinks: [
        { name: "Courses", href: "/courses" },
        { name: "Course Materials", href: "/course-materials" },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      subLinks: [
        { name: "Admission Requirements", href: "/requirements" },
        { name: "Research", href: "/research" },
        { name: "Students Data Collection", href: "/pg-students" },
      ],
    },
    { name: "News", href: "/news" },
    {
      name: "Profiles",
      href: "/profiles",
      subLinks: [
        { name: "Staff", href: "/staff" },
        { name: "Alumni", href: "/alumni" },
      ],
    },

    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;
  const isSubLinkActive = (subLinks: { href: string }[]) =>
    subLinks.some((sub) => isActive(sub.href));

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-[68px] items-center justify-between px-3 sm:px-6 lg:px-8'>
        <Logo
          text_one='Godfrey Okoye University'
          text_two='School of Postgraduate Studies'
          classnames='sm:font-semibold'
          width={50}
          height={50}
        />

        <div className='hidden lg:flex items-center gap-6'>
          {navLinks.map((link) => (
            <div key={link.name} className='relative group'>
              {link.subLinks ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none border-none ${
                      isSubLinkActive(link.subLinks)
                        ? "text-blue-500 bg-gray-500/5 rounded-md px-3 py-1.5"
                        : "hover:text-primary"
                    }`}>
                    {link.name}
                    <span
                      className={`h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform ${
                        isSubLinkActive(link.subLinks) ? "text-blue-500" : ""
                      }`}>
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
                          className={`px-4 py-2 hover:bg-accent rounded-md transition-colors ${isActive(subLink.href) ? "text-blue-500" : ""}`}>
                          {subLink.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isActive(link.href) ? "text-blue-500 bg-blue-500/10 rounded-md px-3 py-1.5" : "hover:text-primary"}`}>
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className='lg:hidden'>
              <AlignRightIcon className='h-8 w-8 text-3xl font-bold' />
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='flex flex-col h-full pt-8'>
                {navLinks.map((link) => (
                  <div key={link.name} className='border-b py-2'>
                    {link.subLinks ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className='w-full text-left px-4 py-2 font-medium flex justify-between items-center'>
                          {link.name}
                          <span
                            className={`${isSubLinkActive(link.subLinks) ? "text-[#FEDA37]" : ""}`}>
                            ▼
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-full ml-4'>
                          {link.subLinks.map((subLink) => (
                            <DropdownMenuItem key={subLink.name} asChild>
                              <Link
                                href={subLink.href}
                                className={`block px-4 py-2 text-sm ${isActive(subLink.href) ? "dark:text-[#FEDA37] bg-primary/10" : ""}`}
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
                        className={`block px-4 py-2 font-medium ${isActive(link.href) ? "bg-[#FEDA37]/40 dark:text-[#FEDA37] dark:bg-primary/10 rounded-md" : ""}`}
                        onClick={() => setIsOpen(false)}>
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
