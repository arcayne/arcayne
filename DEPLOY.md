# Deploy this as a GitHub profile README and Pages site

This repository is structured for the public `arcayne/arcayne` profile repository.

## Files

- `README.md` — appears on Joan's GitHub profile.
- `assets/project-showcase.svg` — profile banner linking to the interactive showcase.
- `docs/index.html` — interactive project showcase.
- `docs/styles.css` — showcase styling and print layout.
- `docs/script.js` — filters, motion and print controls.
- `docs/.nojekyll` — publishes the static site without Jekyll processing.

## Enable GitHub Pages

1. Open **Settings → Pages** in `arcayne/arcayne`.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the default branch and the `/docs` folder, then save.
4. The site will be available at `https://arcayne.github.io/arcayne/`.

The **Brief** and **Save as PDF** controls use the browser's print dialog, so the site remains self-contained and can be saved as a PDF without storing a separate binary file in the repository.
