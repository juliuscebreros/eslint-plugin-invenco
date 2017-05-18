const debug = require( 'debug' )( 'invenco:eslint' );

const ast = require( '../utils/ast' );

module.exports = ( context ) => {

    testCaseNames = [ 'it', 'it.only', 'it.skip',
                      'test', 'test.only', 'test.skip',
                      'specify', 'specify.only', 'specify.skip' ];



    function getFirstWord( sentence ) {
        const words = sentence.split( /[ -]+/ ).filter(Boolean);

        if ( words.length === 0 ) {
            return null;
        }

        return firstWord = words[ 0 ];
    }

    return {
        CallExpression: ( node ) => {
            const callee = node.callee;
            const arg = node.arguments[ 0 ];

            if ( ast.isTestCase( node ) || ast.isHookIdentifier( node ) ) {
                if ( arg && arg.value && arg.value.startsWith ) {
                    if ( getFirstWord( arg.value ) !== 'should' ) {
                        context.report( {
                            node: node.callee,
                            message: 'Test titles should start with should.'
                        });
                    }
                }
            }
        }
    }
}
