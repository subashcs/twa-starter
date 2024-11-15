// // app/api/telegram/route.js
// import { NextRequest } from 'next/server';
// import { Telegraf, Markup } from 'telegraf';

// const bot = new Telegraf(process.env.BOT_TOKEN);

// // Define bot commands
// bot.start((ctx) =>
//   ctx.reply(
//     'Welcome to my bot! Click the button below to launch the app.',
//     Markup.inlineKeyboard([
//       Markup.button.url('Launch Now', process.env.NEXT_PUBLIC_APP_URL), // Replace with your Next.js app's home URL
//     ]),
//   ),
// );

// bot.help((ctx) => ctx.reply('Here are the available commands: /start, /help'));

// bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

// // Export the handler for the API route
// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   await bot.handleUpdate(body); // Handle Telegram updates
//   return new Response('OK', { status: 200 }); // Respond to Telegram webhook
// }

// export async function GET() {
//   return new Response('Not found', { status: 404 }); // Respond for unsupported GET requests
// }

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';

const token = process.env.BOT_TOKEN;

if (!token)
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, 'std/http');
