import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Makipag-ugnayan sa Latest Balita PH para sa business inquiries, advertising, o fuel price reports.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Makipag-<span className="text-orange-500">ugnayan</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            May tanong, suggestion, o fuel price report? I-contact kami!
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Mag-send ng mensahe
            </h2>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pangalan
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  placeholder="Iyong pangalan"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                >
                  <option>Business Inquiry</option>
                  <option>Advertising</option>
                  <option>Fuel Price Report</option>
                  <option>Suggestion / Feedback</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensahe
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                  placeholder="Isulat ang iyong mensahe..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                I-send ang Mensahe
              </Button>
            </form>
          </div>
        </AnimatedSection>

        {/* Contact info */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="font-bold text-gray-900 mb-4">
                Business Inquiries
              </h3>
              <a
                href="mailto:sales@latestbalitaph.com"
                className="text-orange-500 hover:text-orange-500 transition-colors"
              >
                sales@latestbalitaph.com
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="font-bold text-gray-900 mb-4">PR &amp; Media</h3>
              <a
                href="mailto:marketing@latestbalitaph.com"
                className="text-orange-500 hover:text-orange-500 transition-colors"
              >
                marketing@latestbalitaph.com
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="font-bold text-gray-900 mb-4">
                Fuel Price Reports
              </h3>
              <a
                href="mailto:editorial@latestbalitaph.com"
                className="text-orange-500 hover:text-orange-500 transition-colors"
              >
                editorial@latestbalitaph.com
              </a>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-2">Office Location</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                BGC, Taguig City
                <br />
                Metro Manila, Philippines
                <br />
                1634
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
