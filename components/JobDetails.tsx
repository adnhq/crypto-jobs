import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaWifi, FaChevronRight } from 'react-icons/fa';

type Job = {
  id: number;
  title: string;
  company: string;
  logo: string;
  tags: string[];
  daysAgo: number;
  location: string;
  type: string;
  locationType: string;
  compensationRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
};

const job: Job = {
  id: 1,
  title: "Senior Blockchain Developer",
  company: "Binance Ltd",
  logo: "/api/placeholder/128/128",
  tags: ["Solidity", "Ethereum", "Smart Contracts", "DeFi", "Web3"],
  daysAgo: 2,
  location: "Global",
  type: "Full-time",
  locationType: "Remote",
  compensationRange: "$120k - $180k",
  description: "Join Binance as a Senior Blockchain Developer and lead the charge in decentralized finance innovation. You'll spearhead the development of cutting-edge smart contracts and decentralized applications, shaping the future of financial technology.",
  requirements: [
    "5+ years of experience in blockchain development",
    "Expert-level proficiency in Solidity and the Ethereum ecosystem",
    "Proven track record of smart contract development and security auditing",
    "Deep understanding of cryptography, consensus algorithms, and DeFi protocols",
    "Experience with Web3.js, Truffle, and other blockchain development tools",
    "Strong background in tokenomics and DeFi mechanism design"
  ],
  benefits: [
    "Competitive salary and equity package",
    "Remote-first work environment",
    "Flexible working hours",
    "Health, dental, and vision insurance",
    "Annual learning and development budget",
    "Regular team retreats and conferences"
  ]
};

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-2 border-primary-foreground">
                <AvatarImage src={job.logo} alt={job.company} />
                <AvatarFallback>{job.company[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                <CardDescription className="text-xl text-primary-foreground/80">{job.company}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-secondary-foreground px-3 py-1">
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FaWifi className="text-primary" />
              <span>{job.locationType}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FaMapMarkerAlt className="text-primary" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FaClock className="text-primary" />
              <span>Posted {job.daysAgo} days ago</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FaDollarSign className="text-primary" />
              <span>{job.compensationRange}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-primary border-primary/30">
                {tag}
              </Badge>
            ))}
          </div>
          <Separator className="my-6" />
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <FaChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-card-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="benefits">
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FaChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-card-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-muted p-6">
          <Button className="w-full">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetailsPage;