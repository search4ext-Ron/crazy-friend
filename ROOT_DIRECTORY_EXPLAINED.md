# Root Directory Explained

## Your Project Structure

```
Crazy Friend/                    ← This is the ROOT of your GitHub repository
├── client/                      ← Frontend code (React)
│   ├── src/
│   ├── package.json
│   └── ...
├── server/                      ← Backend code (Node.js/Express) ⭐ THIS IS THE ROOT DIRECTORY
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── README.md
└── ...
```

## For Render.com

When Render clones your GitHub repository, it starts at the **root** of the repo.

Since your backend code is in the `server/` folder, you need to tell Render:

**Root Directory: `server`**

This tells Render: "The code I want to deploy is in the `server` subdirectory, not at the root."

---

## In Render.com Settings

When you're configuring your Web Service:

1. **Root Directory field:** Type `server` (just the word "server", no slash, no quotes)

That's it! Render will then:
- Look for `package.json` in the `server/` folder
- Run build commands from the `server/` folder
- Run start commands from the `server/` folder

---

## Visual Guide

```
GitHub Repository Root
└── Crazy Friend/
    ├── client/          ← Frontend (deployed to Vercel)
    └── server/          ← Backend (deploy THIS to Render)
        ├── src/
        ├── package.json ← Render looks for this
        └── ...
```

**Render Root Directory:** `server`

---

## Quick Answer

**In Render.com, set Root Directory to:**
```
server
```

(Just type the word "server" - that's it!)

