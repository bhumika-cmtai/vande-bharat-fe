import { MotionDiv } from "../motion/MotionDiv";
import { skeletonPulse } from "@/lib/motion/motionVariants";

export const ProductCardSkeleton = () => {
  return (
    <MotionDiv
      variants={skeletonPulse}
      initial="initial"
      animate="animate"
      className="bg-white rounded-2xl overflow-hidden shadow-subtle flex flex-col"
    >
      {/* --- Image Skeleton --- */}
      <div className="relative w-full aspect-[4/5] bg-gray-200" />

      {/* --- Content Skeleton --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
          <div className="h-4 w-1/4 bg-gray-200 rounded-md" />
        </div>

        {/* Product Name */}
        <div className="h-5 w-full bg-gray-200 rounded-md mt-2" />
        <div className="h-5 w-3/4 bg-gray-200 rounded-md mt-1" />
        
        {/* Price & Button */}
        <div className="mt-auto flex justify-between items-center pt-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded-md" />
          <div className="h-9 w-28 bg-gray-200 rounded-md" />
        </div>
      </div>
    </MotionDiv>
  );
};