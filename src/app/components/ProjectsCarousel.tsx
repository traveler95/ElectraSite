import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const projects: Project[] = [
  {
    title: "Industrial Power Distribution Center",
    category: "Energy Infrastructure",
    description: "Complete electrical infrastructure for a major manufacturing facility with redundant power systems and smart monitoring",
    image: "https://images.unsplash.com/photo-1761695939621-846420b4d901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZWxlY3RyaWNhbCUyMGNvbnN0cnVjdGlvbiUyMHByb2plY3R8ZW58MXx8fHwxNzczNzU0MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Power Capacity", value: "15 MW" },
      { label: "Timeline", value: "18 Months" },
      { label: "Investment", value: "€8.5M" },
    ],
  },
  {
    title: "Smart Factory Automation System",
    category: "Industrial Automation",
    description: "State-of-the-art control systems and automated electrical networks for modern production lines",
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYWN0b3J5JTIwZWxlY3RyaWNhbCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzM3NTQxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Automation Level", value: "95%" },
      { label: "Energy Savings", value: "40%" },
      { label: "Production Increase", value: "+60%" },
    ],
  },
  {
    title: "Commercial Complex Electrification",
    category: "Commercial Construction",
    description: "Full electrical installation for a 250,000 sq ft mixed-use development including retail, offices, and residential",
    image: "https://images.unsplash.com/photo-1772617661549-98d2ae35ab2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBjb25zdHJ1Y3Rpb24lMjBzaXRlfGVufDF8fHx8MTc3MzY5NDYzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Total Area", value: "250k sq ft" },
      { label: "Timeline", value: "24 Months" },
      { label: "Units Powered", value: "450+" },
    ],
  },
  {
    title: "High-Voltage Substation Upgrade",
    category: "Power Infrastructure",
    description: "Modernization of critical transmission infrastructure with advanced protection and monitoring systems",
    image: "https://images.unsplash.com/photo-1765375522929-994a71439c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcG93ZXIlMjBzdWJzdGF0aW9uJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzczNzU0MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Voltage", value: "110 kV" },
      { label: "Capacity", value: "200 MVA" },
      { label: "Reliability", value: "99.99%" },
    ],
  },
  {
    title: "Advanced Manufacturing Control Center",
    category: "Process Control",
    description: "Integrated SCADA systems and electrical controls for precision manufacturing operations",
    image: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwYXV0b21hdGlvbiUyMG1hY2hpbmVyeSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczNzU0MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Control Points", value: "5,000+" },
      { label: "Response Time", value: "<10ms" },
      { label: "Uptime", value: "99.97%" },
    ],
  },
  {
    title: "Critical Infrastructure Electrical Installation",
    category: "Mission-Critical Systems",
    description: "Redundant electrical systems for data centers and healthcare facilities with zero-downtime requirements",
    image: "https://images.unsplash.com/photo-1759830337357-29c472b6746c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjBpbnN0YWxsYXRpb24lMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc3Mzc1NDEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: [
      { label: "Redundancy", value: "N+2" },
      { label: "Availability", value: "99.999%" },
      { label: "Backup Power", value: "72h" },
    ],
  },
];

interface ArrowProps {
  onClick?: () => void;
}

const CustomPrevArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center group transition-all hover:scale-110 hover:-translate-x-1"
  >
    <ChevronLeft className="w-6 h-6 text-gray-900 group-hover:text-blue-600 transition-colors" />
  </button>
);

const CustomNextArrow = ({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center group transition-all hover:scale-110 hover:translate-x-1"
  >
    <ChevronRight className="w-6 h-6 text-gray-900 group-hover:text-blue-600 transition-colors" />
  </button>
);

export function ProjectsCarousel() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition-all mt-8" />
    ),
    dotsClass: "slick-dots !bottom-8 flex items-center justify-center gap-3",
  };

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Section Header - Overlaid on top */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-16 pb-8 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-blue-100">Featured Projects</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Our Best Work
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Delivering excellence across Poland's most demanding industrial and commercial projects
            </p>
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <style>{`
          .slick-dots li.slick-active div {
            background-color: white !important;
            width: 2rem !important;
            border-radius: 0.5rem !important;
          }
          .slick-slide > div {
            outline: none;
          }
        `}</style>
        
        <Slider ref={sliderRef} {...settings}>
          {projects.map((project, index) => (
            <div key={index} className="outline-none">
              <div className="relative h-[700px] lg:h-[800px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <div className="max-w-3xl pt-32 pb-24">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-6">
                        <span className="text-sm font-semibold text-blue-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-[1.1]">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stats Grid */}
                      {project.stats && (
                        <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-white/10">
                          {project.stats.map((stat, idx) => (
                            <div key={idx}>
                              <div className="text-3xl font-bold text-white mb-1">
                                {stat.value}
                              </div>
                              <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:-translate-y-0.5 group"
                      >
                        Start Your Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Project Number Indicator */}
                <div className="absolute bottom-8 right-8 text-white/30 font-black text-8xl lg:text-9xl leading-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
