import binanceLogo from "@/public/companies/binance.png";
import React from "react";
import CompanyCard from "@/components/CompanyCard";
import JobCard from "@/components/JobCard";
import Image from "next/image";
import {
  Briefcase,
  Info,
  Building2,
  MapPin,
  Clock,
  BellDotIcon,
  Bell,
  LucideBellDot,
  InfoIcon,
  PencilOffIcon,
} from "lucide-react";
import { Permanent_Marker, Spline_Sans, Barlow, Righteous } from "next/font/google";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

const righteous_font = Righteous({
  subsets: ["latin"],
  weight: "400",
});
const spline_font = Righteous({
  subsets: ["latin"],
  weight: "400",
});
const barlow_font = Barlow({ subsets: ["latin"], weight: "600" });


type Params = {
  companyId: string;
};

type Job = {
  id: number;
  title: string;
  company: string;
  logo: string;
  tags: string[];
  daysAgo: number;
  location: string;
  category: string;
  type: string;
  featured: boolean;
  locationType: string;
  compensationRange: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Blockchain Developer",
    company: "Binance Ltd",
    logo: binanceLogo.src,
    tags: ["Solidity", "Ethereum", "Smart Contracts"],
    daysAgo: 2,
    location: "Europe",
    category: "Engineering",
    type: "Full-Time",
    featured: true,
    locationType: "Remote",
    compensationRange: "50k - 100k",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "Binance Ltd",
    logo: binanceLogo.src,
    tags: ["React", "TypeScript", "Web3.js"],
    daysAgo: 5,
    location: "Europe",
    category: "Engineering",
    type: "Full-Time",
    featured: false,
    locationType: "Remote",
    compensationRange: "50k - 100k",
  },
];

export default function Page({ params }: { params: Params }) {
  const { companyId } = params;

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-36 mb-20">
      <div className="flex flex-col gap-8 sm:gap-16">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
          <Image
            src={"/companies/uniswap.png"}
            width={150}
            height={150}
            className="object-cover rounded-full border w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64"
            alt="uniswap logo"
          />

          <h1
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold ${spline_font.className} text-center sm:text-left`}
          >
            Uniswap
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <h1
            className={`text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2 ${righteous_font.className}`}
          >
    
            About Uniswap
          </h1>

          <p
            className="text-muted-foreground text-sm sm:text-base"
            id="companyJobs"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            in unde modi sapiente, adipisci enim numquam nihil accusantium
            repudiandae? Unde saepe obcaecati fugit natus aspernatur officia
            accusantium, voluptatum ex ad. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Impedit culpa, quo voluptatibus ea
            animi recusandae illum? Aperiam quaerat labore eveniet fugit, culpa,
            officiis ipsum minus aspernatur reiciendis, tenetur consectetur
            praesentium.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1
            className={`text-2xl sm:text-3xl font-bold text-primary tracking-wide flex items-center gap-2 ${righteous_font.className}`}
          >
            <LucideBellDot size={24} />
            Active jobs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-2">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1
            className={`text-2xl sm:text-3xl font-bold text-primary tracking-wide flex items-center gap-2 ${righteous_font.className}`}
          >
            <Building2 size={24} />
            Similar Companies
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, id) => (
              <CompanyCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
