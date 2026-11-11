# Shelf Check

Compare makeup and skincare products: ingredients and toxicity flags, cruelty-free / vegan / plastic-free, price per ml, and reviews.

- **Scan** screenshots from any shop or review site, or photos of the box. Every product on the screen gets added on its own.
- **Paste a link** to a product page. The server opens it and pulls out the products.
- **Share to the app** from your phone's share sheet (Android, after "Install app" / "Add to Home screen").
- Your shelf is saved on your own device. The server stores nothing.

## Deploy on Railway

1. Put this folder in a GitHub repository.
2. Go to [railway.com](https://railway.com), sign in with GitHub, then **New Project → Deploy from GitHub repo** and pick the repo.
3. Open the service, go to **Variables**, and add at least one AI key (see below).
4. Under **Settings → Networking**, tap **Generate Domain**. That's your website link.

Railway detects Node automatically and runs `npm start`. No other setup is needed.

## AI keys (pick one or both)

| Variable | Where to get it | Cost |
|---|---|---|
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) → Get API key | Free tier, with daily limits |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API keys | Paid. Uses Claude Haiku 5.5, about $0.001 per scan |

If you set both, the free one is tried first and the paid one is only used when the free one fails or hits its limit.

Without any key, links still work for shops that publish product data (name, price, rating), but you won't get ingredients, review summaries or screenshot scanning.

## Optional settings

| Variable | Default | What it does |
|---|---|---|
| `DAILY_AI_LIMIT` | `300` | Maximum AI reads per day for the whole site. This caps your bill. |
| `PER_IP_PER_HOUR` | `20` | Maximum AI reads per visitor per hour. Stops abuse. |
| `AI_PROVIDER` | `auto` | `auto` = free first, then paid. `anthropic` = paid first. |
| `GEMINI_MODEL` | `gemini-flash-latest` | Change if Google renames its models. |
| `ANTHROPIC_MODEL` | `claude-haiku-5-5` | Claude model used. |

## Run it on a computer

```bash
npm install
GEMINI_API_KEY=your-key npm start
# open http://localhost:3000
```

## Notes

- Some big shops block automatic reading. For those, the app suggests a screenshot instead.
- Pasted links are checked so the server can't be pointed at private or internal addresses.
- Ingredient scores come from a built-in list based on EU cosmetics rules, IARC classifications and common dermatology concerns. This is not medical advice.
