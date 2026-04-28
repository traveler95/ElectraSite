import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl, type CzlonekZarzadu } from "../../lib/directus";

export function Zarzad() {
  const [team, setTeam] = useState<CzlonekZarzadu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.zarzad.list().then(setTeam).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Zarząd</h1>
            <p className="text-xl text-blue-100">Poznaj ekspertów stojących za naszym sukcesem</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="text-center"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-200">
                    <ImageWithFallback
                      src={fileUrl(member.zdjecie)}
                      alt={member.imie_nazwisko}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">{member.imie_nazwisko}</h3>
                  <p className="text-gray-600 text-sm mt-1">{member.stanowisko}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
