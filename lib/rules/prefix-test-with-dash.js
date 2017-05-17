
module.exports = ( context ) => {
    return {
        CallExpression: ( node ) => {
            const callee = node.callee.name;
            const arg = node.arguments[ 0 ]
            if ( callee === 'it' ) {
                if ( !arg.value.startsWith( '-' ) ) {
                    context.report( {
                        node: node.callee,
                        message: 'Test titles should start with a dash.'
                    })
                }
            }
        }
    }
}
