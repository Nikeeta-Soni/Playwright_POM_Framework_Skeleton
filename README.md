# Default Framework — Playwright Skeleton

A minimal Playwright end-to-end testing skeleton supporting both **UI (Page Object Model)** and **API automation**. Use this as a starting point for new QA projects.

---

## Project Structure

```
Default_Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI pipeline (GitHub Actions)
├── api/
│   ├── BaseApiClient.js        # Base class — shared HTTP methods
│   └── PostsApi.js             # Example API client (JSONPlaceholder /posts)
├── pages/
│   ├── BasePage.js             # Base class — shared browser helpers
│   └── PlaywrightPage.js       # Example page object (playwright.dev)
├── tests/
│   ├── example.spec.js         # Example UI test using POM
│   └── api/
│       └── posts.api.spec.js   # Example API tests (GET/POST/PUT/PATCH/DELETE)
├── playwright.config.js        # Playwright configuration
├── package.json
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

---

## Installation

\`\`\`bash
npm install
npx playwright install
\`\`\`

---

## Running Tests

| Command | Description |
|---|---|
| \`npx playwright test\` | Run all tests (headless) |
| \`npx playwright test --headed\` | Run with browser visible |
| \`npx playwright test --ui\` | Open Playwright UI mode |
| \`npx playwright test --project=chromium\` | Run UI tests on a single browser |
| \`npx playwright test tests/api/\` | Run API tests only |
| \`npx playwright test tests/example.spec.js\` | Run UI tests only |
| \`npx playwright show-report\` | Open the last HTML report |

---

## Page Object Model Pattern

### How it works

\`\`\`
tests/
  └── example.spec.js      ← imports page objects, contains expect()

pages/
  ├── BasePage.js          ← shared helpers (navigate, getTitle, waitForLoad)
  └── PlaywrightPage.js    ← page-specific locators + actions
\`\`\`

**Rules:**
- Locators and actions live in page objects, **not** in tests.
- Assertions (\`expect\`) live in tests, **not** in page objects.
- Every page object extends \`BasePage\`.

---

## Adding a New Page Object

1. Create \`pages/MyFeaturePage.js\`:

\`\`\`js
// @ts-check
import { BasePage } from './BasePage.js';

export class MyFeaturePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async goto() {
    await this.navigate('https://example.com/feature');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
\`\`\`

2. Use it in a test:

\`\`\`js
import { test, expect } from '@playwright/test';
import { MyFeaturePage } from '../pages/MyFeaturePage.js';

test('submits the form', async ({ page }) => {
  const featurePage = new MyFeaturePage(page);
  await featurePage.goto();
  await featurePage.clickSubmit();
});
\`\`\`

---

## CI/CD

Tests run automatically on every push and pull request to \`main\`/\`master\` via GitHub Actions (\`.github/workflows/playwright.yml\`).

- Browsers: Chromium, Firefox, WebKit
- Retries: 2 (CI only)
- Workers: 1 (CI), auto (local)
- Report: uploaded as a GitHub Actions artifact (30-day retention)

---

## Configuration

| Setting | Value | Notes |
|---|---|---|
| \`testDir\` | \`./tests\` | Where tests are discovered |
| \`fullyParallel\` | \`true\` | Tests run in parallel |
| \`reporter\` | \`html\` | HTML report generated after each run |
| \`trace\` | \`on-first-retry\` | Traces captured on retry for debugging |

---

## API Automation Pattern

Playwright's built-in \`request\` fixture handles HTTP calls — no extra libraries needed.

### How it works

\`\`\`
tests/api/
  └── posts.api.spec.js    ← imports API clients, contains expect()

api/
  ├── BaseApiClient.js     ← shared HTTP methods (get, post, put, patch, delete)
  └── PostsApi.js          ← resource-specific endpoints
\`\`\`

**Rules:**
- Endpoints and request construction live in API client classes, **not** in tests.
- Assertions (\`expect\`) live in tests, **not** in API clients.
- Every API client extends \`BaseApiClient\`.

### Key assertion methods

\`\`\`js
expect(response).toBeOK()              // status is 2xx
expect(response.status()).toBe(201)    // exact status code
expect(body).toHaveProperty('id')      // field exists
expect(body).toMatchObject({ id: 1 }) // partial object match
expect(Array.isArray(body)).toBeTruthy()
\`\`\`

### Adding a New API Client

1. Create \`api/MyResourceApi.js\`:

\`\`\`js
// @ts-check
import { BaseApiClient } from './BaseApiClient.js';

export class MyResourceApi extends BaseApiClient {
  constructor(request) {
    super(request, 'https://api.example.com');
  }

  async getAll() {
    return this.get('/resource');
  }

  async create(data) {
    return this.post('/resource', data);
  }
}
\`\`\`

2. Use it in a test:

\`\`\`js
import { test, expect } from '@playwright/test';
import { MyResourceApi } from '../../api/MyResourceApi.js';

test.describe('My Resource API', () => {
  let api;

  test.beforeEach(async ({ request }) => {
    api = new MyResourceApi(request);
  });

  test('GET /resource - returns list', async () => {
    const response = await api.getAll();
    expect(response).toBeOK();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
\`\`\`
