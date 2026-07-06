fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios test

```sh
[bundle exec] fastlane ios test
```

Run unit/UI tests via the simulator

### ios build_debug

```sh
[bundle exec] fastlane ios build_debug
```

Unsigned simulator build -- no signing/API keys required

### ios beta

```sh
[bundle exec] fastlane ios beta
```

TestFlight beta. Requires the ADOPTING project's own App Store Connect API key (ASC_API_KEY_PATH) and match-managed signing certs -- not provided here.

### ios release

```sh
[bundle exec] fastlane ios release
```

App Store release. Same credential requirements as :beta.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
