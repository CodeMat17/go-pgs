"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Minus } from "lucide-react";
import AdditionalFees from "./AdditionalFees";
import PhdFeesContainer from "./PhdFeesContainer";

export default function FeeStructure() {
  const pgdFees = useQuery(api.fees.getPgdFees);
  const mastersFees = useQuery(api.fees.getMastersFees);

  return (
    <div className='relative w-full bg-purple-50 dark:bg-slate-950 py-8 flex flex-col xl:flex-row max-w-7xl mx-auto lg:gap-6'>
      <div className='px-4 '>
        <div className=' xl:max-w-[950px]'>
          <h1 className='text-2xl font-bold mb-8'>Fee Structure</h1>

          <div className='space-y-8'>
            <div>
              <h2 className='text-xl font-semibold mb-6 text-blue-600'>
                Postgraduate Diploma (PGD)
              </h2>

              {pgdFees === undefined ? (
                <div className='flex items-center py-4'>
                  <Minus className='animate-spin mr-3' />
                  Loading PGD fees structure...
                </div>
              ) : pgdFees.length === 0 ? (
                <div className='text-sm text-muted-foreground italic pl-2 border-l-4 ml-4 py-1 border-amber-600'>
                  No PGD fee structure available at the moment.
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-2 pb-8'>
                  {pgdFees?.map((fee) => (
                    <div
                      key={fee._id}
                      className='bg-white dark:bg-gray-900 rounded-xl p-5 space-y-3 shadow-md'>
                      <h1 className='text-lg font-medium'>
                        {fee.title}: {fee.amount}{" "}
                        {fee.description && (
                          <span className='text-muted-foreground text-sm'>
                            ({fee.description})
                          </span>
                        )}
                      </h1>
                      <div className='flex flex-col gap-1 font-medium text-sm'>
                        {fee.details.map((detail, index) => (
                          <div
                            key={`${fee._id}-${index}`}
                            className='font-medium bg-blue-500/10 dark:bg-gray-800 px-4 py-3 rounded-xl'>
                            <p>
                              Bank:{" "}
                              <span className='text-muted-foreground'>
                                {detail.bank}
                              </span>
                            </p>
                            {/* &bull; */}
                            <p>
                              Account No:{" "}
                              <span className='text-muted-foreground'>
                                {detail.accountNumber}
                              </span>
                              <p>
                                Account Name:{" "}
                                <span className='text-muted-foreground'>
                                  {detail.accountName}
                                </span>
                              </p>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-6 text-blue-600'>
                Master&apos;s
              </h2>

              {mastersFees === undefined ? (
                <div className='flex items-center py-4'>
                  <Minus className='animate-spin mr-3' />
                  Loading Master&apos;s fees structure...
                </div>
              ) : mastersFees.length === 0 ? (
                <div className='text-sm text-muted-foreground italic pl-2 border-l-4 ml-4 py-1 border-amber-600'>
                  No Master&apos;s fee structure available at the moment.
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8'>
                  {mastersFees?.map((fee) => (
                    <div
                      key={fee._id}
                      className='bg-white dark:bg-gray-900 rounded-xl p-5 space-y-3 shadow-md'>
                      <h1 className='text-lg font-medium'>
                        {fee.title}: {fee.amount}{" "}
                        {fee.description && (
                          <span className='text-muted-foreground text-sm'>
                            ({fee.description})
                          </span>
                        )}
                      </h1>
                      <div className='flex flex-col gap-1 font-medium text-sm'>
                        {fee.details.map((detail, index) => (
                          <div
                            key={`${fee._id}-${index}`}
                            className='font-medium bg-blue-500/10 dark:bg-gray-800 px-4 py-3 rounded-xl'>
                            <p>
                              Bank:{" "}
                              <span className='text-muted-foreground'>
                                {detail.bank}
                              </span>
                            </p>
                            {/* &bull; */}
                            <p>
                              Account No:{" "}
                              <span className='text-muted-foreground'>
                                {detail.accountNumber}
                              </span>
                            </p>
                            <p>
                              Account Name:{" "}
                              <span className='text-muted-foreground'>
                                {detail.accountName}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <PhdFeesContainer />
          </div>
        </div>
        <div className='xl:hidden w-full lg:max-w-[600px] mx-auto'>
          <AdditionalFees />
        </div>
        <div className='hidden xl:block fixed right-6 top-4 w-[300px]'>
          <AdditionalFees />
        </div>
      </div>
    </div>
  );
}
