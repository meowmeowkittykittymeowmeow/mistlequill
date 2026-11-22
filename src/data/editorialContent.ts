import { Language } from '../i18n/translations';

export type LegalDocId = 'privacy' | 'terms' | 'about' | 'contact';

export interface WishCategory {
  id: string;
  title: string;
  items: string[];
}

export interface PrintTip {
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface EditorialBundle {
  wishesSection: {
    kicker: string;
    title: string;
    subtitle: string;
    applyBtn: string;
    appliedBtn: string;
    categories: WishCategory[];
  };
  printGuide: {
    kicker: string;
    title: string;
    intro: string;
    tips: PrintTip[];
  };
  faqSection: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  legalNav: Record<LegalDocId, string>;
  legalDocs: Record<
    LegalDocId,
    {
      title: string;
      updated: string;
      paragraphs: string[];
    }
  >;
  contactForm: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendBtn: string;
    sentMsg: string;
    ownerEmailNote: string;
  };
}

export const EDITORIAL_CONTENT: Record<Language, EditorialBundle> = {
  en: {
    wishesSection: {
      kicker: 'Holiday Writing Guide',
      title: 'Curated Christmas & New Year wishes',
      subtitle:
        'Not sure what to write inside the frame? Browse our hand-written seasonal sentiments below and click any note to place it directly onto your card.',
      applyBtn: 'Use on card',
      appliedBtn: 'Applied',
      categories: [
        {
          id: 'warm',
          title: 'Warm & Family',
          items: [
            'Wishing you a warm, merry & bright Christmas surrounded by the ones you love.',
            'May your home be filled with evergreen scent, soft candlelight, and quiet winter joy.',
            'Sending the warmest holiday wishes from our table to yours this Christmas season.',
          ],
        },
        {
          id: 'poetic',
          title: 'Poetic & Classic',
          items: [
            'May your holidays sparkle with peace, timeless wonder, and gentle winter light.',
            'Wishing you a season of slow mornings, heartfelt laughter, and bright new beginnings.',
            'Peace on earth, warmth at home, and every happiness throughout the coming year.',
          ],
        },
        {
          id: 'short',
          title: 'Short & Minimalist',
          items: [
            'merry & bright - warmest wishes straight from the heart.',
            'Joy to you and yours this Christmas and always.',
            'Season’s Greetings and a joyful, prosperous New Year.',
          ],
        },
      ],
    },
    printGuide: {
      kicker: 'Print & Paper Atelier',
      title: 'How to print your illustrated card for a boutique finish',
      intro:
        'Every card exported from Mistlequill is rendered at 1500×2100 pixels (a classic 5×7 inch stationery ratio at 300 DPI), making it ready for crisp home printing or local print-shop production.',
      tips: [
        {
          title: '01. Recommended Paper Stock',
          body: 'Choose uncoated cotton, linen, or lightly textured watercolor cardstock between 270 gsm and 320 gsm. Natural warm off-white or cream paper preserves the hand-painted ink aesthetic far better than glossy photo paper.',
        },
        {
          title: '02. Color & Print Settings',
          body: 'Select “Actual Size” or “100% Scale” in your printer dialog on 5×7" (A7) pre-cut cards, or print on A4/Letter cardstock with light crop marks. Set quality to “Best / High” and paper type to “Matte Presentation / Cardstock”.',
        },
        {
          title: '03. Envelopes & Finishing Touches',
          body: 'Pair your finished card with a kraft brown, sage green, or deckle-edged ivory A7 envelope (5.25×7.25 inches). Adding a brass wax seal or twine ribbon complements the watercolor frame.',
        },
      ],
    },
    faqSection: {
      kicker: 'Frequently Asked Questions',
      title: 'Everything about creating & saving cards',
      items: [
        {
          q: 'Is the card maker completely free to use?',
          a: 'Yes. You can customize the tree, all three bauble types, garlands, topper, paper pattern, frame, and dedication, then download your high-resolution PNG card free of charge.',
        },
        {
          q: 'Where are my card designs and dedications stored?',
          a: 'Everything happens locally inside your own web browser. Your custom text and design choices are never uploaded to an external server or shared with third parties.',
        },
        {
          q: 'Can I print the downloaded PNG at a professional print shop?',
          a: 'Yes. The exported PNG measures 1500×2100 px, which corresponds to a standard 5×7 inch greeting card at 300 DPI print resolution.',
        },
        {
          q: 'Why does the tree sway and why are baubles interactive?',
          a: 'Mistlequill uses lightweight real-time physics in your browser so moving your cursor over the illustration gently sways the branches and swings each hanging ornament on its thread.',
        },
      ],
    },
    legalNav: {
      about: 'About',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      contact: 'Contact',
    },
    legalDocs: {
      about: {
        title: 'About Mistlequill',
        updated: 'Updated: November 2026',
        paragraphs: [
          'Mistlequill is an independent digital stationery studio created for people who appreciate hand-painted watercolor, fountain-pen ink linework, and thoughtful holiday traditions.',
          'Our interactive card builder lets you compose bespoke Christmas greeting cards step by step - from choosing the evergreen palette and three distinct bauble styles to framing your personal dedication inside heirloom borders.',
          'All illustrations, seasonal melodies, and snowfall effects run directly in your browser with no account registration required.',
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        updated: 'Effective Date: November 22, 2026',
        paragraphs: [
          'Your privacy matters to us. Mistlequill processes your card customizations, dedications, and image exports locally inside your web browser and does not collect or store your personal messages on our servers.',
          'Cookies & Advertising Partners: Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this website or other websites on the internet. Google’s use of advertising cookies enables it and its partners to serve ads based on visits to this site and/or other sites.',
          'Managing Ad Preferences: You may opt out of personalized advertising at any time by visiting Google Ads Settings (adssettings.google.com) or aboutads.info.',
          'Analytics & Consent: Where required by applicable law (including GDPR / EEA regulations), consent preferences for non-essential cookies are respected before personalized advertising cookies are set.',
          'Contact for Privacy Inquiries: If you have questions regarding this Privacy Policy or wish to exercise your data protection rights, please reach out via the Contact page.',
        ],
      },
      terms: {
        title: 'Terms of Use',
        updated: 'Effective Date: November 22, 2026',
        paragraphs: [
          'By accessing and using Mistlequill, you agree to use the card creator for lawful personal, family, and non-commercial greeting purposes.',
          'You retain full responsibility for the custom text and dedications you enter onto your exported greeting cards.',
          'All procedural illustrations, interface designs, and original site copy remain the property of the site publisher. The service is provided on an “as-is” basis without warranties of any kind.',
        ],
      },
      contact: {
        title: 'Contact the Studio',
        updated: 'We respond within 1–2 business days',
        paragraphs: [
          'Have a question about printing your card, suggesting a new seasonal frame, or reporting an issue? Send us a note using the form below.',
        ],
      },
    },
    contactForm: {
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      messageLabel: 'Message',
      sendBtn: 'Send Message',
      sentMsg: 'Thank you! Your message has been prepared. You can also reach us directly at the studio email listed below.',
      ownerEmailNote: 'Studio inquiries: mistlequill@gmail.com',
    },
  },
  pl: {
    wishesSection: {
      kicker: 'Biblioteka Życzeń Świątecznych',
      title: 'Gotowe dedykacje i sentencje na kartkę',
      subtitle:
        'Szukasz eleganckich słów do wpisania wewnątrz ramki? Wybierz jedną z przygotowanych propozycji poniżej - jednym kliknięciem przeniesiesz ją na swoją kartkę.',
      applyBtn: 'Użyj na kartce',
      appliedBtn: 'Wybrano',
      categories: [
        {
          id: 'warm',
          title: 'Rodzinne i ciepłe',
          items: [
            'Wesołych Świąt pełnych ciepła, światła i bliskich serc przy wspólnym stole.',
            'Niech ten zimowy czas przyniesie spokój, zapach świerku i najpiękniejsze rozmowy.',
            'Najcieplejsze życzenia Bożonarodzeniowe prosto od naszej rodziny dla Was.',
          ],
        },
        {
          id: 'poetic',
          title: 'Poetyckie i klasyczne',
          items: [
            'Niech te Święta przyniosą ciszę, zachwyt i światło na cały nadchodzący rok.',
            'Spokojnych poranków, życzliwości i drobnych cudów każdego dnia Nowego Roku.',
            'Magicznych Świąt Bożego Narodzenia oraz pomyślności w Nowym Roku.',
          ],
        },
        {
          id: 'short',
          title: 'Krótkie i minimalistyczne',
          items: [
            'merry & bright - najcieplejsze życzenia prosto z serca.',
            'Radosnych, pełnych blasku Świąt Bożego Narodzenia.',
            'Wesołych Świąt i szczęśliwego Nowego Roku.',
          ],
        },
      ],
    },
    printGuide: {
      kicker: 'Poradnik Druku i Papeterii',
      title: 'Jak wydrukować kartkę, by wyglądała jak z butiku',
      intro:
        'Każda kartka pobrana z pracowni Mistlequill ma rozdzielczość 1500×2100 pikseli (klasyczny format pocztówki 5×7 cali w jakości 300 DPI), dzięki czemu nadaje się zarówno do domowej drukarki, jak i profesjonalnej drukarni.',
      tips: [
        {
          title: '01. Wybór odpowiedniego papieru',
          body: 'Najlepiej sprawdzi się niepowlekany papier bawełniany, lniany lub fakturowany karton akwarelowy o gramaturze 270–320 g/m². Naturalny kremowy odcień pięknie podkreśla akwarelowe przejścia i kontury piórkiem.',
        },
        {
          title: '02. Ustawienia druku',
          body: 'W oknie drukowania wybierz opcję „Rozmiar rzeczywisty / 100%” na formacie 5×7 cali (A7) albo wydrukuj na arkuszu A4 i przytnij wzdłuż krawędzi. Ustaw jakość wydruku na „Wysoka” i profil papieru matowego.',
        },
        {
          title: '03. Koperta i wykończenie',
          body: 'Gotową kartkę włóż do koperty kraftowej, szałwiowej lub kremowej w rozmiarze 13×18 cm (A7). Całość świetnie dopełni lakowa pieczęć albo jutowy sznureczek.',
        },
      ],
    },
    faqSection: {
      kicker: 'Najczęstsze Pytania',
      title: 'Wszystko o tworzeniu i zapisie kartek',
      items: [
        {
          q: 'Czy korzystanie z kreatora kartek jest darmowe?',
          a: 'Tak. Możesz dowolnie zmieniać kolory drzewka, 3 rodzaje bombek, łańcuchy, zwieńczenie, ramkę i dedykację oraz bezpłatnie pobrać plik PNG.',
        },
        {
          q: 'Czy moje życzenia są gdzieś zapisywane?',
          a: 'Nie. Cały projekt i wpisana dedykacja są przetwarzane wyłącznie lokalnie w Twojej przeglądarce i nie są nigdzie wysyłane.',
        },
        {
          q: 'Czy pobrany plik nadaje się do druku?',
          a: 'Tak, plik PNG zapisuje się w wymiarze 1500×2100 px, co odpowiada pocztówce 5×7 cali przy gęstości 300 DPI.',
        },
        {
          q: 'Jak działa interaktywna choinka i bombki?',
          a: 'Poruszanie kursorem po ilustracji delikatnie kołysze gałązkami i bombkami zawieszonymi na sznureczkach, a kliknięcie w wybraną bombkę dodatkowo ją rozbuja.',
        },
      ],
    },
    legalNav: {
      about: 'O pracowni',
      privacy: 'Polityka prywatności',
      terms: 'Regulamin',
      contact: 'Kontakt',
    },
    legalDocs: {
      about: {
        title: 'O pracowni Mistlequill',
        updated: 'Aktualizacja: listopad 2026',
        paragraphs: [
          'Mistlequill to niezależna pracownia cyfrowej papeterii stworzona z miłości do akwareli, ręcznego rysunku tuszem i świątecznych tradycji.',
          'Nasz kreator pozwala krok po kroku zaprojektować własną kartkę bożonarodzeniową - od odcienia igliwia i trzech rodzajów bombek, aż po dekoracyjną ramkę i osobistą dedykację.',
          'Wszystkie ilustracje, melodie pozytywki oraz opadający śnieg działają bezpośrednio w przeglądarce bez potrzeby zakładania konta.',
        ],
      },
      privacy: {
        title: 'Polityka Prywatności',
        updated: 'Obowiązuje od: 22 listopada 2026',
        paragraphs: [
          'Szanujemy Twoją prywatność. Kreator kartek przetwarza wybrane ustawienia graficzne i wpisane dedykacje wyłącznie lokalnie w Twojej przeglądarce i nie gromadzi ich na zewnętrznych serwerach.',
          'Pliki cookie i partnerzy reklamowi: Dostawcy zewnętrzni, w tym Google, mogą używać plików cookie do wyświetlania reklam na podstawie wcześniejszych odwiedzin użytkownika w tej witrynie lub w innych witrynach w internecie.',
          'Zarządzanie reklamami: Użytkownik może w każdej chwili zrezygnować ze spersonalizowanych reklam w Ustawieniach reklam Google (adssettings.google.com) lub na stronie aboutads.info.',
          'RODO / Zgody: W zakresie wymaganym przez prawo Unii Europejskiej (RODO) przed uruchomieniem opcjonalnych plików cookie reklamowych zbierana jest odpowiednia zgoda użytkownika.',
          'Kontakt w sprawach prywatności: Wszelkie pytania dotyczące ochrony danych można kierować za pośrednictwem zakładki Kontakt.',
        ],
      },
      terms: {
        title: 'Regulamin Korzystania',
        updated: 'Obowiązuje od: 22 listopada 2026',
        paragraphs: [
          'Korzystając z serwisu Winterquill, zobowiązujesz się do używania kreatora w celach osobistych, rodzinnych i niekomercyjnych zgodnych z prawem.',
          'Użytkownik ponosi wyłączną odpowiedzialność za treść własnych dedykacji i podpisów umieszczanych na generowanych kartkach.',
          'Kod, układ strony oraz generowane elementy graficzne należą do wydawcy serwisu. Narzędzie udostępniane jest w stanie „tak jak jest” (as-is).',
        ],
      },
      contact: {
        title: 'Kontakt z Pracownią',
        updated: 'Odpowiadamy w ciągu 1–2 dni roboczych',
        paragraphs: [
          'Masz pytanie dotyczące druku kartki, propozycję nowego wzoru lub chcesz zgłosić uwagę techniczną? Skorzystaj z formularza poniżej.',
        ],
      },
    },
    contactForm: {
      nameLabel: 'Imię',
      emailLabel: 'Adres e-mail',
      messageLabel: 'Wiadomość',
      sendBtn: 'Wyślij wiadomość',
      sentMsg: 'Dziękujemy! Wiadomość została przygotowana. Bezpośredni adres pracowni znajduje się poniżej.',
      ownerEmailNote: 'Kontakt z pracownią: mistlequill@gmail.com',
    },
  },
};
