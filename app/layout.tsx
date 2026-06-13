import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BusinessCore — Plateforme fintech & finance",
    template: "%s | BusinessCore",
  },
  description:
    "BusinessCore est la plateforme éducative de référence sur la fintech et la finance : formations, décryptages, carrières, innovation et plus encore.",
  keywords: ["fintech", "finance", "formation", "blockchain", "investissement", "Afrique"],
  authors: [{ name: "Équipe BusinessCore" }],
  openGraph: {
    title: "BusinessCore",
    description: "Votre plateforme éducative fintech & finance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          {/* Sidebar fixe */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Navbar fixe en haut */}
          <Navbar />

          {/* Contenu principal décalé à droite de la sidebar */}
          <div className="page-layout">
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
