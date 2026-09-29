"use client";

import { Logo } from "@/components/Logo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme/theme-toggle";

type SubLink = { name: string; href: string; description: string };
type NavLink = { name: string; href: string; subLinks?: SubLink[] };

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  {
    name: "Programmes",
    href: "/programs",
    subLinks: [
      { name: "Courses", href: "/courses", description: "PGD, Masters & PhD programmes" },
      { name: "Course Materials", href: "/course-materials", description: "Download lecture resources" },
      { name: "Fees", href: "/fees", description: "Official fee schedules" },
      { name: "Exam Timetable", href: "/exam-timetable", description: "Upcoming examinations" },
      { name: "Lecture Timetable", href: "/lecture-timetable", description: "Weekly class schedule" },
    ],
  },
  {
    name: "Academics",
    href: "/academics",
    subLinks: [
      { name: "Admission Requirements", href: "/requirements", description: "Eligibility & how to apply" },
      { name: "Research", href: "/research", description: "Research focus & output" },
    ],
  },
  {
    name: "News",
    href: "/news",
    subLinks: [
      { name: "News", href: "/news", description: "Announcements & stories" },
      { name: "Campus Community", href: "/campus-community", description: "Student life & engagements" },
    ],
  },
  {
    name: "People",
    href: "/profiles",
    subLinks: [
      { name: "Administrative Team", href: "/administrative-team", description: "Meet the school leadership" },
      { name: "Alumni", href: "/alumni", description: "Our graduate community" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (link: NavLink) =>
    link.subLinks ? link.subLinks.some((s) => isActive(s.href)) : isActive(link.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 shadow-[0_8px_30px_-20px_rgba(20,15,51,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      )}>
      <nav className='container-page flex h-[72px] items-center justify-between gap-4'>
        <Logo
          text_one='Godfrey Okoye University'
          text_two='Postgraduate School'
          width={44}
          height={44}
        />

        {/* Desktop links */}
        <ul className='hidden items-center gap-1 lg:flex'>
          {navLinks.map((link) => {
            const active = isGroupActive(link);
            if (!link.subLinks) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-bold transition-colors",
                      active
                        ? "text-brand-700 dark:text-gold"
                        : "text-foreground/70 hover:text-foreground"
                    )}>
                    {link.name}
                    {active && (
                      <m.span
                        layoutId='nav-active'
                        className='absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold'
                      />
                    )}
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={link.name}
                className='relative'
                onMouseEnter={() => setOpenMenu(link.name)}
                onMouseLeave={() => setOpenMenu(null)}>
                <button
                  type='button'
                  aria-expanded={openMenu === link.name}
                  onClick={() => setOpenMenu(openMenu === link.name ? null : link.name)}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-bold transition-colors",
                    active
                      ? "text-brand-700 dark:text-gold"
                      : "text-foreground/70 hover:text-foreground"
                  )}>
                  {link.name}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      openMenu === link.name && "rotate-180"
                    )}
                  />
                  {active && (
                    <m.span
                      layoutId='nav-active'
                      className='absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold'
                    />
                  )}
                </button>
                <AnimatePresence>
                  {openMenu === link.name && (
                    <m.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className='absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3'>
                      <div className='w-72 rounded-2xl border border-border/70 bg-popover p-2 shadow-lift'>
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.href + sub.name}
                            href={sub.href}
                            className={cn(
                              "group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent",
                              isActive(sub.href) && "bg-accent"
                            )}>
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                isActive(sub.href)
                                  ? "bg-gold"
                                  : "bg-border group-hover:bg-gold"
                              )}
                            />
                            <span>
                              <span className='block text-sm font-bold text-foreground'>
                                {sub.name}
                              </span>
                              <span className='block text-xs text-muted-foreground'>
                                {sub.description}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Link
            href='/requirements'
            className='hidden items-center gap-1.5 rounded-full bg-brand-800 px-5 py-2.5 text-sm font-extrabold text-white transition-all hover:bg-brand-700 dark:bg-gold dark:text-brand-950 dark:hover:bg-gold-300 sm:inline-flex lg:hidden xl:inline-flex'>
            Apply Now
            <ArrowRight className='h-4 w-4' />
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              aria-label='Open menu'
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden'>
              <Menu className='h-5 w-5' />
            </SheetTrigger>
            <SheetContent side='right' className='flex w-[88vw] max-w-sm flex-col p-0'>
              <SheetTitle className='sr-only'>Site navigation</SheetTitle>
              <div className='border-b border-border px-5 py-5'>
                <Logo
                  text_one='Godfrey Okoye University'
                  text_two='Postgraduate School'
                  width={40}
                  height={40}
                />
              </div>
              <ul className='flex-1 overflow-y-auto px-3 py-4'>
                {navLinks.map((link) => (
                  <li key={link.name} className='py-0.5'>
                    {link.subLinks ? (
                      <>
                        <button
                          type='button'
                          onClick={() =>
                            setMobileGroup(mobileGroup === link.name ? null : link.name)
                          }
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[15px] font-bold",
                            isGroupActive(link) ? "text-brand-700 dark:text-gold" : ""
                          )}>
                          {link.name}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              mobileGroup === link.name && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileGroup === link.name && (
                            <m.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className='ml-3 overflow-hidden border-l border-border pl-3'>
                              {link.subLinks.map((sub) => (
                                <li key={sub.href + sub.name}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "block rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground",
                                      isActive(sub.href) &&
                                        "bg-accent text-foreground"
                                    )}>
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </m.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-3 text-[15px] font-bold",
                          isActive(link.href) && "bg-accent text-brand-700 dark:text-gold"
                        )}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className='border-t border-border p-5'>
                <Link
                  href='/requirements'
                  onClick={() => setIsOpen(false)}
                  className='btn-brand w-full'>
                  Apply Now <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
