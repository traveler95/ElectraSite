import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Phone, Mail, MapPin } from "lucide-react";
import { api, fileUrl, type Projekt, type Aktualnosc } from "../../lib/directus";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BLUE = "#009bee";
const NAVY = "#004a69";

function useCounter(end: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / 80;
    const t = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(t);
  }, [active, end]);
  return count;
}

const stats = [
  { number: 2500, suffix: "+", label: "Zrealizowanych projektów" },
  { number: 850, suffix: "+", label: "Aktywnych klientów" },
  { number: 70, suffix: " lat", label: "Doskonałości" },
  { number: 99, suffix: "%", label: "Wskaźnik sukcesu" },
];

const services = [
  { title: "Wykonawstwo instalacji", desc: "Kompleksowe instalacje elektryczne, mechaniczne i sanitarne dla obiektów przemysłowych i komercyjnych.", num: "01" },
  { title: "Techniczny Facility Management", desc: "Zarządzanie techniczną stroną obiektów — serwis, przeglądy, utrzymanie sprawności 24/7.", num: "02" },
  { title: "Automatyzacja przemysłowa", desc: "Zaawansowane systemy PLC, SCADA i automatyki dla nowoczesnych zakładów produkcyjnych.", num: "03" },
  { title: "Rozwiązania energetyczne", desc: "Fotowoltaika, zarządzanie energią i audyty efektywności dla zrównoważonego biznesu.", num: "04" },
];

export function HomeV2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [news, setNews] = useState<Aktualnosc[]>([]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    api.projekty.list({ limit: "6" }).then(setProjekty).catch(() => {});
    api.aktualnosci.list({ limit: "3" }).then(setNews).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(stats[0].number, statsVisible);
  const c1 = useCounter(stats[1].number, statsVisible);
  const c2 = useCounter(stats[2].number, statsVisible);
  const c3 = useCounter(stats[3].number, statsVisible);
  const counts = [c0, c1, c2, c3];

  return (
    <div className="bg-white font-sans">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden" style={{ background: NAVY }}>
        {/* Background image with Electra's blue filter */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(72%) sepia(44%) brightness(80%) hue-rotate(160deg) saturate(200%) contrast(110%)" }}
          />
          {/* Navy gradient overlay — matches original --gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,74,105,0.92) 0%, rgba(0,30,50,0.97) 100%)" }} />
        </motion.div>

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-center px-[12%] pt-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: BLUE }}
          >
            Ponad 70 lat doskonałości
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white font-black leading-none mb-2"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            ELECTRA
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-bold leading-none mb-8"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", color: BLUE, letterSpacing: "0.1em" }}
          >
            M&amp;E POLSKA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-gray-300 max-w-xl mb-10 leading-relaxed"
            style={{ fontSize: "1.1rem" }}
          >
            Kompleksowe wykonawstwo instalacji elektrycznych, mechanicznych i automatyzacyjnych
            dla największych inwestycji przemysłowych i komercyjnych w Polsce.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all hover:opacity-90"
              style={{ background: BLUE, fontSize: "0.95rem", letterSpacing: "0.05em" }}
            >
              SKONTAKTUJ SIĘ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projekty"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", fontSize: "0.95rem", letterSpacing: "0.05em" }}
            >
              NASZE REALIZACJE
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
          <div className="grid grid-cols-3 px-[12%]">
            {[["2500+", "Projektów"], ["850+", "Klientów"], ["70 lat", "Doświadczenia"]].map(([val, lbl]) => (
              <div key={lbl} className="py-5 border-r border-white/10 last:border-r-0 pr-8">
                <div className="text-white font-black" style={{ fontSize: "1.6rem" }}>{val}</div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 right-[12%] z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </section>

      {/* ── BLUE TAGLINE STRIP ──────────────────────────────── */}
      <section style={{ background: BLUE }}>
        <div className="px-[12%] py-14 grid md:grid-cols-2 gap-12 items-center">
          <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Lider branży instalacyjnej<br />w Polsce od 1954 roku.
          </h2>
          <p className="text-white/80 leading-relaxed text-base">
            Electra M&E Polska to część międzynarodowej grupy Electra — jednej z wiodących firm
            inżynieryjnych na świecie. Realizujemy projekty w sektorze biurowym, mieszkaniowym,
            przemysłowym i energetycznym na terenie całej Polski.
          </p>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-white border-b border-gray-100">
        <div className="px-[12%] py-20 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="border-r border-gray-100 last:border-r-0 py-4 pr-8 mr-8 last:mr-0 last:pr-0">
              <div
                className="font-black leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", color: NAVY }}
              >
                {counts[i]}{s.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-24">
        <div className="px-[12%]">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BLUE }}>Co robimy</p>
              <h2 className="font-black leading-tight text-gray-900" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Nasza oferta
              </h2>
            </div>
            <Link to="/nasza-oferta" className="hidden md:flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-70" style={{ color: BLUE }}>
              Pełna oferta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-gray-200">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-10 border-b border-r border-gray-200 last:border-b-0 odd:last:border-r-0 bg-white hover:bg-gray-900 transition-all duration-300 cursor-pointer relative"
              >
                {/* Left blue accent */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:w-1 transition-all" style={{ background: BLUE }} />
                <div className="text-xs font-bold tracking-widest text-gray-300 group-hover:text-gray-600 mb-6 transition-colors">{s.num}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-white mb-3 transition-colors" style={{ fontSize: "1.15rem" }}>{s.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all" style={{ color: BLUE }}>
                  Dowiedz się więcej <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#111" }}>
        <div className="px-[12%]">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BLUE }}>Nasze realizacje</p>
              <h2 className="font-black leading-tight text-white" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Projekty
              </h2>
            </div>
            <Link to="/projekty" className="hidden md:flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-70" style={{ color: BLUE }}>
              Wszystkie projekty <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projekty.length === 0 ? (
            /* Placeholder grid when no projects */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
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
                    style={{ filter: "grayscale(72%) sepia(44%) brightness(80%) hue-rotate(160deg) saturate(200%) contrast(110%)" }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                    onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(72%) sepia(44%) brightness(80%) hue-rotate(160deg) saturate(200%) contrast(110%)")}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: BLUE }}>
                        {typeof p.kategoria === "object" ? (p.kategoria as any).nazwa : ""}
                      </p>
                      <h3 className="text-white font-bold text-base">{p.tytul}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWS ───────────────────────────────────────────── */}
      {news.length > 0 && (
        <section className="py-24 bg-white">
          <div className="px-[12%]">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: BLUE }}>Co słychać</p>
                <h2 className="font-black leading-tight text-gray-900" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                  Aktualności
                </h2>
              </div>
              <Link to="/aktualnosci" className="hidden md:flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-70" style={{ color: BLUE }}>
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
                  className="group border-t-2 pt-6 cursor-pointer"
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
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                      {new Date(item.data_publikacji).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  )}
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3" style={{ fontSize: "1.05rem" }}>
                    {item.tytul}
                  </h3>
                  {item.zajawka && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.zajawka}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: BLUE }}>
                    Czytaj <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: NAVY }}>
        {/* Diagonal accent — inspired by .box-angle */}
        <div className="absolute inset-0 opacity-10" style={{
          background: `repeating-linear-gradient(45deg, ${BLUE} 0, ${BLUE} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />

        <div className="relative z-10 px-[12%] grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: BLUE }}>Gotowi do współpracy</p>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Zrealizujmy razem<br />Twój projekt.
            </h2>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all hover:opacity-90"
              style={{ background: BLUE, letterSpacing: "0.05em" }}
            >
              NAPISZ DO NAS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-5">
            {[
              { icon: MapPin, text: "Aleje Jerozolimskie 134, 05-500 Warszawa" },
              { icon: Phone, text: "+48 123 456 789" },
              { icon: Mail, text: "info@electra.co.pl" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,155,238,0.15)" }}>
                  <Icon className="w-4 h-4" style={{ color: BLUE }} />
                </div>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
