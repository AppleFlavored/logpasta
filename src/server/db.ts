import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const env = process.env.NODE_ENV;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: env === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (env !== "production") globalForPrisma.prisma = prisma;