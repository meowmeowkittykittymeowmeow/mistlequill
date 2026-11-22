import { CardConfig, FRAME_COLORS } from '../types/card';

function wrapDedicationForExport(text: string, maxCharsPerLine: number): string[] {
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

export async function exportCardToPng(
  svgElement: SVGSVGElement,
  config: CardConfig,
  filename = 'christmas-card.png'
): Promise<void> {
  const WIDTH = 1500;
  const HEIGHT = 2100;
  const SCALE = 3; // 500x700 viewBox -> 1500x2100 px

  await document.fonts.ready;

  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('width', String(WIDTH));
  clone.setAttribute('height', String(HEIGHT));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Remove SVG text layer so we draw webfont text crisply onto canvas
  const excludedText = clone.querySelector('[data-export-exclude="text"]');
  if (excludedText) {
    excludedText.remove();
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Nie udało się wyrenderować obrazu kartki.'));
      image.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Brak kontekstu Canvas 2D.');

    ctx.fillStyle = '#FAF7F0';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

    // Draw dedication & signature using loaded web fonts
    const frameColor = FRAME_COLORS.find((c) => c.id === config.frameColor) || FRAME_COLORS[0];
    const isOval = config.frameStyle === 'scalloped-oval';
    const maxChars = isOval ? 25 : 34;
    const lines = wrapDedicationForExport(config.dedication, maxChars);
    const yStart = (isOval ? 478 : 514) * SCALE;
    const lineHeight = (config.dedicationFont === 'script' ? 23 : 21) * SCALE;

    const fontDecl =
      config.dedicationFont === 'script'
        ? `${23 * SCALE}px "Great Vibes", "Cormorant Garamond", cursive`
        : config.dedicationFont === 'handwritten'
        ? `${21 * SCALE}px "Caveat", cursive`
        : `italic 500 ${18 * SCALE}px "Cormorant Garamond", Georgia, serif`;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = frameColor.base;
    ctx.font = fontDecl;

    lines.forEach((line, idx) => {
      ctx.fillText(line, WIDTH / 2, yStart + idx * lineHeight);
    });

    if (config.signature.trim()) {
      ctx.fillStyle = frameColor.dark;
      ctx.globalAlpha = 0.82;
      ctx.font = `italic 400 ${13.5 * SCALE}px "Cormorant Garamond", Georgia, serif`;
      const sigY = yStart + Math.max(1, lines.length) * lineHeight + 8 * SCALE;
      ctx.fillText(config.signature.trim(), WIDTH / 2, sigY);
      ctx.globalAlpha = 1;
    }

    const pngBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0)
    );
    if (!pngBlob) throw new Error('Nie udało się zapisać pliku PNG.');

    const downloadUrl = URL.createObjectURL(pngBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1500);
  } finally {
    URL.revokeObjectURL(url);
  }
}
