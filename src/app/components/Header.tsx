import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Home, Globe, Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

type NavItem = {
  path: string;
  label: string;
  isIcon?: boolean;
  external?: boolean;
  isV2?: boolean;
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
  { path: "/v2", label: "V2", isV2: true },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("PL");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 100], [0.2, 0.4]);
  const glowOpacity = useTransform(scrollY, [0, 100], [0.15, 0.3]);
  const topPosition = useTransform(scrollY, [0, 50], [24, 0]);
  const menuWidth = useTransform(scrollY, [0, 50], ["95%", "100%"]);
  const borderRadius = useTransform(scrollY, [0, 50], [16, 0]);

  const languages = [
    { code: "PL", name: "Polski" },
    { code: "EN", name: "English" },
    { code: "DE", name: "Deutsch" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: NavItem) => {
    if (isActive(item.path)) return true;
    return item.children?.some(c => !c.external && isActive(c.path)) ?? false;
  };

  return (
    <>
      {/* Floating Glass Navigation */}
      <motion.header
        className="fixed left-1/2 -translate-x-1/2 z-50 max-w-none"
        style={{ top: topPosition, width: menuWidth }}
      >
        <div className="relative">
          {/* Glow Effect */}
          <motion.div
            style={{ opacity: glowOpacity, borderRadius }}
            className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-sm transition-opacity duration-500"
          />

          {/* Main Glass Panel */}
          <motion.div
            className="relative backdrop-blur-xl bg-black/[0.26] shadow-2xl shadow-black/10 transition-all duration-500"
            style={{
              borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius,
            }}
          >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius }}>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  background: [
                    "linear-gradient(0deg, rgba(59,130,246,0.1) 0%, transparent 100%)",
                    "linear-gradient(90deg, rgba(59,130,246,0.1) 0%, transparent 100%)",
                    "linear-gradient(180deg, rgba(59,130,246,0.1) 0%, transparent 100%)",
                    "linear-gradient(270deg, rgba(59,130,246,0.1) 0%, transparent 100%)",
                    "linear-gradient(360deg, rgba(59,130,246,0.1) 0%, transparent 100%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <nav className="relative px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="relative group flex-shrink-0">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                    <img
                      src="https://www.electra.co.il/filestock/file/1502610340683-0.png"
                      alt="Electra"
                      className="h-[2.7rem] w-auto relative z-10 brightness-0 invert"
                    />
                    <motion.div
                      className="absolute inset-0 -m-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-0.5 flex-wrap justify-center flex-1 px-4">
                  {navLinks.map((link, index) => {
                    const active = isParentActive(link);
                    const isHovered = hoveredIndex === index;
                    const hasChildren = !!link.children;
                    const isOpen = openDropdown === link.path;

                    if (link.isV2) {
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="ml-1 px-2.5 py-1 text-xs font-bold rounded-full border transition-colors"
                          style={{
                            color: isActive(link.path) ? "#fff" : "#009bee",
                            borderColor: "#009bee",
                            background: isActive(link.path) ? "#009bee" : "transparent",
                          }}
                        >
                          V2
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={link.path}
                        className="relative"
                        onMouseEnter={() => { setHoveredIndex(index); if (hasChildren) setOpenDropdown(link.path); }}
                        onMouseLeave={() => { setHoveredIndex(null); setOpenDropdown(null); }}
                      >
                        <Link to={link.path} className="relative block">
                          <motion.div
                            className="relative px-3 py-2 rounded-xl overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <AnimatePresence>
                              {(active || isHovered) && (
                                <motion.div
                                  layoutId={active && !hasChildren ? "activeBackground" : undefined}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className={`absolute inset-0 ${
                                    active
                                      ? "bg-white/30 backdrop-blur-md border border-white/40"
                                      : "bg-white/20"
                                  } rounded-xl`}
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}
                            </AnimatePresence>

                            <span className="relative z-10 font-semibold text-sm text-white flex items-center gap-1">
                              {link.isIcon ? (
                                <motion.div animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }} transition={{ duration: 0.5 }}>
                                  <Home className="w-4 h-4" />
                                </motion.div>
                              ) : (
                                <>
                                  {link.label}
                                  {hasChildren && (
                                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                  )}
                                </>
                              )}
                            </span>

                            {active && (
                              <motion.div
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                            )}
                          </motion.div>
                        </Link>

                        {/* Dropdown */}
                        <AnimatePresence>
                          {hasChildren && isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="absolute top-full left-0 mt-2 w-64 z-50"
                            >
                              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-sm" />
                              <div className="relative bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
                                {link.children!.map((child, ci) => (
                                  child.external ? (
                                    <motion.a
                                      key={child.path}
                                      href={child.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: ci * 0.03 }}
                                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      {child.label}
                                      <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                    </motion.a>
                                  ) : (
                                    <motion.div
                                      key={child.path}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: ci * 0.03 }}
                                    >
                                      <Link
                                        to={child.path}
                                        className={`block px-4 py-2.5 text-sm transition-colors ${
                                          isActive(child.path)
                                            ? "text-white bg-blue-600/80"
                                            : "text-gray-300 hover:text-white hover:bg-white/10"
                                        }`}
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        {child.label}
                                      </Link>
                                    </motion.div>
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

                {/* Language Selector */}
                <div className="hidden md:block relative flex-shrink-0">
                  <motion.button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm border border-white/40 shadow-lg flex items-center gap-2 group overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }} />
                    <Globe className="w-4 h-4 relative z-10 text-gray-700 group-hover:text-white transition-colors" />
                    <span className="font-semibold text-sm relative z-10 text-gray-700 group-hover:text-white transition-colors">
                      {currentLanguage}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {showLanguageMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute right-0 top-full mt-3 w-40 z-50"
                        >
                          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-sm" />
                          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                            {languages.map((lang, i) => (
                              <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => { setCurrentLanguage(lang.code); setShowLanguageMenu(false); }}
                                className={`relative w-full px-4 py-3 text-left font-semibold text-sm transition-all group ${currentLanguage === lang.code ? "text-white" : "text-gray-700 hover:text-gray-900"}`}
                              >
                                {currentLanguage === lang.code && (
                                  <motion.div layoutId="languageActive" className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                                )}
                                {currentLanguage !== lang.code && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                                <span className="relative z-10">{lang.name}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="md:hidden w-10 h-10 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm border border-white/40 shadow-lg flex items-center justify-center group overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }} />
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <X className="w-5 h-5 relative z-10 text-gray-700 group-hover:text-white transition-colors" />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="w-5 h-5 relative z-10 text-gray-700 group-hover:text-white transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </nav>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu - Glass Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-24 right-4 w-[calc(100%-2rem)] max-w-sm z-50 md:hidden"
            >
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl" />
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[75vh] overflow-y-auto">
                <div className="p-4 space-y-1">
                  {navLinks.map((link, index) => {
                    if (link.isV2) {
                      return (
                        <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center px-4 py-2 text-sm font-bold border"
                            style={{ color: "#009bee", borderColor: "#009bee" }}
                          >
                            Wersja V2 – Nowy wygląd
                          </Link>
                        </motion.div>
                      );
                    }

                    const active = isParentActive(link);
                    const hasChildren = !!link.children;
                    const isExpanded = expandedMobile === link.path;

                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <div className="flex items-center gap-1">
                          <Link
                            to={link.path}
                            onClick={() => !hasChildren && setMobileMenuOpen(false)}
                            className="relative flex-1 block"
                          >
                            <motion.div whileTap={{ scale: 0.98 }} className="relative px-4 py-3 rounded-xl overflow-hidden">
                              {active ? (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-gray-200/60 backdrop-blur-sm" />
                              )}
                              {active && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                />
                              )}
                              <div className="relative z-10 flex items-center gap-2">
                                {link.isIcon && <Home className={`w-4 h-4 ${active ? "text-white" : "text-gray-700"}`} />}
                                <span className={`font-semibold text-sm ${active ? "text-white" : "text-gray-700"}`}>
                                  {link.isIcon ? "Strona główna" : link.label}
                                </span>
                              </div>
                            </motion.div>
                          </Link>
                          {hasChildren && (
                            <button
                              onClick={() => setExpandedMobile(isExpanded ? null : link.path)}
                              className={`p-2.5 rounded-xl transition-colors ${active ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}`}
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {hasChildren && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-blue-200 pl-3 pb-1">
                                {link.children!.map((child) => (
                                  child.external ? (
                                    <a
                                      key={child.path}
                                      href={child.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
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
                                          ? "text-blue-600 font-semibold bg-blue-50"
                                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                      </motion.div>
                    );
                  })}
                </div>

                <div className="px-4 pb-4 border-t border-white/20 pt-4">
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Język</div>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang, i) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        onClick={() => setCurrentLanguage(lang.code)}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <motion.div whileTap={{ scale: 0.95 }} className="relative px-3 py-2.5 text-center font-semibold text-sm">
                          {currentLanguage === lang.code ? (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-gray-200/60" />
                          )}
                          <span className={`relative z-10 ${currentLanguage === lang.code ? "text-white" : "text-gray-700"}`}>
                            {lang.code}
                          </span>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
