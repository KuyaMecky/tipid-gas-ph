"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Home",
    href: "/",
    iconOutline: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    iconSolid: "M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 0 1-.53 1.28H18.75v7.44a.75.75 0 0 1-.75.75h-3.75a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-7.44H3.31a.75.75 0 0 1-.53-1.28l8.69-8.69Z",
  },
  {
    label: "Mapa",
    href: "/mapa",
    iconOutline: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    iconSolid: "M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 3.827 3.024ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    label: "Presyo",
    href: "/gasolina",
    iconOutline: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    iconSolid: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.128 3.128 0 0 0-1.247.749.75.75 0 1 0 1.06 1.06 1.626 1.626 0 0 1 2.058.2c.44.439.44 1.152 0 1.591a1.625 1.625 0 0 1-1.81.353.75.75 0 1 0-.594 1.378c.212.091.434.153.66.187V13.5a.75.75 0 0 0 1.5 0v-.816c.45-.097.88-.282 1.247-.749a.75.75 0 1 0-1.06-1.06 1.625 1.625 0 0 1-2.058-.2 1.126 1.126 0 0 1 0-1.591 1.625 1.625 0 0 1 1.81-.353.75.75 0 0 0 .594-1.378 3.163 3.163 0 0 0-.66-.187V6Z",
  },
  {
    label: "Tips",
    href: "/tips",
    iconOutline: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    iconSolid: "M12 2.25A6.75 6.75 0 0 0 5.25 9c0 2.485 1.35 4.655 3.356 5.82.349.203.594.558.594.944V18a.75.75 0 0 0 .75.75h4.1a.75.75 0 0 0 .75-.75v-2.236c0-.386.245-.741.594-.944A6.748 6.748 0 0 0 18.75 9 6.75 6.75 0 0 0 12 2.25ZM9.75 20.25v-.75h4.5v.75a2.25 2.25 0 0 1-4.5 0Z",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? "text-orange-500" : "text-gray-400"
              }`}
              aria-label={tab.label}
            >
              <svg
                className="w-6 h-6"
                fill={isActive ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={isActive ? 0 : 1.5}
                stroke={isActive ? "none" : "currentColor"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isActive ? tab.iconSolid : tab.iconOutline}
                  fillRule={isActive ? "evenodd" : undefined}
                  clipRule={isActive ? "evenodd" : undefined}
                />
              </svg>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
