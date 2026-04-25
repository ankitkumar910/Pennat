# Pennat 📰

Welcome to **Pennat** — a modern blogging platform where writing feels fast, reading feels social, and the app can live on your home screen like a real installable product 📲✨

With Pennat you can:
- Write rich articles (Tiptap) 
- Discover posts via feeds + search 
- Like, comment, and follow creators
- Build your profile + vibe 
- Install as a PWA (offline-aware + auto updates)
- Toggle light/dark themes

---

## Quick Tour 🚀

### If you’re here to read 👀
- Browse timelines + home feed 
- Search for articles 
- Like and comment 
- Follow people and keep up with them 

### If you’re here to write ✍️
- Publish with a rich-text editor (Tiptap) 
- Add images (Cloudinary) 
- Track engagement (likes/comments/views as supported by the UI) 

---

## What Pennat is built with 🧰

- **React 19** ⚛️ + **React Router** 
- **Vite** ⚡ + **Vite PWA** 
- **Tailwind CSS v4** 🎨
- **Supabase** (Auth + Postgres database) 
- **Cloudinary** (image hosting) 
- **Tiptap** (editor) 📝

---

## Run Pennat locally 🧑‍🔧

### 0) Before you start ✅
You’ll need:
- **Node.js + npm** 
- A **Supabase** project (URL + anon key) 
- A **Cloudinary** account (cloud name + upload preset) 

### 1) Install dependencies 📦
```bash
npm install
```

### 2) Create your `.env` 🔐
Create a `.env` file at the project root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

🧠 Notes:
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is the **Supabase anon key** used by the client.
- The `VITE_` prefix is required for Vite to expose variables to the browser.

### 3) Start the app ▶️
```bash
npm run dev
```

Now open the local URL Vite prints in your terminal 🌐

---

## Common workflows

- I just want to build it 🏗️
```bash
npm run build
```

- Show me production locally 🎭
```bash
npm run preview
```

- Lint check please 🧹
```bash
npm run lint
```

- Deploy `dist` to GitHub Pages 🚢
```bash
npm run deploy
```

---


## Supabase: what the UI expects 🧾


Pennat uses Supabase for **auth + data**. The UI references these tables/columns:

- `UserTable`  
  Columns: `(user_id, name, username, profile_img, about, ...)`

- `ArticleTable`  
  Columns: `(article_id, author_id, title, body, likes, comment_count, created_at, view_count, images, ...)`

- `CommentTable`  
  Columns: `(comment_id, article_id, user_id, comment, created_at, ...)`

- `LikesTable`  
  Columns: `(article_id, user_id)`

- `FollowTable`  
  Columns: `(follower_id, following_id)`

### Make it solid checklist (recommended) 🧱✅
If you’re setting up Supabase from scratch, you’ll usually want:

- 🔑 Primary keys on `*_id` columns  
- 🔗 Foreign keys:
  - `ArticleTable.author_id -> UserTable.user_id`
  - `CommentTable.article_id -> ArticleTable.article_id`
  - `CommentTable.user_id -> UserTable.user_id`
  - `LikesTable.article_id -> ArticleTable.article_id`
  - `LikesTable.user_id -> UserTable.user_id`
  - `FollowTable.follower_id/following_id -> UserTable.user_id`
- 🧷 Unique constraints:
  - `LikesTable (article_id, user_id)` unique
  - `FollowTable (follower_id, following_id)` unique
  - `UserTable.username` unique (if usernames are public identifiers)



---


## Cloudinary setup (images) ☁️🖼️

Pennat uploads images to Cloudinary using:
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

Make sure your **upload preset** supports the upload mode you’re using (often unsigned) and the resource types you need ✅

---

## PWA (installable app mode) 📲

Pennat is PWA-enabled via `vite-plugin-pwa` and configured with `autoUpdate`.

- Manifest settings live in `vite.config.js` 🧩
- For the most realistic PWA behavior locally, use:

```bash
npm run build
npm run preview
```

Installability depends on browser rules (localhost is usually OK) 🌍

---

## Project structure (where to look first) 🗺️

```
src/
  components/    UI + feature components
  context/       React contexts for user/data/theme
  config/        Supabase client
  utils/         Helpers
  assets/        Static assets
```


---

## Contributing 🤝

Want to help?
- Run `npm run lint` before opening a PR ✅
- Keep PRs small and focused (one feature/fix per PR) 🎯



