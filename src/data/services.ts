export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short label used in nav and link lists. */
  navLabel: string;
  /** Full service name used in schema.org serviceType. */
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  /** One-line summary used on cards and the services hub. */
  summary: string;
  /** Image key from src/data/images.ts */
  image: string;
  /** Quick-scan facts shown in the hero sidebar. Every value differs per service. */
  keyFacts: { label: string; value: string }[];
  /** Opening body copy, one paragraph per array entry. */
  intro: string[];
  /** The method, step by step. Differs per service — not a shared boilerplate list. */
  method: { step: string; body: string }[];
  /** Free-form body sections. */
  sections: { h2: string; paragraphs?: string[]; bullets?: string[]; table?: { head: string[]; rows: string[][] } }[];
  /** Honest fit guidance — what this method is and is not for. */
  suitedTo: string[];
  notSuitedTo: string[];
  faqs: FAQ[];
  /** Slugs of the two or three most relevant other services. */
  related: string[];
};

export const services: Service[] = [
  {
    slug: 'steam-sofa-cleaning-london',
    navLabel: 'Steam sofa cleaning',
    name: 'Steam Sofa Cleaning (Hot Water Extraction)',
    h1: 'Steam Sofa Cleaning in London',
    title: 'Steam Sofa Cleaning London | Hot Water Extraction',
    metaDescription:
      'Hot water extraction sofa cleaning across London. Rinses soil out of the foam rather than off the surface. Dry in 3–6 hours. From £75 for a 3-seater.',
    summary:
      'Hot water extraction at 60–80°C. The deepest clean available for cotton, linen, polyester and most synthetic weaves.',
    image: 'steam',
    keyFacts: [
      { label: 'Also called', value: 'Hot water extraction, HWE' },
      { label: 'Water used', value: 'High — fabric is rinsed through' },
      { label: 'Typical drying time', value: '3–6 hours' },
      { label: 'Solution temperature', value: '60–80°C at the jet' },
      { label: 'From', value: '£75 for a 3-seater' },
    ],
    intro: [
      'Steam cleaning is the method people picture when they imagine a sofa being cleaned properly, and for most fabric sofas in London it is the right choice. The trade name is hot water extraction, which describes it better: heated cleaning solution is injected into the fabric under pressure, it lifts soil out of the fibre and out of the foam beneath, and a vacuum head pulls the solution straight back out in the same pass.',
      'The distinction matters because it is what separates a real clean from a cosmetic one. A surface method removes what you can see. Extraction removes what has soaked in — the body oils that transfer from skin and hair into the seat cushions, the sugar residue from spilled drinks that makes fabric resoil quickly, and the fine grit that works its way down through the weave and cuts the fibres every time somebody sits down. That grit is the reason a sofa seat goes shiny and flat: it abrades the fabric from underneath.',
      'Hot water matters for a specific reason. Most soiling on a sofa is oil-bound — sebum from skin, oils from food, greasy airborne residue from cooking. Oil softens with heat. At 60–80°C at the jet the oil film releases from the fibre and can be flushed away, where the same solution applied cold would simply move it around. This is also why a domestic carpet washer from a hire shop rarely produces the same result: the tank heat is lower and the vacuum recovery is much weaker, so more water goes in than comes back out.',
    ],
    method: [
      {
        step: 'Fabric identification and a colourfastness test',
        body: 'We find the manufacturer label — usually under a seat cushion or on the underside of the frame — and read the cleaning code. W means wet-cleanable, S means solvent only, S/W means either, and X means vacuum only. If there is no label, we test. Either way a small amount of the solution goes on a hidden panel first, usually the back of a skirt or under a cushion, and is blotted with white cloth. Colour on the cloth means the dye is not fast and we switch to the dry method rather than risk it.',
      },
      {
        step: 'Dry soil removal with a HEPA-filtered vacuum',
        body: 'Everything loose comes out before any moisture goes on. This is not the same as running a household vacuum over the cushions — we use a crevice tool along every seam, lift the cushions and vacuum both faces and the deck underneath, and use an upholstery brush head on the arms and back. Skipping this step is the single most common cause of a sofa looking worse after cleaning: dry grit plus water becomes mud, and mud wicks to the surface as it dries.',
      },
      {
        step: 'Pre-spray, dwell, and agitation',
        body: 'An alkaline pre-spray goes on and is left to dwell for eight to ten minutes. Dwell time is doing the work here — the chemistry needs contact time to break the bond between the soil and the fibre, and no amount of scrubbing substitutes for it. We then agitate with a soft horsehair or nylon brush, which distributes the solution evenly and lifts matted pile so the extraction head can reach into it.',
      },
      {
        step: 'Spot and stain pre-treatment',
        body: 'General pre-spray will not shift everything. Tannin stains (tea, coffee, red wine) need an acidic treatment. Protein stains (milk, blood, vomit, pet accidents) need an enzyme that digests the protein and must not be used hot, because heat sets protein. Ink and adhesive need a solvent. Each gets its own product applied to the spot alone, before the main pass.',
      },
      {
        step: 'Hot water extraction',
        body: 'The upholstery hand tool applies solution and recovers it in the same stroke. We work in overlapping passes, then make two or three dry passes with the jet off over each area to pull out as much moisture as the vacuum will take. How much water is left behind is entirely down to how many dry strokes the technician is willing to make, and it is the main difference between a sofa dry in four hours and a sofa damp for two days.',
      },
      {
        step: 'Neutralising rinse and controlled drying',
        body: 'A mildly acidic rinse brings the fabric back to a neutral pH. Alkaline residue left in fabric is what makes a freshly cleaned sofa attract dirt faster than it did before — it stays slightly tacky and grabs soil. We finish by setting up an air mover to push air across the surface and grooming the pile so it dries lying in one direction.',
      },
    ],
    sections: [
      {
        h2: 'Which fabrics take steam cleaning well',
        paragraphs: [
          'Hot water extraction suits fabrics that tolerate water and hold their structure when wet. In practice that covers the large majority of sofas sold in the UK over the last twenty years, because polyester and polyester blends dominate the market.',
        ],
        table: {
          head: ['Fabric', 'Steam cleanable', 'What to expect'],
          rows: [
            ['Polyester / poly blends', 'Yes — ideal', 'Dries fast, no shrinkage, holds colour. The best-case fabric for this method.'],
            ['Cotton and cotton blends', 'Yes, with care', 'Can shrink if over-wet. We reduce solution flow and make extra dry passes.'],
            ['Linen', 'Usually not', 'Prone to shrinkage, watermarking and creasing. We normally recommend low-moisture instead.'],
            ['Microfibre / suedette', 'Yes', 'Cleans very well. The pile needs grooming afterwards or it dries patchy.'],
            ['Velvet (synthetic)', 'Yes, with grooming', 'Pile direction must be reset while damp or it shades unevenly.'],
            ['Velvet (cotton or silk)', 'No', 'Crushes and watermarks. Dry method only.'],
            ['Wool and wool blends', 'Cautiously', 'Needs a wool-safe, pH-neutral solution and minimal moisture. Alkaline products damage wool.'],
            ['Viscose / rayon', 'No', 'Loses strength when wet and watermarks readily. Dry method only.'],
            ['Leather', 'No', 'Water and pressure force dye and finish off the hide. See leather cleaning.'],
          ],
        },
      },
      {
        h2: 'What steam cleaning realistically removes — and what it does not',
        paragraphs: [
          'We would rather tell you before the visit than apologise after it. Hot water extraction is very effective on general soiling, body oils, food residue, most drink spills, pet odour in the fabric layer and dust-mite allergen. It is the method with the best evidence behind it for allergen reduction, because the allergen is physically flushed out rather than suspended and redeposited.',
          'It does not reverse dye loss. If bleach, a household cleaner or strong sunlight has stripped colour out of the fibre, the fibre is now a different colour and cleaning it makes that patch cleaner, not darker. It does not restore fabric that has worn through — shiny, flattened arms are abraded fibre, and abrasion is permanent. Old tannin stains that have oxidised over years often lighten substantially but not completely. Ballpoint ink, hair dye, permanent marker and curry oil frequently do not come out at all.',
          'Where we think a stain will not fully lift, we say so before starting and, if you want, we treat it and let you see the result before committing to the whole suite.',
        ],
      },
      {
        h2: 'Drying: what actually controls it',
        paragraphs: [
          'Three to six hours is the honest range for a fabric sofa in a normally ventilated London room. It is not a fixed number, and anyone quoting you an exact time before seeing the sofa is guessing.',
          'What speeds it up: open windows and a through-draught, a warm room, thin upholstery over a hardwood frame, and — most of all — thorough dry passes at the extraction stage. What slows it down: dense foam-backed cushions, a cold basement flat, a room with no opening window, and heavy soiling that needed more solution to shift.',
          'We leave an air mover running where the room allows it. You can sit on the sofa once the surface is dry to the touch, which is usually well before the foam core has finished. If you need the sofa usable the same evening and the room has no ventilation, tell us at the booking stage and we will recommend the low-moisture method instead.',
        ],
      },
      {
        h2: 'Steam cleaning for end-of-tenancy checkouts',
        paragraphs: [
          'A large share of our steam-cleaning work is tenancy-related, and the requirements there are specific. Inventory clerks compare the check-out condition against the check-in report, and they photograph. What helps you is documentation: we issue a dated invoice naming the property address, the items cleaned and the method used, which is what a letting agent or deposit scheme adjudicator actually asks for.',
          'Two practical points. First, book the clean after the property is empty and the carpets are done, not before — otherwise the sofa gets walked past and re-soiled during the move. Second, a deposit scheme cannot require a professional clean as a blanket condition, but it can hold you to returning the item in the condition recorded at check-in, fair wear and tear excepted. A receipted professional clean is the simplest way to evidence that you did.',
        ],
      },
    ],
    suitedTo: [
      'Polyester, poly-blend and microfibre sofas — the most common UK upholstery',
      'Sofas that have never been professionally cleaned, or not for two years or more',
      'Households with pets, where odour has reached the foam',
      'Allergy and asthma households needing dust-mite allergen physically removed',
      'End-of-tenancy checkouts where a receipted deep clean is needed',
    ],
    notSuitedTo: [
      'Leather, suede and nubuck — water damages the finish',
      'Viscose, rayon and cotton or silk velvet — these watermark and crush',
      'Fabrics coded "S" (solvent only) or "X" (vacuum only) on the manufacturer label',
      'Rooms with no ventilation where the sofa must be usable within two hours',
    ],
    faqs: [
      {
        q: 'How long does a steam-cleaned sofa take to dry?',
        a: 'Three to six hours for a typical fabric sofa in a ventilated London room. Dense foam cushions and cold, unventilated rooms push it towards the upper end. We finish with extra dry passes and leave an air mover running where the room allows, which is what brings the time down. The surface is normally sittable before the foam core is fully dry.',
      },
      {
        q: 'Will steam cleaning shrink my sofa covers?',
        a: 'Not if the fabric is identified correctly first. Shrinkage is a risk with cotton, linen and some natural blends, which is exactly why we read the care label and test before any solution goes on. On a shrink-prone fabric we either reduce moisture heavily or switch to the low-moisture dry method. We do not clean removable covers in a washing machine, because that is where most shrinkage disasters happen.',
      },
      {
        q: 'Does steam cleaning kill dust mites?',
        a: 'Extraction at 60–80°C kills mites on contact and, more usefully, flushes out the mite allergen — which is faecal protein, not the mite itself, and is what actually triggers symptoms. Killing mites without removing the allergen achieves little, so the extraction step is the one that matters for allergy households.',
      },
      {
        q: 'Can you remove pet urine with steam cleaning?',
        a: 'Fresh urine in the fabric layer usually comes out well. Urine that has soaked into the foam needs an enzyme treatment applied before extraction and given time to work, because the smell comes from bacteria breaking down uric acid crystals and only an enzyme digests those. If the foam is saturated through — common where a pet has used the same spot repeatedly — we will tell you honestly that cleaning may reduce the odour rather than eliminate it.',
      },
      {
        q: 'Is the process safe around children and pets?',
        a: 'We use solutions chosen to leave no harmful residue, and the neutralising rinse removes what would otherwise stay in the fabric. Keep children and pets off the sofa until it is dry to the touch, which is standard practice for any wet-cleaning method, mainly so the damp pile is not flattened while it dries.',
      },
      {
        q: 'How often should a sofa be steam cleaned?',
        a: 'Every 12 to 18 months for an average household, every 6 to 12 months with pets, small children or a smoker in the property. More frequent than that is rarely necessary and adds wear; much less frequent and the embedded grit starts abrading the fibre, which is not reversible.',
      },
    ],
    related: ['sofa-dry-cleaning-london', 'carpet-and-sofa-cleaning-london', 'sofa-bed-cleaning-london'],
  },
  {
    slug: 'sofa-dry-cleaning-london',
    navLabel: 'Sofa dry cleaning',
    name: 'Low-Moisture Sofa Dry Cleaning',
    h1: 'Sofa Dry Cleaning in London',
    title: 'Sofa Dry Cleaning London | Low-Moisture & Solvent',
    metaDescription:
      'Low-moisture dry cleaning for velvet, linen, viscose and "S"-coded sofas across London. Usable again in 1–2 hours. From £75 for a 3-seater.',
    summary:
      'Solvent and encapsulation cleaning for fabrics water would ruin — velvet, linen, viscose, silk blends and anything coded "S".',
    image: 'dry',
    keyFacts: [
      { label: 'Also called', value: 'Low-moisture, solvent, encapsulation' },
      { label: 'Water used', value: 'Minimal — around 90% less than extraction' },
      { label: 'Typical drying time', value: '1–2 hours' },
      { label: 'Care codes handled', value: 'S, S/W, and W where shrinkage is a risk' },
      { label: 'From', value: '£75 for a 3-seater' },
    ],
    intro: [
      'Some fabrics cannot be wet-cleaned without damaging them, and a surprising number of London sofas fall into that group — particularly in period conversions and newer designer pieces where linen, viscose blends and cotton velvet are common. Putting hot water extraction through those fabrics produces watermarks, crushed pile, shrinkage or fibre that loses its strength and tears. Dry cleaning exists for exactly that problem.',
      '"Dry" is a slight misnomer. The method is low-moisture rather than genuinely waterless: cleaning agent is applied as a foam or a fine mist, worked through the fibre mechanically, and then removed by vacuum once it has captured the soil. The fabric never becomes saturated, so nothing swells, shrinks or wicks, and the piece is usable again within an hour or two.',
      'There are two chemistries we use depending on the fabric. Solvent cleaning uses a petroleum-derived or citrus-derived solvent that dissolves oily soil and evaporates, which is what "S" on a care label is asking for. Encapsulation uses a polymer that surrounds each soil particle and dries to a brittle crystal, which is then vacuumed away — it leaves no sticky residue, which is why encapsulated fabric tends to stay clean longer than conventionally shampooed fabric.',
    ],
    method: [
      {
        step: 'Care-code check and fibre identification',
        body: 'This step carries more weight here than in any other service, because the whole reason you are on this page is usually that the fabric is delicate. We read the label, and where there is none we identify the fibre by feel, burn test on a loose thread where one is available, and by the construction of the weave. Viscose, for example, is easy to mistake for silk or cotton by eye but loses roughly half its tensile strength when wet — getting that identification wrong is how sofas get torn.',
      },
      {
        step: 'Colourfastness and pile-response testing',
        body: 'A small amount of the chosen product goes on a concealed area. On pile fabrics we also test how the pile responds to being brushed damp, because crushing is as damaging cosmetically as a watermark. We check the result under good light before going any further.',
      },
      {
        step: 'Thorough dry vacuuming',
        body: 'Low-moisture methods rely much more heavily on dry soil removal than extraction does, because there is no flushing action to carry grit away. We vacuum with a HEPA-filtered machine using an upholstery head on the panels and a crevice tool through every seam and under every cushion, and on pile fabrics we use a pile lifter first to raise embedded grit to the surface.',
      },
      {
        step: 'Targeted spotting with the correct chemistry',
        body: 'Spots are treated individually before the general clean. Solvent for oil, grease, ink and adhesive. Enzyme for protein. Acidic tannin remover for tea, coffee and wine. On delicate pile we blot rather than rub, and we work from the outside of the mark inwards so the edge does not spread into a ring.',
      },
      {
        step: 'Foam or mist application and mechanical agitation',
        body: 'The cleaning agent is applied as a dry foam or a controlled mist — never poured or flooded — and worked in with a soft brush or a rotary bonnet, depending on the fabric. The mechanical action is what does most of the cleaning in this method, which is why it is slower per square metre than extraction and why the result depends heavily on whoever is holding the brush.',
      },
      {
        step: 'Vacuum recovery and pile finishing',
        body: 'Once the encapsulant has dried to a crystal or the solvent has flashed off, everything is vacuumed out. On velvet and other pile fabrics we finish by grooming the pile in a single direction with a soft brush, which is what stops the finished piece looking shaded or patchy. Cushions go back the way they came off, so the wear pattern is not reversed.',
      },
    ],
    sections: [
      {
        h2: 'When dry cleaning is the right choice over steam',
        paragraphs: [
          'The decision is made by the fabric, not by preference. If the manufacturer label carries an "S", the fabric is telling you plainly that water will damage it, and we follow that. If the label is missing — common on second-hand and imported furniture — the fibre decides.',
        ],
        table: {
          head: ['Situation', 'Recommended method', 'Reason'],
          rows: [
            ['Care label reads "S"', 'Dry / solvent', 'Manufacturer states water will damage the fabric.'],
            ['Cotton or silk velvet', 'Dry', 'Pile crushes permanently and watermarks when wet.'],
            ['Viscose, rayon, modal', 'Dry', 'Fibre loses around half its strength when wet.'],
            ['Linen and linen blends', 'Dry', 'Shrinks and creases; watermarks show at every seam.'],
            ['Silk or silk blends', 'Dry', 'Water spots and dye migration are near-certain.'],
            ['Sofa must be usable in 2 hours', 'Dry', 'Extraction needs 3–6 hours to dry.'],
            ['Ground-floor flat, no ventilation', 'Dry', 'Extraction dries slowly without air movement.'],
            ['Heavy pet odour in the foam', 'Steam', 'Odour needs flushing out; dry methods cannot reach the foam.'],
            ['Polyester sofa, never cleaned', 'Steam', 'Extraction removes far more embedded soil.'],
          ],
        },
      },
      {
        h2: 'Velvet, and why it needs a different pair of hands',
        paragraphs: [
          'Velvet sofas have been the dominant look in London interiors for several years now, and a large proportion of them are cotton or viscose velvet rather than the more forgiving polyester version. The pile is the whole point of the fabric and it is also the vulnerable part.',
          'Two things go wrong with velvet. The first is crushing: pressure on damp pile flattens it, and on cotton velvet that flattening can be permanent. The second is shading — pile lying in different directions reflects light differently, so a patchily cleaned velvet sofa develops light and dark areas that look like stains but are not. Both are handled by keeping moisture low, by working in the direction of the pile, and by grooming the whole panel in one direction at the finish rather than spot-treating and walking away.',
          'We will not machine-scrub a velvet sofa. It is slower by hand and it is the only way to keep the pile intact.',
        ],
      },
      {
        h2: 'What low-moisture cleaning will and will not achieve',
        paragraphs: [
          'Being straight about this matters, because dry cleaning is sometimes sold as equivalent to extraction and it is not. On light to moderate soiling, on a fabric that has been maintained, the visual result is comparable and the fabric is protected — which is the whole trade-off.',
          'On a heavily soiled sofa with years of body oil in the cushions, dry cleaning will improve the appearance noticeably but will not match what extraction achieves, because it does not flush the foam. On deep-set odour it is limited for the same reason: the smell is usually below the fabric layer, and a method that stays in the fabric layer cannot reach it.',
          'Where a delicate fabric is also heavily soiled, we say so and let you decide. Sometimes the right answer is accepting a very good result rather than a perfect one, because the alternative risks the fabric.',
        ],
      },
      {
        h2: 'Antique and high-value upholstery',
        paragraphs: [
          'Older pieces bring their own problems. Pre-1960s upholstery often uses natural dyes that are not colourfast by modern standards, horsehair or coir filling that must not get wet, and hessian or jute webbing that rots if moisture reaches it. Frames of that age are frequently held together with hide glue, which softens with heat and humidity.',
          'For anything of significant age or value we work at the most conservative setting the fabric allows, test more extensively than we would on a modern sofa, and are willing to decline the job if we think the risk is not ours to take. If a piece needs a textile conservator rather than an upholstery cleaner, we will tell you that instead of taking the booking.',
        ],
      },
    ],
    suitedTo: [
      'Velvet, linen, viscose, rayon and silk-blend upholstery',
      'Any sofa with an "S" or "S/W" cleaning code on the label',
      'Antique and reproduction pieces with non-colourfast dyes',
      'Flats with poor ventilation, or where the sofa is needed again the same day',
      'Light to moderate soiling on fabric that has been kept up with',
    ],
    notSuitedTo: [
      'Very heavily soiled sofas where soil has reached the foam',
      'Deep-set pet urine odour — this needs flushing, not encapsulating',
      'Leather, which needs its own pH-balanced products and conditioning',
      'Anyone wanting the maximum possible allergen removal — extraction does more',
    ],
    faqs: [
      {
        q: 'Is sofa dry cleaning genuinely waterless?',
        a: 'No, and any company claiming it is waterless is overstating it. The correct term is low-moisture: roughly 90% less water than hot water extraction, applied as a foam or fine mist rather than injected. The fabric becomes slightly damp to the touch at most, never saturated, which is what prevents shrinkage and watermarking.',
      },
      {
        q: 'How soon can I sit on the sofa afterwards?',
        a: 'One to two hours in most cases, and sometimes sooner on a thin-panelled piece in a warm room. That speed is the main practical reason people choose this method over extraction. We will tell you on the day once we see how much product the fabric took.',
      },
      {
        q: 'Can you dry clean a velvet sofa without flattening the pile?',
        a: 'Yes, and it is a large part of what this service is for. The pile is kept dry enough that it never collapses, all brushing follows the direction of the pile rather than against it, and the whole panel is groomed in one direction at the finish so light reflects evenly. What we will not do is machine-scrub velvet — it is faster and it is how pile gets permanently crushed.',
      },
      {
        q: 'Does dry cleaning remove smells?',
        a: 'It removes odour held in the fabric — smoke, general staleness, light cooking smells — because the source is in the fibre and the fibre is being cleaned. It is much less effective on odour that has soaked into the foam, such as an established pet urine problem, because low-moisture methods deliberately do not penetrate that far. If the odour is in the foam we will recommend extraction with an enzyme treatment instead and explain the trade-off.',
      },
      {
        q: 'My sofa has no care label. Can you still clean it?',
        a: 'Yes. Missing labels are common on second-hand, imported and reupholstered furniture. We identify the fibre by construction, feel and where possible a burn test on a loose thread from a hidden seam, then test the chosen product on a concealed panel. Where identification is genuinely ambiguous we default to the gentler method, because the cost of being wrong in that direction is a slightly less dramatic result rather than a damaged sofa.',
      },
      {
        q: 'Will the solvent smell linger in the room?',
        a: 'There is a mild odour during the clean that clears within an hour or two with a window open, and citrus-based solvents are noticeably milder than petroleum ones. If anyone in the household is sensitive to solvent smells, tell us when booking and we will use an encapsulation product instead, which is effectively odourless.',
      },
    ],
    related: ['steam-sofa-cleaning-london', 'leather-sofa-cleaning-london', 'commercial-upholstery-cleaning-london'],
  },
  {
    slug: 'leather-sofa-cleaning-london',
    navLabel: 'Leather sofa cleaning',
    name: 'Leather Sofa Cleaning and Conditioning',
    h1: 'Leather Sofa Cleaning in London',
    title: 'Leather Sofa Cleaning London | Clean & Condition',
    metaDescription:
      'pH-balanced leather cleaning and conditioning across London. Aniline, semi-aniline, pigmented and nubuck identified before any product is used. From £85.',
    summary:
      'Cleaned with pH-balanced products matched to the hide type, then conditioned to put back the oils that cause cracking when they are lost.',
    image: 'leather',
    keyFacts: [
      { label: 'Hide types handled', value: 'Pigmented, semi-aniline, aniline, nubuck, bicast' },
      { label: 'Two-stage process', value: 'Clean, then condition — never one without the other' },
      { label: 'Typical drying time', value: '1–2 hours' },
      { label: 'Recommended interval', value: 'Every 6–12 months' },
      { label: 'From', value: '£85 for a 3-seater' },
    ],
    intro: [
      'Leather fails in a specific and predictable way. It is a skin, it contains oils, and the oils migrate out over time through heat, sunlight, body contact and simple evaporation. As they go the hide loses flexibility, and a hide that has lost flexibility cracks at the points where it flexes most — the front edge of the seat cushions and the tops of the arms. By the time you can see cracking, the leather has already been dry for a long while.',
      'That is why cleaning leather and conditioning leather are two halves of one job. Cleaning without conditioning removes soil and also removes some of the remaining surface oil, which leaves the hide drier than it was before you started. Any company that cleans leather and does not condition it afterwards is accelerating the problem they were called in to address.',
      'The other half of doing this properly is identifying the hide first. Pigmented leather has a protective polymer coating and tolerates a reasonable amount of handling. Aniline leather has no coating at all — it is dyed through and the surface is bare hide, so it absorbs whatever touches it, water included. Using a pigmented-leather product on aniline leaves permanent dark patches. The two are easy to tell apart with a simple test and impossible to tell apart by glancing at them.',
    ],
    method: [
      {
        step: 'Hide identification with a water-drop test',
        body: 'A single drop of water goes on a hidden area — usually the back of the sofa near the floor. If it sits on the surface as a bead, the leather is pigmented and coated. If it darkens the leather and soaks in within a few seconds, it is aniline or semi-aniline and needs completely different handling. Nubuck and suede are identified by the nap. This thirty-second test determines every product used for the rest of the visit.',
      },
      {
        step: 'Dry soil and crevice clearing',
        body: 'Leather traps grit in the seams and in the gap behind the seat cushions, and that grit is abrasive. We vacuum with a soft brush head over the panels and a crevice tool through every seam and fold, and remove the seat cushions to clear the deck. On buttoned or deeply piped leather this is the slowest part of the job and it matters — trapped grit under a cushion cuts the finish every time somebody sits down.',
      },
      {
        step: 'pH-balanced cleaning, panel by panel',
        body: 'Leather sits at around pH 4.5 to 5.5, mildly acidic. Ordinary household cleaners and most all-purpose sprays are strongly alkaline and strip the finish, which is the most common cause of the dull, patchy look we get called out to fix. We use a pH-balanced leather cleaner applied to a cloth rather than sprayed onto the hide, and work one panel at a time so nothing dries with product still sitting on it.',
      },
      {
        step: 'Attention to the high-contact areas',
        body: 'Head rests, arm tops and the front edge of the seat take the vast majority of the wear. Head rests in particular accumulate hair product and sebum, which build into a dark, slightly tacky film. These areas get a second pass with a soft brush working into the grain, because the soiling sits in the texture rather than on top of it.',
      },
      {
        step: 'Conditioning and absorption time',
        body: 'A conditioner formulated for the hide type is worked in and given time to absorb. This is not a finish you buff on and wipe off immediately — it needs to penetrate, which takes fifteen to twenty minutes. On dry, thirsty leather we apply a second lighter coat once the first has gone in. On aniline we use a conditioner specific to uncoated hide, because standard pigmented-leather conditioners sit on the surface and leave it looking greasy.',
      },
      {
        step: 'Buffing to an even finish',
        body: 'The panels are buffed with a clean microfibre cloth to remove any conditioner the leather did not take up. This is what stops the sofa feeling slippery afterwards, and it evens out the sheen so the cleaned panels match. We finish with a protection product on request, which slows the next round of oil loss.',
      },
    ],
    sections: [
      {
        h2: 'Identifying your leather before anything touches it',
        paragraphs: [
          'The water-drop test settles it in seconds, and the answer changes everything that follows. Here is what each type means in practice.',
        ],
        table: {
          head: ['Type', 'How to spot it', 'How it is cleaned'],
          rows: [
            ['Pigmented (protected)', 'Uniform colour, slight sheen, water beads on the surface. Around 80% of UK sofas.', 'Most robust. pH-balanced cleaner, full conditioning. Small colour repairs are possible.'],
            ['Semi-aniline', 'Visible grain, light protective coat, water darkens slowly.', 'Gentler products, less moisture, conditioner matched to lightly coated hide.'],
            ['Aniline', 'Natural markings visible, matte, water soaks in within seconds and darkens.', 'Specialist uncoated-hide products only. No water, no general-purpose cleaner.'],
            ['Nubuck / suede', 'Velvety nap that changes shade when you brush it.', 'Dry method with a nap brush and specialist powder. Liquid cleaners ruin it.'],
            ['Bicast / bonded', 'Very uniform, plastic-like feel; often peels in sheets once aged.', 'Gentle surface clean only. Bonded leather delaminates and cannot be restored.'],
          ],
        },
      },
      {
        h2: 'What we can fix, and what needs a restorer',
        paragraphs: [
          'Cleaning and conditioning reverses the things caused by soil and dryness: the greyish film on the arms, the darkened head-rest patches, stiffness, and the dull look that comes from a build-up of old care products. Leather that has gone hard usually softens noticeably once conditioned, because the stiffness is lack of oil rather than damage.',
          'It does not fix physical damage. A tear, a cigarette burn or a cat-scratched arm needs a leather repair technician — a different trade, working with fillers and colour matching. Colour that has rubbed off down to the substrate needs re-pigmenting, which is also restoration rather than cleaning. Bonded leather that has started peeling cannot be saved by anyone: the peeling is the polyurethane layer separating from its fabric backing, and there is nothing underneath to bond it back to.',
          'We will tell you which category your sofa is in before we start, and if it is a restoration job we will say so rather than take a cleaning fee for a result that will not satisfy you.',
        ],
      },
      {
        h2: 'Why household products damage leather',
        paragraphs: [
          'The three things we most often see used, and what each one does: baby wipes contain surfactants and sometimes alcohol, and repeated use strips the finish in exactly the high-contact areas you were trying to clean. All-purpose sprays are alkaline, typically pH 9 to 11, against leather at pH 5 — that gap dissolves the protective coating. Furniture polish and silicone-based sprays leave a film that looks good for a week, then attracts dust and eventually goes blotchy.',
          'Olive oil and other kitchen oils are a persistent piece of internet advice and a genuinely bad one: food oils go rancid in the hide, and the smell that develops is not removable.',
          'If your sofa has already had these used on it, say so when you book. Stripping old product build-up before cleaning is a step we can plan for, and it changes how long the job takes.',
        ],
      },
      {
        h2: 'Keeping leather in condition between visits',
        bullets: [
          'Keep the sofa out of direct sunlight, or at least rotate the cushions — UV is the fastest route to faded, brittle hide.',
          'Keep it at least 30cm from radiators. Dry heat pulls oil out of the hide faster than anything else in a London flat.',
          'Dust weekly with a dry microfibre cloth. Dust is mildly abrasive once it works into the grain.',
          'Blot spills immediately with a dry cloth — never rub, and never use a wet one on aniline.',
          'Vacuum the seams monthly with a crevice tool to clear the grit that does the abrading.',
          'Have it cleaned and conditioned every 6 to 12 months. Conditioning is preventative, so the interval matters more than it does for fabric.',
        ],
      },
    ],
    suitedTo: [
      'Pigmented, semi-aniline and aniline leather sofas and armchairs',
      'Leather that feels stiff, dry or looks dull and grey on the arms',
      'Darkened head-rest and arm patches from hair product and body oil',
      'Leather dining chairs, ottomans and car-style recliners',
      'Preventative care on newer leather, before cracking starts',
    ],
    notSuitedTo: [
      'Tears, burns and deep scratches — these need a leather repair technician',
      'Bonded or bicast leather that has already begun to peel',
      'Colour loss down to the substrate, which needs re-pigmenting',
      'Fabric upholstery — see steam or dry cleaning instead',
    ],
    faqs: [
      {
        q: 'How do I know whether my leather is aniline or pigmented?',
        a: 'Put one drop of water on a hidden part of the back of the sofa. If it beads and sits there, the leather is pigmented and has a protective coating. If it soaks in and darkens the spot within a few seconds, it is aniline or semi-aniline. The distinction is not cosmetic — using a pigmented-leather cleaner on aniline leaves permanent dark patches, so we do this test on every visit before opening a bottle.',
      },
      {
        q: 'Can you remove cracks from leather?',
        a: 'No, and we would rather say that plainly. A crack is a physical split in the hide, and cleaning cannot rejoin it. What conditioning does is restore flexibility to the leather around the crack so it does not spread, and the surface usually looks considerably better because the cracks become less visible once the hide is supple and evenly coloured. Repairing existing cracks is a restoration job for a leather repair technician.',
      },
      {
        q: 'Will cleaning restore faded colour?',
        a: 'Cleaning removes the dull grey film of soil and old product, and that alone usually makes leather look significantly richer — people often read this as colour coming back. Genuine UV fading, where the dye itself has broken down, is not reversible by cleaning. That needs re-pigmenting, which is a restoration service.',
      },
      {
        q: 'How often should leather be cleaned and conditioned?',
        a: 'Every 6 to 12 months, and more often for leather near a radiator or in direct sun. The interval matters more than it does with fabric because conditioning is preventative — you are replacing oils before the hide gets dry enough to crack, and once it has cracked no amount of conditioning undoes it.',
      },
      {
        q: 'Is the process safe for a sofa with contrast stitching or piping?',
        a: 'Yes. Contrast stitching is the place where over-wetting shows first, because thread wicks moisture and can carry dye from the leather into a pale stitch. We apply product to the cloth rather than to the sofa, work away from the stitch line, and keep the seams dry — which is also why we do not spray leather directly.',
      },
      {
        q: 'My leather sofa smells musty. Will cleaning fix it?',
        a: 'Usually, if the smell is in the hide and the seams rather than in the foam beneath. Leather holds odour in the grain and the seams, and a thorough clean plus conditioning clears most of it. If the sofa has been stored damp and the foam has taken on mould, the problem is below the leather and cleaning the surface will not solve it — we will tell you that on inspection rather than after taking payment.',
      },
    ],
    related: ['steam-sofa-cleaning-london', 'sofa-dry-cleaning-london', 'commercial-upholstery-cleaning-london'],
  },
  {
    slug: 'carpet-and-sofa-cleaning-london',
    navLabel: 'Carpet & sofa combined',
    name: 'Combined Carpet and Sofa Cleaning',
    h1: 'Carpet and Sofa Cleaning in London',
    title: 'Carpet & Sofa Cleaning London | One Visit, One Price',
    metaDescription:
      'Carpets, rugs and upholstery cleaned in the same visit across London. One set-up, one call-out, one price. 3-seater plus two rooms from £130.',
    summary:
      'Carpets, stairs, rugs and upholstery in a single visit — which removes a second call-out and a second set-up from the bill.',
    image: 'combined',
    keyFacts: [
      { label: 'Best for', value: 'Whole-room refreshes and tenancy checkouts' },
      { label: 'Typical visit length', value: '2–4 hours' },
      { label: 'Order of work', value: 'Upholstery first, carpets last' },
      { label: 'Carpet drying time', value: '4–8 hours' },
      { label: 'From', value: '£130 for a 3-seater plus two rooms' },
    ],
    intro: [
      'Cleaning a sofa and leaving the carpet it sits on untouched rarely makes sense, and the reason is not only aesthetic. Soil transfers. Grit walked in on shoes ends up in the carpet pile, is kicked up as people move around, and settles on the upholstery. Pet dander and dust-mite allergen circulate between the two continuously. Cleaning one and not the other means the clean one starts picking up from the dirty one immediately.',
      'The practical argument is simpler. Most of the fixed cost of a cleaning visit is the visit itself — travel across London, parking, carrying the equipment in, setting up hoses and power, testing, and packing down again. That cost is the same whether we clean one sofa or a sofa and four rooms. Booking them together means you pay it once.',
      'It also means the work is sequenced properly. Done as two separate visits, whichever comes second gets walked over while the technician works. Done in one visit, we work top-down and finish on the carpets, so nothing clean gets trodden on afterwards.',
    ],
    method: [
      {
        step: 'Walk-through, measure and confirm the price',
        body: 'We look at every item to be cleaned before starting, measure the rooms, check fibre types on both carpet and upholstery, and identify stains that will need individual treatment. You get the final figure at this point, before any equipment comes off the van. If we find something that changes the price — a carpet that turns out to be wool rather than synthetic, or a stain needing specialist treatment — you hear it now, not on the invoice.',
      },
      {
        step: 'Protect the route and move what needs moving',
        body: 'We lay protective sheeting along the path from the door and put corner guards on door frames where hoses run. Light furniture is moved and put back; we do not move pianos, large wardrobes, beds with storage bases, or anything electrical. Fragile items we ask you to clear beforehand so there is no ambiguity about who moved what.',
      },
      {
        step: 'Upholstery first',
        body: 'The sofa and chairs are done first, using whichever method the fabric calls for — extraction on polyester and cotton blends, low-moisture on velvet, linen and viscose, leather products on leather. Doing upholstery first means any overspray or dislodged soil lands on carpet that has not been cleaned yet.',
      },
      {
        step: 'Rugs, treated separately from the floor beneath',
        body: 'Rugs come off the carpet and are cleaned on a protected surface, because cleaning a rug in place pushes moisture and dislodged dye into the carpet underneath. Wool and silk rugs are hand-cleaned with pH-neutral product. We check for dye bleed on every rug before starting — bleeding rug dye into a pale carpet is an expensive mistake and a completely avoidable one.',
      },
      {
        step: 'Carpets: dry soil removal, pre-spray, then extraction',
        body: 'Carpets are vacuumed thoroughly first — the majority of what is in a carpet is dry soil, and it is far easier to remove before water goes on. Then pre-spray with dwell time, agitation with a counter-rotating brush to lift matted pile, then hot water extraction with a power wand working in overlapping passes, finishing with dry strokes.',
      },
      {
        step: 'Stairs, edges and drying',
        body: 'Stairs are done last and by hand with a stair tool, because a wand cannot reach into a riser properly. Edges and under radiators get a detail pass. Then we groom the pile, set up air movers in the rooms that need them, and walk through with you so anything you are not happy with gets addressed while we are still there.',
      },
    ],
    sections: [
      {
        h2: 'What a combined visit typically covers',
        paragraphs: [
          'These are the combinations we are booked for most often. Prices are guides — the confirmed figure comes from the walk-through.',
        ],
        table: {
          head: ['Package', 'What it covers', 'Time on site', 'From'],
          rows: [
            ['One-bed flat refresh', '3-seater sofa, living room carpet, bedroom carpet', '2–2.5 hours', '£130'],
            ['Two-bed tenancy checkout', 'Corner sofa, two bedrooms, hall, stairs and landing', '3–4 hours', '£195'],
            ['Family living room', '3-seater, armchair, one large rug, room carpet', '2.5–3 hours', '£165'],
            ['Stairs and landing add-on', 'Up to 14 steps plus landing, added to any booking', '35–50 min', '£35'],
            ['Whole-house spring clean', 'All upholstery, all carpets, stairs, rugs and mattresses', '5–7 hours', 'Quoted on survey'],
          ],
        },
      },
      {
        h2: 'Why the order of work matters',
        paragraphs: [
          'It sounds like a detail and it is the difference between a good finish and a mediocre one. Cleaning upholstery after the carpet means walking wet-shod across a freshly cleaned carpet, kneeling on it, and dropping soil on it from the sofa — all of which undoes the work. Cleaning rugs in situ pushes their moisture and any loose dye into the carpet beneath.',
          'The correct sequence is upholstery, then rugs on a protected surface, then carpets working from the room furthest from the door back towards it, then stairs on the way out. Done that way, nobody walks on finished work.',
          'It also concentrates drying time at the end of the visit rather than the start, so the total time before you have your rooms back is shorter.',
        ],
      },
      {
        h2: 'Tenancy checkouts: what agents and deposit schemes actually want',
        paragraphs: [
          'A large share of combined bookings are end-of-tenancy, and the outcome there depends on evidence as much as on the clean itself. Deposit adjudicators compare the check-out report to the check-in inventory and look for change beyond fair wear and tear.',
          'What helps you: a dated, itemised invoice naming the property address and listing every item cleaned and the method used. That is the document an adjudicator accepts. What does not help: a generic receipt with no address on it.',
          'A practical point worth knowing — since the Tenant Fees Act 2019, a tenancy agreement in England cannot require you to pay for a professional clean as a blanket condition. It can require you to return the property in the condition recorded at check-in. A receipted professional clean is simply the cleanest way to evidence that you have, which is why it remains worth doing. If you need the invoice in a particular format for your agent, tell us and we will produce it that way.',
        ],
      },
      {
        h2: 'Carpet fibres and what changes',
        paragraphs: [
          'Carpet fibre affects method as much as sofa fabric does. Polypropylene — the majority of rental and new-build carpet in London — is essentially bleach-safe and tolerates strong cleaning, but it is oleophilic, meaning it grips oily soil hard and needs a good pre-spray. Nylon cleans very well and responds to heat. Wool is the one that needs care: it must have a pH-neutral, wool-safe product, because alkaline chemistry damages the fibre and causes yellowing, and it must not be over-wet because it holds water and can shrink or develop cellulosic browning.',
          'Sisal, seagrass and jute are not wet-cleanable at all. They shrink, brown and distort. We clean those with a low-moisture method or, if they are already badly soiled, tell you honestly that replacement may be the better value.',
        ],
      },
    ],
    suitedTo: [
      'Whole-room or whole-flat refreshes where both carpet and upholstery need work',
      'End-of-tenancy checkouts needing one itemised invoice for the deposit scheme',
      'Households with pets, where dander is circulating between carpet and sofa',
      'Landlords turning a property around between tenants on a short window',
      'Anyone wanting one visit, one technician and one price rather than two bookings',
    ],
    notSuitedTo: [
      'Sisal, seagrass and jute flooring, which cannot be wet-cleaned',
      'Properties where the carpet needs replacing rather than cleaning',
      'Same-day turnarounds with no ventilation — carpets need 4–8 hours to dry',
    ],
    faqs: [
      {
        q: 'How much do I save booking carpets and sofa together?',
        a: 'The saving comes from paying one call-out and one set-up instead of two, so it is largest on smaller jobs. A 3-seater plus two rooms starts at £130 against roughly £145 booked as two separate visits, and the gap widens on bigger jobs. The bigger practical gain is a single visit rather than two half-days at home.',
      },
      {
        q: 'How long will the whole visit take?',
        a: 'Two to two and a half hours for a sofa plus two rooms, three to four hours for a two-bedroom checkout including stairs, and five to seven for a whole house. We confirm the expected window at the walk-through once we have seen the actual rooms, rather than guessing from a phone description.',
      },
      {
        q: 'Do carpets or the sofa dry first?',
        a: 'The sofa, usually. Upholstery is typically dry in 3–6 hours and carpet in 4–8, and because we clean upholstery first it also gets a head start. You can walk on a damp carpet in clean socks before it is fully dry, though not in outdoor shoes — that just puts the soil straight back.',
      },
      {
        q: 'Do you move furniture?',
        a: 'We move light items — dining chairs, coffee tables, small side tables — and put them back where they were. We do not move beds with storage bases, wardrobes, pianos, large electricals or anything on a stone or glass top, for liability reasons. If a room needs clearing to be cleaned properly, tell us when booking so the time is built into the quote.',
      },
      {
        q: 'Can you clean a wool carpet and a synthetic sofa in the same visit?',
        a: 'Yes, and they get different chemistry. Wool needs a pH-neutral wool-safe solution and low moisture; a polyester sofa takes a stronger alkaline pre-spray and full extraction. Carrying both is routine — what matters is that the technician identifies each fibre before choosing, which is part of the walk-through.',
      },
      {
        q: 'Will you provide an invoice for my letting agent?',
        a: 'Yes. You get a dated, itemised invoice naming the property address, every item cleaned and the method used on each. That is the format deposit schemes and inventory clerks ask for. If your agent needs particular wording or their own reference on it, tell us at the booking and we will issue it that way.',
      },
    ],
    related: ['steam-sofa-cleaning-london', 'sofa-bed-cleaning-london', 'commercial-upholstery-cleaning-london'],
  },
  {
    slug: 'sofa-bed-cleaning-london',
    navLabel: 'Sofa bed cleaning',
    name: 'Sofa Bed and Mattress Cleaning',
    h1: 'Sofa Bed Cleaning in London',
    title: 'Sofa Bed Cleaning London | Frame & Mattress',
    metaDescription:
      'Sofa bed cleaning across London — upholstery and the fold-out mattress, both sides. Sweat, allergen and mould treated properly. From £95.',
    summary:
      'Both halves of the job: the outer upholstery and the fold-out mattress that spends most of its life shut inside a warm, damp cavity.',
    image: 'sofabed',
    keyFacts: [
      { label: 'Two items in one', value: 'Outer upholstery plus the internal mattress' },
      { label: 'Mattress sides cleaned', value: 'Both, plus the frame cavity' },
      { label: 'Typical drying time', value: '4–8 hours — mattress must be fully dry' },
      { label: 'Common finding', value: 'Mould on the underside of the mattress' },
      { label: 'From', value: '£95' },
    ],
    intro: [
      'A sofa bed is two pieces of upholstery pretending to be one, and the half nobody cleans is the half that needs it most. The fold-out mattress spends the overwhelming majority of its life folded shut inside a metal frame, in a cavity with no airflow, usually against a wall. Whatever went into it the last time somebody slept on it is still in there.',
      'That matters because of what a sleeping adult puts into a mattress. Perspiration is the main one — roughly a third of a litre over a night, and on a sofa bed almost all of it goes into a thin mattress with no protector because guests rarely use one. Add skin cells, which feed dust mites, and the fact that the mattress is then folded shut while still slightly damp, and you have created close to ideal conditions for mould and mite colonies.',
      'The symptom people call us about is a musty smell when the bed is opened for guests. Almost always the smell is on the underside of the mattress or in the frame cavity, which is exactly where a normal clean never reaches.',
    ],
    method: [
      {
        step: 'Open the mechanism and inspect the cavity',
        body: 'The bed is fully extended and the mattress lifted clear of the frame so both faces and the cavity below are accessible. This inspection is where we find what is actually wrong: mould spotting on the underside, rust marks transferred from the frame, old spills that soaked through from above, and in flats with damp issues, mildew on the deck itself. You see what we find before we start.',
      },
      {
        step: 'HEPA vacuum both mattress faces and the frame',
        body: 'Both sides of the mattress, all four borders, the hinge line where it folds, and the frame cavity including the linkage bars. The hinge line is the highest-value part of this step — it is a permanent crease that collects skin cells and dust and is never disturbed by ordinary use. HEPA filtration matters here specifically because mite allergen is fine enough to pass straight through a standard vacuum and back into the room air.',
      },
      {
        step: 'Treat body-fluid stains with enzyme, not heat',
        body: 'Sweat, urine and other protein stains need an enzyme treatment that digests the protein, applied at room temperature and given time to work. Heat sets protein, which is why hot extraction over an untreated protein stain locks it in permanently. Enzyme goes on first, dwells, and only then does anything else happen to that area.',
      },
      {
        step: 'Controlled low-moisture clean on the mattress',
        body: 'Mattresses are deliberately cleaned with far less moisture than a sofa. Foam holds water, a sofa bed mattress is thin enough that water reaches the core quickly, and a mattress that is folded away damp will grow mould — which is the problem we were called to fix. Light passes with maximum vacuum recovery, then repeated dry strokes, is the right approach even though it is slower.',
      },
      {
        step: 'The outer upholstery, by its own method',
        body: 'The visible sofa is cleaned according to its fabric — extraction on polyester and cotton blends, low-moisture on velvet, linen and viscose. We also clean the frame cavity and the deck the mattress sits on, since leaving a cleaned mattress to be folded back into a dirty cavity achieves very little.',
      },
      {
        step: 'Full drying before the bed is folded away',
        body: 'This is the step we are firmest about. The mechanism stays open with an air mover running until the mattress is dry through, not just dry on the surface. Folding it early is how the musty smell comes back within weeks. If we cannot stay until it is dry, we leave it open and tell you what to check for before closing it.',
      },
    ],
    sections: [
      {
        h2: 'What we most often find inside a sofa bed',
        table: {
          head: ['Finding', 'Cause', 'What we do about it'],
          rows: [
            ['Musty smell on opening', 'Mattress folded away damp, no airflow in the cavity', 'Enzyme and odour treatment, then full drying open.'],
            ['Grey-black spotting underneath', 'Surface mould from trapped condensation', 'Anti-microbial treatment; heavy growth in the foam means replacement.'],
            ['Orange-brown streaks', 'Rust transferring from the frame linkage', 'Rust remover on the fabric; the frame is treated to stop recurrence.'],
            ['Yellowish patches on the top face', 'Perspiration that has oxidised over time', 'Enzyme treatment. Older marks lighten substantially but rarely vanish.'],
            ['Dust and grit in the hinge crease', 'Skin cells and dust collecting in a fold that never opens', 'Crevice vacuuming along the full hinge line before any wet work.'],
            ['Dark ring marks', 'Drink spills that soaked through from the sofa above', 'Spot treatment from both faces so the mark does not wick back.'],
          ],
        },
      },
      {
        h2: 'Sofa beds, guests and allergies',
        paragraphs: [
          'Guest bedding is the classic allergy trap. A guest with a dust-mite allergy sleeps on a mattress that has been shut in a dark, humid cavity for six months, wakes up congested, and assumes they are getting ill. The mattress is the reason — mite populations concentrate where skin cells accumulate and humidity stays high, and a folded sofa bed is close to the ideal habitat.',
          'Extraction and HEPA vacuuming physically remove the allergen rather than just killing mites, which is the part that matters: dead mites still carry the allergenic protein. For households where someone reacts badly, the useful combination is a proper clean followed by a washable mattress protector, and opening the bed for a few hours every couple of months.',
        ],
      },
      {
        h2: 'Mechanism types and what they mean for access',
        bullets: [
          'Click-clack / futon — the mattress is the seat, so it takes both sitting wear and sleeping wear. Usually the most soiled type we see.',
          'Pull-out metal frame — the most common. Good access once extended, but the linkage bars collect grit and often transfer rust.',
          'Three-fold pull-out — two permanent hinge creases rather than one, both of which need detailed crevice work.',
          'Storage ottoman bed — the cavity is sealed and airless, so mould is more likely here than in any other type.',
          'Chair beds and single fold-outs — small, but the mattress is thin and reaches saturation faster, so moisture control matters more.',
        ],
      },
      {
        h2: 'Keeping it fresh between cleans',
        paragraphs: [
          'Three habits make more difference than anything we do on the day. Open the bed fully for two or three hours every couple of months, ideally with a window open — airing the cavity prevents the conditions mould needs. Use a washable mattress protector and wash it at 60°C after guests, which stops perspiration reaching the foam in the first place. And after a guest has stayed, leave the bed open for a few hours before folding it away rather than closing it the same morning.',
          'If the room itself has a damp problem, the sofa bed will keep developing mould regardless of how well it is cleaned. In that case the damp is the job, not the mattress, and we will say so.',
        ],
      },
    ],
    suitedTo: [
      'Sofa beds used regularly for guests, or stored folded for long periods',
      'A musty or stale smell when the bed is opened',
      'Perspiration marks, yellowing or rust transfer on the mattress',
      'Guest rooms where a visitor has reacted with allergy symptoms',
      'Airbnb and short-let properties between guests',
    ],
    notSuitedTo: [
      'Mattresses with mould growth right through the foam — these need replacing',
      'Bed bug infestations, which require a licensed pest control treatment first',
      'Rooms with an active damp problem, where the cause is the room not the mattress',
    ],
    faqs: [
      {
        q: 'Do you clean the fold-out mattress as well as the sofa?',
        a: 'Yes — both faces of the mattress, all four borders, the hinge crease and the frame cavity it folds into, plus the outer upholstery. Cleaning only the visible sofa misses the part that causes the smell, which is nearly always the underside of the mattress or the cavity itself.',
      },
      {
        q: 'Why does my sofa bed smell musty?',
        a: 'Almost always because it was folded away while still slightly damp from perspiration, into a cavity with no airflow. That combination of moisture, warmth and darkness is what mould and bacteria need. The smell usually comes from the underside of the mattress or the frame deck, neither of which gets touched by ordinary cleaning.',
      },
      {
        q: 'How long before I can fold the bed away again?',
        a: 'It must be dry all the way through, not just on the surface — typically four to eight hours with the mechanism open and air moving across it. Folding it early is the single most common reason a musty smell returns within a few weeks. We leave an air mover running and tell you exactly what to check before closing it.',
      },
      {
        q: 'Can you remove mould from a sofa bed mattress?',
        a: 'Surface mould spotting on the mattress ticking responds well to an anti-microbial treatment followed by thorough drying. Mould that has grown into the foam core is a different matter — the growth is inside a material we cannot flush out, and we will recommend replacing the mattress rather than take payment for a clean that will not hold. We tell you which of the two you have at the inspection.',
      },
      {
        q: 'Will cleaning get rid of bed bugs?',
        a: 'No, and it is important not to treat it as though it will. Bed bugs need a licensed pest control treatment, and cleaning beforehand can spread them through a property. If we find evidence during inspection we stop, tell you, and recommend you have the treatment done first — we are happy to come back and clean afterwards.',
      },
      {
        q: 'My sofa bed is used every night. Is it treated differently?',
        a: 'Yes. A sofa bed slept on nightly takes the wear of a mattress and a sofa at once, and the sensible interval is every six months rather than annually. We also pay more attention to the hinge crease and the frame linkage, because daily folding grinds grit into both, and we would usually recommend a washable protector as the single most cost-effective thing you can add.',
      },
    ],
    related: ['steam-sofa-cleaning-london', 'carpet-and-sofa-cleaning-london', 'sofa-dry-cleaning-london'],
  },
  {
    slug: 'commercial-upholstery-cleaning-london',
    navLabel: 'Commercial upholstery',
    name: 'Commercial Upholstery Cleaning',
    h1: 'Commercial Upholstery Cleaning in London',
    title: 'Commercial Upholstery Cleaning London | Out of Hours',
    metaDescription:
      'Offices, hotels, pubs and restaurants across London. Out-of-hours and overnight slots, fast-drying methods, invoiced monthly. Quoted per site.',
    summary:
      'Offices, hotels, pubs, restaurants and venues — cleaned outside trading hours, dried fast enough to open on time.',
    image: 'commercial',
    keyFacts: [
      { label: 'Sectors', value: 'Offices, hotels, pubs, restaurants, venues, serviced flats' },
      { label: 'Working hours', value: 'Evenings, overnight and weekends' },
      { label: 'Method bias', value: 'Low-moisture, so rooms reopen quickly' },
      { label: 'Billing', value: 'Per site, invoiced monthly on account' },
      { label: 'Price', value: 'Quoted after a site survey' },
    ],
    intro: [
      'Commercial upholstery cleaning is a different job from domestic work, and the difference is not the equipment. It is that the room has to be back in service. A hotel cannot hold twelve rooms out of inventory waiting for headboards to dry, a pub cannot lose a Friday evening, and an office cannot have a floor of desks unusable on Monday morning. Everything about how we schedule and which method we choose follows from that.',
      'The volume is also different in kind. A domestic sofa gets a few hours of use a day from the same two or three people. A pub banquette takes hundreds of people a week, with drink spills, food, and outdoor clothing pressed against it constantly. Contract fabrics are specified to handle that — most commercial upholstery is rated to 40,000 Martindale rubs or more against 15,000 for domestic — but they still need a maintenance cycle, and the cycle is far shorter than a home sofa.',
      'We work to a schedule agreed in advance, in slots that suit the site rather than us, and we invoice monthly on account rather than per visit. For multi-site operators we keep a record of what was cleaned where and when, which is what makes the next budget cycle straightforward.',
    ],
    method: [
      {
        step: 'Site survey and a written schedule of works',
        body: 'We walk the site, count and categorise every item, identify the fabrics — contract fabrics are frequently different from what they look like — and note access constraints such as lift availability, loading bay hours and where power is. You get a written schedule listing every item, the method for each, the time required and the price. That document is what the visit is run against.',
      },
      {
        step: 'Compliance paperwork before the first visit',
        body: 'Most commercial sites need this in place before anyone comes on site: a risk assessment and method statement for the work, our public liability certificate, and COSHH data sheets for every product being used. We supply all of it as a pack up front rather than being chased for it on the morning of the job.',
      },
      {
        step: 'Scheduling around trading hours',
        body: 'Offices are usually done from 18:00 or overnight. Pubs and restaurants are done on the quiet morning after a late close, or on a closed day. Hotels are done room-block by room-block so the front desk never loses more inventory than agreed. Retail is done before opening. We fit the site, and the schedule is fixed in advance so your team knows exactly when we are in.',
      },
      {
        step: 'Method chosen for turnaround, not just for result',
        body: 'On commercial work we lean towards low-moisture encapsulation wherever the fabric and soil level allow, because it reopens a room in an hour rather than six. Where soiling genuinely needs extraction — a heavily used banquette, a hotel room after a long stay — we use it and plan the drying time into the slot, with air movers running from the moment the pass is finished.',
      },
      {
        step: 'Sector-specific detail work',
        body: 'Offices: the task chair is the real job — the seat pan, the arm pads and the mesh back, where sebum and hand grease concentrate. Pubs: the piping along banquette edges, which holds beer and food residue, plus odour treatment in the fabric. Hotels: headboards, the chair by the window nobody ever cleans, and the desk stool. Each sector gets a checklist rather than a general pass.',
      },
      {
        step: 'Sign-off and drying confirmation',
        body: 'A named person on your side signs off the item list at the end of the visit. We confirm in writing when each area is safe to reopen, and where we have used air movers we say when they can be removed. For hotels we confirm per room block so housekeeping can turn rooms without waiting on the whole floor.',
      },
    ],
    sections: [
      {
        h2: 'What we clean, by sector',
        table: {
          head: ['Sector', 'Typical items', 'When we work', 'Suggested cycle'],
          rows: [
            ['Offices & co-working', 'Task chairs, breakout sofas, meeting-room seating, acoustic panels', 'Evenings and weekends', '6–12 months'],
            ['Hotels & serviced flats', 'Headboards, bedroom chairs, lobby and lounge seating, corridor runners', 'Room-block by room-block', '6 months, lobby quarterly'],
            ['Pubs & bars', 'Banquettes, booth seating, bar stools, carpet', 'Early morning or closed days', '3–6 months'],
            ['Restaurants & cafés', 'Dining chairs, bench seating, booth upholstery', 'Before service or on a closed day', '3–6 months'],
            ['Venues & function rooms', 'Stacking and banqueting chairs, lounge furniture', 'Between bookings', 'After each major event season'],
            ['Care homes & clinics', 'Waiting-room and day-room seating, wipe-clean vinyl', 'Quiet periods, by arrangement', '3 months or as policy requires'],
          ],
        },
      },
      {
        h2: 'Contract fabrics and why they behave differently',
        paragraphs: [
          'Commercial upholstery is usually specified to a standard rather than chosen for looks alone, and that changes how it cleans. Crib 5 fire-retardant treatments, common on pub and hotel seating, can react badly to strongly alkaline products and lose their rating — so we use a pH-appropriate product and avoid stripping the treatment.',
          'Vinyl and faux leather dominate in food service and healthcare because they wipe down. They tolerate cleaning well but crack if repeatedly cleaned with solvent or harsh alkaline products, and the cracking appears at the seat front where they flex. They need a gentle cleaner and a vinyl conditioner rather than a leather one.',
          'High-Martindale wool blends are common in offices and lounges. They need wool-safe chemistry exactly as domestic wool does, and they are the fabric most often damaged by a cleaning contractor working fast with a general-purpose product.',
        ],
      },
      {
        h2: 'Odour control in pubs and restaurants',
        paragraphs: [
          'Hospitality upholstery accumulates a specific mix: beer that has soaked through banquette piping into the foam, food oils, and in older buildings the residual smell of pre-2007 smoking that resurfaces when fabric gets warm and humid.',
          'Masking it with fragrance is a short-term fix that customers notice. The approach that actually works is removing the source — extraction through the affected panel, enzyme treatment where the residue is organic, and where beer has reached the foam beneath a banquette, accepting that the foam may need replacing rather than promising a clean will solve it.',
          'We will tell you which of those two you are looking at after the survey. It is cheaper for you to know before the refit budget is set than afterwards.',
        ],
      },
      {
        h2: 'Working on your site',
        bullets: [
          'RAMS and COSHH sheets supplied before the first visit, not on request afterwards.',
          'Public liability certificate provided in advance for your records.',
          'Wet-floor signage in place and routes kept clear while we work.',
          'Out-of-hours access arranged through your building management or security.',
          'Named contact on site who signs off the item list at the end of the visit.',
          'Monthly invoicing on account; purchase order references carried on every invoice.',
        ],
      },
    ],
    suitedTo: [
      'Offices needing task chairs and breakout seating cleaned outside working hours',
      'Hotels and serviced apartments working room-block by room-block',
      'Pubs, bars and restaurants needing banquettes done before opening',
      'Managing agents and facilities teams running multi-site schedules',
      'Venues needing seating turned around between bookings',
    ],
    notSuitedTo: [
      'Single-item one-off jobs — a domestic booking is cheaper for you',
      'Sites where furniture has failed and needs reupholstering rather than cleaning',
      'Work requiring specialist access equipment such as scaffold or MEWP',
    ],
    faqs: [
      {
        q: 'Can you work outside our opening hours?',
        a: 'Yes — evenings, overnight and weekends are the majority of our commercial work. Offices are usually done from 18:00 or overnight, pubs early morning after a late close, hotels room-block by room-block, and retail before opening. The slot is agreed at the survey and fixed in the schedule of works so your team knows exactly when we are on site.',
      },
      {
        q: 'How quickly can a room be back in use?',
        a: 'With low-moisture encapsulation, roughly an hour — which is why we default to it on commercial work wherever the soil level allows. Where hot water extraction is genuinely needed, plan on three to six hours with air movers running, and we build that into the slot rather than discovering it on the night. We confirm in writing when each area is safe to reopen.',
      },
      {
        q: 'Do you provide RAMS, COSHH sheets and insurance documents?',
        a: 'Yes, as a pack before the first visit rather than on request afterwards. That covers a risk assessment and method statement for the work, COSHH data sheets for every product used on your site, and our public liability certificate for your records. If your building management has its own contractor approval process, send us the forms and we will complete them ahead of the visit.',
      },
      {
        q: 'How often should commercial seating be cleaned?',
        a: 'It depends on footfall far more than on age. Pub and restaurant seating generally needs it every three to six months, hotel bedroom furniture around every six with lobbies quarterly, and office task chairs every six to twelve. We recommend an interval per item type at the survey, based on what we actually see rather than a blanket figure.',
      },
      {
        q: 'Can you handle multiple sites on one account?',
        a: 'Yes. Multi-site operators are billed monthly on one account with purchase order references carried through on every invoice, and we keep a record of what was cleaned at which site and when. That record is generally what makes the following year’s budgeting straightforward, and it is available to you whenever you want it.',
      },
      {
        q: 'Will cleaning affect the fire-retardant treatment on our seating?',
        a: 'It can, if the wrong chemistry is used — strongly alkaline products can strip a Crib 5 treatment and cost the fabric its rating. We identify treated fabrics at the survey and use pH-appropriate products on them. If seating needs re-treating after cleaning, we will tell you at the survey so it can be planned rather than discovered later.',
      },
    ],
    related: ['carpet-and-sofa-cleaning-london', 'leather-sofa-cleaning-london', 'steam-sofa-cleaning-london'],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
