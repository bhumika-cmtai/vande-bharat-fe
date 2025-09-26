"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogFormSchema, BlogFormValues } from '@/lib/validators/blog';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { createBlogPost } from '@/lib/redux/slices/blogSlice';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// --- UI कंपोनेंट्स ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

// ===== मुख्य बदलाव: RichTextEditor को केवल क्लाइंट-साइड पर लोड करें =====
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false, // यह Next.js को बताता है कि इसे सर्वर पर रेंडर न करे
  loading: () => <div className="min-h-[250px] w-full rounded-md border border-input bg-background animate-pulse" />, // लोडर दिखाएं
});


interface AddBlogFormProps {
  onSuccess: () => void;
}

export const AddBlogForm = ({ onSuccess }: AddBlogFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      status: 'draft',
      featuredImage: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: BlogFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('excerpt', values.excerpt);
    formData.append('content', values.content);
    formData.append('category', values.category);
    formData.append('status', values.status);
    formData.append('tags', values.tags || '');
    formData.append('featuredImage', values.featuredImage[0]);

    const resultAction = await dispatch(createBlogPost(formData));
    
    if (createBlogPost.fulfilled.match(resultAction)) {
      onSuccess();
      form.reset();
      // एडिटर को रीसेट करने की ज़रूरत नहीं, क्योंकि वह फॉर्म के रीसेट होने पर अपने आप हो जाएगा
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="title" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="Blog post title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="category" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Personal Care">Personal Care</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Company News">Company News</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        
        <FormField name="excerpt" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Excerpt (Short Summary)</FormLabel>
            <FormControl><Textarea placeholder="A brief summary of the blog post, visible on the blog list page." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField name="content" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              {/* अब हम अपने नए RichTextEditor कंपोनेंट का उपयोग कर रहे हैं */}
              <RichTextEditor content={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="tags" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl><Input placeholder="e.g., skincare, wellness, ayurveda" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="status" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        
        <FormField name="featuredImage" control={form.control} render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormLabel>Featured Image</FormLabel>
            <FormControl><Input type="file" onChange={(e) => onChange(e.target.files)} {...rest} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
                </>
            ) : (
                'Create Post'
            )}
            </Button>
        </div>
      </form>
    </Form>
  );
};