const RuleTester = require( 'eslint' ).RuleTester;
const rules = require( '../../../lib' ).rules;
const ruleTester = new RuleTester();

ruleTester.run( 'prefix-testcase-with-dash', rules[ 'prefix-testcase-with-dash' ], {
    valid: [
        'it( \'- should be valid test\' )',
        'it( "- should be valid with quotes" )',
        'it()',
        'it( "- something", function() {});',
    ],
    invalid: [
        {
            code: 'it( \' fail on no dash\' )',
            errors: [ {
                message: 'Test titles should start with a dash.'
            }]
        },
        {
            code: 'it( \'-should be valid test\' )',
            errors: [ {
                message: 'Test titles should start with a dash.'
            }]
        }

    ]
})
