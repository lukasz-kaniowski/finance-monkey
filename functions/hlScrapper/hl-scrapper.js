var Browser = require('zombie');
var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';


var browser = new Browser({
  waitDuration: '15s',
  loadCSS: false,
  userAgent: user_agent,
  runScripts: false
});

password = process.env.password;
username = process.env.username;
dob = process.env.dob;

module.exports.total = function () {
  return browser
    .visit('https://online.hl.co.uk/my-accounts/login-step-one')
    .then(function () {
        return browser.fill('input[name="username"]', username)
          .fill('input[name="DoB"]', dob)
          .click('input[name="submit"]')
      }
    )
    .then(function () {
        browser.queryAll('select').forEach(function (select) {
          browser.select("#" + select.id, password[select.title[10] - 1])
        });
        return browser.click('input[name="submit"]')
      }
    )

    .then(function () {
      return browser.text('#main-content tr:nth-child(1) strong > a')
    })

};
