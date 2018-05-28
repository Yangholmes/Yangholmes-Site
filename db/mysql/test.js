/**
 *
 */

const App = require('./index');
const options = require('./options')

let mysql = new App(options);

mysql.useDb('finance');

mysql.query('show tables').then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});
