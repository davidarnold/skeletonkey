#!/usr/bin/env node

var fs = require('fs'), ujs = require("uglify-js"), file, ast;

file = fs.readFileSync('skeletonkey.js', 'utf8');
ast = ujs.parser.parse(file);
ast = ujs.uglify.ast_mangle(ast);
ast = ujs.uglify.ast_squeeze(ast);
process.stdout.write('javascript:' + encodeURI(ujs.uglify.gen_code(ast)) + '\n');


