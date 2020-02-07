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
    const {$reportName,$limit,$skip} = params.query;
    try {
      let pool = await sql.connect(config.mssql)
      // query database
      console.log(params.query.$reportName)

      let resultSet = await pool.request()
          .query(`select * from ${$reportName} ORDER BY id OFFSET ${$skip} ROWS FETCH NEXT ${$limit} ROWS ONLY`)
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
    console.log("in Sproc200206.create()");
    const startDate ="2019-12-15T09:00:00";
    const endDate ="2019-12-15T09:00:00";
          console.log(data.reportName);
    // create the connection
    // query database
    try {
      let pool = await sql.connect(config.mssql)
      // query database
      const resultSet = await pool.request()
        .input("start_date", sql.DateTime, startDate)
        .input("end_date", sql.DateTime, endDate)
        .input("report_name", sql.VarChar(12), data.reportName)
        .execute('Sproc200206');
      console.dir(resultSet.recordset[0])

      resultSet.recordset.forEach(function(item, index) {
        // Update GMT time to local time.

        //var tz_transDate = item.TransDate;
        //var pastDateTime = datetime.create(tz_transDate);
        //var fmt = pastDateTime.format('Y-m-d H:M:S');
        //item.TransDate=fmt;
        console.log(item, index);
      });
      console.log(data);

//      const [rows, fields] = await c.query('CALL DS13318(?)', [transDate]);
  //    console.log(`Data received from Db on ${transDate}:\n`);
    } catch (e) {
      console.log('caught exception!', e);
    }
    // create the connection to database
    // create the connection to database
    /*
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });
    "Database": {
      "host": "localhost",
      "user": "brent",
      "password": "JesusLives1!",
      "insecureAuth": true,
      "database": "mach2"
    },
    */
/*
    con.connect(function(err) {
      if (err) throw err;

      // https://www.sitepoint.com/using-node-mysql-javascript-client/
      // con.query(`select * from DS13318`,function(err, resultSet){
      // con.query(`CALL DS13318("2019-12-15 09:00")`,function(err, rows){
      // con.query(`CALL DS13318('${transDate}')`,function(err, resultSet){
      con.query('CALL DS13318(?)', [transDate], function(err, resultSet) {
        if (err) throw err;
        console.log(`Data received from Db on ${transDate}:\n`);
        // console.log(resultSet[0][1]);
        resultSet[0].forEach(function(item, index) {
          // Update GMT time to local time.
          var tz_transDate = item.TransDate;
          var pastDateTime = datetime.create(tz_transDate);
          var fmt = pastDateTime.format('Y-m-d H:M:S');
          item.TransDate=fmt;
          // console.log(item, index);
        });
        console.log(resultSet[0]);
        let msgString = JSON.stringify(resultSet[0]);
        console.log(msgString);
        //const obj = JSON.parse(msgString); // payload is a buffer
        const obj = JSON.parse(msgString.toString()); // payload is a buffer
        console.log(obj);
        let rec0 = obj[0].TransDate;
        console.log(`Record 0 => ${rec0} `);

        //mqttClient.publish('Sproc13318', msgString);
      });
    });
*/
  //  console.log(`data=${data}`);
  //  console.log(`params=${params}`);
  /* USE THIS IF YOU WANT SOME OTHER APP TO CREATE RECORD
    let mqttClient = mqtt.connect(config.MQTT);
    let msg = {
      startDate: data.startDate,
      endDate: data.endDate
    };
    let msgString = JSON.stringify(msg);
    console.log(msg);
    mqttClient.publish('Sproc200206', msgString);
    */
/*
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
    */
    return data
    //
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
