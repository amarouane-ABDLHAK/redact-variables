#!/usr/bin/env node



const [,, ...file_paths] = process.argv

const {redact} = require('./index')

for(let file_path of file_paths) {
    redact(file_path)
}


