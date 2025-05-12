import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Minus } from "lucide-react";

const PhdFeesContainer = () => {
  const genFees = useQuery(api.fees.getPhdGeneralFees);
  const natSciFees = useQuery(api.fees.getPhdNatSciFees);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6 text-blue-600'>PhD</h2>

      {genFees === undefined ? (
        <div className='flex items-center py-4'>
          <Minus className='animate-spin mr-3' />
          Loading PhD fees structure...
        </div>
      ) : genFees.length === 0 ? (
        <div className='text-sm text-muted-foreground italic pl-2 border-l-4 ml-4 py-1 border-amber-600'>
          No PhD fee structure available at the moment.
        </div>
      ) : (
        <div className='pb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
            {genFees?.map((fee) => (
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
          {natSciFees === undefined ? (
            ""
          ) : (
            <div className='bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md'>
              <h1 className='text-muted-foreground font-semibold mb-4'>
                Faculty of Natural Sciences & Environmental Studies (PhD)
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {natSciFees.map((fee) => (
                  <div key={fee._id} className=''>
                    <div className='flex items-center justify-between text-sm'>
                      <h1 className='text-lg font-medium'>
                        {fee.title}: {fee.amount}
                        {fee.description && (
                          <span className='text-muted-foreground text-sm ml-2'>
                            ({fee.description})
                          </span>
                        )}
                      </h1>
                    </div>

                    <div className='flex flex-col gap-1 font-medium text-sm'>
                      {fee.details.map((detail, index) => (
                        <div
                          key={`${fee._id}-${index}`}
                          className='font-medium rounded-xl bg-blue-500/10 dark:bg-gray-800 p-4 mt-3'>
                          <p>
                            Bank:{" "}
                            <span className='text-muted-foreground'>
                              {detail.bank}
                            </span>
                          </p>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhdFeesContainer;
