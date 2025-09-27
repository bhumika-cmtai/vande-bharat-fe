"use client";

import { Ban, ShieldOff, Copyright, MessageCircleOff, UserX, AlertTriangle } from 'lucide-react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



// === Prohibitions Page Content ===
export default function ProhibitionsPage() {
  const prohibitionsList = [
    {
      title: 'Unlawful & Fraudulent Conduct',
      icon: <Ban className="w-8 h-8 text-red-700" />,
      points: [
        'Engaging in any activity that is illegal under local, national, or international law.',
        'Committing fraud, creating a false identity, or misrepresenting your affiliation with any person or entity.',
        'Using the platform for money laundering or any other financial crime.',
      ],
    },
    {
      title: 'Security & Integrity Violations',
      icon: <ShieldOff className="w-8 h-8 text-red-700" />,
      points: [
        'Attempting to breach, scan, or test the vulnerability of our systems or network.',
        'Introducing viruses, malware, trojans, or any other malicious or technologically harmful material.',
        'Attempting to gain unauthorized access to our servers, user accounts, or databases.',
      ],
    },
    {
      title: 'Intellectual Property Infringement',
      icon: <Copyright className="w-8 h-8 text-red-700" />,
      points: [
        'Copying, reproducing, distributing, or creating derivative works from our content without express permission.',
        'Using our trademarks, logos, or brand names in a way that is likely to cause confusion.',
        'Posting or selling counterfeit products or content that infringes on the copyrights of others.',
      ],
    },
    {
      title: 'Misuse of Communication & Services',
      icon: <MessageCircleOff className="w-8 h-8 text-red-700" />,
      points: [
        'Sending unsolicited promotional materials (spam) or chain letters to other users.',
        'Harassing, abusing, insulting, harming, defaming, or discriminating against any person.',
        'Posting obscene, pornographic, or offensive content in product reviews or any other public forum.',
      ],
    },
    {
      title: 'Account & Platform Misuse',
      icon: <UserX className="w-8 h-8 text-red-700" />,
      points: [
        'Creating multiple accounts for the purpose of abusing our policies or promotions.',
        'Selling, trading, or transferring your account to another party without our consent.',
        'Using automated scripts (bots) to scrape data, place orders, or interact with the website in any unauthorized manner.',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-100 via-blue-100 to-orange-100 text-[var(--brand-orange-500)]">
           <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold">Website Prohibitions</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-500">
                    To maintain a safe, lawful, and respectful environment for our community.
                </p>
           </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6">
                 <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Our Community Standards</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        By using the Vande Bharat Mart website, you agree not to participate in any of the following prohibited activities. These rules are designed to protect our customers, our partners, and the integrity of our platform. Violation of these terms may result in serious consequences.
                    </p>
                </div>
            </div>
        </section>

        {/* Prohibitions Grid */}
        <section className="py-16 md:py-20 bg-orange-50">
          <div className="container mx-auto px-6">
            <MotionDiv
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {prohibitionsList.map((item, index) => (
                <MotionDiv key={index} variants={fadeInUp} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
                      {item.icon}
                    </div>
                    <h3 className="ml-4 font-bold text-xl text-brand-dark">{item.title}</h3>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </section>
        
        {/* Consequences Section */}
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-lg">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-yellow-900 mb-2">Consequences of Violation</h2>
                                <p className="text-yellow-800 leading-relaxed">
                                    Any violation of these prohibitions may result in actions including, but not limited to:
                                </p>
                                <ul className="list-disc list-inside mt-4 space-y-1 text-yellow-800">
                                    <li>Immediate and permanent suspension of your account.</li>
                                    <li>Cancellation of any pending orders without a refund.</li>
                                    <li>Forfeiture of any loyalty points or credits.</li>
                                    <li>Civil or criminal legal action where applicable.</li>
                                </ul>
                                <p className="mt-4 text-yellow-800">
                                    We reserve the right to report any unlawful activities to the relevant law enforcement authorities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <Footer />
      </main>
    </div>
  );
}