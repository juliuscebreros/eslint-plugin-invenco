'use strict';

const commands = [
    '^(?:server\.)?db.read.rows?', // matches server.db.read.row, server.db.read.rows
    '^(?:server\.)?db.write.execute',
    '^(?:server\.)?db.write.getConnection',
    '^connection.execute',
    '^conn.execute'
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
                        message: sourceText + ' must use yield',
                        fix: (fixer) => {
                            return fixer.insertTextBefore(callee, 'yield ');
                        }
                   });
                }
            }
        }
    }
}