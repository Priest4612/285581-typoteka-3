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

  async getArticles(count) {
    return await this._load(`/articles`, {params: {count}});
  }

  async getHotArticles(limit) {
    return await this._load(`/articles/hot`, {params: {limit}});
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  async getCategories(count) {
    return await this._load(`/categories`, {params: {count}});
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
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
