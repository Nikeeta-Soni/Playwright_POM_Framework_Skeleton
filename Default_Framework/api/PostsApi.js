// @ts-check
import { BaseApiClient } from './BaseApiClient.js';

/**
 * PostsApi
 * --------
 * API client for the /posts resource on JSONPlaceholder.
 * Demonstrates how to model a REST resource as an API class.
 *
 * Base URL: https://jsonplaceholder.typicode.com
 * Docs:     https://jsonplaceholder.typicode.com/
 *
 * Copy this file as a template for your own API resources.
 */
export class PostsApi extends BaseApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    super(request, 'https://jsonplaceholder.typicode.com');
  }

  // ─── Endpoints ─────────────────────────────────────────────────────────────

  /** GET /posts — fetch all posts */
  async getAllPosts() {
    return this.get('/posts');
  }

  /**
   * GET /posts/:id — fetch a single post
   * @param {number} id
   */
  async getPost(id) {
    return this.get(`/posts/${id}`);
  }

  /**
   * GET /posts?userId=:userId — filter posts by user
   * @param {number} userId
   */
  async getPostsByUser(userId) {
    return this.get('/posts', { params: { userId } });
  }

  /**
   * POST /posts — create a new post
   * @param {{ title: string, body: string, userId: number }} postData
   */
  async createPost(postData) {
    return this.post('/posts', postData);
  }

  /**
   * PUT /posts/:id — full update of a post
   * @param {number} id
   * @param {{ title: string, body: string, userId: number }} postData
   */
  async updatePost(id, postData) {
    return this.put(`/posts/${id}`, postData);
  }

  /**
   * PATCH /posts/:id — partial update of a post
   * @param {number} id
   * @param {object} fields - Only the fields to update
   */
  async patchPost(id, fields) {
    return this.patch(`/posts/${id}`, fields);
  }

  /**
   * DELETE /posts/:id — delete a post
   * @param {number} id
   */
  async deletePost(id) {
    return this.delete(`/posts/${id}`);
  }
}
