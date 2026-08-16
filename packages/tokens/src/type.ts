/**
 * Four roles, all resolved from faces the platform already has.
 *
 * The page carries no external references — a webfont would be the first one —
 * so the stacks are chosen to degrade in the right direction rather than to
 * name one file. `slab` lands on Superclarendon, Bookman or Rockwell; every
 * fallback in it is a slab or a transitional serif, so a machine without the
 * first still gets the dairy-print register rather than Times.
 */
export const TYPE = {
  /** headlines and the wrapper brand */
  slab: 'Superclarendon, "Bookman Old Style", Rockwell, "Roboto Slab", Georgia, serif',
  /** printed bands, eyebrows, uppercase labels */
  band: '"Arial Narrow", "Liberation Sans Narrow", "Helvetica Neue Condensed", Impact, sans-serif',
  /** body copy and the facts panel */
  body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  /** commands, versions, lot codes */
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
} as const;
