import { app } from "@/app"

import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

const PORT = env.PORT

app.listen(PORT, () =>
  logger.info(`Server is running at http://localhost:${PORT}`)
)
