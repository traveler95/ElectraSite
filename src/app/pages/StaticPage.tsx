import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { api, type Strona } from "../../lib/directus";

interface Props {
  slug: string;
  title: string;
}

export function StaticPage({ slug, title }: Props) {
  const [page, setPage] = useState<Strona | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.strony.getBySlug(slug).then(setPage).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

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
            <h1 className="text-4xl sm:text-5xl font-bold">{page?.tytul ?? title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ) : page?.tresc ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.tresc }}
            />
          ) : (
            <p className="text-gray-400 text-center py-16">
              Treść tej strony zostanie wkrótce uzupełniona.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
