import { PrismaClient } from "@prisma/client"

import { env } from "@/lib/env"

const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
})

export default prisma
