"use client";

import { MotionDiv } from './motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Leaf, Package, ShieldCheck, Truck } from 'lucide-react'; // Icons

const benefits = [
    { icon: Leaf, title: "100% Pure & Organic", description: "Sourced directly from nature, free from harmful chemicals." },
    { icon: Package, title: "Easy Returns", description: "Hassle-free return policy if you're not satisfied." },
    { icon: ShieldCheck, title: "Secure Payments", description: "Your transactions are safe with our encrypted payment gateways." },
    { icon: Truck, title: "Fast Shipping", description: "Delivering the goodness of nature to your doorstep, quickly." }
];

export const BenefitsStrip = () => {
    return (
        <section className="bg-green-50/50 py-16">
            <MotionDiv 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
                {benefits.map((benefit, index) => (
                    <MotionDiv variants={fadeInUp} key={index} className="text-center">
                        <div className="flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-brand-green text-white mb-4">
                            <benefit.icon className="w-8 h-8"/>
                        </div>
                        <h3 className="font-bold text-xl text-brand-dark mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                    </MotionDiv>
                ))}
            </MotionDiv>
        </section>
    )
}