import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CHIMINI | Luxury Candles & Gifting Brand",
  description: "Premium luxury hand-poured soy candles and bespoke gift hampers. Discover artisan home fragrances crafted with natural botanicals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
