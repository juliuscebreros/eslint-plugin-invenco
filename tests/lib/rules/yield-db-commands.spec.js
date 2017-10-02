'use strict';

const rule = require('../../../lib/rules/yield-db-commands')
const RuleTester = require('eslint/lib/testers/rule-tester')
const ruleTester = new RuleTester()

function buildTest(code) {
    return 'function* test() { ' + code + ' }'
}

ruleTester.run('yield-db-commands', rule, {
    valid: [
        {
            code: buildTest(
                `const res = yield server.db.read.row(
                    \`SELECT * FROM us;\`
                )`
            )
        },
        {
            code: buildTest(
                `let reports = yield server.db.read.rows( \`
                        SELECT id, module, name, base_url, active, description, require_roles
                        FROM report;
                \` );`
            )
        },
        {
            code: buildTest(`yield server.db.write.execute( 'UPDATE ics_alarm.alarm SET deleted = true WHERE id = $1', [ id ] )`)
        },
        {
            code: buildTest(`const connection = yield server.db.write.getConnection();`)
        },
        {
            code: buildTest(`yield conn.execute( 'COMMIT' )`)
        },
        {
            code: buildTest(`co( function* test() { yield task(); } )`)
        }
    ],
    invalid: [
        {
            code: buildTest(
                `const res = server.db.read.row(
                    \`SELECT * FROM us;\`
                )`
            ),
            output: buildTest(
                `const res = yield server.db.read.row(
                    \`SELECT * FROM us;\`
                )`
            ),
            errors: [{message: 'server.db.read.row must use yield'}]
        },
        {
            code: buildTest(
                `conn.execute( \`
                    UPDATE target SET 
                        site_id = $1
                        WHERE target_id = $2;
                \`, [ updatePayload.siteId, device.id ] )`
            ),
            output: buildTest(
                `yield conn.execute( \`
                    UPDATE target SET 
                        site_id = $1
                        WHERE target_id = $2;
                \`, [ updatePayload.siteId, device.id ] )`
            ),
            errors: [{message: 'conn.execute must use yield'}]
        }
    ]
})