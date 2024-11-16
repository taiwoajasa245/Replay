

declare module "next-auth" {
  interface Session {
    data: unknown;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null; 
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: stirng | null; 
  }
}
