"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
  function Block(restURL) {
    _classCallCheck(this, Block);

    this.restURL = restURL;
  }

  _createClass(Block, [{
    key: "detailsByHeight",
    value: async function detailsByHeight(id) {
      try {
        // Single block
        if (typeof id === "number") {
          var response = await _axios2.default.get(this.restURL + "block/detailsByHeight/" + id);
          return response.data;

          // Array of blocks.
        } else if (Array.isArray(id)) {
          var options = {
            method: "POST",
            url: this.restURL + "block/detailsByHeight",
            data: {
              heights: id
            }
          };
          var _response = await (0, _axios2.default)(options);

          return _response.data;
        }

        throw new Error("Input must be a number or array of numbers.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "detailsByHash",
    value: async function detailsByHash(hash) {
      try {
        // Single block
        if (typeof hash === "string") {
          var response = await _axios2.default.get(this.restURL + "block/detailsByHash/" + hash);
          return response.data;

          // Array of hashes.
        } else if (Array.isArray(hash)) {
          var options = {
            method: "POST",
            url: this.restURL + "block/detailsByHash",
            data: {
              hashes: hash
            }
          };
          var _response2 = await (0, _axios2.default)(options);

          return _response2.data;
        }

        throw new Error("Input must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return Block;
}();

exports.default = Block;