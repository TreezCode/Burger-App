
// Import MySQL connection.
const connection = require("../config/connection.js");

// Print question marks
function printQuestionMarks(num) {
    let arr = [];
    
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Create orm object with methods
let orm = {

    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
            throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
      let queryString = "INSERT INTO " + table;
  
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
  
        connection.query(queryString, vals, function(err, result) {
            if (err) {
            throw err;
            }
    
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
            throw err;
            }
    
            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

// Export orm object
module.exports = orm;