var file = '';

process.stdin.resume();
process.stdin.on('data', function (data) {
    file += data;
});
process.stdin.on('end', function() {
    var u = require("uglify-js"), ast;

    ast = u.parser.parse(file);
    ast = u.uglify.ast_mangle(ast);
    ast = u.uglify.ast_squeeze(ast);
    process.stdout.write('javascript:' + encodeURI(u.uglify.gen_code(ast)) + '\n');
});

