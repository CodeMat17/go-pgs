// app/contact/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
// import UniversityMap from "@/components/UniversityMap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Minus, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

// Create type from schema
type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const info = useQuery(api.contactUs.getContactInfo);

  // Use typed form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Submit handler
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-4xl font-bold mb-8 text-center'>Contact Us</h1>

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Contact Information */}
          <div className='space-y-6'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}>
              <Card className='p-6'>
                <h2 className='text-2xl font-semibold mb-4'>Get in Touch</h2>
                {!info ? (
                  <div className='flex items-center text-muted-foreground py-12'>
                    <Minus
                      className='animate-spin mr-3
                  '
                    />
                    Contact info loading...
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div className='flex items-start gap-4'>
                      <MapPin className='w-6 h-6 text-primary mt-1' />
                      <div>
                        <h3 className='font-medium'>Address</h3>
                        <p className='text-muted-foreground'>{info.address}</p>
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <Phone className='w-6 h-6 text-primary mt-1' />
                      <div>
                        <h3 className='font-medium'>Phone</h3>
                        {info.phone?.map((tel, i) => (
                          <div key={i} className='text-muted-foreground'>
                            <p>{tel.tel1}</p>
                            <p>{tel.tel2}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <Mail className='w-6 h-6 text-primary mt-1' />
                      <div>
                        <h3 className='font-medium'>Email</h3>
                        {info.email?.map((mail, i) => (
                          <div key={i} className='text-muted-foreground'>
                            <p>{mail.email1}</p>
                            <p>{mail.email2}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <Clock className='w-6 h-6 text-primary mt-1' />
                      <div>
                        <h3 className='font-medium'>Office Hours</h3>
                        {info.officeHours?.map((office, i) => (
                          <div key={i} className='text-muted-foreground'>
                            <p>
                              {office.days} : {office.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}>
              <Card className='p-6'>
                <h2 className='text-2xl font-semibold mb-4'>Key Departments</h2>
                {!info ? (
                  <div className='flex items-center text-muted-foreground py-12'>
                    <Minus
                      className='animate-spin mr-3
                  '
                    />
                    Key departments info loading...
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div className='border-l-4 border-primary pl-4'>
                      <h3 className='font-medium'>Admissions</h3>
                      {info.admissionOffice?.map((adm, i) => (
                        <div key={i}>
                          <p className='text-sm text-muted-foreground'>
                            {adm.email}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {adm.tel}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className='border-l-4 border-primary pl-4'>
                      <h3 className='font-medium'>Student Support</h3>
                      {info.studentSupport?.map((stu, i) => (
                        <div key={i}>
                          <p className='text-sm text-muted-foreground'>
                            {stu.email}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {stu.tel}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className='border-l-4 border-primary pl-4'>
                      <h3 className='font-medium'>Research Office</h3>
                      {info.researchOffice?.map((res, i) => (
                        <div key={i}>
                          <p className='text-sm text-muted-foreground'>
                            {res.email}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {res.tel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.6 }}>
            <Card className='p-6 h-full'>
              <h2 className='text-2xl font-semibold mb-6'>Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Full Name
                    </label>
                    <Input {...register("name")} className='w-full' />
                    {errors.name?.message && (
                      <span className='text-red-500 text-sm'>
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Email
                    </label>
                    <Input {...register("email")} className='w-full' />
                    {errors.email?.message && (
                      <span className='text-red-500 text-sm'>
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Subject
                    </label>
                    <Input {...register("subject")} className='w-full' />
                    {errors.subject?.message && (
                      <span className='text-red-500 text-sm'>
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Message
                    </label>
                    <Textarea
                      {...register("message")}
                      className='w-full min-h-[150px]'
                    />
                    {errors.message?.message && (
                      <span className='text-red-500 text-sm'>
                        {errors.message.message}
                      </span>
                    )}
                  </div>
                </div>

                <Button type='submit' className='w-full'>
                  <Send className='w-4 h-4 mr-2' />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* <UniversityMap /> */}

        {/* Map Section */}
      </motion.div>
    </div>
  );
}
