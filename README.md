# GRE Vocab App 📚⚡️  
*A focused, distraction‑free way to master GRE vocabulary—built by a test‑taker who couldn’t find a tool that actually worked.*

**Live demo → [gre‑vocab‑app.vercel.app](https://gre-vocab-app.vercel.app)**  
---

## 🎯 Why I built this
Most “GRE word lists” are either flash‑card clones or quiz apps that treat every word the same.  
When I was cramming for my own GRE I needed:

1. **Adaptive review** (so easy words stop spamming me)  
2. **Example sentences** that feel modern, not Victorian prose  
3. **Tiny, daily streaks** to keep motivation from dying at word #643  

So I scratched my own itch and open‑sourced the result.

---

## ✨ Key features
| Feature                      | What it does                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------- |
| **Spaced‑repetition engine** | Leitner‑style buckets; intervals auto‑expand as you nail words.               |
| **Context sentences**        | Each word shows 2 hand‑picked GRE‑level usages, not generic dictionary lines. |
| **Progress heat‑map**        | Tiny GitHub‑style grid shows daily review streaks.                            |

*(Upcoming)* Audio pronunciation & dark mode toggle.

---

## 🏗️ Tech stack
- **Next.js 13 (App Router) + TypeScript**  
- **Tailwind CSS** for fast UI and theming  
- **Vercel** CI / CD (preview URLs on every PR)

---

## 🚀 Local setup

```bash
# 1. clone
git clone https://github.com/alirazzaq-dev/gre_vocab_app.git
cd gre_vocab_app

# 2. install deps
pnpm install        # or npm / yarn

# 3. env (only needed for Supabase sync)
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL & ANON_KEY

# 4. dev
pnpm dev            # http://localhost:3000
