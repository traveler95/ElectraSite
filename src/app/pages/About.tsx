import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api, fileUrl, type CzlonekZarzadu } from "../../lib/directus";

export function About() {
  const [team, setTeam] = useState<CzlonekZarzadu[]>([]);

  useEffect(() => {
    api.zarzad.list().then(setTeam).catch(() => {});
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Quality & Safety",
      description:
        "We prioritize the highest quality standards and safety protocols in every project we undertake.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Embracing cutting-edge technology and innovative solutions to deliver exceptional results.",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "Building long-term relationships through dedication, transparency, and excellent service.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description:
        "Investing in our team's development and staying ahead of industry trends and standards.",
    },
  ];

  const timeline = [
    {
      year: "1999",
      title: "Company Founded",
      description: "Electra was established with a vision to provide top-quality electrical services.",
    },
    {
      year: "2005",
      title: "ISO Certification",
      description: "Achieved ISO 9001 certification, demonstrating our commitment to quality.",
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Expanded operations nationwide, serving major industrial clients across Poland.",
    },
    {
      year: "2018",
      title: "Green Energy Division",
      description: "Launched renewable energy solutions division to support sustainable development.",
    },
    {
      year: "2024",
      title: "Smart Automation",
      description: "Introduced advanced automation and IoT solutions for modern industries.",
    },
  ];


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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Electra</h1>
            <p className="text-xl text-blue-100">
              With over 25 years of excellence in electrical engineering, we are your trusted
              partner for comprehensive electrical solutions across Poland.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To deliver exceptional electrical solutions that exceed client expectations through
                innovation, quality craftsmanship, and unwavering commitment to safety. We strive
                to be the most trusted partner for businesses seeking reliable electrical services
                and sustainable energy solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl"
            >
              <div className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be Poland's leading provider of innovative electrical and energy solutions,
                recognized for our technical excellence, sustainable practices, and positive impact
                on the communities we serve. We envision a future where every business has access
                to cutting-edge, eco-friendly electrical systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 1999, Electra began as a small team of passionate electrical engineers
                  with a vision to transform the industry through quality service and innovation.
                  What started in a modest workshop in Warsaw has grown into one of Poland's most
                  respected electrical solution providers.
                </p>
                <p>
                  Over the past 25 years, we've completed over 500 projects, from small commercial
                  installations to large-scale industrial automation systems. Our commitment to
                  excellence has earned us ISO 9001 certification and the trust of leading
                  businesses across the country.
                </p>
                <p>
                  Today, our team of 50+ certified professionals continues to push boundaries,
                  incorporating renewable energy solutions, smart automation, and sustainable
                  practices into everything we do. We're not just building electrical systems –
                  we're powering Poland's future.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwdGVjaG5pY2lhbiUyMHdvcmt8ZW58MXx8fHwxNzczNjY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Electrical Technician at Work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our 25-year history</p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="inline-block px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm">
                    {item.year}
                  </div>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mt-1" />
                  {index < timeline.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-0.5 h-16 bg-blue-200 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experts driving our success
            </p>
          </motion.div>

          {team.length === 0 ? (
            <p className="text-center text-gray-400">Brak danych o zarządzie.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-200">
                    <ImageWithFallback
                      src={fileUrl(member.zdjecie)}
                      alt={member.imie_nazwisko}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">{member.imie_nazwisko}</h3>
                  <p className="text-gray-600 text-sm">{member.stanowisko}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "50+", label: "Team Members" },
              { icon: Award, number: "500+", label: "Projects Completed" },
              { icon: Shield, number: "25+", label: "Years of Experience" },
              { icon: TrendingUp, number: "200+", label: "Happy Clients" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
