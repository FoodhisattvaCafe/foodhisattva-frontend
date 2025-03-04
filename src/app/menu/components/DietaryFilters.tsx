import { cn } from '@/lib/utils';
import { dietaryFilters } from '../constants/menuConstants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DietaryFiltersProps {
  activeDietaryFilter: string;
  setActiveDietaryFilter: (filter: string) => void;
  handleReset: () => void;
}

export default function DietaryFilters({
  activeDietaryFilter,
  setActiveDietaryFilter,
  handleReset,
}: DietaryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {dietaryFilters.map((filter: string) => (
        <Tooltip key={filter}>
          <TooltipTrigger asChild>
            <button
              className={cn(
                'cursor-pointer px-5 py-3 text-sm font-medium rounded-full transition-colors',
                activeDietaryFilter === filter
                  ? 'bg-accent-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
              onClick={() => setActiveDietaryFilter(filter)}
            >
              {filter}
            </button>
          </TooltipTrigger>
          <TooltipContent>Filter by {filter}</TooltipContent>
        </Tooltip>
      ))}
      <button
        className="cursor-pointer flex items-center px-5 py-3 text-sm font-medium text-accent-primary hover:text-accent-dark dark:text-accent-light border border-accent-primary hover:border-accent-dark dark:border-accent-light rounded-full"
        onClick={handleReset}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset
      </button>
    </div>
  );
}