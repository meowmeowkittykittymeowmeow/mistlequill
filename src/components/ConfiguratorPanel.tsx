import React, { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Sparkles,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  BAUBLE_COLORS,
  BAUBLE_SHAPES,
  BaubleShapeId,
  BaubleSlot,
  BORDER_ELEMENTS,
  CardConfig,
  DEDICATION_FONTS,
  FRAME_COLORS,
  FRAME_STYLES,
  GARLAND_COLORS,
  GARLAND_STYLES,
  PAPER_PATTERNS,
  TOPPER_COLORS,
  TOPPER_SHAPES,
  TREE_COLORS,
} from '../types/card';

export type StepId = 1 | 2 | 3 | 4 | 5;

interface ConfiguratorPanelProps {
  lang: Language;
  config: CardConfig;
  onChange: (next: CardConfig) => void;
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
  onDownload: () => void;
  isExporting: boolean;
}

function BaubleMiniIcon({ shape, color }: { shape: BaubleShapeId; color: string }) {
  const pathMap: Record<BaubleShapeId, string> = {
    round: 'M 12,6 C 17,6 20,9.5 20,14 C 20,18.5 17,22 12,22 C 7,22 4,18.5 4,14 C 4,9.5 7,6 12,6 Z',
    teardrop: 'M 12,5 C 14.5,8.5 19,12 19,16 C 19,19.8 15.8,22.5 12,23 C 8.2,22.5 5,19.8 5,16 C 5,12 9.5,8.5 12,5 Z',
    diamond: 'M 12,5 L 19,14 L 12,23 L 5,14 Z',
    star: 'M 12,4 L 14.4,10 L 20.5,10.5 L 15.8,14.6 L 17.2,21 L 12,17.5 L 6.8,21 L 8.2,14.6 L 3.5,10.5 L 9.6,10 Z',
    pinecone: 'M 12,5 C 16,5.5 18.5,9 18,13.5 C 17.5,18 14.8,22 12,23 C 9.2,22 6.5,18 6,13.5 C 5.5,9 8,5.5 12,5 Z',
    heart: 'M 12,9 C 14.5,5.5 19.5,6 20,10.8 C 20.5,15.5 14.5,19.5 12,22.5 C 9.5,19.5 3.5,15.5 4,10.8 C 4.5,6 9.5,5.5 12,9 Z',
  };

  return (
    <svg viewBox="0 0 24 26" className="w-6 h-6 shrink-0" aria-hidden="true">
      <rect x="10" y="2.5" width="4" height="2.8" rx="0.6" fill="#B89347" stroke="#5E4618" strokeWidth="0.7" />
      <path d={pathMap[shape]} fill={color} stroke="#2B211E" strokeWidth="1" />
    </svg>
  );
}

export function ConfiguratorPanel({
  lang,
  config,
  onChange,
  activeStep,
  onStepChange,
  onDownload,
  isExporting,
}: ConfiguratorPanelProps) {
  const [activeBaubleSlot, setActiveBaubleSlot] = useState<0 | 1 | 2>(0);
  const t = TRANSLATIONS[lang];

  const steps: { id: StepId; num: string; label: string }[] = [
    { id: 1, num: '01', label: t.steps[1] },
    { id: 2, num: '02', label: t.steps[2] },
    { id: 3, num: '03', label: t.steps[3] },
    { id: 4, num: '04', label: t.steps[4] },
    { id: 5, num: '05', label: t.steps[5] },
  ];

  const updateBaubleSlot = (index: 0 | 1 | 2, patch: Partial<BaubleSlot>) => {
    const nextBaubles: [BaubleSlot, BaubleSlot, BaubleSlot] = [
      ...config.baubles,
    ] as [BaubleSlot, BaubleSlot, BaubleSlot];
    nextBaubles[index] = { ...nextBaubles[index], ...patch };
    onChange({ ...config, baubles: nextBaubles });
  };

  const currentSlot = config.baubles[activeBaubleSlot];
  const currentSlotColorHex =
    BAUBLE_COLORS.find((c) => c.id === currentSlot.color)?.base || '#B32833';

  return (
    <section
      aria-label="Card Configurator"
      className="flex flex-col bg-white border border-[#E5DDD0] rounded-xl shadow-[0_8px_30px_rgba(30,24,18,0.04)] overflow-hidden"
    >
      {/* Step Navigation Bar */}
      <div className="border-b border-[#EAE3D7] bg-[#FCFBF8] px-4 py-3">
        <div className="grid grid-cols-5 gap-1.5" role="tablist">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isDone = activeStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStepChange(step.id)}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg text-center transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1E28] ${
                  isActive
                    ? 'bg-[#7D1E28] text-white shadow-sm'
                    : isDone
                    ? 'bg-[#F3EDE3] text-[#1E1A17] hover:bg-[#EAE1D3]'
                    : 'text-[#6A6058] hover:bg-[#F5F0E8] hover:text-[#1E1A17]'
                }`}
              >
                <span
                  className={`text-[10px] font-medium tracking-wider tabular-nums ${
                    isActive ? 'text-white/80' : 'text-[#8C7F72]'
                  }`}
                >
                  {step.num}
                </span>
                <span className="text-xs font-medium whitespace-nowrap truncate max-w-full mt-0.5">
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto atelier-scroll max-h-[620px]">
        {/* STEP 1: TREE COLOR & EXTRAS */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
                {t.configurator.step1.kicker}
              </p>
              <h2 className="font-editorial text-2xl font-semibold text-[#1E1A17] mt-1">
                {t.configurator.step1.title}
              </h2>
              <p className="text-sm text-[#615850] mt-1 leading-relaxed">
                {t.configurator.step1.subtitle}
              </p>
            </div>

            <div className="space-y-3">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step1.treeColorLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TREE_COLORS.map((tc) => {
                  const selected = config.treeColor === tc.id;
                  return (
                    <button
                      key={tc.id}
                      type="button"
                      onClick={() => onChange({ ...config, treeColor: tc.id })}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1E28] ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full shrink-0 border border-black/10 shadow-inner"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, ${tc.light}, ${tc.base} 60%, ${tc.dark})`,
                        }}
                      />
                      <span className="text-sm font-medium text-[#1E1A17] whitespace-nowrap truncate">
                        {t.treeColors[tc.id]}
                      </span>
                      {selected && (
                        <Check className="w-4 h-4 text-[#7D1E28] ml-auto shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE8DC] space-y-3">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step1.extrasLabel}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    key: 'candles' as const,
                    title: t.configurator.step1.candlesTitle,
                    desc: t.configurator.step1.candlesDesc,
                  },
                  {
                    key: 'skirt' as const,
                    title: t.configurator.step1.skirtTitle,
                    desc: t.configurator.step1.skirtDesc,
                  },
                  {
                    key: 'gifts' as const,
                    title: t.configurator.step1.giftsTitle,
                    desc: t.configurator.step1.giftsDesc,
                  },
                ].map((item) => {
                  const active = config.treeExtras[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...config,
                          treeExtras: {
                            ...config.treeExtras,
                            [item.key]: !active,
                          },
                        })
                      }
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'border-[#7D1E28]/50 bg-[#FDF9F8]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C7BBA9]'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-sm font-medium text-[#1E1A17]">{item.title}</div>
                        <div className="text-xs text-[#73685E]">{item.desc}</div>
                      </div>
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          active
                            ? 'bg-[#7D1E28] border-[#7D1E28] text-white'
                            : 'border-[#C8BDB0] bg-white'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: 3 TYPES OF BAUBLES */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
                {t.configurator.step2.kicker}
              </p>
              <h2 className="font-editorial text-2xl font-semibold text-[#1E1A17] mt-1">
                {t.configurator.step2.title}
              </h2>
              <p className="text-sm text-[#615850] mt-1 leading-relaxed">
                {t.configurator.step2.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 bg-[#F3EDE3] rounded-lg">
              {([0, 1, 2] as const).map((slotIdx) => {
                const slot = config.baubles[slotIdx];
                const slotColor =
                  BAUBLE_COLORS.find((c) => c.id === slot.color)?.base || '#B32833';
                const isSelected = activeBaubleSlot === slotIdx;
                return (
                  <button
                    key={slotIdx}
                    type="button"
                    onClick={() => setActiveBaubleSlot(slotIdx)}
                    className={`flex items-center justify-center gap-2 py-2 px-2 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-white text-[#1E1A17] shadow-sm'
                        : 'text-[#615850] hover:text-[#1E1A17]'
                    }`}
                  >
                    <BaubleMiniIcon shape={slot.shape} color={slotColor} />
                    <span>
                      {t.configurator.step2.slotPrefix} {slotIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step2.shapeLabel} ({t.configurator.step2.slotPrefix}{' '}
                {activeBaubleSlot + 1})
              </span>
              <div className="grid grid-cols-3 gap-2">
                {BAUBLE_SHAPES.map((shape) => {
                  const selected = currentSlot.shape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      type="button"
                      onClick={() => updateBaubleSlot(activeBaubleSlot, { shape: shape.id })}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-lg border transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <BaubleMiniIcon shape={shape.id} color={currentSlotColorHex} />
                      <span className="text-xs font-medium text-[#1E1A17] whitespace-nowrap">
                        {t.baubleShapes[shape.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step2.colorLabel} ({t.configurator.step2.slotPrefix}{' '}
                {activeBaubleSlot + 1})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BAUBLE_COLORS.map((bc) => {
                  const selected = currentSlot.color === bc.id;
                  return (
                    <button
                      key={bc.id}
                      type="button"
                      onClick={() => updateBaubleSlot(activeBaubleSlot, { color: bc.id })}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 border border-black/10"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, ${bc.light}, ${bc.base} 55%, ${bc.dark})`,
                        }}
                      />
                      <span className="text-xs font-medium text-[#1E1A17] truncate">
                        {t.baubleColors[bc.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFE8DC]">
              <button
                type="button"
                onClick={() =>
                  updateBaubleSlot(activeBaubleSlot, { glitter: !currentSlot.glitter })
                }
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                  currentSlot.glitter
                    ? 'border-[#B08D57] bg-[#FDFBF5]'
                    : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Sparkles className="w-4 h-4 text-[#B08D57]" />
                  <div>
                    <div className="text-sm font-medium text-[#1E1A17]">
                      {t.configurator.step2.glitterTitle}
                    </div>
                    <div className="text-xs text-[#73685E]">
                      {t.configurator.step2.glitterDesc}
                    </div>
                  </div>
                </div>
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                    currentSlot.glitter
                      ? 'bg-[#B08D57] border-[#B08D57] text-white'
                      : 'border-[#C8BDB0] bg-white'
                  }`}
                >
                  {currentSlot.glitter && <Check className="w-3.5 h-3.5" />}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GARLANDS */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
                {t.configurator.step3.kicker}
              </p>
              <h2 className="font-editorial text-2xl font-semibold text-[#1E1A17] mt-1">
                {t.configurator.step3.title}
              </h2>
              <p className="text-sm text-[#615850] mt-1 leading-relaxed">
                {t.configurator.step3.subtitle}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step3.styleLabel}
              </span>
              <div className="space-y-2">
                {GARLAND_STYLES.map((gs) => {
                  const selected = config.garlandStyle === gs.id;
                  const tr = t.garlandStyles[gs.id];
                  return (
                    <button
                      key={gs.id}
                      type="button"
                      onClick={() => onChange({ ...config, garlandStyle: gs.id })}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium text-[#1E1A17]">{tr.label}</div>
                        <div className="text-xs text-[#73685E]">{tr.desc}</div>
                      </div>
                      {selected && <Check className="w-4 h-4 text-[#7D1E28] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {config.garlandStyle !== 'none' && (
              <div className="space-y-2.5 pt-2 border-t border-[#EFE8DC]">
                <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                  {t.configurator.step3.colorLabel}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GARLAND_COLORS.map((gc) => {
                    const selected = config.garlandColor === gc.id;
                    return (
                      <button
                        key={gc.id}
                        type="button"
                        onClick={() => onChange({ ...config, garlandColor: gc.id })}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          selected
                            ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                            : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                          style={{
                            background: `radial-gradient(circle at 35% 30%, ${gc.light}, ${gc.base})`,
                          }}
                        />
                        <span className="text-xs font-medium text-[#1E1A17] whitespace-nowrap">
                          {t.garlandColors[gc.id]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: TREE TOPPER */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
                {t.configurator.step4.kicker}
              </p>
              <h2 className="font-editorial text-2xl font-semibold text-[#1E1A17] mt-1">
                {t.configurator.step4.title}
              </h2>
              <p className="text-sm text-[#615850] mt-1 leading-relaxed">
                {t.configurator.step4.subtitle}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step4.shapeLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPPER_SHAPES.map((ts) => {
                  const selected = config.topperShape === ts.id;
                  return (
                    <button
                      key={ts.id}
                      type="button"
                      onClick={() => onChange({ ...config, topperShape: ts.id })}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span className="text-sm font-medium text-[#1E1A17] whitespace-nowrap">
                        {t.topperShapes[ts.id]}
                      </span>
                      {selected && <Check className="w-4 h-4 text-[#7D1E28] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#EFE8DC]">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step4.colorLabel}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPPER_COLORS.map((tc) => {
                  const selected = config.topperColor === tc.id;
                  return (
                    <button
                      key={tc.id}
                      type="button"
                      onClick={() => onChange({ ...config, topperColor: tc.id })}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, ${tc.light}, ${tc.base})`,
                        }}
                      />
                      <span className="text-xs font-medium text-[#1E1A17] whitespace-nowrap">
                        {t.topperColors[tc.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CARD PAPER, FRAME, BORDER ELEMENTS & DEDICATION */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
                {t.configurator.step5.kicker}
              </p>
              <h2 className="font-editorial text-2xl font-semibold text-[#1E1A17] mt-1">
                {t.configurator.step5.title}
              </h2>
              <p className="text-sm text-[#615850] mt-1 leading-relaxed">
                {t.configurator.step5.subtitle}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step5.paperLabel}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAPER_PATTERNS.map((pp) => {
                  const selected = config.paperPattern === pp.id;
                  return (
                    <button
                      key={pp.id}
                      type="button"
                      onClick={() => onChange({ ...config, paperPattern: pp.id })}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded shrink-0 border border-black/15"
                        style={{
                          background: `linear-gradient(135deg, ${pp.previewBg} 50%, ${pp.accent} 50%)`,
                        }}
                      />
                      <span className="text-xs font-medium text-[#1E1A17] truncate">
                        {t.paperPatterns[pp.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#EFE8DC]">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step5.frameLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FRAME_STYLES.map((fs) => {
                  const selected = config.frameStyle === fs.id;
                  const tr = t.frameStyles[fs.id];
                  return (
                    <button
                      key={fs.id}
                      type="button"
                      onClick={() => onChange({ ...config, frameStyle: fs.id })}
                      className={`flex flex-col p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1E1A17]">{tr.label}</span>
                      <span className="text-[11px] text-[#73685E] mt-0.5 leading-snug">
                        {tr.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step5.frameColorLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {FRAME_COLORS.map((fc) => {
                  const selected = config.frameColor === fc.id;
                  return (
                    <button
                      key={fc.id}
                      type="button"
                      onClick={() => onChange({ ...config, frameColor: fc.id })}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] text-[#1E1A17] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white text-[#524942] hover:border-[#C5B9A7]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: fc.base }}
                      />
                      <span className="whitespace-nowrap">{t.frameColors[fc.id]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#EFE8DC]">
              <span className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]">
                {t.configurator.step5.borderLabel}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BORDER_ELEMENTS.map((be) => {
                  const selected = config.borderElement === be.id;
                  return (
                    <button
                      key={be.id}
                      type="button"
                      onClick={() => onChange({ ...config, borderElement: be.id })}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer truncate ${
                        selected
                          ? 'border-[#7D1E28] bg-[#FDF8F6] text-[#1E1A17] ring-1 ring-[#7D1E28]'
                          : 'border-[#E6DFD3] bg-white text-[#524942] hover:border-[#C5B9A7]'
                      }`}
                    >
                      {t.borderElements[be.id]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#EFE8DC]">
              <label
                htmlFor="dedication-input"
                className="block text-xs font-medium uppercase tracking-wider text-[#5A5048]"
              >
                {t.configurator.step5.dedicationLabel}
              </label>
              <textarea
                id="dedication-input"
                rows={3}
                maxLength={140}
                value={config.dedication}
                onChange={(e) => onChange({ ...config, dedication: e.target.value })}
                placeholder={t.configurator.step5.dedicationPlaceholder}
                className="w-full rounded-lg border border-[#DCD2C2] bg-[#FCFBF8] px-3.5 py-2.5 text-sm text-[#1E1A17] placeholder:text-[#9D9286] focus:outline-none focus:border-[#7D1E28] focus:ring-1 focus:ring-[#7D1E28]"
              />

              <div className="flex flex-wrap gap-1.5">
                {t.sampleDedications.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange({ ...config, dedication: phrase })}
                    className="text-[11px] px-2.5 py-1 rounded border border-[#E5DDD0] bg-[#FAF7F2] text-[#5B5149] hover:border-[#7D1E28]/50 hover:text-[#1E1A17] transition-colors cursor-pointer text-left"
                  >
                    “{phrase.slice(0, 32)}…”
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label
                    htmlFor="signature-input"
                    className="block text-xs font-medium text-[#5A5048] mb-1"
                  >
                    {t.configurator.step5.signatureLabel}
                  </label>
                  <input
                    id="signature-input"
                    type="text"
                    maxLength={42}
                    value={config.signature}
                    onChange={(e) => onChange({ ...config, signature: e.target.value })}
                    placeholder={t.configurator.step5.signaturePlaceholder}
                    className="w-full rounded-lg border border-[#DCD2C2] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E1A17] placeholder:text-[#9D9286] focus:outline-none focus:border-[#7D1E28]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#5A5048] mb-1">
                    {t.configurator.step5.fontLabel}
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {DEDICATION_FONTS.map((df) => {
                      const active = config.dedicationFont === df.id;
                      return (
                        <button
                          key={df.id}
                          type="button"
                          onClick={() => onChange({ ...config, dedicationFont: df.id })}
                          className={`py-2 px-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer truncate ${
                            active
                              ? 'border-[#7D1E28] bg-[#FDF8F6] text-[#7D1E28]'
                              : 'border-[#E6DFD3] bg-white text-[#5A5048] hover:border-[#C5B9A7]'
                          }`}
                        >
                          {t.configurator.step5.fontShort[df.id]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Step Controls */}
      <div className="border-t border-[#EAE3D7] bg-[#FCFBF8] px-6 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onStepChange(Math.max(1, activeStep - 1) as StepId)}
          disabled={activeStep === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#DDD4C6] text-sm font-medium text-[#463E38] hover:bg-[#F3EDE3] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.configurator.back}</span>
        </button>

        {activeStep < 5 ? (
          <button
            type="button"
            onClick={() => onStepChange((activeStep + 1) as StepId)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#1E1A17] text-white text-sm font-medium hover:bg-[#342D28] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>{t.configurator.next}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#7D1E28] text-white text-sm font-medium hover:bg-[#64161F] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? t.nav.saving : t.configurator.savePng}</span>
          </button>
        )}
      </div>
    </section>
  );
}
