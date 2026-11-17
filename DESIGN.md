# Cosmic Spark — ontwerp- en interfaceafspraken

> **Status:** beschrijving van de aangeleverde statische website (v5, november 2026).  
> **Doel:** visuele en functionele consistentie voor alle huidige en toekomstige HTML-pagina’s.  
> **Bron van waarheid:** `design-tokens.css` voor ontwerpwaarden; `style.css` voor component- en lay-outregels; bestaande HTML-pagina’s voor de feitelijke structuur.

## 1. Product en uitstraling

Cosmic Spark is een warme, persoonlijke website voor individuele begeleiding en activiteiten. De ervaring moet rustig, natuurlijk, toegankelijk en licht mystiek aanvoelen. De inhoud schept vertrouwen en legt begrijpelijk uit wat bezoekers kunnen verwachten.

**Behouden:** bosgroen, crème, saliegroen, goudaccenten, elegante serifkoppen, ruime witruimte, afgeronde beelden en de bestaande mobiele navigatie. **Niet toevoegen zonder besluit:** roze tinten, felle gradients, zware animaties, generieke AI-decoraties of willekeurige nieuwe componentstijlen.

Schrijf in helder Nederlands, menselijk en warm, zonder onnodig spiritueel jargon. Gebruik echte verwachtingen en betrouwbare informatie; verzin geen reviews, prijzen, prestaties of begeleidingsclaims.

## 2. Technische uitgangspunten

- **Statische multipage-site:** `index.html`, `aanbod.html`, `over-kim.html`, `aanbod/natuurcoaching.html`, `contact.html`, plus `bedankt.html` (bedankpagina na het contactformulier, `noindex`, niet in de navigatie).
- **Detailpagina's per aanbod** staan in de map `aanbod/`: `natuurcoaching`, `individuele-coaching`, `lichaamsgericht-werk`, `energetisch-werk`, `workshops-en-groepen`, `retraites-en-evenementen` en `voor-organisaties` (`.html`). Alle aanbodkaarten linken naar deze pagina's; de knoppen erop openen het contactformulier met de juiste dienst voorgeselecteerd (`?dienst=…`, gelijk aan de optiewaarde in `contact.html`). Bij lichaamsgericht werk staat de beperking *alleen voor vrouwen* als `.detail-note` in de hero. Gebruik daar `../` voor alle links, CSS, scripts en afbeeldingen. De pagina markeert *Aanbod* in beide navigaties met `aria-current="true"` (je bent in dat onderdeel, niet op die pagina). Opbouw: hero met terug-link, de naam van het aanbod als `h1` en de slogan eronder (`.detail-tagline`), "Wat is het?" met paneel "Misschien herken je dit", werkwijze in stappen (`ol.steps`), veelgestelde vragen (`details`/`summary`), "Ook interessant" met drie aanbodkaarten en een afsluitende oproep. Nieuwe detailpagina: zet hem ook in `PRECACHE` van `sw.js` en verhoog `CACHE_VERSION`.
- Het oude adres `natuurcoaching.html` in de root is een doorverwijzing (`noindex`) naar `aanbod/natuurcoaching.html`, zodat bestaande links blijven werken.
- Gewoon **HTML5 + CSS**. Houd het zonder build-stap te openen in een browser of met Live Server.
- **Geen Next.js, React, Vue, router, componentbibliotheek of onnodige npm-afhankelijkheden.**
- Gebruik JavaScript alleen voor gedrag dat niet goed met HTML/CSS kan. De huidige `script.js` ondersteunt de optionele kleurthemaschakelaar, client-side aanbodfilters, het vooraf kiezen van een dienst in het contactformulier en het verzenden van dat formulier zonder de pagina te verlaten.
- Tailwind is **niet nodig** voor dit project. Een toekomstige introductie mag alleen na bewuste keuze, zonder het ontwerp of de offline-werkbaarheid ongemerkt te veranderen.
- Design tokens zijn gewone CSS-variabelen. Gebruik ze vanuit `style.css`; zet nieuwe gedeelde ontwerpwaarden niet als losse hexcodes in componenten.

## 3. Ontwerptokens

Lees `design-tokens.css` voor de exacte waarden. Bestaande kernkleuren:

| Token | Huidige waarde | Gebruik |
|---|---|---|
| `--forest` | `#203b30` | primaire merk- en actiegebieden |
| `--deep` | `#111714` | diepe donkere achtergrond, footer |
| `--cream` | `#f5f2e9` | lichte pagina-achtergrond |
| `--sage` | `#e4e9df` | zachte sectieachtergrond |
| `--gold` | `#d6b77a` | spaarzaam accent en bijzondere actie |
| `--surface` | `#fffdf7` | lichte kaarten en formulieren |
| `--text` | `#203b30` | basistekst (verandert in donker thema) |
| `--muted` | `#455a4c` | ondersteunende tekst (verandert in donker thema) |
| `--border` | `#c5cfc3` | begrenzingen (verandert in donker thema) |

**Regels:**
1. Gebruik semantische tokens (`--text`, `--surface`, `--border`) voor gewone tekst, achtergronden en randen. De overige reeds gebruikte kleuren zijn nu als expliciete componenttokens vastgelegd, zodat er geen losse hexkleuren meer in `style.css` hoeven te staan.
2. Gebruik merkkleuren (`--forest`, `--gold`) voor bewuste visuele accenten.
3. Test wijzigingen in **licht én donker** thema; een kleur die mooi is, is niet automatisch voldoende contrastrijk.
4. Behoud de bestaande afstanden `4, 8, 16, 24, 32, 48, 64px`. Uitzonderingen mogen wanneer componenten dat functioneel nodig hebben en worden gemotiveerd.
5. Bestaande afrondingen zijn `12px`, `20px`, `32px` en pill-vorm bij knoppen/navigatiechips. Gebruik vaste tokens.

## 4. Typografie

- **Koppen:** Georgia, fallback Times New Roman, serif; rustig, relatief licht en met compacte regelafstand.
- **Lopende tekst:** system-ui / Segoe UI / sans-serif; basis 16px met regelhoogte 1.65.
- Eén betekenisvolle `h1` per pagina. Gebruik daarna `h2`, `h3` in een logische volgorde; kies het niveau op betekenis, niet op gewenste vorm.
- Paragrafen zijn doorgaans maximaal 66 tekens breed (`66ch`).
- Gebruik `em` alleen als het inhoudelijk om nadruk gaat. Voor uitsluitend kleur- of stijlverschil gebruik je een `span` met klasse.
- Zorg dat tekst bij 200% zoom, kleine schermen en tekstvergroting leesbaar blijft.

## 5. Mobile-first en responsief gedrag

- Begin bij **320–375 CSS-pixels** breedte. Laat inhoud natuurlijk doorlopen; geen horizontale paginascroll.
- Huidige media queries: op **700px** verschuiven kaarten en grids; op **960px** verschijnt de desktopnavigatie en verdwijnt de mobiele dock; verdere verfijning op **1100px**, en een enkele kolom kaarten onder **421px**.
- De huidige mobiele navigatie bestaat uit **vier vaste, even brede links** onderaan. Behoud deze bij wijzigingen, inclusief `safe-area-inset-bottom`, focusstijlen en ruimte onder de pagina-inhoud.
- Een zwevend dock is *geen* onderdeel van deze aangeleverde versie; introduceer dat niet zonder nieuw ontwerpbesluit.
- Laat langere teksten en echte telefoonafmetingen bepalen wanneer extra breakpoints zinvol zijn.
- Test bij 320, 375, 700, 959, 960, 1280px en met 200% zoom.

## 6. HTML5: eerst semantiek, dan styling

Kies het element dat de **betekenis** van de inhoud of actie het beste beschrijft:

| Element | Gebruik bij Cosmic Spark |
|---|---|
| `<header>` | merk, paginakop of kop van een zelfstandige sectie |
| `<nav aria-label="…">` | hoofd- en mobiele navigatie met betekenisvolle labels |
| `<main id="inhoud">` | precies één hoofdinhoudgebied per pagina; doel van de skiplink |
| `<section aria-labelledby="…">` | thematisch deel met een eigen zichtbare kop |
| `<article>` | zelfstandig aanboditem, activiteit, ervaring of nieuwsbericht |
| `<footer>` | merkblok (logo, korte omschrijving, contactknop), twee gelabelde `nav`-groepen (Pagina's, Aanbod) met `h2`-kopjes en `aria-current` op de huidige pagina, onderbalk met copyright en slogan; alleen links naar bestaande pagina's en secties |
| `<figure>` en `<figcaption>` | beeld mét relevante toelichting of bronvermelding |
| `<address>` | echte contactgegevens (niet voor algemene locaties) |
| `<time datetime="…">` | datum van een workshop, retraite of evenement |
| `<details>` en `<summary>` | veelgestelde vragen of optionele achtergrondinformatie |
| `<dialog>` | echte dialoog, bijvoorbeeld een boekingsbevestiging of keuze die de aandacht moet krijgen |
| `<form>`, `<label>`, `<fieldset>`, `<legend>` | invoer met gekoppelde labels en logisch gegroepeerde velden |

Gebruik **geen `<section>` als generiek stylingblok zonder thematische betekenis**; een `div` is prima voor een puur lay-outtechnische groep. Zet geen `role="button"` op een `div`. Een aanbodkaart is in zijn geheel klikbaar via één uitgerekte link in de titel (zie Aanbodkaarten); wikkel nooit een hele kaart in een `<a>` en zet er geen tweede link in.

**Native interacties:** probeer eerst `<details>`, de Popover API, HTML-formuliervalidatie of `<dialog>` met browserondersteunde declaratieve commando’s. Gebruik alleen kleine, gerichte JavaScript-fallbacks als de gewenste functionaliteit zonder die code niet betrouwbaar werkt. Een modal is geen standaard vervanging voor gewone navigatie of tekstinhoud.

Zie `HTML-PATRONEN.md` voor concrete voorbeelden.

## 7. Bestaande componenten

### Navigatie

- Desktop: tekstlinks in `.desktop-nav`; mobiel: `.mobile-dock` met vier duidelijke, gelijkwaardige doelen.
- Gebruik echte `<a href>`-links voor navigatie, en `aria-current="page"` bij de actuele pagina.
- De hoofdnavigatie werkt **zonder JavaScript**. Maak dit niet afhankelijk van een eventhandler.
- Het mobiele dock mag content of toetsenbordfocus niet blokkeren. Let op safe-area en verhoogde tekstgrootte.

### Knoppen en links

- `<a class="button" href="…">` wanneer het een andere pagina of sectie opent.
- `<button type="button">` voor een handeling op dezelfde pagina; `<button type="submit">` voor verzending.
- Bestaande varianten: `.button`, `.button-gold`, `.button-outline`, `.text-link`.
- Knoppen behouden dezelfde pillvorm in beide thema's. In het donkere thema gebruiken ook contourknoppen goud met diepe tekst, zodat alle acties op donkere panelen duidelijk afsteken.
- Kleine tikdoelen vermijden; bestaande hoofdknoppen zijn minimaal circa 48px hoog. Controleer WCAG 2.2 2.5.8 (24px met uitzonderingen) en stuur praktisch op circa 44px of groter waar passend.

### Aanbodkaarten

- Gebruik `<article class="service-card">` voor een zelfstandig aanboditem.
- Houd afbeelding, titel, beschrijving en link samen in de kaart.
- De **hele kaart is klikbaar**: de titel is de enige link (`<h3><a class="card-link" href="…">Titel</a></h3>`) en strekt zich via `::after` over de kaart uit. Zo heeft elke kaart één tabstop met de titel als toegankelijke naam. De afbeelding staat in een gewone `<div class="service-image">`; "Lees meer" is een `<span class="text-link" aria-hidden="true">`, alleen een visuele hint. De focusring komt via `:has()` om de hele kaart.
- Zet geen andere links of knoppen in een kaart: de uitgerekte link ligt eroverheen.
- Binnen een grid blijven de links bij voorkeur onderaan uitgelijnd (`margin-top: auto`).
- De aanbodpagina heeft categoriebuttons met JavaScriptfilters; **zonder JavaScript blijven alle kaarten zichtbaar**.
- Bouw categorieën niet na als nep-tabs zonder juiste toetsenbord- en statusafhandeling.

### Iconen

- Gebruik iconen die **inhoudelijk bij het onderwerp passen** (gesprek → spraakwolkjes, natuur → blad, tempo → voetstappen). Geen losse siertekens of emoji's zoals ❧ of ♡.
- Eén rustige stijl: inline SVG-lijniconen met `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, lijndikte 1,6 (mobiele navigatie 1,8), ronde uiteinden en hoeken. Geef ze de klasse `.line-icon` (1em × 1em), zodat ze de tekstgrootte en -kleur volgen.
- Het zon-icoon (`.sun-icon`) is het logo; gebruik het niet als algemeen inhoudsicoon.
- Decoratieve iconen krijgen `aria-hidden="true"` (op het icoon of de omliggende `span`) en `focusable="false"`.

### Afbeeldingen

- De afbeeldingskaders in `style.css` behouden per component een responsieve beeldverhouding en tonen beelden zonder vervorming.
- Foto's staan als **WebP in meerdere breedtes** in `/assets` (`naam-480.webp`, `naam-960.webp`, `naam-1600.webp`; de portretfoto 480/800/1100). Gebruik `srcset` en `sizes`, zodat de browser het kleinste passende formaat kiest. Plaats geen onbewerkte camerabestanden van meerdere megabytes.
- Geef elke `<img>` `width` en `height` (verhouding van het bronbeeld) tegen verspringende lay-out. Gebruik `loading="lazy"` voor beelden onder de vouw en `loading="eager"` met `fetchpriority="high"` voor de grootste afbeelding bovenaan de pagina.
- Bij vervanging pas je `src`, `srcset`, `width` en `height` aan. Pas `object-position` alleen aan als het onderwerp anders wordt uitgesneden.
- De homepagehero gebruikt `.hero-photo` als CSS-achtergrond: mobiel `boslicht-960.webp`, vanaf 700px een liggende uitsnede (`boslicht-breed-1280/1920.webp`) via `image-set`. Vervang de bron in `style.css` **en** in de twee `preload`-links in de `<head>` van `index.html`.

### Formulieren

- Elk veld heeft een zichtbaar `<label>`; gebruik `type="email"`, `autocomplete`, `required`, `minlength` en `maxlength` waar passend.
- Groepeer samenhangende opties met `<fieldset>` en `<legend>` wanneer er zo'n groep is.
- Combineer ingebouwde validatie met duidelijke foutmeldingen; `placeholder` is geen label.
- **Verzending:** het contactformulier verstuurt via [Web3Forms](https://web3forms.com) een e-mail naar Kim (kimwaijers@hotmail.com). De toegangssleutel staat in het verborgen veld `access_key` in `contact.html`. Die sleutel is geen geheim: hij kan alleen berichten naar Kims adres sturen.
- De `name`-attributen (`Naam`, `email`, `Telefoonnummer`, `Onderwerp`, `Bericht`) zijn de labels in de mail. Het veld `email` wordt automatisch het antwoordadres, zodat Kim direct kan antwoorden. Het verborgen vinkje `botcheck` is een spamval.
- Met JavaScript verstuurt `script.js` het bericht via `fetch` en toont het een melding onder de knop. Lege optionele velden worden weggelaten en het onderwerp bevat naam en gekozen dienst. Zonder JavaScript verstuurt het formulier gewoon en stuurt Web3Forms de bezoeker via het verborgen veld `redirect` door naar `bedankt.html`. Dat moet een volledig https-adres op het domein van de site zijn (nu `https://docentdavid.github.io/cosmicspark/bedankt.html`). Pas het aan als de site naar een ander adres verhuist.
- Toon alleen een verzendbevestiging als Web3Forms die geeft. Bij een fout blijft alles wat de bezoeker invulde staan.
- Verzamel alleen gegevens die echt nodig zijn; stel bewaartermijnen en privacytekst vast voordat de site live gaat.

### Dialoog, uitschuifbare inhoud en menu

- FAQ: eerst `<details><summary>…</summary>…</details>`.
- Dialoog: eerst `<dialog>` met een duidelijk label en een sluitmogelijkheid; bij modal gebruik een mechanisme dat focus en Escape correct afhandelt.
- Klein uitklapmenu: overweeg `popover` of `<details>` wanneer inhoudelijk passend; geen zelfgebouwde `div`-modal.
- **Voeg geen dialoog toe als een gewone link of zichtbaar stuk tekst de taak beter oplost.**

## 8. Toegankelijkheid en kwaliteitscontrole

Doel: **WCAG 2.2 niveau AA**, zonder de claim dat dit nu al voor iedere pagina is aangetoond.

- Structurele navigatie, goede paginatitels, skiplink en logische koppenhiërarchie.
- Alle acties zijn met toetsenbord en zichtbare focus bereikbaar.
- Toets contrast in licht en donker thema, ook voor actieve en hoverstatus.
- Afbeeldingen hebben passende alternatieve tekst; puur decoratieve beelden hebben `alt=""` of staan als achtergrond zonder verborgen belangrijke informatie.
- Test herflow, zoom, voorkeur voor minder beweging en waar relevant schermlezers.
- Beperk beweging; respecteer `prefers-reduced-motion`.
- Zet iconen zonder betekenis op `aria-hidden="true"`.
- Gebruik live regions alleen voor daadwerkelijke statusveranderingen, niet overal.

**Minimale testreeks:** alle pagina's openen zonder JavaScript; links en mobiele dock werken; beide kleurthema's controleren; toetsenbordtabvolgorde; formulier foutcontrole; 200% zoom; donkere en lichte contrasten; testen met VoiceOver of NVDA.

## 9. Content en onderhoud

- Huidige pagina’s: Home, Aanbod (met organisaties), Over Kim, Natuurcoaching, Contact.
- Lichaamsgericht werk is in de huidige content uitsluitend voor vrouwen; laat die beperking duidelijk en respectvol staan bij het betreffende aanbod.
- Beelden in `/assets` zijn deels voorbeeldbeelden. Gebruik geen foto van een persoon als echte foto van Kim zolang dat niet is bevestigd.
- Prijzen, boekingen, ervaringen, toekomstige workshops en evenementen mogen niet worden verzonnen.
- Voor een nieuwe dienst: hergebruik de service-card-structuur en maak pas een detailpagina wanneer daar voldoende concrete inhoud voor is.
- Pas gedeelde navigatie en footer op **alle vijf** HTML-pagina's aan; zonder templating is er nu nog duplicatie.

## 10. Werkwijze voor nieuwe wijzigingen (ook voor AI)

1. Lees dit bestand, `AGENTS.md`, `design-tokens.css` en de betreffende bestaande HTML/CSS.
2. Controleer of een native HTML-element de functie al oplost.
3. Hergebruik bestaande klassen, tokens en lay-outpatronen.
4. Bouw mobile-first, zonder bestaande pagina's te breken.
5. Test *zonder* JavaScript wat zonder JavaScript moet blijven werken.
6. Controleer toegankelijkheid, uitlijning en licht/donker thema.
7. Meld wat gewijzigd is, welke keuzes nieuw zijn en wat nog gecontroleerd moet worden.

### Openstaande punten die niet automatisch uit de ZIP zijn af te leiden

- Definitieve portretfoto en aanbodteksten van Kim.
- Definitieve contactafhandeling, hosting en privacytekst.
- Eventuele boekingsflow; er is in de huidige site geen aangesloten boekingsbackend.
- Of de huidige vaste, volledige breedte van de mobiele navigatie behouden blijft of later een zwevende variant wordt.
