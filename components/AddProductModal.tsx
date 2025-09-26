"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

const MAX_IMAGES = 5;

export function AddProductModal({ isOpen, onClose, onSave }: AddProductModalProps) {
  const { categories } = useSelector((state: RootState) => state.admin);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(new Array(MAX_IMAGES).fill(null));
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(new Array(MAX_IMAGES).fill(null));
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleSingleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!);
    if (file) {
      newFiles[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
    } else {
      newFiles[index] = null;
      newPreviews[index] = null;
    }
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!);
    newFiles[index] = null;
    newPreviews[index] = null;
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (videoFile && videoPreview) URL.revokeObjectURL(videoPreview);
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };
  
  const removeVideo = () => {
    setVideoFile(null);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview(null);
  };

  const resetForm = () => {
    imagePreviews.forEach(url => { if (url) URL.revokeObjectURL(url); });
    setImageFiles(new Array(MAX_IMAGES).fill(null));
    setImagePreviews(new Array(MAX_IMAGES).fill(null));
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFiles.some(file => file !== null)) {
      toast.error("Please upload at least one product image.");
      return;
    }
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    imageFiles.forEach(file => { if (file) formData.append('images', file); });
    if (videoFile) formData.append('video', videoFile);
    
    try {
      await onSave(formData);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetForm(); onClose(); } }}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details for the new product. * indicates required fields.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="py-4 max-h-[70vh] overflow-y-auto pr-4 space-y-4">
            
            <div className="space-y-2"><Label>Product Name *</Label><Input name="name" required /></div>
            <div className="space-y-2"><Label>Description *</Label><Textarea name="description" required /></div>
            <div className="space-y-2"><Label>Brand *</Label><Input name="brand" required /></div>
            
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select name="category" required>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2"><Label>Tags (comma-separated)</Label><Input name="tags" placeholder="e.g., Ethnic, Sale, Hot" /></div>
            
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div><Label>Price (MRP) *</Label><Input name="price" type="number" step="0.01" required /></div>
              <div><Label>Sale Price</Label><Input name="sale_price" type="number" step="0.01" /></div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Stock Quantity *</Label>
              <Input name="stock_quantity" type="number" required />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Product Images (up to 5) *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{[...Array(MAX_IMAGES)].map((_, index) => (
                  <div key={index} className="space-y-1">
                    <Label htmlFor={`image-${index}`} className="text-xs text-muted-foreground">Image {index + 1}</Label>
                    <Input id={`image-${index}`} type="file" accept="image/*" onChange={(e) => handleSingleImageChange(index, e)} className="text-xs" />
                    {imagePreviews[index] && (
                      <div className="relative mt-2 w-20 h-20">
                        <Image src={imagePreviews[index]!} alt={`preview ${index}`} layout="fill" className="object-cover rounded-md" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><XCircle size={16} /></button>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="video">Product Video (optional)</Label>
                <Input id="video" name="video" type="file" accept="video/*" onChange={handleVideoChange} />
                {videoPreview && (
                  <div className="relative w-full aspect-video mt-2">
                    <video src={videoPreview} controls className="w-full h-full object-cover rounded-md" />
                    <button type="button" onClick={removeVideo} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><XCircle size={16} /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => { resetForm(); onClose(); }}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}