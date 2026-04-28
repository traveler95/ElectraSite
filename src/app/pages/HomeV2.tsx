import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Phone, Mail, MapPin } from "lucide-react";
import { api, fileUrl, type Projekt, type Aktualnosc } from "../../lib/directus";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* Electra official colour system (source: electra.co.pl CSS variables)
   --color-main: #009bee | --color-navy: #42b4f0 | gradient: rgba(0,74,105)→rgba(0,160,227) */
const BLUE      = "#009bee";  // --color-main        primary electric blue
const BLUE_DARK = "#0086d4";  //                     hover / darker shade
const BLUE_SOFT = "#42b4f0";  // --color-navy portal  lighter sky-blue
const BLUE_MID  = "#00a0e3";  //                     gradient end colour
const NAVY      = "#004a69";  //                     dark teal (gradient start)
const NAVY_DEEP = "#2B4A91";  // --color-navy dark    deep navy for headings
const BG_BLUE   = "#e8f4fd";  //                     very-light-blue section bg

const electraFilter = "grayscale(72%) sepia(44%) brightness(78%) hue-rotate(160deg) saturate(220%) contrast(112%)";

function useCounter(end: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0; const step = end / 80;
    const t = setInterval(() => { cur += step; if (cur >= end) { setV(end); clearInterval(t); } else setV(Math.floor(cur)); }, 18);
    return () => clearInterval(t);
  }, [active, end]);
  return v;
}

const stats = [
  { number: 2500, suffix: "+",    label: "Zrealizowanych projektów" },
  { number: 850,  suffix: "+",    label: "Aktywnych klientów" },
  { number: 70,   suffix: " lat", label: "Doskonałości" },
  { number: 99,   suffix: "%",    label: "Wskaźnik sukcesu" },
];

const services = [
  { num: "01", title: "Wykonawstwo instalacji",         desc: "Kompleksowe instalacje elektryczne, mechaniczne i sanitarne dla obiektów przemysłowych i komercyjnych." },
  { num: "02", title: "Techniczny Facility Management", desc: "Zarządzanie techniczną stroną obiektów — serwis, przeglądy, utrzymanie sprawności 24/7." },
  { num: "03", title: "Automatyzacja przemysłowa",      desc: "Zaawansowane systemy PLC, SCADA i automatyki dla nowoczesnych zakładów produkcyjnych." },
  { num: "04", title: "Rozwiązania energetyczne",       desc: "Fotowoltaika, zarządzanie energią i audyty efektywności dla zrównoważonego biznesu." },
];

// clip-path polygons — creates visible diagonal top & bottom edges
const clipAngleDown = "polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)";  // ↘ top-right, ↗ bottom-right
const clipAngleUp   = "polygon(0 0%, 100% 5%, 100% 100%, 0% 95%)";  // opposite direction

export function HomeV2() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn,  setStatsOn]  = useState(false);
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [news,     setNews]     = useState<Aktualnosc[]>([]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start","end start"] });
  const heroY       = useTransform(scrollYProgress, [0,1],    [0,180]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.75], [1,0]);

  useEffect(() => {
    api.projekty.list({ limit: "6" }).then(setProjekty).catch(() => {});
    api.aktualnosci.list({ limit: "3" }).then(setNews).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(stats[0].number, statsOn);
  const c1 = useCounter(stats[1].number, statsOn);
  const c2 = useCounter(stats[2].number, statsOn);
  const c3 = useCounter(stats[3].number, statsOn);
  const counts = [c0, c1, c2, c3];

  return (
    <div className="bg-white" style={{ fontFamily: "Helvetica, Tahoma, sans-serif" }}>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden" style={{ background: NAVY }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: electraFilter }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,74,105,0.90) 0%, rgba(0,20,38,0.96) 100%)" }} />
        </motion.div>

        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: BLUE }} />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BLUE }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-center px-[8%] lg:px-[12%] pt-24">
          <motion.p initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5 }} className="text-xs font-bold tracking-[0.35em] uppercase mb-5" style={{ color: BLUE }}>
            Ponad 70 lat doskonałości
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }} className="text-white font-black leading-none mb-1" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", letterSpacing: "-0.03em" }}>
            ELECTRA
          </motion.h1>
          <motion.h2 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }} className="font-bold leading-none mb-8" style={{ fontSize: "clamp(1.2rem,3.5vw,3.2rem)", color: BLUE, letterSpacing: "0.12em" }}>
            M&amp;E POLSKA
          </motion.h2>
          <motion.p initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.35 }} className="text-gray-300 max-w-lg mb-10 leading-relaxed text-sm">
            Kompleksowe wykonawstwo instalacji elektrycznych, mechanicznych i automatyzacyjnych dla największych inwestycji przemysłowych i komercyjnych w Polsce.
          </motion.p>
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.5 }} className="flex flex-wrap gap-4">
            <Link to="/kontakt" className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest hover:opacity-90 transition-opacity" style={{ background: BLUE }}>
              SKONTAKTUJ SIĘ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/projekty" className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest border hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
              NASZE REALIZACJE
            </Link>
          </motion.div>
        </motion.div>

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

        <motion.div className="absolute bottom-24 right-[8%] lg:right-[12%] z-10" animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}>
          <ArrowDown className="w-4 h-4" style={{ color: BLUE }} />
        </motion.div>
      </section>

      {/* ══ IDENTITY STRIP — Electra gradient (matches --gradient CSS var) ══ */}
      <section style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_MID} 100%)` }}>
        <div className="px-[8%] lg:px-[12%] py-12 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
            Lider branży instalacyjnej<br />w Polsce od 1954 roku.
          </h2>
          <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.88)" }}>
            Electra M&E Polska to część międzynarodowej grupy Electra — jednej z wiodących firm inżynieryjnych na świecie. Realizujemy projekty w sektorze biurowym, mieszkaniowym, przemysłowym i energetycznym.
          </p>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════ */}
      <section ref={statsRef} className="bg-white">
        <div className="px-[8%] lg:px-[12%] py-20 grid grid-cols-2 lg:grid-cols-4" style={{ borderLeft: "none" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
              className="py-6 px-8 first:pl-0 border-r last:border-r-0" style={{ borderColor: BG_BLUE }}>
              <div className="font-black leading-none mb-2" style={{ fontSize:"clamp(2.5rem,4vw,4.5rem)", color: NAVY_DEEP }}>
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: BLUE_SOFT }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ NASZA OFERTA — clip-path angled, NAVY background ══
           Diagonal top & bottom edges are clearly visible
           against the white stats above and light section below. */}
      <section
        className="py-32"
        style={{
          background: NAVY,
          clipPath: clipAngleDown,
          margin: "-3rem 0",
          padding: "7rem 0",
        }}
      >
        <div className="px-[8%] lg:px-[12%]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE_SOFT }}>Co robimy</p>
              <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>Nasza oferta</h2>
            </div>
            <Link to="/nasza-oferta" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
              Pełna oferta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-[1px] bg-white/10">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
                className="group p-10 cursor-pointer relative transition-colors duration-300"
                style={{ background: NAVY }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = NAVY_DEEP}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = NAVY}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300" style={{ background: BLUE }} />
                <div className="font-black text-4xl mb-6 leading-none select-none" style={{ color: BLUE + "30" }}>{s.num}</div>
                <h3 className="text-white font-bold mb-3" style={{ fontSize:"1.05rem" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed transition-colors" style={{ color: BLUE_SOFT + "99" }}>{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all" style={{ color: BLUE_SOFT }}>
                  WIĘCEJ <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJEKTY ════════════════════════════════════════ */}
      <section className="py-24" style={{ background: BG_BLUE }}>
        <div className="px-[8%] lg:px-[12%]">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Nasze realizacje</p>
              <h2 className="font-black leading-tight" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color: NAVY_DEEP }}>Projekty</h2>
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
                <motion.div key={p.id} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer shadow-sm"
                >
                  <ImageWithFallback
                    src={fileUrl(p.zdjecie_glowne)} alt={p.tytul}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ filter: electraFilter }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                    onMouseLeave={e => (e.currentTarget.style.filter = electraFilter)}
                  />
                  <div className="absolute inset-0 flex items-end p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: "linear-gradient(0deg, rgba(0,74,105,0.92) 0%, transparent 100%)" }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
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

      {/* ══ NEWS ════════════════════════════════════════════ */}
      {news.length > 0 && (
        <section className="py-24 bg-white">
          <div className="px-[8%] lg:px-[12%]">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: BLUE }}>Co słychać</p>
                <h2 className="font-black leading-tight" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color: NAVY_DEEP }}>Aktualności</h2>
              </div>
              <Link to="/aktualnosci" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                Wszystkie <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                  className="group cursor-pointer border-t-[3px] pt-6" style={{ borderColor: BLUE }}
                >
                  {item.miniaturka && (
                    <div className="aspect-[16/9] overflow-hidden mb-5" style={{ background: BG_BLUE }}>
                      <ImageWithFallback
                        src={fileUrl(item.miniaturka)} alt={item.tytul}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: "grayscale(35%)" }}
                        onMouseEnter={e => (e.currentTarget.style.filter = "none")}
                        onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(35%)")}
                      />
                    </div>
                  )}
                  {item.data_publikacji && (
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: BLUE_SOFT }}>
                      {new Date(item.data_publikacji).toLocaleDateString("pl-PL", { day:"numeric", month:"long", year:"numeric" })}
                    </p>
                  )}
                  <h3 className="font-bold leading-snug mb-3 transition-colors" style={{ fontSize:"1rem", color: NAVY_DEEP }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BLUE}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = NAVY_DEEP}
                  >{item.tytul}</h3>
                  {item.zajawka && <p className="text-sm leading-relaxed line-clamp-3" style={{ color: BLUE_SOFT }}>{item.zajawka}</p>}
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-widest" style={{ color: BLUE }}>CZYTAJ <ArrowRight className="w-3 h-3" /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ GOTOWI DO WSPÓŁPRACY — double box-angle ════════
           Two counter-rotated divs at opacity 0.8 each.
           Where they overlap (center) opacity stacks to ~0.96,
           making the center darker — exactly like the original
           electra.co.pl .box-angle effect.
           overflow:hidden clips the extended panels cleanly.  */}
      <section className="relative overflow-hidden" style={{ padding: "7rem 0", marginTop: "2rem" }}>
        {/* Panel 1 — rotated +6deg */}
        <div
          aria-hidden
          className="absolute"
          style={{
            top: 0, bottom: 0,
            left: "-60%", right: "-60%",
            background: NAVY,
            opacity: 0.85,
            transform: "rotate(6deg)",
            transformOrigin: "center",
          }}
        />
        {/* Panel 2 — rotated −6deg, same color + opacity
            Where both panels overlap the effective opacity is
            1 − (1−0.85)² ≈ 0.978 → visibly darker center band */}
        <div
          aria-hidden
          className="absolute"
          style={{
            top: 0, bottom: 0,
            left: "-60%", right: "-60%",
            background: NAVY,
            opacity: 0.85,
            transform: "rotate(-6deg)",
            transformOrigin: "center",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-[8%] lg:px-[12%] grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-10 h-[3px] mb-8" style={{ background: BLUE }} />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: BLUE_SOFT }}>
              Gotowi do współpracy
            </p>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              Zrealizujmy razem<br />Twój projekt.
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-10 max-w-sm">
              Skontaktuj się z nami — nasz zespół odpowie na każde pytanie i przygotuje dedykowaną ofertę dla Twojej inwestycji.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-sm tracking-widest transition-opacity hover:opacity-90"
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
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(0,155,238,0.15)", border: "1px solid rgba(0,155,238,0.25)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: BLUE_SOFT + "66" }}>{label}</div>
                  <div className="text-sm whitespace-pre-line leading-relaxed" style={{ color: BLUE_SOFT }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
