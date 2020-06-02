# AWS SAML to Temporary Credentials Bookmarklet

A [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) that provides a way to retrieve AWS temporary credentials after authenticating to the AWS web console using a SAML SSO provider.  The bookmarklet invokes the AWS STS API to \"exchange\" an XML SAML Response for a set of temporary credentials in a form that can easily be used with command-line tools such the `aws` cli.

##  How to Use

* Visit [this](bookmarklet.html) page
* Follow instructions to add bookmarklet to a handy place in your bookmarks
* Once you've authenticated to AWS using a SAML SSO provider, and see a list of accounts + roles, invoke the bookmarklet
* A dialog will appear and after a few seconds it will display a text snippet that can be copied to your clipboard using a button within dialog.
* Open your favourite terminal application and paste the content of your clipboard into it
* Run `aws` cli or other command line, and the credentials you pasted in will be used to determine your role and associated, policy, within AWS etc. 
* Now, :muscle: !

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
