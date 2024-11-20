import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactHtmlParser from "react-html-parser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Barlow, Spline_Sans } from "next/font/google";
import {
  MapPin,
  Briefcase,
  DollarSign,
  CreditCard,
  Calendar,
  Globe,
  HandCoins,
} from "lucide-react";
import { HiOutlineBriefcase, HiOutlineNewspaper } from "react-icons/hi2";
import { JobData, JobListing } from "@/lib/types";
import { formatCurrency, formatSalaryCurrency } from "@/lib/utils";

const barlow = Barlow({ subsets: ["latin"], weight: "500" });

function JobModal({ job }: { job: JobData }) {
  // Helper function to get job type
  const getJobType = () => {
    if (job.fullTime) return "Full-time";
    if (job.partTime) return "Part-time";
    if (job.freelance) return "Freelance";
    if (job.internship) return "Internship";
    return "Not specified";
  };

  // Helper function to get salary range
  const getSalaryRange = () => {
    if (job.minSalary && job.maxSalary && job.salaryCurrency) {
      return `${formatSalaryCurrency(
        Number(job.minSalary),
        job.salaryCurrency
      )} 
         - ${formatSalaryCurrency(Number(job.maxSalary), job.salaryCurrency)}`;
    }
    return "Not specified";
  };

  return (
    <DialogContent className="lg:max-w-5xl md:max-w-3xl h-[85vh] w-full flex flex-col p-0 overflow-hidden bg-gradient-to-br from-background to-secondary/10">
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow">
          <div className="p-8">
            <DialogHeader>
              <div className="flex items-center mb-6">
                <Avatar className="h-20 w-20 mr-6 border-2 border-primary">
                  <AvatarImage src={job.companyLogo} alt={job.companyName} />
                  <AvatarFallback>{job.companyName?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2
                    className={`text-2xl font-bold tracking-wide text-foreground`}
                  >
                    {job.companyName}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="mt-2 rounded-md text-sm font-semibold px-3 py-1"
                  >
                    {job.role}
                  </Badge>
                </div>
              </div>
              <DialogTitle
                className={`text-3xl flex items-center gap-3 font-bold mb-4`}
              >
                <HiOutlineBriefcase className="text-primary" />
                {job.jobTitle}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-2 mt-6">
              {job.keywords?.split(",").map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm rounded-full px-3 py-1 bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30"
                >
                  {keyword.trim()}
                </Badge>
              ))}
            </div>

            <div className="mt-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  <span className="font-medium">
                    {job.jobLocation === "remote"
                      ? job.remoteOption
                      : job.locationDetails}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-primary" />
                  <span className="font-medium">{getJobType()}</span>
                </div>
                <div className="flex items-center">
                  <HandCoins className="w-6 h-6 mr-3 text-primary" />
                  <span className="font-medium">{getSalaryRange()}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-primary" />
                  <span className="font-medium">{job.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <h3 className={`text-xl flex items-center`}>
                <HiOutlineNewspaper className="w-8 h-8 mr-3 text-primary" />
                Job Description
              </h3>
              <div className="whitespace-pre-wrap text-muted-foreground text-lg leading-relaxed">
                {ReactHtmlParser(job.jobDescription as string)}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 border-t flex justify-end bg-background/80 backdrop-blur-sm">
          <Button asChild className="w-full md:w-auto">
            <a
              target="_blank"
              href={
                job.applyMethod === "website"
                  ? job.applyWebsite || "#"
                  : `mailto:${job.applyEmail}`
              }
            >
              Apply Now
            </a>
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}

export default JobModal;
