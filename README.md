# Meridian

Your leadership operating system. Runs on Vercel, data lives in Notion.

## Files

```
meridian.html     — the app
api/notion.js     — serverless function (proxies Notion API)
vercel.json       — routing config
```

## Deploy to Vercel via GitHub (one-time setup)

### Step 1 — Push to GitHub
1. Go to github.com → New repository → name it `meridian` → Create
2. Upload all three files (meridian.html, api/notion.js, vercel.json)
   - Click "uploading an existing file" on the repo page
   - Drag all three files in → Commit changes

### Step 2 — Connect to Vercel
1. Go to vercel.com → Log in with GitHub
2. Click "Add New Project" → Import your `meridian` repository
3. Leave all settings as default → click Deploy
4. Vercel gives you a URL like `https://meridian-abc123.vercel.app`

### Step 3 — Open and connect
1. Open your Vercel URL in any browser
2. Click Settings in the top-right
3. Enter your Notion integration token and the 5 database IDs
4. Click Connect and launch

Your credentials are saved in browser local storage on that device.
Bookmark the Vercel URL on your tablet for one-tap access.

## Updating the app
Push any change to GitHub → Vercel redeploys automatically in ~30 seconds.

## Database IDs (from your Notion workspace)

| Database | ID |
|---|---|
| Goals   | 14368e17-3fe3-4f7d-91c3-45e45dc3553a |
| Metrics | 15720b63-9842-49f8-ac05-63ef81aba8a7 |
| Team    | 0bff2f48-5ea5-4da3-809c-34411b36daa4 |
| Actions | 51066c4c-5466-45e9-b770-7d9e6b55c720 |
| LSW Log | 5462dac8-cc37-47bc-a017-fbac0aee5155 |
