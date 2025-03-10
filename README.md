# OpenFGA Syntax Transformer

[![npm](https://img.shields.io/npm/v/@openfga/syntax-transformer.svg?style=flat)](https://www.npmjs.com/package/@openfga/syntax-transformer)
[![Release](https://img.shields.io/github/v/release/openfga/syntax-transformer?sort=semver&color=green)](https://github.com/openfga/syntax-transformer/releases)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B4989%2Fgithub.com%2Fopenfga%2Fsyntax-transformer.svg?type=shield)](https://app.fossa.com/reports/fb48e89d-655d-4656-8c7d-4eaa77e19e72)
[![Discord Server](https://img.shields.io/discord/759188666072825867?color=7289da&logo=discord "Discord Server")](https://discord.com/channels/759188666072825867/930524706854031421)
[![Twitter](https://img.shields.io/twitter/follow/openfga?color=%23179CF0&logo=twitter&style=flat-square "@openfga on Twitter")](https://twitter.com/openfga)

The [OpenFGA](https://openfga.dev) API accepts a JSON syntax for the configuration of the authorization model. The OpenFGA docs showcase an alternate friendlier syntax that can be used to build an OpenFGA authorization model.

This module transforms between the JSON syntax accepted by the OpenFGA API and the friendlier syntax you see throughout the documentation.

## Table of Contents

- [About OpenFGA](#about-openfga)
- [Resources](#resources)
- [Installation](#installation)
- [Contributing](#contributing)
- [Community Parsers](#community-parsers)
- [Author](#author)
- [License](#license)

## About OpenFGA

[OpenFGA](https://openfga.dev) is an open source Fine-Grained Authorization solution inspired by [Google's Zanzibar paper](https://research.google/pubs/pub48190/). It was created by the FGA team at [Auth0](https://auth0.com) based on [Auth0 Fine-Grained Authorization (FGA)](https://fga.dev), available under [a permissive license (Apache-2)](https://github.com/openfga/rfcs/blob/main/LICENSE) and welcomes community contributions.

OpenFGA is designed to make it easy for application builders to model their permission layer, and to add and integrate fine-grained authorization into their applications. OpenFGA’s design is optimized for reliability and low latency at a high scale.

It allows in-memory data storage for quick development, as well as pluggable database modules - with initial support for PostgreSQL.

It offers an [HTTP API](https://openfga.dev/api/service) and a [gRPC API](https://buf.build/openfga/api/file/main:openfga/v1/openfga_service.proto). It has SDKs for [Node.js/JavaScript](https://www.npmjs.com/package/@openfga/sdk), [GoLang](https://github.com/openfga/go-sdk), [Python](https://github.com/openfga/python-sdk) and [.NET](https://www.nuget.org/packages/OpenFga.Sdk). Look in our [Community section](https://github.com/openfga/community#community-projects) for third-party SDKs and tools.

More SDKs and integrations such as Rego are planned for the future.

## Resources

- [OpenFGA Documentation](https://openfga.dev/docs)
- [OpenFGA API Documentation](https://openfga.dev/api)
- [Twitter](https://twitter.com/openfga)
- [OpenFGA Discord Community](https://discord.gg/8naAwJfWN6)
- [Zanzibar Academy](https://zanzibar.academy)
- [Google's Zanzibar Paper (2019)](https://research.google/pubs/pub48190/)

## Installation

```bash
npm install --save @openfga/syntax-transformer // OR yarn add @openfga/syntax-transformer
```

## Usage

### From the JSON Syntax to the Friendly Syntax
```javascript
const { apiSyntaxToFriendlySyntax } = require("@openfga/syntax-transformer");

const friendlySyntax = apiSyntaxToFriendlySyntax({
  "type_definitions": [
    {
      "type": "folder",
      "relations": {
        "editor": {
          "this": {}
        }
      }
    }
  ]
});
```
### From the Friendly Syntax to the JSON Syntax
```javascript
const { friendlySyntaxToApiSyntax } = require("@openfga/syntax-transformer");

const apiSyntax = friendlySyntaxToApiSyntax(`type document
  relations
    define blocked as self
    define editor as self but not blocked
type team
  relations
    define member as self
`);
```

## Configuration Syntaxes

The two below Syntaxes are equivalent. Find out more on OpenFGA's configuration language [here](https://openfga.dev/docs/configuration-language).

### JSON Syntax

```json
{
  "type_definitions": [
    {
      "type": "folder",
      "relations": {
        "editor": {
          "this": {}
        }
      }
    },
    {
      "type": "document",
      "relations": {
        "parent": {
          "this": {}
        },
        "editor": {
          "union": {
            "child": [
              {
                "this": {}
              },
              {
                "tupleToUserset": {
                  "tupleset": {
                    "object": "",
                    "relation": "parent"
                  },
                  "computedUserset": {
                    "object": "",
                    "relation": "editor"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

### Friendly Syntax

```python
type folder
  relations
    define editor as self
type document
  relations
    define parent as self
    define editor as self or editor from parent

```

## Community Parsers

| Repo                                                                   | License                                                                            | Maintainers                                                                           | Language   | Schema v1.0 | Schema v1.1 | Package Managers                                                                                                                                                                                                                                                                                               | Other Links                                                                                                                    |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|------------|-------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| [syntax-transformer](https://github.com/openfga/syntax-transformer)    | [Apache-2.0](https://github.com/openfga/syntax-transformer/blob/main/LICENSE)      | [@openfga](https://github.com/orgs/openfga/people)                                    | Typescript | Yes         | No          | [![npm:@openfga/syntax-transformer](https://img.shields.io/npm/v/@openfga/syntax-transformer.svg?style=flat)](https://www.npmjs.com/package/@openfga/syntax-transformer)                                                                                                                                       |                                                                                                                                |
| [openfga-dsl-parser](https://github.com/maxmindlin/openfga-dsl-parser) | [Apache-2.0](https://github.com/maxmindlin/openfga-dsl-parser/blob/master/LICENSE) | [@maxmindlin](https://github.com/maxmindlin) - [@dblclik](https://github.com/dblclik) | Rust       | Yes         | No          | [![crates:openfga-dsl-parser](https://img.shields.io/crates/v/openfga-dsl-parser.svg?style=flat)](https://crates.io/crates/openfga-dsl-parser)[![pypi:openfga-dsl-parser-python](https://img.shields.io/pypi/v/openfga-dsl-parser-python.svg?style=flat)](https://pypi.org/project/openfga-dsl-parser-python/) | [WASM](https://github.com/dblclik/openfga-dsl-parser-wasm) - [Python](https://github.com/maxmindlin/openfga-dsl-parser-python) |
| [openfga-rs](https://github.com/iammathew/openfga-rs)                  | [Apache-2.0](https://github.com/iammathew/openfga-rs/blob/main/LICENSE.md)         | [@iammathew](https://github.com/iammathew)                                            | Rust       | Yes         | No          |                                                                                                                                                                                                                                                                                                                |                                                                                                                                |


## Contributing
Take a look at our [Contributing Guide](./CONTRIBUTING.md)

## Author
[OpenFGA](https://openfga.dev) team

## License
[Apache-2.0](./LICENSE)
