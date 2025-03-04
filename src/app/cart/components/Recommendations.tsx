"use client";

import React, { memo } from "react";
import { Gift, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cardVariants } from "../utils/animations";
import { ShimmerEffect } from "./ShimmerEffects";

interface RecommendationItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface RecommendationsProps {
  recommendations: RecommendationItem[];
  addItemToCart: (item: RecommendationItem) => void;
  loadingRecommendations: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  addItemToCart,
  loadingRecommendations
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Gift className="h-5 w-5 text-primary" />
        Frequently ordered together
      </h3>

      {loadingRecommendations ? (
        // Loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <ShimmerEffect key={item} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        // Recommendations grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {recommendations.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 * index, duration: 0.3 } }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group backdrop-blur-sm bg-white/70">
                  <div className="relative h-40 w-full bg-muted overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-4 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          onClick={() => addItemToCart(item)}
                          className="rounded-full h-8 w-8 p-0 shadow-md hover:shadow-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Recommendations);