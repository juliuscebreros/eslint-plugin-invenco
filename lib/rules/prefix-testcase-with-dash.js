const debug = require( 'debug' )( 'invenco:eslint' );

const ast = require( '../utils/ast' );

module.exports = ( context ) => {

    function createAutoFixFunction( node ) {
        const rangeToRemove = [ node.range[ 0 ] + 1, node.range[ 0 ] + 2 ];

        return function removeXPrefix( fixer ) {
            debug( 'Inserting prefix', rangeToRemove, node );
            if ( node.value.startsWith( '-' ) ) {
                return fixer.replaceTextRange( rangeToRemove, '- ' );
            } else {
                return fixer.insertTextAfterRange( [ node.range[ 0 ] + 1, node.range[ 0 ] + 1 ], '- ' );
            }
        }
    }

    return {
        CallExpression: ( node ) => {
            const callee = node.callee;
            const arg = node.arguments[ 0 ];

            if ( ast.isTestCase( node ) || ast.isHookIdentifier( node ) ) {
                if ( arg && arg.value && arg.value.startsWith && !arg.value.startsWith( '- ' ) ) {
                    context.report( {
                        node: node.callee,
                        message: 'Test titles should start with a dash.',
                        fix: createAutoFixFunction( arg )
                    });
                }
            }
        }
    }
}
