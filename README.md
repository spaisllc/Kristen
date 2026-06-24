# Kristen — Birthday Mockup Site

> Interactive birthday card for Kristen, disguised as her hypothetical puppy-influencer brand site. Easter-egg hunt → surprise reveal. Ships to GitHub Pages.

**Recipient:** Kristen Veretto (IG: @kristen.veretto)
**Occasion:** Birthday (was Monday 2026-06-22; deliver Friday 2026-06-26)
**Live URL target:** https://spaisllc.github.io/Kristen/

---

## The concept

Two things at once:

1. **A genuinely awesome birthday card** for a friend Paotie has known 5 years.
2. **A working sample** of what Kristen's hypothetical puppy-monetization site could look like — she has mentioned wanting to monetize her puppy. The mockup is the gift AND a preview of "what if."

This also doubles as a test of the **Paotie Agentic OS client-mockup workflow** — same pattern as the LPEPC mockup that preceded the full rebuild. Future clients get this treatment too.

## The experience

- Lands on what looks like a polished puppy-influencer brand site (Hero, Meet [puppy], Adventures, Merch, Sponsorships, Blog cards — all mock content)
- **3–4 easter eggs woven through the page** — a click target, a hover, a hidden word, maybe the favicon. Each unlocks the next clue. Discoverable but not frustrating.
- Final clue → confetti + a personal "Surprise! Happy Birthday, Kristen!" reveal with a short message panel from Paotie
- Mobile-first — Kristen will open it on her phone

## Tone

**Playful + silly + classy + elegant.** Champagne-tier silly, not Vegas-tier silly. The joke lands harder because the mockup is taken seriously.

## Visual direction

- **Palette: gold-forward.** Her favorite color. Brushed-gold / champagne accents on a clean dark or cream base — not garish, not glitter. Classy.
- **Type:** Elegant serif for body / headlines; playful display font reserved for easter-egg breadcrumbs and the final reveal.
- **No AI-slop tells.** No purple-to-blue gradient hero. No icon-grid-of-three generic features. No "Get Started Today" CTA. Specific, named, real.

## About Kristen

- 5-year friend of Paotie's; they work together at a restaurant
- Top-notch server — great at her job, great smile, always friendly, great sense of humor
- Adores her puppy (name + breed TBD — Researcher: see if @kristen.veretto IG gives anything; otherwise flag for Paotie to drop)
- Has talked about monetizing the puppy — hence the mockup-brand-site angle

## Stack

- Vanilla HTML + CSS + JS, no framework
- Single-page site (multiple sections, one file or split per concern)
- GitHub Pages from `main` branch root
- Public repo `spaisllc/Kristen` (it's a birthday card — public is fine)
- No backend, no analytics, no real auth or commerce — it's a mockup

## Assets

- Paotie will provide 2–3 photos of Kristen (and ideally the puppy) — landing in `/assets/` when delivered
- Until photos arrive, use tasteful CSS-only placeholders (gold gradient blocks with shimmer, framed silhouette, etc.)

## Acceptance criteria

- [ ] Lands cleanly on mobile (test viewport 375×812 minimum)
- [ ] Reads as a believable puppy-brand site at first glance — the joke is layered
- [ ] 3–4 easter eggs implemented, each leading toward the reveal
- [ ] Final reveal: confetti + personal message panel, clearly attributed to Paotie
- [ ] Gold-forward palette, classy not garish
- [ ] No console errors
- [ ] No AI-slop visual patterns (see Webmaster voice file: `~/.hermes/profiles/webmaster/shipping/discipline.md`)
- [ ] Live at https://spaisllc.github.io/Kristen/ before Friday 2026-06-26 EOD

## Out of scope

- No real backend, database, or analytics
- No real puppy-influencer business logic — every "buy" / "subscribe" / "book" button is decorative
- No SEO concerns — this is temporary
- No Cloudflare / custom domain — the GitHub Pages URL is fine

## Crew pipeline

1. **Researcher** — current trends in pet/puppy-influencer brand sites + interactive easter-egg UX patterns + gold-palette inspiration. Also: attempt @kristen.veretto IG for any public info on the puppy (name, breed, vibe). Deliver inspiration brief + a few example URLs Builder can reference.
2. **Builder** — implement per brief + Researcher's inspiration. Commit to `main`. Push.
3. **Code-Reviewer** — review the diff. Look for AI-slop tells, mobile responsiveness, easter-egg discoverability, accessibility basics.
4. **Paotie + Claude (Code)** — final review together, tweak copy and timing, drop in real photos.
5. **Ship** — enable GitHub Pages, verify live URL, send to Kristen on Friday.

---

*Tracked in Paperclip — see SPR ticket created at intake.*
