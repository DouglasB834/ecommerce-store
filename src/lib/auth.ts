import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient), //adpter prisma
  providers: [
    //provedor de auth pode ter varios
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
