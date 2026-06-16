import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ArticleProvider } from "@/lib/article-context";
import MainLayout from "@/components/layout/MainLayout";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-slate-50/70 text-secondary min-h-screen font-sans">
        <AuthProvider>
          <ArticleProvider>
            {/* MainLayout gère la responsivité et le décalage (margin-left) une bonne fois pour toutes */}
            <MainLayout>
              {children}
            </MainLayout>
          </ArticleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
