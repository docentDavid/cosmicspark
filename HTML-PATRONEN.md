# Cosmic Spark — native HTML5-patronen

Gebruik deze voorbeelden als bouwstenen wanneer je toekomstige functionaliteit toevoegt. **Niet elk patroon hoeft nu al in de website te worden gebruikt.** Een semantisch element krijgt altijd voorrang boven een extra component of JavaScript.

## 1. De pagina-indeling

```html
<a class="skip" href="#inhoud">Ga naar inhoud</a>
<header class="site-header">
  <nav aria-label="Hoofdnavigatie">...</nav>
</header>
<main id="inhoud">
  <section aria-labelledby="aanbod-titel">
    <h2 id="aanbod-titel">Ons aanbod</h2>
    <article class="service-card">
      <h3>Natuurcoaching</h3>
      <p>Persoonlijke begeleiding in de natuur.</p>
      <a href="aanbod/natuurcoaching.html">Lees over natuurcoaching</a>
    </article>
  </section>
</main>
<footer class="site-footer">...</footer>
```

Gebruik `section` voor een thematisch deel met kop; gebruik `article` voor zelfstandig herbruikbare inhoud; gebruik `div` waar alleen opmaak nodig is. Plaats niet willekeurig een `header` of `footer` rond iedere visuele groep.

## 2. Veelgestelde vragen zonder JavaScript

```html
<section aria-labelledby="vragen-titel">
  <h2 id="vragen-titel">Veelgestelde vragen</h2>
  <details>
    <summary>Moet ik ervaring hebben met coaching?</summary>
    <p>Nee. Tijdens een kennismaking bespreek je wat je zoekt.</p>
  </details>
  <details>
    <summary>Waar vindt natuurcoaching plaats?</summary>
    <p>De locatie spreken we vooraf samen af.</p>
  </details>
</section>
```

Een accordion met steeds maar één geopend onderdeel kan in ondersteunende browsers met gelijke `name`-attributen op de `details`-elementen. Dat is **niet verplicht** voor een FAQ.

## 3. Een native dialoog (alleen wanneer een modal echt gepast is)

```html
<button type="button" commandfor="kennismaking-info" command="show-modal">
  Meer informatie over kennismaken
</button>

<dialog id="kennismaking-info" aria-labelledby="kennismaking-titel">
  <h2 id="kennismaking-titel">Een kennismaking aanvragen</h2>
  <p>Je kunt vrijblijvend een bericht sturen via de contactpagina.</p>
  <form method="dialog">
    <button type="submit" autofocus>Sluiten</button>
  </form>
</dialog>
```

`commandfor`/`command` ondersteunt declaratief openen in recente browsers. **Controleer de browserondersteuning voor je doelgroep** en bied altijd een gewone link naar de informatie als fallback; anders is de actie in oudere browsers mogelijk niet beschikbaar. `form method="dialog"` sluit het dialoogvenster zonder het formulier naar een server te verzenden. Kies geen dialoog voor content die meteen zichtbaar moet zijn.

## 4. Afbeelding en bijschrift

```html
<figure>
  <img
    src="assets/boslicht-960.webp"
    srcset="assets/boslicht-480.webp 480w, assets/boslicht-960.webp 960w, assets/boslicht-1600.webp 1600w"
    sizes="(min-width: 700px) 46vw, 100vw"
    alt="Zonlicht dat door de bomen valt"
    width="960"
    height="1440"
    loading="lazy"
    decoding="async"
  >
  <figcaption>Een rustige plek om even op adem te komen.</figcaption>
</figure>
```

Gebruik voor puur decoratieve afbeeldingen `alt=""` en geen overbodig bijschrift.

## 5. Evenement en contactgegevens

```html
<article>
  <h3>Workshop in de natuur</h3>
  <p>Datum: <time datetime="2027-05-14">14 mei 2027</time></p>
  <p>Neem contact op voor informatie.</p>
</article>

<address>
  <a href="mailto:voorbeeld@voorbeeld.nl">voorbeeld@voorbeeld.nl</a>
</address>
```

De datum en het mailadres hierboven zijn **illustratief**. Zet deze niet live zonder bevestigde gegevens.

## 6. Formulier met native validatie

```html
<form action="/contact" method="post">
  <fieldset>
    <legend>Jouw gegevens</legend>
    <label for="contact-naam">Naam</label>
    <input id="contact-naam" name="naam" autocomplete="name" required>
    <label for="contact-email">E-mailadres</label>
    <input id="contact-email" type="email" name="email"
           autocomplete="email" required>
  </fieldset>
  <label for="contact-bericht">Je bericht</label>
  <textarea id="contact-bericht" name="bericht" required></textarea>
  <button type="submit">Verstuur bericht</button>
</form>
```

De URL `/contact` is een **voorbeeld**: dit werkt pas als er een echte serververwerking is. Native HTML valideert basisvelden, maar servervalidatie blijft noodzakelijk. Toon pas een succesmelding nadat de server heeft bevestigd dat de verzending is gelukt.

## 7. Wanneer is JavaScript wél terecht?

- Aanbodkaarten direct filteren zonder pagina opnieuw te laden.
- Handmatig wisselen tussen licht en donker thema met voorkeur bewaren.
- Een contactonderwerp voorselecteren op basis van de URL.
- Een boekings-/betaal- of externe API-integratie, als daar ooit voor gekozen wordt.

Maak zulke functies waar mogelijk **progressive enhancement**: de hoofdinhoud, navigatie en contactmogelijkheden moeten ook zonder JavaScript toegankelijk blijven.
