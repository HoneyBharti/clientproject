
'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

type NavHeaderProps = {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
};

export const NavHeader = ({ onLoginClick, onSignupClick }: NavHeaderProps) => (
    <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="YourLegal Logo" width={150} height={35} priority />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 hover:text-blue-600 transition">
                            About <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/company/about">About Us</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/why-choose-us">Why Choose Us</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/case-studies">Case Studies</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 hover:text-blue-600 transition">
                            Services <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/products">Global Services Overview</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/industries">Industries</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/global-compliance">Global Compliance</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 hover:text-blue-600 transition">
                            Global <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/usa">USA</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/dubai">Dubai (UAE)</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/singapore">Singapore</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/uk">United Kingdom</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/australia">Australia</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/saudi-arabia">Saudi Arabia</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/in">India</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/netherlands">Netherlands</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Link href="/usa/pricing" className="hover:text-blue-600 transition font-bold text-blue-600">Pricing</Link>
                <Link href="/blog" className="hover:text-blue-600 transition">Resources</Link>
                <Link href="/support/contact-sales" className="hover:text-blue-600 transition">Contact</Link>

            </nav>
            <div className="flex items-center space-x-4">
                <Link 
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 hidden sm:block"
                >
                    Login
                </Link>
                <a 
                    href="https://outlook.office365.com/book/YOURLEGAL1@yourlegal.in/?ismsaljsauthenabled=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-200 text-sm"
                >
                    Get Started
                </a>
            </div>
        </div>
    </header>
);
