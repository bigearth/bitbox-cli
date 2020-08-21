# New

BITBOX will generate a new app w/ empty `src/` and `test/` directories and a `bitbox.js` configured to connect to Bitcoin.com’s Cloud.

### Usage

```bash
new [options] <name>
  Options:
  -s, --scaffold <scaffold>        The framework to use. Options include react, angular, node, next, vue and websockets. (Default: react)
  -r, --restURL <restURL>          The rest URL to use. default: https://trest.bitcoin.com/v2/
  -e, --environment <environment>  environment to map to restURL. Ex: production, staging. Default: development
  -h, --help                       output usage information

$ bitbox new helloEARTH
$ bitbox new helloEARTH --scaffold react
```

## `bitbox.js`

Your `bitbox.js` file will contain the default settings to connect to Bitcoin.com’s Cloud.

```javascript
exports.config = {
  environments: {
    development: {
      restURL: "https://trest.bitcoin.com/v2/",
    },
  },
}
```
