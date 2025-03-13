// components/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import {Logo} from '@/components/Logo'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white border-t'>
      <div className='w-full border px-4 sm:px-6 lg:px-8 py-12'>
        <Logo text='' width={70} height={70} />

        <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-8 mt-5'>
          {/* University Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='col-span-2 md:col-span-1'>
            <h3 className='text-xl font-medium mb-4'>Godfrey Okoye University <span className='block'>Postgraduate School</span></h3>
            <div className='space-y-2 mt-2'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 shrink-0' />
                <p className='text-sm'>City Campus, Enugu State, Nigeria</p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 shrink-0' />
                <p className='text-sm'>+234 800 555 1234</p>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 shrink-0' />
                <p className='text-sm'>pg.admissions@gouni.edu.ng</p>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 shrink-0' />
                <p className='text-sm'>Mon-Fri: 8am - 5pm</p>
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
                { name: "Admissions", href: "/admissions" },
                { name: "Programs", href: "/programs" },
                { name: "Research", href: "/research" },
                { name: "Library", href: "/library" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm hover:text-primary transition-colors'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className='text-lg font-medium mb-4'>Programs</h4>
            <ul className='space-y-2'>
              {[
                { name: "Master's Degrees", href: "/programs/masters" },
                { name: "PhD Programs", href: "/programs/phd" },
                { name: "Certificates", href: "/programs/certificates" },
                { name: "Online Learning", href: "/online" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm hover:text-primary transition-colors'>
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
                  className='p-2 hover:bg-accent rounded-full transition-colors'
                  aria-label={`Follow us on ${social.icon.name}`}>
                  <social.icon className='w-5 h-5' />
                </Link>
              ))}
            </div>

            <div className='space-y-4'>
              <p className='text-sm'>Subscribe to our newsletter</p>
              <form className='flex gap-2'>
                <Input
                  type='email'
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
      <div className='border-t py-6'>
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
