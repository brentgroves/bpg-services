// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
var datetime = require("node-datetime");

class hourlyoeevalues extends Model {

  static get tableName() {
    return 'hourlyoeevalues';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'ID';
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  /*
  CREATE TABLE Kors.dbo.HourlyOEEValues (
  	ID int IDENTITY (1,1) NOT NULL,
  	Workcenter_Code varchar(50),
  	Job_number varchar(20),
  	Part_number varchar(60),
  	Data_hour INT,
  	Hourly_planned_production_count INT,
  	Hourly_actual_production_count INT,
  	Cumulative_planned_production_count INT,
  	Cumulative_actual_production_count INT,
  	scrap_count INT,
  	Downtime_minutes float,
  	Date_time_stamp DATETIME
  )

  */

  static get jsonSchema() {
    return {
      type: "object",
      required: ["Workcenter_Code","Job_number","Part_number","Data_hour",
      "Hourly_planned_production_count","Hourly_actual_production_count",
      "Cumulative_planned_production_count","Cumulative_actual_production_count",
      "scrap_count","Downtime_minutes"
    ],

      properties: {
        ID: { type: 'integer' },
        Workcenter_Code: { type: "string", minLength: 1, maxLength: 50 },
        Job_number: { type: "string", minLength: 1, maxLength: 20 },
        Part_number: { type: "string", minLength: 1, maxLength: 60 },
        Data_hour: { type: "integer",minimum:1,maximum:24 },
        Hourly_planned_production_count: { type: "integer",minimum:0,maximum:500 },
        Hourly_actual_production_count: { type: "integer",minimum:0,maximum:500 },
        Cumulative_planned_production_count: { type: "integer",minimum:0,maximum:5000 },
        Cumulative_actual_production_count: { type: "integer",minimum:0,maximum:5000 },
        scrap_count: { type: "integer",minimum:0,maximum:500 },
        Downtime_minutes: { type: 'number' }
      }
    };
  }

/*
id: { type: 'integer' },
parentId: { type: ['integer', 'null'] },
firstName: { type: 'string', minLength: 1, maxLength: 255 },
lastName: { type: 'string', minLength: 1, maxLength: 255 },
age: { type: 'number' },

// Properties defined as objects or arrays are
// automatically converted to JSON strings when
// writing to database and back to objects and arrays
// when reading from database. To override this
// behaviour, you can override the
// Model.jsonAttributes property.
address: {
  type: 'object',
  properties: {
    street: { type: 'string' },
    city: { type: 'string' },
    zipCode: { type: 'string' }
  }
}

*/
  $beforeInsert() {
    //    this.createdAt = this.updatedAt = new Date().toISOString();
    var dt = datetime.create();
    var createdAt = dt.format("Y-m-d H:M:S");
    this.Date_time_stamp = createdAt;
  }

  $beforeUpdate() {
    //    this.updatedAt = new Date().toISOString();
    var dt = datetime.create();
    var updatedAt = dt.format("Y-m-d H:M:S");
    this.Date_time_stamp = updatedAt;
  }
}

module.exports = function(app) {
  const db = app.get("knex");
  db.schema
    .hasTable("hourlyoeevalues")
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable("hourlyoeevalues", table => {
            table.increments("ID");
            table.string("Workcenter_Code",50);
            table.string("Job_number",20);
            table.string("Part_number",60);
            table.integer("Data_hour");
            table.integer("Hourly_planned_production_count");
            table.integer("Hourly_actual_production_count");
            table.integer("Cumulative_planned_production_count");
            table.integer("Cumulative_actual_production_count");
            table.integer("scrap_count");
            table.float("Downtime_minutes"); // unsure about mssql mantissa and ordinate and how they map to precision and scale.
            table.datetime("Date_time_stamp");
          })
          .then(() => console.log("Created hourlyoeevalues table")) // eslint-disable-line no-console
          .catch(e =>
            console.error("Error creating hourlyoeevalues table", e)
          ); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error("Error creating hourlyoeevalues table", e)); // eslint-disable-line no-console
  return hourlyoeevalues;
};
