import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { EDITORIAL_CONTENT, LegalDocId } from '../data/editorialContent';
import { Language } from '../i18n/translations';

interface EditorialSectionsProps {
  lang: Language;
  currentDedication: string;
  onApplyWish: (wish: string) => void;
}

export function EditorialSections({
  lang,
  currentDedication,
  onApplyWish,
}: EditorialSectionsProps) {
  const content = EDITORIAL_CONTENT[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-14 pt-8 border-t border-[#E5DDD0]">
      {/* Section 1: Holiday Wishes Library */}
      <section id="wishes-guide" className="space-y-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
            {content.wishesSection.kicker}
          </p>
          <h2 className="font-editorial text-3xl font-semibold text-[#1E1A17] mt-1 text-balance">
            {content.wishesSection.title}
          </h2>
          <p className="text-sm text-[#5E544C] mt-2 leading-relaxed">
            {content.wishesSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.wishesSection.categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-[#E5DDD0] rounded-xl p-5 space-y-4"
            >
              <h3 className="font-editorial text-xl font-semibold text-[#1E1A17] pb-2 border-b border-[#EFE8DC]">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((wish, idx) => {
                  const isApplied = currentDedication.trim() === wish.trim();
                  return (
                    <li key={idx} className="space-y-2">
                      <p className="text-sm text-[#3F3731] leading-relaxed italic font-editorial text-base">
                        “{wish}”
                      </p>
                      <button
                        type="button"
                        onClick={() => onApplyWish(wish)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
                          isApplied
                            ? 'border-[#7D1E28] bg-[#7D1E28] text-white'
                            : 'border-[#DFD6C7] bg-[#FAF7F2] text-[#463E38] hover:border-[#7D1E28] hover:text-[#7D1E28]'
                        }`}
                      >
                        {isApplied
                          ? content.wishesSection.appliedBtn
                          : content.wishesSection.applyBtn}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Print & Paper Craft Guide */}
      <section id="print-guide" className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
            {content.printGuide.kicker}
          </p>
          <h2 className="font-editorial text-3xl font-semibold text-[#1E1A17] mt-1 text-balance">
            {content.printGuide.title}
          </h2>
          <p className="text-sm text-[#5E544C] mt-2 leading-relaxed max-w-2xl">
            {content.printGuide.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.printGuide.tips.map((tip, idx) => (
            <article
              key={idx}
              className="bg-white border border-[#E5DDD0] rounded-xl p-5 space-y-2"
            >
              <h3 className="text-sm font-semibold text-[#1E1A17]">{tip.title}</h3>
              <p className="text-sm text-[#5B5149] leading-relaxed">{tip.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section id="faq" className="space-y-6 max-w-3xl">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C7F72]">
            {content.faqSection.kicker}
          </p>
          <h2 className="font-editorial text-3xl font-semibold text-[#1E1A17] mt-1 text-balance">
            {content.faqSection.title}
          </h2>
        </div>

        <div className="bg-white border border-[#E5DDD0] rounded-xl divide-y divide-[#EFE8DC]">
          {content.faqSection.items.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#FCFBF8] transition-colors"
                >
                  <span className="text-sm font-medium text-[#1E1A17]">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7D7064] shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[#5B5149] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

interface LegalModalProps {
  lang: Language;
  docId: LegalDocId | null;
  onClose: () => void;
}

export function LegalModal({ lang, docId, onClose }: LegalModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!docId) return null;

  const content = EDITORIAL_CONTENT[lang];
  const doc = content.legalDocs[docId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[85vh] bg-[#FAF7F2] border border-[#DFD6C7] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 bg-white border-b border-[#EAE3D7]">
          <div>
            <h2 id="legal-modal-title" className="font-editorial text-2xl font-semibold text-[#1E1A17]">
              {doc.title}
            </h2>
            <p className="text-xs text-[#7D7064] mt-0.5">{doc.updated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#6A6058] hover:text-[#1E1A17] hover:bg-[#F3EDE3] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto atelier-scroll space-y-4 text-sm text-[#4A413A] leading-relaxed">
          {doc.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          {docId === 'contact' && (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#5A5048] mb-1">
                  {content.contactForm.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#DCD2C2] bg-white px-3 py-2 text-sm text-[#1E1A17] focus:outline-none focus:border-[#7D1E28]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5A5048] mb-1">
                  {content.contactForm.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#DCD2C2] bg-white px-3 py-2 text-sm text-[#1E1A17] focus:outline-none focus:border-[#7D1E28]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5A5048] mb-1">
                  {content.contactForm.messageLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-[#DCD2C2] bg-white px-3 py-2 text-sm text-[#1E1A17] focus:outline-none focus:border-[#7D1E28]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#7D1E28] text-white text-xs font-medium hover:bg-[#64161F] transition-colors cursor-pointer"
              >
                {content.contactForm.sendBtn}
              </button>
              {sent && (
                <p role="status" className="text-xs font-medium text-[#2D4A36] pt-1">
                  {content.contactForm.sentMsg}
                </p>
              )}
              <p className="text-xs text-[#7D7064] pt-2 border-t border-[#E7DFD2]">
                {content.contactForm.ownerEmailNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
