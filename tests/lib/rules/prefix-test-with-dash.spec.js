const RuleTester = require( 'eslint' ).RuleTester;
const rules = require( '../../../lib' ).rules;
const ruleTester = new RuleTester();

ruleTester.run( 'prefix-test-with-dash', rules[ 'prefix-test-with-dash' ], {
    valid: [
        'it( \'- should be valid test\' )',
        'it( "- should be valid with quotes" )'
    ],
    invalid: [
        {
            code: 'it( \' fail on no dash\' )',
            errors: [ {
                message: 'Test titles should start with a dash.'
            }]
        }

    ]
})
