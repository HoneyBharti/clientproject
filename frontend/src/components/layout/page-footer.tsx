'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const AppFooter = () => (
    <footer className="bg-gray-900 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="col-span-2 lg:col-span-1">
                     <Image src="/logo.png" alt="YourLegal Logo" width={150} height={35} />
                    <p className="text-sm text-gray-400 mt-4">The financial and legal infrastructure for global entrepreneurship.</p>
                    <div className="mt-4 text-sm text-gray-400 space-y-1">
                        <p><a href="mailto:contactus@yourlegal.in" className="hover:text-white">contactus@yourlegal.in</a></p>
                        <p><a href="tel:5859001116" className="hover:text-white">(585)-900-1116</a></p>
                        <p className="mt-2">30 N Gould St, Sheridan,<br/>Wyoming 82801, US</p>
                    </div>
                </div>
                <div>
                    <h5 className="font-semibold mb-3">Company</h5>
                    <ul className="space-y-2">
                        <li><Link href="/company/about" className="text-sm text-gray-400 hover:text-white">About Us</Link></li>
                        <li><Link href="/why-choose-us" className="text-sm text-gray-400 hover:text-white">Why Choose Us</Link></li>
                        <li><Link href="/case-studies" className="text-sm text-gray-400 hover:text-white">Case Studies</Link></li>
                         <li><Link href="/company/partner" className="text-sm text-gray-400 hover:text-white">Partners</Link></li>
                        <li><Link href="/company/careers" className="text-sm text-gray-400 hover:text-white">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold mb-3">Services</h5>
                    <ul className="space-y-2">
                        <li><Link href="/products" className="text-sm text-gray-400 hover:text-white">Services Overview</Link></li>
                        <li><Link href="/industries" className="text-sm text-gray-400 hover:text-white">Industries</Link></li>
                        <li><Link href="/global-compliance" className="text-sm text-gray-400 hover:text-white">Global Compliance</Link></li>
                         <li><Link href="/pricing-philosophy" className="text-sm text-gray-400 hover:text-white">Pricing Philosophy</Link></li>
                    </ul>
                </div>
                 <div>
                    <h5 className="font-semibold mb-3">Resources</h5>
                    <ul className="space-y-2">
                        <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white">Founder Resources</Link></li>
                        <li><Link href="/support/help-center" className="text-sm text-gray-400 hover:text-white">Help Center</Link></li>
                        <li><Link href="/support/contact-sales" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold mb-3">Legal</h5>
                     <ul className="space-y-2">
                        <li><Link href="/legal/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/legal/terms-of-service" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
                        <li><Link href="/legal/refund-policy" className="text-sm text-gray-400 hover:text-white">Refund Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} YourLegal Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>
);