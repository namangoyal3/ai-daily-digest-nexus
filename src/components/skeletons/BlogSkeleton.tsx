
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <Skeleton className="w-full h-64 md:h-96" /> {/* Hero image */}
      
      <div className="p-6 md:p-8">
        {/* Category and metadata */}
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-10 md:h-12 w-full mb-4" />
        <Skeleton className="h-10 md:h-12 w-4/5 mb-8" />
        
        {/* Author */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div>
              <Skeleton className="h-5 w-36 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        
        {/* Separator */}
        <Skeleton className="h-0.5 w-full my-8" />
        
        {/* Share and Subscribe */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <Skeleton className="h-6 w-36 mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-6 w-48 mb-3" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
