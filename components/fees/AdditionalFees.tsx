"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

export default function AdditionalFees() {
  const paymentAccount = useQuery(api.fees.getExtraFeesAccount);
  const extraFees = useQuery(api.fees.getExtraFees);

  if (extraFees === undefined || paymentAccount === undefined) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='xl:mt-20 bg-blue-600 p-4 rounded-xl text-white '>
      <h2 className='text-xl font-semibold mb-2 uppercase'>Additional Fees</h2>

      {/* Fees List */}
      <div className=''>
        {extraFees.length === 0 ? (
          <div className='col-span-full text-center py-12'>
            <p className='text-muted-foreground'>No extra fees configured</p>
          </div>
        ) : (
          extraFees.map((fee) => (
            <div key={fee._id} className=''>
              <div></div>
              <div className='flex justify-between  xl:text-sm font-medium'>
                <p className=''>{fee.feeType}</p>

                <p>₦{fee.amount}</p>
              </div>

              {fee.carryoverNote && (
                <div className=''>
                  <div className='flex items-center justify-center gap-2 text-sm italic text-gray-200'>
                   
                    <span>{fee.carryoverNote}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Payment Account Section */}
      {paymentAccount && (
        <div className='bg-gray-800 rounded-lg p-3 mt-4'>
          {/* <h2 className='text-xl font-semibold mb-4'>
            Payment Account Details
          </h2> */}
          <div className='flex flex-col gap-2 font-medium'>
            <div>
              <p className='text-sm text-muted-foreground'>Bank Name</p>
              <p>{paymentAccount.bankName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Account Number</p>
              <p>{paymentAccount.accountNumber}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Account Name</p>
              <p>{paymentAccount.accountName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
