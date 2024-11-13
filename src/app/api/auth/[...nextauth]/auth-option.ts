// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const response = await fetch('http://localhost:4000/api/auth/signup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(credentials),
//         });

//         const data = await response.json();
        
//         if (data.status) {
//           return {
//             id: data.data.user.id,
//             name: `${data.data.user.firstName} ${data.data.user.lastName}`,
//             email: data.data.user.email,
//             image: data.data.user.photo,
//             token: data.token,
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   secret: process.env.AUTH_SECRET,
// }


// // production 

// // import type { NextAuthOptions } from "next-auth"
// // import CredentialsProvider from "next-auth/providers/credentials"

// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: 'Credentials',
// //       credentials: {
// //         email: { label: 'Email', type: 'text' },
// //         password: { label: 'Password', type: 'password' },
// //       },
// //       async authorize(credentials) {
// //         const response = await fetch('http://localhost:4000/api/auth/signup', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(credentials),
// //         });

// //         // const data = await response.json();
// //         const user = await response.json();

// //         // production 
        
// //         // if (data.status) {
// //         //   return {
// //         //     id: data.data.user.id,
// //         //     name: `${data.data.user.firstName} ${data.data.user.lastName}`,
// //         //     email: data.data.user.email,
// //         //     image: data.data.user.photo,
// //         //     token: data.token,
// //         //   };
// //         // }

// //         if (user.status) {
// //           return {
// //             id: user.user.id,
// //             name: user.user.name,
// //             email: user.user.email,
// //             image: user.user.photo,
// //             token: user.token
// //           };
// //         }

// //         return null;
// //       },
// //     }),
// //   ],
// //   pages: {
// //     signIn: '/login',
// //   },
// //   secret: process.env.AUTH_SECRET,
// // }