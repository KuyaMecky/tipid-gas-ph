import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Alamin ang tungkol sa Tipid Gas PH — ang pinaka-trusted na source ng fuel price information sa Pilipinas.",
};

const stats = [
  { value: "1M+", label: "Monthly Visitors" },
  { value: "5K+", label: "Price Updates" },
  { value: "10+", label: "Fuel Brands Covered" },
  { value: "81", label: "Provinces Monitored" },
];

const team = [
  {
    name: "Maria Santos",
    role: "Senior Energy Reporter",
    bio: "12+ years covering the Philippine fuel and energy industry. Former petroleum engineer.",
  },
  {
    name: "Juan dela Cruz",
    role: "Business & Economy Editor",
    bio: "Former DOE consultant. Specializes in oil pricing analysis and energy policy.",
  },
  {
    name: "Ana Reyes",
    role: "Consumer Advocacy Writer",
    bio: "Consumer rights advocate focused on fuel pricing transparency and fair trade.",
  },
  {
    name: "Carlos Tan",
    role: "Automotive & Fuel Tech Writer",
    bio: "Certified mechanic and car enthusiast. Writes about fuel efficiency and vehicle maintenance.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <AnimatedSection>
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            About <span className="text-orange-500">Tipid Gas PH</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Kami ang pinaka-trusted na source ng fuel price information sa
            Pilipinas. Layunin naming tulungan ang bawat Filipino motorista
            na makatipid sa gas sa pamamagitan ng accurate at timely na
            price updates.
          </p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl border border-gray-200"
            >
              <p className="text-3xl font-extrabold text-orange-500">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Mission */}
      <AnimatedSection delay={0.15}>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Ang Aming Misyon
          </h2>
          <p className="text-orange-100 leading-relaxed text-lg">
            Tulungan ang bawat Filipino na makatipid sa fuel expenses sa
            pamamagitan ng accurate, transparent, at real-time na fuel price
            information. Naniniwala kami na ang access sa tamang impormasyon
            ay nagbibigay ng kapangyarihan sa consumers na gumawa ng
            smart na financial decisions.
          </p>
        </div>
      </AnimatedSection>

      {/* Team */}
      <AnimatedSection delay={0.2}>
        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Ang Aming Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-orange-500">{member.role}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
