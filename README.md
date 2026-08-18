# King Concrete Pumping — Worthing

Single-page location microsite for King Concrete Pumping, focused on Worthing
(West Sussex) and the surrounding areas of Broadwater, Goring-by-Sea, Durrington,
Lancing and Ferring.

Static build: plain HTML, CSS and a little vanilla JS (mobile nav, FAQ
accordion, concrete calculator). Self-contained — fonts, images and icons are
all local, nothing loads from an external URL.

## Preview locally

```bash
python3 -m http.server 8777
```

Then open http://localhost:8777/

## Structure

```
index.html            The whole page
assets/css/styles.css  Design system + all styles
assets/js/main.js      Mobile nav, FAQ accordion, concrete calculator, reveals
assets/fonts/          Self-hosted Oswald (woff2)
assets/images/         Logo, favicon and hub photography
netlify.toml           Static publish config
```

Brand (fonts, colours, logo, imagery) is taken from the hub site
kingconcretepumping.co.uk so the two read as the same company.

Eventual domain: kingconcrete-worthing.co.uk (not yet pointed).
