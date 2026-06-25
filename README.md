# Kristen — Birthday Card

> Interactive birthday card for Kristen: a 7-scene linear journey through her year, with Ken Burns photo galleries, gold-forward typography, All Star auto-playing on first tap, confetti finale, and a personal blessing. Lives at the bare URL of the GitHub Pages site.

**Recipient:** Kristen Veretto (IG: @kristen.veretto)
**Occasion:** Birthday (was Monday 2026-06-22; delivering Thu/Fri 2026-06-25/26)
**Live URL:** https://spaisllc.github.io/Kristen/
**Status (as of 2026-06-24):** **v7 shipped — ready to send.** See [CHANGELOG.md](./CHANGELOG.md) for the full iteration history.

## How it was built

Most of the v3 → v7 iteration was driven through the team via Paperclip
tickets (SPR-121, SPR-132, SPR-135, SPR-137, SPR-140, SPR-143). The
dispatcher in `~/mission-control/services/dispatcher/` rendered focused
task prompts from each ticket and piped them to `hermes chat -q` for the
Researcher and Builder profiles (grok-4.3 via SuperGrok). Builder shipped
~70% of each spec; the partial-completion gaps were finished in Claude
Code. Music wiring, scene heights, and the v7 gold polish were finished
manually; everything else came from the team. Receipt verifier in the
dispatcher caught grok fabricating commit SHAs three separate runs.

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

- **Palette (updated after photo intake):**
  - Primary: gold / champagne (her favorite color)
  - Secondary: Aperol-spritz orange (callback to her party theme)
  - Tertiary: cream / off-white
  - Accent: deep base — espresso brown or muted forest green (Oakley's coat + her sweater)
  - Avoid: Vegas-gold glitter, pure black, cool-tone, corporate
- **Type:** Elegant serif for body / headlines; playful display font reserved for easter-egg breadcrumbs and the final reveal.
- **Match her aesthetic:** Warm-toned, natural-light, candid. Don't over-style.
- **No AI-slop tells.** No purple-to-blue gradient hero. No icon-grid-of-three generic features. No "Get Started Today" CTA. Specific, named, real.

## About Kristen

- 5-year friend of Paotie's; they work together at a restaurant
- Top-notch server — great at her job, great smile, always friendly, great sense of humor
- **Just turned 26** (gold "26" balloons at the party)
- **Recent birthday party theme: "Just a Spritz Older"** — Aperol Spritz aesthetic, gold + orange + cream, custom Spritz Bar setup. The site should echo this — she will catch the callback instantly.
- **Puppy is named Oakley** — Pomsky / mini husky, brown-and-white coat, striking blue eyes
- Has talked about monetizing Oakley — hence the mockup-brand-site angle
- Family-close — photos with her grandma, mom, and a sibling
- Colorado outdoorsy lifestyle — sunflower farms, pine forests, natural light
- IG aesthetic: warm-toned, candid, curated-but-not-overproduced

## Easter-egg raw material (strongest hooks to draw from)

Builder + Researcher should pick 3–4 of these — not all. Quality over density.

- **The number 26** hidden subtly in the layout (her age) — could be a price, a quantity, a coordinate
- **Aperol Spritz** glass or bottle as a click/hover target — fizz animation, fill animation, etc.
- **Oakley's eye/nose** as a click target — Pomsky portrait reveals a secret panel
- **"Just a Spritz Older"** as a tiny footnote or hidden text reveal
- **Gold "BIRTHDAY QUEEN" sash** echo in the navigation or as a cursor effect
- **A sunflower** that reveals a clue when picked / hovered
- **Konami code** or typing "OAKLEY" anywhere on the page unlocks the final reveal early

The final reveal should still feel earned — 3–4 clues, not a single click-to-win.

## Stack

- Vanilla HTML + CSS + JS, no framework
- Single-page site (multiple sections, one file or split per concern)
- GitHub Pages from `main` branch root
- Public repo `spaisllc/Kristen` (it's a birthday card — public is fine)
- No backend, no analytics, no real auth or commerce — it's a mockup

## Assets

- **6 photos delivered by Paotie on 2026-06-24** — see `/assets/CAPTIONS.md` for descriptions + per-photo best-use guidance
- Hero candidate: `01-birthday-queen.jpg` (her in the BIRTHDAY QUEEN sash under the gold Spritz banner)
- Oakley shot: `02-oakley.jpg`
- Real "26" balloons + Spritz Bar moment: `03-spritz-bar.jpg`
- Use 3–4 photos in the build; not all 6 need to land on the page

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
