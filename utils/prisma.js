import { PrismaClient } from "@prisma/client";

// avoid generating a new client for each page

const prisma = new PrismaClient();

export default prisma;
