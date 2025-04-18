"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Minus, Phone } from "lucide-react";

export default function ContactDetails() {
  const info = useQuery(api.contactUs.getContactInfo);

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className='text-4xl font-bold mb-12 text-center'>
          Get in Touch
        </motion.h1>

        <div className='max-w-3xl mx-auto space-y-8'>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className='relative'>
            <div className='absolute inset-0 bg-primary/5 rounded-2xl shadow-xl transform rotate-1' />
            <Card className='relative p-8 space-y-8 bg-background/95 backdrop-blur-sm border border-primary/10'>
              {!info ? (
                <div className='flex items-center justify-center text-muted-foreground py-12'>
                  <Minus className='animate-spin mr-3' />
                  Loading contact information...
                </div>
              ) : (
                <div className='grid md:grid-cols-2 gap-8'>
                  {/* Contact Details */}
                  <div className='space-y-8'>
                    <motion.div
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      className='space-y-6'>
                      <div className='flex items-start gap-4 group'>
                        <div className='p-3 bg-[#FEDA37] dark:text-[#FEDA37] dark:bg-[#FEDA37]/20  rounded-lg'>
                          <MapPin className='w-6 h-6' />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg mb-2'>
                            Address
                          </h3>
                          <p className='text-muted-foreground leading-relaxed'>
                            {info.address}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4 group'>
                        <div className='p-3  bg-[#FEDA37] dark:text-[#FEDA37] dark:bg-[#FEDA37]/20 rounded-lg'>
                          <Phone className='w-6 h-6 ' />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg mb-2'>Phone</h3>
                          {info.phone?.map((tel, i) => (
                            <div
                              key={i}
                              className='text-muted-foreground space-y-1'>
                              <p className='hover:text-primary transition-colors'>
                                <a href={`tel:${tel.tel1}`}>{tel.tel1}</a>
                              </p>
                              <p className='hover:text-primary transition-colors'>
                                <a href={`tel:${tel.tel2}`}>{tel.tel2}</a>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Second Column */}
                  <div className='space-y-8'>
                    <motion.div
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      className='space-y-6'>
                      <div className='flex items-start gap-4 group'>
                        <div className='p-3  bg-[#FEDA37] dark:text-[#FEDA37] dark:bg-[#FEDA37]/20 rounded-lg'>
                          <Mail className='w-6 h-6' />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg mb-2'>Email</h3>
                          {info.email?.map((mail, i) => (
                            <div
                              key={i}
                              className='text-muted-foreground space-y-1'>
                              <p className='hover:text-primary transition-colors'>
                                <a href={`mailto:${mail.email1}`}>
                                  {mail.email1}
                                </a>
                              </p>
                              <p className='hover:text-primary transition-colors'>
                                <a href={`mailto:${mail.email2}`}>
                                  {mail.email2}
                                </a>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='flex items-start gap-4 group'>
                        <div className='p-3  bg-[#FEDA37] dark:text-[#FEDA37]  dark:bg-[#FEDA37]/20 rounded-lg'>
                          <Clock className='w-6 h-6 ' />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg mb-2'>
                            Office Hours
                          </h3>
                          {info.officeHours?.map((office, i) => (
                            <div key={i} className='text-muted-foreground'>
                              <p className='font-medium'>{office.days}</p>
                              <p>{office.time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='text-center space-y-4'>
            <p className='text-muted-foreground text-lg'>
              Prefer instant communication? Reach out directly via email or
              phone!
            </p>
            <div className='flex justify-center gap-4'>
              {info?.email?.map((mail, i) => (
                <Button key={i} variant='outline' className='gap-2' asChild>
                  <a href={`mailto:${mail.email1}`}>
                    <Mail className='w-4 h-4' />
                    Send Email
                  </a>
                </Button>
              ))}

              {info?.phone?.map((tel, i) => (
                <Button key={i} className='gap-2' asChild>
                  <a href={`tel:${tel.tel1}`}>
                    <Phone className='w-4 h-4' />
                    Call Now
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
