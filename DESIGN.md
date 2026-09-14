---
name: Gabriel Carvalho — Construction to Product
description: A dark editorial product dossier with original interface studies.
colors:
  primary: '#c3ed83'
  primary-hover: '#d5f5a9'
  primary-ink: '#182013'
  neutral-bg: '#0b0e0c'
  neutral-surface: '#141a16'
  neutral-text: '#f1f2ed'
  neutral-muted: '#a5ada6'
  neutral-rule: '#303830'
typography:
  display:
    fontFamily: 'Instrument Sans, sans-serif'
    fontSize: 'clamp(50px, 5.65vw, 82px)'
    fontWeight: 500
    lineHeight: 1.045
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Instrument Sans, sans-serif'
    fontSize: 'clamp(30px, 3.25vw, 47px)'
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: '-0.035em'
  title:
    fontFamily: 'Instrument Sans, sans-serif'
    fontSize: 'clamp(27px, 2.7vw, 39px)'
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Instrument Sans, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, monospace'
    fontSize: '11px'
    letterSpacing: '0.065em'
rounded:
  tag: '3px'
  control: '4px'
  header-action: '5px'
  preview: '6px'
  product-window: '9px'
spacing:
  compact: '8px'
  small: '12px'
  medium: '16px'
  control: '24px'
  roomy: '32px'
  showcase: '64px'
  section: '112px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-ink}'
    rounded: '{rounded.control}'
    padding: '14px 20px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  text-link:
    textColor: '{colors.neutral-text}'
    padding: '0'
  filter:
    textColor: '{colors.neutral-muted}'
    padding: '18px 0 20px'
  filter-selected:
    textColor: '{colors.primary}'
  project-preview:
    rounded: '{rounded.preview}'
  navigation:
    textColor: '{colors.neutral-muted}'
---

# Design System: Gabriel Carvalho

## Overview

**Creative North Star: "Construction to Product"**

A crafted product dossier pairs spacious dark editorial pages with precise, original interface compositions. Gabriel connects product thinking, interface design and implementation; measured typography, restrained acid accents and framed interface studies make that connection tangible.

This is a code-led system established through the user's explicit delegation. Seed **0501526e**, grounded candidate **3** (component construction dossier), remains the direction record. The concept helper ran without network catalog boards; there is no approved image comp or challenger board. The supplied brief takes precedence over randomized skill choices. The original rejection of neon-heavy gamer styling, generic feature cards and fake terminals remains binding.

The original first-surface contract is preserved as provenance: discover the approach, inspect selected work, explore full cases, then understand the builder and process. The home first viewport combines a left-aligned three-line headline and two navigation actions with the layered product composition at right and the framed gc mark in navigation. This is a home composition, not a universal page template.

**Key Characteristics:**

- Dark editorial space with a single restrained acid accent.
- Original interface studies and construction layers.
- Framed gc monogram, project indices and quiet technical metadata.
- Alternating showcases and offset project-index rhythm.
- Portuguese content with visible focus and reduced-motion support.

## Colors

Green-tinted charcoal, warm pale text and soft acid-green emphasis define the palette. Frontmatter values are the normative extracted tokens.

### Primary

- **Soft Acid Green** (`primary`): hero emphasis, primary actions, selected filters, stage controls, focus and project indices.
- **Pale Acid Green** (`primary-hover`): primary-button hover feedback.
- **Forest Ink** (`primary-ink`): readable text on the primary action.

### Neutral

- **Green Charcoal** (`neutral-bg`): page canvas and navigation foundation.
- **Raised Forest** (`neutral-surface`): quiet interactive surface feedback.
- **Warm Chalk** (`neutral-text`): headings and primary text.
- **Sage Gray** (`neutral-muted`): supporting copy and inactive navigation.
- **Forest Rule** (`neutral-rule`): section rules and control outlines.

Project artwork uses contextual brown, olive, gray-green and blue-green backdrops. They support individual studies and are not additional global action colors.

**The Accent Role Rule.** Use the acid accent for emphasis, identity and interaction; preserve the dark editorial canvas around it.

## Typography

**Display Font:** Instrument Sans, with sans-serif fallback.  
**Body Font:** Instrument Sans, locally served from `public/fonts/instrument-sans.woff2` with swap loading.  
**Label/Mono Font:** SFMono-Regular, Consolas, Liberation Mono, monospace.

**Character:** The single sans family connects editorial headlines to interface work. Monospace belongs to project indices and technical metadata.

### Hierarchy

- **Display:** frontmatter describes the desktop home headline. Case headlines use `clamp(42px, 5.8vw, 80px)` with line-height 1.08.
- **Headline:** section headings use the headline role and balanced wrapping.
- **Title:** featured project titles use the title role; index titles are 26px desktop and 25px mobile.
- **Body:** the body role supplies the document default. Hero supporting text uses 14px/1.8 and a 455px maximum width; project descriptions use 13px/1.8 and a 350px maximum width.
- **Label:** the mono role supplies base metadata. Individual indices and illustration annotations use smaller sizes. Miniature artwork text is part of a decorative interface study, not the reading hierarchy.

**The Reading Hierarchy Rule.** Keep live explanatory copy distinct from tiny illustration annotations.

The seed proposed a 12/14/16/20/28/40/64/88px scale and tracking no tighter than -.04em. Extracted roles supersede that provisional scale. Headings follow the tracking guidance; the gc logotype deliberately uses tighter tracking (-.06em).

## Layout

The desktop container is `min(100% - 112px, 1328px)`, yielding **56px side gutters at 1440px**. The seed's 64px gutter was provisional. The dossier has 12-column visual logic; source layouts implement custom two-column ratios rather than a universal twelve-column grid.

The desktop hero uses 1.08fr/1fr columns and viewport-aware height (minimum 710px, maximum 920px). Featured projects alternate 1.55fr/1fr and 1fr/1.55fr with a 64px gap. The index uses two equal columns, a 36px column gap and a 65px row gap; every even card starts 90px lower. Case facts begin with four proportional columns.

- **1600px and above:** hero gap expands to 65px and artwork height to 510px.
- **1100px and below:** side gutters become 32px, header height becomes 82px and the header action disappears. Hero height becomes content-driven with a 680px minimum; its headline uses `clamp(48px, 5.7vw, 63px)`.
- **767px and below:** gutters become 22px, header height becomes 76px and navigation becomes a fixed mobile panel. Hero text precedes centered artwork in one column. The headline uses `clamp(42px, 8.95vw, 64px)` with line-height 1.09. Sections use 67px vertical padding. Featured projects stack artwork above copy; the project index becomes one column with 43px gaps and no alternating offset.
- **380px and below:** gutters become 20px and the hero headline is 42px. Artwork and supporting metadata receive further reductions.

The seed's spacing rhythm (8/12/16/24/32/48/64/96/128px) remains provenance, not a claim of a rigid implemented scale. Frontmatter captures recurring source values; standard desktop sections use the section token, with composition-specific exceptions.

## Elevation & Depth

The shell relies on tonal layering and fine rules. Cast shadows belong to framed artwork and floating pieces, making interface construction tangible without elevating every section.

### Shadow Vocabulary

- **Product window** (`8px 28px 64px #0007`): main hero interface plane.
- **Floating specification** (`6px 15px 35px #0005`): lighter floating hero annotation.
- **Project study** (`7px 22px 40px #0004`): tilted preview artwork.
- **Case study** (`6px 24px 50px #0004`): larger case-cover interface.

**The Artwork Depth Rule.** Reserve expressive rotation and cast shadow for interface studies; use space, tone and rules for ordinary content.

## Shapes

Small softened corners retain precision: tags use the tag radius, controls the control radius, previews the preview radius and hero windows the product-window radius. One-pixel strokes separate planes. The gc mark has opposing rounded corners (`10px 0 10px 0`), a 43px square desktop frame and a 39px mobile frame. Circular status marks and arrow affordances complement the signature.

## Components

### Buttons

Refined and restrained. Primary buttons have acid fill, Forest Ink text, a 48px minimum height and a 26px icon gap. Mobile padding becomes 13px 15px with an 18px gap. Hover lightens the fill and lifts it 2px. Text links remain unfilled, have a 44px minimum height and move their directional arrow on hover.

Keyboard focus uses an acid outline (2px, offset 6px). Disabled buttons reduce opacity to 0.5 and use the not-allowed cursor.

### Chips

Technology tags are informational spans: fine olive strokes, softly rounded corners, 6px 9px padding and 9px text. Category filters are buttons in a wrapping ruled row. A pressed filter turns acid and gains a two-pixel underline; `aria-pressed` exposes selection. A live status announces the result count; an empty state offers a reset action.

### Cards / Containers

Project cards are editorial compositions rather than boxed feature panels. Each preview is a named link with a caption identifying an interface study. Artwork rests at -3 degrees and straightens with slight enlargement on hover. Desktop featured previews use a 1.3 aspect ratio; index previews use 1.38. Mobile ratios become 1.23 and 1.25.

Title links repeat the case destination. Index cards preserve the provisional year/case disclosure. Case covers and screenshots reuse contextual project backdrops. No input or form component is implemented; this system does not prescribe one.

### Navigation

The sticky header uses nearly opaque charcoal, a 10px backdrop blur and a fine bottom rule. Desktop navigation uses muted 12px text, brighter hover/current text and a small acid current-item dot.

Mobile navigation uses a 44px toggle and a full-height panel below the header. Numbered links become prominent editorial rows. Opening locks page scroll and moves focus into navigation; Escape closes and returns focus, while Tab stays inside the open controls. The footer repeats the gc identity and internal navigation. Contact content uses an internal project fallback while external channels remain empty.

### Interface Construction

The hero combines a wire plane, product window and floating specification. Controls are **Estrutura**, **Interface** and **Produto**, initially Produto. State changes affect opacity, rotation and position. Decorative interface content is hidden from assistive technology.

State transitions use `cubic-bezier(0.16, 1, 0.3, 1)`, with short control feedback and longer artwork transitions. Hero entry lasts 0.9s. Supported native page transitions use 120ms outgoing and 180ms incoming durations. Reduced motion removes animation and transitions, restores normal scrolling and keeps content visible. There is no custom cursor.

The original 44px minimum-touch-target intent is retained. Stage controls have a 36px desktop minimum height and expand to 44px on mobile; primary actions, text links and the mobile toggle have their own comfortable minimum heights.

## Motion refinement — September 2026

The original identity, typography, content and layout remain authoritative. `app/motion.css` extends the existing surface; it does not replace its visual world. Stage controls now have a 44px minimum at all widths.

- **Focal behavior:** the hero's structure state exposes navigation, content and action regions. Stage captions describe their relationship to the finished product. Fine-pointer movement offsets the planes by 5–17px; the product also turns by at most 3 degrees. Touch and reduced-motion users operate the same three buttons without pointer effects.
- **Project continuity:** previews and their destination covers share `cover-{slug}` as a native view-transition name. Project links intentionally use document navigation to activate cross-document transitions. Next.js still serves the routes. Browsers without support navigate normally; reduced motion opts out. Never delay navigation for a cosmetic exit.
- **Filter continuity:** native same-document transitions are used when available. The most recently requested filter owns the result, even when a previous transition is interrupted. Technology links in Stack open the project index with a validated `tech` query; remove clears that filter.
- **Reading orientation:** a two-pixel scroll-linked progress line, current-section navigation and quieter header framing follow the reader. The case's introductory column stays alongside its narrative on desktop. No scroll hijacking or pinned full-screen scenes.
- **Bounded authorship:** project metadata lines resolve on first entry; the profile diagram and final contact trace connect once on arrival. Process output and stack explanations change in response to selection. Essential content remains visible by default. The animated hero background follows the controls below.
- **Mobile navigation:** a short clip reveal and maximum 140ms item stagger complement the existing menu. Closed navigation remains hidden and inert. Main content is inert while open, Escape returns focus and switching to desktop removes scroll locking.
- **Optional construction mode:** the footer's `<gc />` button reveals labeled boundaries on actual page regions. Escape and a visible close control restore the normal view. This is ephemeral, local state; it does not store or transmit information.

Interaction labels use the existing 9–12px utility range. Hero wire annotations retain the artwork's 7–8px range and are decorative. Additional color literals are low-opacity acid overlays or adjacent muted greens within the existing dark-green/acid system; they are not new brand accent colors. Mechanical detector advisories on these utility sizes and tonal variations were reviewed against the incumbent styles.

Motion uses native CSS, IntersectionObserver, requestAnimationFrame and View Transitions; no motion dependency was installed. Pointer updates occur at most once per frame and stop without input. All listeners/observers are cleaned up on route changes. Durations: routine feedback 200–300ms, project navigation 460ms, first-entry marks 600–850ms. The plain reading layout remains the fallback.

## Do's and Don'ts

### Developer effects — requested expansion

The hero now has six lime SVG signal routes, a perspective construction plane and outlined code punctuation. A live source excerpt follows the actual `setStage` handler and selected layer. This is a code illustration, not a terminal or a claim about a running build. Dot texture extends through page margins; a 950ms scan accompanies project hover/focus and a 650ms light sweep acknowledges primary-button hover/focus.

The 18-second signal loops run only while the background is on screen and the document is visible. A 44px pause/resume control and the system reduced-motion preference stop the movement. No animation library or JavaScript drawing loop is required. The grid is intentional for this explicitly requested developer atmosphere and extends the existing construction artwork. Amber `#e7c79a` marks source-code numbers; muted green `#82907f` marks line numbers. Mask blacks and translucent whites are compositing values, not brand colors. See `quality/refinement/EFEITOS.md` for implementation and verification.

### Do:

Process cards now use four authored SVG sequences: discovery scans and identifies points, architecture connects nodes, construction assembles modules, delivery completes an orbit and check. Sequences are finite (up to 2.4 seconds), run on entry/hover/focus/selection, and replay on repeated selection without replacing the focused button. All four rest states remain visible with reduced motion. The 2×2 selectors have diagonal cut corners, double-layer outlines and short top rails; content descriptions accompany the selected output on both desktop and mobile. `app/process-motion.css` and `components/process-glyph.tsx` own this scoped treatment.

The five sections below the selected projects now extend the engineering language explicitly requested by the owner. About uses a connected profile blueprint; Stack uses three selectable layers with preserved project links; Process uses a four-stage selector and illustrative deliverables. Services keep native disclosures and update a schematic through CSS state. The final CTA now uses dark circuitry and a lime project-launch link. The hero remains unchanged in this revision.

On mobile, stack explanations sit directly below the selected layer, and process descriptions accompany the selected deliverable below compact controls. About puts the introduction before its diagram. No ambient loop was added to these sections. Native semantics, 44px controls, reduced motion and the existing green tonal scale remain authoritative. The diagram's dotted plane, the monogram-derived asymmetric rounding and compact utility type are intentional extensions of the existing construction artwork. See `quality/refinement/SECOES.md` for verification.

- **Do** preserve the dark editorial canvas, restrained acid accent and framed gc identity.
- **Do** use original interface compositions and identify provisional cases.
- **Do** keep keyboard focus visible and honor reduced-motion preferences.
- **Do** stack complex compositions for mobile and maintain the content hierarchy.
- **Do** target at least 44px for interactive touch areas.

### Don't:

- **Don't** introduce neon-heavy gamer styling, generic feature-card layouts or fake terminals.
- **Don't** add contact or social channels; the user explicitly requested none.
- **Don't** present authored interface studies as verified client screenshots.
- **Don't** invent years, clients, results or professional experience.
- **Don't** hide essential content while waiting for JavaScript or motion.

## Creative expansion — 8 September 2026

Hero ribbon update, 9 September: a nested `.ribbon-rotor` now completes a continuous 60-second rotation independently of the existing scroll/parallax wrapper. Its CSS play state reuses the hero backdrop's visibility and pause attributes via `:has()`, with no additional observer or drawing loop. Pause/resume keeps the current angle; offscreen/hidden states suspend playback, and reduced motion retains the static artwork. `verify-effects.mjs` now checks rotation changes, frozen angles during pause, resumption and offscreen/reduced-motion states.

The owner explicitly authorized stronger backgrounds, composition, depth, scroll motion and typography across the existing site. `app/creative.css` is the final presentation layer and supersedes earlier dimensions above. The content, palette, Instrument Sans, routes, controls and case disclosures remain unchanged.

Contact background update, 9 September: the owner subsequently requested more animated, technical scenery in the final CTA. Its ribbon and static circuit were replaced by `ContactAtmosphere` and `app/contact-atmosphere.css`: six octagonal perspective gates travel on staggered 18-second cycles, while six packet traces traverse the connections in 8 seconds. The dark forest canvas (#0b120e, #152519) and directional masks protect text contrast. Borders #45533c/#526149 and muted text #c1cbb9 reuse existing green tones; the pause control uses the incumbent 9–10px utility scale. All motion pauses offscreen, when the document is hidden, or using the visible pause button. Reduced motion retains separated static gates. The hero ribbon is unchanged. No library or drawing loop was added. `verify-contact-atmosphere.mjs` verifies six widths, actual packet motion, pause/resume via keyboard, offscreen suspension, reduced motion, desktop/mobile axe and the project CTA.

The visual thread is a folded continuous ribbon. `SignalSculpture` projects a mathematical surface into 25 longitudinal SVG paths and 48 cross-lines, rendered by the server. The hero receives this artwork as server-rendered children, so layer selection does not recompute it. The sculpture sits behind the existing product planes and returns at the final CTA. A native view timeline gives it restrained rotation and vertical travel; unsupported browsers retain the static sculpture. Pointer displacement reuses the existing event-driven, cleaned-up Experience handler. The hero pause button also freezes the ribbon's scroll animation. Reduced motion disables all movement; no new library or JavaScript drawing loop was added.

The lime toolkit strip creates a deliberate transition into the gallery. The first featured project has a 2.05:1 panoramic stage above a two-column caption at widths over 1100px; other projects preserve their alternating composition. Mobile uses a 1.15:1 stage. Project indices are enlarged decorative repetitions of real project IDs. The fine grid belongs to the interface-study stage, not a universal page background. Images retain their shared-element transition names and the original case destinations.

Display sizes now peak at 88px in the hero, 92px for the selected-work heading, 67px in About and 82px at the final CTA. The decorative footer lettering and project IDs may be larger; they carry no essential information. Body text in project summaries increases to 14–15px. Utility text retains the existing 9–13px range. New adjacent olive surfaces (#111810, #192417, #192514), muted olive type (#88987c, #b3bfa9), translucent lime/white strokes and black shadows are intentional tonal extensions, not additional brand accents. Asymmetric 12–38px corner cuts extend the monogram language; the final circular CTA is a deliberate counterpoint. Typography and shape detector advisories were evaluated against this authorized expansion.

Entry choreography is concentrated on editorial titles and project captions; all content starts visible. The process cards retain their four distinct finite animations. The services introduction stays alongside its disclosures on desktop. The large footer signature completes the reading path. No scroll hijacking, audio, contact channels or invented achievements were introduced.

Verification: `scripts/verify-creative.mjs` checks seven widths, desktop/mobile axe, pointer response, actual scroll-linked transforms, reduced motion and no-JavaScript content. `scripts/verify-ui.mjs` covers nine widths, all eight routes, filters, navigation, mobile menu and service/hero controls. Reports and paired screenshots are in `quality/refinement/`; current Lighthouse reports are in `quality/`.

## Footer refinement — 9 September 2026

The owner rejected the oversized Gabriel lettering. This revision supersedes the monumental footer signature described above. `components/footer.tsx` and the `closing-*` rules in `app/creative.css` define a compact three-column ending: framed gc identity and signature, internal navigation, and an interface-construction button. Mobile places identity and navigation in two columns with the inspection button spanning the next row. A quiet base carries copyright and the return-to-top link. Dark olive surfaces, fine rules, acid accents and asymmetric corners continue the existing system.

The inspection button preserves Experience's construction mode. Its decorative SVG separates interface layers on hover, keyboard focus and active state; a finite 1.2-second trace draws on entry. Reduced motion keeps the diagram static, and no library was added. `aria-labelledby` uses the visible action, switching between “Ver a construção” and “Sair da construção” with `aria-pressed`; `aria-describedby` supplies the explanatory copy. No contact channels were added.

Recorded verification in `quality/refinement/footer-report.json` covers seven widths from 375px to 1920px, reports no errors, and records zero axe violations at 390px and 1440px.

Hero update, 14 September: removed the rotating ribbon entirely at the owner’s request, including its SVG component and obsolete motion styles. The circuit backdrop and interactive product layers remain. Verification scripts no longer depend on the removed sculpture.
