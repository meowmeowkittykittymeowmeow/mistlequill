import React, { useEffect, useState } from 'react';
import {
  CloudSnow,
  Mail,
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CHRISTMAS_TRACKS, musicPlayer } from '../audio/christmasMusic';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AtelierToolbarProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  snowEnabled: boolean;
  onToggleSnow: () => void;
  snowDensity: 'gentle' | 'rich';
  onToggleSnowDensity: () => void;
  showKraftEnvelope: boolean;
  onToggleKraftEnvelope: () => void;
}

export function AtelierToolbar({
  lang,
  onChangeLang,
  snowEnabled,
  onToggleSnow,
  snowDensity,
  onToggleSnowDensity,
  showKraftEnvelope,
  onToggleKraftEnvelope,
}: AtelierToolbarProps) {
  const [audioState, setAudioState] = useState(() => musicPlayer.getState());
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    return musicPlayer.subscribe(() => {
      setAudioState(musicPlayer.getState());
    });
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-white border border-[#E5DDD0] rounded-xl shadow-[0_4px_16px_rgba(30,24,18,0.03)]">
      {/* Christmas Music Selector */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => musicPlayer.toggle()}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            audioState.isPlaying
              ? 'bg-[#7D1E28] text-white'
              : 'bg-[#F3EDE3] text-[#1E1A17] hover:bg-[#E8DFD1]'
          }`}
          aria-label={audioState.isPlaying ? t.toolbar.pauseMusic : t.toolbar.playMusic}
        >
          {audioState.isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          <span>{audioState.isPlaying ? t.toolbar.pauseMusic : t.toolbar.playMusic}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <Music2 className="w-3.5 h-3.5 text-[#8C7F72] shrink-0" />
          <label htmlFor="track-select" className="sr-only">
            {t.toolbar.musicLabel}
          </label>
          <select
            id="track-select"
            value={audioState.trackId}
            onChange={(e) => {
              musicPlayer.setTrack(e.target.value);
              if (!audioState.isPlaying) {
                musicPlayer.play();
              }
            }}
            className="text-xs font-medium text-[#1E1A17] bg-[#FAF7F2] border border-[#E2D9C9] rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-[#7D1E28]"
          >
            {CHRISTMAS_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                {t.tracks[track.id] || track.title}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pl-1">
          <button
            type="button"
            onClick={() => musicPlayer.setVolume(audioState.volume > 0 ? 0 : 0.45)}
            className="p-1 text-[#6A6058] hover:text-[#1E1A17] cursor-pointer"
            aria-label="Volume"
          >
            {audioState.volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={0.85}
            step={0.05}
            value={audioState.volume}
            onChange={(e) => musicPlayer.setVolume(parseFloat(e.target.value))}
            aria-label="Music volume"
            className="w-16 accent-[#7D1E28] cursor-pointer"
          />
        </div>
      </div>

      {/* Snow, Envelope & Language Display Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleSnow}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            snowEnabled
              ? 'border-[#C9D6DE] bg-[#F3F7F9] text-[#2F4858]'
              : 'border-[#E5DDD0] bg-white text-[#6A6058] hover:text-[#1E1A17]'
          }`}
        >
          <CloudSnow className="w-3.5 h-3.5" />
          <span>{snowEnabled ? t.toolbar.snowOn : t.toolbar.snowOff}</span>
        </button>

        {snowEnabled && (
          <button
            type="button"
            onClick={onToggleSnowDensity}
            className="px-2.5 py-1.5 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] text-xs font-medium text-[#524942] hover:border-[#C5B9A7] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {snowDensity === 'rich' ? t.toolbar.snowRich : t.toolbar.snowGentle}
          </button>
        )}

        <button
          type="button"
          onClick={onToggleKraftEnvelope}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            showKraftEnvelope
              ? 'border-[#B89D7D] bg-[#FBF6EF] text-[#5B4128]'
              : 'border-[#E5DDD0] bg-white text-[#6A6058] hover:text-[#1E1A17]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{t.toolbar.envelopeFull}</span>
          <span className="md:hidden">{t.toolbar.envelopeShort}</span>
        </button>

        {/* EN / PL Language Switcher */}
        <div
          className="inline-flex items-center p-0.5 rounded-lg bg-[#F3EDE3] border border-[#E5DDD0]"
          role="group"
          aria-label="Language"
        >
          {(['en', 'pl'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onChangeLang(code)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                lang === code
                  ? 'bg-white text-[#1E1A17] shadow-xs'
                  : 'text-[#6A6058] hover:text-[#1E1A17]'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
