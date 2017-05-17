
module.exports = ( context ) => {

    testCaseNames = [ 'it', 'it.only', 'it.skip',
                      'test', 'test.only', 'test.skip',
                      'specify', 'specify.only', 'specify.skip' ];

    function isTestCase( node ) {
        return node
            && node.type === 'CallExpression'
            && testCaseNames.indexOf(getNodeName(node.callee)) > -1;
    }

    function getPropertyName(property) {
        return property.name || property.value;
    }

    function isHookIdentifier(node) {
        return node
            && node.type === 'Identifier'
            && hooks.indexOf(node.name) !== -1;
    }

    function getNodeName(node) {
        if (node.type === 'MemberExpression') {
            return getNodeName(node.object) + '.' + getPropertyName(node.property);
        }
        return node.name;
    }
    return {
        CallExpression: ( node ) => {
            const callee = node.callee;
            const arg = node.arguments[ 0 ];

            if ( isTestCase( node ) || isHookIdentifier( node ) ) {
                if ( arg && !arg.value.startsWith( '- ' ) ) {
                    context.report( {
                        node: node.callee,
                        message: 'Test titles should start with a dash.'
                    })
                }
            }
        }
    }
}
