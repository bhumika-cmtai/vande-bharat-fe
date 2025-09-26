// // middleware.ts (Fixed Version)
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// interface UserPayload {
//   _id: string;
//   email: string;
//   fullName: string;
//   role: 'user' | 'admin';
// }

// const getSecretKey = () => {
//   const secret = process.env.ACCESS_TOKEN_SECRET;
//   if (!secret) {
//     throw new Error('JWT Secret key is not set in environment variables!');
//   }
//   return new TextEncoder().encode(secret);
// };

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('accessToken')?.value;
//   const { pathname } = request.nextUrl;
  
//   const isAdminPath = pathname.startsWith('/account/admin');
//   const isUserPath = pathname.startsWith('/account/user');

//   // If no token and trying to access protected routes
//   if (!token) {
//     if (isAdminPath || isUserPath) {
//       const loginUrl = new URL('/login', request.url);
//       loginUrl.searchParams.set('redirect', pathname);
//       return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next();
//   }

//   try {
//     const { payload } = await jwtVerify(token, getSecretKey()) as { payload: UserPayload };
//     const userRole = payload.role;

//     // Role-based redirects
//     if (userRole === 'user' && isAdminPath) {
//       return NextResponse.redirect(new URL('/account/user', request.url));
//     }
    
//     if (userRole === 'admin' && isUserPath) {
//       return NextResponse.redirect(new URL('/account/admin', request.url));
//     }

//     // Token is valid, proceed
//     return NextResponse.next();
    
//   } catch (err) {
//     console.error('Token verification failed:', err);
    
//     // Create response that redirects to login
//     const loginUrl = new URL('/login', request.url);
//     const response = NextResponse.redirect(loginUrl);
    
//     // Clear the invalid cookie with proper attributes
//     // Match the sameSite setting from your backend
//     const isProduction = process.env.NODE_ENV === 'production';
    
//     response.cookies.set('accessToken', '', {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: isProduction ? 'none' : 'lax',
//       expires: new Date(0), // Set expiry to past date
//       path: '/' // Ensure path matches
//     });
    
//     return response;
//   }
// }

// export const config = {
//   matcher: [
//     '/account/admin/:path*',
//     '/account/user/:path*',
//   ],
// };



// new one 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Yeh line har request ko aage bhej deti hai bina token check kiye.
  // Isse koi bhi protected routes ko access kar sakta hai.
  return NextResponse.next();
}

export const config = {
  // Yeh middleware sirf in routes par chalega.
  matcher: [
    '/account/admin/:path*',
    '/account/user/:path*',
  ],
};
