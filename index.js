'use strict';
const {extname} = require('path')
const {get} = require('lodash')


const get_file_extension = (filename) => {
    return extname(filename)
}

var fs = require('fs')

const redact_file = (file_path, seperator) => {
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
    redact_file(file_path, "=")
}

const redact_json_file = file_path => {
 redact_file(file_path, ":")
}

const not_supported = arg => {
  console.error(`${arg} file type is not supported yet`)
}

const mapping_files = {'.sh': redact_bash_scripts,
'.json': redact_json_file
}


exports.redact =  file_path => {
  const extenstion = get_file_extension(file_path);
  get(mapping_files, extenstion, not_supported)(file_path)
  


}
