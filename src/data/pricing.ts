/**
 * PRICING — OWNER MUST CONFIRM BEFORE LAUNCH.
 *
 * These are the only numbers on the site that are not derived from something
 * verifiable, and they are deliberately isolated in this one file so you can
 * set them once. They are written as "from" prices for a guide, which is how
 * they are labelled everywhere in the UI.
 *
 * Change every `from` value to your own rates, then delete this notice.
 */

export type PriceItem = {
  id: string;
  item: string;
  /** Lowest price you will quote for this item, in whole pounds. */
  from: number;
  /** Typical upper end of the range for this item, in whole pounds. */
  to: number;
  /** What the range depends on — shown next to the price so it is not a bare number. */
  note: string;
  minutes: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  intro: string;
  items: PriceItem[];
};

export const priceGroups: PriceGroup[] = [
  {
    id: 'sofas',
    title: 'Sofas and settees',
    intro:
      'Priced per seat. A seat is one cushion position, so a three-seater with a chaise is charged as four. Fabric protector and heavy pet-hair removal are optional extras, priced separately below.',
    items: [
      { id: 'armchair', item: 'Armchair', from: 30, to: 40, note: 'Single seat, fabric or leather', minutes: '25–35 min' },
      { id: '2-seater', item: '2-seater sofa', from: 55, to: 75, note: 'Includes cushions both sides', minutes: '40–55 min' },
      { id: '3-seater', item: '3-seater sofa', from: 75, to: 100, note: 'Includes cushions both sides', minutes: '55–75 min' },
      { id: '4-seater', item: '4-seater sofa', from: 95, to: 125, note: 'Includes cushions both sides', minutes: '70–90 min' },
      { id: 'corner', item: 'L-shape / corner sofa', from: 115, to: 165, note: 'Depends on seat count and whether the chaise lifts', minutes: '85–120 min' },
      { id: 'sofa-bed', item: 'Sofa bed (frame + mattress)', from: 95, to: 140, note: 'Mattress cleaned separately from the upholstery', minutes: '75–110 min' },
      { id: 'dining-chair', item: 'Dining chair (upholstered seat)', from: 8, to: 14, note: 'Per chair, minimum of four', minutes: '5–10 min each' },
      { id: 'footstool', item: 'Footstool / ottoman', from: 18, to: 28, note: 'Per item', minutes: '15–20 min' },
    ],
  },
  {
    id: 'combined',
    title: 'Carpet and sofa together',
    intro:
      'Booking carpets in the same visit removes a second call-out and a second set-up, which is where the saving comes from. Carpets are priced per room up to 4m x 4m; larger rooms are measured on arrival and quoted before work starts.',
    items: [
      { id: 'carpet-room', item: 'Carpet, one room', from: 35, to: 50, note: 'Up to 4m x 4m; stairs priced separately', minutes: '30–45 min' },
      { id: 'carpet-stairs', item: 'Staircase carpet', from: 35, to: 55, note: 'Up to 14 steps, landing included', minutes: '35–50 min' },
      { id: 'rug', item: 'Rug', from: 30, to: 70, note: 'By size and fibre; wool and silk are hand-cleaned', minutes: '30–60 min' },
      { id: 'combo-3seat-2room', item: '3-seater + 2 carpeted rooms', from: 130, to: 175, note: 'Combined-visit rate', minutes: '2–2.5 hours' },
      { id: 'combo-corner-hall', item: 'Corner sofa + hall, stairs & landing', from: 165, to: 220, note: 'Combined-visit rate', minutes: '2.5–3.5 hours' },
    ],
  },
  {
    id: 'extras',
    title: 'Optional extras',
    intro:
      'Added only if you ask for them, or if we find something on arrival that needs them — in which case we tell you the revised total before we start.',
    items: [
      { id: 'protector', item: 'Fabric protector (per seat)', from: 12, to: 18, note: 'Applied after cleaning, while the fabric is still open', minutes: '5 min per seat' },
      { id: 'pet-hair', item: 'Heavy pet-hair removal', from: 15, to: 30, note: 'Charged when hair is woven into the weave and needs a separate pass', minutes: '15–30 min' },
      { id: 'deodorise', item: 'Enzyme odour treatment', from: 20, to: 45, note: 'For urine, vomit or milk that has reached the foam', minutes: '20–40 min' },
      { id: 'mattress', item: 'Mattress clean (double)', from: 45, to: 65, note: 'Single from £35, king from £55', minutes: '35–50 min' },
    ],
  },
];

/** Minimum call-out. A visit below this is quoted at this figure. */
export const MINIMUM_CHARGE = 60;

/** Congestion Charge / ULEZ handling — stated plainly rather than hidden. */
export const travelPolicy = {
  congestionCharge:
    'Addresses inside the Congestion Charge zone add the daily charge at cost to the invoice. We tell you before we book, not on the day.',
  ulez:
    'Our van is ULEZ compliant, so there is no ULEZ surcharge anywhere in Greater London.',
  parking:
    'If there is no free bay outside, resident-permit or pay-and-display parking is added at cost. A visitor permit from you avoids it entirely.',
};

/** Items used by the quote calculator on /get-a-quote/. */
export type QuoteItem = { id: string; label: string; unit: number; group: string };

export const quoteItems: QuoteItem[] = [
  { id: 'armchair', label: 'Armchair', unit: 30, group: 'Upholstery' },
  { id: '2-seater', label: '2-seater sofa', unit: 55, group: 'Upholstery' },
  { id: '3-seater', label: '3-seater sofa', unit: 75, group: 'Upholstery' },
  { id: '4-seater', label: '4-seater sofa', unit: 95, group: 'Upholstery' },
  { id: 'corner', label: 'L-shape / corner sofa', unit: 115, group: 'Upholstery' },
  { id: 'sofa-bed', label: 'Sofa bed', unit: 95, group: 'Upholstery' },
  { id: 'dining-chair', label: 'Dining chair', unit: 8, group: 'Upholstery' },
  { id: 'footstool', label: 'Footstool / ottoman', unit: 18, group: 'Upholstery' },
  { id: 'carpet-room', label: 'Carpet, per room', unit: 35, group: 'Carpets & rugs' },
  { id: 'carpet-stairs', label: 'Stairs & landing', unit: 35, group: 'Carpets & rugs' },
  { id: 'rug', label: 'Rug', unit: 30, group: 'Carpets & rugs' },
  { id: 'mattress', label: 'Mattress (double)', unit: 45, group: 'Carpets & rugs' },
];

export const quoteExtras: QuoteItem[] = [
  { id: 'protector', label: 'Fabric protector', unit: 12, group: 'Extras' },
  { id: 'pet-hair', label: 'Heavy pet-hair removal', unit: 15, group: 'Extras' },
  { id: 'deodorise', label: 'Enzyme odour treatment', unit: 20, group: 'Extras' },
];
