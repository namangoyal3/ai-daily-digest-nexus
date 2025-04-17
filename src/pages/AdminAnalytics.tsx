
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  Clock, 
  Globe
} from "lucide-react";

export default function AdminAnalytics() {
  return (
    <>
      <Helmet>
        <title>Analytics - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Track your website performance</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="realtime">Real-time</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                      <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24,892</div>
                      <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5.2%</div>
                      <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18,435</div>
                      <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3:42</div>
                      <p className="text-xs text-muted-foreground">+0:15 from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                      <p className="text-muted-foreground">Interactive chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Age Distribution</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>18-24</span>
                          <span>15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>25-34</span>
                          <span>32%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>35-44</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>45-54</span>
                          <span>18%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>55+</span>
                          <span>7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "7%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Geography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          <span>United States</span>
                        </div>
                        <span>42%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          <span>United Kingdom</span>
                        </div>
                        <span>15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          <span>Canada</span>
                        </div>
                        <span>12%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          <span>Australia</span>
                        </div>
                        <span>8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          <span>Germany</span>
                        </div>
                        <span>6%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">AI in Healthcare: 2025 Trends</h3>
                          <span className="text-sm text-green-600">4,256 views</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                          <span>Avg. Time: 3:42</span>
                          <span>Conversion Rate: 7.2%</span>
                        </div>
                      </div>
                      <div className="border p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Machine Learning Algorithms Explained</h3>
                          <span className="text-sm text-green-600">3,142 views</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                          <span>Avg. Time: 5:18</span>
                          <span>Conversion Rate: 9.1%</span>
                        </div>
                      </div>
                      <div className="border p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Ethics in Artificial Intelligence</h3>
                          <span className="text-sm text-green-600">2,854 views</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                          <span>Avg. Time: 4:05</span>
                          <span>Conversion Rate: 6.3%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="realtime" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Users Right Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-6xl font-bold">24</p>
                      <p className="text-muted-foreground mt-2">Active users on site</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>Home Page</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>AI in Healthcare: 2025 Trends</span>
                        <span className="font-medium">7</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>Machine Learning Algorithms Explained</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ethics in Artificial Intelligence</span>
                        <span className="font-medium">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
