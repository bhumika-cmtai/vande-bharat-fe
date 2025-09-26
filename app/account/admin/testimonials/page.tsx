"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Image from "next/image";

// --- Redux Slice Imports ---
import {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
  Testimonial,
} from "@/lib/redux/slices/testimonialSlice";

// --- UI Components (Shadcn/UI) ---
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Loader2, Edit } from "lucide-react"; // Edit icon import kiya gaya

// Naya Edit Modal import kiya gaya
import { EditTestimonialModal } from "@/components/admin/EditTestimonialModal";

export default function ManageTestimonialsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  
  // --- Redux State ---
  const { testimonials, loading, pagination } = useSelector(
    (state: RootState) => state.testimonials
  );

  // --- Local Component State ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- Form State (Sirf Add Modal ke liye) ---
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [productName, setProductName] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchTestimonials({ page: 1, limit: 10 }));
  }, [dispatch]);
  
  // --- Page Change Handler ---
  const handlePageChange = (page: number) => {
    dispatch(fetchTestimonials({ page, limit: 10 }));
  };

  // --- Form Reset for Add Modal ---
  const resetForm = () => {
    setName("");
    setLocation("");
    setProductName("");
    setVideoFile(null);
    setThumbnailFile(null);
  };

  // --- Handlers ---
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !productName || !videoFile || !thumbnailFile) {
      toast({ title: "Error", description: "Please fill all fields and upload both files.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("productName", productName);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);
    try {
      await dispatch(createTestimonial(formData)).unwrap();
      setIsAddModalOpen(false);
      resetForm();
      dispatch(fetchTestimonials({ page: 1, limit: 10 }));
    } catch (error) {
        // Error toast slice me handle ho raha hai
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEditModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTestimonialToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (testimonialToDelete) {
      await dispatch(deleteTestimonial(testimonialToDelete));
      if (testimonials.length === 1 && pagination.currentPage > 1) {
        handlePageChange(pagination.currentPage - 1);
      } else {
        handlePageChange(pagination.currentPage);
      }
      setTestimonialToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Fill in the details and upload the video files.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name-add" className="text-right">Name</Label><Input id="name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="productName-add" className="text-right">Product</Label><Input id="productName-add" value={productName} onChange={(e) => setProductName(e.target.value)} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="location-add" className="text-right">Location</Label><Input id="location-add" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="video-add" className="text-right">Video</Label><Input id="video-add" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="thumbnail-add" className="text-right">Thumbnail</Label><Input id="thumbnail-add" type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="col-span-3" /></div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Testimonial"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
      </Dialog>
      
      {/* Edit Modal */}
      {selectedTestimonial && (
        <EditTestimonialModal 
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          testimonial={selectedTestimonial}
        />
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={() => { resetForm(); setIsAddModalOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Product Reviewed</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial._id}>
                  <TableCell>
                    <Image src={testimonial.thumbnailUrl} alt={testimonial.name} width={80} height={45} className="rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.productName}</TableCell>
                  <TableCell>{testimonial.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(testimonial)}>
                        <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(testimonial._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No testimonials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!loading && pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
            <Button
                key={page}
                variant={pagination.currentPage === page ? 'default' : 'outline'}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Button>
            ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the testimonial.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Yes, delete it
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}