// 'use client'

// import { notFound } from "next/navigation";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Linkedin,
//   Briefcase,
//   GraduationCap,
//   BookOpen,
//   ArrowLeft,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";
// import Link from "next/link";

// interface Alumni {
//   id: number;
//   name: string;
//   photo: string;
//   degree: string;
//   year: number;
//   currentPosition: string;
//   company: string;
//   testimonial: string;
//   linkedin?: string;
//   achievements: string[];
//   education: {
//     degree: string;
//     year: number;
//     university: string;
//   }[];
//   experience: {
//     position: string;
//     company: string;
//     duration: string;
//   }[];
// }

// const alumniData: Alumni[] = [
//   {
//     id: 1,
//     name: "Dr. Adaobi Nwankwo",
//     photo: "/alumni/adaobi.jpg",
//     degree: "PhD Computer Science",
//     year: 2018,
//     currentPosition: "Senior AI Researcher",
//     company: "Google DeepMind",
//     testimonial:
//       "The research facilities and mentorship at GO University paved the way for my career in AI...",
//     linkedin: "https://linkedin.com/adaobi",
//     achievements: [
//       "Published 15+ papers in top AI journals",
//       "2022 AI Innovation Award recipient",
//       "TEDx speaker on Ethical AI",
//     ],
//     education: [
//       {
//         degree: "PhD Computer Science",
//         year: 2018,
//         university: "Godfrey Okoye University",
//       },
//       {
//         degree: "MSc Artificial Intelligence",
//         year: 2012,
//         university: "University of Lagos",
//       },
//     ],
//     experience: [
//       {
//         position: "Senior AI Researcher",
//         company: "Google DeepMind",
//         duration: "2020-Present",
//       },
//       {
//         position: "AI Engineer",
//         company: "Microsoft Research Africa",
//         duration: "2018-2020",
//       },
//     ],
//   },
//   // Add more alumni
// ];

// export async function generateStaticParams() {
//   return alumniData.map((alumnus) => ({
//     id: alumnus.id.toString(),
//   }));
// }

// export default function AlumniDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const alumnus = alumniData.find((a) => a.id === Number(params.id));

//   if (!alumnus) {
//     notFound();
//   }

//   return (
//     <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}>
//         {/* Back Button */}
//         <Button variant='link' asChild className='mb-8 px-0'>
//           <Link href='/alumni'>
//             <ArrowLeft className='mr-2 h-4 w-4' />
//             Back to Alumni
//           </Link>
//         </Button>

//         {/* Main Card */}
//         <Card className='overflow-hidden'>
//           <div className='grid md:grid-cols-3 gap-8 p-8'>
//             {/* Profile Column */}
//             <div className='space-y-6'>
//               <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
//                 <Avatar className='w-32 h-32 mx-auto'>
//                   <AvatarImage src={alumnus.photo} />
//                   <AvatarFallback>{alumnus.name[0]}</AvatarFallback>
//                 </Avatar>
//               </motion.div>

//               <div className='text-center'>
//                 <h1 className='text-3xl font-bold'>{alumnus.name}</h1>
//                 <div className='flex justify-center gap-2 mt-2'>
//                   <Badge variant='secondary'>{alumnus.degree}</Badge>
//                   <Badge>{alumnus.year}</Badge>
//                 </div>
//               </div>

//               {alumnus.linkedin && (
//                 <Button className='w-full' asChild>
//                   <a href={alumnus.linkedin} target='_blank' rel='noopener'>
//                     <Linkedin className='mr-2 h-4 w-4' />
//                     LinkedIn Profile
//                   </a>
//                 </Button>
//               )}
//             </div>

//             {/* Main Content */}
//             <div className='md:col-span-2 space-y-8'>
//               {/* Current Position */}
//               <section>
//                 <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
//                   <Briefcase className='h-5 w-5 text-primary' />
//                   Current Position
//                 </h2>
//                 <div className='space-y-1'>
//                   <p className='text-lg font-medium'>
//                     {alumnus.currentPosition}
//                   </p>
//                   <p className='text-muted-foreground'>{alumnus.company}</p>
//                 </div>
//               </section>

//               {/* Career Journey */}
//               <section>
//                 <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
//                   <BookOpen className='h-5 w-5 text-primary' />
//                   Career Journey
//                 </h2>
//                 <p className='whitespace-pre-line leading-relaxed'>
//                   {alumnus.testimonial}
//                 </p>
//               </section>

//               {/* Key Achievements */}
//               <section>
//                 <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
//                   <span className='text-primary'>★</span>
//                   Key Achievements
//                 </h2>
//                 <ul className='space-y-2'>
//                   {alumnus.achievements.map((achievement, index) => (
//                     <li key={index} className='flex items-start gap-2'>
//                       <span className='text-primary'>▹</span>
//                       {achievement}
//                     </li>
//                   ))}
//                 </ul>
//               </section>

//               {/* Education */}
//               <section>
//                 <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
//                   <GraduationCap className='h-5 w-5 text-primary' />
//                   Education
//                 </h2>
//                 <div className='space-y-4'>
//                   {alumnus.education.map((edu, index) => (
//                     <div
//                       key={index}
//                       className='flex justify-between items-start p-4 bg-muted rounded-lg'>
//                       <div>
//                         <p className='font-medium'>{edu.degree}</p>
//                         <p className='text-muted-foreground'>
//                           {edu.university}
//                         </p>
//                       </div>
//                       <Badge variant='outline'>{edu.year}</Badge>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               {/* Experience */}
//               <section>
//                 <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
//                   <Briefcase className='h-5 w-5 text-primary' />
//                   Professional Experience
//                 </h2>
//                 <div className='space-y-4'>
//                   {alumnus.experience.map((exp, index) => (
//                     <div key={index} className='border-l-4 border-primary pl-4'>
//                       <p className='font-medium'>{exp.position}</p>
//                       <p className='text-muted-foreground'>{exp.company}</p>
//                       <p className='text-sm text-muted-foreground'>
//                         {exp.duration}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </div>
//         </Card>

//         {/* Related Alumni */}
//         <section className='mt-16'>
//           <h2 className='text-2xl font-semibold mb-8'>More Alumni Stories</h2>
//           <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
//             {alumniData
//               .filter((a) => a.id !== alumnus.id)
//               .slice(0, 3)
//               .map((alumnus, index) => (
//                 <Card
//                   key={alumnus.id + index}
//                   className='hover:shadow-lg transition-shadow'>
//                   <div className='p-6'>
//                     <div className='flex items-start gap-4'>
//                       <Avatar className='w-12 h-12'>
//                         <AvatarImage src={alumnus.photo} />
//                         <AvatarFallback>{alumnus.name[0]}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <h3 className='font-semibold'>{alumnus.name}</h3>
//                         <p className='text-sm text-muted-foreground'>
//                           {alumnus.currentPosition}
//                         </p>
//                         <p className='text-sm text-muted-foreground'>
//                           {alumnus.company}
//                         </p>
//                       </div>
//                     </div>
//                     <Button
//                       variant='link'
//                       size='sm'
//                       className='mt-4 p-0'
//                       asChild>
//                       <a href={`/alumni/${alumnus.id}`}>View Profile →</a>
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//           </div>
//         </section>
//       </motion.div>
//     </div>
//   );
// }
