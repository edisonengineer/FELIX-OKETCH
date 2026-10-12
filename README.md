# Felix Oketch — Solar Products Portfolio

A responsive single-page e-commerce portfolio for **Felix Oketch**, Renewable Energy Graduate, Energy Scientist & Researcher and Technical Sales Engineer based in Kasarani, Nairobi, Kenya.

Plain HTML, CSS and JavaScript. No build step and no dependencies apart from Google Fonts.

## Features

- Sticky, responsive navigation with a mobile menu and active-section highlighting
- Hero section with a "Browse Solar Products" call to action
- Product catalog (8 products) with category filters
- Hover overlay on each card with **Add to Cart** and **Order on WhatsApp**. On touch screens these buttons are always visible.
- Product detail modal: large image, description, key features, technical specification table, price, **Order on WhatsApp** and **Contact for Installation** buttons. It closes with the X button, the Escape key or a click on the backdrop.
- Cart drawer: change quantities, see a running total and **check out on WhatsApp** with an itemised order message. The cart is kept in `localStorage`.
- About section with experience timeline, and a contact footer (email, phone/WhatsApp, LinkedIn, location)
- Accessible: keyboard support, focus trapping in dialogs, `prefers-reduced-motion` support

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | Design system and responsive layout |
| `script.js` | Product data, rendering, modal, cart and WhatsApp links |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Customising

All settings are at the top of `script.js`:

- **WhatsApp number**: `CONFIG.whatsappNumber` (international format, no `+`)
- **Products**: edit the `PRODUCTS` array to change name, price, description, features, specs or badge
- **Real product photos**: add an `image` field, e.g. `image: "images/panel-550w.jpg"`. It replaces the built-in SVG illustration.

The phone number also appears in the contact section of `index.html` (`tel:` link).

## Deploy to GitHub Pages

1. Push these files to the `main` branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. The site will go live at `https://<username>.github.io/<repo-name>/`.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.
