const {extname} = require('path')


const get_file_extension = (filename) => {
    return extname(filename)
}

var fs = require('fs')

const reduct_file = (file_path, seperator) => {
  const regex = new RegExp(`(.*)${seperator}(.*)`, 'g');
  fs.readFile(file_path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(regex, `$1${seperator}[REDACTED]`);
  
    fs.writeFile(`${file_path}.example`, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}


const redact_bash_scripts = file_path => {
    reduct_file(file_path, "=")
}

const redact_json_file = file_path => {
 reduct_file(file_path, ":")
}

redact_bash_scripts('./examples/set_envs.sh')
redact_json_file('./examples/set_envs.json')
