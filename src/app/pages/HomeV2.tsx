import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Phone, Mail, MapPin, Linkedin, Youtube, Facebook, Instagram } from "lucide-react";
import { api, fileUrl, type Projekt, type Aktualnosc } from "../../lib/directus";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BLUE = "#009bee";
const NAVY = "#004a69";
const YELLOW = "#ffcc33";

/* ── Counter hook ─────────────────────────────────────────── */
function useCounter(end: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = end / 80;
    const t = setInterval(() => {
      v += step;
      if (v >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 18);
    return () => clearInterval(t);
  }, [active, end]);
  return count;
}

/* ── Image with Electra blue-tint filter ──────────────────── */
const electraFilter = "grayscale(72%) sepia(44%) brightness(75%) hue-rotate(160deg) saturate(220%) contrast(115%)";

/* ── Data ─────────────────────────────────────────────────── */
const stats = [
  { number: 2500, suffix: "+", label: "Zrealizowanych projektów" },
  { number: 850,  suffix: "+", label: "Aktywnych klientów" },
  { number: 70,   suffix: " lat", label: "Doskonałości" },
  { number: 99,   suffix: "%",  label: "Wskaźnik sukcesu" },
];

const services = [
  { title: "Wykonawstwo instalacji",               desc: "Kompleksowe instalacje elektryczne, mechaniczne i sanitarne dla obiektów przemysłowych i komercyjnych.", num: "01" },
  { title: "Techniczny Facility Management",       desc: "Zarządzanie techniczną stroną obiektów — serwis, przeglądy, utrzymanie sprawności 24/7.", num: "02" },
  { title: "Automatyzacja przemysłowa",            desc: "Zaawansowane systemy PLC, SCADA i automatyki dla nowoczesnych zakładów produkcyjnych.", num: "03" },
  { title: "Rozwiązania energetyczne",             desc: "Fotowoltaika, zarządzanie energią i audyty efektywności dla zrównoważonego biznesu.", num: "04" },
];

/* ════════════════════════════════════════════════════════════ */
export function HomeV2() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [news,     setNews]     = useState<Aktualnosc[]>([]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    api.projekty.list({ limit: "6" }).then(setProjekty).catch(() => {});
    api.aktualnosci.list({ limit: "3" }).then(setNews).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(stats[0].number, statsOn);
  const c1 = useCounter(stats[1].number, statsOn);
  const c2 = useCounter(stats[2].number, statsOn);
  const c3 = useCounter(stats[3].number, statsOn);
  const counts = [c0, c1, c2, c3];

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="bg-white" style={{ fontFamily: "Helvetica, Tahoma, sans-serif" }}>

      {/* ════ HERO ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] overflow-hidden"
        style={{ background: NAVY }}
      >
        {/* Background + Electra filter */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: electraFilter }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,74,105,0.92) 0%, rgba(0,18,30,0.97) 100%)" }} />
        </motion.div>

        {/* Left blue bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: BLUE }} />

        {/* Yellow bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: YELLOW }} />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center px-[8%] lg:px-[12%] pt-24"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ color: BLUE }}
          >
            Ponad 70 lat doskonałości
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white font-black leading-none mb-1"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            ELECTRA
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="font-bold leading-none mb-8"
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 3.2rem)", color: BLUE, letterSpacing: "0.12em" }}
          >
            M&amp;E POLSKA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="text-gray-300 max-w-lg mb-10 leading-relaxed"
            style={{ fontSize: "1rem" }}
          >
            Kompleksowe wykonawstwo instalacji elektrycznych, mechanicznych i automatyzacyjnych
            dla największych inwestycji przemysłowych i komercyjnych w Polsce.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest hover:opacity-90 transition-opacity"
              style={{ background: BLUE }}
            >
              SKONTAKTUJ SIĘ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projekty"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest border hover:bg-white/10 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              NASZE REALIZACJE
            </Link>
          </motion.div>
        </motion.div>

        {/* Stat strip */}
        <div className="absolute bottom-[3px] left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="grid grid-cols-3 px-[8%] lg:px-[12%]">
            {[["2500+","Projektów"],["850+","Klientów"],["70 lat","Doskonałości"]].map(([v,l]) => (
              <div key={l} className="py-5 border-r border-white/10 last:border-r-0 pr-8">
                <div className="text-white font-black" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}>{v}</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 right-[8%] lg:right-[12%] z-10"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: BLUE }} />
        </motion.div>
      </section>

      {/* ════ BLUE IDENTITY STRIP ═══════════════════════════ */}
      <section style={{ background: BLUE }}>
        <div className="px-[8%] lg:px-[12%] py-12 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Lider branży instalacyjnej<br />w Polsce od 1954 roku.
          </h2>
          <p className="text-white/80 leading-relaxed text-sm">
            Electra M&E Polska to część międzynarodowej grupy Electra — jednej z wiodących firm
            inżynieryjnych na świecie. Realizujemy projekty w sektorze biurowym, mieszkaniowym,
            przemysłowym i energetycznym na terenie całej kraju.
          </p>
        </div>
      </section>

      {/* ════ STATS ═════════════════════════════════════════ */}
      <section ref={statsRef} className="bg-white">
        <div className="px-[8%] lg:px-[12%] py-20 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-6 px-8 first:pl-0"
            >
              <div
                className="font-black leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", color: NAVY }}
              >
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ NASZA OFERTA — BOX-ANGLE ══════════════════════
           No background on section itself — the ::before/::after
           navy panels create the angled effect, clipped by the
           white stats above and dark projects below.           */}
      <section className="box-angle-navy py-28" style={{ margin: "3rem 0" }}>
        <div className="px-[8%] lg:px-[12%] relative z-10">

          {/* Header */}
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: YELLOW }}>
                Co robimy
              </p>
              <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Nasza oferta
              </h2>
            </div>
            <Link
              to="/nasza-oferta"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Pełna oferta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service cards on dark navy canvas */}
          <div className="grid md:grid-cols-2 gap-[1px] bg-white/10">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-[#004a69] hover:bg-[#003a55] transition-colors duration-300 p-10 cursor-pointer relative"
              >
                {/* Left blue accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300"
                  style={{ background: YELLOW }}
                />
                <div className="text-white/20 font-black text-4xl mb-6 leading-none select-none">{s.num}</div>
                <h3 className="text-white font-bold mb-3" style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}>
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                  {s.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all" style={{ color: YELLOW }}>
                  WIĘCEJ <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROJEKTY ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#111" }}>
        <div className="px-[8%] lg:px-[12%]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Nasze realizacje</p>
              <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Projekty
              </h2>
            </div>
            <Link
              to="/projekty"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Wszystkie projekty <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projekty.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] bg-gray-800 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              {projekty.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <ImageWithFallback
                    src={fileUrl(p.zdjecie_glowne)}
                    alt={p.tytul}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ filter: electraFilter }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                    onMouseLeave={e => (e.currentTarget.style.filter = electraFilter)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex items-end p-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: BLUE }}>
                        {typeof p.kategoria === "object" ? (p.kategoria as any).nazwa : ""}
                      </p>
                      <h3 className="text-white font-bold" style={{ fontSize: "0.95rem" }}>{p.tytul}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════ NEWS ══════════════════════════════════════════ */}
      {news.length > 0 && (
        <section className="py-24 bg-white">
          <div className="px-[8%] lg:px-[12%]">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Co słychać</p>
                <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>Aktualności</h2>
              </div>
              <Link to="/aktualnosci" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                Wszystkie <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {news.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer border-t-[3px] pt-6"
                  style={{ borderColor: BLUE }}
                >
                  {item.miniaturka && (
                    <div className="aspect-[16/9] overflow-hidden mb-5">
                      <ImageWithFallback
                        src={fileUrl(item.miniaturka)}
                        alt={item.tytul}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "grayscale(40%)" }}
                        onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                        onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(40%)")}
                      />
                    </div>
                  )}
                  {item.data_publikacji && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
                      {new Date(item.data_publikacji).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  )}
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3" style={{ fontSize: "1rem" }}>
                    {item.tytul}
                  </h3>
                  {item.zajawka && <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.zajawka}</p>}
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-widest" style={{ color: BLUE }}>
                    CZYTAJ <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ GOTOWI DO WSPÓŁPRACY (box-angle dark) ═════════ */}
      <section className="box-angle-dark py-28" style={{ margin: "3rem 0" }}>
        <div className="px-[8%] lg:px-[12%] relative z-10 grid md:grid-cols-2 gap-16 items-center">

          <div>
            {/* Yellow top accent bar */}
            <div className="w-12 h-[3px] mb-8" style={{ background: YELLOW }} />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BLUE }}>
              Gotowi do współpracy
            </p>
            <h2 className="text-white font-black leading-tight mb-8" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Zrealizujmy razem<br />Twój projekt.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm">
              Skontaktuj się z nami — nasz zespół jest gotowy odpowiedzieć na każde pytanie
              i przygotować dedykowaną ofertę dla Twojej inwestycji.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest hover:opacity-90 transition-opacity"
              style={{ background: BLUE }}
            >
              NAPISZ DO NAS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Adres", value: "Aleje Jerozolimskie 134\n05-500 Warszawa" },
              { icon: Phone,  label: "Telefon", value: "+48 123 456 789" },
              { icon: Mail,   label: "E-mail",  value: "info@electra.co.pl" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-5">
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(0,155,238,0.12)", border: `1px solid rgba(0,155,238,0.2)` }}
                >
                  <Icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{label}</div>
                  <div className="text-white/80 text-sm whitespace-pre-line leading-relaxed">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════════════════════════════════════════ */}
      <footer style={{ background: NAVY }}>
        {/* Yellow top accent */}
        <div className="h-[3px] w-full" style={{ background: YELLOW }} />

        <div className="px-[8%] lg:px-[12%] py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="https://www.electra.co.il/filestock/file/1502610340683-0.png"
              alt="Electra"
              className="h-7 w-auto brightness-0 invert mb-5"
            />
            <p className="text-white/50 text-xs leading-relaxed mb-6">
              Wiodący dostawca rozwiązań elektrycznych i mechanicznych dla przemysłu i budownictwa komercyjnego w Polsce.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.facebook.com/ElectraGroup.OfficialPage/", Icon: Facebook },
                { href: "https://www.linkedin.com/company/14054/",             Icon: Linkedin },
                { href: "https://www.youtube.com/channel/UC5e-PFzM7P4CFcS-nZmwsfQ", Icon: Youtube },
                { href: "https://www.instagram.com/electragroup_official/",    Icon: Instagram },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = BLUE; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5">Szybkie linki</h3>
            <ul className="space-y-2.5">
              {[["O nas","/o-nas"],["Aktualności","/aktualnosci"],["Nasza oferta","/nasza-oferta"],["Projekty","/projekty"],["Dołącz do nas","/dolacz-do-nas"],["Kontakt","/kontakt"]].map(([l,p]) => (
                <li key={p}>
                  <Link to={p} className="text-white/50 text-sm hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-3 h-[1px] inline-block" style={{ background: BLUE }} />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5">Usługi</h3>
            <ul className="space-y-2.5">
              {["Instalacje elektryczne","Automatyzacja przemysłowa","Rozwiązania energetyczne","Serwis i wsparcie","Zarządzanie projektami"].map(s => (
                <li key={s}>
                  <span className="text-white/50 text-sm flex items-center gap-2">
                    <span className="w-3 h-[1px] inline-block" style={{ background: BLUE }} />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-5">Kontakt</h3>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                <span>Aleje Jerozolimskie 134<br />05-500 Warszawa</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: BLUE }} />
                <a href="tel:+48123456789" className="hover:text-white transition-colors">+48 123 456 789</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: BLUE }} />
                <a href="mailto:info@electra.co.pl" className="hover:text-white transition-colors">info@electra.co.pl</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t px-[8%] lg:px-[12%] py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <span>© {new Date().getFullYear()} Electra M&E Polska. Wszelkie prawa zastrzeżone.</span>
          <div className="flex gap-5">
            <Link to="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka prywatności</Link>
            <Link to="/rodo" className="hover:text-white transition-colors">RODO</Link>
            <Link to="/zglos-nieprawidlowosc" className="hover:text-white transition-colors">Zgłoś nieprawidłowość</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
