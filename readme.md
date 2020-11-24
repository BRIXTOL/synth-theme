##### BUILT FOR [CONSTRUCT-UI](https://github.com/vrimar/construct-ui)

> This project is WIP, so don't be a fucking hero.

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
| `pnpm svgs`  | Generates icon vnodes from SVGs                |

## Styles

The synth theme brings some sanity to styles applied by [Construct-UI](https://vrimar.github.io/construct-ui) and allows for a simple approach to adjusting global presets.

## Svgs

Svg icons avaiable to the Synth theme are created using the same logic implemented by Construct UI which leverages [Feather](https://github.com/feathericons/feather) for icon support. Synth applies scripting used by these two projects to generate additional custom svgs from a collection of SVG files.

> We use [Vecta Nano](https://www.npmjs.com/package/nanosvg) to preprocess SVGs and vectors. This repository leverages their compression engine package. [Nano](https://vecta.io/nano/pricing) requires a paid license key to use.

### Generating

Add any SVG file to `svgs/` in projects root and then run `pnpm svgs` this will generate the relevant icon files and Typescript exports.

### Example

Just as you would export `Icons` from construct ui, same rules and logic apply for SVG. This model also export type definitions for SVG Attributes.

```ts
import { Svg, SvgNames } from "@brixtol/synth-theme";

// Returns an SVG via name
m(Svg, {
  name: SvgNames.Logo
  intent: number,
  className: string,
  svg: {
    stroke: "1px",
  },
});

```

Additionally, you can return the vnode SVG directly:

```js
import { Svgs } from "@brixtol/synth-theme";

// Returns a Vnode, eg: m('svg', m('path', m.trust('...')))
Svgs.Logo({ SVGAttributes });
```

### License

Licensed under [MIT](#LICENCE)

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
