if (process.env.NODE_ENV === 'production') {
  console.log("Building assets.")

  // We basically just create a child process that will run
  // the production bundle command
  var child_process = require('child_process');
  child_process.exec("npm run build:webpack", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}