import { Clock, BarChart3, Zap } from "lucide-react";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Bell,TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./action";
import ProductCard from "@/components/ProductCard";

export default async function Home() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Clock,
      title: "Fast Setup",
      description:
        "Start tracking prices instantly by pasting a product URL.",
    },
    {
      icon: BarChart3,
      title: "Price Insights",
      description:
        "Understand how prices change over time with clear visual charts.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description:
        "Get alerts as soon as prices drop to your desired level.",
    },
  ];



  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Offer<span className="text-cyan-400">y</span>
            </span>
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent" />

        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Track Prices.
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Buy at the Right Time.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-14 max-w-2xl mx-auto leading-relaxed">
            Offery monitors product prices across e-commerce platforms and
            instantly alerts you when a deal is worth grabbing.
          </p>

          <AddProductForm user={user} />

          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-left hover:shadow-2xl transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              Your Tracked Products
            </h3>

            <span className="text-sm text-gray-400">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-white mb-2">
              No Products Yet
            </h3>

            <p className="text-gray-300">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );

}
