- Strictly prohibit the direct use of the `dangerouslySetInnerHTML` prop across all components.
- If rendering dynamic HTML is absolutely necessary, utilize a dedicated sanitization library such as `DOMPurify`.
- **Example:** `const safeHTML = DOMPurify.sanitize(userInput);` prior to rendering in the UI.

### 3.3. Secure Data and Storage Management

- **Task:** Prevent the leakage of sensitive data or authentication tokens.
- **Implementation Steps:**
  - **Session Tokens:** Cease storing JWTs in `localStorage`. Transition to using secure, HttpOnly cookies issued by the server.
  - **Local Storage:** Implement a utility to encrypt any essential data saved to `localStorage` and decrypt it upon retrieval, ensuring no financial data or plain-text credentials are ever stored.
  - **State Management:** Implement a mechanism to purge sensitive data from memory (e.g., Redux Store or Context API) immediately upon user logout.

### 3.4. Routing Security

- **Task:** Protect authenticated routes and prevent bypassing via direct URL manipulation.
- **Implementation Steps:**
  - Develop a Higher-Order Component (HOC) or wrapper named `ProtectedRoute` to validate authentication status and role-based access controls.
  - Immediately redirect any unauthorized access attempts to the login interface using routing hooks (e.g., `useNavigate`).

### 3.5. API Communication Protection

- **Task:** Fortify outgoing requests and handle backend responses securely.
- **Implementation Steps:**
  - Configure request interceptors in the HTTP client (e.g., Axios) to attach CSRF tokens to the headers of POST/PUT/DELETE requests.
  - Intercept server error responses within the same HTTP client configuration to prevent stack traces or internal infrastructure details from leaking to the frontend. Display standardized, user-friendly error messages instead.

### 3.6. Content Security Policy (CSP)

- **Task:** Restrict resource loading origins to protect the UI from executing malicious external scripts.
- **Implementation Steps:**
  - Add a Meta tag in the root `index.html` file (or configure it via the hosting server):
    `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https://res.cloudinary.com; script-src 'self';">`
    _(Note: Allowed domains should be customized based on active services, such as Cloudinary for media optimization or specific payment gateways)._

## 4. Acceptance Criteria

1. The codebase passes all `ESLint` checks without any security-related warnings.
2. The `npm audit` report yields zero High/Critical severity vulnerabilities.
3. All user-inputted text is rendered as plain text unless explicitly pre-sanitized.
4. Direct URL access to any protected route fails without a valid authentication session, resulting in a redirect.
