import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl } from "../../lib/directus";

type Certyfikat = { id: number; nazwa: string; zdjecie: string | null };

export function CertyfikatyPage() {
  const [items, setItems] = useState<Certyfikat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cms.23.88.63.245.sslip.io/items/certyfikaty")
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Certyfikaty</h1>
            <p className="text-xl text-blue-100">Nasze certyfikaty potwierdzające najwyższe standardy</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Certyfikaty zostaną wkrótce dodane.</p>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {items.map((cert, i) => (
                <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="text-center">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-3">
                    <ImageWithFallback src={fileUrl(cert.zdjecie)} alt={cert.nazwa} className="w-full h-full object-contain p-4" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{cert.nazwa}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
