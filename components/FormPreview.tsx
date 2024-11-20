import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyForm, JobForm, JobListing } from "@/lib/types";
import {
  Calendar,
  CreditCard,
  DollarSign,
  EuroIcon,
  MapPin,
} from "lucide-react";
import ReactHtmlParser from "react-html-parser";
import { HiOutlineBriefcase, HiOutlineNewspaper } from "react-icons/hi2";

type Props = {
  formData: JobListing;
  onBack: () => void;
  handleStep2: () => void;
};

function FormPreview({ formData, onBack, handleStep2 }: Props) {
  const {
    jobTitle,
    companyName,
    companyLogo,
    jobLocation,
    locationDetails,
    remoteOption,
    geographicRestrictions,
    timezoneRestrictions,
    partTime,
    fullTime,
    freelance,
    internship,
    minSalary,
    maxSalary,
    minEquity,
    maxEquity,
    salaryCurrency,
    paymentMethod,
    role,
    keywords,
    jobDescription,
  } = formData;

  const positionStatus = [partTime, fullTime, freelance, internship];
  const allPositions = ["Part Time", "Full Time", "Freelance", "Internship"];
  const selectedPositions = allPositions.filter((_, i) => positionStatus[i]);

  const getLocationDetails = () => {
    if (jobLocation === "onsite") {
      return `On site - ${locationDetails}`;
    } else if (jobLocation === "remote") {
      if (remoteOption === "global") {
        return "Remote - Global";
      } else if (remoteOption === "geographic") {
        return `Remote - ${geographicRestrictions}`;
      } else if (remoteOption === "timezone") {
        return `Remote - ${timezoneRestrictions}`;
      }
    } else if (jobLocation === "hybrid") {
      if (remoteOption === "global") {
        return `On site or Remote - ${locationDetails}, Global`;
      } else if (remoteOption === "geographic") {
        return `On site or Remote - ${locationDetails}, ${geographicRestrictions}`;
      } else if (remoteOption === "timezone") {
        return `On site or Remote - ${locationDetails}, ${timezoneRestrictions}`;
      }
    }
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 mr-4">
            {companyLogo && (
              <AvatarImage
                src={URL.createObjectURL(companyLogo)}
                alt={companyName}
              />
            )}
            <AvatarFallback>{companyName}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-foreground tracking-wide">
              {companyName}
            </h2>
            <Badge
              variant="secondary"
              className="mt-1 rounded-md text-sm font-semibold px-2 py-0.5"
            >
              {role}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-3xl font-semibold flex items-center gap-2 tracking-wide">
          <HiOutlineBriefcase />
          {jobTitle}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords?.split(",").map((keyword, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs rounded-md px-2 py-0.5"
            >
              {keyword.trim()}
            </Badge>
          ))}
        </div>

        <div className="mt-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-base">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              <span>{getLocationDetails()}</span>
            </div>
            <div className="flex items-center text-base">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{selectedPositions.join(", ")}</span>
            </div>
            <div className="flex items-center text-base">
              {salaryCurrency === "USD" ? (
                <DollarSign className="w-4 h-4 mr-1 text-primary" />
              ) : (
                <EuroIcon className="w-4 h-4 mr-1 text-primary" />
              )}
              <span>
                {minSalary} - {maxSalary}
              </span>
            </div>
            <div className="flex items-center text-base">
              <CreditCard className="w-4 h-4 mr-2 text-primary" />
              <span>{paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-medium text-foreground flex items-center">
            <HiOutlineNewspaper className="w-6 h-6 mr-2 text-primary" />
            Job Description
          </h3>
          <div className="whitespace-pre-wrap text-muted-foreground">
            {ReactHtmlParser(jobDescription as string)}
          </div>
        </div>
      </CardContent>

      <Separator className="my-6" />

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          &larr; Go Back
        </Button>
        <Button onClick={handleStep2}>Payment &rarr;</Button>
      </CardFooter>
    </Card>
  );
}

export default FormPreview;
