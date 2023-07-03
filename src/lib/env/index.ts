import "dotenv/config"

import { z } from "zod"

import { logger } from "@/lib/logger"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("debug"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  COMPLIANCE_API_URL: z.string().default("https://compliance-api.cubos.io"),
  COMPLIANCE_EMAIL: z.string(),
  COMPLIANCE_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  logger.error("Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables")
}

export const env = _env.data
