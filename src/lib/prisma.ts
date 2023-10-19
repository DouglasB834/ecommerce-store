// para evitar que o prisma client tenha mais de uam instancia

import { PrismaClient } from "@prisma/client";
declare global {
  var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (global.cachePrisma) {
    global.cachePrisma = new PrismaClient();
  }
  prisma = global.cachePrisma;
}

export const prismaClient = prisma; //importa o L:8 let prisma
