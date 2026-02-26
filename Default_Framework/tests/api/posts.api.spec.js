// @ts-check
import { test, expect } from '@playwright/test';
import { PostsApi } from '../../api/PostsApi.js';

/**
 * API test suite for /posts resource (JSONPlaceholder).
 *
 * Pattern:
 *   1. Instantiate the API client using the `request` fixture.
 *   2. Call endpoint methods — each returns a Playwright APIResponse.
 *   3. Assert status code and response body in the test.
 *
 * Key assertions:
 *   expect(response).toBeOK()          → status is 2xx
 *   expect(response.status()).toBe(201) → exact status code
 *   expect(body).toHaveProperty('id')  → field exists
 *   expect(body).toMatchObject({...})  → partial object match
 */
test.describe('Posts API', () => {
  /** @type {PostsApi} */
  let postsApi;

  test.beforeEach(async ({ request }) => {
    postsApi = new PostsApi(request);
  });

  // ─── GET ───────────────────────────────────────────────────────────────────

  test('GET /posts - returns 100 posts', async () => {
    const response = await postsApi.getAllPosts();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body).toHaveLength(100);
  });

  test('GET /posts/:id - returns correct post', async () => {
    const response = await postsApi.getPost(1);

    expect(response).toBeOK();

    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      userId: 1,
    });
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });

  test('GET /posts?userId=1 - filters posts by user', async () => {
    const response = await postsApi.getPostsByUser(1);

    expect(response).toBeOK();

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    // Every returned post must belong to userId 1
    body.forEach((post) => expect(post.userId).toBe(1));
  });

  // ─── POST ──────────────────────────────────────────────────────────────────

  test('POST /posts - creates a new post and returns 201', async () => {
    const newPost = {
      title: 'QA Automation Post',
      body: 'Created via Playwright API test',
      userId: 1,
    };

    const response = await postsApi.createPost(newPost);

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(newPost);
    expect(body).toHaveProperty('id'); // server assigns an id
  });

  // ─── PUT ───────────────────────────────────────────────────────────────────

  test('PUT /posts/:id - fully updates a post', async () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1,
    };

    const response = await postsApi.updatePost(1, updatedPost);

    expect(response).toBeOK();

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
    expect(body.body).toBe('Updated body content');
  });

  // ─── PATCH ─────────────────────────────────────────────────────────────────

  test('PATCH /posts/:id - partially updates a post title', async () => {
    const response = await postsApi.patchPost(1, { title: 'Patched Title' });

    expect(response).toBeOK();

    const body = await response.json();
    expect(body.title).toBe('Patched Title');
  });

  // ─── DELETE ────────────────────────────────────────────────────────────────

  test('DELETE /posts/:id - deletes a post and returns 200', async () => {
    const response = await postsApi.deletePost(1);

    expect(response.status()).toBe(200);
  });
});
