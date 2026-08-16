# Product Requirements Document (PRD): Shamelco Platform Optimization

## 1. Executive Summary

**Project:** Shamelco Platform
**Objective:** Address critical performance, security, accessibility, and SEO bottlenecks identified during Lighthouse auditing. The goal is to optimize the React/TypeScript frontend and the .NET backend API interactions to achieve a production-ready state with high Lighthouse scores across all metrics.

---

## 2. Scope of Work

### 2.1. Performance & Bundle Optimization (Frontend)

**Current Issue:** High execution time and large payload size due to unused JavaScript and unoptimized image loading strategies.
**Requirements:**

- **Implement Tree-Shaking:** Refactor the import statements for heavy libraries, specifically `react-icons`, `lucide-react`, and `recharts`. Ensure only the utilized components/icons are bundled rather than the entire libraries.
- **Optimize Largest Contentful Paint (LCP):**
  - Identify the main hero image (e.g., `premium_synthetic_turf_football_field_at_nig.jpg`).
  - Apply the `fetchpriority="high"` attribute to the `<img>` tag.
  - Remove `loading="lazy"` from this specific above-the-fold image to ensure immediate discoverability by the browser.
- **Production Build Verification:** Ensure all future performance testing is conducted on a minified production build (e.g., via Vite's `build` and `preview` commands) rather than the local development server to accurately gauge JavaScript parsing and compiling times.

### 2.2. Network & API Efficiency

**Current Issue:** Critical request chains are delaying the initial page render (e.g., waiting sequentially for `/auth/me` and `/places/top-rated` from `shamelco.runasp.net`).
**Requirements:**

- **Parallel Data Fetching:** Refactor frontend data fetching logic to execute independent API calls (like authentication state and top-rated places) concurrently using `Promise.all` or parallel React Query configurations.
- **Explicit Image Dimensions:** Set explicit `width` and `height` attributes on all image elements (specifically `Logo.svg`) to prevent Cumulative Layout Shift (CLS) during load.

### 2.3. Security & Best Practices

**Current Issue:** Missing security headers and improper cookie configurations are triggering browser warnings.
**Requirements:**

- **Cookie Configuration:** Update the .NET backend authentication configuration for `AccessToken` and `RefreshToken` cookies. Ensure they are configured with `SameSite=None` and `Secure=true` attributes to support safe cross-origin requests.
- **Implement Security Headers (Backend):** Configure the .NET middleware to include the following HTTP response headers:
  - **Content-Security-Policy (CSP):** To mitigate XSS vulnerabilities.
  - **Strict-Transport-Security (HSTS):** To enforce secure connections.
  - **Cross-Origin-Opener-Policy (COOP):** For origin isolation.
  - **X-Frame-Options (XFO):** Set to `DENY` or `SAMEORIGIN` to prevent clickjacking.

### 2.4. Accessibility (a11y)

**Current Issue:** Low contrast ratios on specific UI elements make text difficult to read.
**Requirements:**

- **Color Contrast Adjustments:** Update the CSS utility classes (Tailwind) for text and backgrounds to meet WCAG AA contrast standards. Target areas include:
  - The main search input field (`placeholder="ابحث عن اسم الملعب أو المنطقة..."`).
  - Pricing text overlays on Venue and Pitch cards (e.g., "سعر الساعة يبدأ من...").

### 2.5. SEO & Crawlability

**Current Issue:** Search engine crawlers lack context and are failing to read the `robots.txt` file correctly.
**Requirements:**

- **Meta Description:** Inject a concise `<meta name="description" content="...">` tag into the `<head>` of the `index.html` to summarize the platform's purpose for search engines.
- **Fix `robots.txt` Routing:** Resolve the routing issue where requests to `/robots.txt` are incorrectly returning the React SPA `index.html` fallback. Ensure the server explicitly serves the static `robots.txt` file with a `200 OK` status and `text/plain` content type.

---

## 3. Acceptance Criteria

1.  **Performance:** The production build achieves a Performance score of >85 on Lighthouse. Unused JS warnings for `react-icons` and `recharts` are resolved.
2.  **Accessibility:** The Accessibility score reaches 100, with no failing elements for color contrast.
3.  **Best Practices:** The Best Practices score reaches >95. No third-party cookie warnings appear in the console, and all required security headers are verified via network inspection.
4.  **SEO:** The SEO score reaches 100. A valid `robots.txt` file is accessible, and a meta description is present in the DOM.
