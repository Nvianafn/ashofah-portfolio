# ashofah.me - Portfolio

Terminal-driven portfolio for **Novian Affan Ashofah** (Backend Developer & DevOps Engineer).
Built with Next.js (App Router) + TypeScript, native CSS, Motion, and real tech logos via react-icons.

The hero has an **interactive terminal**. Try: `help`, `ls`, `cd projects`, `cat about.txt`, `tree`, `open yasu-project`, and the easter egg `sudo hire-me`. Arrow keys walk command history, Tab autocompletes file names. Language toggles between EN and ID (top right).

---

## 1. Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start   # serves on port 3000
```

> Node 18.18+ or 20+ recommended.

---

## 2. Edit your content

Everything lives in `content/` as plain JSON. No code needed.

| File | What it holds |
|------|----------------|
| `content/bio.json` | Name, role, tagline, bio, hero stats, the big statement |
| `content/projects.json` | Project cards + the terminal `projects/` folder |
| `content/stack.json` | Tech stack groups + logos (by `slug`) |
| `content/socials.json` | Email, GitHub, LinkedIn, domain |

**Tech logos:** the `slug` in `stack.json` maps to a [Simple Icons](https://simpleicons.org) name (lowercase, no spaces). Example: `Node.js` -> `nodedotjs`. If you add a tech, add its slug there and, if it is new, register it in `components/Icon.tsx`.

**A couple of placeholders to fix:**
- `content/socials.json` -> `linkedin`: I put a guessed URL (`linkedin.com/in/nvianafn`). Update it to your real profile, or set it to `""` to hide the LinkedIn icon.
- `whatsapp` is empty; leave it or wire it up later.

The GitHub contribution graph pulls **live data** for `Nvianafn` at runtime (via the public jogruber contributions API) and falls back to a generated pattern if the request fails.

---

## 3. Deploy on your VPS (Node + PM2 + Nginx)

This is the stack you already run for rowokele112.web.id, so it should feel familiar.

### 3.1 Get the code on the server

```bash
# on the VPS
sudo mkdir -p /var/www/ashofah-portfolio
sudo chown -R $USER:$USER /var/www/ashofah-portfolio
# upload the project (scp/rsync/git), then:
cd /var/www/ashofah-portfolio
npm install
npm run build
```

### 3.2 Start it with PM2

`ecosystem.config.js` is included (expects the project at `/var/www/ashofah-portfolio`; edit `cwd` if you put it elsewhere).

```bash
npm install -g pm2         # if not installed
pm2 start ecosystem.config.js
pm2 save
pm2 startup               # run the command it prints, so it survives reboots
```

The app now listens on `127.0.0.1:3000`.

### 3.3 Nginx reverse proxy

Copy `nginx.conf.example` and enable it:

```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/ashofah.me
sudo ln -s /etc/nginx/sites-available/ashofah.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Point the `ashofah.me` DNS A record at your VPS IP.

### 3.4 HTTPS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ashofah.me -d www.ashofah.me
```

Certbot rewrites the Nginx config for HTTPS and sets up auto-renewal.

### 3.5 Updating later

```bash
cd /var/www/ashofah-portfolio
git pull            # or re-upload
npm install
npm run build
pm2 reload ashofah-portfolio
```

---

## Project structure

```
app/            layout, global CSS, root page
components/     Nav, Hero, Terminal, Statement, TechStack, Projects,
                Contributions, HireMe, Footer, Icon, Reveal
lib/            content loader, i18n (EN/ID), virtual filesystem
content/        your data (JSON) - edit these
ecosystem.config.js   PM2 config
nginx.conf.example    Nginx reverse-proxy template
```

---

Built to be edited. Ship it.
