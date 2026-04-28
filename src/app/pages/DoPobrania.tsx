import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, FileText } from "lucide-react";

type Plik = { id: number; nazwa: string; plik: string | null; data: string | null };

export function DoPobrania() {
  const [items, setItems] = useState<Plik[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cms.23.88.63.245.sslip.io/items/pliki_do_pobrania?sort=-data")
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Do pobrania</h1>
            <p className="text-xl text-blue-100">Dokumenty i materiały do pobrania</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Brak plików do pobrania.</p>
          ) : (
            <div className="space-y-3">
              {items.map((plik, i) => (
                <motion.div key={plik.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  {plik.plik ? (
                    <a
                      href={`https://cms.23.88.63.245.sslip.io/assets/${plik.plik}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="flex-1 font-medium text-gray-800 group-hover:text-blue-700">{plik.nazwa}</span>
                      {plik.data && <span className="text-sm text-gray-400">{new Date(plik.data).toLocaleDateString("pl-PL")}</span>}
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{plik.nazwa}</span>
                    </div>
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
