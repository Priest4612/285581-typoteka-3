'use strict';

const axios = require(`axios`);
const {DEFAULT_PORT_API} = require(`../../settings`);


class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  async getArticles({limit, offset, hot} = {}) {
    return await this._load(`/articles`, {params: {limit, offset, hot}});
  }

  async getArticle(id) {
    return await this._load(`/articles/${id}`);
  }

  async getArticlesByCategory({id, limit, offset}) {
    return await this._load(`/articles/category/${id}`, {params: {limit, offset}});
  }

  async getCategories({needCount}) {
    return await this._load(`/categories`, {params: {needCount}});
  }

  async search(query) {
    const result = await this._load(`/search`, {params: {query}});
    return result;
  }

  async createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  async editArticle(id, data) {
    return this._load(`/articles/${id}`, {
      method: `PUT`,
      data,
    });
  }

  async getComments({limit, offset, last} = {}) {
    return await this._load(`/comments`, {params: {limit, offset, last}});
  }

}


const TIMEOUT = 1000;
const port = process.env.API_PORT || DEFAULT_PORT_API;
const defaultURL = `http://localhost:${port}/api/`;

const defaultAPI = new API(defaultURL, TIMEOUT);


module.exports = {
  API,
  getAPI: () => defaultAPI,
};
