const fs = require('fs');

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8');
const testRegExp = /^\[Demo-[0-9]+\] /g;

const result = testRegExp.exec(commitMsg);
if (result === null) {
  console.log('Commit message should be of the form: "[Demo-<ticket number>] <commit message text>"');
  console.log('Example:  "[Demo-123] added this cool feature"');
  console.log(`Provided: "${commitMsg}"`);
  process.exit(1);
}
process.exit(0);
