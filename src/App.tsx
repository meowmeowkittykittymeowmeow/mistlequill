import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Download } from 'lucide-react';
import { musicPlayer } from './audio/christmasMusic';
import { AtelierToolbar } from './components/AtelierToolbar';
import { CardArtworkSVG } from './components/CardArtworkSVG';
import { ConfiguratorPanel, StepId } from './components/ConfiguratorPanel';
import { EditorialSections, LegalModal } from './components/EditorialAndLegal';
import { InteractiveSnowCanvas } from './components/InteractiveSnowCanvas';
import { EDITORIAL_CONTENT, LegalDocId } from './data/editorialContent';
import { Language, TRANSLATIONS } from './i18n/translations';
import {
  CARD_PRESETS,
  CardConfig,
  DEFAULT_CARD_CONFIG,
} from './types/card';
import { exportCardToPng } from './utils/exportCard';

function localizeDefaultConfig(base: CardConfig, lang: Language): CardConfig {
  const t = TRANSLATIONS[lang];
  return {
    ...base,
    dedication: t.sampleDedications[0],
    signature: t.defaultSignature,
  };
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [config, setConfig] = useState<CardConfig>(() =>
    localizeDefaultConfig(DEFAULT_CARD_CONFIG, 'en')
  );
  const [activePresetId, setActivePresetId] = useState<string>(CARD_PRESETS[0].id);
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [snowDensity, setSnowDensity] = useState<'gentle' | 'rich'>('gentle');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocId | null>(null);

  const cardSvgRef = useRef<SVGSVGElement | null>(null);
  const studioRef = useRef<HTMLDivElement | null>(null);
  const presetsRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[lang];
  const editorial = EDITORIAL_CONTENT[lang];

  useEffect(() => {
    document.title = t.docTitle;
    document.documentElement.lang = lang;
  }, [lang, t.docTitle]);

  const handleLanguageChange = (nextLang: Language) => {
    if (nextLang === lang) return;
    const prevT = TRANSLATIONS[lang];
    const nextT = TRANSLATIONS[nextLang];

    let nextDedication = config.dedication;
    const sampleIdx = prevT.sampleDedications.indexOf(config.dedication);
    if (sampleIdx !== -1) {
      nextDedication = nextT.sampleDedications[sampleIdx] || nextT.sampleDedications[0];
    }

    let nextSignature = config.signature;
    if (
      config.signature === prevT.defaultSignature ||
      config.signature === 'Całuję mocno, Zosia' ||
      config.signature === 'Rodzina Kowalskich'
    ) {
      nextSignature = nextT.defaultSignature;
    }

    setConfig((prev) => ({
      ...prev,
      dedication: nextDedication,
      signature: nextSignature,
    }));
    setLang(nextLang);
    setExportNotice(null);
  };

  const handleConfigChange = (next: CardConfig) => {
    setConfig(next);
    setActivePresetId('custom');
  };

  const applyPreset = (presetId: string) => {
    const foundIndex = CARD_PRESETS.findIndex((p) => p.id === presetId);
    if (foundIndex === -1) return;
    const found = CARD_PRESETS[foundIndex];
    const sampleDedication =
      t.sampleDedications[foundIndex % t.sampleDedications.length] || t.sampleDedications[0];
    const sig = found.config.signature ? t.defaultSignature : '';

    setConfig({
      ...found.config,
      dedication: sampleDedication,
      signature: sig,
    });
    setActivePresetId(found.id);
  };

  const handleApplyWishFromLibrary = (wish: string) => {
    setConfig((prev) => ({ ...prev, dedication: wish }));
    setActivePresetId('custom');
    setActiveStep(5);
    studioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setConfig(localizeDefaultConfig(DEFAULT_CARD_CONFIG, lang));
    setActivePresetId(CARD_PRESETS[0].id);
    setActiveStep(1);
    setExportNotice(t.canvas.resetNotice);
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleDownload = async () => {
    if (!cardSvgRef.current || isExporting) return;
    setIsExporting(true);
    setExportNotice(null);
    try {
      await exportCardToPng(cardSvgRef.current, config, t.canvas.downloadFilename);
      setExportNotice(t.canvas.exportSuccess);
      setTimeout(() => setExportNotice(null), 4000);
    } catch {
      setExportNotice(t.canvas.exportError);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-[#1E1A17]">
      {/* Continuous Interactive Snowfall Layer */}
      <InteractiveSnowCanvas enabled={snowEnabled} density={snowDensity} />

      {/* 3-Zone Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7DFD2]">
        <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element brand wordmark */}
          <a
            href="#top"
            className="font-editorial text-2xl font-semibold tracking-tight text-[#1E1A17] whitespace-nowrap shrink-0"
          >
            {t.brand}
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Studio navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A5048]"
          >
            <button
              type="button"
              onClick={() => presetsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.inspirations}
            </button>
            <button
              type="button"
              onClick={() => studioRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.studio}
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById('wishes-guide')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'en' ? 'Wishes & Print' : 'Życzenia i Druk'}
            </button>
            <button
              type="button"
              onClick={() => musicPlayer.toggle()}
              className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.music}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.reset}
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7D1E28] text-white text-xs font-medium hover:bg-[#64161F] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? t.nav.saving : t.nav.saveCard}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 pt-7 pb-14 space-y-12">
          <div className="space-y-7">
            {/* Editorial Header + Curated Presets */}
            <div
              ref={presetsRef}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5DDD0]"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-[#7D7064] tracking-wide">
                  <span>{t.hero.kicker1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.hero.kicker2}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.hero.kicker3}</span>
                </div>
                <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1E1A17] mt-1.5 leading-tight text-balance">
                  {t.hero.title}
                </h1>
              </div>

              {/* Boutique Curated Presets */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#7D7064]">
                  {t.hero.presetsLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {CARD_PRESETS.map((preset) => {
                    const selected = activePresetId === preset.id;
                    const label = t.presets[preset.id]?.name || preset.name;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                          selected
                            ? 'border-[#7D1E28] bg-[#7D1E28] text-white'
                            : 'border-[#DFD6C7] bg-white text-[#4A413A] hover:border-[#B6A792]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Two-Column Studio Workspace */}
            <div
              ref={studioRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: 5-Step Configurator */}
              <div className="lg:col-span-5 xl:col-span-5">
                <ConfiguratorPanel
                  lang={lang}
                  config={config}
                  onChange={handleConfigChange}
                  activeStep={activeStep}
                  onStepChange={setActiveStep}
                  onDownload={handleDownload}
                  isExporting={isExporting}
                />
              </div>

              {/* Right Column: Music/Snow Toolbar + Interactive Card Canvas */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-4">
                <AtelierToolbar
                  lang={lang}
                  onChangeLang={handleLanguageChange}
                  snowEnabled={snowEnabled}
                  onToggleSnow={() => setSnowEnabled((v) => !v)}
                  snowDensity={snowDensity}
                  onToggleSnowDensity={() =>
                    setSnowDensity((d) => (d === 'gentle' ? 'rich' : 'gentle'))
                  }
                  showKraftEnvelope={config.showKraftEnvelope}
                  onToggleKraftEnvelope={() =>
                    handleConfigChange({
                      ...config,
                      showKraftEnvelope: !config.showKraftEnvelope,
                    })
                  }
                />

                {/* Studio Linen Mat Showcase */}
                <div className="bg-[#EFE9DE] border border-[#E2D9C8] rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-full max-w-[400px] mx-auto">
                    <CardArtworkSVG
                      config={config}
                      svgRef={cardSvgRef}
                      interactive={true}
                    />
                  </div>

                  {/* Subtle interaction hint & export feedback */}
                  <div className="mt-6 text-center space-y-1.5">
                    <p className="text-xs text-[#6B6056]">
                      {t.canvas.hint}
                    </p>
                    {exportNotice && (
                      <p
                        role="status"
                        className="text-xs font-medium text-[#7D1E28]"
                      >
                        {exportNotice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rich Editorial Guide & Wishes Library (AdSense-ready content) */}
          <EditorialSections
            lang={lang}
            currentDedication={config.dedication}
            onApplyWish={handleApplyWishFromLibrary}
          />
        </div>
      </main>

      {/* Clean Footer with Mandatory Trust & Legal Links */}
      <footer className="relative z-10 border-t border-[#E7DFD2] bg-[#FAF7F2]/90">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6E6358]">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span className="font-medium text-[#1E1A17]">{t.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.right}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <nav aria-label="Legal and site information" className="flex flex-wrap items-center gap-5">
              {(['about', 'privacy', 'terms', 'contact'] as LegalDocId[]).map((docId) => (
                <button
                  key={docId}
                  type="button"
                  onClick={() => setActiveLegalDoc(docId)}
                  className="hover:text-[#7D1E28] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editorial.legalNav[docId]}
                </button>
              ))}
            </nav>

            <a
              href="https://buymeacoffee.com/mistlequill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D8C6A8] bg-[#FDF8EC] text-[#5B4322] font-medium hover:border-[#B08D57] hover:bg-[#FAF1DC] transition-colors whitespace-nowrap"
            >
              <Coffee className="w-3.5 h-3.5 text-[#9C763B]" />
              <span>{t.footer.buyMeACoffee}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Legal & Contact Modal */}
      <LegalModal
        lang={lang}
        docId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />
    </div>
  );
}
