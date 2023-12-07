// import axios from 'axios';
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: "179490795092-auflgma1odpjdhheetadk6smcgcqvn1e.apps.googleusercontent.com",
//       clientSecret: "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",
//     }),
//   ],
//   callbacks: {
//     async signIn(user, account, profile) {
//         console.log(user)
//       const response = await axios.post('http://your-backend-server/api/auth/login', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: user.email }),
//       });

//       const data = await response.json();

//       if (data.statuscode === 201) {
//         return true; // Allow the sign-in
//       } else {
//         return false; // Block the sign-in
//       }
//     },
//   },
// });
