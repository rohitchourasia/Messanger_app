import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import prisma from '@/app/libs/prismadb';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { authOptions } from "@/app/libs/auth";
 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

