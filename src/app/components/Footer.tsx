import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://www.electra.co.il/filestock/file/1502610340683-0.png"
                alt="Electra"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Wiodący dostawca rozwiązań elektrycznych, instalacji i systemów energetycznych dla klientów komercyjnych i przemysłowych.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ElectraGroup.OfficialPage/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/14054/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC5e-PFzM7P4CFcS-nZmwsfQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/electragroup_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Szybkie linki</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Strona główna</Link></li>
              <li><Link to="/o-nas" className="hover:text-blue-400 transition-colors">O nas</Link></li>
              <li><Link to="/aktualnosci" className="hover:text-blue-400 transition-colors">Aktualności</Link></li>
              <li><Link to="/nasza-oferta" className="hover:text-blue-400 transition-colors">Nasza oferta</Link></li>
              <li><Link to="/projekty" className="hover:text-blue-400 transition-colors">Projekty</Link></li>
              <li><Link to="/dolacz-do-nas" className="hover:text-blue-400 transition-colors">Dołącz do nas</Link></li>
              <li><Link to="/kontakt" className="hover:text-blue-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Usługi</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Instalacje elektryczne</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Automatyzacja przemysłowa</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Rozwiązania energetyczne</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Serwis i wsparcie</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Zarządzanie projektami</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Aleje Jerozolimskie 134<br />05-500 Warszawa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a href="tel:+48123456789" className="hover:text-blue-400 transition-colors">
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a href="mailto:info@electra.co.pl" className="hover:text-blue-400 transition-colors">
                  info@electra.co.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Electra M&E Polska. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4">
            <Link to="/polityka-prywatnosci" className="hover:text-blue-400 transition-colors">Polityka prywatności</Link>
            <Link to="/rodo" className="hover:text-blue-400 transition-colors">RODO</Link>
            <Link to="/zglos-nieprawidlowosc" className="hover:text-blue-400 transition-colors">Zgłoś nieprawidłowość</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
