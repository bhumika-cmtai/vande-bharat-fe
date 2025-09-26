import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice'
import contactReducer from './slices/contactSlice'
import couponReducer from './slices/couponSlice'
// import notificationReducer from './slices/notificationSlice'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import bulkOrderReducer from './slices/bulkOrderSlice';
import orderReducer from './slices/orderSlice'
import dashboardReducer from './slices/dashboardSlice'
import blogReducer from './slices/blogSlice'
import testimonialReducer from './slices/testimonialSlice'
import { setupInterceptors } from '@/lib/api/auth'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    contact:contactReducer,
    coupon: couponReducer,
    user:userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    bulkOrder: bulkOrderReducer,
    dashboard: dashboardReducer,
    blog: blogReducer,
    testimonials: testimonialReducer
  },
});

setupInterceptors(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store; 