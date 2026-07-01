import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import StoreLayout from "@/components/StoreLayout";

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
          <StoreLayout>
            {children}
          </StoreLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
