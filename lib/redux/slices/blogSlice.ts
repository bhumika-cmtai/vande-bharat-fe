import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import apiClient from '@/lib/api/auth'; // मान लें कि आपके पास प्रमाणीकरण के लिए एक apiClient है

// API का बेस URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`
  : 'http://localhost:8000/api/v1/blogs';

// --- टाइप परिभाषाएँ ---

// ब्लॉग पोस्ट का टाइप
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  views: number;
  createdAt: string;
  updatedAt: string;
}

// ब्लॉग स्लाइस के स्टेट का टाइप
interface BlogState {
  posts: Blog[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  loading: boolean; // ब्लॉग की सूची के लिए लोडिंग
  error: string | null;
  selectedPost: Blog | null;
  postDetailsLoading: boolean; // एकल पोस्ट के लिए लोडिंग
  postDetailsError: string | null;
}

// ब्लॉग लाने के लिए पैरामीटर्स का टाइप
interface FetchBlogsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

// --- इनिशियल स्टेट ---

const initialState: BlogState = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
  totalPosts: 0,
  loading: false,
  error: null,
  selectedPost: null,
  postDetailsLoading: false,
  postDetailsError: null,
};

// --- एसिंक्रोनस थंक्स ---

// सभी प्रकाशित ब्लॉग्स को लाने के लिए थंक
export const fetchPublishedBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (params: FetchBlogsParams = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, String(value));
      });
      
      const response = await axios.get(`${API_BASE_URL}?${queryParams.toString()}`);
      return response.data.data; // कंट्रोलर से पूरा डेटा ऑब्जेक्ट वापस करें
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs',
  async (params: FetchBlogsParams = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, String(value));
      });
      
      const response = await axios.get(`${API_BASE_URL}/all?${queryParams.toString()}`);
      return response.data.data; // कंट्रोलर से पूरा डेटा ऑब्जेक्ट वापस करें
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

// स्लग के द्वारा एक ब्लॉग को लाने के लिए थंक
export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${slug}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog post');
    }
  }
);

// एक नया ब्लॉग पोस्ट बनाने के लिए थंक (सुरक्षित)
export const createBlogPost = createAsyncThunk(
  'blogs/createBlogPost',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // apiClient का उपयोग करें जिसमें प्रमाणीकरण टोकन शामिल है
      const response = await apiClient.post(`${API_BASE_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Blog post created successfully!");
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create blog post';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// एक ब्लॉग पोस्ट को डिलीट करने के लिए थंक (सुरक्षित)
export const deleteBlogPost = createAsyncThunk(
  'blogs/deleteBlogPost',
  async (blogId: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${API_BASE_URL}/delete/${blogId}`);
      toast.success("Blog post deleted successfully!");
      return blogId; // डिलीट किए गए ब्लॉग की ID वापस करें
    } catch (error: any){     
      const errorMessage = error.response?.data?.message || 'Failed to delete blog post';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  'blogs/updateBlogPost',
  async ({ blogId, formData }: { blogId: string, formData: FormData }, { rejectWithValue }) => {
    try {
      console.log("formdata", formData)
      const response = await apiClient.patch(`${API_BASE_URL}/update/${blogId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Blog post updated successfully!");
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update blog post';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



// --- स्लाइस परिभाषा ---

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // जब यूज़र ब्लॉग डिटेल्स पेज से बाहर जाए तो चयनित पोस्ट को साफ़ करें
    clearSelectedPost: (state) => {
      state.selectedPost = null;
      state.postDetailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBlogs के केसेस
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<{ blogs: Blog[], currentPage: number, totalPages: number, totalPosts: number }>) => {
        state.loading = false;
        state.posts = action.payload.blogs; 
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
    })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchPublishedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedBlogs.fulfilled, (state, action: PayloadAction<{ blogs: Blog[], currentPage: number, totalPages: number, totalPosts: number }>) => {
        state.loading = false;
        state.posts = action.payload.blogs; 
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
    })
      .addCase(fetchPublishedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // fetchBlogBySlug के केसेस
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.postDetailsLoading = true;
        state.postDetailsError = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.postDetailsLoading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.postDetailsLoading = false;
        state.postDetailsError = action.payload as string;
      })
      
      // createBlogPost के केसेस
      .addCase(createBlogPost.fulfilled, (state, action: PayloadAction<Blog>) => {
        // नया ब्लॉग पोस्ट सूची में सबसे ऊपर जोड़ें
        state.posts.unshift(action.payload);
      })
      
      // deleteBlogPost के केसेस
      .addCase(deleteBlogPost.fulfilled, (state, action: PayloadAction<string>) => {
        // डिलीट किया गया ब्लॉग पोस्ट सूची से हटा दें
        state.posts = state.posts.filter(post => post._id !== action.payload);
      });
  },
});

export const { clearSelectedPost } = blogSlice.actions;
export default blogSlice.reducer;