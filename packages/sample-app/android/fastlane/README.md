fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Run JVM/unit tests

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Unsigned debug build -- no signing/secrets required, safe for any CI

### android beta

```sh
[bundle exec] fastlane android beta
```

Upload an internal-track beta. Requires the ADOPTING project's own Play Console service-account JSON (SUPPLY_JSON_KEY) and release signing config -- not provided here.

### android release

```sh
[bundle exec] fastlane android release
```

Production release. Same credential requirements as :beta, production track.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
