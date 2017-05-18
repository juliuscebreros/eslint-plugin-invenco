# eslint-plugin-invenco

Invenco's Eslint Rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-invenco`:

```
$ npm install eslint-plugin-invenco --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-invenco` globally.

## Usage

Add `invenco` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "invenco"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "invenco/prefix-testcase-with-dash": "error"
    }
}
```

## Supported Rules

prefix-testcase-with-dash
- a test title should start with a dash

testcase-starts-with-should
- a test title should start with 'should'
