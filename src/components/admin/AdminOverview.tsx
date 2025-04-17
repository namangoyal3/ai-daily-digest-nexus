
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Total Views",
    value: "45.2K",
    change: "+12%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Subscribers",
    value: "2,345",
    change: "+8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Articles",
    value: "128",
    change: "+24%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Engagement",
    value: "12.5%",
    change: "-2%",
    trend: "down",
    icon: BarChart,
  },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AI Daily Digest CMS</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  "ml-1",
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                )}>
                  {stat.change} from last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
