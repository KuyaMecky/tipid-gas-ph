export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
          <a href="/" className="font-heading font-bold text-yellow-400">
            Latest Balita PH
          </a>
          <span className="text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-300">Admin</span>
          <div className="flex gap-4 ml-auto text-sm">
            <a
              href="/admin/publish"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Auto-Publish
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
