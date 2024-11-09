import { fetchFromAPI } from "@/lib/api";
import NextAuth from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";


type  LoginResponse = {
  status: boolean;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      photo?: string;
    };
  };
  token: string;
  message: string;
}



const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        
        try {

          const data = await fetchFromAPI("/api/v1/replay/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          }) as LoginResponse 

          // console.log("Login API response status:", data.status);
          // console.log("Login API response data:", data.message);

     


          if (data.status) {
            return {
              id: data.data.user.id,
              name: `${data.data.user.firstName} ${data.data.user.lastName}`,
              email: data.data.user.email,
              image: data.data.user.photo,
              token: data.token,
              message: "Login successful!",
            }; 
        } else {
          console.log("Login failed:", data.message);
          throw new Error(data.message || "Login failed");
          }
        } catch (error: unknown) {
          // console.error("Error in authorize function:", error);
          const errorMessage = error instanceof Error 
          ? error.message 
          : "An error occurred during login, please try again.";
      
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }

// local test 

// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         console.log("Authorize function called with credentials:", credentials);
        
//         try {
//           const response = await fetch('http://localhost:4000/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(credentials),
//           });



//           console.log("Login API response status:", response.status);

//         //   const data = await response.json();
//           const user = await response.json();
        
//           console.log("Login API response data:", user);

//         //   if (data.status) {
//         //     return {
//         //       id: data.data.user.id,
//         //       name: `${data.data.user.firstName} ${data.data.user.lastName}`,
//         //       email: data.data.user.email,
//         //       image: data.data.user.photo,
//         //       token: data.token,
//         //     }; }
//          if (user.status) {
//             return {
//               id: user.user.id,
//               name: user.user.name,
//               email: user.user.email,
//               image: user.user.photo,
//               token: user.token
//             };
//           }else {
//             console.log("Login failed:", user.message);
//             return null;
//           }
//         } catch (error) {
//           console.error("Error in authorize function:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   secret: process.env.AUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',
// })

// export { handler as GET, handler as POST }