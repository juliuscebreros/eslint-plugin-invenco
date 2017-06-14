const RuleTester = require( 'eslint' ).RuleTester;
const rules = require( '../../../lib' ).rules;
const ruleTester = new RuleTester();

ruleTester.run( 'testcase-starts-with-should', rules[ 'testcase-starts-with-should' ], {
    valid: [
        'it( \'- should be valid test\' )',
        'it( "-should be valid with quotes" )',
        'it( "-Should be valid with caps" )',
        'it( "-     should be valid with quotes" )',
        'it()',
        'it( "should", function() {});',
    ],
    invalid: [
        {
            code: 'it( \' fail on no dash\' )',
            errors: [ {
                message: 'Test titles should start with should.'
            }]
        },
        {
            code: 'it( \'*should be valid test\' )',
            errors: [ {
                message: 'Test titles should start with should.'
            }]
        }
    ]
})
