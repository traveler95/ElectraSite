import { motion } from "motion/react";
import {
  Zap,
  Factory,
  Lightbulb,
  Settings,
  Building2,
  Cable,
  Gauge,
  Wrench,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Services() {
  const mainServices = [
    {
      icon: Zap,
      title: "Instalacje elektryczne",
      description:
        "Kompleksowe usługi instalacji elektrycznych dla nowych budynków i remontów. Nasz certyfikowany zespół zajmuje się wszystkim — od projektu po realizację.",
      features: [
        "Instalacje niskiego i wysokiego napięcia",
        "Systemy rozdziału energii",
        "Projektowanie i montaż systemów oświetlenia",
        "Awaryjne systemy zasilania",
        "Prowadzenie i zarządzanie kablami",
        "Montaż rozdzielnic elektrycznych",
      ],
      image: "https://images.unsplash.com/photo-1759830337357-29c472b6746c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzczNzAxMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: Factory,
      title: "Automatyzacja przemysłowa",
      description:
        "Zaawansowane rozwiązania automatyzacji pozwalające zoptymalizować procesy przemysłowe, zwiększyć wydajność i obniżyć koszty operacyjne.",
      features: [
        "Programowanie i integracja sterowników PLC",
        "Wdrożenie systemów SCADA",
        "Automatyzacja procesów",
        "Integracja robotyki",
        "Przemysłowe systemy sterowania",
        "Automatyzacja maszyn",
      ],
      image: "https://images.unsplash.com/photo-1764115424793-063c2a8b61f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYXV0b21hdGlvbiUyMGZhY3Rvcnl8ZW58MXx8fHwxNzczNzM4OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: Lightbulb,
      title: "Rozwiązania energetyczne",
      description:
        "Zrównoważone systemy energetyczne i odnawialne źródła energii pozwalające zmniejszyć wpływ na środowisko i koszty operacyjne.",
      features: [
        "Montaż paneli fotowoltaicznych",
        "Audyty efektywności energetycznej",
        "Modernizacja oświetlenia LED",
        "Korekcja współczynnika mocy",
        "Systemy zarządzania energią",
        "Doradztwo w zakresie energii odnawialnej",
      ],
      image: "https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NzM2NzIyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: Settings,
      title: "Serwis i wsparcie",
      description:
        "Kompleksowe programy serwisowe i wsparcie 24/7 zapewniające optymalną pracę Twoich instalacji elektrycznych.",
      features: [
        "Programy przeglądów prewencyjnych",
        "Pogotowie techniczne 24/7",
        "Diagnostyka i testy systemów",
        "Modernizacja urządzeń",
        "Inspekcje termowizyjne",
        "Kontrole zgodności z przepisami",
      ],
      image: "https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwdGVjaG5pY2lhbiUyMHdvcmt8ZW58MXx8fHwxNzczNjY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const additionalServices = [
    {
      icon: Building2,
      title: "Projekty komercyjne",
      description: "Rozwiązania elektryczne dla biur, obiektów handlowych i budynków komercyjnych.",
    },
    {
      icon: Cable,
      title: "Teletechnika i sieci",
      description: "Montaż okablowania strukturalnego i infrastruktury sieciowej.",
    },
    {
      icon: Gauge,
      title: "Pomiary i certyfikacja",
      description: "Kompleksowe pomiary elektryczne i certyfikacja bezpieczeństwa instalacji.",
    },
    {
      icon: Wrench,
      title: "Montaż urządzeń",
      description: "Profesjonalny montaż przemysłowych urządzeń elektrycznych.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Konsultacja",
      description: "Zaczynamy od poznania Twoich potrzeb i wymagań projektowych.",
    },
    {
      step: "02",
      title: "Projekt i planowanie",
      description: "Nasi inżynierowie tworzą szczegółowe plany i specyfikacje techniczne.",
    },
    {
      step: "03",
      title: "Realizacja",
      description: "Nasi certyfikowani technicy wykonują projekt z najwyższą precyzją.",
    },
    {
      step: "04",
      title: "Odbiór i testy",
      description: "Dokładne testy i dokumentacja przed zakończeniem projektu.",
    },
    {
      step: "05",
      title: "Wsparcie",
      description: "Bieżący serwis i wsparcie techniczne dla długoterminowego sukcesu.",
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Nasza oferta</h1>
            <p className="text-xl text-blue-100">
              Kompleksowe rozwiązania elektryczne dopasowane do potrzeb Twojej firmy,
              realizowane przez certyfikowanych specjalistów z wieloletnim doświadczeniem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={!isEven ? "lg:col-start-2" : ""}>
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>

                    <div className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Zapytaj o wycenę
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Dodatkowe usługi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferujemy szeroki zakres specjalistycznych usług elektrycznych
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
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
              Nasz proces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ustrukturyzowane podejście zapewniające jakość i efektywność na każdym etapie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Potrzebujesz rozwiązania szytego na miarę?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Skontaktuj się z nami, aby omówić swoje wymagania. Nasz zespół jest gotowy
              zaprojektować dedykowane rozwiązanie elektryczne dla Twojej firmy.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Skontaktuj się
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
