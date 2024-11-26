import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, BriefcaseIcon, MapPinIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch";
import binanceLogo from "@/public/companies/binance.png";
import uniswapLogo from "@/public/companies/uniswap.png";
import JobCard from "./JobCard";
import { Card, CardContent, CardHeader } from "./ui/card";
import { HiOutlinePencil } from "react-icons/hi2";
import { getJobListings } from "@/lib/actions";

async function JobsSection() {
  const jobs = (await getJobListings()) || [];
  // console.log(jobs);

  return (
    <div
      className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
      id="availableJobs"
    >
      <Card className="w-full shadow-lg rounded-xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="relative md:col-span-3">
            <Input 
              type="text" 
              placeholder="Search jobs..." 
              className="pl-10 pr-4 py-6 w-full border-2 rounded-full border-primary/50 focus:border-primary focus:ring-primary transition-colors duration-200"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
          </div>

          <div className="relative">
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 py-6">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Job category</SelectLabel>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
          </div>

          <div className="relative">
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 py-6">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </CardContent>
    </Card>
      <div className="max-w-4xl mx-auto mt-6">
        <div className="flex gap-2 items-center mb-6 justify-end">
          <Label htmlFor="remote-check">Remote Only</Label>
          <Switch id="remote-check" />
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobsSection;
