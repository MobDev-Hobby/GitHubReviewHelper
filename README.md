Small Chrome and Firefox compatible extension for more comfortable GitHub pull-request codereview.
This extension adds side-screen file list like crucible do and give possibility to view only choosen files review

![Screenshoot](http://imgur.com/Yu2kPTSl.png Screenshoot)

## Build

### Environment initialisation and first build

// Install npm, make
// ...
// Install bower, grunt and needed libraries
make build
// For build extension works with GitHub Enterprice - replace URL with your one
cat src/manifest.json |sed -r 's/github.com/<your github URL>/g'>build/manifest.json
// Visit https://addons.mozilla.org/en-US/developers/addon/api/key/ for give jwt API credentials
// Build crx and xpi signed extensions
jwtIssuer=<your AMO Issuer> jwtSecret=<your AMO Secret> make pack

### Rebuild
make rebuild
cat src/manifest.json |sed -r 's/github.com/github.yandex-team.ru/g'>build/manifest.json
jwtIssuer=<your AMO Issuer> jwtSecret=<your AMO Secret> make pack

## Contributing
Feel free to contribute this repo :)
Unit tests, examples, codestyle, anything else - you are wellcome!

## Release History
`0.0.1` - First extension version. No unit tests, bad codestyle, but seems like it works
`0.1.0` - Added new GitHub compatibility, added `make pack` command