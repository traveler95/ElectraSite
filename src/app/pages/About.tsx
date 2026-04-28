import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl, type CzlonekZarzadu } from "../../lib/directus";

export function About() {
  const [team, setTeam] = useState<CzlonekZarzadu[]>([]);

  useEffect(() => {
    api.zarzad.list().then(setTeam).catch(() => {});
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Jakość i bezpieczeństwo",
      description:
        "Priorytetem jest dla nas najwyższa jakość i przestrzeganie zasad bezpieczeństwa w każdym projekcie.",
    },
    {
      icon: Lightbulb,
      title: "Innowacyjność",
      description:
        "Wdrażamy najnowsze technologie i innowacyjne rozwiązania, aby dostarczać wyjątkowe rezultaty.",
    },
    {
      icon: Heart,
      title: "Orientacja na klienta",
      description:
        "Budujemy długotrwałe relacje poprzez zaangażowanie, transparentność i doskonałą obsługę.",
    },
    {
      icon: TrendingUp,
      title: "Ciągły rozwój",
      description:
        "Inwestujemy w rozwój naszego zespołu i nadążamy za trendami oraz standardami branżowymi.",
    },
  ];

  const timeline = [
    {
      year: "1999",
      title: "Założenie firmy",
      description: "Electra M&E Polska została założona z misją świadczenia usług elektrycznych najwyższej jakości.",
    },
    {
      year: "2005",
      title: "Certyfikat ISO",
      description: "Uzyskanie certyfikatu ISO 9001 potwierdzającego nasze zaangażowanie w jakość.",
    },
    {
      year: "2012",
      title: "Ekspansja",
      description: "Rozszerzyliśmy działalność na cały kraj, obsługując czołowych klientów przemysłowych w Polsce.",
    },
    {
      year: "2018",
      title: "Dział energii odnawialnej",
      description: "Uruchomienie działu rozwiązań energii odnawialnej wspierającego zrównoważony rozwój.",
    },
    {
      year: "2024",
      title: "Inteligentna automatyzacja",
      description: "Wdrożenie zaawansowanych rozwiązań automatyzacji i IoT dla nowoczesnych branż.",
    },
  ];


  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">O Electrze</h1>
            <p className="text-xl text-blue-100">
              Z ponad 25-letnim doświadczeniem w elektrotechnice jesteśmy zaufanym partnerem
              w realizacji kompleksowych rozwiązań elektrycznych w Polsce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nasza misja</h2>
              <p className="text-gray-700 leading-relaxed">
                Dostarczanie wyjątkowych rozwiązań elektrycznych przekraczających oczekiwania klientów
                poprzez innowacyjność, najwyższą jakość wykonania i niezachwiane zaangażowanie
                w bezpieczeństwo. Dążymy do bycia najbardziej zaufanym partnerem dla firm
                poszukujących niezawodnych usług elektrycznych i zrównoważonych rozwiązań energetycznych.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl"
            >
              <div className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nasza wizja</h2>
              <p className="text-gray-700 leading-relaxed">
                Bycie wiodącym dostawcą innowacyjnych rozwiązań elektrycznych i energetycznych
                w Polsce, uznanym za doskonałość techniczną, zrównoważone praktyki i pozytywny
                wpływ na społeczności, którym służymy. Wyobrażamy sobie przyszłość, w której każda
                firma ma dostęp do nowoczesnych, ekologicznych systemów elektrycznych.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Nasza historia
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Założona w 1999 roku, Electra M&E Polska rozpoczęła działalność jako niewielki
                  zespół pasjonatów elektrotechniki z wizją transformacji branży poprzez jakość
                  i innowacje. To, co zaczęło się w skromnym biurze w Warszawie, wyrosło na jednego
                  z najbardziej szanowanych dostawców rozwiązań elektrycznych w Polsce.
                </p>
                <p>
                  Przez ostatnie 25 lat zrealizowaliśmy setki projektów — od małych instalacji
                  komercyjnych po wielkoskalowe systemy automatyzacji przemysłowej. Nasze zaangażowanie
                  w doskonałość zaowocowało certyfikatem ISO 9001 i zaufaniem czołowych firm w całym kraju.
                </p>
                <p>
                  Dziś nasz zespół ponad 50 certyfikowanych specjalistów nadal przesuwa granice możliwości,
                  wdrażając rozwiązania energii odnawialnej, inteligentną automatyzację i zrównoważone
                  praktyki. Nie budujemy tylko instalacji elektrycznych — zasilamy przyszłość Polski.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwdGVjaG5pY2lhbiUyMHdvcmt8ZW58MXx8fHwxNzczNjY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Electrical Technician at Work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nasze wartości</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zasady, które kierują wszystkim, co robimy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nasza droga</h2>
            <p className="text-xl text-gray-600">Kluczowe kamienie milowe w naszej 25-letniej historii</p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="inline-block px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm">
                    {item.year}
                  </div>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mt-1" />
                  {index < timeline.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-0.5 h-16 bg-blue-200 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Zarząd
            </h2>
            <p className="text-xl text-gray-600">
              Poznaj ekspertów stojących za naszym sukcesem
            </p>
          </motion.div>

          {team.length === 0 ? (
            <p className="text-center text-gray-400">Brak danych o zarządzie.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-200">
                    <ImageWithFallback
                      src={fileUrl(member.zdjecie)}
                      alt={member.imie_nazwisko}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">{member.imie_nazwisko}</h3>
                  <p className="text-gray-600 text-sm">{member.stanowisko}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "50+", label: "Pracowników" },
              { icon: Award, number: "500+", label: "Zrealizowanych projektów" },
              { icon: Shield, number: "25+", label: "Lat doświadczenia" },
              { icon: TrendingUp, number: "200+", label: "Zadowolonych klientów" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
