import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FeeStructure = {
  program: string;
  applicationFee: string;
  acceptanceFee: string;
  tuitionFee: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

const feeData: FeeStructure[] = [
  {
    program: "PGD",
    applicationFee: "₦10,000",
    acceptanceFee: "₦50,000",
    tuitionFee: "₦250,000",
    bank: "First Bank",
    accountNumber: "2034567890",
    accountName: "GOUNI PGD Account",
  },
  {
    program: "Masters",
    applicationFee: "₦15,000",
    acceptanceFee: "₦75,000",
    tuitionFee: "₦350,000",
    bank: "Zenith Bank",
    accountNumber: "1012345678",
    accountName: "GOUNI Masters Account",
  },
  {
    program: "PhD",
    applicationFee: "₦20,000",
    acceptanceFee: "₦100,000",
    tuitionFee: "₦500,000",
    bank: "Access Bank",
    accountNumber: "0712345678",
    accountName: "GOUNI PhD Account",
  },
];

export default function FeesPage() {
  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-16'>
      <h1 className='text-3xl font-bold text-center mb-12'>
        Fees Structure
      </h1>

      {/* Mobile View - Cards */}
      <div className='md:hidden space-y-4'>
        {feeData.map((program) => (
          <Card key={program.program} className='shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl'>{program.program}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p>
                <span className='font-semibold'>Application Fee:</span>{" "}
                {program.applicationFee}
              </p>
              <p>
                <span className='font-semibold'>Acceptance Fee:</span>{" "}
                {program.acceptanceFee}
              </p>
              <p>
                <span className='font-semibold'>Tuition Fee:</span>{" "}
                {program.tuitionFee}
              </p>
              <div className='pt-2 border-t'>
                <p className='font-semibold'>Payment Details:</p>
                <p>
                  <span className='font-medium'>Bank:</span> {program.bank}
                </p>
                <p>
                  <span className='font-medium'>Account Number:</span>{" "}
                  {program.accountNumber}
                </p>
                <p>
                  <span className='font-medium'>Account Name:</span>{" "}
                  {program.accountName}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className='hidden md:block'>
        <Table className='border shadow-sm rounded-xl overflow-hidden'>
          <TableCaption>
            GOUNI School of Postgraduate Studies Fee Structure
          </TableCaption>
          <TableHeader className='bg-gray-100 dark:bg-gray-700'>
            <TableRow>
              <TableHead className='py-4'>Program</TableHead>
              <TableHead className='py-4'>Application Fee</TableHead>
              <TableHead className='py-4'>Acceptance Fee</TableHead>
              <TableHead className='py-4'>Tuition Fee</TableHead>
              <TableHead className='py-4'>Bank</TableHead>
              <TableHead className='py-4'>Account Number</TableHead>
              <TableHead className='py-4'>Account Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeData.map((program) => (
              <TableRow key={program.program}>
                <TableCell className='font-medium py-4'>
                  {program.program}
                </TableCell>
                <TableCell className='py-4'>{program.applicationFee}</TableCell>
                <TableCell className='py-4'>{program.acceptanceFee}</TableCell>
                <TableCell className='py-4'>{program.tuitionFee}</TableCell>
                <TableCell className='py-4'>{program.bank}</TableCell>
                <TableCell className='py-4'>{program.accountNumber}</TableCell>
                <TableCell className='py-4'>{program.accountName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
