# Pennat

Pennat is a modern blogging platform built with React and Vite. It supports rich-text writing, article discovery, profiles, likes, comments, and follow relationships, with Supabase as the backend and PWA support for installable, offline-aware usage.

**Features**
- Email/password authentication
- Rich-text article writing with Tiptap
- Read articles with likes and comments
- User profiles with follow/follower lists
- Search, timelines, and home feed
- PWA install prompt and offline detection
- Light/dark theme toggle

**Tech Stack**
- React 19 + React Router
- Vite + Vite PWA
- Tailwind CSS v4
- Supabase (auth + database)
- Cloudinary (image hosting)
- Tiptap editor

**Getting Started**
1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at the project root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

3. Run the dev server

```bash
npm run dev

```

**Scripts**
- `npm run dev` Start the dev server
- `npm run build` Build for production
- `npm run preview` Preview the production build
- `npm run lint` Lint the codebase
- `npm run deploy` Deploy the `dist` folder with `gh-pages`

**Supabase Tables (expected)**
The UI references these tables/columns.
- `UserTable` (user_id, name, username, profile_img, about, ...)
- `ArticleTable` (article_id, author_id, title, body, likes, comment_count, created_at, view_count, images, ...)
- `CommentTable` (comment_id, article_id, user_id, comment, created_at, ...)
- `LikesTable` (article_id, user_id)
- `FollowTable` (follower_id, following_id)

**PWA**
PWA is enabled via `vite-plugin-pwa` and set to `autoUpdate`. Manifest settings live in `vite.config.js`.

**Project Structure**
```
src/
  components/    UI + feature components
  context/       React contexts for user/data/theme
  config/        Supabase client
  utils/         Helpers
  assets/        Static assets
```
