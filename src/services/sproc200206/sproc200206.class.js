const mqtt = require('mqtt');
var datetime = require('node-datetime');
const config = require('../../../../Config13318/config.json');
const sql = require('mssql');
/* eslint-disable no-unused-vars */
exports.Sproc200206 = class Sproc200206 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const {$tableName,$limit,$skip} = params.query;
    console.log(params)
    try {
      let pool = await sql.connect({
        "user" : "sa",
        "password" : "S@Tsql@dmin1",
        "database" : "Kors",
        "server": "10.30.1.17"
      })


      // query database
      console.log(params.query.$tableName)

      let resultSet = await pool.request()
          .query(`select * from ${$tableName} ORDER BY primary_key OFFSET ${$skip} ROWS FETCH NEXT ${$limit} ROWS ONLY`)
      console.dir(resultSet)
      return resultSet.recordset;
    } catch (e) {
      console.log('caught exception!', e);
    }
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    var result;
    console.log("in Sproc200206.create()");
    const startDate ="2020-02-09T00:00:00";
    const endDate ="2020-02-10T23:59:59";
    console.log(`tableName: ${data.tableName}, startDate: ${data.startDate}, endDate: ${data.endDate}`);
    try {
      // have problems with knex and this working at same time on linux
//      let pool = await sql.connect(config.mssql)
      let pool = await sql.connect({
        "user" : "sa",
        "password" : "S@Tsql@dmin1",
        "database" : "Kors",
        "server": "10.30.1.17"
      })
      // query database
      const resultSet = await pool.request()
        .input("start_date", sql.DateTime, data.startDate)
        .input("end_date", sql.DateTime, data.endDate)
        .input("table_name", sql.VarChar(12), data.tableName)
        .output("record_count",sql.Int)
        .execute('Sproc200206');
        //console.log(resultSet);
        result=resultSet;
    } catch (e) {
      console.log('caught exception!', e);
    }
    //console.log(result);
    return result.output.record_count;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
