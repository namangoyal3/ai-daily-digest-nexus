
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, ThumbsUp, MessageSquare } from "lucide-react";

const stats = [
  {
    title: "Total Subscribers",
    value: "2,345",
    icon: Users,
    change: "+12%",
  },
  {
    title: "Page Views",
    value: "45.2K",
    icon: Eye,
    change: "+24%",
  },
  {
    title: "Engagement Rate",
    value: "12.3%",
    icon: ThumbsUp,
    change: "+8%",
  },
  {
    title: "Active Discussions",
    value: "89",
    icon: MessageSquare,
    change: "+18%",
  },
];

export default function AdminOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
