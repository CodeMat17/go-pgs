// components/Footer.tsx
"use client";

import { Logo } from "@/components/Logo";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ArrowRight,
  ArrowUp,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const QUICK_LINKS = [
  { name: "About Us", href: "/about-us" },
  { name: "Admission Requirements", href: "/requirements" },
  { name: "Research", href: "/research" },
  { name: "News", href: "/news" },
  { name: "Alumni", href: "/alumni" },
  { name: "Administrative Team", href: "/administrative-team" },
];

const STUDENT_LINKS = [
  { name: "All Courses", href: "/courses" },
  { name: "Course Materials", href: "/course-materials" },
  { name: "Fees", href: "/fees" },
  { name: "Exam Timetable", href: "/exam-timetable" },
  { name: "Lecture Timetable", href: "/lecture-timetable" },
];

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  const footer = useQuery(api.contactUs.getContactInfo);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { toast } = await import("sonner");
    if (!email || !email.includes("@")) {
      toast.error("Invalid Email", { description: "Please enter a valid email address" });
      return;
    }
    setEmail("");
    toast.success("Subscribed!", { description: "Thank you for joining our newsletter!" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className='relative overflow-hidden bg-brand-950 text-white/70'>
      <div className='pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40' aria-hidden='true' />
      <div
        className='pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl'
        aria-hidden='true'
      />

      {/* Newsletter band */}
      <div className='relative border-b border-white/10'>
        <div className='container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-xl font-extrabold text-white sm:text-2xl'>
              Stay ahead of every admission cycle
            </h2>
            <p className='mt-1 text-sm text-white/60'>
              Admission windows, deadlines and school news, straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className='flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur'>
            <label htmlFor='footer-email' className='sr-only'>
              Email address
            </label>
            <input
              id='footer-email'
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none'
            />
            <button
              type='submit'
              className='inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-extrabold text-brand-950 transition-colors hover:bg-gold-300'>
              Subscribe
              <ArrowRight className='h-4 w-4' />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className='container-page relative grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12'>
        <div className='sm:col-span-2 lg:col-span-4'>
          <Logo
            text_one='Godfrey Okoye University'
            text_two='Postgraduate School'
            width={52}
            height={52}
            light
          />
          <p className='mt-5 max-w-sm text-sm leading-relaxed text-white/60'>
            Research-driven postgraduate education in Enugu, built on the
            university&apos;s motto: <span className='font-bold text-white/80'>Unity of Knowledge</span>.
          </p>
          <div className='mt-6 flex gap-2'>
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={`Follow us on ${label}`}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold hover:bg-gold hover:text-brand-950'>
                <Icon className='h-4 w-4' />
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn title='Explore' links={QUICK_LINKS} className='lg:col-span-2' />
        <FooterColumn title='Students' links={STUDENT_LINKS} className='lg:col-span-2' />

        <div className='sm:col-span-2 lg:col-span-4'>
          <h2 className='mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white'>
            Get in touch
          </h2>
          <ul className='space-y-4 text-sm'>
            {footer?.address && (
              <li className='flex items-start gap-3'>
                <IconBadge><MapPin className='h-4 w-4' /></IconBadge>
                <span className='pt-1.5'>{footer.address}</span>
              </li>
            )}
            {footer?.phone?.[0]?.tel1 && (
              <li className='flex items-center gap-3'>
                <IconBadge><Phone className='h-4 w-4' /></IconBadge>
                <a href={`tel:${footer.phone[0].tel1}`} className='transition-colors hover:text-gold'>
                  {footer.phone[0].tel1}
                </a>
              </li>
            )}
            {footer?.email?.[0]?.email1 && (
              <li className='flex items-center gap-3'>
                <IconBadge><Mail className='h-4 w-4' /></IconBadge>
                <a
                  href={`mailto:${footer.email[0].email1}`}
                  className='truncate transition-colors hover:text-gold'>
                  {footer.email[0].email1}
                </a>
              </li>
            )}
            {footer?.officeHours?.[0] && (
              <li className='flex items-start gap-3'>
                <IconBadge><Clock className='h-4 w-4' /></IconBadge>
                <span className='pt-1'>
                  {footer.officeHours[0].days}
                  <span className='block text-white/45'>{footer.officeHours[0].time}</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='relative border-t border-white/10'>
        <div className='container-page flex flex-col items-center justify-between gap-3 py-6 sm:flex-row'>
          <p className='text-center text-xs text-white/45 sm:text-left'>
            © {new Date().getFullYear()} Godfrey Okoye University Postgraduate School. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label='Back to top'
            className='inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition-colors hover:border-gold hover:text-gold'>
            <ArrowUp className='h-3.5 w-3.5' />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className='mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white'>
        {title}
      </h2>
      <ul className='space-y-3'>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className='inline-flex text-sm transition-all duration-200 hover:translate-x-0.5 hover:text-gold'>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold ring-1 ring-white/10'>
      {children}
    </span>
  );
}
