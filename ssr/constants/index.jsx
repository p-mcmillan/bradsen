export const listing_celedonia = Object.values(
  import.meta.glob('../assets/images/listings/*.jpg', {
    eager: true,
    import: 'default',
  })
);

export const backgroundImages = {
  footer: import.meta.glob('../assets/images/footer.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/footer.webp'],

  aboutUs: import.meta.glob('../assets/images/about-us_hero.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/about-us_hero.webp'],

  faq: import.meta.glob('../assets/images/faq_hero.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/faq_hero.webp'],

  listings: import.meta.glob('../assets/images/listings_hero.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/listings_hero.webp'],

  landing01: import.meta.glob('../assets/images/landing_hero-01.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/landing_hero-01.webp'],

  landing02: import.meta.glob('../assets/images/landing_hero-02.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/landing_hero-02.webp'],

  wmLogo: import.meta.glob('../assets/logos/westmar-logo-full-colour.jpg', {
    eager: true,
    import: 'default',
  })['../assets/logos/westmar-logo-full-colour.jpg'],
};

export const images = import.meta.glob(
  '../assets/images/listings/webp-optimized/*.webp',
  {
    eager: true,
    import: 'default',
  }
);

const allListingImages = Object.entries(images).map(([path, src]) => {
  const name = path.split('/').pop(); // e.g. "celedonia_1.jpg"
  return { name, src };
});

// Filter images for 1777 Caledonia
const caledoniaImages = allListingImages
  .filter((img) => img.name.startsWith('celedonia'))
  .sort((a, b) => a.name.localeCompare(b.name)); // Sort by file name

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
    to: '/',
  },
  {
    id: 'about-me',
    title: 'About Me',
    to: '/about-me',
  },
  {
    id: 'listings',
    title: 'Listings',
    to: '/listings',
  },
  // {
  //   id: "blog",
  //   title: "Blog",
  //   to: "/blog",
  // },
  {
    id: 'FAQ',
    title: 'FAQ',
    to: '/faq',
  },
  {
    id: 'contact',
    title: 'Contact',
    to: '/contact-me',
  },
];

export const aboutUsImages = {
  hero: import.meta.glob('../assets/images/hero-house.jpg', {
    eager: true,
    import: 'default',
  })['../assets/images/hero-house.jpg'],
  investment: import.meta.glob('../assets/images/sunlit_dining_room.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/sunlit_dining_room.webp'],

  modernCondo: import.meta.glob('../assets/images/modern_condo.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/modern_condo.webp'],

  classicHome: import.meta.glob('../assets/images/classic_home.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/classic_home.webp'],

  aboutUs: import.meta.glob('../assets/images/about-us.jpg', {
    eager: true,
    import: 'default',
  })['../assets/images/about-us.jpg'],
};

export const agentInfo = {
  id: 'b4871e51-b486-421c-8b64-4f667bf5fc59',
  agentImage: import.meta.glob('../assets/images/tyler_bradsen.webp', {
    eager: true,
    import: 'default',
  })['../assets/images/tyler_bradsen.webp'],
  name: 'Tyler Bradsen',
  title: 'REALTOR ®',
  bio: 'As a dedicated and results-driven real estate professional, I bring a strong commitment to client satisfaction and a deep knowledge of the local market. With a background in real estate sales and a passion for helping people find the perfect home or investment, I offer personalized guidance and strategic insight through every step of the buying or selling process. My approach combines integrity, clear communication, and a keen eye for detail to ensure smooth transactions and lasting relationships. Whether you’re a first-time homebuyer, seasoned investor, or looking to sell your property, I’m here to make the experience seamless and rewarding. I stay up to date on market trends and leverage the latest technology and marketing strategies to maximize results. My goal is not just to close deals, but to be a trusted advisor and advocate for your real estate goals. Let’s work together to turn your vision into reality.',
  phoneLink: '+1-778-989-8442',
  phone: '778 989 8442',
  email: 'tylerbradsen@gmail.com',
  website: 'https://tylerbradsen.com/',
  brokerage: {
    name: 'Macdonald Realty Westmar',
    logo: 'https://westmar.ca/_media/custom/Vector-color.svg',
    website: 'https://westmar.ca/',
    address: {
      street: '203 - 5188 Westminster Hwy',
      city: 'Richmond',
      province: 'BC',
      postalCode: 'V7C 5S7',
      country: 'Canada',
    },
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/example',
    instagram: 'https://www.instagram.com/example',
    twitter: 'https://twitter.com/example',
    linkedin: 'https://www.linkedin.com/in/tyler-bradsen-287021362/',
    youtube: 'https://www.youtube.com/channel/example',
  },
};

export const listings = [
  {
    id: 'e8be09f9-d831-4744-8478-9b1c5108783f',
    title: '1777 Caledonia Avenue',
    address: {
      street: '1777 Caledonia Avenue',
      city: 'North Vancouver',
      province: 'BC',
      postalCode: 'V7G 1A1',
      country: 'Canada',
      coordinates: {
        latitude: 49.3194,
        longitude: -122.9499,
      },
    },
    features: {
      style: 'Split Level',
      type: 'Single Family Home',
      exteriorFinish: 'Wood',
      roofType: 'Asphalt Shingle',
      foundation: 'Concrete',
      flooring: 'Hardwood / Tile / Carpet',
      fireplace: 'Gas',
      appliancesIncluded: [
        'Refrigerator',
        'Stove',
        'Dishwasher',
        'Washer/Dryer',
      ],
      beds: 5,
      baths: 3,
      kitchens: 2,
      garages: 2,
      suites: 1,
      area: '2,141',
      garageSpace: '413',
      lotSize: '6,581',
      yearBuilt: 1985,
      heating: 'Forced Air / Baseboard',
      cookingFuel: 'Electric',
    },

    zoning: 'RS4',
    frontage: '51’',
    taxes: '$7,900.47 (2024)',
    ownership: 'Freehold',
    elementarySchool: 'Cove Cliff',
    secondarySchool: 'Seycove',
    walkScore: 67,
    bikeScore: 46,
    amenitiesNearby: 'Everything!',
    price: 1925000,
    image: images,
    description: `
      Unlock the life you've been dreaming of: Parks, Privacy & Potential.
      This 5-bedroom, 3-bathroom home brims with endless possibilities. Imagine a multi-generational home or the freedom of rental income—your lifestyle, your rules.

      With a 2-car garage and spacious 6,581 sq.ft. lot, this property offers room for everything. Just a few minutes from Deep Cove’s beaches, cafés, and scenic trails.

      This isn’t just a home—it’s a canvas for your imagination. Shape it into your masterpiece!

      What are you waiting for? Don’t just live—thrive!
    `,
    squareFootBreakdown: {
      mainLevel: '1,217 sq.ft.',
      lowerLevel: '924 sq.ft.',
      totalInterior: '2,141 sq.ft.',
      deck: '162 sq.ft.',
      porch: '48 sq.ft.',
      garage: '413 sq.ft.',
      patio: '96 sq.ft.',
      totalExterior: '719 sq.ft.',
    },
  },
];
