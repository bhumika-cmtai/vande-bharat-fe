import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  { href: '#', icon: Facebook, name: 'Facebook' },
  { href: '#', icon: Instagram, name: 'Instagram' },
  { href: '#', icon: Twitter, name: 'Twitter' },
  { href: '#', icon: Youtube, name: 'YouTube' },
];

const TopBanner = () => {
  return (
    <div className="border-b border-gray-200">
      {/* ===== Top White Section ===== */}
      <div className="bg-white py-3 hidden md:block">
        {/* --- MODIFICATION: ---
            1. Added `relative` to allow for absolute positioning of child elements.
            2. Changed `justify-center` to `justify-start` to align the flag/text to the left.
        */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-start items-center">

          {/* Left Side: Flag & Text (No changes here) */}
          <div className="flex items-center gap-4">
            <Image
              src="/indian-flag.jpg" // Note: You need to add this image to your /public folder
              alt="Indian Flag"
              width={80}
              height={50}
            />
            <div className="text-left">
              <h2 className="text-2xl font-extrabold tracking-wide">
                <span className="text-orange-500">VANDE</span>
                <span className="text-green-600"> BHARAT</span>
                <span className="text-blue-500"> MART</span>
              </h2>
              <p className="text-sm text-gray-600 font-medium">Online/offline store</p>
              <p className="text-md font-bold text-blue-800">
                Vande Bharat Group Co. Ltd.
              </p>
            </div>
          </div>

          {/* --- MODIFICATION: ---
              1. Wrapped the Image in a div with absolute positioning classes.
              2. `absolute left-1/2 top-1/2` moves the top-left corner of the div to the center.
              3. `-translate-x-1/2 -translate-y-1/2` shifts the div back by half its own width and height,
                 perfectly centering it on the screen.
              4. Removed the old `pl-8` class.
          */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/logogif.gif" // Note: Add your animated GIF to the /public folder
              alt="Vande Bharat Animated Logo"
              width={200}
              height={200}
              unoptimized={true} // Important for GIFs to play correctly
            />
          </div>
        </div>
      </div>

      {/* ===== Bottom Red Strip (No changes here) ===== */}
      <div className="bg-[var(--brand-orange)] text-white text-xs sm:text-sm py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <p>Welcome to Vande Bharat</p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((link) => (
                <Link key={link.name} href={link.href} aria-label={link.name} className="hover:opacity-80 transition-opacity">
                  <link.icon size={16} />
                </Link>
              ))}
            </div>
          </div>
          <div className="font-medium">
            <p>Sign up for 10% off your order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;