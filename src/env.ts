/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Configuration for type-safe environment variables.
 * Imported through src/app/page.tsx
 * @see https://x.com/mattpocockuk/status/1760991147793449396
 */
import { z } from 'zod';

// Define the schema for environment variables
const envVariables = z.object({
  NEXT_PUBLIC_SHOW_LOGGER: z.enum(['true', 'false']).optional(),
  NEXT_PUBLIC_APP_URL: z.string(),
  BOT_TOKEN: z.string(),
});

// Parse and validate environment variables
const parsedEnv = envVariables.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  process.exit(1); // Exit if validation fails
}

// Assign validated values to process.env
Object.assign(process.env, parsedEnv.data);

declare global {
  namespace NodeJS {
    // eslint-disable-next-line
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
