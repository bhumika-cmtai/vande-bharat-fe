import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import adminApiClient from '@/lib/api/adminClient'; // Maan lijiye aapke paas ek authenticated admin client hai
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

// --- Type Definitions ---
export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  productName: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
}
export type VideoTestimonial = Testimonial;


interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTestimonials: number;
  };
  publicTestimonials: VideoTestimonial[];
  publicLoading: boolean;
  publicError: string | null;

}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalTestimonials: 0,
  },
  publicTestimonials: [],
  publicLoading: false,
  publicError: null,

};


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : 'http://localhost:8000/api/v1';

// --- Async Thunks (API Calls) ---

// FETCH all testimonials with pagination
export const fetchTestimonials = createAsyncThunk<any, { page: number; limit?: number }>(
  'testimonials/fetchTestimonials',
  async ({ page, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await adminApiClient.get('/testimonials', { params: { page, limit } });
      console.log("---response---")
      console.log(response)
      // NOTE: Assume your backend returns a pagination object like this
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
    }
  }
);

// PUBLIC: Fetch all testimonials (Updated)
export const fetchPublicTestimonials = createAsyncThunk<VideoTestimonial[]>(
    'testimonials/fetchPublic',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/testimonials`);
        // Ab .map() ki zaroorat nahi hai. Hum seedha data return kar rahe hain.
        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch public testimonials');
      }
    }
  );

// CREATE a new testimonial using FormData for file uploads
export const createTestimonial = createAsyncThunk<Testimonial, FormData>(
  'testimonials/createTestimonial',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await adminApiClient.post('/testimonials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create testimonial');
    }
  }
);

export const updateTestimonial = createAsyncThunk<Testimonial, { id: string, formData: FormData }>(
    'testimonials/updateTestimonial',
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response = await adminApiClient.patch(`/testimonials/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
      }
    }
  );


// DELETE a testimonial
export const deleteTestimonial = createAsyncThunk<string, string>(
  'testimonials/deleteTestimonial',
  async (testimonialId, { rejectWithValue }) => {
    try {
      await adminApiClient.delete(`/testimonials/${testimonialId}`);
      return testimonialId; // Return the ID on success for filtering state
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
    }
  }
);

// --- The Slice ---
const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload && Array.isArray(action.payload.testimonials)) {
            state.testimonials = action.payload.testimonials;
            state.pagination = action.payload.pagination;
        } 
        // Agar aapka backend sirf testimonials ka array return kar raha hai
        else if (Array.isArray(action.payload)) {
            state.testimonials = action.payload;
        } 
        // Fallback
        else {
            state.testimonials = [];
        }
        // ==============================
      })

      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.testimonials = []; 
      })
      .addCase(updateTestimonial.fulfilled, (state, action: PayloadAction<Testimonial>) => {
        // State me updated testimonial ko dhundh kar replace karein
        const index = state.testimonials.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
        toast({ title: 'Success', description: 'Testimonial updated successfully.' });
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        toast({ title: 'Error', description: action.payload as string, variant: 'destructive' });
      })

      .addCase(fetchPublicTestimonials.pending, (state) => {
        state.publicLoading = true;
        state.publicError = null;
      })
      .addCase(fetchPublicTestimonials.fulfilled, (state, action: PayloadAction<VideoTestimonial[]>) => {
        state.publicLoading = false;
        state.publicTestimonials = action.payload || []; // Fallback agar payload undefined ho
      })
      .addCase(fetchPublicTestimonials.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload as string;
        state.publicTestimonials = [];
      })

      // Create
      .addCase(createTestimonial.fulfilled, (state, action: PayloadAction<Testimonial>) => {
        // We don't add it directly; we'll refetch the current page to ensure correct order and pagination.
        toast({ title: 'Success', description: 'Testimonial created successfully.' });
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        toast({ title: 'Error', description: action.payload as string, variant: 'destructive' });
      })
      // Delete
      .addCase(deleteTestimonial.fulfilled, (state, action: PayloadAction<string>) => {
        state.testimonials = state.testimonials.filter(t => t._id !== action.payload);
        toast({ title: 'Success', description: 'Testimonial deleted successfully.' });
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        toast({ title: 'Error', description: action.payload as string, variant: 'destructive' });
      });
  },
});

export default testimonialSlice.reducer;