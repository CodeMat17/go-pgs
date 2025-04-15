"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Award,
  Globe,
  Briefcase,
  FlaskConical,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ResearchPage() {
  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <section className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Research at Godfrey Okoye University
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Advancing knowledge through innovative research and collaboration.
            Join us in solving global challenges and shaping the future.
          </p>
        </section>

        {/* Research Highlights */}
        <section className='mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
            Research Highlights
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                icon: <FlaskConical className='w-8 h-8 text-primary' />,
                title: "Cutting-Edge Facilities",
                description:
                  "State-of-the-art laboratories and research centers equipped with advanced technology.",
              },
              {
                icon: <Award className='w-8 h-8 text-primary' />,
                title: "Global Recognition",
                description:
                  "Our research is published in top-tier journals and recognized internationally.",
              },
              {
                icon: <Users className='w-8 h-8 text-primary' />,
                title: "Collaborative Environment",
                description:
                  "Work with leading researchers and industry partners from around the world.",
              },
              {
                icon: <BookOpen className='w-8 h-8 text-primary' />,
                title: "Interdisciplinary Research",
                description:
                  "Collaborate across disciplines to tackle complex global challenges.",
              },
              {
                icon: <Globe className='w-8 h-8 text-primary' />,
                title: "Global Impact",
                description:
                  "Our research addresses critical issues in health, environment, and technology.",
              },
              {
                icon: <Briefcase className='w-8 h-8 text-primary' />,
                title: "Industry Partnerships",
                description:
                  "Strong ties with industry leaders to translate research into real-world solutions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}>
                <Card className='p-6 h-full'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='mb-4'>{item.icon}</div>
                    <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                    <p className='text-muted-foreground'>{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Areas */}
        <section className='mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
            Our Research Areas
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-3'>
            {[
              "Biotechnology & Genetic Engineering",
              "Environmental Sustainability",
              "Artificial Intelligence & Data Science",
              "Public Health & Epidemiology",
              "Renewable Energy Systems",
              "Social Sciences & Policy Research",
              "Nanotechnology & Materials Science",
              "Education & Learning Technologies",
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}>
                <Card className='p-6 hover:shadow-lg transition-shadow'>
                  <h3 className='text-lg font-semibold'>{area}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Facilities */}
        <section className='mb-16'>
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
            Research Facilities
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
            {[
              {
                name: "Advanced Biotech Lab",
                description:
                  "Equipped with PCR machines, spectrophotometers, and cell culture facilities.",
              },
              {
                name: "Data Science Center",
                description:
                  "High-performance computing resources for AI and big data research.",
              },
              {
                name: "Environmental Research Lab",
                description:
                  "Facilities for studying climate change, pollution, and renewable energy.",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}>
                <Card className='p-6'>
                  <h3 className='text-xl font-semibold mb-2'>
                    {facility.name}
                  </h3>
                  <p className='text-muted-foreground'>
                    {facility.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className='text-center'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-4'>
            Join Our Research Community
          </h2>
          <p className='text-lg text-muted-foreground mb-6'>
            Explore opportunities to collaborate, innovate, and make a global
            impact.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <a>Coming Soon</a>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <a href='/contact'>Contact Us</a>
            </Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
