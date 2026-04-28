import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl, type Aktualnosc } from "../../lib/directus";

export function AktualnosciPage() {
  const [news, setNews] = useState<Aktualnosc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Aktualnosc | null>(null);

  useEffect(() => {
    api.aktualnosci.list().then(setNews).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }) : "";

  if (selected) {
    return (
      <div className="bg-white">
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelected(null)}
              className="text-blue-200 hover:text-white mb-4 text-sm flex items-center gap-1 transition-colors"
            >
              ← Powrót do aktualności
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold">{selected.tytul}</h1>
            {selected.data_publikacji && (
              <p className="mt-3 text-blue-200 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(selected.data_publikacji)}
              </p>
            )}
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {selected.miniaturka && (
              <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-10">
                <ImageWithFallback
                  src={fileUrl(selected.miniaturka)}
                  alt={selected.tytul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selected.tresc || selected.zajawka || "" }}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Aktualności</h1>
            <p className="text-xl text-blue-100">Najnowsze informacje z życia firmy</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Brak aktualności.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelected(item)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <ImageWithFallback
                      src={fileUrl(item.miniaturka)}
                      alt={item.tytul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {item.data_publikacji && (
                    <p className="text-sm text-gray-400 flex items-center gap-1 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.data_publikacji)}
                    </p>
                  )}
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {item.tytul}
                  </h3>
                  {item.zajawka && (
                    <p className="text-gray-600 text-sm line-clamp-3">{item.zajawka}</p>
                  )}
                  <span className="text-blue-600 text-sm font-medium mt-3 inline-block group-hover:underline">
                    Czytaj więcej →
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
