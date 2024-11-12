import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/WithAuth';

export function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: ['/dashboard/:path*',], 
};
