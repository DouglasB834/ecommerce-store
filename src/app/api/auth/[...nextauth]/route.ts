// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

// import { prismaClient } from "@/lib/prima";

// export default NextAuth({
//   adapter: PrismaAdapter(prismaClient), //adpter prisma
//   providers: [
//     //provedor de auth pode ter varios
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });
//so pode importa função que de fato são rotas

const handle = NextAuth(authOptions); //fn que pega os metodos
export { handle as GET, handle as POST };
