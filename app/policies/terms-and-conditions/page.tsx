"use client";

import { Gavel, AlertTriangle } from 'lucide-react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


// === Terms and Conditions Page Content ===
export default function TermsAndConditionsPage() {
    const sections = [
        { id: 'introduction', title: '1. Introduction & Agreement' },
        { id: 'user-accounts', title: '2. User Accounts & Responsibilities' },
        { id: 'products-services', title: '3. Products and Services' },
        { id: 'pricing-payments', title: '4. Pricing and Payments' },
        { id: 'orders-shipping', title: '5. Orders, Shipping, and Delivery' },
        { id: 'cancellation-returns', title: '6. Cancellation, Return, and Refund' },
        { id: 'intellectual-property', title: '7. Intellectual Property Rights' },
        { id: 'prohibited-conduct', title: '8. Prohibited Conduct' },
        { id: 'limitation-of-liability', title: '9. Limitation of Liability' },
        { id: 'indemnification', title: '10. Indemnification' },
        { id: 'governing-law', title: '11. Governing Law & Dispute Resolution' },
        { id: 'changes-to-terms', title: '12. Changes to Terms' },
        { id: 'contact-info', title: '13. Contact Information' },
    ];

  return (
    // Add scroll-smooth to your global CSS for the best experience
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gray-800 text-white">
           <div className="container mx-auto px-6 py-20 text-center">
                <Gavel className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h1 className="text-4xl md:text-6xl font-bold">Terms & Conditions</h1>
                {/* <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
                    Please read these terms carefully before using our services. Last Updated: {new Date().toLocaleDateString()}.
                </p> */}
           </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3 mb-12 lg:mb-0">
                        <div className="sticky top-28">
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Sections</h3>
                            <ul className="space-y-2">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} className="text-gray-600 hover:text-[var(--brand-blue)] transition-colors text-md">
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Terms Content */}
                    <div className="lg:col-span-9 prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-brand-dark prose-a:text-[var(--brand-blue)]">
                        
                        {/* Legal Disclaimer */}
                        {/* <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12" role="alert">
                            <div className="flex">
                                <div className="py-1"><AlertTriangle className="h-6 w-6 text-red-500 mr-4" /></div>
                                <div>
                                    <p className="font-bold text-red-800">IMPORTANT DISCLAIMER</p>
                                    <p className="text-red-700 text-base">
                                        This is a template and not legal advice. You must consult with a qualified legal professional to ensure your Terms & Conditions are complete, accurate, and comply with all applicable laws for your business and jurisdiction.
                                    </p>
                                </div>
                            </div>
                        </div> */}

                        <section id="introduction">
                            <h2>1. Introduction & Agreement</h2>
                            <p>Welcome to Vande Bharat Mart. These Terms and Conditions ("Terms") govern your use of our website (the "Site") and the services, features, content, applications, or products we offer (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our Services.</p>
                        </section>

                        <section id="user-accounts">
                            <h2>2. User Accounts & Responsibilities</h2>
                            <p>To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account or password.</p>
                        </section>

                        <section id="products-services">
                            <h2>3. Products and Services</h2>
                            <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that they will be accurate, complete, reliable, current, or free of other errors. All products are subject to availability, and we reserve the right to discontinue any products at any time for any reason.</p>
                        </section>

                        <section id="pricing-payments">
                            <h2>4. Pricing and Payments</h2>
                            <p>All prices are listed in [Your Currency, e.g., INR] and are subject to change without notice. We accept the following forms of payment: [List payment methods, e.g., Credit/Debit Cards, UPI, Net Banking]. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.</p>
                        </section>

                        <section id="orders-shipping">
                            <h2>5. Orders, Shipping, and Delivery</h2>
                            <p>All orders are subject to acceptance by us. We reserve the right to refuse or cancel any order for any reason. Our shipping and delivery policies, including timelines and charges, are outlined in our <a href="/shipping-delivery">Shipping & Delivery Policy</a>, which is incorporated by reference into these Terms.</p>
                        </section>

                        <section id="cancellation-returns">
                            <h2>6. Cancellation, Return, and Refund</h2>
                            <p>Our policies regarding order cancellations, returns, and refunds are detailed in our <a href="/cancellation-return">Cancellation & Return Policy</a>. Please review it carefully to understand your rights and obligations.</p>
                        </section>

                        <section id="intellectual-property">
                            <h2>7. Intellectual Property Rights</h2>
                            <p>Unless otherwise indicated, the Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Vande Bharat Mart, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.</p>
                        </section>

                        <section id="prohibited-conduct">
                            <h2>8. Prohibited Conduct</h2>
                            <p>You may use the Site only for lawful purposes. You agree not to use the Site in any way that violates any applicable law or regulation. For a detailed list of prohibited activities, please refer to our <a href="/prohibitions">Prohibitions Policy</a>.</p>
                        </section>

                        <section id="limitation-of-liability">
                            <h2>9. Limitation of Liability</h2>
                            <p>In no event will Vande Bharat Mart, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, any content on the website, or such other websites.</p>
                        </section>
                        
                        <section id="indemnification">
                           <h2>10. Indemnification</h2>
                           <p>You agree to defend, indemnify, and hold harmless Vande Bharat Mart and its affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the Site.</p>
                        </section>

                        <section id="governing-law">
                            <h2>11. Governing Law & Dispute Resolution</h2>
                            <p>These Terms and your use of the Site are governed by and construed in accordance with the laws of [Your Country, e.g., India] and the jurisdiction of the courts in [Your City, e.g., New Delhi].</p>
                        </section>
                        
                        <section id="changes-to-terms">
                           <h2>12. Changes to Terms</h2>
                           <p>We reserve the right, in our sole discretion, to revise and update these Terms from time to time. All changes are effective immediately when we post them. Your continued use of the Site following the posting of revised Terms means that you accept and agree to the changes.</p>
                        </section>
                        
                        <section id="contact-info">
                           <h2>13. Contact Information</h2>
                           <p>For any questions, concerns, or notices regarding these Terms, please contact us at:</p>
                           <p>Email: <a href="mailto:support@vandebharatmart.com">support@vandebharatmart.com</a><br/>
                           Address: VANDE BHARAT MARKETING PVT. LTD.

K-131, KRISHNA PARK EXTN.,

NEAR JANAKPURI DISTRICT CENTRE

NEW DELHI -110018 (INDIA)</p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}