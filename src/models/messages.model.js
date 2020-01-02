// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
var datetime = require('node-datetime');

class messages extends Model {

  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' },
        userId: 'integer',
      }
    };
  }

  $beforeInsert() {
//    this.createdAt = this.updatedAt = new Date().toISOString(); //mssql?
       var dt = datetime.create();
        var createdAt = dt.format('Y-m-d H:M:S');  
       this.createdAt = this.updatedAt = createdAt; 

  }

  $beforeUpdate() {
//    this.updatedAt = new Date().toISOString();
//    this.updatedAt = new Date().toISOString();
       var dt = datetime.create();
        var updatedAt = dt.format('Y-m-d H:M:S');  
    this.updatedAt = updatedAt;

  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('messages').then(exists => {
    if (!exists) {
      db.schema.createTable('messages', table => {
        table.increments('id');
        table.string('text');
        table.integer('userId');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created messages table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating messages table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating messages table', e)); // eslint-disable-line no-console

  return messages;
};
