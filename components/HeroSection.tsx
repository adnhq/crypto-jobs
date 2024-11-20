"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spline_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CyclingWords from "./CyclingWords";

const righteous = Spline_Sans({ subsets: ["latin"], weight: "500" });
const spline_2 = Spline_Sans({ subsets: ["latin"], weight: "400" });

export default function HeroSection() {
  return (
    <div className="relative h-[50rem] w-full overflow-hidden bg-white dark:bg-black">
      <div className="absolute inset-0">
        {/* Light mode background */}
        <div className="absolute inset-0 block dark:hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 0M0 0L40 40"
                  stroke="rgba(147, 51, 234, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="500" cy="500" r="400" fill="rgba(147, 51, 234, 0.05)" />
            <circle cx="500" cy="500" r="300" fill="rgba(147, 51, 234, 0.05)" />
            <circle cx="500" cy="500" r="200" fill="rgba(147, 51, 234, 0.05)" />
          </svg>
        </div>

        {/* Dark mode background (unchanged) */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-25" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmMjAiPjwvcmVjdD4KPHBhdGggZD0iTTI4IDY2TDAgNTBMMCAxNkwyOCAwTDU2IDE2TDU2IDUwTDI4IDY2TDI4IDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmNDAiIHN0cm9rZS13aWR0aD0iMiI+PC9wYXRoPgo8L3N2Zz4=')] bg-repeat opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-7xl mt-24 mb-22 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`text-4xl font-extrabold text-foreground tracking-wide sm:text-6xl lg:text-7xl ${righteous.className}`}
              >
                Finding The Right Talent
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-6 -right-10 text-yellow-400"
              >
          
              </motion.div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`mt-2 bg-gradient-to-br from-primary tracking-wide via-purple-500 to-pink-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl lg:text-7xl ${righteous.className}`}
            >
              Made <CyclingWords />
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`mt-6 max-w-md mx-auto text-base sm:text-lg md:mt-8 md:text-lg md:max-w-3xl ${spline_2.className}`}
            >
              Helping the best companies connect with the best talents in the
              industry.
            </motion.h2>
            <div className="mt-10 max-w-md mx-auto sm:flex-row sm:justify-center flex flex-col gap-6">
              <Button
                asChild
                className="px-10 py-4 bg-purple-600 text-white font-semibold transition-all duration-300 ease-in-out hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 active:scale-95"
              >
                <Link href="/post-job">Post a Job</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-10 py-4 duration-300 transition-all border-primary border-2 hover:shadow-lg hover:shadow-purple-400/50"
              >
                <Link href="/#availableJobs">Find Jobs &darr;</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}