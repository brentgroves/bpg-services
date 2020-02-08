/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');

const mqtt = require('mqtt');
const config = require('../../Config13318/config.json');
const hostname = app.get('host');
//const port = app.get('port');
const port = config.BPGServicesPort;
const server = app.listen(port, hostname);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', hostname, port)
);

// For good measure let's create a message
// So our API doesn't look so empty
/*
app.service('test').create({
  text: 'Hello world from the server',
});
app.service('mstest').create({
  text: 'Hello world from the server',
});
*/
// TEST ONLY SECTION
/*
  app.service('users')
    .create({
      "email": "bgroves@buschegroup.com",
      "password": "JesusLives1!",
      "userName": "bgroves",
      "firstName": "Brent",
      "lastName": "Groves",
      "isAdmin": true,
      "roles": [ "Admin", "Manager", "Quality"]


    }).then(async (res) => {
        console.log('created user!')
    }).catch(e => {
      console.error('Authentication error', e);
    });
*/
/*
app.service('hourlyoeevalues').find({
  query: {
    $limit: 10,
    $sort: {
      ID: 1
    }
  }
}).then((res) => {
console.log('In Find')
console.log(res.data[0])
}).catch(e => {
  // Show login page (potentially with `e.message`)
  console.error('find error', e);
});
*/
/*
app.service('Kep13318').create({
  text: 'Hello world from the server',
});
*/
/*
app.service('oeehourly').create({
  text: 'Hello world from the server',
});
*/
let mqttClient = mqtt.connect(config.MQTT);


mqttClient.on('connect', function() {
  mqttClient.subscribe('Kep13318', function(err) {
    if (!err) {
      console.log('BPGServices subscribed to: Kep13318');
    }
  });
  mqttClient.subscribe('Sproc13318', function(err) {
    if (!err) {
      console.log('BPGServices subscribed to: Sproc13318');
    }
  });

});
// message is a buffer
mqttClient.on('message', function(topic, message) {
  const p = JSON.parse(message.toString()); // payload is a buffer
  console.log(p);
  console.log(`Topic is: ${topic}`);
  let msg;
  if('Kep13318'==topic){
    console.log("Kep13318 message")
    msg = `${p.TransDate}, Work Center: ${p.WorkCenter},${p.NodeId},${p.Cycle_Counter_Shift_SL}`;
    app.service('Kep13318').create({
      text: msg,
    });
  }

  /*
  if('Sproc13318'==topic){
    console.log(`Sproc13318 message => ${message}`)
    // msg = `${p.TransDate}, ${p.Part_No},${p.Serial_No},${p.ProdServer},${p.Quantity},${p.Container_Status}`;
    app.service('Sproc13318').create({
       text: p,
    });
  }
  */
//  console.log(msg);
});
