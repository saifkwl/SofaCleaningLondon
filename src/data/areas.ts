import type { FAQ } from './services';

/**
 * Location pages.
 *
 * Every field marked VARY below carries genuinely different information per
 * area — real postcodes, real streets, real housing stock, real parking and
 * Congestion Charge status. A location page that differs only by a swapped
 * place name is a doorway page and Google drops it. If you add an area here,
 * you must be able to fill all of these fields with real local detail.
 */
export type Area = {
  slug: string;
  /** Display name, e.g. "Wandsworth". */
  name: string;
  /** Used in prose: "in Wandsworth", "across Barnet". */
  preposition: 'in' | 'across';
  h1: string;
  title: string;
  metaDescription: string;
  /** The council, which is not always the same as the place name. VARY */
  localAuthority: string;
  /** Real postcode districts covered. VARY */
  postcodes: string[];
  /** Named neighbourhoods and streets inside the area. VARY */
  coverage: string[];
  /** Real stations, with the line or operator. VARY */
  stations: string[];
  /** Slugs of adjacent areas on this site — used for the lateral link block. */
  neighbours: string[];
  /** Adjacent places we cover that do not have their own page. VARY */
  alsoNearby: string[];
  /** Opening paragraphs. VARY — must name postcodes and local places. */
  intro: string[];
  /** Housing stock, tied to what it means for cleaning. VARY */
  housing: { heading: string; paragraphs: string[] };
  /** One paragraph of genuine local operational knowledge. VARY */
  accessNote: string;
  /** Parking and Congestion Charge position, stated accurately. VARY */
  parking: string;
  congestionCharge: string;
  /** Types of local business we are booked by here. VARY */
  commercial: { heading: string; body: string; examples: string[] };
  /** Locally-specific FAQs carrying this page's own postcodes and places. VARY */
  faqs: FAQ[];
  /** Which services get the most demand here, as slugs, most first. VARY */
  popularServices: string[];
};

export const areas: Area[] = [
  {
    slug: 'wandsworth',
    name: 'Wandsworth',
    preposition: 'in',
    h1: 'Sofa Cleaning in Wandsworth',
    title: 'Sofa Cleaning Wandsworth SW18 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Wandsworth SW18, SW11, SW17 and SW12. Victorian terraces and Ram Quarter flats. No Congestion Charge. From £75.',
    localAuthority: 'London Borough of Wandsworth',
    postcodes: ['SW18', 'SW11', 'SW12', 'SW17', 'SW15'],
    coverage: [
      'Wandsworth Town and Old York Road',
      'Ram Quarter and the Southside area',
      'Wandsworth Common and Bellevue Road',
      'Earlsfield and Garratt Lane',
      'Battersea Reach and the York Road riverside',
      'Tonsleys and the Wandsworth Grid',
    ],
    stations: [
      'Wandsworth Town (South Western Railway)',
      'Wandsworth Common (Southern)',
      'East Putney (District line)',
      'Earlsfield (South Western Railway)',
    ],
    neighbours: ['putney', 'balham', 'clapham'],
    alsoNearby: ['Battersea', 'Earlsfield', 'Tooting', 'Southfields', 'Wimbledon Park'],
    intro: [
      "Wandsworth is one of the areas we work in most often, and the reason is visible from the street. The grid of Victorian terraces between East Hill and Wandsworth Common was built for families and is still occupied by them, which means large fabric sofas taking daily use from children and pets. A few hundred metres north, the Ram Quarter and Battersea Reach developments have produced a completely different housing type — compact riverside apartments where the sofa is the only significant piece of upholstery in the flat and has to last.",
      "We cover the whole of SW18 alongside the parts of SW11, SW12, SW17 and SW15 that fall inside the borough. That includes Old York Road and the Tonsleys, the streets around Bellevue Road and Wandsworth Common, Earlsfield along Garratt Lane, and the riverside blocks off York Road.",
      "Nothing in Wandsworth is inside the Congestion Charge zone, and our van is ULEZ compliant, so a booking here carries no travel surcharge of any kind. What you are quoted is what you pay.",
    ],
    housing: {
      heading: 'What we typically find in Wandsworth homes',
      paragraphs: [
        "The Victorian and Edwardian terraces around Wandsworth Common and the Tonsleys almost all have a through-lounge with a three-seater or corner sofa carrying the whole household. These see heavy use and are usually polyester or a poly-cotton blend, which takes hot water extraction well. The common finding is body-oil build-up in the seat cushions and a grey line along the arm tops — both of which extraction handles properly.",
        "The newer riverside apartments at Ram Quarter and Battersea Reach are a different job. Sofas there are more often velvet or linen, chosen to suit the interior, and both of those fabrics need the low-moisture method rather than extraction. They are also smaller flats with limited ventilation and, in many cases, windows that only tilt, which is exactly the situation where a six-hour drying time becomes a problem. We default to the dry method in those buildings unless the fabric says otherwise.",
        "Between the two sits a large stock of 1930s and post-war conversions off Garratt Lane and around Earlsfield, typically flats shared by two or three working tenants. Those bookings are usually end-of-tenancy, on a tight date, and need an itemised invoice for the deposit scheme.",
      ],
    },
    accessNote:
      "Old York Road and the streets off it are narrow with parking on both sides, and the loading gap outside a mid-terrace can disappear entirely between 08:00 and 09:30 with the school run. We schedule Wandsworth Town jobs for mid-morning where we can, which makes the difference between carrying equipment thirty metres and carrying it two hundred.",
    parking:
      "Wandsworth operates controlled parking zones across most of the borough, with hours that vary street by street — the Tonsleys and the Old York Road area are among the tightest. A visitor permit from you is the simplest solution and costs you nothing extra. Without one, pay-and-display or permit parking is added to the invoice at cost and shown as a separate line.",
    congestionCharge:
      "No part of Wandsworth falls inside the Congestion Charge zone, and our van meets ULEZ standards. There is no travel surcharge on any Wandsworth booking.",
    commercial: {
      heading: 'Commercial work in Wandsworth',
      body:
        "Alongside domestic bookings we clean upholstery for businesses around Wandsworth Town and the Southside area, generally outside trading hours. Old York Road in particular has a dense run of independent restaurants and bars whose bench seating takes a hammering at weekends and needs a maintenance cycle rather than an occasional deep clean.",
      examples: [
        'Restaurants and bars along Old York Road and Bellevue Road',
        'Offices in the Riverside Quarter and around Smugglers Way',
        'Serviced apartments and short-let flats at Ram Quarter',
        'Estate agent and professional offices around Southside',
        'Gyms and studios with fabric seating in reception areas',
      ],
    },
    faqs: [
      {
        q: 'Do you cover all of SW18?',
        a: "Yes, the whole of SW18 including Wandsworth Town, the Tonsleys, Earlsfield and the Wandsworth Common side. We also cover the parts of SW11, SW12, SW17 and SW15 that fall inside the borough, so Battersea Reach, the Bellevue Road area and the Garratt Lane corridor are all standard bookings rather than out-of-area ones.",
      },
      {
        q: 'Is there a Congestion Charge on Wandsworth bookings?',
        a: "No. The Congestion Charge zone does not reach anywhere in Wandsworth — its western boundary stops well short of the borough. Our van is also ULEZ compliant, so there is no emissions surcharge either. The price you are quoted for a Wandsworth address is the price you pay.",
      },
      {
        q: 'My flat at Ram Quarter has windows that only tilt. Will the sofa dry?',
        a: "This is exactly why we usually recommend the low-moisture method in the riverside developments. Restricted ventilation and hot water extraction is a poor combination — a sofa that would dry in four hours in a terraced house can take well over a day in a sealed apartment. Low-moisture cleaning has the sofa usable again in one to two hours. Tell us the building when you book and we will plan for it.",
      },
      {
        q: 'Can you work around parking restrictions on the Tonsleys?',
        a: "Usually, yes. The practical answer is a visitor permit from you, which costs nothing extra and means we can unload at the door. Without one we use pay-and-display or permit parking and add it to the invoice at cost, itemised separately. We also try to book Tonsleys addresses mid-morning, once the school-run congestion has cleared and a loading gap actually exists.",
      },
      {
        q: 'I need an end-of-tenancy clean in Earlsfield on a fixed date. Can you guarantee the slot?',
        a: "We hold tenancy slots firmly, because the whole point is that they are tied to a check-out appointment. Book the sofa for after the property is empty and after the carpets are done — cleaning it first means it gets walked past during the move. You get a dated invoice naming the address and every item cleaned, which is the document deposit schemes actually accept.",
      },
      {
        q: 'How quickly can you get to a Wandsworth Common address?',
        a: "Wandsworth is inside our core coverage area, so a standard booking is normally available within two to three working days, and we can often fit a same-week slot. If you have a hard deadline — a checkout, a viewing, guests arriving — say so when you call and we will tell you straight away whether we can hit it rather than taking the booking and hoping.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london', 'sofa-dry-cleaning-london'],
  },
  {
    slug: 'fulham',
    name: 'Fulham',
    preposition: 'in',
    h1: 'Sofa Cleaning in Fulham',
    title: 'Sofa Cleaning Fulham SW6 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Fulham SW6 — Parsons Green, Bishops Park, Peterborough Estate. We work around match-day restrictions. From £75.',
    localAuthority: 'London Borough of Hammersmith & Fulham',
    postcodes: ['SW6', 'SW10', 'W6', 'W14'],
    coverage: [
      'Fulham Broadway and the Walham Green area',
      'Parsons Green and the streets off New Kings Road',
      'Bishops Park, Fulham Palace Road and the river end',
      'The Peterborough Estate and Hurlingham',
      'Sands End and Chelsea Creek',
      'Munster Village and North End Road',
    ],
    stations: [
      'Fulham Broadway (District line)',
      'Parsons Green (District line)',
      'Putney Bridge (District line)',
      'Imperial Wharf (Overground and Southern)',
    ],
    neighbours: ['putney', 'chiswick', 'wandsworth'],
    alsoNearby: ['Chelsea', 'Hammersmith', 'Earls Court', 'West Brompton', 'Barnes'],
    intro: [
      "Fulham is almost entirely SW6, and the housing is remarkably consistent: rows of two- and three-storey Victorian terraces laid out in the 1880s and 1890s, most now split into upper and lower maisonettes. The Peterborough Estate between New Kings Road and the river — the streets with the stone lions on the gateposts — is the best-known run, and those houses tend to have kept their full floorplan rather than being divided.",
      "That housing type shapes the work. Fulham sofas are usually large, often corner units squeezed into a through-lounge, and increasingly velvet or linen rather than the polyester that dominates elsewhere in London. Both of those fabrics need the low-moisture method, and getting that call right before any water goes on is most of the job.",
      "We cover the whole of SW6 plus the adjoining parts of SW10, W6 and W14 — so Sands End and Chelsea Creek, the Munster Village streets, the Bishops Park end and everything around Parsons Green.",
    ],
    housing: {
      heading: 'What we typically find in Fulham homes',
      paragraphs: [
        "The classic Fulham job is a velvet corner sofa in a knocked-through Victorian reception room. Velvet has been the dominant choice here for several years, and a meaningful share of it is cotton or viscose velvet rather than the more forgiving polyester version. Those crush and watermark if wet-cleaned, so they get the dry method with the pile groomed in one direction at the finish. We test before deciding, every time.",
        "Maisonette conversions bring a second pattern: the sofa lives on the first floor up a narrow Victorian staircase with a tight turn at the top. That matters for equipment access rather than for cleaning, and it is why we run hose from the van rather than carrying a machine upstairs.",
        "Around Sands End and Chelsea Creek the stock flips to new-build apartments, where sofas are smaller, newer and generally in better condition — those bookings are more often preventative, with fabric protector applied afterwards, than remedial.",
      ],
    },
    accessNote:
      "Fulham has two Premier League grounds effectively inside it — Stamford Bridge at Fulham Broadway and Craven Cottage by Bishops Park — and on match days the streets around both are subject to controlled zones and event parking restrictions that make loading impractical. We check the fixture list against your postcode when booking rather than discovering the problem on the doorstep.",
    parking:
      "Hammersmith & Fulham runs controlled parking across effectively all of SW6, with match-day event restrictions layered on top near both grounds. A visitor permit from you is by far the easiest route. Otherwise pay-and-display is added at cost as a separate invoice line.",
    congestionCharge:
      "Fulham sits entirely outside the Congestion Charge zone — the boundary stops at Chelsea, east of the borough. Our van is ULEZ compliant, so there is no emissions surcharge. No travel charge applies to SW6 bookings.",
    commercial: {
      heading: 'Commercial work in Fulham',
      body:
        "The New Kings Road and Fulham Road restaurant runs, the members' clubs and gyms around Parsons Green, and a steady flow of high-end short-let apartments around Chelsea Creek make up most of our commercial work here. Restaurant bench seating on those two roads is cleaned before service or on a closed day, never during trading.",
      examples: [
        'Restaurants and gastropubs along New Kings Road and Fulham Road',
        'Members clubs, gyms and studios around Parsons Green',
        'Short-let and serviced apartments at Chelsea Creek and Imperial Wharf',
        'Estate agents and professional offices on Fulham Broadway',
        'Interior design showrooms along the Kings Road end',
      ],
    },
    faqs: [
      {
        q: 'Can you clean a velvet sofa without damaging the pile?',
        a: "Yes, and in Fulham it is the most common request we get. Velvet needs the low-moisture method, not hot water extraction — wet-cleaning cotton or viscose velvet crushes the pile and leaves watermarks that do not come out. We test the fabric first, keep moisture low, brush with the pile rather than against it, and groom each whole panel in one direction at the finish so the light reflects evenly.",
      },
      {
        q: 'Will a match at Stamford Bridge or Craven Cottage affect my booking?',
        a: "It can, which is why we check fixtures against your postcode at the booking stage rather than turning up to find event restrictions in force. Streets near both grounds fall under controlled zones on match days and loading becomes impractical. If your date clashes we will tell you when you book and offer the nearest workable slot.",
      },
      {
        q: 'Do you cover Parsons Green and the Peterborough Estate?',
        a: "Yes — both are squarely inside our SW6 coverage, along with Bishops Park, Munster Village, Sands End and the Fulham Broadway area. The Peterborough Estate houses in particular tend to have kept their full floorplan, so they often have more upholstery than a converted maisonette, and we quote per item rather than per room.",
      },
      {
        q: 'My sofa is on the first floor of a maisonette with a narrow staircase. Is that a problem?',
        a: "No. We run hose from the van up to the flat rather than carrying a machine up a tight Victorian staircase, so a narrow turn at the top makes no practical difference. It is worth mentioning at the booking stage only so we can bring enough hose — the longest runs in Fulham are on the three-storey terraces at the river end.",
      },
      {
        q: 'Is there a Congestion Charge on Fulham bookings?',
        a: "No. The Congestion Charge zone stops at Chelsea and does not reach SW6 at any point. Our van is ULEZ compliant too, so no emissions surcharge applies. The only travel cost that can ever appear on a Fulham invoice is parking, and only where a visitor permit is not available.",
      },
      {
        q: 'Do you apply fabric protector after cleaning?',
        a: "On request, and in Fulham a lot of people ask for it — particularly on newer velvet and linen where the aim is to keep the fabric looking new rather than to fix a problem. It goes on after cleaning while the fabric is still open, at £12 to £18 per seat. It does not make a sofa stain-proof; it buys you time to blot a spill before it soaks in, which is a real but modest benefit.",
      },
    ],
    popularServices: ['sofa-dry-cleaning-london', 'leather-sofa-cleaning-london', 'steam-sofa-cleaning-london'],
  },
  {
    slug: 'clapham',
    name: 'Clapham',
    preposition: 'in',
    h1: 'Sofa Cleaning in Clapham',
    title: 'Sofa Cleaning Clapham SW4 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Clapham SW4 — Old Town, Abbeville Village, the Common. Flatshare and end-of-tenancy work a speciality. From £75.',
    localAuthority: 'London Borough of Lambeth (with a western edge in Wandsworth)',
    postcodes: ['SW4', 'SW9', 'SW11', 'SW12'],
    coverage: [
      'Clapham Old Town and the Polygon',
      'Abbeville Village and the streets off Abbeville Road',
      'Clapham Common Northside and Southside',
      'Clapham High Street and Venn Street',
      'Clapham North and the Stockwell border',
      'Clapham Park and Kings Avenue',
    ],
    stations: [
      'Clapham Common (Northern line)',
      'Clapham North (Northern line)',
      'Clapham South (Northern line)',
      'Clapham High Street (Overground)',
    ],
    neighbours: ['balham', 'wandsworth', 'streatham'],
    alsoNearby: ['Battersea', 'Brixton', 'Stockwell', 'Vauxhall', 'Herne Hill'],
    intro: [
      "Clapham has an unusually high proportion of sharers, and that single fact changes the work more than anything else about the area. A sofa in a four-bedroom SW4 flatshare takes use from four adults and their visitors, gets cleaned rarely, and then needs to be dealt with urgently at the end of a tenancy when the deposit is on the line. A large share of our Clapham bookings are exactly that job, on a fixed date, with an inventory clerk due.",
      "The other half of the picture is the family housing around Abbeville Village and the Old Town — Georgian and early Victorian, often beautifully kept, frequently with older or higher-value upholstery that needs the conservative method rather than the powerful one.",
      "We cover SW4 in full plus the adjoining parts of SW9, SW11 and SW12, so the Common on both the Northside and Southside, the High Street and Venn Street area, Clapham North towards Stockwell, and Clapham Park up Kings Avenue.",
    ],
    housing: {
      heading: 'What we typically find in Clapham homes',
      paragraphs: [
        "Sharer flats, usually Victorian conversions off the High Street or around Clapham North, produce the most heavily soiled sofas we see anywhere in south London. Typical findings are drink spills that were never blotted, food residue worked deep into the seat cushions, and a general sugar residue that makes the fabric resoil within weeks of any surface clean. These need full hot water extraction with a proper pre-spray and dwell time — a surface method achieves almost nothing on them.",
        "Around Abbeville Road and the Old Town the picture reverses. Those houses often hold older pieces — sometimes genuinely antique, sometimes reupholstered mid-century frames — where the dye is not colourfast to modern standards and the filling may be horsehair rather than foam. We test more extensively there and will decline a wet clean if the testing says so.",
        "The mansion blocks along Clapham Common Northside sit in between: well-maintained flats, often with linen or wool-blend upholstery, and building management that restricts working hours. We book those for weekday daytime slots to stay inside the building rules.",
      ],
    },
    accessNote:
      "Venn Street and the roads immediately off Clapham High Street have a street market on Saturdays and heavy evening restaurant trade, so weekday mornings are the only practical time to load there. On the Common itself, the Northside and Southside carriageways have no loading provision at all for long stretches, and the nearest legal stop can be a side road two streets back.",
    parking:
      "Lambeth controlled parking covers effectively all of SW4, and enforcement around the High Street and the Common is among the most active in south London. A visitor permit from you removes the problem entirely. Without one we use pay-and-display and itemise it on the invoice at cost.",
    congestionCharge:
      "Clapham sits outside the Congestion Charge zone — the southern boundary runs along the Vauxhall and Kennington side, well north of SW4. Our van is ULEZ compliant. No travel surcharge applies to Clapham bookings.",
    commercial: {
      heading: 'Commercial work in Clapham',
      body:
        "Clapham High Street and Venn Street carry one of the densest concentrations of bars and restaurants in south London, and banquette seating there needs a maintenance cycle measured in months rather than years. We work early mornings after a late close, or on a closed day, never during trading.",
      examples: [
        'Bars and restaurants along Clapham High Street and Venn Street',
        'Gastropubs around the Old Town and the Polygon',
        'Co-working and small offices near Clapham North',
        'Short-let apartments and Airbnb properties around the Common',
        'Fitness studios and clinics along Abbeville Road',
      ],
    },
    faqs: [
      {
        q: 'Can you do an end-of-tenancy sofa clean on a fixed date in SW4?',
        a: "Yes, and it is a large part of what we do in Clapham. Book it for after the flat is empty and after the carpets are done — cleaning the sofa first means it gets walked past throughout the move. You get a dated, itemised invoice naming the property address, every item cleaned and the method used, which is the document deposit schemes and inventory clerks actually accept.",
      },
      {
        q: 'Our flatshare sofa has years of spills on it. Is it worth cleaning?',
        a: "Usually yes, and Clapham sharer sofas are the ones that improve most dramatically, because so little has ever been done to them. What we can promise is the removal of general soiling, body oils, food residue and most drink stains. What we cannot promise is old red wine or curry that has oxidised, or ink. We will tell you which category your worst marks fall into before starting, and we can treat one area first so you can see the result before committing to the whole suite.",
      },
      {
        q: 'Do you cover Abbeville Village and Clapham Old Town?',
        a: "Yes, both, along with the Common on the Northside and Southside, Clapham North, and Clapham Park up towards Kings Avenue. The Old Town and Abbeville jobs tend to involve older or higher-value pieces, so we allow extra time for testing and are willing to recommend the gentler method even where a more aggressive one would look more impressive on the day.",
      },
      {
        q: 'When can you load on Venn Street?',
        a: "Weekday mornings, realistically. Venn Street has a street market on Saturdays and heavy evening restaurant trade, and there is no practical loading window in either. If your address is on or immediately off the High Street, we will suggest a morning slot — it is the difference between unloading at your door and carrying equipment from two streets back.",
      },
      {
        q: 'My sofa is an old reupholstered frame. Can you clean it safely?',
        a: "Possibly, and we will tell you honestly after testing. Older pieces often have dyes that are not colourfast by modern standards and filling that may be horsehair or coir rather than foam, neither of which should get wet. We test on a concealed panel first, and if the result says the fabric will not take it we recommend the low-moisture method or, occasionally, that the piece needs a textile specialist rather than an upholstery cleaner.",
      },
      {
        q: 'Is there a Congestion Charge on Clapham bookings?',
        a: "No. The Congestion Charge zone stops well north of SW4, around Vauxhall and Kennington. Our van is ULEZ compliant, so there is no emissions surcharge either. The only travel-related cost that can appear on a Clapham invoice is parking, where a visitor permit is not available, and it is itemised at cost.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london', 'sofa-dry-cleaning-london'],
  },
  {
    slug: 'putney',
    name: 'Putney',
    preposition: 'in',
    h1: 'Sofa Cleaning in Putney',
    title: 'Sofa Cleaning Putney SW15 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Putney SW15 — mansion blocks, the Embankment, Putney Heath and Roehampton. No Congestion Charge. From £75.',
    localAuthority: 'London Borough of Wandsworth',
    postcodes: ['SW15', 'SW18', 'SW6'],
    coverage: [
      'Putney High Street and the station area',
      'Lower Richmond Road and the Embankment',
      'Upper Richmond Road and West Putney',
      'Putney Heath and Telegraph Road',
      'Roehampton and Danebury Avenue',
      'Southfields and the Putney Bridge approach',
    ],
    stations: [
      'Putney (South Western Railway)',
      'East Putney (District line)',
      'Barnes (South Western Railway)',
      'Southfields (District line)',
    ],
    neighbours: ['fulham', 'wandsworth', 'barnet'],
    alsoNearby: ['Barnes', 'Roehampton', 'Southfields', 'Mortlake', 'Richmond'],
    intro: [
      "Putney has more purpose-built mansion flats than almost anywhere else in south-west London, particularly along the Lower Richmond Road and the roads running back from the Embankment. Those Edwardian and interwar blocks have generous reception rooms, and the sofas in them are usually large, often original to the family rather than recently bought, and frequently in wool blends or linen rather than modern polyester.",
      "That fabric mix is the defining feature of the work here. Wool needs pH-neutral, wool-safe chemistry — alkaline products damage the fibre and cause yellowing — and linen needs the low-moisture method because it shrinks and watermarks. Between them they account for a much larger share of Putney bookings than they do a mile east in Wandsworth.",
      "We cover SW15 in full: the High Street and station area, the Embankment and Lower Richmond Road, West Putney off the Upper Richmond Road, Putney Heath and Telegraph Road, and across into Roehampton.",
    ],
    housing: {
      heading: 'What we typically find in Putney homes',
      paragraphs: [
        "Mansion block flats along the Lower Richmond Road and around the Embankment are the archetypal Putney job. Large rooms, large sofas, and a good chance the fabric is a wool blend. The practical consequence is that we carry wool-safe product to every Putney booking as a matter of course, and we test before assuming a fabric is synthetic just because it looks it.",
        "West Putney, on the streets between the Upper Richmond Road and the Heath, is family housing — Edwardian semis and detached houses with children, dogs and sofas that take proper punishment. Those are straightforward hot water extraction jobs, usually combined with carpets in the same visit because the same soil is in both.",
        "Roehampton adds a third type: a mix of post-war estate housing and university accommodation, where bookings are more often end-of-tenancy or landlord turnarounds on a short window between tenants.",
      ],
    },
    accessNote:
      "The Boat Race finishes upriver but starts at Putney, and on race day in late March or early April the Embankment and Lower Richmond Road are closed to traffic with substantial crowds either side of the event. We do not book Embankment addresses on that date. Putney High Street also has bus-lane and loading restrictions through most of the day, so addresses on the High Street itself are scheduled for outside those hours.",
    parking:
      "Wandsworth controlled parking applies across SW15, tightest around the station and the High Street. The mansion blocks along Lower Richmond Road often have forecourt or rear parking, which makes those jobs straightforward — tell us if yours does. Otherwise a visitor permit is the easiest option, and pay-and-display is itemised at cost if one is not available.",
    congestionCharge:
      "Putney is well outside the Congestion Charge zone and our van is ULEZ compliant, so no travel surcharge applies to any SW15 booking.",
    commercial: {
      heading: 'Commercial work in Putney',
      body:
        "The riverside pubs along the Embankment, the rowing clubs, and the offices around the Upper Richmond Road make up most of our Putney commercial work. Riverside pub seating here has a specific problem — river damp combined with heavy summer trade — and benefits from a shorter cleaning cycle than an inland site of the same size.",
      examples: [
        'Riverside pubs and restaurants along Putney Embankment',
        'Rowing clubs and sports clubs on the Lower Richmond Road',
        'Offices along the Upper Richmond Road and Putney Bridge Road',
        'Dental and medical practices around the High Street',
        'Serviced apartments near Putney and East Putney stations',
      ],
    },
    faqs: [
      {
        q: 'Do you use wool-safe products on mansion block sofas?',
        a: "Yes, and in Putney we carry them to every booking as standard because wool blends are so common in the Lower Richmond Road and Embankment blocks. Wool needs pH-neutral, wool-safe chemistry — ordinary alkaline upholstery products damage the fibre and can cause yellowing — and it must not be over-wet. We identify the fibre before choosing rather than assuming a fabric is synthetic because it looks it.",
      },
      {
        q: 'Can you come on Boat Race day?',
        a: "Not to an Embankment or Lower Richmond Road address. The race starts at Putney and those roads are closed to traffic with large crowds either side of the event, usually in late March or early April. We keep the date blocked for riverside addresses and will offer you the nearest workable slot instead. Addresses further back, off the Upper Richmond Road or up towards the Heath, are generally unaffected.",
      },
      {
        q: 'Do you cover Roehampton and Southfields as well as Putney proper?',
        a: "Yes. SW15 includes Roehampton, and we cover it along with the Southfields side and out towards the Putney Bridge approach. Roehampton bookings are more often landlord turnarounds and end-of-tenancy work on a short window, which we are set up for — tell us the check-out date when you book and we will hold the slot against it.",
      },
      {
        q: 'My block has rear parking. Does that change the price?',
        a: "It does not change the price, but it does make the job easier and it removes any chance of a parking line appearing on your invoice. Mention it when you book. Where there is no forecourt or rear parking, a visitor permit from you serves the same purpose, and without either we use pay-and-display and itemise it at cost.",
      },
      {
        q: 'Can you clean a linen sofa without it shrinking?',
        a: "Yes, by not wet-cleaning it. Linen shrinks, creases and watermarks at the seams under hot water extraction, so we use the low-moisture method on it instead — cleaning agent applied as a foam or fine mist, worked in mechanically, then vacuumed out. The fabric never becomes saturated, so nothing swells or shrinks, and the sofa is usable again in one to two hours.",
      },
      {
        q: 'How far ahead should I book?',
        a: "Two to three working days is normally enough for a standard SW15 booking, and we can often fit a same-week slot. Book further ahead if your date is fixed by a checkout or a move, and avoid Boat Race day if you are on the Embankment. If you have a hard deadline, tell us on the call — we would rather say no than take a booking we cannot hold.",
      },
    ],
    popularServices: ['sofa-dry-cleaning-london', 'steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london'],
  },
  {
    slug: 'balham',
    name: 'Balham',
    preposition: 'in',
    h1: 'Sofa Cleaning in Balham',
    title: 'Sofa Cleaning Balham SW12 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Balham SW12 — Hildreth Street, Bedford Hill, Du Cane Court and Nightingale Lane. No Congestion Charge. From £75.',
    localAuthority: 'London Borough of Wandsworth (with a Lambeth edge east of Bedford Hill)',
    postcodes: ['SW12', 'SW17', 'SW16', 'SW4'],
    coverage: [
      'Balham High Road and Hildreth Street',
      'Bedford Hill and the Heaver Estate',
      'Nightingale Lane and the Wandsworth Common side',
      'Du Cane Court and the Ritherdon Road area',
      'Tooting Bec Common and the Bec side',
      'Chestnut Grove and the Balham station area',
    ],
    stations: [
      'Balham (Northern line and Southern)',
      'Tooting Bec (Northern line)',
      'Wandsworth Common (Southern)',
      'Clapham South (Northern line)',
    ],
    neighbours: ['clapham', 'streatham', 'wandsworth'],
    alsoNearby: ['Tooting', 'Battersea', 'Earlsfield', 'Brixton', 'Norbury'],
    intro: [
      "Balham has two distinct housing types sitting a few hundred metres apart, and they need opposite approaches. The Heaver Estate, the streets off Nightingale Lane and the Ritherdon Road area are solid late-Victorian family terraces — big through-lounges, big sofas, heavy daily use. Then there is Du Cane Court, the enormous 1930s art deco block on the High Road, which alone accounts for several hundred flats and a steady flow of bookings of its own.",
      "Du Cane Court flats are a specific job. They are period apartments with original proportions but often restricted ventilation, on upper floors reached by lift, with building rules about contractor hours. We book them for weekday daytime and lean towards the low-moisture method so the sofa is usable again the same afternoon.",
      "We cover SW12 in full plus the adjoining parts of SW17, SW16 and SW4 — so the High Road and Hildreth Street, Bedford Hill, the Nightingale Lane side towards Wandsworth Common, and across to Tooting Bec Common.",
    ],
    housing: {
      heading: 'What we typically find in Balham homes',
      paragraphs: [
        "Heaver Estate and Nightingale Lane houses are family homes with a corner sofa or a large three-seater absorbing the whole household's daily use. The common finding is body-oil build-up in the seat cushions and a shiny, flattened patch on the arm the household favours. Extraction deals with the first properly; the second is abraded fibre and is not reversible, which we say before starting rather than after.",
        "Du Cane Court and the other interwar blocks on the High Road run to smaller, more formal furniture, and a noticeably higher proportion of it is wool blend or linen. Those go through the low-moisture route, which also suits the ventilation constraints in the building.",
        "Around Bedford Hill and towards the Lambeth border the stock shifts to conversions and shared flats, and the bookings shift with it towards end-of-tenancy work on fixed dates.",
      ],
    },
    accessNote:
      "Balham High Road carries heavy bus traffic with red-route restrictions along stretches of it, so loading directly outside a High Road address is rarely possible in daytime hours. Hildreth Street has a market operating most days, which closes it to vehicles. For both, we load from a side street and run hose — worth knowing when you compare a quote that assumes door-side parking.",
    parking:
      "Wandsworth controlled parking covers SW12, with the tightest enforcement around the station and along the High Road. Du Cane Court has its own parking arrangements — tell us which if you are booking there. Elsewhere a visitor permit is the simplest answer, and pay-and-display is itemised at cost when one is not available.",
    congestionCharge:
      "Balham is nowhere near the Congestion Charge zone and our van is ULEZ compliant, so there is no travel surcharge on any SW12 booking.",
    commercial: {
      heading: 'Commercial work in Balham',
      body:
        "Hildreth Street and the Bedford Hill end of the High Road have a concentration of independent cafés and restaurants whose bench seating needs regular attention, and we clean those before opening. We also work with letting agents around the station who turn shared flats over on a tight cycle.",
      examples: [
        'Cafés and restaurants on Hildreth Street and Balham High Road',
        'Pubs around Bedford Hill and Chestnut Grove',
        'Letting agents turning over shared flats near the station',
        'Dental practices and clinics along the High Road',
        'Nurseries and after-school clubs near Tooting Bec Common',
      ],
    },
    faqs: [
      {
        q: 'Do you clean flats in Du Cane Court?',
        a: "Regularly. Du Cane Court is one of the buildings we are called to most often in SW12. The flats are period apartments with restricted ventilation on upper floors, so we normally recommend the low-moisture method — the sofa is usable again in one to two hours rather than six. We also book them for weekday daytime to stay inside the building's contractor hours. Tell us your floor when you call so we can plan hose runs.",
      },
      {
        q: 'Can you park outside a Balham High Road address?',
        a: "Rarely in daytime hours. Stretches of Balham High Road are red route with loading restrictions, and Hildreth Street has a market operating most days that closes it to vehicles. We load from a side street and run hose to the property instead, which works fine — it just takes a few extra minutes. It is worth knowing if you are comparing a quote that assumes we can pull up outside.",
      },
      {
        q: 'Do you cover the Heaver Estate and Nightingale Lane?',
        a: "Yes, both, along with Ritherdon Road, Chestnut Grove, Bedford Hill and across to Tooting Bec Common. The Heaver Estate and Nightingale Lane houses tend to be large family terraces with a correspondingly large sofa, so we quote per seat rather than per item — a three-seater with a chaise is charged as four seats.",
      },
      {
        q: 'The arm of my sofa has gone shiny. Can you fix it?',
        a: "Honestly, no — and it is worth knowing before you pay for a clean. A shiny, flattened arm is abraded fibre: the surface has been worn smooth by repeated contact and by grit working into the weave. Cleaning removes the soil that makes it look grey, so it will look better, but the flattening itself is permanent. We will point this out at the walk-through rather than let you discover it afterwards.",
      },
      {
        q: 'Can you do carpets at the same visit?',
        a: "Yes, and in Balham family houses it usually makes sense, because the same grit and pet dander is in both the carpet and the sofa. A three-seater plus two carpeted rooms starts at £130 against roughly £145 as two separate bookings, and more usefully it is one visit rather than two half-days at home. We clean upholstery first and carpets last so nothing clean gets walked on.",
      },
      {
        q: 'Is there a Congestion Charge or ULEZ cost on Balham jobs?',
        a: "Neither. SW12 is far outside the Congestion Charge zone, and our van meets ULEZ standards so no emissions charge applies anywhere in Greater London. The only travel-related cost that can appear on a Balham invoice is parking where no visitor permit is available, and it is shown at cost as a separate line.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london', 'sofa-dry-cleaning-london'],
  },
  {
    slug: 'streatham',
    name: 'Streatham',
    preposition: 'in',
    h1: 'Sofa Cleaning in Streatham',
    title: 'Sofa Cleaning Streatham SW16 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Streatham SW16 — the High Road, Streatham Common, Streatham Hill and Furzedown. No Congestion Charge. From £75.',
    localAuthority: 'London Borough of Lambeth',
    postcodes: ['SW16', 'SW2', 'SW17'],
    coverage: [
      'Streatham High Road and the town centre',
      'Streatham Common and The Rookery',
      'Streatham Hill and the Telford Park side',
      'Streatham Vale and the Norbury border',
      'Furzedown and Mitcham Lane',
      'Leigham Court Road and Streatham Park',
    ],
    stations: [
      'Streatham (Southern and Thameslink)',
      'Streatham Hill (Southern)',
      'Streatham Common (Southern)',
      'Tulse Hill (Southern and Thameslink)',
    ],
    neighbours: ['balham', 'clapham', 'wandsworth'],
    alsoNearby: ['Tooting', 'Norbury', 'Tulse Hill', 'Brixton', 'Mitcham'],
    intro: [
      "Streatham has no Underground station anywhere in SW16 — it is served entirely by National Rail from Streatham, Streatham Hill and Streatham Common. That sounds like a transport footnote and it genuinely shapes the housing: Streatham offers noticeably more space per pound than Balham or Clapham a short distance north, and the result is larger family houses, bigger rooms and bigger sofas than we see further in.",
      "The housing stock leans Edwardian and interwar rather than Victorian. The streets around Telford Park and Streatham Park have substantial detached and semi-detached houses, many with more than one reception room and therefore more than one sofa, and the Leigham Court Road side has a strong run of 1930s mansion blocks.",
      "We cover SW16 in full plus the adjoining parts of SW2 and SW17 — the High Road and town centre, the Common and The Rookery, Streatham Hill, Streatham Vale towards Norbury, and Furzedown along Mitcham Lane.",
    ],
    housing: {
      heading: 'What we typically find in Streatham homes',
      paragraphs: [
        "The large Edwardian and interwar family houses around Telford Park and Streatham Park frequently have two reception rooms in use, so a typical booking here is a three-seater plus an armchair in one room and a second sofa in another. That is a whole-house job rather than a single-item one, and it is where combining carpets into the same visit makes the most financial sense.",
        "The 1930s blocks along Leigham Court Road bring the same pattern we see in interwar stock elsewhere: more wool-blend and linen upholstery, smaller and more formal pieces, and building rules about contractor hours. Those go through the low-moisture route.",
        "Streatham Vale and the Norbury end has more post-war and modern stock, with straightforward polyester upholstery that takes full extraction well — and, because these are often family houses with pets, a higher than average share of enzyme odour treatments.",
      ],
    },
    accessNote:
      "Streatham High Road is the A23 and is one of the busiest arterial routes in south London, with red-route restrictions along much of its length and effectively no daytime loading. Addresses on the High Road itself are scheduled outside restricted hours or loaded from a side road. The residential streets either side — Telford Park, Streatham Park, Leigham Court Road — are far easier, and many houses there have their own driveway.",
    parking:
      "Lambeth controlled parking covers the town centre and the streets immediately around the stations, but a good deal of residential Streatham beyond that is unrestricted or lightly restricted, and many of the larger houses have off-street parking. In practice fewer Streatham invoices carry a parking line than anywhere else we cover in south London.",
    congestionCharge:
      "Streatham is a long way outside the Congestion Charge zone and our van is ULEZ compliant, so no travel surcharge applies to SW16 bookings.",
    commercial: {
      heading: 'Commercial work in Streatham',
      body:
        "Streatham High Road is one of the longest high streets in Europe and carries a large number of independent restaurants, cafés and community venues. We clean seating for them outside trading hours, and we also work regularly with the care homes and clinics concentrated around the Common and Leigham Court Road, where cleaning intervals are set by policy rather than by appearance.",
      examples: [
        'Restaurants and cafés along Streatham High Road',
        'Community halls and venues near Streatham Common',
        'Care homes and clinics around Leigham Court Road',
        'Churches and places of worship with fabric seating',
        'Nurseries and schools off Mitcham Lane and Streatham Vale',
      ],
    },
    faqs: [
      {
        q: 'Do you cover all of SW16?',
        a: "Yes, SW16 in full — the High Road and town centre, Streatham Common and The Rookery, Streatham Hill, Telford Park and Streatham Park, Streatham Vale down to the Norbury border, and Furzedown along Mitcham Lane. We also cover the adjoining parts of SW2 and SW17, so the Tulse Hill and Tooting edges are standard bookings.",
      },
      {
        q: 'I have two reception rooms with sofas in both. How is that priced?',
        a: "Per seat, across the whole visit, not per room. A three-seater plus an armchair in one room and a two-seater in another comes to six seats, and you get one price for the lot. Streatham houses are big enough that this is the normal pattern here rather than the exception, and it is exactly where adding carpets to the same visit saves the most — one call-out instead of two.",
      },
      {
        q: 'Can you park outside a Streatham High Road address?',
        a: "Not usually in daytime hours. The High Road is the A23 with red-route restrictions along much of its length and no practical loading provision. We either schedule High Road addresses outside restricted hours or load from a side road and run hose. The residential streets either side are much easier, and many of the larger houses have a driveway, in which case there is no parking issue at all.",
      },
      {
        q: 'Will a parking charge appear on my Streatham invoice?',
        a: "Less often than anywhere else we cover in south London. A good deal of residential Streatham is unrestricted or only lightly restricted, and many of the bigger houses have off-street parking. Where controlled parking does apply — mainly the town centre and the streets around the three stations — a visitor permit from you avoids it, and without one we add pay-and-display at cost as a separate line.",
      },
      {
        q: 'Can you remove pet odour from a sofa?',
        a: "Usually, and we get asked this more in Streatham than in most areas because there are more family houses with dogs. Odour in the fabric layer comes out well. Odour that has soaked into the foam needs an enzyme treatment applied before extraction and given time to work, because the smell comes from bacteria breaking down uric acid and only an enzyme digests those. If the foam is saturated through, we will tell you that cleaning may reduce the smell rather than eliminate it.",
      },
      {
        q: 'Do you work with care homes on a set schedule?',
        a: "Yes. Care homes and clinics around the Common and Leigham Court Road are a regular part of our Streatham work, and those run on a fixed cycle — typically every three months, or whatever the home's own policy specifies. We supply RAMS and COSHH sheets before the first visit and invoice monthly on account rather than per visit.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london', 'commercial-upholstery-cleaning-london'],
  },
  {
    slug: 'islington',
    name: 'Islington',
    preposition: 'in',
    h1: 'Sofa Cleaning in Islington',
    title: 'Sofa Cleaning Islington N1 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Islington N1, N5, N7 and EC1 — Angel, Canonbury, Barnsbury, Highbury and Clerkenwell. From £75.',
    localAuthority: 'London Borough of Islington',
    postcodes: ['N1', 'N5', 'N7', 'N19', 'EC1'],
    coverage: [
      'Angel, Upper Street and Camden Passage',
      'Canonbury and the Grand Union side',
      'Barnsbury and the Caledonian Road area',
      'Highbury Fields and Highbury Park',
      'Clerkenwell and Farringdon (EC1)',
      'Holloway, Archway and the Nags Head area',
    ],
    stations: [
      'Angel (Northern line)',
      'Highbury & Islington (Victoria line and Overground)',
      'Farringdon (Elizabeth line, Circle, Metropolitan, Thameslink)',
      'Caledonian Road (Piccadilly line)',
    ],
    neighbours: ['hackney', 'barnet', 'chiswick'],
    alsoNearby: ['Shoreditch', 'Camden', 'Kings Cross', 'Stoke Newington', 'Finsbury Park'],
    intro: [
      "Islington is the one area we cover where the Congestion Charge genuinely matters, and it matters only for part of the borough. The zone's northern boundary runs along Pentonville Road and City Road, which means addresses in Clerkenwell and Finsbury — the EC1 end — sit inside it, while Angel, Canonbury, Barnsbury, Highbury and everything north are outside. We check your postcode against the boundary at the booking stage and tell you the position before you commit, rather than adding a line to the invoice you were not expecting.",
      "The housing is dominated by Georgian and early Victorian terraces, particularly in Canonbury and Barnsbury, where the conservation area status means many are listed and almost all have original features. High ceilings, narrow hallways and steep stairs are the norm, and a significant share of these houses hold upholstery of genuine age and value.",
      "Alongside that sits the Clerkenwell warehouse conversion stock — open-plan loft spaces with large modern sofas — and a substantial amount of council and ex-council housing across Holloway and Archway. All three get covered.",
    ],
    housing: {
      heading: 'What we typically find in Islington homes',
      paragraphs: [
        "Canonbury and Barnsbury Georgian houses regularly contain antique or reupholstered period pieces where the dye is not colourfast by modern standards and the filling may be horsehair or coir rather than foam. Neither should get wet. We test more extensively in these houses than anywhere else we work, and we are willing to say a piece needs a textile conservator rather than an upholstery cleaner.",
        "Clerkenwell loft conversions run the other way — large modern sofas, often leather or a heavy synthetic weave, in open-plan spaces with good airflow. Those are straightforward, and the open plan means drying is rarely the constraint it is in a sealed flat.",
        "The Upper Street and Angel flats sit in between: Victorian conversions, usually professional tenants, and a steady flow of end-of-tenancy bookings where an itemised invoice for the deposit scheme matters as much as the clean itself.",
      ],
    },
    accessNote:
      "Upper Street has bus lanes and loading restrictions along most of its length through the day, and Camden Passage is pedestrianised with an antiques market running on Wednesdays and Saturdays. For addresses on or immediately off either, we schedule outside restricted hours and load from a side street. The Georgian terraces in Canonbury and Barnsbury also have steep, narrow stairs with tight turns — we run hose rather than carrying machines up them, so it is not a problem, but it is worth flagging the floor when you book.",
    parking:
      "Islington controlled parking covers effectively the whole borough with some of the most active enforcement in London, and residents' bays dominate the Georgian streets. A visitor permit from you is worth arranging — it is straightforward through the council and removes any parking line from your invoice. Where one is not available, pay-and-display is added at cost and itemised.",
    congestionCharge:
      "This one varies by postcode. Clerkenwell and Finsbury, broadly the EC1 part of the borough south of Pentonville Road and City Road, fall inside the Congestion Charge zone, and the daily charge is added to the invoice at cost. Angel, Canonbury, Barnsbury, Highbury, Holloway and Archway are outside it and carry no charge. Our van is ULEZ compliant, so no emissions surcharge applies anywhere. Give us the full postcode when you book and we will confirm which side of the line you are on.",
    commercial: {
      heading: 'Commercial work in Islington',
      body:
        "Clerkenwell is dense with design, architecture and media studios, and their breakout seating and task chairs are our most common commercial booking in the borough — done in the evening or at a weekend. Upper Street's restaurant run is the other half, cleaned before opening or on a closed day.",
      examples: [
        'Design, architecture and media studios across Clerkenwell and Farringdon',
        'Restaurants and bars along Upper Street and Essex Road',
        'Theatres and venues including the Almeida and Sadlers Wells area',
        'Co-working spaces around Old Street and Angel',
        'Boutique hotels and serviced apartments in N1',
      ],
    },
    faqs: [
      {
        q: 'Will I be charged the Congestion Charge for an Islington booking?',
        a: "Only if your address is inside the zone, and most of Islington is not. The boundary runs along Pentonville Road and City Road, so Clerkenwell and Finsbury in EC1 are inside it, while Angel, Canonbury, Barnsbury, Highbury, Holloway and Archway are outside. Where it does apply we add the daily charge at cost as a separate line, and we tell you at the booking stage — give us your full postcode on the call and we will confirm before you commit.",
      },
      {
        q: 'Can you clean antique upholstery in a Canonbury or Barnsbury house?',
        a: "Sometimes, and we test properly before answering. Period pieces often have dyes that are not colourfast by modern standards, horsehair or coir filling that must not get wet, and hessian webbing that rots if moisture reaches it. We test on a concealed panel, work at the most conservative setting the fabric allows, and we are willing to decline the job — if a piece needs a textile conservator rather than an upholstery cleaner, we will say so instead of taking the booking.",
      },
      {
        q: 'My flat is on the third floor of a Georgian terrace with narrow stairs. Is that a problem?',
        a: "No. We run hose from the van up to the flat rather than carrying machines up a steep Georgian staircase, so tight turns make no practical difference. Mention the floor when you book, purely so we bring enough hose — the longest runs we do in Islington are the four-storey Barnsbury and Canonbury houses.",
      },
      {
        q: 'When can you load on Upper Street or Camden Passage?',
        a: "Outside the restricted hours, which in practice means early morning or evening for Upper Street. Camden Passage is pedestrianised with an antiques market on Wednesdays and Saturdays, so for addresses there we load from a side street and run hose. Tell us the address when you book and we will pick a slot that works rather than arriving and finding we cannot stop.",
      },
      {
        q: 'Do you cover Clerkenwell warehouse conversions?',
        a: "Yes, regularly. Loft conversions are among the easier jobs in the borough — large modern sofas in open-plan spaces with good airflow, so drying is rarely the constraint it is in a sealed flat. The main things to flag when booking are goods-lift access and whether the building has contractor hours, both of which are common in converted warehouse blocks.",
      },
      {
        q: 'Can you work evenings for an office in Farringdon?',
        a: "Yes — evenings, overnight and weekends are the majority of our commercial work, and Clerkenwell and Farringdon studios are our most frequent booking of that kind. We supply RAMS, COSHH sheets and our public liability certificate before the first visit, and we lean towards low-moisture encapsulation so the space reopens within about an hour rather than six.",
      },
    ],
    popularServices: ['sofa-dry-cleaning-london', 'commercial-upholstery-cleaning-london', 'leather-sofa-cleaning-london'],
  },
  {
    slug: 'hackney',
    name: 'Hackney',
    preposition: 'in',
    h1: 'Sofa Cleaning in Hackney',
    title: 'Sofa Cleaning Hackney E8 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Hackney E5, E8, E9 and N16 — London Fields, Dalston, Clapton, Stoke Newington and Hackney Wick. From £75.',
    localAuthority: 'London Borough of Hackney',
    postcodes: ['E5', 'E8', 'E9', 'E2', 'N1', 'N16'],
    coverage: [
      'London Fields and Broadway Market',
      'Dalston and Kingsland Road',
      'Clapton, Upper and Lower',
      'Stoke Newington and Church Street',
      'Hackney Central and Mare Street',
      'Hackney Wick and Victoria Park side',
    ],
    stations: [
      'Hackney Central (Overground)',
      'London Fields (Overground)',
      'Dalston Junction and Dalston Kingsland (Overground)',
      'Hackney Wick (Overground)',
    ],
    neighbours: ['islington', 'barnet', 'clapham'],
    alsoNearby: ['Shoreditch', 'Bethnal Green', 'Stamford Hill', 'Leyton', 'Bow'],
    intro: [
      "Hackney is served almost entirely by the Overground rather than the Underground, which is more relevant to this job than it sounds: the borough is genuinely well connected east-to-west and awkward north-to-south by road, and the Kingsland Road and Mare Street corridors carry the traffic for all of it. We build travel time into Hackney bookings accordingly and would rather give you a realistic arrival window than an optimistic one.",
      "The housing is more mixed than anywhere else we cover. Victorian terraces around London Fields, Georgian houses in Clapton and along Stoke Newington Church Street, warehouse conversions in Hackney Wick and towards Shoreditch, and some of the largest council estates in London across Hackney Central and Homerton — all within a couple of miles.",
      "We cover E5, E8, E9 and N16 in full, plus the Hackney parts of E2 and N1. Almost all of it is outside the Congestion Charge zone; only a narrow strip at the borough's southern tip around Shoreditch, south of Old Street, falls inside it, and we confirm by postcode when you book.",
    ],
    housing: {
      heading: 'What we typically find in Hackney homes',
      paragraphs: [
        "London Fields and Broadway Market terraces are mostly Victorian, mostly converted into flats, and mostly occupied by sharers or young families. Sofas there take heavy use and are rarely cleaned, so the first clean typically produces the biggest visible change of any job we do — and also the most honest conversation about which marks will not come out.",
        "Hackney Wick and the Shoreditch-edge warehouse conversions run to very large modern sofas in open-plan spaces with high ceilings. Easy to work in, good airflow for drying, but frequently on an upper floor with goods-lift access and building contractor hours — both worth flagging when you book.",
        "Clapton and Stoke Newington Church Street bring the Georgian stock, and with it the same caution we apply in Canonbury: period pieces, non-colourfast dyes, and filling that may not be foam. Those get tested before anything else happens.",
      ],
    },
    accessNote:
      "Broadway Market is closed to traffic for the market on Saturdays and is busy with pedestrians most of the weekend, so we do not book loading there at weekends. Kingsland Road and Mare Street are both heavily trafficked with bus lanes and restricted loading through the day. Hackney also has a number of low traffic neighbourhood filters across residential streets, which means the route to a door is sometimes considerably longer than a map suggests — we plan for it rather than arrive late.",
    parking:
      "Hackney controlled parking covers most of the borough, and the estates around Hackney Central and Homerton have their own permit systems that visitors cannot use. A visitor permit from you is the reliable answer everywhere in the borough. Without one, pay-and-display is itemised at cost.",
    congestionCharge:
      "Almost all of Hackney is outside the Congestion Charge zone. The exception is a narrow strip at the southern tip around Shoreditch, south of Old Street, which falls inside it — if your address is there, the daily charge is added at cost and we tell you before you book. Everywhere else in E5, E8, E9 and N16 carries no charge. Our van is ULEZ compliant, so there is no emissions surcharge anywhere.",
    commercial: {
      heading: 'Commercial work in Hackney',
      body:
        "Hackney has an unusually high density of independent cafés, bars and creative studios, and those make up most of our commercial bookings here. Café bench seating on Broadway Market and Church Street is cleaned before opening; studios in Hackney Wick and Dalston are done in the evening or at a weekend.",
      examples: [
        'Cafés and bars on Broadway Market and Stoke Newington Church Street',
        'Creative studios and workspaces in Hackney Wick and Dalston',
        'Pubs around London Fields and Victoria Park',
        'Short-let and Airbnb flats across E8 and E5',
        'Galleries and event spaces in converted warehouse buildings',
      ],
    },
    faqs: [
      {
        q: 'Does the Congestion Charge apply in Hackney?',
        a: "Almost never. The only part of the borough inside the zone is a narrow strip at its southern tip around Shoreditch, south of Old Street. Everywhere else — London Fields, Dalston, Clapton, Stoke Newington, Hackney Central, Hackney Wick — is outside it and carries no charge. Give us your full postcode when you book and we will confirm which side you are on before you commit.",
      },
      {
        q: 'Can you come on a Saturday to a Broadway Market address?',
        a: "Not for loading. Broadway Market is closed to traffic for the market on Saturdays and stays busy with pedestrians through the weekend, so there is no practical way to unload. We would suggest a weekday slot instead, which also avoids the worst of the Kingsland Road and Mare Street traffic. Addresses a street or two back from the market are much less affected.",
      },
      {
        q: 'Do the low traffic neighbourhood filters affect your arrival time?',
        a: "They affect the route rather than the price. Several residential streets across Hackney have modal filters, so the drivable route to a door can be considerably longer than a map suggests. We plan for it when scheduling and give you a realistic arrival window rather than an optimistic one — the practical effect is that we ask for a slightly wider window in Hackney than in most boroughs.",
      },
      {
        q: 'My flat is a warehouse conversion in Hackney Wick. Anything I should tell you?',
        a: "Two things: whether there is goods-lift access, and whether the building has contractor hours. Both are common in converted warehouse blocks and both affect scheduling rather than price. The cleaning itself is generally easier in these spaces — high ceilings and open plan mean good airflow, so drying is rarely the constraint it is in a sealed flat.",
      },
      {
        q: 'Our flatshare sofa has never been cleaned. Is it too far gone?',
        a: "Usually not, and first cleans on London Fields and Dalston sharer sofas produce the biggest visible change of any job we do, precisely because nothing has ever been done to them. General soiling, body oils, food residue and most drink spills come out well. Old red wine, curry oil and ink often do not. We will tell you which of your marks fall into which category before starting, and we can treat one area first so you can judge the result before committing.",
      },
      {
        q: 'Can you clean a Georgian sofa in Clapton or on Church Street?',
        a: "After testing, and sometimes the honest answer is no. Georgian and early Victorian pieces often have dyes that are not colourfast by modern standards and filling of horsehair or coir that must not get wet. We test on a concealed panel first and work at the most conservative setting the fabric allows. If a piece really needs a textile conservator, we will tell you rather than take the booking.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'sofa-bed-cleaning-london', 'commercial-upholstery-cleaning-london'],
  },
  {
    slug: 'chiswick',
    name: 'Chiswick',
    preposition: 'in',
    h1: 'Sofa Cleaning in Chiswick',
    title: 'Sofa Cleaning Chiswick W4 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Chiswick W4 — Bedford Park, Grove Park, Strand on the Green and the High Road. No Congestion Charge. From £75.',
    localAuthority: 'London Borough of Hounslow',
    postcodes: ['W4', 'W3', 'TW8'],
    coverage: [
      'Chiswick High Road and Turnham Green',
      'Bedford Park and the Woodstock Road area',
      'Grove Park and the Riverside',
      'Strand on the Green and Kew Bridge',
      'Devonshire Road and Chiswick Lane',
      'Gunnersbury and Chiswick Park',
    ],
    stations: [
      'Turnham Green (District line)',
      'Chiswick Park (District line)',
      'Stamford Brook (District line)',
      'Chiswick and Kew Bridge (South Western Railway)',
    ],
    neighbours: ['fulham', 'putney', 'islington'],
    alsoNearby: ['Acton', 'Hammersmith', 'Brentford', 'Kew', 'Barnes'],
    intro: [
      "Bedford Park is the reason Chiswick jobs are different. Built from 1875 as the first garden suburb, it is now a conservation area with a large number of listed Arts and Crafts houses, and the interiors match — original features, period-appropriate furniture, and a meaningful proportion of genuinely old upholstery. Working in these houses means testing properly and being willing to recommend the conservative method even where it produces a less dramatic result.",
      "South of the High Road, Grove Park and the Riverside run to large detached family houses with multiple reception rooms, while Strand on the Green has a row of eighteenth-century riverside cottages with their own constraint: they flood-risk at high spring tides and several have no vehicle access at all.",
      "We cover W4 in full plus the adjoining parts of W3 and TW8 — the High Road and Turnham Green, Bedford Park, Grove Park, Strand on the Green, Devonshire Road and out towards Gunnersbury.",
    ],
    housing: {
      heading: 'What we typically find in Chiswick homes',
      paragraphs: [
        "Bedford Park houses regularly hold period or reupholstered antique pieces alongside modern furniture, and the two need opposite handling in the same room. We test each piece separately rather than assuming the whole suite takes the same method — it is slower, and it is the only way to avoid damaging the one item that mattered.",
        "Grove Park and Riverside family houses are large, with two or three reception rooms in use and often a separate playroom. These are whole-house bookings where combining carpets into the same visit makes obvious sense, and where pet and child-related work — enzyme odour treatments, drink spills, fabric protector afterwards — is the bulk of the job.",
        "The Strand on the Green cottages are small, old and tightly built, with narrow doorways and low ceilings. Equipment access is the constraint rather than the cleaning, and several have no vehicle access at all, so hose runs are long.",
      ],
    },
    accessNote:
      "Strand on the Green has a towpath frontage with no vehicle access to many of the cottages, so hose runs there are among the longest we do anywhere — worth knowing when comparing a quote. The row also floods at high spring tides, and on those days the riverside end is impassable. Chiswick High Road itself has bus lanes and daytime loading restrictions along most of its length, so High Road addresses are loaded from a side road such as Devonshire Road or Turnham Green Terrace.",
    parking:
      "Hounslow controlled parking covers the High Road and the streets around Turnham Green, with lighter restrictions further out. Bedford Park and Grove Park streets are largely permit-controlled but many houses have their own driveway or forecourt, which removes the issue. Where controlled parking applies and no visitor permit is available, pay-and-display is itemised at cost.",
    congestionCharge:
      "Chiswick is far outside the Congestion Charge zone — the boundary is several miles east. Our van is ULEZ compliant, so there is no emissions surcharge. No travel charge applies to W4 bookings.",
    commercial: {
      heading: 'Commercial work in Chiswick',
      body:
        "Chiswick Business Park and the offices along the High Road are the main source of commercial work here, cleaned in the evening or at a weekend, along with the restaurant run on the High Road and Devonshire Road. The riverside pubs at Strand on the Green have the same river-damp problem as Putney Embankment and benefit from a shorter cycle.",
      examples: [
        'Offices at Chiswick Business Park and along the High Road',
        'Restaurants and cafés on Chiswick High Road and Devonshire Road',
        'Riverside pubs at Strand on the Green and Kew Bridge',
        'Media and production companies around Chiswick Park',
        'Private schools and nurseries across W4',
      ],
    },
    faqs: [
      {
        q: 'Can you clean period upholstery in a Bedford Park house?',
        a: "Often yes, after testing each piece separately. Bedford Park interiors regularly mix genuinely old furniture with modern pieces in the same room, and they need opposite handling — period dyes are frequently not colourfast by modern standards and older filling may be horsehair rather than foam. We test each item rather than assuming the suite takes one method, and where a piece really needs a textile conservator we will say so.",
      },
      {
        q: 'My cottage is on Strand on the Green with no vehicle access. Can you still come?',
        a: "Yes. We run hose from the nearest point the van can reach, and the Strand on the Green runs are among the longest we do anywhere — which is fine, it just takes a little longer to set up. Two things to know: the price is unaffected, and we avoid booking the riverside end on days with a high spring tide, because that stretch floods and becomes impassable.",
      },
      {
        q: 'Is there a Congestion Charge on Chiswick bookings?',
        a: "No. Chiswick is several miles west of the Congestion Charge boundary, so no part of W4 is affected. Our van is ULEZ compliant, so there is no emissions surcharge either. The only travel-related cost that can appear on a Chiswick invoice is parking, and many Bedford Park and Grove Park houses have their own driveway, which removes even that.",
      },
      {
        q: 'Do you cover Grove Park and the Riverside as well as the High Road area?',
        a: "Yes — W4 in full, including Grove Park, the Riverside, Strand on the Green, Bedford Park, Devonshire Road and out towards Gunnersbury and Chiswick Park. We also cover the adjoining parts of W3 and TW8, so the Acton and Brentford edges are standard bookings rather than out-of-area ones.",
      },
      {
        q: 'We have a dog and three reception rooms. How would that be quoted?',
        a: "Per seat across the whole visit, with any extras listed separately. A typical Grove Park booking might be a corner sofa, two armchairs and a second sofa upstairs, plus heavy pet-hair removal where the hair has woven into the weave. Adding the carpets to the same visit usually makes sense with a dog in the house, because the same hair and dander is in both — and it is one call-out instead of two.",
      },
      {
        q: 'Can you work evenings for an office at Chiswick Business Park?',
        a: "Yes, and that is how most of our work there is done — evenings and weekends, so nobody loses a working day. We supply RAMS, COSHH sheets and our public liability certificate before the first visit, and we lean towards low-moisture encapsulation on task chairs and breakout seating so the floor reopens in about an hour rather than six.",
      },
    ],
    popularServices: ['sofa-dry-cleaning-london', 'carpet-and-sofa-cleaning-london', 'leather-sofa-cleaning-london'],
  },
  {
    slug: 'barnet',
    name: 'Barnet',
    preposition: 'across',
    h1: 'Sofa Cleaning in Barnet',
    title: 'Sofa Cleaning Barnet EN5 & N12 | Upholstery Cleaners',
    metaDescription:
      'Sofa and upholstery cleaning across Barnet — High Barnet, Finchley, Hendon, Mill Hill, Whetstone and Hampstead Garden Suburb. Free parking. From £75.',
    localAuthority: 'London Borough of Barnet',
    postcodes: ['EN4', 'EN5', 'N2', 'N3', 'N11', 'N12', 'N14', 'N20', 'NW4', 'NW7', 'NW11', 'HA8'],
    coverage: [
      'High Barnet, Chipping Barnet and New Barnet',
      'Finchley — Church End, East Finchley and North Finchley',
      'Whetstone, Totteridge and Oakleigh Park',
      'Hendon, Mill Hill and Edgware',
      'Golders Green and Hampstead Garden Suburb',
      'Friern Barnet and Arkley',
    ],
    stations: [
      'High Barnet (Northern line)',
      'Finchley Central and East Finchley (Northern line)',
      'Hendon Central and Golders Green (Northern line)',
      'New Barnet and Oakleigh Park (Great Northern)',
    ],
    neighbours: ['islington', 'hackney', 'chiswick'],
    alsoNearby: ['Muswell Hill', 'Southgate', 'Borehamwood', 'Potters Bar', 'Hampstead'],
    intro: [
      "Barnet is the largest London borough by population and by some distance the most suburban area we cover, and both facts change the job. The housing is overwhelmingly interwar — street after street of 1930s semis through Finchley, Hendon, Whetstone and Mill Hill — with larger detached houses in Totteridge, Arkley and Mill Hill Village, and the Hampstead Garden Suburb conservation area at the southern end.",
      "The practical difference from inner London is parking. Most residential streets across Barnet are unrestricted, and the majority of houses have their own driveway. In practice a Barnet invoice almost never carries a parking line, and we can unload at the door rather than running hose from two streets back — which is worth factoring in when comparing quotes against an inner-London company.",
      "We cover the whole borough: EN4 and EN5, the N2, N3, N11, N12, N14 and N20 postcodes, NW4, NW7 and NW11, and HA8 at the Edgware end.",
    ],
    housing: {
      heading: 'What we typically find in Barnet homes',
      paragraphs: [
        "The 1930s semi is the defining Barnet property, and it produces a very consistent job: a front reception room with a three-piece suite, a back room or through-lounge with a larger sofa, and a family that has been in the house long enough for the upholstery to have accumulated years of use. These are almost always synthetic fabrics that take full hot water extraction well, and they respond dramatically to it.",
        "Hampstead Garden Suburb is the exception at the southern end — a conservation area with listed and period-sensitive houses, higher-value furniture, and the same testing discipline we apply in Bedford Park and Canonbury.",
        "Totteridge, Arkley and Mill Hill Village bring large detached houses with multiple reception rooms and often leather suites, which is why leather cleaning and conditioning is a bigger share of our Barnet work than of anywhere else we cover.",
      ],
    },
    accessNote:
      "Barnet is large — roughly nine miles from Edgware in the west to New Barnet in the east — and the north-south roads through it carry heavy traffic at peak times. We schedule Barnet jobs in geographic clusters rather than criss-crossing the borough, which is why we may offer you a specific day rather than any day you ask for. Say if your date is fixed and we will work around it.",
    parking:
      "This is where Barnet differs most from the rest of our coverage. The majority of residential streets are unrestricted, and most houses have a driveway or forecourt. Controlled parking exists around the town centres — Finchley Central, Golders Green, Hendon Central, High Barnet — but even there it is lighter than inner London. Most Barnet invoices carry no parking charge at all.",
    congestionCharge:
      "Barnet is an outer London borough, miles from the Congestion Charge zone, and our van is ULEZ compliant. There is no travel surcharge of any kind on a Barnet booking.",
    commercial: {
      heading: 'Commercial work in Barnet',
      body:
        "Barnet's commercial work is more dispersed than inner London: offices around Brent Cross and along the North Circular, care homes across Finchley and Mill Hill, and the independent restaurants on Barnet High Street, Golders Green Road and Ballards Lane. Care home work here runs on a fixed quarterly cycle set by the home's own policy.",
      examples: [
        'Care homes across Finchley, Hendon and Mill Hill',
        'Restaurants and cafés on Golders Green Road and Ballards Lane',
        'Offices around Brent Cross and the North Circular',
        'Synagogues, churches and community centres with fabric seating',
        'Private schools and nurseries across NW7 and N20',
      ],
    },
    faqs: [
      {
        q: 'Will I be charged for parking on a Barnet booking?',
        a: "Almost certainly not. Most residential streets across Barnet are unrestricted and the majority of houses have a driveway, so we unload at the door. Controlled parking exists around Finchley Central, Golders Green, Hendon Central and High Barnet, but even there it is lighter than inner London. This is a genuine cost difference from an inner-London job and worth factoring in when you compare quotes.",
      },
      {
        q: 'Which Barnet postcodes do you cover?',
        a: "The whole borough — EN4 and EN5 at the High Barnet and New Barnet end, N2, N3, N11, N12, N14 and N20 through Finchley, Whetstone and Totteridge, NW4, NW7 and NW11 for Hendon, Mill Hill and Golders Green, and HA8 at Edgware. If you are just outside the boundary, ring anyway and we will tell you straight away whether we can reach you.",
      },
      {
        q: 'Can I pick any day, or do you work by area?',
        a: "We schedule Barnet in geographic clusters, because the borough is roughly nine miles across and criss-crossing it wastes time we would otherwise spend cleaning. That means we may offer you a specific day rather than any day you ask for. If your date is fixed — a checkout, guests arriving, a house move — say so on the call and we will work around it rather than offering you a cluster slot.",
      },
      {
        q: 'Do you clean leather suites?',
        a: "Yes, and there is more leather work in Barnet than anywhere else we cover, particularly in the larger houses in Totteridge, Arkley and Mill Hill Village. Leather is cleaned with pH-balanced products matched to the hide type and then conditioned — the two go together, because cleaning without conditioning leaves the hide drier than it started. We do a water-drop test first to identify whether the leather is pigmented or aniline, which determines every product used.",
      },
      {
        q: 'We have a three-piece suite in one room and a sofa in another. How is that priced?',
        a: "Per seat across the whole visit. A three-piece suite — a three-seater and two armchairs — is five seats, plus whatever is in the second room. You get a single price for the lot. This is the standard Barnet booking, because the 1930s semi with two reception rooms in use is the defining property type here, and it is where adding carpets to the same visit saves the most.",
      },
      {
        q: 'Do you work with care homes in Finchley or Mill Hill?',
        a: "Yes, on a fixed cycle — usually quarterly, or whatever the home's own policy specifies. We supply RAMS, COSHH sheets and our public liability certificate before the first visit, work around residents' routines rather than to our own convenience, and invoice monthly on account. We keep a record of what was cleaned and when, which is what makes the following year's budgeting straightforward.",
      },
    ],
    popularServices: ['steam-sofa-cleaning-london', 'leather-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london'],
  },
];

export const areaSlugs = areas.map((a) => a.slug);

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
