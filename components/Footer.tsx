'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Twitter, Send, Linkedin, Mail } from "lucide-react"
import { HiOutlineBeaker } from "react-icons/hi2"
import { FaDiscord } from "react-icons/fa"
import { Spline_Sans } from 'next/font/google'

const splineSans = Spline_Sans({ subsets: ['latin'], weight: ["400", "600"] })

export default function Component() {
  return (
    <footer className="py-20 px-8 bg-gradient-to-b from-background to-background/80 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <HiOutlineBeaker className="w-10 h-10 text-primary" />
              <span className={`${splineSans.className} text-primary font-bold text-3xl`}>RAWIII</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting talent with opportunities in the crypto space.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h2 className={`${splineSans.className} font-semibold text-foreground text-xl`}>Quick Links</h2>
            {['Browse Jobs', 'Post a Job', 'About Us'].map((item, index) => (
              <Link key={index} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out">
                {item}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-5">
            <h2 className={`${splineSans.className} font-semibold text-foreground text-xl`}>Connect With Us</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: FaDiscord, label: 'Discord' },
                { icon: Send, label: 'Telegram' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' }
              ].map((item, index) => (
                <Link key={index} href="#" className="group flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary transition-colors duration-300 ease-in-out">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors duration-300 ease-in-out" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h2 className={`${splineSans.className} font-semibold text-foreground text-xl`}>Stay Ahead of the Competition</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to our newsletter for the latest opportunities and insights in blockchain and cryptocurrency. Be the first to know about groundbreaking projects and roles.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="flex">
                <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} CryptoJobs. All rights reserved.</p>
          <p className={`${splineSans.className} text-sm font-semibold text-primary mt-2 md:mt-0`}>
            Shaping the Future of Decentralized Work
          </p>
        </div>
      </div>
    </footer>
  )
}