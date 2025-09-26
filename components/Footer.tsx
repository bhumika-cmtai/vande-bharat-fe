import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { MotionDiv } from './motion/MotionDiv';
import Image from 'next/image';
import { IndiaFlag } from './icons/IndiaFlag';
import { UKFlag } from './icons/UKFlag';

// Helper function to convert link text to a URL-friendly slug
const toSlug = (text: string) => {
  const lower = text.toLowerCase();
  // Handle special cases first
  if (lower === 'about us') return '/about';
  if (lower === 'terms & conditions') return '/policies/terms-and-conditions';
  
  // General rule
  return '/' + lower
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, 'and'); // Replace & with 'and'
};

const footerLinkGroups = [
  {
    title: 'Products Range',
    links: [
      { name: 'Personal Care', href: '/products/personal-care' },
      { name: 'Hair Care', href: '/products/hair-care' },
      { name: 'Skin Care', href: '/products/skin-care' },
      { name: 'Wellness Product', href: '/products/wellness' },
      { name: 'Food Product', href: '/products/food' },
    ],
  },
  {
    title: 'Navigations',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Success Stories', href: '/success-stories' },
      // Linking to sections on the corporate info page
      { name: 'Director Message', href: '/corporate-info#director-message' }, 
      { name: 'Achievements', href: '/corporate-info#achievements' },
      { name: 'Legals', href: '/corporate-info#legal' },
      { name: 'Downloads', href: '/corporate-info#downloads' },
      { name: 'Grievance Cell', href: '/corporate-info#grievance-cell' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { name: 'Obligations', href: '/policies/obligations' },
      { name: 'Prohibitions', href: '/policies/prohibitions' },
      { name: 'Model Code Of Conduct', href: '/policies/code-of-conduct' },
      { name: 'Terms & Conditions', href: '/policies/terms-and-conditions' },
      { name: 'Other Policies', href: '/policies/other' },
      { name: 'Cancellation & Return', href: '/policies/cancellation-return' },
      { name: 'Shipping & Delivery', href: '/policies/shipping-delivery' },
    ],
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
    <footer className="bg-[var(--brand-orange)]/40 border-t border-gray-200 text-blue-800">
      <div className="container mx-auto px-6 py-4">
        <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-bold text-blue-800/90 mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="hover:text-[var(--brand-orange)] text-[var(--brand-blue-500)] transition-colors duration-300">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Us Section */}
            <div className="xl:col-span-2">
              <h4 className="font-bold text-blue-800/90  mb-4">Contact Us</h4>
              <div className="space-y-6">
                {/* India Office */}
                <div>
                  <div className="flex items-center font-semibold mb-2">
                    <span className="mr-2">Corporate Office INDIA</span>
                    <IndiaFlag className="w-6 h-auto rounded" />
                  </div>
                  {/* ===== बदलाव 2: पते का रंग भी रॉयल ब्लू किया गया है ===== */}
                  <address className="not-italic text-sm space-y-1 text-[var(--brand-blue-500)]">
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
                  <address className="not-italic text-sm space-y-1 text-blue-800/90">
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

          <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <Link href="/" className="inline-block mb-4">
                 <Image
                  src="/logo1.png"
                  alt="Vande bharat logo"
                  width={80}
                  height={50}
                  className="h-12 w-auto"
                  />
              </Link>
              {/* ===== बदलाव 3: कॉपीराइट टेक्स्ट का रंग रॉयल ब्लू किया गया है ===== */}
              <p className="text-sm text-blue-800/90">2025 Vande Bharat Mart. All Rights Reserved.</p>
            </div>
            <div className='text-center'>
              <h4 className="font-bold text-[var(--brand-blue)] mb-3">Follow us</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} aria-label={social.name} className="text-[var(--brand-orange-500)] hover:text-[var(--brand-orange)] transition-colors duration-300">
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

export default Footer;