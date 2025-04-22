
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="h-40 md:h-48 w-full rounded-b-none" /> {/* Image placeholder */}
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon placeholder */}
          <Skeleton className="h-4 w-20" /> {/* Category placeholder */}
          <Skeleton className="h-4 w-4 rounded-full" /> {/* Dot placeholder */}
          <Skeleton className="h-4 w-16" /> {/* Read time placeholder */}
        </div>
        <Skeleton className="h-6 w-full mb-3" /> {/* Title placeholder line 1 */}
        <Skeleton className="h-6 w-4/5 mb-4" /> {/* Title placeholder line 2 */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Description line 1 */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Description line 2 */}
        <Skeleton className="h-4 w-3/4" /> {/* Description line 3 */}
      </div>
    </Card>
  );
}
