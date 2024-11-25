import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { HiOutlineBellAlert } from "react-icons/hi2";

type Props = {
  id: number;
};
const barlow_font = Barlow({ subsets: ["latin"], weight: "500" })

export default function CompanyCard({ id }: Props) {
  return (
    <Card className="shadow-sm dark:shadow-purple-950 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex gap-2 items-center mb-1">
          <Avatar>
            <AvatarImage src={"/companies/uniswap.png"} alt="accross" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <CardTitle className={`${barlow_font.className} tracking-wide`}>Uniswap</CardTitle>
        </div>
        <CardDescription>
          A cross-chain bridge for L2s and rollups secured by UMA&apos;s
          optimistic oracle
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <HiOutlineBellAlert className="w-4 h-4" />
        <p className="text-sm">2 active jobs</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/companies/${id}`}>Explore</Link>
        </Button>
        <Button asChild>
          <Link href={`/companies/${id}#companyJobs`}>See jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
