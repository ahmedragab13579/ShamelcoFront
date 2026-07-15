# ⚽🎮 Shamelco Frontend Client Application

Shamelco is a modern, high-performance web dashboard client designed to manage sports facilities (soccer/football pitches, padel courts) and entertainment venues (gaming zones, cafes, lounges).

This repository houses the frontend client SPA built with **React 19**, **Vite**, **TypeScript**, and styled with **Tailwind CSS**. It communicates with a clean-architecture ASP.NET Core backend to manage real-time bookings, cashier dashboards, and live floor plans.

---

## 🎨 Design & Interface Aesthetics

Shamelco features a premium dark-mode theme utilizing:

- **Glassmorphism**: Elegant translucent panels with subtle borders.
- **Modern Typography**: Styled using professional sans-serif fonts.
- **Interactive Visualizations**: Real-time status cards and grid layouts representing pitches, venues, and consoles.
- **Multi-lingual Support**: Native LTR (English) and RTL (Arabic) layouts with auto-direction formatting.

---

## 🛠️ Technology Stack & Libraries

| Category               | Technology / Library           | Role                                                     |
| :--------------------- | :----------------------------- | :------------------------------------------------------- |
| **Core Framework**     | React 19.2                     | High-performance user interface framework                |
| **Build Tools**        | Vite 8.0 & TypeScript 6.0      | Speed-optimized bundler and static typing                |
| **Routing**            | React Router Dom 7.15          | Client-side routing, layout hierarchy, and guards        |
| **Styling**            | Tailwind CSS 4.3               | Utility-first responsive design system                   |
| **State & Fetching**   | TanStack React Query 5 & Axios | Declarative caching, server-state sync, and API clients  |
| **Form Management**    | React Hook Form 7 & Zod        | Clean validation schemas and high-fidelity form states   |
| **Localization**       | i18next & react-i18next        | Seamless Arabic/English translation and locale detection |
| **Charts & Analytics** | Recharts 3.8                   | Dynamic dashboard SVG widgets and reporting charts       |
| **Helper Tools**       | Lucide Icons & Date-fns        | Icon libraries and date parsing utils                    |

---

## 🚀 Key Application Features

### 1. Unified Customer Onboarding & Search

- Interactive search hero on the **Home** view.
- Advanced filter controls on the **Explore** page (filtration by resource type, sport category, location, and rating).
- Dynamic reviews and stars display.

### 2. Double-Booking Protection & Slot Checkout

- Fully validated checkout pipeline ensuring dates, tables, and time slot restrictions conform to server schedules.
- Protected checkout components requiring authenticated `Customer` profiles.

### 3. Live Floor Plan Grid

- Visual grids rendering tables inside a venue lounge.
- Color-coded status updates (Available vs. Busy) representing real-time customer sessions.

### 4. Comprehensive Owner Console

- Single-pane management dashboard for booking schedules, hourly rates, and custom pricing templates.
- **Consoles Management**: Link physical gaming hardware (PlayStation, Xbox) to target lounge tables.
- Graphical metrics showing revenue analytics, peak hour occupancies, and customer statistics.

---

## 💻 Local Development Setup

### Prerequisites

Make sure you have [Node.js (v18+)](https://nodejs.org/) installed on your machine.

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ahmedragab13579/ShamelcoFront.git
   cd ShamelcoFront/Shamelco
   ```

2. **Install dependency packages:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify the URL of your backend API:

   ```env
   VITE_API_BASE_URL=https://localhost:7111/api/v1
   ```

4. **Launch the development server:**

   ```bash
   npm run dev
   ```

   The application will run locally at: `http://localhost:5173`

5. **Build and package for production:**
   ```bash
   npm run build
   ```
   The optimized production assets will be output to the `dist/` directory.

---

## 🗺️ System Route Map & Screens (31 Routes)

This section maps and describes every screen in the system. Replace the placeholder images in `docs/assets/screenshots/` with actual screenshots of your application views to complete the visual documentation.

---

### 🔑 Group A: Authentication & Security Views

#### 1. Root Router Redirect (`/`)

- **Access Level**: Public (Redirect Logic)
- **Role**: The main switcher that detects if the user is authenticated. It routes Customers to `/home`, Owners/Partners to `/dashboard/profile` or `/setup`, and guests to `/auth/login`.
- **Screenshot**:
  ![Root Router Redirect](https://i.suar.me/zX5E6/l)
  ![Root Router Redirect](https://i.suar.me/Qp1px/l)

---

#### 3. Login Page (`/auth/login`)

- **Access Level**: Public
- **Role**: Secure credentials input portal supporting dual roles (Customer and Owner). Redirects to appropriate landing pages on success.
- **Screenshot**:
  ![Auth Layout Container](https://i.suar.me/Zz3vJ/l)

---

#### 4. Registration Page (`/auth/register`)

- **Access Level**: Public
- **Role**: New user onboarding form. Separates account type settings (Customer vs Owner Profile specs).
- **Screenshot**:
  ![Auth Layout Container](https://i.suar.me/6z5za/l)

---

#### 5. Forget Password Page (`/auth/forget-password`)

- **Access Level**: Public
- **Role**: Form to request a secure password recovery token sent via email.
- **Screenshot**:
  ![Forget Password Page](docs/assets/screenshots/auth-forget-password.png)

---

#### 6. Reset Password Page (`/auth/reset-password`)

- **Access Level**: Public
- **Role**: Target interface for completing password resets utilizing token credentials from emails.
- **Screenshot**:
  ![Reset Password Page](https://i.suar.me/qvGvn/l)
  ![Reset Password Page](https://i.suar.me/e9599/l)

---

#### 7. Change Password Page (`/auth/change-password`)

- **Access Level**: Protected (Customer / Owner)
- **Role**: Profile settings utility to update credentials securely when authenticated.
- **Screenshot**:
  ![Change Password Page](https://i.suar.me/Zz3vJ/l)

---

### 🌐 Group B: Common & Utility Pages

#### 8. Success Checkout View (`/success`)

- **Access Level**: Public
- **Role**: Confirmational display shown to customers after successful payment processing or booking confirmations.
- **Screenshot**:
  ![Success Checkout View](dhttps://i.suar.me/7nLaj/l)

---

#### 9. 404 Not Found Page (`*`)

- **Access Level**: Public
- **Role**: Elegant fallback screen with back-to-home actions displayed when users request invalid routes.
- **Screenshot**:
  ![404 Not Found Page](https://i.suar.me/NpLz9/l)

---

#### 10. Entity Setup Wizard (`/setup`)

- **Access Level**: Protected (Owner Only)
- **Role**: Initial onboarding setup wizard for Owners to register their first Pitch or Venue right after account creation.
- **Screenshot**:
  ![Entity Setup Wizard](https://i.suar.me/Op2zw/l)
  ![Entity Setup Wizard](https://i.suar.me/MpYzv/l)
  ![Entity Setup Wizard](https://i.suar.me/Bp8pj/l)

---

### ⚽ Group C: Customer Core Pages

#### 11. Customer Home View (`/home`)

- **Access Level**: Public (Default Client Landing)
- **Role**: Features a search banner, sport categories (Five-A-Side, Padel, Cafe, etc.), and highlighted/top-rated locations.
- **Screenshot**:
  ![Customer Home View](https://i.suar.me/vAGAW/l)
  ![Customer Home View](https://i.suar.me/zX5E6/l)

---

#### 12. Exploration Panel (`/explore`)

- **Access Level**: Public
- **Role**: Search interface displaying combined results. Provides instant filters by sport type, city, location name, and price ranges.
- **Screenshot**:
  ![Exploration Panel](https://i.suar.me/YQ8v9/l)

---

#### 16. Pitch Booking checkout (`/pitches/:id/booking`)

- **Access Level**: Protected (Customer Only)
- **Role**: Dynamic time slot reservation calendar, billing breakdown, and checkout processor for pitches.
- **Screenshot**:
  ![Pitch Booking checkout](https://i.suar.me/wzGp4/l)

---

#### 17. Venues Directory (`/venues`)

- **Access Level**: Public
- **Role**: Paginated list of cafes, boardgame spots, and consoles lounges.
- **Screenshot**:
  ![Venues Directory](https://i.suar.me/xzGpV/l)

---

#### 18. Venue Details View (`/venues/:id`)

- **Access Level**: Public
- **Role**: Detailed layout of the venue profile, highlighting operating hours, pricing, table listings, and attached setups.
- **Screenshot**:
  ![Venue Details View](https://i.suar.me/4z9Aq/l)

---

#### 19. Live Floor Plan Viewer (`/venues/:id/floor`)

- **Access Level**: Public / Customer
- **Role**: Dynamic layout rendering tables in real-time to monitor table status before initiating reservations.
- **Screenshot**:
  ![Live Floor Plan Viewer](https://i.suar.me/9zal7/l)

---

#### 21. Customer Profile Center (`/profile`)

- **Access Level**: Protected (Customer Only)
- **Role**: User dashboard displaying active booking history, invoice logs, notifications, and profile details.
- **Screenshot**:
  ![Customer Profile Center](https://i.suar.me/Kp9pZ/l)

---

### 📊 Group D: Partner Dashboards & Management

#### 22. Owner Profile Settings (`/dashboard/profile`)

- **Access Level**: Protected (Owner Only)
- **Role**: Settings interface for managing partner credentials, tax info, business registers, and payouts.
- **Screenshot**:
  ![Owner Profile Settings](https://i.suar.me/Gn7EN/l)

---

#### 23. Pitch Dashboard Console (`/dashboard/pitch/:id`)

- **Access Level**: Protected (Owner Only)
- **Role**: The main console for an owner's sports court. Shows current bookings, active sessions, and status.
- **Screenshot**:
  ![Pitch Dashboard Console](https://i.suar.me/yzGEe/l)

---

#### 24. Pitch Settings Configurator (`/dashboard/pitch/:id/settings`)

- **Access Level**: Protected (Owner Only)
- **Role**: Configures operational hours, hourly rates, location addresses, and images for a specific pitch.
- **Screenshot**:
  ![Pitch Settings Configurator](https://i.suar.me/0p7A0/l)

---

#### 25. Pitch More Actions (`/dashboard/pitch/:id/more-actions`)

- **Access Level**: Protected (Owner Only)
- **Role**: Contextual panel for managing custom schedule rules, blocks, blackouts, and maintenance timings.
- **Screenshot**:
  ![Pitch More Actions](https://i.suar.me/Apj3O/l)

---

#### 26. Venue Dashboard Console (`/dashboard/venue/:id`)

- **Access Level**: Protected (Owner Only)
- **Role**: Cashier screen displaying lounge tables, live sessions, active check-ins, and ongoing point-of-sale orders.
- **Screenshot**:
  ![Venue Dashboard Console](https://i.suar.me/Jp5zl/l)

---

#### 28. Venue Consoles Manager (`/dashboard/venue/:id/consoles-management`)

- **Access Level**: Protected (Owner Only)
- **Role**: Interface to register and manage gaming console assets (PlayStation, Xbox) and allocate them to tables.
- **Screenshot**:
  ![Venue Consoles Manager](https://i.suar.me/g4GP5/l)
  ![Venue Consoles Manager](https://i.suar.me/dgYpJ/l)

---

#### 29. Venue More Actions (`/dashboard/venue/:id/more-actions`)

- **Access Level**: Protected (Owner Only)
- **Role**: Specialized panels to manage layout additions, table setup details, and general configurations.
- **Screenshot**:
  ![Venue More Actions](https://i.suar.me/jvG5r/l)
  ![Venue More Actions](https://i.suar.me/rgGpq/l)

---

#### 30. Venue Table Settings (`/dashboard/venue/:id/table/:tableId`)

- **Access Level**: Protected (Owner Only)
- **Role**: Configures capacity, labels, dedicated hourly rates, and attached hardware for a single table.
- **Screenshot**:
  ![Venue Table Settings](https://i.suar.me/V9OzK/l)
  ![Venue Table Settings](https://i.suar.me/Jp5zl/l)

---

#### 31. Dashboard Analytics Reports (`/dashboard/:type/:id/reports`)

- **Access Level**: Protected (Owner Only)
- **Role**: Visualization page featuring graphs for revenue breakdown, peak booking hours, occupancy rates, and exportable financial data.
- **Screenshot**:
  ![Dashboard Analytics Reports](https://i.suar.me/NpLp9/l)
