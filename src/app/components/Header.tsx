import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Home, Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const location = useLocation();
  
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.2, 0.4]);
  const glowOpacity = useTransform(scrollY, [0, 100], [0.15, 0.3]);
  const topPosition = useTransform(scrollY, [0, 50], [24, 0]);
  const menuWidth = useTransform(scrollY, [0, 50], ["95%", "100%"]);
  const borderRadius = useTransform(scrollY, [0, 50], [16, 0]);

  const languages = [
    { code: "EN", name: "English" },
    { code: "PL", name: "Polski" },
    { code: "DE", name: "Deutsch" },
  ];

  const navLinks = [
    { path: "/", label: "Strona główna", isIcon: true },
    { path: "/about", label: "O nas" },
    { path: "/services", label: "Oferta" },
    { path: "/products", label: "Projekty" },
    { path: "/group", label: "Grupa" },
    { path: "/contact", label: "Kontakt" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Floating Glass Navigation */}
      <motion.header
        className="fixed left-1/2 -translate-x-1/2 z-50 max-w-none"
        style={{ top: topPosition, width: menuWidth }}
      >
        {/* Glass Container with Glow */}
        <div className="relative">
          {/* Glow Effect - Dynamic */}
          <motion.div 
            style={{ opacity: glowOpacity, borderRadius }}
            className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-sm transition-opacity duration-500" 
          />
          
          {/* Main Glass Panel - Dynamic Background */}
          <motion.div 
            className="relative backdrop-blur-xl bg-black/[0.26] shadow-2xl shadow-black/10 transition-all duration-500"
            style={{
              borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
              borderWidth: '1px',
              borderStyle: 'solid',
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
                <Link to="/" className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <img
                      src="https://www.electra.co.il/filestock/file/1502610340683-0.png"
                      alt="Electra"
                      className="h-[2.7rem] w-auto relative z-10 brightness-0 invert"
                    />
                    {/* Logo glow on hover */}
                    <motion.div
                      className="absolute inset-0 -m-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.path);
                    const isHovered = hoveredIndex === index;

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative"
                      >
                        <motion.div
                          className="relative px-5 py-2.5 rounded-xl overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Active/Hover Background */}
                          <AnimatePresence>
                            {(active || isHovered) && (
                              <motion.div
                                layoutId={active ? "activeBackground" : undefined}
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

                          {/* Particle effect on hover */}
                          {isHovered && !active && (
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                  initial={{
                                    x: "50%",
                                    y: "50%",
                                    opacity: 0.8,
                                  }}
                                  animate={{
                                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                  }}
                                />
                              ))}
                            </motion.div>
                          )}

                          {/* Content */}
                          <span
                            className={`relative z-10 font-semibold text-sm transition-colors ${
                              active ? "text-white" : "text-white"
                            }`}
                          >
                            {link.isIcon ? (
                              <motion.div
                                animate={{
                                  rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <Home className="w-4 h-4" />
                              </motion.div>
                            ) : (
                              link.label
                            )}
                          </span>

                          {/* Bottom glow for active */}
                          {active && (
                            <motion.div
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Language Selector */}
                <div className="hidden md:block relative">
                  <motion.button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 backdrop-blur-sm border border-white/40 shadow-lg flex items-center gap-2 group overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <Globe className="w-4 h-4 relative z-10 text-gray-700 group-hover:text-white transition-colors" />
                    <span 
                      className="font-semibold text-sm relative z-10 text-gray-700 group-hover:text-white transition-colors"
                      style={{
                        textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white'
                      }}
                    >
                      {currentLanguage}
                    </span>

                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-xl"
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{
                        scale: showLanguageMenu ? 1.5 : 0,
                        opacity: showLanguageMenu ? 0 : 0.5,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>

                  {/* Language Dropdown */}
                  <AnimatePresence>
                    {showLanguageMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowLanguageMenu(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute right-0 top-full mt-3 w-48 z-50"
                        >
                          {/* Glow */}
                          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl blur-sm" />
                          
                          {/* Glass dropdown */}
                          <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                            {languages.map((lang, index) => (
                              <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                  setCurrentLanguage(lang.code);
                                  setShowLanguageMenu(false);
                                }}
                                className={`relative w-full px-4 py-3 text-left font-semibold text-sm transition-all group ${
                                  currentLanguage === lang.code
                                    ? "text-white"
                                    : "text-gray-700 hover:text-gray-900"
                                }`}
                              >
                                {/* Active background */}
                                {currentLanguage === lang.code && (
                                  <motion.div
                                    layoutId="languageActive"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                  />
                                )}
                                
                                {/* Hover background */}
                                {currentLanguage !== lang.code && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}

                                <span 
                                  className="relative z-10"
                                  style={{
                                    textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white'
                                  }}
                                >
                                  {lang.name}
                                </span>

                                {/* Shine effect */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  animate={{
                                    x: ["-100%", "100%"],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                  }}
                                />
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
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5 relative z-10 text-gray-700 group-hover:text-white transition-colors" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-24 right-4 w-[calc(100%-2rem)] max-w-sm z-50 md:hidden"
            >
              {/* Glow */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl" />
              
              {/* Glass container */}
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Navigation Links */}
                <div className="p-6 space-y-2">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.path);
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="relative block"
                        >
                          <motion.div
                            whileTap={{ scale: 0.98 }}
                            className="relative px-5 py-3.5 rounded-xl overflow-hidden"
                          >
                            {/* Background */}
                            {active ? (
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-gray-200/60 backdrop-blur-sm" />
                            )}

                            {/* Shine effect on active */}
                            {active && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                  x: ["-100%", "100%"],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                              />
                            )}

                            <div className="relative z-10 flex items-center gap-3">
                              {link.isIcon && (
                                <Home className={`w-5 h-5 ${active ? "text-white" : "text-gray-700"}`} />
                              )}
                              <span className={`font-semibold ${active ? "text-white" : "text-gray-700"}`}>
                                {link.isIcon ? "Strona główna" : link.label}
                              </span>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Language Selector Mobile */}
                <div className="px-6 pb-6 border-t border-white/20 pt-6">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
                    Język
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        onClick={() => setCurrentLanguage(lang.code)}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className="relative px-3 py-3 text-center font-semibold text-sm"
                        >
                          {currentLanguage === lang.code ? (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/60 to-gray-200/60" />
                          )}
                          <span
                            className={`relative z-10 ${
                              currentLanguage === lang.code ? "text-white" : "text-gray-700"
                            }`}
                          >
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