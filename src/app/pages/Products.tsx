import { motion } from "motion/react";
import { useState } from "react";
import {
  Zap,
  Cable,
  Lightbulb,
  Shield,
  Cpu,
  Battery,
  Sun,
  Power,
  Filter,
  Search,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Products", icon: Filter },
    { id: "panels", label: "Electrical Panels", icon: Zap },
    { id: "cables", label: "Cables & Wiring", icon: Cable },
    { id: "lighting", label: "Lighting", icon: Lightbulb },
    { id: "protection", label: "Protection Devices", icon: Shield },
    { id: "automation", label: "Automation", icon: Cpu },
    { id: "energy", label: "Energy Systems", icon: Battery },
  ];

  const products = [
    {
      id: 1,
      category: "panels",
      name: "Industrial Distribution Panel",
      description: "High-capacity distribution panel for industrial applications",
      features: ["IP65 rated", "Up to 630A", "Modular design"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1759830337357-29c472b6746c?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      category: "panels",
      name: "Commercial Circuit Breaker Box",
      description: "Reliable circuit protection for commercial buildings",
      features: ["Easy installation", "Multiple configurations", "UL certified"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      category: "cables",
      name: "Industrial Power Cable",
      description: "Heavy-duty power cables for demanding applications",
      features: ["Fire resistant", "Various gauges", "Long-lasting"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      category: "cables",
      name: "Control & Signal Cable",
      description: "Premium quality control cables for automation systems",
      features: ["Shielded design", "Low noise", "Flexible"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      category: "lighting",
      name: "LED Industrial Lighting",
      description: "Energy-efficient LED lighting for warehouses and factories",
      features: ["80% energy saving", "50,000 hours lifespan", "High luminosity"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      category: "lighting",
      name: "Emergency Exit Lighting",
      description: "Reliable emergency lighting systems for safety compliance",
      features: ["Battery backup", "Self-testing", "LED technology"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      category: "protection",
      name: "Surge Protection Device",
      description: "Advanced surge protection for sensitive equipment",
      features: ["Multi-stage protection", "Fast response", "Indicator lights"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      category: "protection",
      name: "Arc Fault Breakers",
      description: "Smart breakers with arc fault detection technology",
      features: ["Enhanced safety", "Remote monitoring", "Quick disconnect"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      category: "automation",
      name: "PLC Control System",
      description: "Programmable logic controller for industrial automation",
      features: ["Multiple I/O", "Easy programming", "Network capable"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      category: "automation",
      name: "Motor Control Center",
      description: "Comprehensive motor control and protection system",
      features: ["Variable frequency drive", "Soft start", "Overload protection"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    },
    {
      id: 11,
      category: "energy",
      name: "Solar Inverter System",
      description: "High-efficiency solar power inverter for renewable energy",
      features: ["MPPT technology", "Grid-tie capable", "Monitoring app"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1628206554160-63e8c921e398?w=400&h=300&fit=crop",
    },
    {
      id: 12,
      category: "energy",
      name: "UPS Power System",
      description: "Uninterruptible power supply for critical systems",
      features: ["Online double conversion", "Extended runtime", "Scalable"],
      price: "Contact for quote",
      image: "https://images.unsplash.com/photo-1608454531046-5c2837912c10?w=400&h=300&fit=crop",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-blue-100">
              Premium electrical equipment and components from leading manufacturers, backed by our
              technical expertise and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                    <div className="space-y-2 mb-4">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="font-semibold text-blue-600">{product.price}</span>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Categories Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All our products meet international quality standards and come with comprehensive
              warranties and technical support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Certified Quality",
                description: "All products certified to EU and international standards",
              },
              {
                icon: Zap,
                title: "Expert Support",
                description: "Technical assistance and installation guidance included",
              },
              {
                icon: Power,
                title: "Warranty Coverage",
                description: "Comprehensive warranty on all products",
              },
              {
                icon: Sun,
                title: "Eco-Friendly",
                description: "Energy-efficient and environmentally responsible products",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Need Help Choosing the Right Products?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our technical team is here to help you select the perfect products for your project
              requirements.
            </p>
            <a
              href="mailto:info@electra.co.pl"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Contact Our Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
