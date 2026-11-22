export type TreeColorId =
  | 'classic-pine'
  | 'sage-mist'
  | 'frost-spruce'
  | 'golden-cedar'
  | 'blush-alabaster';

export type BaubleShapeId =
  | 'round'
  | 'teardrop'
  | 'diamond'
  | 'star'
  | 'pinecone'
  | 'heart';

export type BaubleColorId =
  | 'crimson'
  | 'blush'
  | 'antique-gold'
  | 'pearl'
  | 'burgundy'
  | 'sage'
  | 'porcelain-blue'
  | 'champagne';

export type GarlandStyleId = 'beads' | 'ribbon' | 'pearls' | 'stars' | 'none';
export type GarlandColorId = 'gold' | 'crimson' | 'blush' | 'cream' | 'sage';

export type TopperShapeId =
  | 'ribbon-bow'
  | 'bethlehem-star'
  | 'vintage-finial'
  | 'angel-crescent'
  | 'snowflake';

export type TopperColorId =
  | 'coral-rose'
  | 'crimson'
  | 'antique-gold'
  | 'pearl'
  | 'burgundy'
  | 'sage';

export type PaperPatternId =
  | 'sage-gingham'
  | 'candy-stripe'
  | 'botanical-diamond'
  | 'cream-laid'
  | 'burgundy-linen'
  | 'midnight-toile';

export type FrameStyleId =
  | 'wavy-bows'
  | 'scalloped-oval'
  | 'double-ink-ribbons'
  | 'holly-wreath';

export type FrameColorId = 'crimson' | 'forest' | 'gold' | 'ink' | 'rose';

export type BorderElementId =
  | 'holly-berries'
  | 'ink-sparkles'
  | 'mini-bows'
  | 'snowflakes'
  | 'pine-sprigs'
  | 'none';

export type DedicationFontId = 'script' | 'editorial-italic' | 'handwritten';

export interface BaubleSlot {
  shape: BaubleShapeId;
  color: BaubleColorId;
  glitter: boolean;
}

export interface TreeExtras {
  candles: boolean;
  skirt: boolean;
  gifts: boolean;
}

export interface CardConfig {
  treeColor: TreeColorId;
  treeExtras: TreeExtras;
  baubles: [BaubleSlot, BaubleSlot, BaubleSlot];
  garlandStyle: GarlandStyleId;
  garlandColor: GarlandColorId;
  topperShape: TopperShapeId;
  topperColor: TopperColorId;
  paperPattern: PaperPatternId;
  frameStyle: FrameStyleId;
  frameColor: FrameColorId;
  borderElement: BorderElementId;
  dedication: string;
  signature: string;
  dedicationFont: DedicationFontId;
  showKraftEnvelope: boolean;
}

export interface ColorOption<T extends string = string> {
  id: T;
  label: string;
  base: string;
  light: string;
  dark: string;
}

export const TREE_COLORS: ColorOption<TreeColorId>[] = [
  {
    id: 'classic-pine',
    label: 'Klasyczna Jodła',
    base: '#3E6245',
    light: '#6D9268',
    dark: '#233B29',
  },
  {
    id: 'sage-mist',
    label: 'Szałwiowa Sosna',
    base: '#6C846E',
    light: '#98AE96',
    dark: '#415544',
  },
  {
    id: 'frost-spruce',
    label: 'Mroźny Świerk',
    base: '#5E7E85',
    light: '#93B2B8',
    dark: '#334B52',
  },
  {
    id: 'golden-cedar',
    label: 'Oliwkowy Cedr',
    base: '#6E7A48',
    light: '#9AA66E',
    dark: '#424B27',
  },
  {
    id: 'blush-alabaster',
    label: 'Alabastrowy Szron',
    base: '#C9B9B5',
    light: '#ECE4E1',
    dark: '#8C7A75',
  },
];

export const BAUBLE_SHAPES: { id: BaubleShapeId; label: string }[] = [
  { id: 'round', label: 'Kula' },
  { id: 'teardrop', label: 'Kropla' },
  { id: 'diamond', label: 'Diament' },
  { id: 'star', label: 'Gwiazdka' },
  { id: 'pinecone', label: 'Szyszka' },
  { id: 'heart', label: 'Serce' },
];

export const BAUBLE_COLORS: ColorOption<BaubleColorId>[] = [
  {
    id: 'crimson',
    label: 'Szkarłat',
    base: '#B32833',
    light: '#DE6B72',
    dark: '#6D1119',
  },
  {
    id: 'blush',
    label: 'Pudrowy Róż',
    base: '#DF9EA3',
    light: '#F7D8DA',
    dark: '#AA5E66',
  },
  {
    id: 'antique-gold',
    label: 'Antyczne Złoto',
    base: '#C9A255',
    light: '#EED69B',
    dark: '#876524',
  },
  {
    id: 'pearl',
    label: 'Perłowa Biel',
    base: '#EFEBE2',
    light: '#FFFFFF',
    dark: '#B8B0A0',
  },
  {
    id: 'burgundy',
    label: 'Burgund',
    base: '#761E2B',
    light: '#AB4B57',
    dark: '#450D16',
  },
  {
    id: 'sage',
    label: 'Szałwia',
    base: '#7A927D',
    light: '#B1C4B3',
    dark: '#475C4A',
  },
  {
    id: 'porcelain-blue',
    label: 'Porcelanowy Błękit',
    base: '#7A97AC',
    light: '#BACEDB',
    dark: '#435F73',
  },
  {
    id: 'champagne',
    label: 'Szampan',
    base: '#DEC5A6',
    light: '#F6EADF',
    dark: '#A48562',
  },
];

export const GARLAND_STYLES: { id: GarlandStyleId; label: string; desc: string }[] = [
  { id: 'beads', label: 'Koraliki', desc: 'Drobny łańcuch z perełek' },
  { id: 'ribbon', label: 'Wstążka', desc: 'Zwiewna akwarelowa szarfa' },
  { id: 'pearls', label: 'Perły & Kryształki', desc: 'Szlachetne zawieszki' },
  { id: 'stars', label: 'Łańcuch Gwiazdek', desc: 'Rysunkowy sznur gwiazd' },
  { id: 'none', label: 'Bez łańcucha', desc: 'Minimalistyczna gałąź' },
];

export const GARLAND_COLORS: ColorOption<GarlandColorId>[] = [
  { id: 'gold', label: 'Złoto', base: '#C8A04E', light: '#EAD196', dark: '#8A6721' },
  { id: 'crimson', label: 'Karmin', base: '#A6242E', light: '#D45B64', dark: '#661118' },
  { id: 'blush', label: 'Pudrowy Róż', base: '#DC959B', light: '#F3CBD0', dark: '#A65D64' },
  { id: 'cream', label: 'Kremowa Perła', base: '#EDE6D8', light: '#FCF9F2', dark: '#B3A894' },
  { id: 'sage', label: 'Szałwia', base: '#6F8872', light: '#9EB4A0', dark: '#455947' },
];

export const TOPPER_SHAPES: { id: TopperShapeId; label: string }[] = [
  { id: 'ribbon-bow', label: 'Wielka Kokarda' },
  { id: 'bethlehem-star', label: 'Gwiazda Betlejemska' },
  { id: 'vintage-finial', label: 'Szpic Vintage' },
  { id: 'angel-crescent', label: 'Anielskie Skrzydła' },
  { id: 'snowflake', label: 'Śnieżynka Kryształ' },
];

export const TOPPER_COLORS: ColorOption<TopperColorId>[] = [
  { id: 'coral-rose', label: 'Koralowy Róż', base: '#E4898B', light: '#F7C4C5', dark: '#AC4E52' },
  { id: 'crimson', label: 'Karmin', base: '#A51E2B', light: '#D15560', dark: '#630D15' },
  { id: 'antique-gold', label: 'Antyczne Złoto', base: '#C9A255', light: '#EED69B', dark: '#876524' },
  { id: 'pearl', label: 'Alabaster', base: '#ECE7DC', light: '#FFFFFF', dark: '#B3AA99' },
  { id: 'burgundy', label: 'Burgund', base: '#701C28', light: '#9E4450', dark: '#410B13' },
  { id: 'sage', label: 'Szałwia', base: '#6B826E', light: '#9EB3A0', dark: '#3F5242' },
];

export const PAPER_PATTERNS: {
  id: PaperPatternId;
  label: string;
  previewBg: string;
  accent: string;
}[] = [
  { id: 'sage-gingham', label: 'Szałwiowa Kratka', previewBg: '#D4DEC8', accent: '#9BAE8C' },
  { id: 'candy-stripe', label: 'Karminowe Paski', previewBg: '#F6ECE9', accent: '#B43D44' },
  { id: 'botanical-diamond', label: 'Botaniczne Romby', previewBg: '#D7E0D5', accent: '#688269' },
  { id: 'cream-laid', label: 'Papier Czerpany', previewBg: '#F4EDE0', accent: '#D6CAB6' },
  { id: 'burgundy-linen', label: 'Bordowy Len', previewBg: '#6A1F28', accent: '#481017' },
  { id: 'midnight-toile', label: 'Zimowa Noc', previewBg: '#233142', accent: '#3B4F66' },
];

export const FRAME_STYLES: { id: FrameStyleId; label: string; desc: string }[] = [
  { id: 'wavy-bows', label: 'Falista z Kokardkami', desc: 'Malowana pędzelkiem fala z dwiema kokardami' },
  { id: 'scalloped-oval', label: 'Koronkowy Medalion', desc: 'Ząbkowany owal z kropkami i kokardą u góry' },
  { id: 'double-ink-ribbons', label: 'Podwójny Tusz i Wstążki', desc: 'Podwójna ramka ze wstążeczkami w rogach' },
  { id: 'holly-wreath', label: 'Botaniczny Wieniec', desc: 'Rysunkowy łuk z gałązek i jemioły' },
];

export const FRAME_COLORS: ColorOption<FrameColorId>[] = [
  { id: 'crimson', label: 'Karminowy Tusz', base: '#8B1E28', light: '#B94650', dark: '#540E15' },
  { id: 'forest', label: 'Leśna Zieleń', base: '#2D4A36', light: '#54785E', dark: '#182A1E' },
  { id: 'gold', label: 'Złoto Płatkowe', base: '#A9833C', light: '#D1B16E', dark: '#6E511B' },
  { id: 'ink', label: 'Atrament', base: '#231E1B', light: '#524944', dark: '#0D0A09' },
  { id: 'rose', label: 'Różany', base: '#B76871', light: '#DC9BA2', dark: '#7D3B43' },
];

export const BORDER_ELEMENTS: { id: BorderElementId; label: string }[] = [
  { id: 'holly-berries', label: 'Ostrokrzew i Jagody' },
  { id: 'ink-sparkles', label: 'Rysunkowe Iskierki' },
  { id: 'mini-bows', label: 'Drobne Kokardki' },
  { id: 'snowflakes', label: 'Płatki Śniegu' },
  { id: 'pine-sprigs', label: 'Gałązki Sosny' },
  { id: 'none', label: 'Czysta Obramówka' },
];

export const DEDICATION_FONTS: { id: DedicationFontId; label: string; sample: string }[] = [
  { id: 'script', label: 'Kaligrafia Piórem', sample: 'Wesołych Świąt' },
  { id: 'editorial-italic', label: 'Szeryfowa Kursywa', sample: 'Spokojnych i radosnych' },
  { id: 'handwritten', label: 'Odręczny Szkic', sample: 'Magicznych chwil!' },
];

export const SAMPLE_DEDICATIONS: string[] = [
  'Wesołych Świąt pełnych ciepła, światła i bliskich serc.',
  'Niech te Święta przyniosą spokój, zachwyt i najpiękniejsze wspomnienia.',
  'Magicznych Świąt Bożego Narodzenia oraz pomyślności w Nowym Roku.',
  'merry & bright - najcieplejsze życzenia prosto z serca.',
];

export interface CardPreset {
  id: string;
  name: string;
  subtitle: string;
  config: CardConfig;
}

export const CARD_PRESETS: CardPreset[] = [
  {
    id: 'karti-gingham',
    name: 'Szałwia & Karmin',
    subtitle: 'Kratka gingham · falista ramka',
    config: {
      treeColor: 'classic-pine',
      treeExtras: { candles: true, skirt: true, gifts: true },
      baubles: [
        { shape: 'round', color: 'crimson', glitter: true },
        { shape: 'teardrop', color: 'blush', glitter: false },
        { shape: 'star', color: 'antique-gold', glitter: true },
      ],
      garlandStyle: 'beads',
      garlandColor: 'gold',
      topperShape: 'ribbon-bow',
      topperColor: 'coral-rose',
      paperPattern: 'sage-gingham',
      frameStyle: 'wavy-bows',
      frameColor: 'crimson',
      borderElement: 'ink-sparkles',
      dedication: 'Wesołych Świąt pełnych ciepła, światła i bliskich serc.',
      signature: 'Z najcieplejszymi życzeniami',
      dedicationFont: 'script',
      showKraftEnvelope: true,
    },
  },
  {
    id: 'watercolor-rose',
    name: 'Akwarela Róż & Świece',
    subtitle: 'Papier czerpany · złoty brokat',
    config: {
      treeColor: 'sage-mist',
      treeExtras: { candles: true, skirt: true, gifts: true },
      baubles: [
        { shape: 'round', color: 'blush', glitter: true },
        { shape: 'heart', color: 'burgundy', glitter: true },
        { shape: 'diamond', color: 'pearl', glitter: false },
      ],
      garlandStyle: 'ribbon',
      garlandColor: 'blush',
      topperShape: 'ribbon-bow',
      topperColor: 'coral-rose',
      paperPattern: 'cream-laid',
      frameStyle: 'double-ink-ribbons',
      frameColor: 'rose',
      borderElement: 'mini-bows',
      dedication: 'Niech te Święta przyniosą spokój, zachwyt i najpiękniejsze wspomnienia.',
      signature: 'Całuję mocno, Zosia',
      dedicationFont: 'editorial-italic',
      showKraftEnvelope: true,
    },
  },
  {
    id: 'candy-medallion',
    name: 'Kandyzowane Paski',
    subtitle: 'Koronkowy medalion · jemioła',
    config: {
      treeColor: 'classic-pine',
      treeExtras: { candles: false, skirt: false, gifts: true },
      baubles: [
        { shape: 'round', color: 'crimson', glitter: false },
        { shape: 'pinecone', color: 'antique-gold', glitter: true },
        { shape: 'teardrop', color: 'pearl', glitter: false },
      ],
      garlandStyle: 'pearls',
      garlandColor: 'cream',
      topperShape: 'bethlehem-star',
      topperColor: 'antique-gold',
      paperPattern: 'candy-stripe',
      frameStyle: 'scalloped-oval',
      frameColor: 'crimson',
      borderElement: 'holly-berries',
      dedication: 'merry & bright - najcieplejsze życzenia prosto z serca.',
      signature: '',
      dedicationFont: 'script',
      showKraftEnvelope: true,
    },
  },
  {
    id: 'botanical-winter',
    name: 'Botaniczna Zima',
    subtitle: 'Romby · wieniec ostrokrzewu',
    config: {
      treeColor: 'frost-spruce',
      treeExtras: { candles: true, skirt: false, gifts: false },
      baubles: [
        { shape: 'diamond', color: 'porcelain-blue', glitter: true },
        { shape: 'star', color: 'champagne', glitter: true },
        { shape: 'round', color: 'pearl', glitter: false },
      ],
      garlandStyle: 'stars',
      garlandColor: 'gold',
      topperShape: 'snowflake',
      topperColor: 'pearl',
      paperPattern: 'botanical-diamond',
      frameStyle: 'holly-wreath',
      frameColor: 'forest',
      borderElement: 'pine-sprigs',
      dedication: 'Magicznych Świąt Bożego Narodzenia oraz pomyślności w Nowym Roku.',
      signature: 'Rodzina Kowalskich',
      dedicationFont: 'editorial-italic',
      showKraftEnvelope: true,
    },
  },
];

export const DEFAULT_CARD_CONFIG: CardConfig = CARD_PRESETS[0].config;
