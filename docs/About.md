# Product Requirements Document (PRD): Payment Gateway (Paymob) Compliance

## 1. Overview

**Objective:** To fulfill the standard compliance requirements mandated by Paymob to activate the production payment gateway. This involves updating the frontend (React/TypeScript) and backend (.NET) to reflect a legitimate, fully operational business.

## 2. Scope

The scope of this PRD covers the addition of mandatory static pages, updating the footer navigation, and ensuring the product catalog contains realistic data and pricing.

## 3. Requirements

### 3.1. REQ-1: Real Products and Pricing (Catalog Data)

- **Description:** The application must display realistic products or services with actual prices in the local currency (EGP), replacing any "Lorem Ipsum" or placeholder seed data.
- **Technical Implementation:**
  - **Backend (.NET EF Core):** Update the database seed data to insert 4-5 realistic products/services.
  - **Frontend (React):** Ensure product cards render the product name, description, high-quality image, and price clearly.
- **Acceptance Criteria:**
  - No dummy text is visible on the product listing or details pages.
  - The "Add to Cart" and checkout flows work seamlessly up to the payment step.

### 3.2. REQ-2: Contact Us Page

- **Description:** A dedicated page allowing users to contact the business, proving the existence of a reliable customer support channel.
- **Technical Implementation:** Create a new route `/contact`.
- **Acceptance Criteria:**
  - Must explicitly display a real Support Email.
  - Must explicitly display a Phone Number.
  - Must explicitly display a Business Address (e.g., Cairo, Egypt).
  - (Optional) A functional contact form connected to a backend notification endpoint.

### 3.3. REQ-3: About Us Page

- **Description:** A page detailing the company’s identity, mission, and the value it provides to customers.
- **Technical Implementation:** Create a new route `/about`.
- **Acceptance Criteria:**
  - Contains at least two professional paragraphs describing the business and its operational scope.

### 3.4. REQ-4: Privacy Policy Page

- **Description:** A legal page outlining how user data is collected, used, and protected.
- **Technical Implementation:** Create a new route `/privacy-policy`.
- **Acceptance Criteria:**
  - Must include a clear clause stating that **credit card data is never stored on our servers** and is exclusively handled via the secure payment gateway (Paymob).
  - Standard data protection boilerplate included.

### 3.5. REQ-5: Refund & Cancellation Policy Page

- **Description:** A clear set of rules protecting both the merchant and the customer regarding returns and chargebacks.
- **Technical Implementation:** Create a new route `/refund-policy`.
- **Acceptance Criteria:**
  - Specifies the eligible timeframe for returns (e.g., 14 days).
  - Details the acceptable condition of returned items.
  - Specifies the expected timeline for funds to be returned to the customer's card (e.g., 7-14 business days).
  - Explains the order cancellation process before fulfillment.

### 3.6. REQ-6: Global Footer Navigation

- **Description:** All compliance and legal pages must be easily accessible from anywhere on the application.
- **Technical Implementation:** Update the global `Footer` UI component.
- **Acceptance Criteria:**
  - Footer contains working links to `/contact`, `/about`, `/privacy-policy`, and `/refund-policy` on all pages.

## 4. Timeline & Execution Steps

- **Step 1 (Backend):** Implement database migrations or seeding scripts for realistic mock products.
- **Step 2 (Frontend):** Scaffold the 4 new static routes and wire them into the React router.
- **Step 3 (Content):** Populate the static pages with the required legal and business text.
- **Step 4 (UI/UX):** Add the links to the global footer and verify responsive design.
- **Step 5 (QA):** Verify all requirements are met on the staging environment before sending the URL to Paymob for review.
