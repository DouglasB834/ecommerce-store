import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handle = NextAuth(authOptions); //fn que pega os metodos
export { handle as GET, handle as POST };
