const { json } = require("express");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    // console.log(this);
    return this;
  }

  filter() {
    const querycopy = { ...this.queryStr };

    // THIS IS FOR REMOVE EXTRA QUERY FOR QUERY
    const removeFileds = ["keyword", "limit", "page"];
    removeFileds.forEach((key) => delete querycopy[key]);

    // FILTER FOR PRICE AND RATING

    let querystr = JSON.stringify(querycopy);
    // console.log(querycopy);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // this is $
    // querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)
    // console.log(querystr);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultPerPage) {
    const correntPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (correntPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
