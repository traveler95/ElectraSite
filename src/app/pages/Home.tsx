import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Zap,
  Building2,
  Cpu,
  Cable,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Briefcase,
  TrendingUp,
  Play,
  ChevronRight,
  Sparkles,
  Shield,
  Target,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProjectsCarousel } from "../components/ProjectsCarousel";
import { ServicesGrid } from "../components/ServicesGrid";
import { api, fileUrl, type Projekt, type Oferta } from "../../lib/directus";

export function Home() {
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [oferty, setOferty] = useState<Oferta[]>([]);

  useEffect(() => {
    api.projekty.list({ limit: '6' }).then(setProjekty).catch(() => {});
    api.oferty.list().then(setOferty).catch(() => {});
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Stats counter animation
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    { number: 2500, suffix: "+", label: "Zrealizowanych projektów", icon: Briefcase },
    { number: 850, suffix: "+", label: "Aktywnych klientów", icon: Users },
    { number: 25, suffix: " lat", label: "Doświadczenia", icon: Award },
    { number: 99, suffix: "%", label: "Wskaźnik sukcesu", icon: TrendingUp },
  ];

  const projects = [
    {
      title: "Industrial Power Plant",
      category: "Energy Infrastructure",
      image: "https://images.unsplash.com/photo-1559125531-ba754eee1819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcG93ZXIlMjBwbGFudCUyMG5pZ2h0fGVufDF8fHx8MTc3Mzc1MjQ0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Manufacturing Facility",
      category: "Automation & Control",
      image: "https://images.unsplash.com/photo-1767281075989-7571356d477e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMG1hY2hpbmVyeSUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzczNzUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Commercial Complex",
      category: "Electrical Systems",
      image: "https://images.unsplash.com/photo-1669615654916-f927f01309ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZWxlY3RyaWNhbCUyMHdvcmtlcnxlbnwxfHx8fDE3NzM3NTI0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasAnimated, end]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Full Screen with Parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] bg-gray-900 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/95 to-black/90 z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759692071712-adc78a8516c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZWxlY3RyaWNhbCUyMHBhbmVsJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3Mzc1MjQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Industrial Electrical"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Content */}
        <motion.div style={{ y }} className="relative z-30 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-100">
                  Lider rozwiązań elektrycznych od 1999 roku
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-[1.1]"
              >
                Zasilamy
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Twoją Przyszłość
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
              >
                Kompleksowe rozwiązania elektryczne, mechaniczne i automatyzacyjne dla największych
                projektów przemysłowych i komercyjnych w Polsce.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/contact"
                  className="group px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:-translate-y-0.5 inline-flex items-center justify-center gap-3"
                >
                  Rozpocznij projekt
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group px-8 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-3">
                  <Play className="w-5 h-5" />
                  Zobacz nasze realizacje
                </button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20"
              >
                <div>
                  <div className="text-3xl font-bold text-white mb-1">2500+</div>
                  <div className="text-sm text-gray-400">Projektów</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">850+</div>
                  <div className="text-sm text-gray-400">Klientów</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">25 lat</div>
                  <div className="text-sm text-gray-400">Doświadczenia</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid - 9 Services */}
      <ServicesGrid />

      {/* Projects Carousel - Second Segment */}
      <ProjectsCarousel />

      {/* Stats Section - Animated Counters */}
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.3)_50%,transparent_75%)] bg-[length:250px_250px] animate-[slide_20s_linear_infinite]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-5xl lg:text-6xl font-black text-white mb-2">
                    {hasAnimated ? <Counter end={stat.number} suffix={stat.suffix} /> : "0"}
                  </div>
                  <div className="text-sm lg:text-base text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Portfolio</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                Wyróżnione projekty
              </h2>
              <p className="text-xl text-gray-600">
                Transformujemy branże dzięki nowoczesnym rozwiązaniom elektrycznym i mechanicznym
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors"
              >
                Zobacz wszystkie projekty
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-600 font-medium group-hover:text-blue-600 group-hover:gap-2 transition-all">
                    Zobacz projekt
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Dlaczego liderzy branży wybierają Electrę
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Łączymy dziesięciolecia doświadczenia z najnowszą technologią, dostarczając
                niezrównane rozwiązania elektryczne i mechaniczne dla najbardziej ambitnych
                projektów w Polsce.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Certyfikat ISO 9001",
                    description: "Systemy zarządzania jakością uznawane na całym świecie",
                  },
                  {
                    icon: Users,
                    title: "Zespół ekspertów",
                    description: "Ponad 150 certyfikowanych specjalistów do Twoich usług",
                  },
                  {
                    icon: Shield,
                    title: "Bezpieczeństwo przede wszystkim",
                    description: "Najwyższe standardy bezpieczeństwa na każdym projekcie",
                  },
                  {
                    icon: TrendingUp,
                    title: "Rozwiązania na przyszłość",
                    description: "Najnowsze technologie i zrównoważone praktyki",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30"
                >
                  Poznaj naszą historię
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759692071712-adc78a8516c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZWxlY3RyaWNhbCUyMHBhbmVsJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3Mzc1MjQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Electrical Panel"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1669615654916-f927f01309ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZWxlY3RyaWNhbCUyMHdvcmtlcnxlbnwxfHx8fDE3NzM3NTI0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Construction Worker"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1770838773181-e1b17ec22fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwY2FibGUlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzczNzUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Cable Installation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1767281075989-7571356d477e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMG1hY2hpbmVyeSUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzczNzUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Factory Automation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Diagonal Design */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with Diagonal Split */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4aDI4VjE2SDM2em0xNCAyNGgtNlYyMmg2djE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Gotowy na kolejny projekt z Electrą?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed">
              Dołącz do ponad 850 liderów branży, którzy ufają Electrze w realizacji
              najbardziej wymagających instalacji elektrycznych i mechanicznych.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 inline-flex items-center justify-center gap-3"
              >
                Bezpłatna konsultacja
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="px-10 py-5 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-3"
              >
                Odkryj usługi
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/20">
              {[
                { label: "ISO 9001", sublabel: "Certyfikat" },
                { label: "24/7", sublabel: "Wsparcie" },
                { label: "15 lat", sublabel: "Gwarancja" },
                { label: "100%", sublabel: "Satysfakcja" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">{badge.label}</div>
                  <div className="text-sm text-gray-400">{badge.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}