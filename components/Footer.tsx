// components/Footer.tsx
"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import {
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
import { toast } from "sonner";

const QUICK_LINKS = [
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Requirements", href: "/requirements" },
  { name: "Research", href: "/research" },
  { name: "News", href: "/news" },
  { name: "Alumni", href: "/alumni" },
  { name: "Administrative Team", href: "/administrative-team" },
];

const PROGRAMS = [
  { name: "Postgraduate Diploma (PGD)", href: "/courses" },
  { name: "Masters Degree", href: "/courses" },
  { name: "Doctor of Philosophy (PhD)", href: "/courses" },
];

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  const footer = useQuery(api.contactUs.getContactInfo);
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Invalid Email", { description: "Please enter a valid email address" });
      return;
    }
    setEmail("");
    toast.success("Subscribed!", { description: "Thank you for joining our newsletter!" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url('/pattern.png')", backgroundSize: "400px" }}
        aria-hidden="true"
      />
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FFDC55] to-transparent" />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Column 1: Brand + Contact ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Logo text_one="" text_two="" classnames="" width={64} height={64} />
            <p className="mt-3 text-sm font-semibold text-white leading-snug">
              Godfrey Okoye University
              <span className="block font-normal text-gray-400">
                School of Postgraduate Studies
              </span>
            </p>

            <ul className="mt-5 space-y-3">
              {footer?.address && (
                <li className="flex items-start gap-2.5 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#FFDC55]" />
                  <span>{footer.address}</span>
                </li>
              )}
              {footer?.phone?.[0] && (
                <li className="flex items-center gap-2.5 text-sm">
                  <Phone className="w-4 h-4 shrink-0 text-[#FFDC55]" />
                  <a
                    href={`tel:${footer.phone[0].tel1}`}
                    className="hover:text-[#FFDC55] transition-colors"
                  >
                    {footer.phone[0].tel1}
                  </a>
                </li>
              )}
              {footer?.email?.[0] && (
                <li className="flex items-center gap-2.5 text-sm">
                  <Mail className="w-4 h-4 shrink-0 text-[#FFDC55]" />
                  <a
                    href={`mailto:${footer.email[0].email1}`}
                    className="hover:text-[#FFDC55] transition-colors truncate"
                  >
                    {footer.email[0].email1}
                  </a>
                </li>
              )}
              {footer?.officeHours?.[0] && (
                <li className="flex items-start gap-2.5 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[#FFDC55]" />
                  <span>
                    {footer.officeHours[0].days}
                    <span className="block text-gray-500">{footer.officeHours[0].time}</span>
                  </span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* ── Column 2: Quick Links ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#FFDC55] hover:translate-x-1 inline-flex transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 3: Programs ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {PROGRAMS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#FFDC55] hover:translate-x-1 inline-flex transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FFDC55] hover:underline uppercase tracking-wider"
                >
                  See all programmes →
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* ── Column 4: Social + Newsletter ── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Stay Connected
            </h4>

            {/* Social icons */}
            <div className="flex gap-2 mb-7">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-[#FFDC55] hover:text-[#FFDC55] hover:bg-[#FFDC55]/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-sm text-gray-400 mb-3">
              Get updates on admissions and events.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="rounded-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FFDC55] text-sm h-9"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full px-4 bg-[#FFDC55] text-gray-900 font-semibold hover:bg-[#FFDC55]/90 shrink-0 h-9"
              >
                Join
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Godfrey Okoye University Postgraduate School.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-gray-500 hover:text-[#FFDC55] transition-colors">
              Contact Us
            </Link>
            <span className="text-gray-700 text-xs">|</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#FFDC55] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
