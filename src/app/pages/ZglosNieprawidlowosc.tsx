import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle, ShieldAlert } from "lucide-react";

export function ZglosNieprawidlowosc() {
  const [form, setForm] = useState({ opis: "", kontakt: "", zgoda: false });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.zgoda) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Zgłoś nieprawidłowość</h1>
            <p className="text-xl text-blue-100">Twoje zgłoszenie jest anonimowe i zostanie rozpatrzone z najwyższą starannością</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 text-sm leading-relaxed">
              System zgłaszania nieprawidłowości służy do informowania o potencjalnych naruszeniach prawa, etyki lub wewnętrznych procedur firmy. Zgłoszenia są traktowane poufnie i rozpatrywane przez uprawnione osoby.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zgłoszenie przyjęte</h3>
              <p className="text-gray-600">Dziękujemy za zgłoszenie. Zostanie ono rozpatrzone przez uprawnioną osobę.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opis nieprawidłowości *</label>
                <textarea
                  required
                  rows={8}
                  value={form.opis}
                  onChange={e => setForm({ ...form, opis: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Opisz szczegółowo zaobserwowaną nieprawidłowość..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dane kontaktowe (opcjonalnie)</label>
                <input
                  type="text"
                  value={form.kontakt}
                  onChange={e => setForm({ ...form, kontakt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E-mail lub telefon (pole opcjonalne)"
                />
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="zgoda" checked={form.zgoda} onChange={e => setForm({ ...form, zgoda: e.target.checked })} required className="mt-1" />
                <label htmlFor="zgoda" className="text-sm text-gray-600">
                  Potwierdzam, że zgłoszenie jest oparte na mojej najlepszej wiedzy i jest składane w dobrej wierze. *
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting || !form.zgoda}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {submitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
