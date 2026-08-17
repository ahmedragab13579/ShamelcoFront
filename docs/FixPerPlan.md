# Product Requirements Document (PRD)

## Project: Shamelco Frontend Performance Optimization

## 1. Executive Summary

This document outlines the required engineering tasks to optimize the frontend performance of the Shamelco web application. Recent diagnostics indicate significant bottlenecks in JavaScript execution, Largest Contentful Paint (LCP) delays, and main-thread blocking, which severely degrade the user experience. The goal is to address these specific technical debt items within the React/TypeScript architecture to achieve optimal Core Web Vitals.

## 2. Target Metrics (Core Web Vitals)

The optimization efforts must target the following benchmarks based on a Slow 4G / Mobile emulation environment:

- **LCP (Largest Contentful Paint):** Target < 2.5s _(Currently ~8.5s)_
- **FCP (First Contentful Paint):** Target < 1.8s _(Currently ~3.8s)_
- **TBT (Total Blocking Time):** Target < 200ms _(Currently ~600ms)_
- **Speed Index:** Target < 3.4s _(Currently ~21.4s)_
- **Lighthouse Performance Score:** Target 90+ _(Green Zone)_

---

## 3. Required Optimizations & Technical Requirements

### 3.1. JavaScript & Main-Thread Work

**Current State:** The main bundle (`index-BC5y3t_e.js`) is excessively large (~400 KiB), leading to 3.1 seconds of main-thread blocking and at least 7 long tasks. Forced reflows are occurring due to JavaScript querying geometric properties immediately after DOM state changes.
**Requirements:**

- **Implement Code Splitting:** Utilize `React.lazy()` and `Suspense` (or dynamic `import()`) to split the monolithic bundle into smaller, route-based chunks. Users should only download the JavaScript necessary for the current page.
- **Eliminate Unused JavaScript:** Audit `package.json` dependencies. Remove or dynamically import heavy, unused libraries to save the estimated 275+ KiB of wasted payload on the initial load.
- **Resolve Forced Reflows (Layout Thrashing):** Refactor React components/hooks that read DOM layout properties (e.g., `offsetWidth`, `clientHeight`) immediately after mutating the DOM. Batch DOM reads and writes using `requestAnimationFrame` or manage them properly within React's `useLayoutEffect` / `useEffect`.

### 3.2. LCP & Image Delivery

**Current State:** The hero image (e.g., `premium_synthetic_turf_football_field...jpg`) takes over 5 seconds to load, with an element render delay of 9.2s. The image is currently not easily discoverable by the browser's preloader.
**Requirements:**

- **Prioritize Hero Images:** Add `fetchpriority="high"` to the `<img>` tag of the Largest Contentful Paint element.
- **Disable Lazy Loading for LCP:** Ensure `loading="lazy"` is **removed** from any images visible above-the-fold on the initial load.
- **Explicit Dimensions:** Add explicit `width` and `height` attributes to all `<img>` tags. While CLS is currently 0, this prevents future layout shifts and helps the browser allocate space immediately.
- **Preconnect / Preload:** If images are hosted on a CDN or external domain, utilize `<link rel="preconnect">`. Add `<link rel="preload" as="image" href="...">` for the critical LCP image in the document `<head>`.

### 3.3. CSS & Render-Blocking Resources

**Current State:** The main stylesheet (`index-9lD2WFBW.css`) blocks the initial page render.
**Requirements:**

- **Optimize CSS Delivery:** Minify the CSS. Consider extracting and inlining critical CSS required for the initial viewport, and deferring non-critical CSS, to eliminate the render-blocking warning.

### 3.4. Accessibility (a11y) & UI Best Practices

**Current State:** The application suffers from low contrast ratios, unhandled console errors, and missing source maps.
**Requirements:**

- **Contrast Ratios:** Audit UI components and adjust background/foreground color palettes to meet WCAG AA standards for contrast (ratio of at least 4.5:1 for normal text).
- **Resolve Console Errors:** Identify and patch the root cause of the initial load browser console errors to ensure a clean execution environment.

### 3.5. Developer Experience & Tooling

- **Source Maps:** Configure Vite/Webpack to generate source maps for production (`sourcemap: true`). This aids in debugging the large first-party JavaScript without increasing the actual bundle size sent to end-users (ensure they are securely hosted or omitted from public assets if source code privacy is required, or use hidden source maps).

---

## 4. Acceptance Criteria

1.  The initial JavaScript payload (main bundle) is reduced by at least 50%.
2.  LCP image renders immediately without queuing delays, utilizing `fetchpriority="high"`.
3.  Chrome DevTools Performance trace shows **zero** "Forced reflow" warnings.
4.  No browser console errors are thrown upon initial page load.
5.  All text elements pass automated contrast ratio accessibility checks.
6.  The overall Lighthouse Performance score running locally under Slow 4G throttling consistently exceeds 80.
