import Link from 'next/link';
// import { VandeBharatLogo } from '../icons/Logo';
import { IndiaFlag } from './icons/IndiaFlag';
import { UKFlag } from './icons/UKFlag';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { MotionDiv } from './motion/MotionDiv';
import Image from 'next/image';

const footerLinkGroups = [
  {
    title: 'Products Range',
    links: ['Personal Care', 'Hair Care', 'Skin Care', 'Wellness Product', 'Food Product'],
  },
  {
    title: 'Navigations',
    links: ['About us', 'Success Stories', 'Director Message', 'Achievements', 'Legals', 'Downloads', 'Grievance Cell'],
  },
  {
    title: 'Policies',
    links: ['Obligations', 'Prohibitions', 'Model Code Of Conduct', 'Terms & Conditions', 'Other Policies', 'Cancellation & Return', 'Shipping & Delivery'],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Youtube, href: '#', name: 'Youtube' },
];

 const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-brand-dark">
      <div className="container mx-auto px-6 py-12">
        <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            
            {/* Link Groups */}
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-bold text-brand-blue mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="hover:text-brand-orange transition-colors duration-300">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Us Section */}
            <div className="xl:col-span-2">
              <h4 className="font-bold text-brand-blue mb-4">Contact Us</h4>
              <div className="space-y-6">
                {/* India Office */}
                <div>
                  <div className="flex items-center font-semibold mb-2">
                    <span className="mr-2">Corporate Office INDIA</span>
                    <IndiaFlag className="w-6 h-auto rounded" />
                  </div>
                  <address className="not-italic text-sm space-y-1 text-gray-600">
                    <p>VANDE BHARAT MARKETING PVT. LTD.</p>
                    <p>K-131, KRISHNA PARK EXTN.,</p>
                    <p>NEAR JANAKPURI DISTRICT CENTRE</p>
                    <p>NEW DELHI -110018 (INDIA)</p>
                    <p><strong>CIN No.:</strong> U74999DL2021PTC377351</p>
                    <p><strong>GST No.:</strong> 07AAHCV9253G1ZZ</p>
                    <p><strong>TEL/Fax:</strong> +91 11 41671550</p>
                    <p><strong>Whatsapp No:</strong> +91 8860001947</p>
                    <p><strong>Email:</strong> support@vandebharatmart.com</p>
                  </address>
                </div>
                {/* UK Office */}
                <div>
                  <div className="flex items-center font-semibold mb-2">
                    <span className="mr-2">Branch Office LONDON (U.K)</span>
                    <UKFlag className="w-6 h-auto" />
                  </div>
                  <address className="not-italic text-sm space-y-1 text-gray-600">
                     <p>VANDE BHARAT MARKETING PVT. LTD.</p>
                    <p>CARLYON ROAD, UB4 0NS, HAYES</p>
                    <p>LONDON, ENGLAND (U.K)</p>
                    <p><strong>Mob No:</strong> +44 74040 91171</p>
                    <p><strong>Email:</strong> info@vandebharatmart.com</p>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <Link href="/" className="inline-block mb-4">
                 <Image
                  src="/logo1.png"
                  alt="Vande bharat logo"
                  width={200}
                  height={200}
                  className="h-12"
                  />
              </Link>
              <p className="text-sm text-gray-500">2025 Vande Bharat Mart. All Rights Reserved.</p>
            </div>
            <div className='text-center'>
              <h4 className="font-bold text-brand-blue mb-3">Follow us</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} aria-label={social.name} className="text-gray-500 hover:text-brand-orange transition-colors duration-300">
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </footer>
  );
};

export default Footer