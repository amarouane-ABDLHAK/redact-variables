const chai = require('chai')

const assert = chai.assert

const index = require('../index')

const {get} = require('lodash')

const currentPath = process.cwd()

const fs = require('fs')

chai.use(require('chai-fs'));

describe('Redact', () => {
    it('Bash files extension should return .sh', () => {
        let extension = index.get_file_extension('../examples/set_envs.sh') 
        assert.equal(extension, '.sh')
    })

    it('JASON files extension should return .json', () => {
        let extension = index.get_file_extension('../examples/set_envs.json') 
        assert.equal(extension, '.json')
    })
    it('Should resturen redact_bash_file function', () => {
        let extension = index.get_file_extension('../examples/set_envs.sh')
        let returned_function = get(index.mapping_files, extension, undefined) 
        assert.isFunction(returned_function, 'bash function')
        assert.equal(returned_function.name, 'redact_bash_scripts')
    })

    it('Should resturen redact_json_file function', () => {
        let extension = index.get_file_extension('../examples/set_envs.json')
        let returned_function = get(index.mapping_files, extension, undefined) 
        assert.isFunction(returned_function, 'jason function')
        assert.equal(returned_function.name, 'redact_json_file')
    })
    it('Should redact a json file', () => {
        let file_path = `${currentPath}/examples/set_envs.json`
        index.redact(file_path)
        fs.readFile(`${file_path}.example`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
        
            let count = (data.match(/\[REDACTED\]/g) || []).length;
            assert.equal(count, 2)
    
          });
    })

    it('Should redact a bash script', () => {
        let file_path = `${currentPath}/examples/set_envs.sh`
        index.redact(file_path)
        assert.fileContentMatch(`${file_path}.example`, /=\[REDACTED\]/, "Success");

    })

    it('Should redact a json file', () => {
        let file_path = `${currentPath}/examples/set_envs.json`
        index.redact(file_path)
        assert.fileContentMatch(`${file_path}.example`, /:\[REDACTED\]/, "Success");

    })

})

