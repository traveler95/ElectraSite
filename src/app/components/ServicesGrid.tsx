import { motion } from "motion/react";
import {
  Zap,
  Flame,
  Factory,
  Thermometer,
  Wind,
  Droplets,
  Lightbulb,
  Cpu,
  Settings,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Service {
  icon: any;
  title: string;
  titleEn: string;
  description: string;
  color: string;
  gradient: string;
  image: string;
}

const services: Service[] = [
  {
    icon: Factory,
    title: "Instalacje technologiczne i przemysłowe",
    titleEn: "Technological & Industrial Installations",
    description: "Complete industrial process installations for manufacturing facilities and production lines",
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1768128834332-7d3479c8d634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHRlY2hub2xvZ3klMjBwaXBlc3xlbnwxfHx8fDE3NzM3NTQ1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Flame,
    title: "Instalacje ochrony przeciwpożarowej",
    titleEn: "Fire Protection Systems",
    description: "Advanced fire detection, suppression, and safety systems for complete protection",
    color: "text-red-600",
    gradient: "from-red-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1522208615167-4c91b0123c02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwcHJvdGVjdGlvbiUyMHNwcmlua2xlciUyMHN5c3RlbXxlbnwxfHx8fDE3NzM3NTQ1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Zap,
    title: "Instalacje elektryczne",
    titleEn: "Electrical Installations",
    description: "Full-spectrum electrical systems from design to implementation and maintenance",
    color: "text-yellow-600",
    gradient: "from-yellow-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1759830337357-29c472b6746c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjB3aXJpbmclMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzczNzU0NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Thermometer,
    title: "Instalacje grzewcze i chłodnicze",
    titleEn: "Heating & Cooling Systems",
    description: "Energy-efficient heating and refrigeration solutions for industrial applications",
    color: "text-orange-600",
    gradient: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1613063457061-eecde6f4b20d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaGVhdGluZyUyMGNvb2xpbmclMjBodmFjfGVufDF8fHx8MTc3Mzc1NDU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Wind,
    title: "Instalacje wentylacyjne i klimatyzacyjne",
    titleEn: "HVAC Systems",
    description: "Advanced ventilation and air conditioning for optimal environmental control",
    color: "text-sky-600",
    gradient: "from-sky-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1760537760008-5fd5b1f872d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjB2ZW50aWxhdGlvbiUyMGR1Y3R8ZW58MXx8fHwxNzczNzU0NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Droplets,
    title: "Instalacje wodno-kanalizacyjne",
    titleEn: "Water & Sewage Systems",
    description: "Comprehensive plumbing infrastructure for commercial and industrial facilities",
    color: "text-cyan-600",
    gradient: "from-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1613929906260-c9377d135547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGx1bWJpbmclMjB3YXRlciUyMHBpcGVzfGVufDF8fHx8MTc3Mzc1NDU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Lightbulb,
    title: "Systemy oświetleniowe",
    titleEn: "Lighting Systems",
    description: "Modern LED and smart lighting solutions for efficiency and safety",
    color: "text-amber-600",
    gradient: "from-amber-500 to-yellow-500",
    image: "https://images.unsplash.com/photo-1770153792570-fd188336199a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsZWQlMjBsaWdodGluZyUyMHN5c3RlbXxlbnwxfHx8fDE3NzM3NTQ1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Cpu,
    title: "Systemy zarządzania budynkiem (BMS)",
    titleEn: "Building Management Systems",
    description: "Intelligent automation and monitoring systems for building optimization",
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGF1dG9tYXRpb24lMjBjb250cm9sJTIwc3lzdGVtfGVufDF8fHx8MTc3Mzc1NDU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Settings,
    title: "Techniczny Facility Management",
    titleEn: "Technical Facility Management",
    description: "Complete technical maintenance and facility management services",
    color: "text-gray-600",
    gradient: "from-gray-500 to-slate-500",
    image: "https://images.unsplash.com/photo-1772209415876-76ea6cbc2f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpbGl0eSUyMG1hbmFnZW1lbnQlMjBpbmR1c3RyaWFsJTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzczNzU0NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden">
      {/* Circuit-inspired background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">Nasza Oferta</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-transparent bg-clip-text">
            Kompleksowe Usługi M&E
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            9 kluczowych obszarów specjalizacji
          </p>
        </motion.div>

        {/* Unique Bento-Box Grid Layout */}
        <div className="grid grid-cols-6 grid-rows-4 gap-3 h-[600px]">
          {/* Card 1 - Large Featured (2x2) - Full Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[0].image}
                alt={services[0].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 to-cyan-600/85 group-hover:from-blue-600/80 group-hover:to-cyan-600/80 transition-colors" />
            <div className="relative h-full p-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 mb-3">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-white/70 mb-1">01</div>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  {services[0].title}
                </h3>
                <p className="text-sm text-white/90 font-medium mb-1">{services[0].titleEn}</p>
                <p className="text-xs text-white/70 leading-relaxed">{services[0].description}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Tall (1x2) - Top Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 row-span-2 group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200"
          >
            <div className="relative h-36 overflow-hidden">
              <ImageWithFallback
                src={services[1].image}
                alt={services[1].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30" />
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">02</div>
            </div>
            <div className="p-3">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 mb-2">
                <Flame className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{services[1].title}</h3>
              <p className="text-[10px] text-red-600 font-semibold mb-2">{services[1].titleEn}</p>
              <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{services[1].description}</p>
            </div>
          </motion.div>

          {/* Card 3 - Wide (2x1) - Full Background */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-2 row-span-1 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[2].image}
                alt={services[2].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 via-yellow-600/85 to-amber-600/75 group-hover:from-yellow-600/85 group-hover:to-amber-600/70 transition-colors" />
            <div className="relative h-full p-3 flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-white/70 mb-0.5">03</div>
                <h3 className="text-base font-black text-white mb-0.5 leading-tight">{services[2].title}</h3>
                <p className="text-xs text-white/90 font-semibold">{services[2].titleEn}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Square (1x1) - Full Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[3].image}
                alt={services[3].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/85 to-red-600/85 group-hover:from-orange-600/80 group-hover:to-red-600/80 transition-colors" />
            <div className="relative h-full p-3 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[9px] font-bold text-gray-700">04</div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight mb-0.5">{services[3].title}</h3>
                <p className="text-[10px] text-white/90 font-semibold">{services[3].titleEn}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5 - Tall (1x2) - Top Image */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="col-span-1 row-span-2 group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-200"
          >
            <div className="relative h-36 overflow-hidden">
              <ImageWithFallback
                src={services[4].image}
                alt={services[4].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-blue-500/30" />
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">05</div>
            </div>
            <div className="p-3">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sky-50 mb-2">
                <Wind className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{services[4].title}</h3>
              <p className="text-[10px] text-sky-600 font-semibold mb-2">{services[4].titleEn}</p>
              <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{services[4].description}</p>
            </div>
          </motion.div>

          {/* Card 6 - Wide (2x1) - Full Background */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-2 row-span-1 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[5].image}
                alt={services[5].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 via-cyan-600/85 to-teal-600/75 group-hover:from-cyan-600/85 group-hover:to-teal-600/70 transition-colors" />
            <div className="relative h-full p-3 flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex-shrink-0">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-white/70 mb-0.5">06</div>
                <h3 className="text-base font-black text-white mb-0.5 leading-tight">{services[5].title}</h3>
                <p className="text-xs text-white/90 font-semibold">{services[5].titleEn}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 7 - Square (1x1) - Full Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[6].image}
                alt={services[6].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/85 to-yellow-600/85 group-hover:from-amber-600/80 group-hover:to-yellow-600/80 transition-colors" />
            <div className="relative h-full p-3 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[9px] font-bold text-gray-700">07</div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight mb-0.5">{services[6].title}</h3>
                <p className="text-[10px] text-white/90 font-semibold">{services[6].titleEn}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 8 - Large Featured (2x2) - Full Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[7].image}
                alt={services[7].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 to-purple-600/85 group-hover:from-indigo-600/80 group-hover:to-purple-600/80 transition-colors" />
            <div className="relative h-full p-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 mb-3">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-white/70 mb-1">08</div>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  {services[7].title}
                </h3>
                <p className="text-sm text-white/90 font-medium mb-1">{services[7].titleEn}</p>
                <p className="text-xs text-white/70 leading-relaxed">{services[7].description}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 9 - Wide (3x1) - Full Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="col-span-3 row-span-1 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={services[8].image}
                alt={services[8].titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 group-hover:from-gray-800/85 group-hover:to-gray-900/85 transition-colors" />
            <div className="relative h-full p-4 flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white/60 mb-1">09</div>
                <h3 className="text-lg font-black text-white mb-1 leading-tight">
                  {services[8].title}
                </h3>
                <p className="text-sm text-white/90 font-medium mb-1">{services[8].titleEn}</p>
                <p className="text-xs text-white/70">{services[8].description}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Poznaj Wszystkie Usługi
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}