# Mr.IT Support — Business Showcase Website

A production-minded, responsive single-page React website for **Mr.IT Support**, an independent founder-led IT Support, Networking & Digital Solutions business in Jaffna, Sri Lanka.

## What is implemented

- Sticky desktop navigation with active-section indicators
- Accessible mobile menu with focus management and Escape-to-close
- Full original logo in the navigation and footer, with its 938:741 aspect ratio preserved
- Responsive hero and business introduction
- Keyboard-accessible explorer for all seven service categories
- Local, global-remote and future-expansion delivery models
- Trust-building strengths and five-step customer process
- Reusable portfolio card plus an honest empty state (no invented projects)
- Founder introduction and supplied education/learning information
- Mouse- and keyboard-friendly FAQ accordion
- Enquiry form with required-field, email, phone and message validation
- Explicit enquiry-preparation mode when no delivery integration is configured
- Copy and text-file download fallbacks that do not claim an enquiry was delivered
- Conditional contact and social links (empty values remain hidden)
- Back-to-top control, reduced-motion support and responsive layouts
- Local variable fonts, semantic HTML, metadata and verified-business structured data
- Thirteen Playwright browser tests covering key interactions, required viewport widths and WCAG A/AA audits

## Technology

- React 19
- Vite 6
- Modern component-scoped class naming with shared CSS design tokens
- Lucide React icons
- Self-hosted Inter Variable and Manrope Variable fonts
- Playwright for browser verification

## Installation

Requirements: **Node.js 20.19+** and npm.

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite serves the application on `http://localhost:5173` by default and binds to `0.0.0.0` for preview environments.

## Production build

```bash
npm run build
npm run preview
```

The deployable output is generated in `dist/`. Deploy that directory to a static host with HTTPS. No backend is required for the current enquiry-preparation mode.

## Browser tests

Install Chromium once if it is not already available:

```bash
npx playwright install chromium
# On a minimal Linux environment, system libraries may also be needed:
npx playwright install-deps chromium
```

Then run:

```bash
npm run test:e2e
```

The test configuration starts Vite automatically if a development server is not already running.

## Business configuration

Edit **`src/config/site.js`** for verified business information:

- `contact.email` — optional public business email
- `contact.phone` — optional public phone number
- `contact.formEndpoint` — optional secure JSON form endpoint
- `founderImage` — optional path to a supplied founder photograph
- `socialLinks` — optional array such as `{ label: 'LinkedIn', url: 'https://…' }`

Do not add private API keys, secrets or credentials to this frontend file.

### Enquiry delivery modes

**Current mode: no endpoint configured**

- The submit button says **Prepare Enquiry**.
- Valid input generates an enquiry summary in the browser.
- The customer can copy it or download `mr-it-support-enquiry.txt`.
- The interface explicitly states that nothing has been transmitted or stored.

**Configured endpoint mode**

Set `contact.formEndpoint` to an HTTPS endpoint that:

1. Accepts a `POST` request with `Content-Type: application/json`.
2. Accepts the fields `fullName`, `email`, `phone`, `service`, `subject`, `message`, and `source`.
3. Supports CORS when hosted on another origin.
4. Returns a 2xx response only after successful acceptance/delivery.
5. Implements appropriate spam protection, validation, privacy controls and secure server-side handling.

Only a successful endpoint response produces the “sent successfully” message. Failures preserve the entered details and provide copy/download fallbacks.

If a verified email is supplied without an endpoint, the prepared-enquiry actions also include an **Open email app** option using a pre-filled `mailto:` link. Customer confirmation is still required before that email is sent.

## Adding genuine portfolio projects

Edit **`src/data/portfolio.js`** and add approved entries using this shape:

```js
{
  id: 'unique-project-id',
  title: 'Verified project title',
  category: 'Website Development',
  description: 'Accurate, approved project summary.',
  image: '/images/projects/project-image.webp',
  imageAlt: 'Descriptive image alternative text',
  technologies: ['React', 'Vite'],
  detailsUrl: 'https://verified-example.com/project',
}
```

`image`, `technologies`, and `detailsUrl` are optional. Do not add unverified client names, results or links. Place optimized project assets under `public/images/projects/`.

## Logo protection

The supplied official logo is deployed as `public/images/mr-it-support-logo.png` and remains byte-for-byte identical to the original `mritsupportlogo.png` asset.

The logo is rendered as a complete image with:

- no cropping or stretching
- no filters, opacity changes or colour alterations
- no text, buttons or decorative elements placed over it
- a white dedicated surface in both navigation and footer
- explicit width/height attributes and a preserved aspect ratio

Replace the public file only with another officially supplied asset, and update the intrinsic dimensions if the replacement differs.

## Project structure

```text
public/images/            Original deployed logo
src/
  components/             Reusable page sections and UI components
  config/site.js          Verified contact/integration configuration
  data/                   Services, navigation, FAQ, process and portfolio content
  styles/
    variables.css         Brand tokens and design system
    global.css            Components and section styling
    responsive.css        Responsive breakpoints and mobile layouts
  App.jsx                 Section composition and shared service state
  main.jsx                React entry point and local fonts
tests/website.spec.js     Browser interaction and responsive tests
```

## SEO and deployment notes

- Verified business metadata and `ProfessionalService` structured data are included.
- No ratings, opening hours, street address, phone number or partnerships are invented.
- Once a public domain is available, add the canonical URL, absolute `og:url` and absolute `og:image` URL in `index.html`, then generate a domain-specific sitemap.
- `public/robots.txt` allows search crawling; no unsupported sitemap URL is declared.

## Information still required

See **`BUSINESS_INPUT.md`** for the concise handover checklist.
