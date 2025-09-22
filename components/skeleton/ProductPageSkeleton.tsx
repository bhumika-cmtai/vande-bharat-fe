"use client"
import { MotionDiv } from "../motion/MotionDiv";
import { skeletonPulse } from "@/lib/motion/motionVariants";

export const ProductCardSkeleton = () => {
  return (
    <MotionDiv
      variants={skeletonPulse}
      initial="initial"
      animate="animate"
      className="bg-white rounded-xl shadow-subtle overflow-hidden"
    >
      <div className="relative w-full aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded-md" />
          <div className="h-9 w-1/4 bg-gray-200 rounded-md" />
        </div>
      </div>
    </MotionDiv>
  );
};