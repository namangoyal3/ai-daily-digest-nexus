
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Calendar,
  MessageSquare,
  Clock,
  Database,
  Target,
  Tag,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const contentStats = [
  {
    title: "Drafts",
    value: "18",
    icon: FileText,
  },
  {
    title: "Scheduled",
    value: "24",
    icon: Calendar,
  },
  {
    title: "Comments",
    value: "342",
    icon: MessageSquare,
  },
  {
    title: "Avg. Time on Page",
    value: "3:42",
    icon: Clock,
  },
];

const recentContent = [
  { title: "AI in Healthcare: 2025 Trends", views: "2.4K", status: "Published" },
  { title: "Machine Learning Algorithms Explained", views: "1.8K", status: "Published" },
  { title: "The Future of Natural Language Processing", views: "945", status: "Draft" },
  { title: "Quantum Computing Breakthroughs", views: "1.2K", status: "Scheduled" },
  { title: "Ethics in Artificial Intelligence", views: "2.1K", status: "Published" },
];

const leadSources = [
  { source: "Organic Search", count: 456, percentage: 45 },
  { source: "Direct Traffic", count: 235, percentage: 23 },
  { source: "Social Media", count: 189, percentage: 19 },
  { source: "Email Campaigns", count: 87, percentage: 9 },
  { source: "Referrals", count: 43, percentage: 4 },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AI Daily Digest CMS</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
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
          
          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentContent.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.views} views</span>
                      </div>
                      <div>
                        <span className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          item.status === "Published" ? "bg-green-100 text-green-800" :
                          item.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        )}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-lg border p-2">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 mr-2">1</span>
                      <span className="font-medium">Review Draft Articles</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-8">8 drafts pending review</span>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 mr-2">2</span>
                      <span className="font-medium">Moderate Comments</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-8">23 comments need moderation</span>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 mr-2">3</span>
                      <span className="font-medium">Update SEO Tags</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-8">15 articles need SEO review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contentStats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">AI in Healthcare: 2025 Trends</span>
                    <span className="text-green-500">↑ 24%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-purple-500 rounded" style={{ width: '76%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2,405 views</span>
                    <span>76% engagement</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Machine Learning Algorithms Explained</span>
                    <span className="text-green-500">↑ 12%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-purple-500 rounded" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1,845 views</span>
                    <span>68% engagement</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Ethics in Artificial Intelligence</span>
                    <span className="text-red-500">↓ 3%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-purple-500 rounded" style={{ width: '54%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2,104 views</span>
                    <span>54% engagement</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Lead Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold">1,010</div>
                  <div className="text-sm text-muted-foreground">Total Leads</div>
                  <div className="flex items-center justify-center mt-2 text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+12.5% from last month</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">245</div>
                    <div className="text-xs text-muted-foreground">New This Month</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">24%</div>
                    <div className="text-xs text-muted-foreground">Conversion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSources.map((source, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm text-muted-foreground">{source.count} leads ({source.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded">
                        <div 
                          className="h-2 bg-purple-500 rounded" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Source</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Sarah Johnson</td>
                    <td className="py-3 text-muted-foreground">sarah.j@example.com</td>
                    <td className="py-3">Organic Search</td>
                    <td className="py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Michael Chen</td>
                    <td className="py-3 text-muted-foreground">m.chen@example.com</td>
                    <td className="py-3">Social Media</td>
                    <td className="py-3"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Contacted</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Alex Barnes</td>
                    <td className="py-3 text-muted-foreground">alexb@example.com</td>
                    <td className="py-3">Email Campaign</td>
                    <td className="py-3"><span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Qualified</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.4K</div>
                <p className="text-xs flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="ml-1 text-green-500">+18% from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Position</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <p className="text-xs flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="ml-1 text-green-500">+0.8 from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.7%</div>
                <p className="text-xs flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="ml-1 text-green-500">+0.5% from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keywords</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">428</div>
                <p className="text-xs flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="ml-1 text-green-500">+32 from last month</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 font-medium">Keyword</th>
                    <th className="pb-2 font-medium">Position</th>
                    <th className="pb-2 font-medium">Traffic</th>
                    <th className="pb-2 font-medium">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">artificial intelligence news</td>
                    <td className="py-3">2</td>
                    <td className="py-3">4,256</td>
                    <td className="py-3">8.4%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">machine learning trends</td>
                    <td className="py-3">3</td>
                    <td className="py-3">3,142</td>
                    <td className="py-3">7.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">ai daily updates</td>
                    <td className="py-3">1</td>
                    <td className="py-3">2,854</td>
                    <td className="py-3">9.1%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">latest ai research</td>
                    <td className="py-3">5</td>
                    <td className="py-3">1,842</td>
                    <td className="py-3">6.3%</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
