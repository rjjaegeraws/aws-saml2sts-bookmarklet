# AWS SAML to Temporary Credentials Bookmarklet

A [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) that provides a way to retrieve AWS temporary credentials after authenticating to the AWS web console using a SAML SSO provider.  The bookmarklet invokes the AWS STS API to \"exchange\" an XML SAML Response for a set of temporary credentials in a form that can easily be used with command-line tools such the `aws` cli.

# License
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)


## Technical Details

Once added as a bookmark within a user's web browser, and invoked on the AWS SSO role selection page, this bookmarklet retrieves a set of temporary credentials that can be used in on the command line to interact with the AWS.

At dev/build time, plain Javascript is mashed (wrapped, minified, escaped, etc.) using the [`bookmarklet` library](https://www.npmjs.com/package/bookmarklet), which also produces a friendly [HTML page](bookmarklet.html) to make it easy for users to install the bookmarklet in their browsers.        

## Dependencies

### Runtime
* jQuery (MIT) ![License](https://img.shields.io/badge/License-MIT-green.svg)
* jQuery UI (MIT) ![License](https://img.shields.io/badge/License-MIT-green.svg)
* AWS Javascript client library ![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

### Development/Build Time

* [`bookmarklet` library](https://www.npmjs.com/package/bookmarklet)      ![License](https://img.shields.io/badge/License-MIT-green.svg)

## Project Status
- [x] Development
- [ ] Production/Maintenance

## Documentation

You're looking at it :)

## Security

The bookmarklet is positioned as a more secure alternative to browser extensions to manage "userscripts" (such as TamperMonkey).  The code executes entirely within the user's browser, invoking the AWS API over a secure HTTPS connection when retrieving temporary credentials.  The code executes only when explicitly invoked by the user (in contrast with browser extensions which commonly require permissions that technically allows them to read all of the content displayed in a user's web browser.

#  How to Use
<!--- setup env vars, secrets, instructions... --->

## Getting Help or Reporting an Issue
<!--- Example below, modify accordingly --->
To report bugs/issues/feature requests, please file an [issue](../../issues).


## How to Contribute
<!--- Example below, modify accordingly --->
If you would like to contribute, please see our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.
