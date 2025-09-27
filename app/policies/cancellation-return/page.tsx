"use client";

import { ShoppingCart, CalendarDays, PackageOpen, RefreshCw, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// === Cancellation & Return Policy Page Content ===
export default function CancellationReturnPage() {
    const highlights = [
        { icon: <XCircle className="w-8 h-8 text-orange-500" />, text: "Easy Cancellations before shipping." },
        { icon: <CalendarDays className="w-8 h-8 text-blue-500" />, text: "7-Day Return Window after delivery." },
        { icon: <RefreshCw className="w-8 h-8 text-green-500" />, text: "Quick Refunds to original payment source." },
    ];

    const faqs = [
        { q: "How long does the refund take?", a: "Once your return is approved, the refund is typically processed within 5-7 business days." },
        { q: "Do I have to pay for the return shipping?", a: "For damaged or incorrect items, we will cover the return shipping. For other reasons, the customer is responsible for return shipping costs." },
        { q: "What if my item is damaged upon arrival?", a: "Please contact our customer support within 48 hours of delivery with photos of the damaged item and packaging. We will arrange for a replacement or a full refund." },
    ];

  return (
    <div className="bg-[var(--brand-orange)]/10">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--brand-orange)]/60 via-[var(--brand-blue)]/60 to-[var(--brand-green)]/60 text-brand-dark">
           <div className="container mx-auto px-6 py-20 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h1 className="text-4xl md:text-6xl font-bold">Cancellation & Return Policy</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                    We want you to love your purchase. Here’s our straightforward policy to ensure a hassle-free experience.
                </p>
           </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-16">
            <div className="container mx-auto px-6">
                 <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {highlights.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-white mb-4 shadow-sm">
                                {item.icon}
                            </div>
                            <p className="text-lg font-semibold text-gray-700">{item.text}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </section>

        {/* Main Policy Content */}
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Cancellation Policy */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-6">Order Cancellations</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                            <p>You may cancel your order for a full refund at any time <span className="font-semibold">before the order has been shipped</span> from our warehouse.</p>
                            <h3 className="text-xl font-semibold pt-4">How to Cancel:</h3>
                            <ol className="list-decimal list-inside space-y-2">
                                <li>Log in to your Vande Bharat Mart account and go to the 'My Orders' section.</li>
                                <li>Find the order you wish to cancel and click the 'Cancel Order' button.</li>
                                <li>If the button is not visible, it means the order has already been shipped and cannot be canceled.</li>
                            </ol>
                            <p>For prepaid orders, the refund will be processed to the original payment method within 5-7 business days.</p>
                        </div>
                    </div>

                    {/* Return Policy */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark mb-6">Return Policy</h2>
                        <p className="text-lg text-gray-700 mb-6">We accept returns within <span className="font-semibold">7 days of the delivery date</span>, provided the item meets our eligibility criteria.</p>
                        
                        <h3 className="text-xl font-semibold mb-4">Conditions for a Valid Return:</h3>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
                            <li>The item must be unused, unworn, and in the same condition that you received it.</li>
                            <li>It must be in the original, undamaged packaging with all tags and labels intact.</li>
                            <li>A valid proof of purchase (invoice or order number) is required.</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                            <div className="flex">
                                <div className="flex-shrink-0"><XCircle className="h-6 w-6 text-red-500" /></div>
                                <div className="ml-3">
                                    <h3 className="font-bold text-red-800">Non-Returnable Items</h3>
                                    <p className="text-red-700 mt-2">For hygiene and safety reasons, we cannot accept returns for certain items, including: perishable goods (like food items), personal care products (like skincare, soaps), and items sold in a sale or with a special discount.</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold pt-8 mb-4">How to Initiate a Return:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700">
                            <li>Contact our customer support team at <a href="mailto:support@vandebharatmart.com" className="text-[var(--brand-blue)] font-semibold">support@vandebharatmart.com</a> with your order number and reason for return.</li>
                            <li>Our team will verify your request and guide you through the process of shipping the item back to us.</li>
                        </ol>
                    </div>

                    {/* Refund Policy */}
                    <div>
                        <h2 className="text-3xl font-bold text-brand-dark mb-6">Refunds</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                           <p>Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.</p>
                           <p>If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within <span className="font-semibold">5-7 business days</span>. Please note that shipping charges are non-refundable.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-[var(--brand-green)]/30">
            <div className="container mx-auto px-6 max-w-4xl">
                 <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Frequently Asked Questions</h2>
                 <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="font-semibold text-lg text-gray-800 flex items-start">
                                <HelpCircle className="w-6 h-6 text-[var(--brand-blue)] mr-3 flex-shrink-0 mt-1" />
                                <span>{faq.q}</span>
                            </h3>
                            <p className="mt-2 text-gray-600 pl-9">{faq.a}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}