// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var datetime = require('node-datetime');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    const dt = datetime.create();
    const md = dt.format('md');
    const ri = Math.floor(Math.random() * (1000 - 900) + 900)
    const reportName="rpt" + md + ri

    var newData = {
      ...data,
      reportName
    };
    context.data = newData;

    return context;
  };
};
