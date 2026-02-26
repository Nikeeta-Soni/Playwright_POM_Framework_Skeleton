// @ts-check

/**
 * BaseApiClient
 * -------------
 * All API client classes extend this.
 * Wraps Playwright's request context with common HTTP methods.
 * Mirrors the role of BasePage.js — but for API layers.
 *
 * Usage:
 *   class MyApi extends BaseApiClient {
 *     constructor(request) { super(request, 'https://api.example.com'); }
 *   }
 */
export class BaseApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL - Base URL for all requests in this client
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * GET request
   * @param {string} endpoint - e.g. '/posts' or '/posts/1'
   * @param {object} [options] - Playwright request options (headers, params, etc.)
   */
  async get(endpoint, options = {}) {
    return this.request.get(`${this.baseURL}${endpoint}`, options);
  }

  /**
   * POST request
   * @param {string} endpoint
   * @param {object} data - Request body (sent as JSON)
   * @param {object} [options]
   */
  async post(endpoint, data, options = {}) {
    return this.request.post(`${this.baseURL}${endpoint}`, { data, ...options });
  }

  /**
   * PUT request
   * @param {string} endpoint
   * @param {object} data - Request body (sent as JSON)
   * @param {object} [options]
   */
  async put(endpoint, data, options = {}) {
    return this.request.put(`${this.baseURL}${endpoint}`, { data, ...options });
  }

  /**
   * PATCH request
   * @param {string} endpoint
   * @param {object} data - Partial update body
   * @param {object} [options]
   */
  async patch(endpoint, data, options = {}) {
    return this.request.patch(`${this.baseURL}${endpoint}`, { data, ...options });
  }

  /**
   * DELETE request
   * @param {string} endpoint
   * @param {object} [options]
   */
  async delete(endpoint, options = {}) {
    return this.request.delete(`${this.baseURL}${endpoint}`, options);
  }
}
