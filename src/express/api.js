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

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  getCategories() {
    return this._load(`/categories`);
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
