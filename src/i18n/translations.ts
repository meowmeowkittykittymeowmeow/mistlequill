import {
  BaubleColorId,
  BaubleShapeId,
  BorderElementId,
  DedicationFontId,
  FrameColorId,
  FrameStyleId,
  GarlandColorId,
  GarlandStyleId,
  GiftColorId,
  PaperPatternId,
  SkirtColorId,
  TopperColorId,
  TopperShapeId,
  TreeColorId,
} from '../types/card';

export type Language = 'en' | 'pl';

export interface Translations {
  brand: string;
  docTitle: string;
  nav: {
    inspirations: string;
    studio: string;
    music: string;
    reset: string;
    saveCard: string;
    saving: string;
  };
  hero: {
    kicker1: string;
    kicker2: string;
    kicker3: string;
    title: string;
    presetsLabel: string;
    surpriseMe: string;
  };
  presets: Record<string, { name: string; subtitle: string }>;
  toolbar: {
    playMusic: string;
    pauseMusic: string;
    musicLabel: string;
    snowOn: string;
    snowOff: string;
    snowRich: string;
    snowGentle: string;
    envelopeFull: string;
    envelopeShort: string;
  };
  tracks: Record<string, string>;
  canvas: {
    ariaLabel: string;
    hint: string;
    resetNotice: string;
    exportSuccess: string;
    exportCoffeeCta: string;
    exportError: string;
    downloadFilename: string;
  };
  footer: {
    left: string;
    right: string;
    buyMeACoffee: string;
  };
  steps: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  configurator: {
    back: string;
    next: string;
    savePng: string;
    step1: {
      kicker: string;
      title: string;
      subtitle: string;
      treeColorLabel: string;
      extrasLabel: string;
      candlesTitle: string;
      candlesDesc: string;
      skirtTitle: string;
      skirtDesc: string;
      skirtColorLabel: string;
      giftsTitle: string;
      giftsDesc: string;
      giftColorLabel: string;
    };
    step2: {
      kicker: string;
      title: string;
      subtitle: string;
      slotPrefix: string;
      shapeLabel: string;
      colorLabel: string;
      glitterTitle: string;
      glitterDesc: string;
    };
    step3: {
      kicker: string;
      title: string;
      subtitle: string;
      styleLabel: string;
      colorLabel: string;
    };
    step4: {
      kicker: string;
      title: string;
      subtitle: string;
      shapeLabel: string;
      colorLabel: string;
    };
    step5: {
      kicker: string;
      title: string;
      subtitle: string;
      paperLabel: string;
      frameLabel: string;
      frameColorLabel: string;
      borderLabel: string;
      dedicationLabel: string;
      dedicationPlaceholder: string;
      signatureLabel: string;
      signaturePlaceholder: string;
      fontLabel: string;
      fontShort: Record<DedicationFontId, string>;
    };
  };
  treeColors: Record<TreeColorId, string>;
  baubleShapes: Record<BaubleShapeId, string>;
  baubleColors: Record<BaubleColorId, string>;
  garlandStyles: Record<GarlandStyleId, { label: string; desc: string }>;
  garlandColors: Record<GarlandColorId, string>;
  topperShapes: Record<TopperShapeId, string>;
  topperColors: Record<TopperColorId, string>;
  paperPatterns: Record<PaperPatternId, string>;
  frameStyles: Record<FrameStyleId, { label: string; desc: string }>;
  frameColors: Record<FrameColorId, string>;
  borderElements: Record<BorderElementId, string>;
  skirtColors: Record<SkirtColorId, string>;
  giftColors: Record<GiftColorId, string>;
  sampleDedications: string[];
  defaultSignature: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brand: 'Mistlequill',
    docTitle: 'Mistlequill | Watercolor & Ink Christmas Card Maker',
    nav: {
      inspirations: 'Inspirations',
      studio: 'Studio',
      music: 'Music',
      reset: 'Start Over',
      saveCard: 'Save Card',
      saving: 'Saving...',
    },
    hero: {
      kicker1: 'Winter Collection',
      kicker2: 'Watercolor & Ink',
      kicker3: '1500×2100 px Export',
      title: 'Create your own illustrated Christmas card',
      presetsLabel: 'Curated Studio Presets',
      surpriseMe: 'Surprise Me',
    },
    presets: {
      'karti-gingham': { name: 'Sage & Crimson', subtitle: 'Gingham check · wavy frame' },
      'watercolor-rose': { name: 'Rose & Candles', subtitle: 'Cotton paper · gold shimmer' },
      'candy-medallion': { name: 'Candy Stripes', subtitle: 'Lace medallion · mistletoe' },
      'botanical-winter': { name: 'Botanical Winter', subtitle: 'Diamond lattice · holly wreath' },
      'plum-gold': { name: 'Plum & Gold', subtitle: 'Cotton paper · violet & gold' },
    },
    toolbar: {
      playMusic: 'Music',
      pauseMusic: 'Pause',
      musicLabel: 'Select Christmas melody',
      snowOn: 'Snow: On',
      snowOff: 'Snow: Off',
      snowRich: 'Heavy Snow',
      snowGentle: 'Gentle Flurry',
      envelopeFull: 'Kraft Envelope',
      envelopeShort: 'Envelope',
    },
    tracks: {
      'silent-night': 'Silent Night',
      'jingle-bells': 'Jingle Bells',
      'merry-christmas': 'We Wish You a Merry Christmas',
      'sugar-plum': 'The Nutcracker · Sugar Plum',
    },
    canvas: {
      ariaLabel: 'Preview of your custom illustrated Christmas card',
      hint: 'Move your cursor across the tree to sway the branches and baubles · Click any bauble to swing it',
      resetNotice: 'Restored the studio default design.',
      exportSuccess: 'Your card has been saved as a high-res PNG (1500×2100 px).',
      exportCoffeeCta: 'Enjoyed creating your card? Support the studio with a coffee',
      exportError: 'Could not export the PNG image. Please try again.',
      downloadFilename: 'christmas-card.png',
    },
    footer: {
      left: 'Mistlequill · Illustrated Holiday Stationery Studio',
      right: '5:7 Cotton Paper Ratio · Print-Ready PNG Export',
      buyMeACoffee: 'Buy Me a Coffee',
    },
    steps: {
      1: 'Tree',
      2: 'Baubles',
      3: 'Garlands',
      4: 'Topper',
      5: 'Card',
    },
    configurator: {
      back: 'Back',
      next: 'Next Step',
      savePng: 'Save Card PNG',
      step1: {
        kicker: 'Step 01 · The Evergreen Base',
        title: 'Watercolor tree palette',
        subtitle:
          'Choose the watercolor shade for your pine branches before hanging the ornaments.',
        treeColorLabel: 'Tree Color',
        extrasLabel: 'Illustrated Tree Details',
        candlesTitle: 'Wax Taper Candles',
        candlesDesc: 'Softly flickering candlelight along the branches',
        skirtTitle: 'Scalloped Tree Skirt',
        skirtDesc: 'Blush or seasonal fabric around the base',
        skirtColorLabel: 'Skirt Color',
        giftsTitle: 'Illustrated Gift Boxes',
        giftsDesc: 'Watercolor parcels tied with ribbons underneath',
        giftColorLabel: 'Gift Boxes Palette',
      },
      step2: {
        kicker: 'Step 02 · Set of 3 Bauble Styles',
        title: 'Bauble shapes & colors',
        subtitle:
          'Curate 3 distinct ornament types, and all three will hang together harmoniously on your tree.',
        slotPrefix: 'Type',
        shapeLabel: 'Bauble Shape',
        colorLabel: 'Watercolor Pigment',
        glitterTitle: 'Gold Leaf Shimmer',
        glitterDesc: 'Delicate gold glitter flecks',
      },
      step3: {
        kicker: 'Step 03 · Garlands',
        title: 'Chains & ribbons',
        subtitle:
          'Drape your evergreen branches with delicate beaded strands, silk ribbons, or star garlands.',
        styleLabel: 'Garland Style',
        colorLabel: 'Garland Color',
      },
      step4: {
        kicker: 'Step 04 · Tree Topper',
        title: 'Crown your Christmas tree',
        subtitle:
          'Select an heirloom topper variant, from a flowing watercolor bow to a Bethlehem star or vintage finial.',
        shapeLabel: 'Topper Design',
        colorLabel: 'Topper Color',
      },
      step5: {
        kicker: 'Step 05 · Paper, Frame & Wishes',
        title: 'Card frame & dedication',
        subtitle:
          'Style the outer patterned paper, inner frame, border flourishes, and your personal message inside the frame.',
        paperLabel: 'Card Paper Pattern',
        frameLabel: 'Frame Style',
        frameColorLabel: 'Frame & Ribbon Color',
        borderLabel: 'Border Elements Around Frame',
        dedicationLabel: 'Your Dedication or Holiday Quote (Inside Frame)',
        dedicationPlaceholder: 'Write your heartfelt Christmas wishes...',
        signatureLabel: 'Signature (Optional)',
        signaturePlaceholder: 'e.g. With love, Clara',
        fontLabel: 'Calligraphy Style',
        fontShort: {
          script: 'Calligraphy',
          'editorial-italic': 'Serif Italic',
          handwritten: 'Casual Script',
        },
      },
    },
    treeColors: {
      'classic-pine': 'Classic Pine',
      'sage-mist': 'Sage Mist',
      'frost-spruce': 'Frosted Spruce',
      'golden-cedar': 'Olive Cedar',
      'blush-alabaster': 'Alabaster Frost',
      'twilight-plum': 'Twilight Plum',
    },
    baubleShapes: {
      round: 'Sphere',
      teardrop: 'Teardrop',
      diamond: 'Diamond',
      star: 'Star',
      pinecone: 'Pinecone',
      heart: 'Heart',
    },
    baubleColors: {
      crimson: 'Crimson',
      blush: 'Blush Rose',
      'antique-gold': 'Antique Gold',
      pearl: 'Pearl Ivory',
      burgundy: 'Burgundy',
      sage: 'Sage Green',
      'porcelain-blue': 'Porcelain Blue',
      champagne: 'Champagne',
      plum: 'Plum Violet',
      lavender: 'Lavender',
      emerald: 'Emerald',
      copper: 'Copper Rose',
    },
    garlandStyles: {
      beads: { label: 'Beaded Strand', desc: 'Fine pearl-style beaded garland' },
      ribbon: { label: 'Silk Ribbon', desc: 'Flowing watercolor sash' },
      pearls: { label: 'Heirloom Pearls', desc: 'Luminous vintage pearl drape' },
      stars: { label: 'Starry Chain', desc: 'Sketched golden star garland' },
      none: { label: 'No Garland', desc: 'Clean minimalist branches' },
    },
    garlandColors: {
      gold: 'Gold',
      crimson: 'Crimson',
      blush: 'Blush Pink',
      cream: 'Cream Pearl',
      sage: 'Sage',
      plum: 'Plum Violet',
      lavender: 'Lavender',
      silver: 'Silver Frost',
    },
    topperShapes: {
      'ribbon-bow': 'Flowing Ribbon Bow',
      'bethlehem-star': 'Bethlehem Star',
      'vintage-finial': 'Vintage Spire Finial',
      'angel-crescent': 'Angel Cherub',
      snowflake: 'Crystal Snowflake',
    },
    topperColors: {
      'coral-rose': 'Coral Rose',
      crimson: 'Crimson',
      'antique-gold': 'Antique Gold',
      pearl: 'Alabaster',
      burgundy: 'Burgundy',
      sage: 'Sage',
      plum: 'Plum Violet',
      lavender: 'Lavender',
      champagne: 'Champagne',
    },
    paperPatterns: {
      'sage-gingham': 'Sage Gingham',
      'candy-stripe': 'Crimson Stripes',
      'botanical-diamond': 'Botanical Lattice',
      'cream-laid': 'Cotton Laid Paper',
      'burgundy-linen': 'Burgundy Linen',
      'midnight-toile': 'Winter Midnight',
    },
    frameStyles: {
      'wavy-bows': {
        label: 'Wavy Frame & Bows',
        desc: 'Undulating watercolor-style outline with top & bottom bows',
      },
      'scalloped-oval': {
        label: 'Scalloped Medallion',
        desc: 'Lacy parchment oval with painted dots & bow',
      },
      'double-ink-ribbons': {
        label: 'Double Ink & Ribbons',
        desc: 'Ruled double border with tied corner ribbons',
      },
      'holly-wreath': {
        label: 'Botanical Corners',
        desc: 'Sketched holly sprigs & winter berries',
      },
    },
    frameColors: {
      crimson: 'Crimson Ink',
      forest: 'Forest Green',
      gold: 'Leaf Gold',
      ink: 'Charcoal Ink',
      rose: 'Dusty Rose',
      plum: 'Plum Violet',
    },
    borderElements: {
      'holly-berries': 'Holly & Berries',
      'ink-sparkles': 'Sketched Sparkles',
      'mini-bows': 'Petite Bows',
      snowflakes: 'Snowflakes',
      'pine-sprigs': 'Pine Sprigs',
      none: 'Clean Margin',
    },
    skirtColors: {
      blush: 'Blush Rose',
      'cream-gold': 'Ivory & Gold',
      crimson: 'Crimson',
      sage: 'Sage Green',
      plum: 'Plum Violet',
      lavender: 'Lavender',
    },
    giftColors: {
      'classic-rose': 'Blush & Crimson',
      'gold-ivory': 'Gold & Ivory',
      'plum-lavender': 'Plum & Lavender',
      'sage-gold': 'Sage & Gold',
      'crimson-forest': 'Crimson & Pine',
      'midnight-gold': 'Midnight & Gold',
    },
    sampleDedications: [
      'Wishing you a warm, merry & bright Christmas.',
      'May your holidays sparkle with peace, warmth, and timeless joy.',
      'Warmest wishes for a magical Christmas and a happy New Year.',
      'merry & bright · sending love and festive cheer from afar.',
    ],
    defaultSignature: 'With warmest wishes',
  },

  pl: {
    brand: 'Mistlequill',
    docTitle: 'Mistlequill | Kreator Kartek Świątecznych',
    nav: {
      inspirations: 'Inspiracje',
      studio: 'Kreator',
      music: 'Muzyka',
      reset: 'Od nowa',
      saveCard: 'Zapisz kartkę',
      saving: 'Zapisywanie...',
    },
    hero: {
      kicker1: 'Kolekcja Zimowa',
      kicker2: 'Akwarela i Tusz',
      kicker3: 'Eksport 1500×2100 px',
      title: 'Stwórz własną, ilustrowaną kartkę świąteczną',
      presetsLabel: 'Gotowe kompozycje pracowni',
      surpriseMe: 'Losuj wzór',
    },
    presets: {
      'karti-gingham': { name: 'Szałwia & Karmin', subtitle: 'Kratka gingham · falista ramka' },
      'watercolor-rose': { name: 'Akwarela Róż & Świece', subtitle: 'Papier czerpany · złoty brokat' },
      'candy-medallion': { name: 'Kandyzowane Paski', subtitle: 'Koronkowy medalion · jemioła' },
      'botanical-winter': { name: 'Botaniczna Zima', subtitle: 'Romby · wieniec ostrokrzewu' },
      'plum-gold': { name: 'Śliwka & Złoto', subtitle: 'Papier czerpany · fiolet i złoto' },
    },
    toolbar: {
      playMusic: 'Muzyka',
      pauseMusic: 'Pauza',
      musicLabel: 'Wybierz melodię świąteczną',
      snowOn: 'Śnieg: Wł.',
      snowOff: 'Śnieg: Wył.',
      snowRich: 'Gęsty puch',
      snowGentle: 'Delikatny',
      envelopeFull: 'Koperta kraftowa',
      envelopeShort: 'Koperta',
    },
    tracks: {
      'silent-night': 'Cicha Noc',
      'jingle-bells': 'Dzwonki Sań (Jingle Bells)',
      'merry-christmas': 'We Wish You a Merry Christmas',
      'sugar-plum': 'Dziadek do Orzechów',
    },
    canvas: {
      ariaLabel: 'Podgląd własnoręcznie zaprojektowanej kartki świątecznej',
      hint: 'Przesuń kursor nad choinką, aby poruszyć gałązki i rozkołysać bombki · Kliknij bombkę, by ją musnąć',
      resetNotice: 'Przywrócono bazowy projekt pracowni.',
      exportSuccess: 'Kartka została zapisana jako plik PNG (1500×2100 px).',
      exportCoffeeCta: 'Spodobała Ci się kartka? Postaw wirtualną kawę',
      exportError: 'Nie udało się wygenerować pliku PNG. Spróbuj ponownie.',
      downloadFilename: 'kartka-swiateczna.png',
    },
    footer: {
      left: 'Mistlequill · Pracownia Ilustrowanych Kartek Okolicznościowych',
      right: '5:7 Papier Czerpany · Eksport PNG gotowy do druku i wysyłki',
      buyMeACoffee: 'Postaw kawę (Buy Me a Coffee)',
    },
    steps: {
      1: 'Drzewko',
      2: 'Bombki',
      3: 'Łańcuchy',
      4: 'Szczyt',
      5: 'Kartka',
    },
    configurator: {
      back: 'Wstecz',
      next: 'Następny krok',
      savePng: 'Zapisz kartkę PNG',
      step1: {
        kicker: 'Krok 01 · Baza choinki',
        title: 'Odcień akwarelowego drzewka',
        subtitle:
          'Wybierz paletę akwarelowego igliwia, zanim przystąpisz do wieszania bombek.',
        treeColorLabel: 'Kolor drzewka',
        extrasLabel: 'Detale ilustracyjne na drzewku',
        candlesTitle: 'Świeczki woskowe',
        candlesDesc: 'Migoczące płomyki na gałązkach',
        skirtTitle: 'Falbankowa spódniczka',
        skirtDesc: 'Ozdobna tkanina pod pniem choinki',
        skirtColorLabel: 'Kolor spódniczki',
        giftsTitle: 'Ilustrowane prezenty',
        giftsDesc: 'Paczki ze wstążkami u stóp drzewka',
        giftColorLabel: 'Kolory prezentów',
      },
      step2: {
        kicker: 'Krok 02 · Zestaw 3 rodzajów bombek',
        title: 'Kształty i barwy bombek',
        subtitle:
          'Skomponuj 3 różne rodzaje ozdób, a wszystkie trzy pojawią się równocześnie na choince.',
        slotPrefix: 'Rodzaj',
        shapeLabel: 'Kształt bombki',
        colorLabel: 'Kolor akwarelowy',
        glitterTitle: 'Złote muśnięcie brokatem',
        glitterDesc: 'Delikatne złote drobinki na szkle bombki',
      },
      step3: {
        kicker: 'Krok 03 · Girlandy',
        title: 'Łańcuchy i wstążki',
        subtitle:
          'Opleć gałązki drzewka subtelnym sznurem pereł, koralików albo zwiewną wstążką.',
        styleLabel: 'Rodzaj łańcucha',
        colorLabel: 'Kolor łańcucha',
      },
      step4: {
        kicker: 'Krok 04 · Zwieńczenie drzewka',
        title: 'Ozdoba na szczyt choinki',
        subtitle:
          'Wybierz wzór czubka, od malarskiej kokardy po klasyczną gwiazdę lub szpic vintage.',
        shapeLabel: 'Wariant zwieńczenia',
        colorLabel: 'Kolor ozdoby szczytowej',
      },
      step5: {
        kicker: 'Krok 05 · Oprawa i życzenia',
        title: 'Kartka, ramka i własna dedykacja',
        subtitle:
          'Dobierz papier bazowy, dekoracyjną ramkę, ornamenty dookoła niej oraz osobiste życzenia pod drzewkiem.',
        paperLabel: 'Tło kartki (wzór papieru)',
        frameLabel: 'Rodzaj ramki (Frame)',
        frameColorLabel: 'Kolor linii i kokardek ramki',
        borderLabel: 'Elementy dookoła ramki (na brzegach kartki)',
        dedicationLabel: 'Własna dedykacja lub sentencja (wewnątrz ramki)',
        dedicationPlaceholder: 'Wpisz własne życzenia świąteczne...',
        signatureLabel: 'Podpis (opcjonalny)',
        signaturePlaceholder: 'np. Z miłością, Ania',
        fontLabel: 'Krój kaligrafii',
        fontShort: {
          script: 'Kaligrafia',
          'editorial-italic': 'Kursywa',
          handwritten: 'Odręczny',
        },
      },
    },
    treeColors: {
      'classic-pine': 'Klasyczna Jodła',
      'sage-mist': 'Szałwiowa Sosna',
      'frost-spruce': 'Mroźny Świerk',
      'golden-cedar': 'Oliwkowy Cedr',
      'blush-alabaster': 'Alabastrowy Szron',
      'twilight-plum': 'Śliwkowy Zmierzch',
    },
    baubleShapes: {
      round: 'Kula',
      teardrop: 'Kropla',
      diamond: 'Diament',
      star: 'Gwiazdka',
      pinecone: 'Szyszka',
      heart: 'Serce',
    },
    baubleColors: {
      crimson: 'Szkarłat',
      blush: 'Pudrowy Róż',
      'antique-gold': 'Antyczne Złoto',
      pearl: 'Perłowa Biel',
      burgundy: 'Burgund',
      sage: 'Szałwia',
      'porcelain-blue': 'Porcelanowy Błękit',
      champagne: 'Szampan',
      plum: 'Śliwkowy Fiolet',
      lavender: 'Lawenda',
      emerald: 'Szmaragd',
      copper: 'Miedź',
    },
    garlandStyles: {
      beads: { label: 'Koraliki', desc: 'Drobny łańcuch z perełek' },
      ribbon: { label: 'Wstążka', desc: 'Zwiewna akwarelowa szarfa' },
      pearls: { label: 'Perły & Kryształki', desc: 'Szlachetne zawieszki' },
      stars: { label: 'Łańcuch Gwiazdek', desc: 'Rysunkowy sznur gwiazd' },
      none: { label: 'Bez łańcucha', desc: 'Minimalistyczna gałąź' },
    },
    garlandColors: {
      gold: 'Złoto',
      crimson: 'Karmin',
      blush: 'Pudrowy Róż',
      cream: 'Kremowa Perła',
      sage: 'Szałwia',
      plum: 'Śliwkowy Fiolet',
      lavender: 'Lawenda',
      silver: 'Srebro',
    },
    topperShapes: {
      'ribbon-bow': 'Wielka Kokarda',
      'bethlehem-star': 'Gwiazda Betlejemska',
      'vintage-finial': 'Szpic Vintage',
      'angel-crescent': 'Anielskie Skrzydła',
      snowflake: 'Śnieżynka Kryształ',
    },
    topperColors: {
      'coral-rose': 'Koralowy Róż',
      crimson: 'Karmin',
      'antique-gold': 'Antyczne Złoto',
      pearl: 'Alabaster',
      burgundy: 'Burgund',
      sage: 'Szałwia',
      plum: 'Śliwkowy Fiolet',
      lavender: 'Lawenda',
      champagne: 'Szampan',
    },
    paperPatterns: {
      'sage-gingham': 'Szałwiowa Kratka',
      'candy-stripe': 'Karminowe Paski',
      'botanical-diamond': 'Botaniczne Romby',
      'cream-laid': 'Papier Czerpany',
      'burgundy-linen': 'Bordowy Len',
      'midnight-toile': 'Zimowa Noc',
    },
    frameStyles: {
      'wavy-bows': {
        label: 'Falista z Kokardkami',
        desc: 'Akwarelowa fala z dwiema kokardami',
      },
      'scalloped-oval': {
        label: 'Koronkowy Medalion',
        desc: 'Ząbkowany owal z kropkami i kokardą u góry',
      },
      'double-ink-ribbons': {
        label: 'Podwójny Tusz i Wstążki',
        desc: 'Podwójna ramka ze wstążeczkami w rogach',
      },
      'holly-wreath': {
        label: 'Botaniczny Wieniec',
        desc: 'Rysunkowy łuk z gałązek i jemioły',
      },
    },
    frameColors: {
      crimson: 'Karminowy Tusz',
      forest: 'Leśna Zieleń',
      gold: 'Złoto Płatkowe',
      ink: 'Atrament',
      rose: 'Różany',
      plum: 'Śliwkowy Fiolet',
    },
    borderElements: {
      'holly-berries': 'Ostrokrzew i Jagody',
      'ink-sparkles': 'Rysunkowe Iskierki',
      'mini-bows': 'Drobne Kokardki',
      snowflakes: 'Płatki Śniegu',
      'pine-sprigs': 'Gałązki Sosny',
      none: 'Czysta Obramówka',
    },
    skirtColors: {
      blush: 'Pudrowy Róż',
      'cream-gold': 'Krem & Złoto',
      crimson: 'Karmin',
      sage: 'Szałwia',
      plum: 'Śliwkowy Fiolet',
      lavender: 'Lawenda',
    },
    giftColors: {
      'classic-rose': 'Róż & Karmin',
      'gold-ivory': 'Złoto & Krem',
      'plum-lavender': 'Fiolet & Lawenda',
      'sage-gold': 'Szałwia & Złoto',
      'crimson-forest': 'Karmin & Jodła',
      'midnight-gold': 'Granat & Złoto',
    },
    sampleDedications: [
      'Wesołych Świąt pełnych ciepła, światła i bliskich serc.',
      'Niech te Święta przyniosą spokój, zachwyt i najpiękniejsze wspomnienia.',
      'Magicznych Świąt Bożego Narodzenia oraz pomyślności w Nowym Roku.',
      'merry & bright · najcieplejsze życzenia prosto z serca.',
    ],
    defaultSignature: 'Z najcieplejszymi życzeniami',
  },
};
