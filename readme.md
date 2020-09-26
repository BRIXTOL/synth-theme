##### BUILT FOR [CONSTRUCT-UI](https://github.com/vrimar/construct-ui)

## @brixtol/synth-theme

This package contains theme styles and customization for the [mithril.js](https://mithril.js.org/) UI library [Construct-UI](https://vrimar.github.io/construct-ui). Synth is an internal (closed source) application used by us here at [Brixtol Textiles](https://www.brixtoltextiles.com) which leverages the Construct UI library.

### Why/Usage?

Our internal codebase is a combination multi/mono repository that is built atop of [pnpm](https://pnpm.js.org/en/cli/install) workspaces. We seperated the styling customizations for synth which allows us to consume this package as a dependency in the development workspace.

**Install**

```
pnpm i @brixtol/synth-theme
```

> This package not available on the NPM registry

## Commands

| CLI          | Description                                    |
| ------------ | ---------------------------------------------- |
| `pnpm dev`   | Starts development environment                 |
| `pnpm build` | Builds production bundles and type definitions |
| `pnpm icons` | Generates icon vnodes from SVGs                |

## Styles

The synth theme brings some sanity to styles applied by [Construct-UI](https://vrimar.github.io/construct-ui) and allows for a simple approach to adjusting global presets.

## Icons

Icons avaiable to the Synth theme are created using the same logic implemented by Construct UI which leverages [Feather](https://github.com/feathericons/feather) for icon support. Synth applies scripting used by these two projects to generate additional icons from a collection of SVG files.

> We use [Vecta Nano](https://www.npmjs.com/package/nanosvg) to preprocess SVGs and vectors. This repository leverages their compression engine package. [Nano](https://vecta.io/nano/pricing) requires a paid license key to use.

### License

Licensed under [MIT](#LICENCE)

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
