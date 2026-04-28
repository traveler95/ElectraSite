import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Company {
  id: number;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
  isExternal: boolean;
  color: string;
  gradient: string;
  image: string;
  services: string[];
}

const companies: Company[] = [
  {
    id: 0,
    name: "Electra M&E Polska",
    shortName: "M&E",
    tagline: "Mechanical & Electrical Excellence",
    description: "Leading provider of comprehensive mechanical and electrical installations for industrial and commercial facilities. Delivering cutting-edge HVAC, electrical systems, fire protection, and intelligent building management solutions.",
    logo: "https://www.electra.co.il/filestock/file/1502610340683-0.png",
    website: "/",
    isExternal: false,
    color: "#3B82F6",
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    image: "https://images.unsplash.com/photo-1759830337357-29c472b6746c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwaW5zdGFsbGF0aW9uJTIwaW5kdXN0cmlhbCUyMHBhbmVsfGVufDF8fHx8MTc3Mzc1NTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    services: [
      "Electrical Installations",
      "HVAC Systems",
      "Fire Protection",
      "Building Management",
      "Industrial Systems",
      "Facility Management"
    ],
  },
  {
    id: 1,
    name: "Geokat",
    shortName: "Geokat",
    tagline: "Engineering & Construction Solutions",
    description: "Expert engineering and construction company delivering innovative solutions for complex infrastructure projects. Specialized in civil engineering, precision surveying, and comprehensive technical consultancy services.",
    logo: "https://geokat.pl/img/brand-new-logo.png",
    website: "https://geokat.pl/",
    isExternal: true,
    color: "#10B981",
    gradient: "from-emerald-500 via-emerald-600 to-teal-600",
    image: "https://images.unsplash.com/photo-1655975719898-8f3432eed322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwY29uc3RydWN0aW9uJTIwc2l0ZXxlbnwxfHx8fDE3NzM3NDk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    services: [
      "Civil Engineering",
      "Land Surveying",
      "Technical Design",
      "Project Management",
      "Infrastructure Dev",
      "Consultancy"
    ],
  },
  {
    id: 2,
    name: "Ipid",
    shortName: "Ipid",
    tagline: "Electrical & Automation Installations",
    description: "Specialized in advanced electrical systems and automation installations for industrial and commercial facilities. Delivering cutting-edge automation solutions, control systems, and comprehensive electrical infrastructure for modern manufacturing and industrial environments.",
    logo: "https://www.ipid-eng.pl/dokumenty/szablonyimg/5-logo.svg",
    website: "https://www.ipid-eng.pl/",
    isExternal: true,
    color: "#8B5CF6",
    gradient: "from-violet-500 via-violet-600 to-purple-600",
    image: "https://images.unsplash.com/photo-1767281075989-7571356d477e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHJvY2VzcyUyMGF1dG9tYXRpb24lMjBmYWN0b3J5fGVufDF8fHx8MTc3Mzc1NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    services: [
      "Electrical Installations",
      "Industrial Automation",
      "Control Systems",
      "PLC Programming",
      "SCADA Systems",
      "Power Distribution"
    ],
  },
  {
    id: 3,
    name: "Electra Construction",
    shortName: "Construction",
    tagline: "Building the Future",
    description: "Comprehensive construction services for commercial and industrial projects. From initial concept to final completion, delivering high-quality construction solutions with unwavering focus on innovation and sustainability.",
    logo: "https://www.electra.co.il/filestock/file/1502610340683-0.png",
    website: "/construction",
    isExternal: false,
    color: "#EAB308",
    gradient: "from-yellow-500 via-yellow-600 to-amber-600",
    image: "https://images.unsplash.com/photo-1667604579449-14298726118b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM2Mjg3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    services: [
      "General Construction",
      "Industrial Buildings",
      "Commercial Facilities",
      "Project Development",
      "Turnkey Solutions",
      "Construction Mgmt"
    ],
  },
];

export function ElectraGroup() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.15, 0.25],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              One Group, Four Expertises
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Electra Group
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            A unified ecosystem of specialized companies delivering comprehensive solutions across engineering, construction, and technical services
          </p>
        </motion.div>
      </div>

      {/* Interactive Circle */}
      <div className="relative z-10 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-square max-w-4xl mx-auto">
            {/* Center Content - Logo or Company Info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {hoveredId === null ? (
                  // Default State - Show ELECTRA GROUP
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <Building2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-white/60 mb-2">ELECTRA GROUP</h2>
                    <p className="text-sm text-white/40 max-w-xs">
                      Hover over a section to explore
                    </p>
                  </motion.div>
                ) : (
                  // Hovered State - Show Company Info
                  <motion.div
                    key={`company-${hoveredId}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-center max-w-md px-8"
                  >
                    {/* Logo */}
                    <div className="mb-4 h-12 flex items-center justify-center">
                      <img
                        src={companies[hoveredId].logo}
                        alt={`${companies[hoveredId].name} logo`}
                        className="max-h-12 max-w-[180px] object-contain brightness-0 invert"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Company Name */}
                    <h3 className="text-2xl font-black text-white mb-2">
                      {companies[hoveredId].name}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-base font-semibold bg-gradient-to-r ${companies[hoveredId].gradient} bg-clip-text text-transparent mb-4`}>
                      {companies[hoveredId].tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {companies[hoveredId].description}
                    </p>

                    {/* Services */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {companies[hoveredId].services.map((service, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-gray-300"
                          >
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${companies[hoveredId].gradient} flex-shrink-0`} />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pointer-events-auto">
                      <a
                        href={companies[hoveredId].website}
                        target={companies[hoveredId].isExternal ? "_blank" : undefined}
                        rel={companies[hoveredId].isExternal ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${companies[hoveredId].gradient} text-white font-bold hover:shadow-2xl transition-all hover:-translate-y-1 group/btn text-sm`}
                      >
                        <span>Visit Website</span>
                        {companies[hoveredId].isExternal ? (
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        )}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Circle Segments */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <defs>
                {companies.map((company) => (
                  <linearGradient
                    key={company.id}
                    id={`gradient-${company.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={company.color} stopOpacity="0.6" />
                    <stop offset="50%" stopColor={company.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={company.color} stopOpacity="0.5" />
                  </linearGradient>
                ))}
                {/* Glass effect filters */}
                <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Outer glow ring for each segment on hover */}
              {companies.map((company, index) => {
                const angle = (index * 90) - 45;
                const startAngle = angle;
                const endAngle = angle + 90;
                const isHovered = hoveredId === company.id;

                if (!isHovered) return null;

                const glowRadius = 195;
                const glowInnerRadius = 95;

                const startOuterX = 200 + glowRadius * Math.cos((startAngle * Math.PI) / 180);
                const startOuterY = 200 + glowRadius * Math.sin((startAngle * Math.PI) / 180);
                const endOuterX = 200 + glowRadius * Math.cos((endAngle * Math.PI) / 180);
                const endOuterY = 200 + glowRadius * Math.sin((endAngle * Math.PI) / 180);

                const startInnerX = 200 + glowInnerRadius * Math.cos((endAngle * Math.PI) / 180);
                const startInnerY = 200 + glowInnerRadius * Math.sin((endAngle * Math.PI) / 180);
                const endInnerX = 200 + glowInnerRadius * Math.cos((startAngle * Math.PI) / 180);
                const endInnerY = 200 + glowInnerRadius * Math.sin((startAngle * Math.PI) / 180);

                const pathData = `
                  M ${startOuterX} ${startOuterY}
                  A ${glowRadius} ${glowRadius} 0 0 1 ${endOuterX} ${endOuterY}
                  L ${startInnerX} ${startInnerY}
                  A ${glowInnerRadius} ${glowInnerRadius} 0 0 0 ${endInnerX} ${endInnerY}
                  Z
                `;

                return (
                  <motion.path
                    key={`glow-${company.id}`}
                    d={pathData}
                    fill={company.color}
                    fillOpacity="0.3"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}

              {companies.map((company, index) => {
                const angle = (index * 90) - 45; // Start at -45 degrees
                const startAngle = angle;
                const endAngle = angle + 90;
                const isHovered = hoveredId === company.id;

                // Calculate arc path with animation - create both states
                const radiusNormal = 170;
                const innerRadiusNormal = 110;
                const radiusHover = 185;
                const innerRadiusHover = 105;

                // Use the appropriate radius based on hover state
                const radius = isHovered ? radiusHover : radiusNormal;
                const innerRadius = isHovered ? innerRadiusHover : innerRadiusNormal;

                const startOuterX = 200 + radius * Math.cos((startAngle * Math.PI) / 180);
                const startOuterY = 200 + radius * Math.sin((startAngle * Math.PI) / 180);
                const endOuterX = 200 + radius * Math.cos((endAngle * Math.PI) / 180);
                const endOuterY = 200 + radius * Math.sin((endAngle * Math.PI) / 180);

                const startInnerX = 200 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                const startInnerY = 200 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
                const endInnerX = 200 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                const endInnerY = 200 + innerRadius * Math.sin((startAngle * Math.PI) / 180);

                const pathData = `
                  M ${startOuterX} ${startOuterY}
                  A ${radius} ${radius} 0 0 1 ${endOuterX} ${endOuterY}
                  L ${startInnerX} ${startInnerY}
                  A ${innerRadius} ${innerRadius} 0 0 0 ${endInnerX} ${endInnerY}
                  Z
                `;

                return (
                  <motion.path
                    key={company.id}
                    d={pathData}
                    fill={`url(#gradient-${company.id})`}
                    stroke={company.color}
                    className="cursor-pointer"
                    style={{
                      filter: isHovered ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' : 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))',
                    }}
                    onMouseEnter={() => setHoveredId(company.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(company.id)}
                    animate={{ 
                      d: pathData,
                      opacity: hoveredId === null || hoveredId === company.id ? 0.95 : 0.4,
                      strokeWidth: isHovered ? 3 : 2,
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </svg>

            {/* Company Logos on Circle */}
            {companies.map((company, index) => {
              const angle = (index * 90);
              const labelRadius = 250; // Increased to push logos outside the circle
              const x = 50 + (labelRadius / 400 * 100) * Math.cos((angle * Math.PI) / 180);
              const y = 50 + (labelRadius / 400 * 100) * Math.sin((angle * Math.PI) / 180);
              const isHovered = hoveredId === company.id;

              // Special adjustments for positioning
              let adjustedX = x;
              let adjustedY = y;
              if (company.id === 3) {
                // Electra Construction (top position) - move 60px down, 50px left
                adjustedY = y + 15; // 15% ≈ 60px
                adjustedX = x - 12.5; // 12.5% ≈ 50px left (10px more than before)
              } else if (company.id === 1) {
                // Geokat (bottom position) - move 110px up, 20px left
                adjustedY = y - 27.5; // 27.5% ≈ 110px
                adjustedX = x - 5; // 5% ≈ 20px left (10px more than before)
              } else if (company.id === 0) {
                // Electra M&E (left position) - move 100px left, 10px up
                adjustedX = x - 25; // 25% ≈ 100px
                adjustedY = y - 2.5; // 2.5% ≈ 10px up
              } else if (company.id === 2) {
                // Ipid (right position) - move 10px up
                adjustedY = y - 2.5; // 2.5% ≈ 10px
              }

              return (
                <motion.div
                  key={company.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${adjustedX}%`,
                    top: `${adjustedY}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredId(company.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(company.id)}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative transition-all duration-300`}>
                    {/* Glow effect */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`absolute -inset-4 bg-gradient-to-r ${company.gradient} opacity-50 blur-2xl rounded-full`}
                      />
                    )}
                    
                    {/* Logo container */}
                    <div 
                      className={`relative rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 flex items-center justify-center ${
                        isHovered 
                          ? 'bg-white/20 border-white/60 shadow-2xl' 
                          : 'bg-white/10 border-white/30 shadow-lg'
                      }`}
                      style={{
                        minWidth: company.id === 0 ? '245px' : '120px',  // M&E: 20% wider again (204px * 1.2 = 245px)
                        padding: company.id === 3 ? '18px 24px' : '24px'  // Construction: 10% less vertical padding (21.6px ≈ 18px), keep horizontal same
                      }}
                    >
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-auto object-contain brightness-0 invert"
                        style={{ 
                          height: company.id === 3 ? '64px' : '48px',  // Construction: 64px, Others: 48px
                          minWidth: '60px',
                          transform: company.id === 0 ? 'scale(1.152)' : company.id === 1 ? 'scale(1.265)' : 'none'  // M&E: 1.152, Geokat: 1.265 (26.5% bigger = 1.15 * 1.10)
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Hint text */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/80 font-semibold"
                        >
                          Click to explore
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Selected Company */}
      <AnimatePresence>
        {selectedId !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-4xl w-full"
              >
                {/* Glow */}
                <div className={`absolute -inset-[2px] bg-gradient-to-r ${companies[selectedId].gradient} opacity-50 blur-2xl rounded-3xl`} />
                
                {/* Modal Content */}
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-white/20 rounded-3xl overflow-hidden">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  >
                    ✕
                  </button>

                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-80 lg:h-auto overflow-hidden">
                      <ImageWithFallback
                        src={companies[selectedId].image}
                        alt={companies[selectedId].name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${companies[selectedId].gradient} opacity-40`} />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      {/* Logo */}
                      <div className="mb-6 h-16 flex items-center">
                        <img
                          src={companies[selectedId].logo}
                          alt={`${companies[selectedId].name} logo`}
                          className="max-h-16 max-w-[200px] object-contain brightness-0 invert"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Name & Tagline */}
                      <h3 className="text-3xl font-black text-white mb-2">
                        {companies[selectedId].name}
                      </h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${companies[selectedId].gradient} bg-clip-text text-transparent mb-6`}>
                        {companies[selectedId].tagline}
                      </p>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-8">
                        {companies[selectedId].description}
                      </p>

                      {/* Services */}
                      <div className="mb-8">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                          Key Services
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {companies[selectedId].services.map((service, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${companies[selectedId].gradient} mt-1.5 flex-shrink-0`} />
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={companies[selectedId].website}
                        target={companies[selectedId].isExternal ? "_blank" : undefined}
                        rel={companies[selectedId].isExternal ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${companies[selectedId].gradient} text-white font-bold hover:shadow-2xl transition-all hover:-translate-y-1 group/btn`}
                      >
                        <span>Visit Website</span>
                        {companies[selectedId].isExternal ? (
                          <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}