"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, MapPin, Minus, Phone } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function ContactDetails() {
  const info = useQuery(api.contactUs.getContactInfo);
  const shouldReduceMotion = useReducedMotion();

  // Memoize contact info to prevent unnecessary re-renders
  const contactInfo = useMemo(() => info, [info]);

  // Add structured data for SEO
 useEffect(() => {
   if (contactInfo) {
     const schemaData = {
       "@context": "https://schema.org",
       "@type": "EducationalOrganization",
       name: "Godfrey Okoye University",
       address: contactInfo.address,
       email: contactInfo.email?.[0]?.email1,
       telephone: contactInfo.phone?.[0]?.tel1,
       openingHours: contactInfo.officeHours?.map(
         (oh) => `${oh.days} ${oh.time}`
       ),
     };
     const script = document.createElement("script");
     script.type = "application/ld+json";
     script.text = JSON.stringify(schemaData);
     document.head.appendChild(script);

     // Return cleanup function that doesn't return a value
     return () => {
       document.head.removeChild(script);
     };
   }
 }, [contactInfo]);

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.h1
          initial={shouldReduceMotion ? false : { y: 20 }}
          animate={{ y: 0 }}
          className='text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center'>
          Get in Touch
        </motion.h1>

        <div className='max-w-3xl mx-auto space-y-8'>
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className='relative'>
            <div
              className='absolute inset-0 bg-primary/5 rounded-2xl shadow-xl transform rotate-1'
              aria-hidden='true'
            />
            <Card className='relative p-6 sm:p-8 space-y-6 sm:space-y-8 bg-background/95 backdrop-blur-sm border border-primary/10'>
              {!contactInfo ? (
                <div
                  className='flex items-center justify-center text-muted-foreground py-12'
                  aria-live='polite'>
                  <Minus className='animate-spin mr-3' aria-hidden='true' />
                  <span>Loading contact information...</span>
                </div>
              ) : (
                <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
                  {/* Contact Details */}
                  <address className='space-y-6 not-italic'>
                    <motion.div
                      initial={shouldReduceMotion ? false : { x: -20 }}
                      animate={{ x: 0 }}
                      className='space-y-4'>
                      <div className='flex items-start gap-4 group'>
                        <div
                          className='p-2.5 bg-[#D4AF37] text-gray-900 dark:text-[#FFDC55] dark:bg-[#FFDC55]/20 rounded-lg'
                          aria-hidden='true'>
                          <MapPin className='w-5 h-5' />
                        </div>
                        <div>
                          <h2 className='font-semibold text-lg mb-2'>
                            Address
                          </h2>
                          <p className='text-muted-foreground leading-relaxed'>
                            {contactInfo.address}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-4 group'>
                        <div
                          className='p-2.5 bg-[#D4AF37] text-gray-900 dark:text-[#FFDC55] dark:bg-[#FFDC55]/20 rounded-lg'
                          aria-hidden='true'>
                          <Phone className='w-5 h-5' />
                        </div>
                        <div>
                          <h2 className='font-semibold text-lg mb-2'>Phone</h2>
                          {contactInfo.phone?.map((tel, i) => (
                            <div
                              key={i}
                              className='text-muted-foreground space-y-1'>
                              <p>
                                <a
                                  href={`tel:${tel.tel1}`}
                                  className='hover:text-primary transition-colors'
                                  aria-label={`Call ${tel.tel1}`}>
                                  {tel.tel1}
                                </a>
                              </p>
                              <p>
                                <a
                                  href={`tel:${tel.tel2}`}
                                  className='hover:text-primary transition-colors'
                                  aria-label={`Call ${tel.tel2}`}>
                                  {tel.tel2}
                                </a>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </address>

                  {/* Second Column */}
                  <div className='space-y-6'>
                    <motion.div
                      initial={shouldReduceMotion ? false : { x: 20 }}
                      animate={{ x: 0 }}
                      className='space-y-4'>
                      <div className='flex items-start gap-4 group'>
                        <div
                          className='p-2.5 bg-[#D4AF37] text-gray-900 dark:text-[#FFDC55] dark:bg-[#FFDC55]/20 rounded-lg'
                          aria-hidden='true'>
                          <Mail className='w-5 h-5' />
                        </div>
                        <div>
                          <h2 className='font-semibold text-lg mb-2'>Email</h2>
                          {contactInfo.email?.map((mail, i) => (
                            <div
                              key={i}
                              className='text-muted-foreground space-y-1'>
                              <p>
                                <a
                                  href={`mailto:${mail.email1}`}
                                  className='hover:text-primary transition-colors'
                                  aria-label={`Email ${mail.email1}`}>
                                  {mail.email1}
                                </a>
                              </p>
                              <p>
                                <a
                                  href={`mailto:${mail.email2}`}
                                  className='hover:text-primary transition-colors'
                                  aria-label={`Email ${mail.email2}`}>
                                  {mail.email2}
                                </a>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='flex items-start gap-4 group'>
                        <div
                          className='p-2.5 bg-[#D4AF37] text-gray-900 dark:text-[#FFDC55] dark:bg-[#FFDC55]/20 rounded-lg'
                          aria-hidden='true'>
                          <Clock className='w-5 h-5' />
                        </div>
                        <div>
                          <h2 className='font-semibold text-lg mb-2'>
                            Office Hours
                          </h2>
                          {contactInfo.officeHours?.map((office, i) => (
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
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='text-center space-y-4'>
            <p className='text-muted-foreground text-lg'>
              Prefer instant communication? Reach out directly via email or
              phone!
            </p>
            <div className='flex flex-wrap justify-center gap-3 sm:gap-4'>
              {contactInfo?.email?.map((mail, i) => (
                <Button key={i} variant='outline' className='gap-2' asChild>
                  <a
                    href={`mailto:${mail.email1}`}
                    aria-label={`Send email to ${mail.email1}`}>
                    <Mail className='w-4 h-4' />
                    Send Email
                  </a>
                </Button>
              ))}

              {contactInfo?.phone?.map((tel, i) => (
                <Button key={i} className='gap-2' asChild>
                  <a href={`tel:${tel.tel1}`} aria-label={`Call ${tel.tel1}`}>
                    <Phone className='w-4 h-4' />
                    Call Now
                  </a>
                </Button>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
