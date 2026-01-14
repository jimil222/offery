"use client";

import { useState } from "react";
import PriceChart from "./PriceChart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/app/action";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    await deleteProduct(product.id);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:shadow-2xl transition">

      {/* ================= HEADER ================= */}
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          {product.img_url && (
            <img
              src={product.img_url}
              alt={product.name}
              className="w-24 h-32 object-cover rounded-xl border border-white/20"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-cyan-400">
                {product.currency} {product.current_price}
              </span>

              <Badge className="bg-purple-500/20 text-purple-300 gap-1">
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* ================= ACTIONS ================= */}
      <CardContent>
        <div className="flex flex-wrap gap-3 mt-2">

          {/* Show / Hide Chart */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
                 bg-white/5 border border-white/15 
                 text-gray-300 hover:text-white 
                 hover:bg-white/10 transition"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Chart
              </>
            )}
          </Button>

          {/* View Product */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-2 px-4 py-2 rounded-full 
                 bg-white/5 border border-white/15 
                 text-gray-300 hover:text-white 
                 hover:bg-white/10 transition"
          >
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View
            </Link>
          </Button>

          {/* Remove */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
                 text-red-400 hover:text-red-300 
                 hover:bg-red-500/10 transition"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>

        </div>
      </CardContent>


      {/* ================= CHART ================= */}
      {showChart && (
        <CardFooter className="pt-0">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
}
