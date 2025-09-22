"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
// import { VandeBharatLogo } from '../icons/Logo';
import { Button } from './ui/button';
import { MotionDiv } from './motion/MotionDiv';
import { AnimatePresence } from 'framer-motion';
import { slideInLeft } from '@/lib/motion/motionVariants';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" aria-label="Vande Bharat Mart Home">
            <Image
              src="/logo1.png"
              alt="Vande bharat logo"
              width={200}
              height={200}
              className="h-12 w-auto"
              />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="font-medium text-brand-dark hover:text-brand-orange transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons and Search */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center border rounded-full px-3 py-1.5 bg-gray-50">
            <Search className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search products..." className="bg-transparent focus:outline-none ml-2 text-sm w-48"/>
          </div>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
            <User className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <MotionDiv
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Image
                  src="/logo1.png"
                  alt="Vande bharat logo"
                  width={200}
                  height={200}
                  className="h-12"
                  />
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                   <li key={`mobile-${link.name}`}>
                     <Link href={link.href} className="text-xl font-medium text-brand-dark block py-2 hover:text-brand-orange" onClick={() => setMobileMenuOpen(false)}>
                       {link.name}
                     </Link>
                   </li>
                ))}
              </ul>
              <div className="mt-8 border-t pt-6 space-y-4">
                 <Link href="#" className="flex items-center gap-3 text-lg"><User /> Account</Link>
                 <Link href="/wishlist" className="flex items-center gap-3 text-lg"><Heart /> Wishlist</Link>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar