import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fileUrl } from "../../lib/directus";

type Klient = { id: number; nazwa: string; logo: string | null };

export function KlienciPage() {
  const [items, setItems] = useState<Klient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cms.23.88.63.245.sslip.io/items/klienci")
      .then(r => r.json())
      .then(d => setItems(d.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Klienci</h1>
            <p className="text-xl text-blue-100">Zaufały nam wiodące firmy w Polsce i na świecie</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[...Array(12)].map((_, i) => <div key={i} className="aspect-[3/2] bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Lista klientów zostanie wkrótce uzupełniona.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {items.map((k, i) => (
                <motion.div key={k.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} className="flex items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  {k.logo ? (
                    <ImageWithFallback src={fileUrl(k.logo)} alt={k.nazwa} className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                  ) : (
                    <span className="text-sm font-medium text-gray-600 text-center">{k.nazwa}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
