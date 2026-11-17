# Instructies voor AI-codeassistenten — Cosmic Spark

Deze map bevat een **statische HTML/CSS-website**. Behandel deze niet als Next.js-, React- of Tailwind-project.

## Lees eerst

1. `DESIGN.md` (inhoudelijke en visuele ontwerpafspraken).
2. `design-tokens.css` (de bestaande kleuren, afstanden en thematokens).
3. `style.css` (bestaande componenten, responsive regels en huidige uitzonderingen).
4. De HTML-pagina('s) die je gaat wijzigen.
5. `script.js` alleen als er interactie aangepast moet worden.

## Niet onderhandelbare projectregels

- **HTML5 eerst, CSS tweede, JavaScript alleen als het functioneel nodig is.**
- Gebruik semantische elementen: `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `address`, `time` waar ze inhoudelijk passen.
- Preferente native interacties: `details`/`summary`, `dialog`, Popover API en formulierattributen. Kies niet zomaar een modal; gebruik het passende patroon.
- Gebruik voor navigatie `<a href>` en voor acties `<button>`.
- Geen framework, build-systeem, dependency of Tailwind-setup zonder expliciet verzoek.
- Laat de bestaande CSS-uitstraling zoveel mogelijk intact; pas tokens in `design-tokens.css` aan voor centrale merk- of themawijzigingen.
- Bewaar de mobiele vierdelige navigatie en de desktopnavigatie, inclusief hun huidige breakpoints, tenzij de opdracht nadrukkelijk anders vraagt.
- Houd de site bruikbaar zonder JavaScript waar dat logisch kan.
- Schrijf begrijpelijk Nederlands, geen niet-onderbouwde claims, verzonnen recensies of prijzen.
- Het contactformulier verstuurt via Web3Forms naar Kim. Toon alleen een verzendbevestiging als Web3Forms het verzenden bevestigt (`success: true`). Wijzig de `name`-attributen van de velden niet zonder reden: dat zijn de labels in de mail.
- Gebruik echte content en foto's alleen als die daadwerkelijk zijn aangeleverd of goedgekeurd.
- Streef naar WCAG 2.2 AA; claim geen formele conformiteit zonder onderzoek.

## Voor je afrondt

- Controleer 320, 375, 700, 959, 960 en 1280 CSS-pixels en 200% zoom.
- Controleer licht en donker thema, focusvolgorde, toetsenbordbediening, contrast en reduced motion.
- Check alle vijf HTML-pagina's wanneer navigatie of gedeelde CSS verandert.
- Controleer links, toegankelijke namen, afbeeldingen en formulierlabels.
- Meld eventuele uitzonderingen en resterende openstaande punten.
