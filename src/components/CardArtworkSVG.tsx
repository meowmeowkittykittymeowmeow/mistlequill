import React, { useEffect, useRef, useState } from 'react';
import {
  BAUBLE_COLORS,
  BaubleShapeId,
  BaubleSlot,
  CardConfig,
  ColorOption,
  FRAME_COLORS,
  GARLAND_COLORS,
  GIFT_COLORS,
  SKIRT_COLORS,
  TOPPER_COLORS,
  TREE_COLORS,
} from '../types/card';

interface CardArtworkSVGProps {
  config: CardConfig;
  svgRef?: React.RefObject<SVGSVGElement | null>;
  interactive?: boolean;
}

interface BaubleAnchor {
  id: number;
  x: number;
  y: number;
  slotIndex: 0 | 1 | 2;
  scale: number;
  wireLen: number;
}

// Organic asymmetric positions matching hand-painted tree clusters
const BAUBLE_ANCHORS: BaubleAnchor[] = [
  { id: 0, x: 237, y: 204, slotIndex: 0, scale: 0.84, wireLen: 9 },
  { id: 1, x: 269, y: 224, slotIndex: 1, scale: 0.88, wireLen: 11 },
  { id: 2, x: 207, y: 266, slotIndex: 2, scale: 0.94, wireLen: 10 },
  { id: 3, x: 251, y: 279, slotIndex: 0, scale: 0.98, wireLen: 12 },
  { id: 4, x: 291, y: 270, slotIndex: 1, scale: 0.92, wireLen: 10 },
  { id: 5, x: 185, y: 332, slotIndex: 1, scale: 1.0, wireLen: 11 },
  { id: 6, x: 228, y: 344, slotIndex: 2, scale: 1.03, wireLen: 12 },
  { id: 7, x: 276, y: 334, slotIndex: 0, scale: 1.0, wireLen: 11 },
  { id: 8, x: 317, y: 348, slotIndex: 2, scale: 0.95, wireLen: 12 },
  { id: 9, x: 163, y: 398, slotIndex: 0, scale: 1.04, wireLen: 12 },
  { id: 10, x: 214, y: 408, slotIndex: 1, scale: 1.06, wireLen: 13 },
  { id: 11, x: 266, y: 402, slotIndex: 2, scale: 1.04, wireLen: 12 },
  { id: 12, x: 318, y: 406, slotIndex: 0, scale: 1.02, wireLen: 11 },
];

// Organic overlapping watercolor brush dabs forming an expressive hand-painted pine tree
interface BrushDab {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot: number;
  tone: 'light' | 'base' | 'dark';
  opacity: number;
}

const WATERCOLOR_TREE_DABS: BrushDab[] = [
  // Apex soft washes
  { cx: 250, cy: 146, rx: 14, ry: 22, rot: -6, tone: 'light', opacity: 0.65 },
  { cx: 247, cy: 158, rx: 16, ry: 18, rot: 12, tone: 'base', opacity: 0.72 },
  { cx: 256, cy: 168, rx: 15, ry: 17, rot: -14, tone: 'dark', opacity: 0.48 },
  // Upper-mid organic boughs
  { cx: 235, cy: 188, rx: 24, ry: 18, rot: -18, tone: 'light', opacity: 0.68 },
  { cx: 263, cy: 192, rx: 24, ry: 17, rot: 16, tone: 'base', opacity: 0.74 },
  { cx: 248, cy: 204, rx: 26, ry: 18, rot: 4, tone: 'dark', opacity: 0.52 },
  { cx: 218, cy: 222, rx: 28, ry: 19, rot: -22, tone: 'base', opacity: 0.72 },
  { cx: 278, cy: 225, rx: 27, ry: 19, rot: 20, tone: 'light', opacity: 0.68 },
  { cx: 249, cy: 236, rx: 32, ry: 20, rot: -5, tone: 'base', opacity: 0.75 },
  { cx: 231, cy: 246, rx: 24, ry: 16, rot: 12, tone: 'dark', opacity: 0.52 },
  { cx: 269, cy: 248, rx: 25, ry: 16, rot: -11, tone: 'dark', opacity: 0.48 },
  // Middle asymmetric clusters (with breathing space!)
  { cx: 198, cy: 266, rx: 30, ry: 20, rot: -24, tone: 'light', opacity: 0.7 },
  { cx: 298, cy: 268, rx: 30, ry: 20, rot: 22, tone: 'base', opacity: 0.72 },
  { cx: 228, cy: 276, rx: 32, ry: 21, rot: -8, tone: 'base', opacity: 0.76 },
  { cx: 267, cy: 282, rx: 32, ry: 21, rot: 10, tone: 'light', opacity: 0.64 },
  { cx: 184, cy: 294, rx: 28, ry: 18, rot: -18, tone: 'dark', opacity: 0.5 },
  { cx: 314, cy: 296, rx: 27, ry: 18, rot: 19, tone: 'dark', opacity: 0.48 },
  { cx: 246, cy: 304, rx: 38, ry: 22, rot: -3, tone: 'dark', opacity: 0.54 },
  // Lower-mid wide brush sweeps
  { cx: 170, cy: 330, rx: 34, ry: 22, rot: -20, tone: 'light', opacity: 0.7 },
  { cx: 328, cy: 332, rx: 33, ry: 22, rot: 18, tone: 'light', opacity: 0.66 },
  { cx: 210, cy: 336, rx: 36, ry: 23, rot: -10, tone: 'base', opacity: 0.76 },
  { cx: 286, cy: 338, rx: 36, ry: 23, rot: 12, tone: 'base', opacity: 0.74 },
  { cx: 249, cy: 348, rx: 38, ry: 22, rot: 2, tone: 'dark', opacity: 0.55 },
  { cx: 158, cy: 360, rx: 30, ry: 18, rot: -14, tone: 'base', opacity: 0.78 },
  { cx: 340, cy: 362, rx: 30, ry: 18, rot: 16, tone: 'dark', opacity: 0.52 },
  { cx: 202, cy: 368, rx: 34, ry: 19, rot: 5, tone: 'dark', opacity: 0.5 },
  { cx: 296, cy: 368, rx: 34, ry: 19, rot: -6, tone: 'base', opacity: 0.72 },
  // Bottom lush ragged skirt boughs
  { cx: 146, cy: 394, rx: 35, ry: 22, rot: -18, tone: 'light', opacity: 0.68 },
  { cx: 352, cy: 396, rx: 34, ry: 22, rot: 18, tone: 'light', opacity: 0.68 },
  { cx: 188, cy: 400, rx: 38, ry: 24, rot: -8, tone: 'base', opacity: 0.78 },
  { cx: 310, cy: 402, rx: 38, ry: 24, rot: 9, tone: 'base', opacity: 0.76 },
  { cx: 248, cy: 408, rx: 42, ry: 25, rot: 0, tone: 'light', opacity: 0.66 },
  { cx: 134, cy: 424, rx: 28, ry: 16, rot: -12, tone: 'dark', opacity: 0.58 },
  { cx: 175, cy: 430, rx: 34, ry: 17, rot: -4, tone: 'dark', opacity: 0.54 },
  { cx: 224, cy: 432, rx: 34, ry: 17, rot: 5, tone: 'dark', opacity: 0.56 },
  { cx: 276, cy: 432, rx: 34, ry: 17, rot: -5, tone: 'dark', opacity: 0.56 },
  { cx: 325, cy: 429, rx: 34, ry: 17, rot: 6, tone: 'dark', opacity: 0.54 },
  { cx: 365, cy: 422, rx: 26, ry: 15, rot: 14, tone: 'dark', opacity: 0.55 },
];

// Loose hand-drawn dip-pen pine scribble strokes (like xo_b66b995a.jpg)
const INK_SCRIBBLE_PATHS: string[] = [
  // Apex needle tuft
  'M 250,121 C 247,133 244,142 241,150 M 251,123 C 254,134 257,144 261,152',
  'M 244,144 L 236,154 L 243,156 L 234,168',
  'M 258,145 L 266,155 L 259,158 L 268,170',
  // Upper organic branches
  'M 232,174 C 222,188 214,200 206,208 L 216,206 L 212,216 L 226,210',
  'M 268,175 C 278,188 286,199 294,208 L 284,206 L 289,215 L 274,211',
  'M 236,194 C 242,199 246,192 252,198 C 258,193 263,200 268,194',
  // Mid-upper loose zig-zags & needle wisps
  'M 210,224 C 198,238 186,252 178,262 L 191,258 L 185,268 L 201,262',
  'M 290,225 C 302,238 313,252 322,262 L 309,259 L 315,268 L 299,263',
  'M 216,244 C 224,250 228,240 236,248 C 242,240 248,250 256,242 C 264,250 272,242 280,249',
  'M 200,278 C 209,286 218,274 226,284 C 234,274 242,285 251,276',
  'M 260,282 C 269,288 278,278 286,286 C 294,278 302,286 308,279',
  // Mid-lower sweeping sketchy branches
  'M 184,288 C 169,308 156,324 146,336 L 160,332 L 154,344 L 172,337',
  'M 316,290 C 330,308 344,324 353,336 L 339,332 L 344,343 L 326,337',
  'M 176,322 C 188,329 194,318 205,326 C 216,317 224,328 234,319',
  'M 264,322 C 276,330 284,319 294,327 C 304,318 314,328 322,320',
  'M 164,352 C 176,360 185,349 196,358 C 208,348 219,360 230,350 C 242,360 254,350 266,358',
  // Bottom wide ragged boughs
  'M 152,364 C 138,385 124,404 114,418 L 130,415 L 122,428 L 143,422 L 155,434 L 169,424',
  'M 348,366 C 362,386 376,404 386,418 L 370,415 L 377,428 L 357,422 L 344,433 L 331,424',
  'M 178,430 C 194,438 208,426 222,436 C 236,426 250,438 265,428 C 280,438 296,427 312,436 L 328,426',
  'M 150,396 C 164,404 176,392 188,402 C 202,391 214,403 228,393',
  'M 272,395 C 286,404 298,392 312,402 C 325,392 338,402 348,394',
  // Tiny artistic pen crosshatches & loose ink flecks
  'M 244,218 Q 250,224 256,217',
  'M 236,306 Q 248,314 260,305',
  'M 228,378 Q 246,386 266,376',
];

function findColor<T extends string>(list: ColorOption<T>[], id: T): ColorOption<T> {
  return list.find((c) => c.id === id) || list[0];
}

function wrapDedicationText(text: string, maxCharsPerLine: number): string[] {
  const cleaned = text.trim();
  if (!cleaned) return [];
  const paragraphs = cleaned.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/);
    let current = '';
    for (const word of words) {
      if (!current) {
        current = word;
      } else if (current.length + 1 + word.length <= maxCharsPerLine) {
        current += ' ' + word;
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines.slice(0, 4);
}

function renderBaubleShapePath(shape: BaubleShapeId): string {
  switch (shape) {
    case 'round':
      return 'M 0,6 C 8.5,6 13.5,12 13.5,19.5 C 13.5,27 8.2,33 0,33 C -8.2,33 -13.5,27 -13.5,19.5 C -13.5,12 -8.5,6 0,6 Z';
    case 'teardrop':
      return 'M 0,6 C 4,11 11.5,17 11.5,23.5 C 11.5,30 6.5,35.5 0,37.5 C -6.5,35.5 -11.5,30 -11.5,23.5 C -11.5,17 -4,11 0,6 Z';
    case 'diamond':
      return 'M 0,5.5 L 12.5,19.5 L 0,35.5 L -12.5,19.5 Z';
    case 'star':
      return 'M 0,5 L 3.8,13.8 L 13.2,14.8 L 6.2,21 L 8.2,30.5 L 0,25.5 L -8.2,30.5 L -6.2,21 L -13.2,14.8 L -3.8,13.8 Z';
    case 'pinecone':
      return 'M 0,6 C 6.5,6.5 11,12 10.5,19 C 10,26 5.5,33.5 0,36 C -5.5,33.5 -10,26 -10.5,19 C -11,12 -6.5,6.5 0,6 Z';
    case 'heart':
      return 'M 0,11.5 C 3.5,6.5 12,7 12.5,14.5 C 13,22 4,28.5 0,33.5 C -4,28.5 -13,22 -12.5,14.5 C -12,7 -3.5,6.5 0,11.5 Z';
  }
}

export function CardArtworkSVG({ config, svgRef, interactive = true }: CardArtworkSVGProps) {
  const internalRef = useRef<SVGSVGElement | null>(null);
  const activeRef = svgRef || internalRef;

  const [pointerNorm, setPointerNorm] = useState({ x: 0, y: 0, inside: false });
  const [baubleAngles, setBaubleAngles] = useState<number[]>(() => BAUBLE_ANCHORS.map(() => 0));
  const [treeSway, setTreeSway] = useState(0);

  const velocityRef = useRef({ vx: 0, lastX: 0 });
  const baubleVelRef = useRef<number[]>(BAUBLE_ANCHORS.map(() => 0));
  const baubleAngleRef = useRef<number[]>(BAUBLE_ANCHORS.map(() => 0));
  const pointerSvgRef = useRef<{ x: number; y: number; inside: boolean; vx: number }>({
    x: 250,
    y: 350,
    inside: false,
    vx: 0,
  });

  useEffect(() => {
    if (!interactive) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    let time = 0;

    const step = () => {
      time += 0.032;
      const p = pointerSvgRef.current;
      p.vx *= 0.88;

      const targetTreeSway = p.inside
        ? p.vx * 0.16 + (p.x - 250) * 0.008
        : Math.sin(time * 0.8) * 0.35;
      setTreeSway((prev) => prev + (targetTreeSway - prev) * 0.1);

      let changed = false;
      for (let i = 0; i < BAUBLE_ANCHORS.length; i++) {
        const anchor = BAUBLE_ANCHORS[i];
        let impulse = 0;

        if (p.inside) {
          const dx = p.x - anchor.x;
          const dy = p.y - anchor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 68) {
            const strength = 1 - dist / 68;
            impulse += (p.vx * 0.32 + (dx > 0 ? -0.45 : 0.45)) * strength;
          }
        }

        const angle = baubleAngleRef.current[i];
        const ambient = Math.sin(time * 1.4 + i * 0.9) * 0.05;
        const accel = -0.14 * angle - 0.11 * baubleVelRef.current[i] + impulse + ambient;
        baubleVelRef.current[i] += accel;
        baubleAngleRef.current[i] = Math.max(-28, Math.min(28, angle + baubleVelRef.current[i]));

        if (Math.abs(baubleVelRef.current[i]) > 0.01 || Math.abs(baubleAngleRef.current[i]) > 0.01) {
          changed = true;
        }
      }

      if (changed) {
        setBaubleAngles([...baubleAngleRef.current]);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [interactive]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const svg = activeRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 500;
    const svgY = ((e.clientY - rect.top) / rect.height) * 700;

    const dx = svgX - velocityRef.current.lastX;
    velocityRef.current.lastX = svgX;
    pointerSvgRef.current = {
      x: svgX,
      y: svgY,
      inside: true,
      vx: Math.max(-22, Math.min(22, dx * 0.9)),
    };

    setPointerNorm({
      x: (svgX - 250) / 250,
      y: (svgY - 350) / 350,
      inside: true,
    });
  };

  const handlePointerLeave = () => {
    pointerSvgRef.current.inside = false;
    pointerSvgRef.current.vx = 0;
    setPointerNorm({ x: 0, y: 0, inside: false });
  };

  const kickBauble = (idx: number) => {
    if (!interactive) return;
    baubleVelRef.current[idx] += (idx % 2 === 0 ? 1 : -1) * 6.5;
  };

  const treePalette = findColor(TREE_COLORS, config.treeColor);
  const garlandPalette = findColor(GARLAND_COLORS, config.garlandColor);
  const topperPalette = findColor(TOPPER_COLORS, config.topperColor);
  const framePalette = findColor(FRAME_COLORS, config.frameColor);
  const skirtPalette =
    SKIRT_COLORS.find((s) => s.id === config.treeExtras.skirtColor) || SKIRT_COLORS[0];
  const giftPalette =
    GIFT_COLORS.find((g) => g.id === config.treeExtras.giftColor) || GIFT_COLORS[0];

  const isOval = config.frameStyle === 'scalloped-oval';
  const treeScale = isOval ? 0.72 : 0.94;
  const treeTranslateY = isOval ? -18 : -12;

  const maxChars = isOval ? 25 : 34;
  const dedicationLines = wrapDedicationText(config.dedication, maxChars);
  const dedicationYStart = isOval ? 478 : 514;
  const lineHeight = config.dedicationFont === 'script' ? 23 : 21;

  const fontFamilyCSS =
    config.dedicationFont === 'script'
      ? '"Great Vibes", "Cormorant Garamond", cursive'
      : config.dedicationFont === 'handwritten'
      ? '"Caveat", cursive'
      : '"Cormorant Garamond", Georgia, serif';

  const fontSizePx =
    config.dedicationFont === 'script'
      ? 23
      : config.dedicationFont === 'handwritten'
      ? 21
      : 18;

  const renderPaperBackground = () => {
    switch (config.paperPattern) {
      case 'sage-gingham':
        return (
          <>
            <rect width="500" height="700" fill="#F5F1E6" />
            <rect width="500" height="700" fill="url(#pattern-sage-gingham)" />
          </>
        );
      case 'candy-stripe':
        return (
          <>
            <rect width="500" height="700" fill="#FBF6EE" />
            <rect width="500" height="700" fill="url(#pattern-candy-stripe)" />
          </>
        );
      case 'botanical-diamond':
        return (
          <>
            <rect width="500" height="700" fill="#DCE4D7" />
            <rect width="500" height="700" fill="url(#pattern-botanical-diamond)" />
          </>
        );
      case 'cream-laid':
        return (
          <>
            <rect width="500" height="700" fill="#F5EFE3" />
            <rect width="500" height="700" fill="url(#pattern-cream-laid)" opacity="0.6" />
          </>
        );
      case 'burgundy-linen':
        return (
          <>
            <rect width="500" height="700" fill="#641E27" />
            <rect width="500" height="700" fill="url(#pattern-burgundy-linen)" />
          </>
        );
      case 'midnight-toile':
        return (
          <>
            <rect width="500" height="700" fill="#212F40" />
            <rect width="500" height="700" fill="url(#pattern-midnight-toile)" />
          </>
        );
    }
  };

  // Loose hand-sketched watercolor ribbon bow (xo_b66b995a.jpg signature)
  const renderPaintedBow = (
    cx: number,
    cy: number,
    scale: number,
    color: ColorOption,
    longTails = false
  ) => (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      {longTails ? (
        <g filter="url(#wc-paint)">
          {/* Watercolor flowing ribbon tails */}
          <path
            d="M -4,3 C -22,36 -46,88 -70,145 C -63,149 -57,144 -55,139 C -34,90 -16,44 0,8 Z"
            fill={color.base}
            opacity="0.86"
          />
          <path
            d="M 4,3 C 22,38 46,92 67,148 C 59,150 53,145 51,140 C 33,93 16,44 0,8 Z"
            fill={color.base}
            opacity="0.88"
          />
          {/* Darker fold shading */}
          <path
            d="M -3,7 C -19,42 -42,92 -63,141"
            fill="none"
            stroke={color.dark}
            strokeWidth="2.2"
            opacity="0.32"
          />
          <path
            d="M 3,7 C 19,42 42,95 60,144"
            fill="none"
            stroke={color.dark}
            strokeWidth="2.2"
            opacity="0.32"
          />
        </g>
      ) : (
        <g filter="url(#wc-paint)">
          <path
            d="M -2,3 C -15,16 -24,28 -30,36 C -24,38 -18,35 -16,32 C -10,22 -4,12 0,5 Z"
            fill={color.base}
            opacity="0.9"
          />
          <path
            d="M 2,3 C 15,16 24,28 30,36 C 24,38 18,35 16,32 C 10,22 4,12 0,5 Z"
            fill={color.base}
            opacity="0.9"
          />
        </g>
      )}
      {/* Expressive hand-inked outlines over watercolor */}
      {longTails ? (
        <g fill="none" stroke="#261D1A" strokeWidth="1.05" strokeLinecap="round" filter="url(#ink-nib)">
          <path d="M -5,5 C -23,36 -47,89 -71,145 C -64,149 -57,145 -54,139 C -34,90 -16,45 0,9" />
          <path d="M 4,5 C 23,38 46,92 67,148 C 59,150 53,145 51,140 C 33,92 16,45 0,9" />
        </g>
      ) : (
        <g fill="none" stroke="#261D1A" strokeWidth="1.05" strokeLinecap="round" filter="url(#ink-nib)">
          <path d="M -2,3 C -15,16 -24,28 -30,36 C -24,38 -18,35 -16,32 C -10,22 -4,12 0,5" />
          <path d="M 2,3 C 15,16 24,28 30,36 C 24,38 18,35 16,32 C 10,22 4,12 0,5" />
        </g>
      )}
      {/* Watercolor Bow Loops */}
      <g filter="url(#wc-paint)">
        <path
          d="M -2,0 C -18,-19 -43,-16 -40,-1 C -37,13 -14,10 -2,4 Z"
          fill={color.light}
          opacity="0.92"
        />
        <path
          d="M 2,0 C 18,-19 43,-16 40,-1 C 37,13 14,10 2,4 Z"
          fill={color.base}
          opacity="0.9"
        />
      </g>
      {/* Sketchy dip-pen loop strokes */}
      <g fill="none" stroke="#261D1A" strokeWidth="1.15" strokeLinecap="round" filter="url(#ink-nib)">
        <path d="M -3,0 C -19,-18 -43,-15 -40,-1 C -38,13 -13,10 -2,4" />
        <path d="M -7,1 C -19,-9 -31,-7 -28,0 C -25,5 -12,4 -4,2" strokeWidth="0.9" opacity="0.75" />
        <path d="M 3,0 C 19,-18 43,-15 40,-1 C 38,13 13,10 2,4" />
        <path d="M 7,1 C 19,-9 31,-7 28,0 C 25,5 12,4 4,2" strokeWidth="0.9" opacity="0.75" />
      </g>
      {/* Knot */}
      <ellipse
        cx="0"
        cy="2"
        rx="7.2"
        ry="6"
        fill={color.base}
        stroke="#261D1A"
        strokeWidth="1.15"
      />
      <path d="M -3,1 Q 0,3 3,1" fill="none" stroke={color.dark} strokeWidth="1" opacity="0.7" />
    </g>
  );

  const renderFrame = () => {
    const fc = framePalette;
    switch (config.frameStyle) {
      case 'wavy-bows':
        return (
          <g>
            <path
              d="M 56,56 Q 115,44 175,58 T 250,54 T 325,58 Q 385,44 444,56 Q 456,140 442,225 T 446,350 T 442,475 Q 456,560 444,644 Q 385,656 325,642 T 250,646 T 175,642 Q 115,656 56,644 Q 44,560 58,475 T 54,350 T 58,225 Q 44,140 56,56 Z"
              fill="#FBF8F1"
              filter="url(#soft-shadow)"
            />
            <path
              d="M 56,56 Q 115,44 175,58 T 250,54 T 325,58 Q 385,44 444,56 Q 456,140 442,225 T 446,350 T 442,475 Q 456,560 444,644 Q 385,656 325,642 T 250,646 T 175,642 Q 115,656 56,644 Q 44,560 58,475 T 54,350 T 58,225 Q 44,140 56,56 Z"
              fill="none"
              stroke={fc.base}
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#wc-paint)"
            />
            {renderPaintedBow(250, 54, 0.92, fc, false)}
            {renderPaintedBow(250, 646, 0.88, fc, false)}
          </g>
        );

      case 'scalloped-oval': {
        const scallops: string[] = [];
        const num = 32;
        for (let i = 0; i < num; i++) {
          const a1 = (i / num) * Math.PI * 2;
          const aMid = ((i + 0.5) / num) * Math.PI * 2;
          const a2 = ((i + 1) / num) * Math.PI * 2;
          const rx = 186;
          const ry = 252;
          const x1 = 250 + Math.cos(a1) * rx;
          const y1 = 342 + Math.sin(a1) * ry;
          const xm = 250 + Math.cos(aMid) * (rx + 16);
          const ym = 342 + Math.sin(aMid) * (ry + 16);
          const x2 = 250 + Math.cos(a2) * rx;
          const y2 = 342 + Math.sin(a2) * ry;
          if (i === 0) scallops.push(`M ${x1.toFixed(1)},${y1.toFixed(1)}`);
          scallops.push(`Q ${xm.toFixed(1)},${ym.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
        }
        scallops.push('Z');

        const dots = Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          return {
            cx: 250 + Math.cos(a) * 176,
            cy: 342 + Math.sin(a) * 240,
          };
        });

        return (
          <g>
            <path d={scallops.join(' ')} fill="#EFE2CB" stroke="#C8AF8A" strokeWidth="1.5" filter="url(#soft-shadow)" />
            <ellipse cx="250" cy="342" rx="164" ry="226" fill="#FBF8F1" stroke="#DFCEB0" strokeWidth="1" />
            {dots.map((d, i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r="3.2" fill={fc.base} opacity="0.88" />
            ))}
            {renderPaintedBow(250, 86, 0.95, fc, false)}
          </g>
        );
      }

      case 'double-ink-ribbons':
        return (
          <g>
            <rect
              x="54"
              y="56"
              width="392"
              height="588"
              rx="3"
              fill="#FBF8F1"
              filter="url(#soft-shadow)"
            />
            <rect
              x="62"
              y="64"
              width="376"
              height="572"
              fill="none"
              stroke={fc.base}
              strokeWidth="2"
              filter="url(#ink-nib)"
            />
            <rect
              x="68"
              y="70"
              width="364"
              height="560"
              fill="none"
              stroke={fc.base}
              strokeWidth="1.1"
              opacity="0.85"
            />
            {[
              [65, 67, -35],
              [435, 67, 35],
              [65, 633, 35],
              [435, 633, -35],
            ].map(([x, y, rot], idx) => (
              <g key={idx} transform={`translate(${x}, ${y}) rotate(${rot}) scale(0.42)`}>
                <path d="M -2,0 C -18,-16 -36,-12 -32,0 C -28,10 -12,6 -2,3 Z" fill={fc.base} />
                <path d="M 2,0 C 18,-16 36,-12 32,0 C 28,10 12,6 2,3 Z" fill={fc.base} />
                <path d="M -2,3 L -14,24 M 2,3 L 14,24" stroke={fc.dark} strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="0" cy="2" r="4" fill={fc.dark} />
              </g>
            ))}
          </g>
        );

      case 'holly-wreath':
        return (
          <g>
            <rect
              x="52"
              y="54"
              width="396"
              height="592"
              rx="18"
              fill="#FBF8F1"
              filter="url(#soft-shadow)"
            />
            <rect
              x="64"
              y="66"
              width="372"
              height="568"
              rx="14"
              fill="none"
              stroke={fc.base}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.7"
            />
            {[
              [78, 80, 0],
              [422, 80, 90],
              [422, 620, 180],
              [78, 620, 270],
            ].map(([x, y, rot], idx) => (
              <g key={idx} transform={`translate(${x}, ${y}) rotate(${rot})`}>
                <path d="M 0,46 Q 4,14 46,0" fill="none" stroke={fc.dark} strokeWidth="1.4" />
                <ellipse cx="14" cy="14" rx="9" ry="4.5" transform="rotate(-40 14 14)" fill="#4D6F52" stroke="#243627" strokeWidth="0.9" />
                <ellipse cx="32" cy="7" rx="8" ry="4" transform="rotate(-15 32 7)" fill="#628567" stroke="#243627" strokeWidth="0.9" />
                <ellipse cx="7" cy="31" rx="8" ry="4" transform="rotate(-75 7 31)" fill="#628567" stroke="#243627" strokeWidth="0.9" />
                <circle cx="19" cy="21" r="3.4" fill="#A6222E" />
                <circle cx="25" cy="17" r="2.8" fill="#C43844" />
                <circle cx="15" cy="27" r="2.6" fill="#8C1822" />
              </g>
            ))}
          </g>
        );
    }
  };

  const renderBorderElements = () => {
    if (config.borderElement === 'none') return null;

    const positions = [
      { x: 26, y: 110, r: -18 },
      { x: 474, y: 120, r: 22 },
      { x: 24, y: 265, r: 12 },
      { x: 476, y: 270, r: -14 },
      { x: 26, y: 430, r: -20 },
      { x: 474, y: 440, r: 18 },
      { x: 28, y: 585, r: 15 },
      { x: 472, y: 580, r: -16 },
      { x: 108, y: 27, r: -10 },
      { x: 392, y: 27, r: 10 },
      { x: 112, y: 674, r: 10 },
      { x: 388, y: 674, r: -10 },
    ];

    const isDarkBg =
      config.paperPattern === 'burgundy-linen' || config.paperPattern === 'midnight-toile';
    const strokeInk = isDarkBg ? '#F3ECE0' : '#2E2520';

    return (
      <g>
        {positions.map((pos, idx) => (
          <g key={idx} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
            {config.borderElement === 'holly-berries' && (
              <g>
                <path
                  d="M -10,0 Q -4,-9 4,-2 Q 10,-9 10,0 Q 5,7 0,3 Q -5,7 -10,0 Z"
                  fill="#44694B"
                  stroke="#203324"
                  strokeWidth="1"
                />
                <circle cx="-2" cy="1" r="2.7" fill="#B52734" />
                <circle cx="3" cy="2.5" r="2.4" fill="#9A1B26" />
                <circle cx="0.5" cy="-2" r="2.3" fill="#D03E4A" />
              </g>
            )}
            {config.borderElement === 'ink-sparkles' && (
              <g>
                <path
                  d="M 0,-11 Q 2,-2 11,0 Q 2,2 0,11 Q -2,2 -11,0 Q -2,-2 0,-11 Z"
                  fill={isDarkBg ? '#EAD39C' : '#DF959A'}
                  stroke={strokeInk}
                  strokeWidth="1"
                />
                <circle cx="11" cy="-8" r="1.4" fill={strokeInk} />
              </g>
            )}
            {config.borderElement === 'mini-bows' && (
              <g transform="scale(0.36)">
                <path
                  d="M -2,0 C -18,-18 -40,-14 -36,0 C -32,12 -14,8 -2,3 Z"
                  fill={framePalette.light}
                  stroke={strokeInk}
                  strokeWidth="2.2"
                />
                <path
                  d="M 2,0 C 18,-18 40,-14 36,0 C 32,12 14,8 2,3 Z"
                  fill={framePalette.base}
                  stroke={strokeInk}
                  strokeWidth="2.2"
                />
                <path d="M -3,4 L -16,28 M 3,4 L 16,28" stroke={framePalette.dark} strokeWidth="2.5" />
                <circle cx="0" cy="2" r="5" fill={framePalette.dark} />
              </g>
            )}
            {config.borderElement === 'snowflakes' && (
              <g stroke={isDarkBg ? '#F5EFE6' : '#587482'} strokeWidth="1.3" strokeLinecap="round">
                <line x1="-9" y1="0" x2="9" y2="0" />
                <line x1="0" y1="-9" x2="0" y2="9" />
                <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5" />
                <line x1="-6.5" y1="6.5" x2="6.5" y2="-6.5" />
                <circle cx="0" cy="0" r="2" fill={isDarkBg ? '#F5EFE6' : '#EBF3F7'} />
              </g>
            )}
            {config.borderElement === 'pine-sprigs' && (
              <g stroke={isDarkBg ? '#B8CEB9' : '#35543A'} strokeWidth="1.2" strokeLinecap="round">
                <line x1="-11" y1="4" x2="11" y2="-4" />
                <line x1="-6" y1="2" x2="-9" y2="-5" />
                <line x1="0" y1="0" x2="-3" y2="-7" />
                <line x1="6" y1="-2" x2="3" y2="-9" />
                <line x1="-5" y1="2" x2="0" y2="9" />
                <line x1="2" y1="-1" x2="7" y2="6" />
              </g>
            )}
          </g>
        ))}
      </g>
    );
  };

  const renderTree = () => {
    const tc = treePalette;
    const toneColor = (tone: BrushDab['tone']) =>
      tone === 'light' ? tc.light : tone === 'dark' ? tc.dark : tc.base;

    return (
      <g
        transform={`translate(250, ${446 + treeTranslateY}) scale(${treeScale}) translate(-250, -446)`}
      >
        {/* Painterly floor shadow & delicate ink ground lines (like bottom right of xo_b66b995a.jpg) */}
        <g opacity="0.65">
          <ellipse cx="250" cy="472" rx="108" ry="12" fill="#D9CFC3" opacity="0.4" filter="url(#wc-paint)" />
          <path d="M 118,476 L 146,476 M 340,478 L 378,476 M 365,483 L 392,482" stroke="#362C27" strokeWidth="0.9" strokeLinecap="round" />
        </g>

        {/* Optional Scalloped Watercolor Tree Skirt (xo_b66b995a.jpg) */}
        {config.treeExtras.skirt && (
          <g>
            <g filter="url(#wc-paint)">
              <path
                d="M 168,450 Q 170,478 190,472 Q 204,489 224,476 Q 248,495 274,478 Q 294,489 310,472 Q 332,478 334,450 Q 250,434 168,450 Z"
                fill={skirtPalette.fill}
                opacity="0.9"
              />
              <path
                d="M 184,454 Q 208,468 232,456 Q 252,472 278,458 Q 304,470 322,454"
                fill="none"
                stroke={skirtPalette.fold}
                strokeWidth="4"
                opacity="0.55"
              />
            </g>
            {/* Loose watercolor brush rim + ink folds */}
            <path
              d="M 168,450 Q 170,478 190,472 Q 204,489 224,476 Q 248,495 274,478 Q 294,489 310,472 Q 332,478 334,450"
              fill="none"
              stroke={skirtPalette.trim}
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#wc-paint)"
            />
            <path
              d="M 218,456 Q 226,464 234,462 M 266,460 Q 278,466 286,458"
              fill="none"
              stroke="#312420"
              strokeWidth="0.95"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        )}

        {/* Sketchy Tree Trunk */}
        <path
          d="M 242,434 L 239,464 Q 250,468 261,464 L 258,434 Z"
          fill="#6E4E3B"
          stroke="#2A1D16"
          strokeWidth="1.15"
          filter="url(#ink-nib)"
        />

        {/* Animated swaying artistic watercolor & nib-ink tree */}
        <g
          style={{
            transform: `rotate(${treeSway * 0.55}deg)`,
            transformOrigin: '250px 445px',
            transition: 'transform 120ms ease-out',
          }}
        >
          {/* Ambient artistic sparkles floating around the tree (xo_b66b995a.jpg) */}
          <g fill="#E79C9C" stroke="#2D231F" strokeWidth="0.9" opacity="0.85">
            <path d="M 192,162 Q 194,171 203,173 Q 194,175 192,184 Q 190,175 181,173 Q 190,171 192,162 Z" />
            <path d="M 326,184 Q 328,191 335,193 Q 328,195 326,202 Q 324,195 317,193 Q 324,191 326,184 Z" />
            <path d="M 366,274 Q 368,281 375,283 Q 368,285 366,292 Q 364,285 357,283 Q 364,281 366,274 Z" />
            <path d="M 116,320 Q 118,327 125,329 Q 118,331 116,338 Q 114,331 107,329 Q 114,327 116,320 Z" />
            <circle cx="338" cy="168" r="1.2" fill="#2D231F" stroke="none" />
            <circle cx="315" cy="176" r="1" fill="#2D231F" stroke="none" />
          </g>

          {/* Watercolor Wash Layers (loose organic overlapping brush dabs with paper showing through!) */}
          <g filter="url(#wc-paint)">
            {WATERCOLOR_TREE_DABS.map((dab, idx) => (
              <ellipse
                key={idx}
                cx={dab.cx}
                cy={dab.cy}
                rx={dab.rx}
                ry={dab.ry}
                transform={`rotate(${dab.rot} ${dab.cx} ${dab.cy})`}
                fill={toneColor(dab.tone)}
                opacity={dab.opacity}
              />
            ))}
          </g>

          {/* Subtle delicate inner green pigment flecks */}
          <g fill={tc.dark} opacity="0.28">
            <circle cx="230" cy="210" r="2.2" />
            <circle cx="272" cy="252" r="2.6" />
            <circle cx="195" cy="312" r="2.8" />
            <circle cx="295" cy="318" r="2.4" />
            <circle cx="165" cy="390" r="3" />
            <circle cx="332" cy="392" r="2.8" />
          </g>

          {/* Expressive Loose Black Fountain-Pen Ink Scribbles (xo_b66b995a.jpg signature!) */}
          <g
            fill="none"
            stroke="#241D1A"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.86"
            filter="url(#ink-nib)"
          >
            {INK_SCRIBBLE_PATHS.map((d, idx) => (
              <path key={idx} d={d} />
            ))}
          </g>

          {/* Garland Layer */}
          {renderGarland()}

          {/* Optional Watercolor Candles (xo_b66b995a.jpg) */}
          {config.treeExtras.candles && renderCandles()}

          {/* 3 Distinct Watercolor Bauble Types (xoxo_1ee6e37a.png) */}
          {BAUBLE_ANCHORS.map((anchor, idx) => renderBauble(anchor, idx))}

          {/* Topper */}
          {renderTopper()}
        </g>

        {/* Optional Sketchy Gift Boxes at base (xo_b66b995a.jpg) */}
        {config.treeExtras.gifts && renderGifts()}
      </g>
    );
  };

  const renderGarland = () => {
    if (config.garlandStyle === 'none') return null;
    const gc = garlandPalette;
    const curves = [
      'M 218,194 Q 250,212 282,196',
      'M 190,264 Q 250,294 310,266',
      'M 164,336 Q 250,374 336,338',
      'M 140,408 Q 250,446 360,406',
    ];

    if (config.garlandStyle === 'ribbon') {
      return (
        <g>
          {curves.map((d, idx) => (
            <g key={idx}>
              <path
                d={d}
                fill="none"
                stroke={gc.base}
                strokeWidth="6.2"
                strokeLinecap="round"
                opacity="0.82"
                filter="url(#wc-paint)"
              />
              <path
                d={d}
                fill="none"
                stroke={gc.light}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.68"
              />
              <path
                d={d}
                fill="none"
                stroke="#29201C"
                strokeWidth="0.85"
                strokeLinecap="round"
                opacity="0.58"
                filter="url(#ink-nib)"
              />
            </g>
          ))}
        </g>
      );
    }

    if (config.garlandStyle === 'beads' || config.garlandStyle === 'pearls') {
      const r = config.garlandStyle === 'pearls' ? 3.1 : 2.2;
      const beadGroups = [
        { x1: 218, y1: 194, cx: 250, cy: 212, x2: 282, y2: 196, n: 10 },
        { x1: 190, y1: 264, cx: 250, cy: 294, x2: 310, y2: 266, n: 15 },
        { x1: 164, y1: 336, cx: 250, cy: 374, x2: 336, y2: 338, n: 20 },
        { x1: 140, y1: 408, cx: 250, cy: 446, x2: 360, y2: 406, n: 24 },
      ];
      return (
        <g>
          {beadGroups.map((g, gi) => (
            <g key={gi}>
              <path
                d={`M ${g.x1},${g.y1} Q ${g.cx},${g.cy} ${g.x2},${g.y2}`}
                fill="none"
                stroke={gc.dark}
                strokeWidth="0.75"
                opacity="0.55"
              />
              {Array.from({ length: g.n + 1 }, (_, i) => {
                const t = i / g.n;
                const mt = 1 - t;
                const bx = mt * mt * g.x1 + 2 * mt * t * g.cx + t * t * g.x2;
                const by = mt * mt * g.y1 + 2 * mt * t * g.cy + t * t * g.y2;
                return (
                  <g key={i}>
                    <circle cx={bx} cy={by} r={r} fill={gc.base} stroke="#2C221E" strokeWidth="0.55" />
                    <circle cx={bx - 0.6} cy={by - 0.6} r={r * 0.36} fill={gc.light} />
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      );
    }

    const starGroups = [
      { x1: 218, y1: 194, cx: 250, cy: 212, x2: 282, y2: 196, n: 5 },
      { x1: 190, y1: 264, cx: 250, cy: 294, x2: 310, y2: 266, n: 7 },
      { x1: 164, y1: 336, cx: 250, cy: 374, x2: 336, y2: 338, n: 9 },
      { x1: 140, y1: 408, cx: 250, cy: 446, x2: 360, y2: 406, n: 11 },
    ];
    return (
      <g>
        {starGroups.map((g, gi) => (
          <g key={gi}>
            <path
              d={`M ${g.x1},${g.y1} Q ${g.cx},${g.cy} ${g.x2},${g.y2}`}
              fill="none"
              stroke={gc.dark}
              strokeWidth="0.85"
              opacity="0.6"
            />
            {Array.from({ length: g.n + 1 }, (_, i) => {
              const t = i / g.n;
              const mt = 1 - t;
              const bx = mt * mt * g.x1 + 2 * mt * t * g.cx + t * t * g.x2;
              const by = mt * mt * g.y1 + 2 * mt * t * g.cy + t * t * g.y2;
              return (
                <path
                  key={i}
                  d="M 0,-4.5 L 1.2,-1.2 L 4.5,0 L 1.2,1.2 L 0,4.5 L -1.2,1.2 L -4.5,0 L -1.2,-1.2 Z"
                  transform={`translate(${bx}, ${by})`}
                  fill={gc.light}
                  stroke="#2B211E"
                  strokeWidth="0.65"
                />
              );
            })}
          </g>
        ))}
      </g>
    );
  };

  // Sketchy taper candles in little crescent holders (xo_b66b995a.jpg)
  const renderCandles = () => {
    const spots = [
      { x: 204, y: 214 },
      { x: 288, y: 222 },
      { x: 175, y: 288 },
      { x: 318, y: 310 },
      { x: 152, y: 374 },
      { x: 344, y: 376 },
    ];
    return (
      <g>
        {spots.map((c, idx) => (
          <g key={idx} transform={`translate(${c.x}, ${c.y})`}>
            <path d="M -5.5,0 Q 0,4.5 5.5,0" fill="none" stroke="#281F1C" strokeWidth="1.2" strokeLinecap="round" />
            <rect
              x="-2"
              y="-18"
              width="4"
              height="18"
              rx="0.8"
              fill="#F6E6BE"
              stroke="#281F1C"
              strokeWidth="0.95"
              filter="url(#ink-nib)"
            />
            <circle cx="0" cy="-23" r="6.5" fill="#F8D27A" opacity="0.28" />
            <path
              className="candle-flame"
              d="M 0,-29 C 2.6,-25 2.6,-20 0,-19 C -2.6,-20 -2.6,-25 0,-29 Z"
              fill="#F5C051"
              stroke="#B5651D"
              strokeWidth="0.55"
            />
          </g>
        ))}
      </g>
    );
  };

  // Painterly blotchy watercolor baubles with gold cap & sketchy nib outline (xoxo_1ee6e37a.png)
  const renderBauble = (anchor: BaubleAnchor, idx: number) => {
    const slot: BaubleSlot = config.baubles[anchor.slotIndex];
    const color = findColor(BAUBLE_COLORS, slot.color);
    const angle = baubleAngles[idx] || 0;
    const shapePath = renderBaubleShapePath(slot.shape);
    const clipId = `bauble-clip-${anchor.id}`;

    return (
      <g
        key={anchor.id}
        transform={`translate(${anchor.x}, ${anchor.y})`}
        onPointerEnter={() => kickBauble(idx)}
        onClick={() => kickBauble(idx)}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <g
          transform={`rotate(${angle}) scale(${anchor.scale})`}
          style={{ transformOrigin: '0px 0px' }}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={shapePath} />
            </clipPath>
          </defs>

          {/* Delicate gold thread */}
          <line
            x1="0"
            y1={-anchor.wireLen}
            x2="0"
            y2="3"
            stroke="#9C7834"
            strokeWidth="1.05"
            strokeDasharray="1.5 0.8"
          />
          <circle cx="0" cy="2" r="2.1" fill="none" stroke="#8C6726" strokeWidth="1.05" />
          {/* Hand-drawn fluted gold cap */}
          <path
            d="M -3.8,3.5 L 3.8,3.5 L 4.2,7.5 L -4.2,7.5 Z"
            fill="#C79F4D"
            stroke="#4B3712"
            strokeWidth="0.85"
          />

          {/* Painterly Watercolor Washes clipped inside bauble */}
          <g clipPath={`url(#${clipId})`}>
            {/* Base light pigment */}
            <path d={shapePath} fill={color.light} />
            {/* Mottled watercolor wash dabs */}
            <ellipse cx="4" cy="21" rx="11" ry="12" fill={color.base} opacity="0.72" filter="url(#wc-paint)" />
            <ellipse cx="-6" cy="24" rx="8" ry="9" fill={color.base} opacity="0.58" filter="url(#wc-paint)" />
            <ellipse cx="6" cy="26" rx="9" ry="9" fill={color.dark} opacity="0.52" filter="url(#wc-paint)" />
            <circle cx="-4" cy="14" r="6" fill="#FFFFFF" opacity="0.48" filter="url(#wc-paint)" />
            {/* Irregular painterly highlight */}
            <path
              d="M -6,12 C -2,9 1,12 -1,16 C -3,19 -7,17 -6,12 Z"
              fill="#FFFFFF"
              opacity="0.72"
            />
            <circle cx="-6.5" cy="21" r="1.7" fill="#FFFFFF" opacity="0.52" />

            {/* Gold Glitter Stipple Swirl (xoxo_1ee6e37a.png style!) */}
            {slot.glitter && (
              <g fill="#E9CA78" opacity="0.9">
                <circle cx="2" cy="12" r="1.2" />
                <circle cx="5.5" cy="15" r="0.95" />
                <circle cx="1.5" cy="18" r="1.3" />
                <circle cx="-1" cy="21" r="0.9" />
                <circle cx="4" cy="23" r="1.15" />
                <circle cx="6.5" cy="26" r="0.85" />
                <circle cx="-2.5" cy="26.5" r="1.05" />
                <circle cx="1.5" cy="29" r="0.9" />
                <path
                  d="M -3,15 Q 4,18 1,24 Q -2,27 4,29"
                  fill="none"
                  stroke="#F3D98C"
                  strokeWidth="0.9"
                  strokeDasharray="1.2 1.8"
                />
              </g>
            )}
          </g>

          {/* Expressive sketchy nib ink outline */}
          <path
            d={shapePath}
            fill="none"
            stroke="#271E1B"
            strokeWidth="1.05"
            filter="url(#ink-nib)"
          />
        </g>
      </g>
    );
  };

  const renderTopper = () => {
    const tc = topperPalette;
    return (
      <g
        transform={`translate(250, 126) rotate(${treeSway * 0.8})`}
        style={{ transformOrigin: '0px 0px' }}
      >
        {config.topperShape === 'ribbon-bow' && renderPaintedBow(0, -2, 1.08, tc, true)}

        {config.topperShape === 'bethlehem-star' && (
          <g transform="translate(0, -14)">
            <g stroke={tc.dark} strokeWidth="0.95" opacity="0.55" filter="url(#ink-nib)">
              <line x1="0" y1="-32" x2="0" y2="32" />
              <line x1="-26" y1="0" x2="26" y2="0" />
              <line x1="-16" y1="-16" x2="16" y2="16" />
              <line x1="16" y1="-16" x2="-16" y2="16" />
            </g>
            <path
              d="M 0,-26 L 6,-7 L 25,-6 L 10,6 L 15,24 L 0,13 L -15,24 L -10,6 L -25,-6 L -6,-7 Z"
              fill={tc.base}
              opacity="0.9"
              filter="url(#wc-paint)"
            />
            <path
              d="M 0,-26 L 6,-7 L 25,-6 L 10,6 L 15,24 L 0,13 L -15,24 L -10,6 L -25,-6 L -6,-7 Z"
              fill="none"
              stroke="#261D1A"
              strokeWidth="1.15"
              strokeLinejoin="round"
              filter="url(#ink-nib)"
            />
          </g>
        )}

        {config.topperShape === 'vintage-finial' && (
          <g transform="translate(0, -8)">
            <path
              d="M 0,-42 C 2,-26 7,-18 7,-12 C 7,-7 4,-3 12,4 C 12,11 6,16 0,16 C -6,16 -12,11 -12,4 C -4,-3 -7,-7 -7,-12 C -7,-18 -2,-26 0,-42 Z"
              fill={tc.base}
              opacity="0.9"
              filter="url(#wc-paint)"
            />
            <path
              d="M 0,-42 C 2,-26 7,-18 7,-12 C 7,-7 4,-3 12,4 C 12,11 6,16 0,16 C -6,16 -12,11 -12,4 C -4,-3 -7,-7 -7,-12 C -7,-18 -2,-26 0,-42 Z"
              fill="none"
              stroke="#261D1A"
              strokeWidth="1.15"
              filter="url(#ink-nib)"
            />
            <ellipse cx="-3" cy="5" rx="3" ry="5" fill={tc.light} opacity="0.65" />
          </g>
        )}

        {config.topperShape === 'angel-crescent' && (
          <g transform="translate(0, -14)">
            <path
              d="M -4,4 C -24,-10 -34,-2 -28,10 C -22,18 -10,12 -3,8 Z"
              fill={tc.light}
              stroke="#261D1A"
              strokeWidth="1.1"
              filter="url(#ink-nib)"
            />
            <path
              d="M 4,4 C 24,-10 34,-2 28,10 C 22,18 10,12 3,8 Z"
              fill={tc.base}
              stroke="#261D1A"
              strokeWidth="1.1"
              filter="url(#ink-nib)"
            />
            <ellipse cx="0" cy="-15" rx="9" ry="3.2" fill="none" stroke="#C8A04E" strokeWidth="1.4" />
            <circle cx="0" cy="-6" r="6" fill="#F8E7DA" stroke="#261D1A" strokeWidth="1.05" />
            <path d="M -5,2 L 5,2 L 10,20 L -10,20 Z" fill={tc.base} stroke="#261D1A" strokeWidth="1.1" />
          </g>
        )}

        {config.topperShape === 'snowflake' && (
          <g transform="translate(0, -16)">
            <g stroke={tc.dark} strokeWidth="2.2" strokeLinecap="round" filter="url(#ink-nib)">
              <line x1="0" y1="-24" x2="0" y2="24" />
              <line x1="-21" y1="-12" x2="21" y2="12" />
              <line x1="-21" y1="12" x2="21" y2="-12" />
            </g>
            <g stroke={tc.light} strokeWidth="1.3" strokeLinecap="round">
              <path d="M -5,-16 L 0,-11 L 5,-16" fill="none" />
              <path d="M -5,16 L 0,11 L 5,16" fill="none" />
              <path d="M -16,-4 L -10,-6 L -12,-12" fill="none" />
              <path d="M 16,4 L 10,6 L 12,12" fill="none" />
              <path d="M 16,-4 L 10,-6 L 12,-12" fill="none" />
              <path d="M -16,4 L -10,6 L -12,12" fill="none" />
            </g>
            <circle cx="0" cy="0" r="5" fill={tc.base} stroke="#261D1A" strokeWidth="1" />
          </g>
        )}
      </g>
    );
  };

  // Loose hand-drawn ink & watercolor gift boxes (xo_b66b995a.jpg)
  const renderGifts = () => (
    <g>
      <g transform="translate(132, 434) rotate(-2)">
        <rect x="0" y="0" width="36" height="32" fill={giftPalette.box1} opacity="0.88" filter="url(#wc-paint)" />
        <path d="M 0,1 L 36,0 L 35,32 L 1,31 Z" fill="none" stroke="#281F1C" strokeWidth="1.05" filter="url(#ink-nib)" />
        <path d="M 18,-1 L 17,32 M -1,14 L 36,15" stroke={giftPalette.ribbonMain} strokeWidth="3.2" opacity="0.88" />
        <path d="M 18,0 C 11,-8 4,-4 10,0 M 18,0 C 25,-8 32,-4 26,0" fill="none" stroke={giftPalette.bowMain} strokeWidth="1.5" />
      </g>
      <g transform="translate(158, 456) rotate(1.5)">
        <rect x="0" y="0" width="44" height="24" fill={giftPalette.box2} opacity="0.9" filter="url(#wc-paint)" />
        <path d="M 0,0 L 44,1 L 43,24 L 1,23 Z" fill="none" stroke="#281F1C" strokeWidth="1.05" filter="url(#ink-nib)" />
        <path d="M 22,0 L 22,24" stroke={giftPalette.ribbonMain} strokeWidth="3" opacity="0.88" />
        <path d="M 22,0 C 16,-7 10,-4 15,0 M 22,0 C 28,-7 34,-4 29,0" fill="none" stroke={giftPalette.bowMain} strokeWidth="1.4" />
      </g>

      <g transform="translate(328, 444) rotate(2)">
        <rect x="0" y="0" width="32" height="28" fill={giftPalette.box3} opacity="0.9" filter="url(#wc-paint)" />
        <path d="M 0,1 L 32,0 L 31,28 L 1,27 Z" fill="none" stroke="#281F1C" strokeWidth="1.05" filter="url(#ink-nib)" />
        <path d="M 16,0 L 16,28 M 0,12 L 32,12" stroke={giftPalette.ribbonAlt} strokeWidth="3" opacity="0.88" />
        <path d="M 16,0 C 10,-7 4,-3 10,0 M 16,0 C 22,-7 28,-3 22,0" fill="none" stroke={giftPalette.bowAlt} strokeWidth="1.4" />
      </g>
      <g transform="translate(298, 462) rotate(-1.5)">
        <rect x="0" y="0" width="26" height="22" fill={giftPalette.box4} opacity="0.9" filter="url(#wc-paint)" />
        <path d="M 0,0 L 26,1 L 25,22 L 1,21 Z" fill="none" stroke="#281F1C" strokeWidth="1.05" filter="url(#ink-nib)" />
        <path d="M 13,0 L 13,22" stroke={giftPalette.ribbonSmall} strokeWidth="2.5" opacity="0.88" />
      </g>
    </g>
  );

  return (
    <div
      className="relative select-none"
      style={{
        transform: interactive
          ? `perspective(1200px) rotateY(${pointerNorm.x * 2.2}deg) rotateX(${-pointerNorm.y * 2.2}deg)`
          : 'none',
        transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {config.showKraftEnvelope && (
        <div
          aria-hidden="true"
          className="absolute -inset-x-3 -top-4 bottom-2 rounded-sm shadow-md pointer-events-none"
          style={{
            background: 'linear-gradient(145deg, #9C7A58 0%, #866647 55%, #75583C 100%)',
            transform: 'rotate(-1.5deg)',
            boxShadow: '0 18px 40px -12px rgba(45, 32, 20, 0.35)',
          }}
        />
      )}

      <svg
        ref={activeRef}
        viewBox="0 0 500 700"
        xmlns="http://www.w3.org/2000/svg"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full h-auto block rounded-[2px] shadow-[0_20px_50px_-14px_rgba(30,24,20,0.28)] bg-[#FAF7F0]"
        role="img"
        aria-label="Podgląd własnoręcznie zaprojektowanej kartki świątecznej"
      >
        <defs>
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2A201A" floodOpacity="0.12" />
          </filter>

          {/* Organic watercolor pigment bleed edge */}
          <filter id="wc-paint" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.45" />
          </filter>

          {/* Subtle dip-pen ink nib wobble */}
          <filter id="ink-nib" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="3" result="nibNoise" />
            <feDisplacementMap in="SourceGraphic" in2="nibNoise" scale="1.45" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Cotton Paper Grain Overlay */}
          <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" result="grain" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.045" />
            </feComponentTransfer>
          </filter>

          {/* Paper Patterns */}
          <pattern id="pattern-sage-gingham" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect width="28" height="28" fill="#F4F0E6" />
            <rect x="0" y="0" width="14" height="28" fill="#B5C3A8" opacity="0.45" />
            <rect x="0" y="0" width="28" height="14" fill="#B5C3A8" opacity="0.45" />
          </pattern>

          <pattern id="pattern-candy-stripe" width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill="#FAF4EA" />
            <path d="M 4.5,0 L 4.5,22" stroke="#BC4B52" strokeWidth="2.8" opacity="0.72" />
            <path d="M 15.5,0 L 15.5,22" stroke="#C96A6E" strokeWidth="1.6" opacity="0.55" />
          </pattern>

          <pattern id="pattern-botanical-diamond" width="44" height="44" patternUnits="userSpaceOnUse">
            <rect width="44" height="44" fill="#CFD9CC" />
            <path d="M 0,22 L 22,0 L 44,22 L 22,44 Z" fill="none" stroke="#687D6A" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="22" cy="22" r="2" fill="#9E2530" />
            <circle cx="25" cy="20" r="1.5" fill="#B83B45" />
            <path d="M 22,22 Q 18,16 14,17" fill="none" stroke="#3D5941" strokeWidth="1" />
            <path d="M 22,22 Q 26,27 29,26" fill="none" stroke="#3D5941" strokeWidth="1" />
          </pattern>

          <pattern id="pattern-cream-laid" width="32" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="5" x2="32" y2="5" stroke="#DFD4C0" strokeWidth="0.6" />
          </pattern>

          <pattern id="pattern-burgundy-linen" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#641E27" />
            <rect x="0" y="0" width="12" height="24" fill="#4C1219" opacity="0.45" />
            <rect x="0" y="0" width="24" height="12" fill="#4C1219" opacity="0.45" />
            <line x1="12" y1="0" x2="12" y2="24" stroke="#9E6F55" strokeWidth="0.4" opacity="0.35" />
          </pattern>

          <pattern id="pattern-midnight-toile" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect width="48" height="48" fill="#212F40" />
            <circle cx="12" cy="14" r="1.1" fill="#E6D9B8" opacity="0.6" />
            <circle cx="36" cy="34" r="0.9" fill="#E6D9B8" opacity="0.5" />
            <path d="M 32,12 L 34,16 L 38,14 L 34,18 L 32,22 L 30,18 L 26,14 L 30,16 Z" fill="#C9D6E2" opacity="0.35" />
          </pattern>
        </defs>

        {/* Layer 1: Outer Card Paper */}
        {renderPaperBackground()}

        {/* Layer 2: Decorative Elements Around Frame */}
        {renderBorderElements()}

        {/* Layer 3: Frame & Inner Cream Mat */}
        {renderFrame()}

        {/* Layer 4: Painterly Watercolor & Ink Tree, Garland, 3 Bauble Types, Candles, Gifts & Topper */}
        {renderTree()}

        {/* Layer 5: Dedication & Signature inside Frame */}
        <g data-export-exclude="text">
          {dedicationLines.map((line, i) => (
            <text
              key={i}
              x="250"
              y={dedicationYStart + i * lineHeight}
              textAnchor="middle"
              fill={framePalette.base}
              style={{
                fontFamily: fontFamilyCSS,
                fontSize: `${fontSizePx}px`,
                fontStyle: config.dedicationFont === 'editorial-italic' ? 'italic' : 'normal',
                fontWeight: config.dedicationFont === 'editorial-italic' ? 500 : 400,
              }}
            >
              {line}
            </text>
          ))}
          {config.signature.trim() && (
            <text
              x="250"
              y={dedicationYStart + Math.max(1, dedicationLines.length) * lineHeight + 8}
              textAnchor="middle"
              fill={framePalette.dark}
              opacity="0.82"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '13.5px',
                fontStyle: 'italic',
                letterSpacing: '0.03em',
              }}
            >
              {config.signature.trim()}
            </text>
          )}
        </g>

        <rect width="500" height="700" fill="#000" filter="url(#paper-grain)" pointerEvents="none" />
      </svg>
    </div>
  );
}
