// components/Footer.tsx
"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
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

export default function Footer() {
  const footer = useQuery(api.contactUs.getContactInfo);

  const [email, setEmail] = useState("");

  const handleEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes("@")) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address",
      });
      return;
    }

    setEmail("");
    // Show success message
    toast.success("Subscribed!", {
      description: "Thank you for joining our newsletter!",
    });
  };

  return (
    <footer className='bg-gray-900 text-white border-t'>
      <div className='w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12'>
        <Logo text_one='' text_two='' classnames='' width={70} height={70} />

        <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-8 mt-2'>
          {/* University Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='col-span-2 md:col-span-1'>
            <h3 className='text-xl font-medium mb-4'>
              Godfrey Okoye University{" "}
              <span className='block'>School of Postgraduate Studies</span>
            </h3>
            <div className='space-y-2 mt-2'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 shrink-0' />
                <p className='text-sm'>{footer?.address}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 shrink-0' />
                {footer?.phone?.map((tel, i) => (
                  <p key={i} className='text-sm'>
                    {tel.tel1}
                  </p>
                ))}
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 shrink-0' />
                {footer?.email?.map((mail, i) => (
                  <p key={i} className='text-sm'>
                    {mail.email1}
                  </p>
                ))}
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 shrink-0' />
                {footer?.officeHours?.map((days, i) => (
                  <p key={i} className='text-sm'>
                    {days.days} : {days.time}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <h4 className='text-lg font-medium mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              {[
                { name: "About Us", href: "/about-us" },
                { name: "Courses", href: "/courses" },
                { name: "Requirements", href: "/requirements" },
                { name: "Research", href: "/research" },
                { name: "News", href: "/news" },
                { name: "Alumni", href: "/alumni" },
                { name: "Staff", href: "/staff" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm hover:text-[#FEDA37]'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className='text-lg font-medium mb-4'>Programs</h4>
            <ul className='space-y-2'>
              {[
                { name: "PGD", href: "/courses" },
                { name: "Masters", href: "/courses" },
                { name: "PhD", href: "/courses" },

                { name: "SEE ALL PROGRAMS", href: "/courses" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm hover:text-[#FEDA37] ${link.name === "SEE ALL PROGRAMS" ? "text-[#FEDA37] font-medium" : ""}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='col-span-2 md:col-span-1'>
            <h4 className='text-lg font-medium mb-4'>Stay Connected</h4>
            <div className='flex gap-4 mb-6'>
              {[
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className=' rounded-full overflow-hidden p-2 hover:bg-[#FEDA37]/10 hover:text-[#FEDA37] transition-all duration-300 ease-in'
                  aria-label={`Follow us on ${social.icon.name}`}>
                  <social.icon className='w-5 h-5' />
                </Link>
              ))}
            </div>

            <div className='space-y-4'>
              <p className='text-sm'>Subscribe to our newsletter</p>
              <form onSubmit={handleEmail} className='flex gap-2'>
                <Input
                  type='email'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='rounded-full'
                />
                <Button type='submit' size='sm' className='rounded-full px-6'>
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className='border-t border-gray-700 py-6'>
        <div className='container px-4 sm:px-6 lg:px-8 text-center md:text-left'>
          <p className='text-sm text-gray-400'>
            © {new Date().getFullYear()} Godfrey Okoye University Postgraduate
            School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
