"use client";

import { Truck, PackageCheck, MapPin, Clock, IndianRupee, HelpCircle } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer  from '@/components/Footer';

// === Shipping & Delivery Policy Page Content ===
export default function ShippingDeliveryPage() {
    const highlights = [
        { icon: <IndianRupee className="w-8 h-8 text-green-500" />, title: "Free Shipping", text: "On all orders above ₹499." },
        { icon: <MapPin className="w-8 h-8 text-blue-500" />, title: "Pan-India Delivery", text: "We deliver to over 25,000+ pincodes." },
        { icon: <PackageCheck className="w-8 h-8 text-orange-500" />, title: "Track Your Order", text: "Live tracking available for all shipments." },
    ];
    
    const timelines = [
        { region: "Metropolitan Cities", time: "3 - 5 Business Days" },
        { region: "Tier 2 & 3 Cities", time: "5 - 7 Business Days" },
        { region: "Remote Areas (J&K, Northeast)", time: "7 - 10 Business Days" },
    ];

    const faqs = [
        { q: "Do you offer international shipping?", a: "Currently, we only ship within India. We are working on expanding our services internationally in the near future." },
        { q: "What happens if I'm not available to receive the delivery?", a: "Our courier partner will attempt delivery up to three times. After the third attempt, the package will be returned to our warehouse. Please contact customer support to arrange for re-delivery (additional charges may apply)." },
        { q: "Can I change my delivery address after placing an order?", a: "The shipping address cannot be changed once the order has been shipped. Please contact our support team immediately after placing the order if you need to make a change." },
    ];

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 via-green-50 to-orange-50 text-brand-dark">
           <div className="container mx-auto px-6 py-20 text-center">
                <Truck className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h1 className="text-4xl md:text-6xl font-bold">Shipping & Delivery</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                    Your guide to how we get your favorite products from our door to yours.
                </p>
           </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-16">
            <div className="container mx-auto px-6">
                 <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {highlights.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-white mb-4 shadow-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                            <p className="text-lg text-gray-600 mt-1">{item.text}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </section>

        {/* Main Policy Content */}
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Order Processing */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">1. Order Processing</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                            <p>All orders are processed within <span className="font-semibold">1-2 business days</span> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
                        </div>
                    </div>

                    {/* Shipping Timelines */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-brand-dark mb-6">2. Estimated Delivery Timelines</h2>
                        <p className="text-lg text-gray-700 mb-6">Delivery times are estimates and commence from the date of shipping, rather than the date of order. Timelines may vary depending on your location.</p>
                        <div className="space-y-4">
                            {timelines.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-between">
                                    <span className="font-semibold text-gray-800">{item.region}</span>
                                    <span className="text-[var(--brand-blue)] font-bold flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-gray-500">*Please note: Delivery to remote locations may experience unforeseen delays. Business days do not include Saturdays, Sundays, or public holidays.</p>
                    </div>

                    {/* Shipping Costs */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">3. Shipping Costs</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                           <p>
                                <span className="font-semibold text-green-600">Free Shipping:</span> We offer free standard shipping on all prepaid orders with a total value of <span className="font-semibold">₹499 or more</span>.
                           </p>
                           <p>
                                <span className="font-semibold text-gray-800">Standard Shipping:</span> For orders below ₹499, a flat shipping fee of <span className="font-semibold">₹50</span> will be applied.
                           </p>
                           <p>
                                Shipping charges for your order will be calculated and displayed at checkout.
                           </p>
                        </div>
                    </div>

                    {/* Order Tracking */}
                     <div>
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">4. Order Tracking</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                           <p>Once your order has shipped, you will receive an email and an SMS notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
                           <p>You can also track your order from the <span className="font-semibold">'My Orders'</span> section of your account on our website.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-white">
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