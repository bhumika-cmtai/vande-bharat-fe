"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { Testimonial, updateTestimonial } from '@/lib/redux/slices/testimonialSlice';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface EditTestimonialModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  testimonial: Testimonial | null;
}

export const EditTestimonialModal: React.FC<EditTestimonialModalProps> = ({ isOpen, setIsOpen, testimonial }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [productName, setProductName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Jab modal khule ya testimonial badle, to form ko uski details se bhar do
  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setLocation(testimonial.location);
      setProductName(testimonial.productName);
    }
  }, [testimonial]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonial) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('productName', productName);
    // Sirf tabhi file append karo agar user ne nayi file select ki hai
    if (videoFile) formData.append('video', videoFile);
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

    try {
      await dispatch(updateTestimonial({ id: testimonial._id, formData })).unwrap();
      setIsOpen(false);
    } catch (error) {
      // Toast slice me handle ho raha hai
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
          <DialogDescription>
            Update the details below. Only upload files if you want to replace them.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name-edit" className="text-right">Name</Label><Input id="name-edit" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="productName-edit" className="text-right">Product</Label><Input id="productName-edit" value={productName} onChange={(e) => setProductName(e.target.value)} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="location-edit" className="text-right">Location</Label><Input id="location-edit" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="video-edit" className="text-right">New Video</Label><Input id="video-edit" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="col-span-3" /></div>
            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="thumbnail-edit" className="text-right">New Thumbnail</Label><Input id="thumbnail-edit" type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="col-span-3" /></div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};