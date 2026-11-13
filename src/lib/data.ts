
export const business = {
  name: "LOBO Junk Removal",
  shortName: "LOBO",
  tagline: "Let Us Handle the Junk!",
  founder: "Rafael Villalobos",
  phone: "(707) 472-9902",
  phoneHref: "tel:+17074729902",
  email: "Plata.rafav@gmail.com",
  emailHref: "mailto:Plata.rafav@gmail.com",
  region: "Napa Valley & the North Bay",
  trailerModel: "HD814",
  trailerLabel: "Dumpster Trailer Rentals (HD814 Model)",
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Dumpster Rentals", href: "/dumpster-rentals" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
] as const;

export const tickerWords = [
  "Junk Removal",
  "Property Cleanup",
  "Material Hauling",
  "Gutter Cleanup",
  "Leaf Removal",
  "Brush Removal",
  "Light Demolition",
  "HD814 Dump Trailer Rental",
] as const;

/* ---------------------------------------------------------------------------
 * Media — every shot is junk-removal specific
 * ------------------------------------------------------------------------- */

export const media = {
  heroTruck:
    "/hero-truck.jpg",
  heroCrew:
    "/hero-crew.jpg",
  aboutCrew:
    "/about-crew.jpg",
  areasVineyard:
    "/area-vy.jpg",
  areasAutumn:
    "/area-aut.jpg",
  trailer:
    "/trailer.jpeg",
  dumpsterSite:
    "/dumper.jpg",
  leafBlower:
    "/leaf.jpg",
  clutterStreet:
    "/street.jpg",
  crewHauling:
    "/crewhauling.jpg",

  // Page heroes
  servicesHero:
    "/service.jpg",
  areasHero:
    "/areas.jpg",
  trailerHero:
    "/trailer-h.jpg",
  contactHero:
    "/cont.jpg",
} as const;

/* ---------------------------------------------------------------------------
 * Services
 * ------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  tags: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "junk-removal",
    code: "S-01",
    title: "Junk Removal",
    tagline: "Point at it. We take it.",
    body: "Furniture, appliances, hot tubs, sheds, old mattresses, broken electronics — whatever is taking up space gets loaded and hauled away the same day. One price, one crew, no donation receipts to chase.",
    bullets: [
      "Furniture, mattresses, box springs, and couches",
      "Appliances, washers, dryers, and refrigerators",
      "Hot tubs, sheds, play equipment, and fences",
      "Scrap metal, cardboard, and yard clutter",
    ],
    tags: ["Same-day", "By the load", "Free quote"],
    image:
      "https://images.pexels.com/photos/20706506/pexels-photo-20706506.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Movers loading boxes into a truck on a sunny day",
  },
  {
    slug: "property-cleanup",
    code: "S-02",
    title: "Property Cleanup",
    tagline: "Hand the property back ready.",
    body: "Whole-home cleanouts, garage resets, foreclosure and estate turnovers, and rental move-outs. We clear the space, sweep the floors, and leave the property ready to list, rent, or close.",
    bullets: [
      "Estate cleanouts and inheritance clearouts",
      "Foreclosure, vacancy, and REO turnovers",
      "Garage, attic, basement, and storage resets",
      "Move-out cleanups before a key turnover",
    ],
    tags: ["Residential", "Commercial", "Same-day"],
    image:
      "https://images.pexels.com/photos/11382360/pexels-photo-11382360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Overstuffed garage workshop before a property cleanup",
  },
  {
    slug: "material-hauling",
    code: "S-03",
    title: "Material Hauling",
    tagline: "Heavy loads. Tight budgets.",
    body: "Soil, gravel, lumber, roofing, tile, and demolition debris moved off your property with our dump trailer. Material goes where it needs to go — and we leave the site clean behind us.",
    bullets: [
      "Dump trailer and truck loads for sale",
      "Soil, gravel, mulch, and landscaping material",
      "Lumber, drywall, roofing, and tile debris",
      "Site delivery for contractors and landscapers",
    ],
    tags: ["HD814 trailer", "Delivery", "By the day"],
    image:
      "https://images.pexels.com/photos/15370207/pexels-photo-15370207.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Dump truck loaded with materials parked beside a building",
  },
  {
    slug: "gutter-cleanout",
    code: "S-04",
    title: "Gutter Cleanup",
    tagline: "Let the water go somewhere else.",
    body: "Napa hillsides collect leaves fast. We pull the debris out of the gutters, flush the downspouts, and check the hangers so overflow stops tearing down your fascia and foundation.",
    bullets: [
      "Downspouts flushed and cleared end to end",
      "Gutter guards removed, cleaned, and refitted",
      "Sagging sections re-hung and re-pitched",
      "Ground cleanup of everything that fell",
    ],
    tags: ["Hillside ready", "Flushing", "Annual or one-off"],
    image:
      "https://images.pexels.com/photos/38524253/pexels-photo-38524253.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Worker on a residential roof clearing debris from a gutter line",
  },
  {
    slug: "landscaping-leaf-removal",
    code: "S-05",
    title: "Landscaping & Leaf Removal",
    tagline: "Autumn cleanup, done properly.",
    body: "Leaf piles, downed limbs, storm debris, and overgrown beds. We mow, rake, bag, haul, and clear the beds so your property looks handled — not just tidied.",
    bullets: [
      "Full leaf removal from lawns, beds, and hardscape",
      "Storm debris and downed limb pickup",
      "Overgrown bed cutting and hedge clearing",
      "Bags filled, hauled, and disposed of legally",
    ],
    tags: ["Leaf piles", "Storm cleanup", "Hauled away"],
    image:
      "https://images.pexels.com/photos/40886612/pexels-photo-40886612.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Worker in protective gear clearing fallen leaves with a leaf blower",
  },
  {
    slug: "brush-removal",
    code: "S-06",
    title: "Brush Removal",
    tagline: "Clear the land back out.",
    body: "Dry brush, dead trees, blackberry brambles, and deadfall on hillside lots. Cut, chipped, and hauled — including the awkward stuff that sits between the house and the fence line.",
    bullets: [
      "Dry brush, chaparral, and deadfall clearing",
      "Blackberry, poison oak, and invasive growth",
      "Tree limb removal and chipping on request",
      "Hillside and creek-adjacent lot access",
    ],
    tags: ["Chip on request", "Hillside lots", "Hauled"],
    image:
      "https://images.pexels.com/photos/28934929/pexels-photo-28934929.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Dump truck carrying cut branches away from a property",
  },
  {
    slug: "light-demolition",
    code: "S-07",
    title: "Light Demolition",
    tagline: "Tear it out. Skip the mess.",
    body: "Decks, fences, sheds, drywalls, flooring, cabinets, and small outbuildings. We demo the load-bearing part only, then haul every piece of it off your property.",
    bullets: [
      "Deck, fence, and shed teardown",
      "Interior gutting, drywall, and flooring removal",
      "Cabinet and counter removal",
      "Site swept and debris hauled",
    ],
    tags: ["Residential", "Commercial", "Haul included"],
    image:
      "https://images.pexels.com/photos/5125783/pexels-photo-5125783.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Excavator moving demolition debris on a residential site",
  },
  {
    slug: "dumpster-trailer-rentals",
    code: "S-08",
    title: "Dumpster Trailer Rentals",
    tagline: "HD814 — rent us by the day.",
    body: "Our HD814 dump trailer goes out on your schedule. Load it with roofing, soil, green waste, or remodel debris and take it to the transfer station yourself — or let us handle the round trip.",
    bullets: [
      "HD814 tandem-axle dump trailer",
      "Hydraulic lift bed with rear ramp access",
      "Delivered to your driveway and dropped",
      "Rent by the day — with or without haul service",
    ],
    tags: ["HD814", "Rent by the day", "Delivery"],
    image:
      "https://images.pexels.com/photos/10304035/pexels-photo-10304035.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Dump trailer parked on a roadside ready for rental",
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
) as Record<string, Service>;

/* ---------------------------------------------------------------------------
 * Why choose LOBO — straight from the business card
 * ------------------------------------------------------------------------- */

export const promises = [
  {
    title: "Quick & Efficient Service",
    body: "Same-day crews and a tight route plan. We are not here to look at your junk — we are here to remove it and get to the next job.",
  },
  {
    title: "Affordable Pricing",
    body: "A firm price before the truck rolls. Volume pricing for property managers, estates, and full cleanouts.",
  },
  {
    title: "Eco-Friendly Disposal",
    body: "Donations to charity, recycling and scrap recovery when it can be used again, and licensed disposal for everything else.",
  },
  {
    title: "Residential & Commercial",
    body: "Homes, rentals, and storefronts. One crew for the couch in the living room and the ten-ton pile behind the shop.",
  },
  {
    title: "Same-Day Service",
    body: "Call before noon and we can usually clear it the same day. Urgent cleanouts get moved to the front of the route.",
  },
  {
    title: "We Sweep Up",
    body: "Loading is only half the job. We pull the debris off the floor, sweep the area, and leave the space ready to use.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * How the work happens
 * ------------------------------------------------------------------------- */

export const processSteps = [
  {
    step: "01",
    title: "Send Photos",
    body: "Text or email a few photos and the address. A photo of the pile from across the room is enough for a firm price.",
  },
  {
    step: "02",
    title: "Get a Firm Price",
    body: "You get a flat quote for the load before we arrive. No hourly surprises, no weight tickets you did not ask for.",
  },
  {
    step: "03",
    title: "We Load & Haul",
    body: "Our crew arrives, breaks down what is safe to break down, loads it, and sweeps the space when the last item is gone.",
  },
  {
    step: "04",
    title: "Sort & Dispose Right",
    body: "Donations go to charity, recyclables and scrap get recovered, and the rest goes to a licensed facility. You get the receipt.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * Dumpster trailer — HD814
 * ------------------------------------------------------------------------- */

export const trailerFeatures = [
  {
    title: "Tandem-axle dump trailer",
    body: "Built for heavy yard waste, roofing, and remodel debris. Set it on your driveway and load it at your own pace.",
  },
  {
    title: "Hydraulic lift bed",
    body: "The bed lifts and dumps on site. No ramps, no skid steer, no wrestling a full trailer up a steep driveway.",
  },
  {
    title: "Ramp access",
    body: "Walk-behind mowers, wheelbarrows, and hand trucks roll straight in. Nothing gets dragged up the tailgate.",
  },
  {
    title: "Delivered to your driveway",
    body: "We drop it, hand you the key, and pick it up when the rental ends. Delivery is included in the day rate.",
  },
] as const;

export const trailerUses = [
  "Roof tear-off debris",
  "Green waste and leaf loads",
  "Soil, gravel, and hardscape",
  "Kitchen and bath remodel",
  "Estate and move-out clearouts",
  "Fence and deck demolition",
] as const;

/* ---------------------------------------------------------------------------
 * Service areas
 * ------------------------------------------------------------------------- */

export const serviceAreas = [
  {
    region: "Napa Valley",
    note: "Our home turf. Same-day service, lowest rates, no trip charge.",
    cities: [
      "Napa",
      "Yountville",
      "Oakville",
      "Rutherford",
      "St. Helena",
      "Calistoga",
      "Glen Ellen",
      "American Canyon",
    ],
  },
  {
    region: "Sonoma County",
    note: "Vineyard properties, ranch parcels, and suburban rentals handled daily.",
    cities: [
      "Sonoma",
      "Santa Rosa",
      "Petaluma",
      "Rohnert Park",
      "Sebastopol",
      "Windsor",
      "Healdsburg",
      "Cotati",
      "Sonoma Valley",
    ],
  },
  {
    region: "Solano & East Bay",
    note: "Flat-out cleanups, material hauling, and light demolition.",
    cities: [
      "Vallejo",
      "Benicia",
      "Fairfield",
      "Vacaville",
      "Suisun City",
      "Martinez",
      "Concord",
      "Richmond",
    ],
  },
  {
    region: "Marin & North Bay",
    note: "Estate cleanouts, brush removal, and hillside lot clearing.",
    cities: ["Novato", "San Rafael", "San Anselmo", "Mill Valley", "Tiburon", "Fairfax", "San Pablo"],
  },
] as const;

/* ---------------------------------------------------------------------------
 * Testimonials
 * ------------------------------------------------------------------------- */

export const testimonials = [
  {
    name: "Maria Castellanos",
    role: "Homeowner",
    project: "Estate cleanout — St. Helena",
    image:
      "https://images.pexels.com/photos/35968859/pexels-photo-35968859.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Maria Castellanos",
    stars: 5,
    body: "We had thirty years of my father's things in that house and no idea where to start. Rafael sent a price the same afternoon and had it empty before the weekend. The crew was respectful, and the floor was swept when they left.",
  },
  {
    name: "Derek Osei",
    role: "Property Manager",
    project: "12 units — Napa",
    image:
      "https://images.pexels.com/photos/5334146/pexels-photo-5334146.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Derek Osei",
    stars: 5,
    body: "I run turnover dates tight. LOBO has never missed one — they show up, they clear it, they send me the photos and the receipt the same day. That is worth more to me than the price.",
  },
  {
    name: "Alana Whitfield",
    role: "Estate Manager",
    project: "Vacation rental group — Sonoma",
    image:
      "https://images.pexels.com/photos/7048506/pexels-photo-7048506.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Alana Whitfield",
    stars: 5,
    body: "We needed the HD814 trailer for a week of yard work. It was delivered on time, dropped right where we needed it, and hauled away when we were done. Simple equipment and no runaround.",
  },
  {
    name: "Ben Ortiz",
    role: "General Contractor",
    project: "Deck demolition — Vallejo",
    image:
      "https://images.pexels.com/photos/6137038/pexels-photo-6137038.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Ben Ortiz",
    stars: 5,
    body: "I have used a lot of demo crews. These guys pull the material clean, protect the house, and have the site swept before they load. They are now the only crew I call for material hauling.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * FAQs
 * ------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How much does junk removal cost?",
    a: "Most single loads land between $150 and $450 depending on volume, stairs, and how far the junk sits from the truck. Heavy material and dense debris are priced per yard. Send photos and you will get a firm number before we arrive — no hourly billing surprises.",
  },
  {
    q: "How fast can you come out?",
    a: "Call before noon on a weekday and we can usually clear it the same day. We run the route tight across Napa, Sonoma, and Solano, so most jobs land inside a 24-hour window.",
  },
  {
    q: "What will you take?",
    a: "Furniture, appliances, mattresses, electronics, scrap metal, yard waste, construction debris, hot tubs, sheds, and dead vehicles. We do not take hazardous materials — paint, solvents, asbestos, propane tanks, or chemicals. Those need a licensed disposal facility, and we will point you to one.",
  },
  {
    q: "Do you donate or recycle anything?",
    a: "Yes. Usable furniture and household goods go to donation centers, metal and cardboard get recycled, and everything else goes to a licensed facility. You get a receipt or donation receipt for your records.",
  },
  {
    q: "Do you offer dumpster trailer rentals?",
    a: "We rent our HD814 dump trailer by the day. It is delivered to your driveway, you load it at your own pace, and we pick it up when the rental ends. Add haul service and we will take it to the transfer station for you.",
  },
  {
    q: "Do you clean out estates and foreclosure properties?",
    a: "That is a large part of what we do. Estate cleanouts, vacancy turnovers, and foreclosure cleanouts are quoted as a whole property, including the sweep and the hauling.",
  },
  {
    q: "How is the price calculated on a large job?",
    a: "Large jobs are priced by volume — cubic yards of debris or by the load — based on the photos you send. Property managers and repeat customers get volume pricing. You still get one firm number before the work starts.",
  },
  {
    q: "Are you insured?",
    a: "Yes, we carry general liability coverage for property damage and work on your site. Certificates are available on request before the job.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * Contact
 * ------------------------------------------------------------------------- */

export const contactChannels = [
  {
    label: "Phone",
    value: business.phone,
    href: business.phoneHref,
    note: "Fastest way to reach us",
  },
  {
    label: "Email",
    value: business.email,
    href: business.emailHref,
    note: "Send photos for a firm quote",
  },
  {
    label: "Service Area",
    value: business.region,
    href: "/service-areas",
    note: "Napa, Sonoma & Solano",
  },
] as const;

export const jobTypes = [
  "Junk Removal",
  "Property Cleanup",
  "Material Hauling",
  "Gutter Cleanup",
  "Landscaping & Leaf Removal",
  "Brush Removal",
  "Light Demolition",
  "Dumpster Trailer Rental",
  "Something else",
] as const;

export const pickupWindows = [
  "As soon as possible",
  "Today",
  "Tomorrow",
  "This week",
  "Just planning ahead",
] as const;
