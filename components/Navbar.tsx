"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HiOutlineBeaker } from "react-icons/hi2";
import { Spline_Sans } from 'next/font/google';
import { Button } from "./ui/button";

const splineSans = Spline_Sans({ subsets: ['latin'], weight: "500" });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = ["Companies", "About"];

  const handleJobsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const jobsSection = document.getElementById("availableJobs");
      if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex gap-4 items-center">
              <HiOutlineBeaker className="w-6 h-6 text-primary" />
              <p className="font-bold text-2xl">RAWIII</p>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 * 0.1 }}
            >
              <Link
                href={`/#availableJobs`}
                className="py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition duration-300 ease-in-out relative group"
                onClick={handleJobsClick}
              >
                Jobs
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition duration-300 ease-in-out transform origin-left"></span>
              </Link>
            </motion.div>

            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={`${splineSans.className} py-2 rounded-md text-base font-medium text-foreground hover:text-primary transition duration-300 ease-in-out relative group`}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition duration-300 ease-in-out transform origin-left"></span>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
            >
              <Button asChild>
                <Link href="/post-job">Post a Job</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline">
                  <Link href="/signup">Signup</Link>
                </Button>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
            >
              <ModeToggle />
            </motion.div>
          </div>
          <div className="md:hidden">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none transition duration-300 ease-in-out"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href={`/#availableJobs`}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-purple-400 hover:bg-muted transition duration-300 ease-in-out"
                onClick={handleJobsClick}
              >
                Jobs
              </Link>

              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`${splineSans.className} block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-purple-400 hover:bg-muted transition duration-300 ease-in-out`}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/post-job"
                className={`${splineSans.className} block px-3 py-2 rounded-md text-base font-medium text-purple-500 hover:text-purple-400 hover:bg-muted transition duration-300 ease-in-out`}
              >
                Post a Job
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}