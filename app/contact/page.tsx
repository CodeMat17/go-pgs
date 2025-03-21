// app/contact/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import UniversityMap from "@/components/UniversityMap";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
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
                <div className='space-y-4'>
                  <div className='flex items-start gap-4'>
                    <MapPin className='w-6 h-6 text-primary mt-1' />
                    <div>
                      <h3 className='font-medium'>Main Campus</h3>
                      <p>City Campus, Enugu State, Nigeria</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <Phone className='w-6 h-6 text-primary mt-1' />
                    <div>
                      <h3 className='font-medium'>Phone</h3>
                      <p>+234 800 555 1234</p>
                      <p>Admissions: Ext. 123</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <Mail className='w-6 h-6 text-primary mt-1' />
                    <div>
                      <h3 className='font-medium'>Email</h3>
                      <p>pg.admissions@gouni.edu.ng</p>
                      <p>support@pg.gouni.edu.ng</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <Clock className='w-6 h-6 text-primary mt-1' />
                    <div>
                      <h3 className='font-medium'>Office Hours</h3>
                      <p>Mon-Fri: 8am - 5pm</p>
                      <p>Sat: 9am - 1pm</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}>
              <Card className='p-6'>
                <h2 className='text-2xl font-semibold mb-4'>Key Departments</h2>
                <div className='space-y-4'>
                  {[
                    {
                      name: "Admissions Office",
                      email: "admissions@pg.gouni.edu.ng",
                      phone: "+234 800 555 1234",
                    },
                    {
                      name: "Student Support",
                      email: "support@pg.gouni.edu.ng",
                      phone: "+234 800 555 1235",
                    },
                    {
                      name: "Research Office",
                      email: "research@pg.gouni.edu.ng",
                      phone: "+234 800 555 1236",
                    },
                  ].map((dept, index) => (
                    <div key={index} className='border-l-4 border-primary pl-4'>
                      <h3 className='font-medium'>{dept.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {dept.email}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {dept.phone}
                      </p>
                    </div>
                  ))}
                </div>
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
