import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl, type Projekt, type KategoriaProjektu } from "../../lib/directus";

export function Products() {
  const [projekty, setProjekty] = useState<Projekt[]>([]);
  const [kategorie, setKategorie] = useState<KategoriaProjektu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.projekty.list(),
      api.kategorie.list(),
    ]).then(([p, k]) => {
      setProjekty(p);
      setKategorie(k);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = projekty.filter((p) => {
    const categoryId = typeof p.kategoria === "object" ? (p.kategoria as any).id ?? p.kategoria : p.kategoria;
    const matchesCategory = selectedCategory === "all" || categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.tytul.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (kategoria: Projekt["kategoria"]) => {
    if (typeof kategoria === "object" && kategoria !== null) {
      return (kategoria as { nazwa: string }).nazwa;
    }
    return kategorie.find((k) => k.id === kategoria)?.nazwa ?? "";
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Nasze projekty</h1>
            <p className="text-xl text-blue-100">
              Realizacje, z których jesteśmy dumni — od obiektów biurowych po przemysł energetyczny.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj projektów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <Filter className="w-4 h-4" />
                Wszystkie
              </button>
              {kategorie.map((kat) => (
                <button
                  key={kat.id}
                  onClick={() => setSelectedCategory(kat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === kat.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {kat.nazwa}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Brak projektów spełniających kryteria.</p>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((projekt, index) => (
                <motion.div
                  key={projekt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={fileUrl(projekt.zdjecie_glowne)}
                      alt={projekt.tytul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {getCategoryName(projekt.kategoria)}
                    </span>
                    <h3 className="font-semibold text-lg text-gray-900 mt-1 mb-2">{projekt.tytul}</h3>
                    {projekt.opis && (
                      <p
                        className="text-gray-600 text-sm line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: projekt.opis }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
