# AWS SAML to Temporary Credentials Bookmarklet

A [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) that provides a way to retrieve AWS temporary credentials after authenticating to the AWS web console using a SAML SSO provider.  The bookmarklet invokes the AWS STS API to \"exchange\" an XML SAML Response for a set of temporary credentials in a form that can easily be used with command-line tools such the `aws` cli.

#  How to Use

TBC

## Getting Help or Reporting an Issue

TBC


## License
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


## How to Contribute
 
TBC
