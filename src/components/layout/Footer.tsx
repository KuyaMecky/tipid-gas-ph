import Link from "next/link";
import NewsletterForm from "../ui/NewsletterForm";

const footerLinks = {
  "Mga Serbisyo": [
    { name: "Presyo ng Gas", href: "/gasolina" },
    { name: "Fuel Price Alerts", href: "/" },
    { name: "Gas Station Finder", href: "/" },
    { name: "Price History", href: "/" },
  ],
  "Mga Brand": [
    { name: "Petron", href: "/gasolina/petron" },
    { name: "Shell", href: "/gasolina/shell" },
    { name: "Caltex", href: "/gasolina/caltex" },
    { name: "Phoenix", href: "/gasolina/phoenix" },
    { name: "Seaoil", href: "/gasolina/seaoil" },
  ],
  Kumpanya: [
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/gasolina#faq" },
    { name: "Balita", href: "/balita" },
    { name: "Tips", href: "/tips" },
  ],
  Tulong: [
    { name: "Contact Us", href: "/contact" },
    { name: "Mag-suggest", href: "/contact" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: "FB" },
  { name: "Twitter", icon: "X" },
  { name: "LinkedIn", icon: "in" },
  { name: "YouTube", icon: "YT" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter */}
          <div className="col-span-2">
            <h3 className="text-orange-500 font-bold text-lg mb-4">
              Makipag-ugnayan
            </h3>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm font-semibold text-white">
                  Business Inquiries
                </p>
                <a
                  href="mailto:sales@tipidgasph.com"
                  className="text-sm text-orange-500 hover:text-orange-300 transition-colors"
                >
                  sales@tipidgasph.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">PR or Media</p>
                <a
                  href="mailto:marketing@tipidgasph.com"
                  className="text-sm text-orange-500 hover:text-orange-300 transition-colors"
                >
                  marketing@tipidgasph.com
                </a>
              </div>
            </div>

            <NewsletterForm />
          </div>
        </div>

        {/* Social links */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200 text-xs font-bold"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tipid Gas PH. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Terms and Conditions
              </Link>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
