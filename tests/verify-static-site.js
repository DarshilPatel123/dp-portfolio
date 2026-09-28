const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const failures = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing required file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectLocalFile(relativePath) {
  expect(fs.existsSync(path.join(root, relativePath)), `Missing local asset: ${relativePath}`);
}

function expectDocumentBasics(source, name) {
  expect(source.includes('<!doctype html>'), `${name} must declare HTML5 doctype.`);
  expect(source.includes('<html lang="en">'), `${name} must declare its document language.`);
  expect(source.includes('name="viewport"'), `${name} must define a viewport for mobile devices.`);
}

const home = read('index.html');
const arcade = read('prototypes/career-arcade/index.html');
const privacy = read('privacy/dot-and-box/index.html');
const mainPortfolioCss = read('assets/css/main-portfolio.css');
const arcadeCss = read('assets/css/arcade.css');
const arcadeRedesignCss = read('assets/css/arcade-redesign.css');
const privacyCss = read('assets/css/privacy.css');
const siteJs = read('assets/js/site.js');
const arcadeJs = read('prototypes/career-arcade/arcade.js');

expectDocumentBasics(home, 'Homepage');
expectDocumentBasics(arcade, 'Career Arcade prototype');
expectDocumentBasics(privacy, 'Privacy page');

expect(home.includes('href="#main-content"'), 'Homepage must provide a skip link.');
expect(home.includes('<main id="main-content"'), 'Homepage must provide a main content landmark.');
expect(home.includes('aria-label="Primary navigation"'), 'Homepage navigation needs an accessible label.');
expect(home.includes('data-nav-toggle'), 'Homepage needs a mobile navigation toggle.');
expect(!/prototypes\//i.test(home), 'Homepage must not expose non-primary portfolio routes.');
expect(home.includes('class="toolkit"'), 'Homepage must use the simplified toolkit treatment.');
expect(home.includes('class="portfolio-footer"'), 'Homepage must keep the Back to top link away from the contact content.');
expect(home.includes('E-Commerce Website'), 'Homepage must include the E-Commerce Website project.');
expect(home.includes('Exam &amp; Quiz Management System'), 'Homepage must include the Exam and Quiz Management System project.');
expect(home.includes('Basic Music Player'), 'Homepage must include the Basic Music Player project.');
expect(mainPortfolioCss.includes('prefers-reduced-motion'), 'Homepage styling must respect reduced-motion preferences.');
expect(arcade.includes('<canvas id="arcade-canvas"'), 'Career Arcade needs its game canvas.');
expect(arcade.includes('data-stage="road"'), 'Career Arcade needs its Roadline Run stage.');
expect(arcade.includes('data-stage="climb"'), 'Career Arcade needs its Stack Shift stage.');
expect(arcade.includes('data-stage="signal"'), 'Career Arcade needs its Signal Match stage.');
expect(arcadeCss.includes('prefers-reduced-motion'), 'Career Arcade styling must respect reduced-motion preferences.');
expect(arcadeJs.includes('requestAnimationFrame'), 'Career Arcade must render its interactive canvas.');
expect(arcade.includes('href="../../index.html"'), 'Career Arcade return links must point directly to the normal homepage file.');

expect(!home.includes('privacy/dot-and-box'), 'Homepage must not link or refer to the privacy route.');
expect(!/<a\b[^>]*href=["'](?:\.\.?\/|\/|#)/i.test(privacy), 'Privacy page must not link to the portfolio or another page.');
expect(privacy.includes('Silent Gaming'), 'Privacy page must identify the confirmed Google Play developer.');
expect(privacy.includes('mailto:dgp76210@gmail.com'), 'Privacy page must provide the confirmed privacy contact.');
expect(!privacy.includes('REPLACE_WITH_AN_ACTIVELY_MONITORED_PRIVACY_EMAIL_BEFORE_PUBLISHING'), 'Privacy page must not retain an unresolved privacy-contact placeholder.');

expectLocalFile('assets/css/main-portfolio.css');
expectLocalFile('assets/js/site.js');
expectLocalFile('assets/css/arcade.css');
expectLocalFile('assets/css/arcade-redesign.css');
expectLocalFile('assets/css/privacy.css');

const sourceFiles = [
  ['index.html', home],
  ['prototypes/career-arcade/index.html', arcade],
  ['privacy/dot-and-box/index.html', privacy],
  ['assets/css/main-portfolio.css', mainPortfolioCss],
  ['assets/css/arcade.css', arcadeCss],
  ['assets/css/arcade-redesign.css', arcadeRedesignCss],
  ['assets/css/privacy.css', privacyCss],
  ['assets/js/site.js', siteJs],
  ['prototypes/career-arcade/arcade.js', arcadeJs]
];

for (const [name, source] of [
  ['index.html', home],
  ['prototypes/career-arcade/index.html', arcade],
  ['prototypes/career-arcade/arcade.js', arcadeJs]
]) {
  expect(!/\b(?:prototype|preview|in progress|final version)\b/i.test(source), `${name} must not contain public placeholder language.`);
}

for (const [name, source] of sourceFiles) {
  expect(!/\b(?:https?|wss?):\/\//i.test(source), `${name} must not contain an external network URL.`);
  expect(!/\b(?:api[_-]?key|secret|password)\b/i.test(source), `${name} must not contain common secret markers.`);
}

if (failures.length > 0) {
  console.error('Static-site verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Static-site verification passed.');
}
