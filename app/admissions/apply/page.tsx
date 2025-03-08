// app/admissions/apply/page.tsx
"use client";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card } from "@/components/ui/card";


interface FormData {
  programId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  documents: FileList;
  agreeTerms: boolean;
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<FormData>();


  const steps = [
    { title: "Program Selection" },
    { title: "Personal Information" },
    { title: "Document Upload" },
    { title: "Review & Submit" },
  ];

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <h2 className='text-center mb-6 text-4xl'>Apply Now</h2>

      <Card className='p-6'>
        <Stepper currentStep={currentStep} steps={steps} />

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
          {currentStep === 0 && (
            <div className='space-y-4'>
              <h2 className='text-2xl font-semibold'>Select Your Program</h2>
              {/* Program selection components */}
            </div>
          )}

          {currentStep === 1 && (
            <div className='space-y-4'>
              <h2 className='text-2xl font-semibold'>Personal Information</h2>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label>Full Name</label>
                  <input {...register("fullName", { required: true })} />
                  {errors.fullName && <span>Required</span>}
                </div>
                {/* More form fields */}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className='space-y-4'>
              <h2 className='text-2xl font-semibold'>Document Upload</h2>
              {/* File upload components */}
            </div>
          )}

          {currentStep === 3 && (
            <div className='space-y-4'>
              <h2 className='text-2xl font-semibold'>Review Application</h2>
              {/* Application review components */}
            </div>
          )}

          <div className='flex justify-between'>
            {currentStep > 0 && (
              <Button
                type='button'
                onClick={() => setCurrentStep((p) => p - 1)}>
                Previous
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                type='button'
                onClick={() => setCurrentStep((p) => p + 1)}>
                Next
              </Button>
            ) : (
              <Button type='submit'>Submit Application</Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
