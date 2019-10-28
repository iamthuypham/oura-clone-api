"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
const config = {
  secrets: {
    jwt: 'learneverything'
  },
  dbUrl: `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds151752.mlab.com:51752/oura`
};
exports.config = config;