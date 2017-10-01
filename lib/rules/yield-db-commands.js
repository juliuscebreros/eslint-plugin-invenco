'use strict';

const commands = [
    '(\w+\.)?db.read.row(s?)', // matches server.db.read.row, server.db.read.rows, db.read.row
    '(\w+\.)?db.write.execute',
    '(\w+\.)?db.write.getConnection',
    'connection.execute',
    'conn.execute'
]
const re = new RegExp(commands.join('|'), 'i')

module.exports = {
    meta: {
        docs: {
            description: 'enforce yield in front of db commands',
            category: 'Possible Errors',
            recommended: true
        },
        fixable: 'code',
        schema: []
    },

    create: (context) => {
        var inYieldDepth = 0

        return {
            'YieldExpression': () => {
                inYieldDepth += 1;
            },
            'YieldExpression:exit': () => {
                inYieldDepth -= 1;
            },
            'CallExpression': (node) => {
                const sourceCode = context.getSourceCode();
                const callee = node.callee;
                const sourceText = sourceCode.getText(callee);
                const matches = re.test(sourceText);

                if (matches && inYieldDepth === 0) {
                   context.report({
                        node: callee,
                        message: sourceText + ' must be yielded',
                        fix: (fixer) => {
                            return fixer.insertTextBefore(callee, 'yield ');
                        }
                   });
                }
            }
        }
    }
}