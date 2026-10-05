# Hadeer Fathy | Portfolio

Personal portfolio for Hadeer Fathy, biomedical researcher and clinical laboratory chemist.

Static site with no build step: plain HTML, CSS, and JavaScript. Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis), loaded from a CDN.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  img/favicon.svg
```

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, then save.
4. The site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.
