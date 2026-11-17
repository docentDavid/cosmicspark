# Cosmic Spark — statische website met design system

De bestaande Cosmic Spark-website is **niet omgezet naar een framework**. Alle oorspronkelijke pagina's, assets, responsive lay-out en hoofdfunctionaliteit zijn behouden.

## Snel openen

Open `index.html` in je browser of gebruik VS Code met Live Server. Er is geen installatie of build-stap nodig.

## Nieuwe bestanden

- `DESIGN.md` — ontwerpvisie, componentafspraken, semantische HTML en kwaliteitscriteria.
- `design-tokens.css` — centrale, oorspronkelijke kleur-, typografie-, spacing- en themavariabelen.
- `AGENTS.md` — projectregels voor AI-codeassistenten.
- `HTML-PATRONEN.md` — concrete native HTML-voorbeelden (`article`, `section`, `details`, `dialog`, formulieren, enz.).

## Integratie met de bestaande site

Elke pagina laadt eerst `design-tokens.css` en daarna `style.css`, via twee losse `<link>`-elementen in de `<head>`. Er is bewust geen `@import`: dat zou een extra wachtstap veroorzaken bij het laden. Verhoog bij een CSS-wijziging het versienummer (`?v=…`) in alle vijf pagina's, zodat browsers geen verouderde versie uit de cache tonen.

De oorspronkelijke variabelen zijn uit `style.css` verhuisd. De bestaande selectors en media queries zijn **niet opnieuw ontworpen**. Ook alle overige bestaande hexkleuren uit `style.css` zijn aan benoemde tokens gekoppeld. Lettertypen, tekstbreedte, focuskleur en hoverkleur gebruiken eveneens tokens.

## Wat is niet veranderd?

- Bestaande pagina's, URLs en afbeeldingen.
- Het vierdelige mobiele dock en de breakpoints (700px en 960px).
- De optionele JavaScriptfuncties voor thema, filteren en onderwerpvoorselectie.

## Hoe wijzig je straks kleuren?

Pas bijvoorbeeld `--forest`, `--cream`, `--gold` of `--surface` aan in `design-tokens.css`. Controleer daarna **alle pagina's in beide thema's**. De oorspronkelijke hexkleuren uit `style.css` zijn nu allemaal benoemde tokens. Let wel op de verschillen tussen thematokens en vaste componentkleuren (zoals `--color-cream-fixed`).

## Belangrijke publicatiepunten

- Contactformulier: vul in `contact.html` de Web3Forms-toegangssleutel in (zie DESIGN.md, Formulieren) en verstuur een testbericht. Voeg een privacyverklaring toe, want berichten lopen via Web3Forms.
- Bevestig definitieve portretfoto, inhoud, activiteiten en contactgegevens.
- Test toegankelijkheid (WCAG 2.2 AA als doel), inclusief zoom en schermlezers.
- Controleer afbeeldingen, licenties, SEO en actuele links.

## Waarom geen Tailwind?

Gewone CSS werkt voor deze kleine, statische site uitstekend en maakt de code zonder extra build-stap bewerkbaar. Tailwind toevoegen zou een extra afhankelijkheid introduceren zonder directe noodzaak. Het kan later, als er een concrete onderhoudsreden voor is.
