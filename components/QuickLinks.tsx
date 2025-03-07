// components/QuickLinks.tsx
"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Microscope, GraduationCap, Users } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam"; // Ensure you have this component

export function QuickLinks() {
  const items = [
    {
      title: "Research Excellence",
      href: "/research",
      description: "Explore cutting-edge research opportunities",
      icon: <Microscope className='w-8 h-8 md:w-10 md:h-10' />,
    },
    {
      title: "Student Resources",
      href: "/resources",
      description: "Access academic tools and support",
      icon: <GraduationCap className='w-8 h-8 md:w-10 md:h-10' />,
    },
    {
      title: "Alumni Network",
      href: "/alumni",
      description: "Connect with successful graduates",
      icon: <Users className='w-8 h-8 md:w-10 md:h-10' />,
    },
  ];

  return (
    <section className='pb-8 bg-muted w-full max-w-6xl mx-auto'>
      <h2 className='text-center mb-6 text-4xl'>Quick Links</h2>
      <div className='px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-3 lg:gap-6 xl:gap-8'>
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}>
            <Card className='relative h-full w-full overflow-hidden group hover:shadow-xl transition-shadow'>
              <BorderBeam
                duration={6}
                size={150}
                delay={index * 0.5}
                className='opacity-0 group-hover:opacity-100 transition-opacity'
              />

              <CardContent className='p-6'>
                <div className='flex flex-col h-full'>
                  {/* Icon Container */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className='mb-4 inline-block p-3 text-[#FEDA37] bg-[#FEDA37]/20 rounded-lg w-fit'>
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <CardTitle className='text-xl font-semibold mb-3'>
                    {item.title}
                  </CardTitle>
                  <CardDescription className='mb-4'>
                    {item.description}
                  </CardDescription>

                  <CardFooter className='p-0 mt-auto'>
                    <Button
                      variant='link'
                      className='p-0 hover:text-primary justify-start'
                      asChild>
                      <Link
                        href={item.href}
                        className='flex items-center gap-2'>
                        Learn More
                        <span className='ml-1'>→</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
