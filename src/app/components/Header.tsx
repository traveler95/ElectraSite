import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Home, Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

type NavItem = {
  path: string;
  label: string;
  isIcon?: boolean;
  external?: boolean;
  children?: NavItem[];
};

const navLinks: NavItem[] = [
  { path: "/", label: "Strona główna", isIcon: true },
  {
    path: "/o-nas",
    label: "O nas",
    children: [
      { path: "/o-nas/w-skrocie", label: "W skrócie" },
      { path: "/o-nas/zarzad", label: "Zarząd" },
      { path: "/o-nas/film-korporacyjny", label: "Film korporacyjny" },
      { path: "/o-nas/kodeks-etyki", label: "Kodeks Etyki" },
      { path: "/o-nas/rowne-szanse", label: "Równe Szanse" },
      { path: "/o-nas/certyfikaty", label: "Certyfikaty" },
      { path: "/o-nas/klienci", label: "Klienci" },
      { path: "https://www.electra.co.il/en", label: "Electra Group", external: true },
      { path: "/o-nas/strategia-podatkowa", label: "Strategia podatkowa" },
    ],
  },
  { path: "/aktualnosci", label: "Aktualności" },
  {
    path: "/nasza-oferta",
    label: "Nasza oferta",
    children: [
      { path: "/nasza-oferta/wykonawstwo-instalacji", label: "Wykonawstwo instalacji" },
      { path: "/nasza-oferta/techniczny-facility-management", label: "Techniczny Facility Management" },
    ],
  },
  {
    path: "/projekty",
    label: "Projekty",
    children: [
      { path: "/projekty/obiekty-biurowe", label: "Obiekty biurowe" },
      { path: "/projekty/obiekty-mieszkalne", label: "Obiekty mieszkalne" },
      { path: "/projekty/obiekty-przemyslowe-i-magazynowe", label: "Obiekty przemysłowe i magazynowe" },
      { path: "/projekty/obiekty-uzytecznosci-publicznej", label: "Obiekty użyteczności publicznej" },
      { path: "/projekty/przemysl-energetyczny", label: "Przemysł energetyczny" },
      { path: "/projekty/przemysl-samochodowy", label: "Przemysł samochodowy" },
    ],
  },
  { path: "/dolacz-do-nas", label: "Dołącz do nas" },
  { path: "/rodo", label: "RODO" },
  { path: "/do-pobrania", label: "Do pobrania" },
  { path: "/zglos-nieprawidlowosc", label: "Zgłoś nieprawidłowość" },
  { path: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();

  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98]);
  const borderRadius = useTransform(scrollY, [0, 50], [16, 0]);
  const topPosition = useTransform(scrollY, [0, 50], [12, 0]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: NavItem) => {
    if (isActive(item.path)) return true;
    return item.children?.some(c => isActive(c.path)) ?? false;
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 z-50"
        style={{ top: topPosition }}
      >
        <motion.div
          className="mx-auto backdrop-blur-xl bg-black/80 shadow-2xl border-b border-white/10"
          style={{ borderRadius }}
        >
          <nav className="px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img
                  src="https://www.electra.co.il/filestock/file/1502610340683-0.png"
                  alt="Electra"
                  className="h-9 w-auto brightness-0 invert"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-0.5 flex-wrap">
                {navLinks.map((link) => {
                  const active = isParentActive(link);
                  const hasChildren = !!link.children;
                  const isOpen = openDropdown === link.path;

                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => hasChildren && setOpenDropdown(link.path)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.isIcon ? (
                        <Link
                          to={link.path}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            active ? "bg-white/20 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <Home className="w-4 h-4" />
                        </Link>
                      ) : (
                        <Link
                          to={link.path}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            active ? "bg-white/20 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {link.label}
                          {hasChildren && (
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          )}
                        </Link>
                      )}

                      {/* Dropdown */}
                      <AnimatePresence>
                        {hasChildren && isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-64 z-50"
                          >
                            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
                              {link.children!.map((child) => (
                                child.external ? (
                                  <a
                                    key={child.path}
                                    href={child.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.label}
                                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                  </a>
                                ) : (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className={`block px-4 py-2.5 text-sm transition-colors ${
                                      isActive(child.path)
                                        ? "text-white bg-blue-600"
                                        : "text-gray-300 hover:text-white hover:bg-white/10"
                                    }`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <img src="https://www.electra.co.il/filestock/file/1502610340683-0.png" alt="Electra" className="h-8 w-auto brightness-0 invert" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const active = isParentActive(link);
                  const hasChildren = !!link.children;
                  const isExpanded = expandedMobile === link.path;

                  return (
                    <div key={link.path}>
                      <div className="flex items-center">
                        {link.isIcon ? (
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              active ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <Home className="w-4 h-4" />
                            Strona główna
                          </Link>
                        ) : (
                          <Link
                            to={link.path}
                            onClick={() => !hasChildren && setMobileMenuOpen(false)}
                            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              active ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {link.label}
                          </Link>
                        )}
                        {hasChildren && (
                          <button
                            onClick={() => setExpandedMobile(isExpanded ? null : link.path)}
                            className="p-2.5 text-gray-400 hover:text-white"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>

                      {/* Mobile submenu */}
                      <AnimatePresence>
                        {hasChildren && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                              {link.children!.map((child) => (
                                child.external ? (
                                  <a
                                    key={child.path}
                                    href={child.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                  >
                                    {child.label}
                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                  </a>
                                ) : (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                      isActive(child.path)
                                        ? "text-blue-400 bg-blue-500/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 mt-4">
                <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} Electra M&E Polska</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
