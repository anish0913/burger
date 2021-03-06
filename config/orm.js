var connection = require("../config/connection.js");

// Object value & Looping through the keys. Took from stack overflow.
function dataObj(object) {
  var array = [];
  for (var key in object) {
    var value = object[key];
    if (Object.hasOwnProperty.call(object, key)) { 
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      array.push(key + "=" + value);
    }
  }
  return array.toString();
}

// Select all from  table 
var orm = {
  selectItems: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";"
    connection.query(queryString, function (err, response) {
      if (err) throw err;
      cb(response);
    })

  },

  // Insert new row 
  insertItem: function (table, col, val, cb) {
    var queryString = "INSERT INTO " + table + '(' + col + ') VALUES ("' + val + '");'
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })
  },

  // Updates the table
  updateItem: function (table, colVal, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + dataObj(colVal) + " WHERE " + condition + ";"
    connection.query(queryString, function (err, response) {
      console.log(queryString);
      if (err) throw err;

      cb(response);
    })
  }
} 
module.exports = orm;