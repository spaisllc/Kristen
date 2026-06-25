# Changelog

All notable changes to this birthday card are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); semantic dates over
semantic versions.

## [Unreleased]

## [v7] — 2026-06-24

### Added
- Cormorant Garamond + Dancing Script Google Fonts alongside Playfair Display
- Gold accent border on the Ken Burns slideshow containers
- Text-shadow on h1 and hint for legibility over photo backgrounds
- Gentle 1.1s cubic-bezier scene segue with `scale(0.96) → scale(1)`
  "bloom" reveal (replaces the earlier snap-fade)

### Changed
- h1 color cream → gold (her favorite); letter-spacing slightly relaxed
- Body font Georgia → Cormorant Garamond
- Body paragraph color D4C9B8 → cream (slightly brighter on photos)
- Progress dot color taupe → gold @ 65% opacity
- Scene 7 "Happy Birthday, Kristen!" — gold Playfair Display
  (was cream), letter-spacing + text-shadow added
- Scene 7 "~ Paotie" signature — Dancing Script gold at 1.7rem
  (was tiny taupe Georgia)

## [v6] — 2026-06-24

### Added
- 4 new photos in `assets/`: `10-tongue-selfie.jpg`, `11-cocktail-share.jpg`,
  `12-family-graduation.jpg`, `13-family-dad-kitchen.jpg`
- 2 background photos for the Ken Burns scenes: `14-kristen-collage.jpg`
  (Friends backdrop) and `15-nasturtium.jpg` (Roots backdrop)
- Ken Burns crossfade slideshow on Scene 4 (Friends) and Scene 5 (Roots) —
  JS-driven `.active` class toggle with CSS transitions, 6s per photo,
  1.2s crossfade, 7.2s `scale(1.1) → scale(1.25)` zoom

### Changed
- Scene 3 (Oakley) copy: "Blue eyes, kind mischief, and the softest fur
  and heart for a girl. Oakley is your growing boy, your little shadow."
- Scene 4 (Friends): from side-by-side collage → Ken Burns rotation of
  4 photos (08, 09, 10, 11), background = 14-kristen-collage.jpg
- Scene 5 (Roots): from side-by-side collage → Ken Burns rotation of
  4 photos (04, 06, 12, 13), background = 15-nasturtium.jpg
- Ken Burns container height min(60vh, 480px) → min(42vh, 340px) so the
  h1 + paragraph fit above the slideshow on portrait phone

## [v5] — 2026-06-24

### Added
- Hidden YouTube iframe pre-loaded with All Star (`L_jWHffIx5E`) muted +
  autoplaying. First user tap sends `unMute`/`setVolume`/`seekTo`/`playVideo`
  via postMessage in the user-gesture window (iOS Safari-safe)
- Scene 7 (final) blessing — full message: "It's time to celebrate you
  because you are a beacon of light for the people in your life. You're
  kind, sweet, a hard worker, and a great human being. And, oh! 26 looks
  great on you. Happy Birthday, Kristen! ~ Paotie"

## [v4] — 2026-06-24

### Added
- 3 new photos: `07-smile-selfie.jpg` (new opener), `08-spritz-friend.jpg`
  and `09-friends-group.jpg` (Friends scene)
- NEW Scene 4 ("Friends") between Oakley and Roots
- Total scene count 6 → 7

### Changed
- Scene 1 (opener): background `06-sunflowers.jpg` → `07-smile-selfie.jpg`
- index.html replaces the v2 puppy-brand decoy so the bare URL serves v3+
- Progress counter "1 / 6" → "1 / 7"; confetti now fires on scene 7

## [v3] — 2026-06-24

### Added
- Multi-scene linear journey (originally 6 scenes, click-to-advance)
- `kristen-v3.html` (later renamed to `index.html`)
- 800ms crossfade between scenes
- Confetti finale (60 particles, gold/orange/cream palette)
- Keyboard support (Space / Enter to advance)

### Notes
- Replaced v2's "click 4 eggs on one screen" easter-egg model with a
  walk-through journey. Each scene is the gift, not a stepping stone
  toward one.
