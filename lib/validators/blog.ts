import { z } from 'zod';

// फ़ाइल अपलोड के लिए नियम
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Zod का उपयोग करके ब्लॉग फॉर्म का स्कीमा
export const blogFormSchema = z.object({
  // टाइटल के लिए नियम
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot be longer than 100 characters." }),
  
  // सारांश (Excerpt) के लिए नियम
  excerpt: z
    .string()
    .min(20, { message: "Excerpt must be at least 20 characters long." })
    .max(200, { message: "Excerpt cannot be longer than 200 characters." }),
    
  // मुख्य कंटेंट के लिए नियम
  content: z
    .string()
    .min(50, { message: "Content is too short. Please write at least 50 characters." }),
  
  // कैटेगरी के लिए नियम
  category: z
    .string()
    .min(1, { message: "Please select a category." }),
    
  // टैग्स (वैकल्पिक)
  tags: z
    .string()
    .optional(),
    
  // स्थिति (Status) के लिए नियम
  status: z
    .enum(["published", "draft"], { required_error: "Please select a status." }),
    
  // फीचर्ड इमेज के लिए नियम
  featuredImage: z
    .any()
    // यह जाँचता है कि कोई फ़ाइल चुनी गई है या नहीं
    .refine((files) => files?.length >= 1, "Featured image is required.")
    // यह जाँचता है कि फ़ाइल का साइज़ 5MB से कम है
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    // यह जाँचता है कि फ़ाइल का प्रकार सही है (jpeg, png, etc.)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});


export const editBlogFormSchema = blogFormSchema.extend({
  featuredImage: z // एडिट करते समय इमेज वैकल्पिक है
    .any()
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

// Zod स्कीमा से TypeScript का टाइप बनाएँ
export type BlogFormValues = z.infer<typeof blogFormSchema>;
export type EditBlogFormValues = z.infer<typeof editBlogFormSchema>;