# GitHub Pages deployment guide

This site is a static HTML, CSS, and JavaScript project. It needs no build step, framework, server, or deployment dependency.

## Do not publish yet

Publishing is an external action and must happen only after user approval. Before publishing, ensure all of the following are true:

- The desired homepage direction is approved.
- Public contact links are approved.
- The Dot-and-Box policy has a confirmed Google Play developer name, an actively monitored privacy-contact email, and a final effective date.
- The feature branch has passed its final security, accessibility, mobile, and static-route reviews.
- The user has explicitly approved a squash merge from the feature branch to local `main`.

## Publish sequence

1. Create a public GitHub repository for this portfolio from GitHub's website. Use a name such as `software-portfolio`.
2. After the user approves the local squash merge to `main`, add that GitHub repository as the `origin` remote and push only the approved `main` branch.
3. In the GitHub repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` directory, then save.
6. Wait for GitHub Pages to display the deployment URL.
7. Open the URL in a signed-out/private browser window on desktop and mobile.

## Expected routes

For an ordinary project repository, GitHub Pages normally publishes at:

```text
https://<github-owner>.github.io/<repository-name>/
```

With the suggested repository name, the relevant direct URLs will be:

```text
https://<github-owner>.github.io/software-portfolio/
https://<github-owner>.github.io/software-portfolio/privacy/dot-and-box/
```

The privacy route is intentionally not linked from the homepage. Its direct URL must be pasted into Google Play only after its draft notice and contact placeholder have been replaced and independently checked.

## Post-deployment checks

- `/` and `/privacy/dot-and-box/` load directly after refresh.
- The homepage does not expose a privacy-policy link.
- The privacy page does not expose a portfolio link.
- No browser console errors, mixed-content warnings, or unexpected external network requests occur.
- Navigation, skip link, keyboard focus, reduced-motion preference, and mobile menu work.
- The final policy is readable without login, geofencing, or a PDF viewer.

## Custom domain later

A custom domain is optional. Do not add a `CNAME` file or change DNS until the GitHub Pages deployment is working and the domain ownership is confirmed.
