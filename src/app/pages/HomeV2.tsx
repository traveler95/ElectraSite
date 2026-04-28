import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Phone, Mail, MapPin } from "lucide-react";
import { api, fileUrl, type Projekt, type Aktualnosc } from "../../lib/directus";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BLUE   = "#009bee";
const NAVY   = "#004a69";
const YELLOW = "#ffcc33";
const LIGHT  = "#f4f7fa";   // light cool gray for section backgrounds
const MID    = "#e8edf2";   // slightly darker for dividers

/* ── Electra image filter ───────────────────────────────────── */
const electraFilter = "grayscale(72%) sepia(44%) brightness(78%) hue-rotate(160deg) saturate(220%) contrast(112%)";

/* ── Counter hook ───────────────────────────────────────────── */
function useCounter(end: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = end / 80;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setV(end); clearInterval(t); }
      else setV(Math.floor(cur));
    }, 18);
    return () => clearInterval(t);
  }, [active, end]);
  return v;
}

/* ── Angled section background helper ──────────────────────── */
function SkewBg({ color, deg = -2 }: { color: string; deg?: number }) {
  return (
    <div
      className="skew-bg"
      style={{ background: color, transform: `skewY(${deg}deg)`, transformOrigin: "top left" }}
    />
  );
}

/* ── Static data ────────────────────────────────────────────── */
const stats = [
  { number: 2500, suffix: "+",    label: "Zrealizowanych projektów" },
  { number: 850,  suffix: "+",    label: "Aktywnych klientów" },
  { number: 70,   suffix: " lat", label: "Doskonałości" },
  { number: 99,   suffix: "%",    label: "Wskaźnik sukcesu" },
];

const services = [
  { num: "01", title: "Wykonawstwo instalacji",          desc: "Kompleksowe instalacje elektryczne, mechaniczne i sanitarne dla obiektów przemysłowych i komercyjnych." },
  { num: "02", title: "Techniczny Facility Management",  desc: "Zarządzanie techniczną stroną obiektów — serwis, przeglądy, utrzymanie sprawności 24/7." },
  { num: "03", title: "Automatyzacja przemysłowa",       desc: "Zaawansowane systemy PLC, SCADA i automatyki dla nowoczesnych zakładów produkcyjnych." },
  { num: "04", title: "Rozwiązania energetyczne",        desc: "Fotowoltaika, zarządzanie energią i audyty efektywności dla zrównoważonego biznesu." },
];

/* ════════════════════════════════════════════════════════════ */
export function HomeV2() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn,  setStatsOn]  = useState(false);
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [news,     setNews]     = useState<Aktualnosc[]>([]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1],    [0, 180]);
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

  /* ── render ───────────────────────────────────────────────── */
  return (
    <div className="bg-white" style={{ fontFamily: "Helvetica, Tahoma, sans-serif" }}>

      {/* ════ HERO ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] overflow-hidden"
        style={{ background: NAVY }}
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: electraFilter }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,74,105,0.90) 0%, rgba(0,20,38,0.96) 100%)" }} />
        </motion.div>

        {/* Left blue accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: BLUE }} />
        {/* Yellow bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: YELLOW }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center px-[8%] lg:px-[12%] pt-24"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ color: BLUE }}
          >
            Ponad 70 lat doskonałości
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white font-black leading-none mb-1"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            ELECTRA
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="font-bold leading-none mb-8"
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 3.2rem)", color: BLUE, letterSpacing: "0.12em" }}
          >
            M&amp;E POLSKA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="text-gray-300 max-w-lg mb-10 leading-relaxed text-sm"
          >
            Kompleksowe wykonawstwo instalacji elektrycznych, mechanicznych i automatyzacyjnych
            dla największych inwestycji przemysłowych i komercyjnych w Polsce.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
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
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              NASZE REALIZACJE
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero stat strip */}
        <div className="absolute bottom-[3px] left-0 right-0 z-10 border-t border-white/10 bg-black/25 backdrop-blur-sm">
          <div className="grid grid-cols-3 px-[8%] lg:px-[12%]">
            {[["2500+","Projektów"],["850+","Klientów"],["70 lat","Doskonałości"]].map(([v,l]) => (
              <div key={l} className="py-5 border-r border-white/10 last:border-r-0 pr-8">
                <div className="text-white font-black" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)" }}>{v}</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div className="absolute bottom-24 right-[8%] lg:right-[12%] z-10" animate={{ y: [0,8,0] }} transition={{ duration:2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" style={{ color: BLUE }} />
        </motion.div>
      </section>

      {/* ════ BLUE IDENTITY STRIP ═══════════════════════════ */}
      <section style={{ background: BLUE }}>
        <div className="px-[8%] lg:px-[12%] py-12 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
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
        <div className="px-[8%] lg:px-[12%] py-20 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-6 px-8 first:pl-0"
            >
              <div className="font-black leading-none mb-2" style={{ fontSize: "clamp(2.5rem,4vw,4.5rem)", color: NAVY }}>
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#8fa0b0" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ NASZA OFERTA — skew angled section ════════════
           Light gray background, skewed inward — creates the
           box-angle visual transition without overflow.       */}
      <section className="skew-section py-28" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <SkewBg color={LIGHT} deg={-2} />

        <div className="px-[8%] lg:px-[12%]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Co robimy</p>
              <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: NAVY }}>
                Nasza oferta
              </h2>
            </div>
            <Link to="/nasza-oferta" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
              Pełna oferta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white border border-gray-200 hover:border-blue-300 p-8 cursor-pointer transition-all duration-300 hover:shadow-lg relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300" style={{ background: BLUE }} />
                <div className="text-3xl font-black mb-5 leading-none select-none" style={{ color: MID }}>{s.num}</div>
                <h3 className="font-bold mb-3" style={{ fontSize: "1.05rem", color: NAVY }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all" style={{ color: BLUE }}>
                  WIĘCEJ <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROJEKTY ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: LIGHT }}>
        <div className="px-[8%] lg:px-[12%]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Nasze realizacje</p>
              <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: NAVY }}>Projekty</h2>
            </div>
            <Link to="/projekty" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
              Wszystkie projekty <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projekty.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {projekty.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer shadow-sm"
                >
                  <ImageWithFallback
                    src={fileUrl(p.zdjecie_glowne)}
                    alt={p.tytul}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ filter: electraFilter }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                    onMouseLeave={e => (e.currentTarget.style.filter = electraFilter)}
                  />
                  <div className="absolute inset-0 flex items-end p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: "linear-gradient(0deg, rgba(0,74,105,0.92) 0%, transparent 100%)" }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: YELLOW }}>
                        {typeof p.kategoria === "object" ? (p.kategoria as any).nazwa : ""}
                      </p>
                      <h3 className="text-white font-bold text-sm">{p.tytul}</h3>
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
                <h2 className="font-black leading-tight" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: NAVY }}>Aktualności</h2>
              </div>
              <Link to="/aktualnosci" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                Wszystkie <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
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
                    <div className="aspect-[16/9] overflow-hidden mb-5 bg-gray-100">
                      <ImageWithFallback
                        src={fileUrl(item.miniaturka)}
                        alt={item.tytul}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "grayscale(35%)" }}
                        onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                        onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(35%)")}
                      />
                    </div>
                  )}
                  {item.data_publikacji && (
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "#8fa0b0" }}>
                      {new Date(item.data_publikacji).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  )}
                  <h3 className="font-bold leading-snug mb-3 group-hover:text-blue-600 transition-colors" style={{ fontSize: "1rem", color: NAVY }}>
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

      {/* ════ GOTOWI DO WSPÓŁPRACY — skew angled section ════
           Navy background, skewed opposite direction (+2deg)
           for visual variety against the services section.   */}
      <section className="skew-section py-28" style={{ marginTop: "2rem" }}>
        <SkewBg color={NAVY} deg={2} />

        <div className="px-[8%] lg:px-[12%] grid md:grid-cols-2 gap-16 items-center">

          <div>
            <div className="w-10 h-[3px] mb-8" style={{ background: YELLOW }} />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BLUE }}>
              Gotowi do współpracy
            </p>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              Zrealizujmy razem<br />Twój projekt.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm">
              Skontaktuj się z nami — nasz zespół odpowie na każde pytanie
              i przygotuje dedykowaną ofertę dla Twojej inwestycji.
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
              { icon: MapPin, label: "Adres",   value: "Aleje Jerozolimskie 134\n05-500 Warszawa" },
              { icon: Phone,  label: "Telefon", value: "+48 123 456 789" },
              { icon: Mail,   label: "E-mail",  value: "info@electra.co.pl" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-5">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(0,155,238,0.12)", border: "1px solid rgba(0,155,238,0.2)" }}>
                  <Icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</div>
                  <div className="text-white/75 text-sm whitespace-pre-line leading-relaxed">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
