/**
 * Two faces: an old-style serif for everything you read, and mono for
 * everything you type.
 *
 * The page carries no external references — a webfont would be the first one —
 * so the stacks name faces the platform already has and degrade in the right
 * direction. Every fallback in `serif` is an old-style or transitional book
 * face, so a machine without the first still gets a warm page rather than
 * Times New Roman.
 *
 * Setting body copy in a serif is the whole of the page's warmth. It costs
 * nothing, it pairs with mono better than a grotesque does, and it reads like
 * something a person wrote rather than something a system emitted.
 */
export const TYPE = {
  serif:
    '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", ' +
    'Georgia, "Liberation Serif", serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  /**
   * Nutrition labels are set in Helvetica. Borrowing the face is most of what
   * makes the panel read as a label rather than a styled table, and confining
   * it to that one object keeps it a quoted artifact instead of a third voice
   * running loose through the page.
   */
  label: '"Helvetica Neue", Helvetica, Arial, sans-serif',
} as const;
