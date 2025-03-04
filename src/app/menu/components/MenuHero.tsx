import { Badge } from '@/components/ui/badge';
import { ChefHat, Utensils, Salad, Sparkles, Thermometer } from 'lucide-react';

export default function MenuHero() {
  return (
    <div className="relative py-20 text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Explore Our Menu</h1>
      <p className="text-xl max-w-2xl mx-auto">
        Discover plant-based cuisine blending Asian traditions with modern innovation.
      </p>
      <div className="mt-8 flex justify-center space-x-4">
        <Badge variant="secondary">
          <ChefHat size={20} />
        </Badge>
        <Badge variant="secondary">
          <Utensils size={20} />
        </Badge>
        <Badge variant="secondary">
          <Salad size={20} />
        </Badge>
        <Badge variant="secondary">
          <Sparkles size={20} />
        </Badge>
        <Badge variant="secondary">
          <Thermometer size={20} />
        </Badge>
      </div>
      <div className="mt-8 animate-bounce">
        <svg
          className="mx-auto w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}