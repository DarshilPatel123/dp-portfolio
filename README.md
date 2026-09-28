# Software Portfolio

A static, dependency-free portfolio foundation designed for GitHub Pages.

## Current routes

- `/` — normal, recruiter-friendly portfolio
- `/prototypes/career-arcade/` — original crossroads-and-mini-games concept
- `/privacy/dot-and-box/` — standalone Dot-and-Box policy draft; deliberately not linked from the portfolio

The Dot-and-Box privacy route is based on a focused audit of the game's actual data handling, permissions, and third-party SDKs. It identifies Silent Gaming and uses the current privacy contact email. Re-audit it before any release that changes the game's data handling, permissions, or third-party SDKs.

## Local preview

Open `index.html` in a browser for the normal portfolio. It uses only relative paths and requires no build step.

## Verification

With Node.js installed, run `node tests/verify-static-site.js`. The check verifies the public static routes, expected local assets, key accessibility hooks, the privacy-route isolation rule, and the absence of external URLs in site source.

## Deployment

See [`docs/GITHUB_PAGES_DEPLOYMENT.md`](docs/GITHUB_PAGES_DEPLOYMENT.md) for the approved publishing sequence. The site uses relative paths, so its normal, retained arcade, and privacy routes work from a project GitHub Pages URL without a build step.

For local feedback before selecting the permanent homepage, use [`docs/FRIEND_TESTING_CHECKLIST.md`](docs/FRIEND_TESTING_CHECKLIST.md).

## Week 1 scope

- Establish the accessible normal portfolio structure.
- Provide an isolated, original interactive concept for review.
- Replace temporary profile content after reviewing the résumé and receiving approved project details.
- Complete the policy contact details and publish the verified privacy-policy page after the game data audit.
