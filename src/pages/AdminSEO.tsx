
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowUpRight,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AdminSEO() {
  const topKeywords = [
    { keyword: "artificial intelligence news", position: 2, traffic: 4256, ctr: 8.4 },
    { keyword: "machine learning trends", position: 3, traffic: 3142, ctr: 7.2 },
    { keyword: "ai daily updates", position: 1, traffic: 2854, ctr: 9.1 },
    { keyword: "latest ai research", position: 5, traffic: 1842, ctr: 6.3 },
  ];

  const pages = [
    { 
      url: "/ai-healthcare-trends", 
      title: "AI in Healthcare: 2025 Trends", 
      issues: 0,
      score: 95
    },
    { 
      url: "/machine-learning-algorithms", 
      title: "Machine Learning Algorithms Explained", 
      issues: 2,
      score: 82
    },
    { 
      url: "/future-nlp", 
      title: "The Future of Natural Language Processing", 
      issues: 5,
      score: 68
    },
    { 
      url: "/quantum-computing", 
      title: "Quantum Computing Breakthroughs", 
      issues: 1,
      score: 87
    },
    { 
      url: "/ethics-ai", 
      title: "Ethics in Artificial Intelligence", 
      issues: 0,
      score: 91
    },
  ];

  return (
    <>
      <Helmet>
        <title>SEO Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">SEO Management</h1>
              <p className="text-muted-foreground">Optimize your content for search engines</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="on-page">On-Page SEO</TabsTrigger>
                <TabsTrigger value="technical">Technical SEO</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                      <Globe className="h-4 w-4 text-muted-foreground" />
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
                      <Search className="h-4 w-4 text-muted-foreground" />
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
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
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
                      <FileText className="h-4 w-4 text-muted-foreground" />
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
                        <tr className="border-b">
                          <th className="text-left pb-2 font-medium">Keyword</th>
                          <th className="text-center pb-2 font-medium">Position</th>
                          <th className="text-center pb-2 font-medium">Traffic</th>
                          <th className="text-center pb-2 font-medium">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topKeywords.map((keyword, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-3">{keyword.keyword}</td>
                            <td className="py-3 text-center">
                              <Badge variant={keyword.position <= 3 ? "success" : "secondary"}>
                                {keyword.position}
                              </Badge>
                            </td>
                            <td className="py-3 text-center">{keyword.traffic}</td>
                            <td className="py-3 text-center">{keyword.ctr}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="on-page" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search pages..." className="pl-8" />
                  </div>
                  <Button>Analyze New Page</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Page SEO Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pages.map((page) => (
                        <div key={page.url} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{page.title}</h3>
                            <Badge variant={
                              page.score >= 90 ? "success" : 
                              page.score >= 80 ? "default" : "outline"
                            }>
                              Score: {page.score}/100
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{page.url}</p>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">SEO Health</span>
                            <span className="text-sm">
                              {page.issues === 0 ? (
                                <Badge variant="success" className="flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Perfect
                                </Badge>
                              ) : page.issues <= 2 ? (
                                <Badge className="flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-1" /> {page.issues} issues
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" /> {page.issues} issues
                                </Badge>
                              )}
                            </span>
                          </div>
                          <Progress 
                            value={page.score} 
                            className={
                              page.score >= 90 ? "bg-green-100" : 
                              page.score >= 80 ? "bg-yellow-100" : "bg-red-100"
                            }
                          />
                          <div className="mt-2">
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical SEO Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span>XML Sitemap</span>
                        </div>
                        <Badge variant="outline" className="bg-white">Updated 2 days ago</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span>Robots.txt</span>
                        </div>
                        <Badge variant="outline" className="bg-white">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Mobile Responsiveness</span>
                        </div>
                        <Badge variant="destructive">2 issues found</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-yellow-50">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                          <span>Page Speed</span>
                        </div>
                        <Badge variant="outline" className="bg-white">Score: 78/100</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span>HTTPS Security</span>
                        </div>
                        <Badge variant="outline" className="bg-white">Secure</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Crawl Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2 font-medium">URL</th>
                          <th className="text-center pb-2 font-medium">Status</th>
                          <th className="text-center pb-2 font-medium">Type</th>
                          <th className="text-right pb-2 font-medium">Last Checked</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">/old-post-123</td>
                          <td className="py-3 text-center">
                            <Badge variant="destructive">404</Badge>
                          </td>
                          <td className="py-3 text-center">Not Found</td>
                          <td className="py-3 text-right">2 days ago</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">/article/image-missing</td>
                          <td className="py-3 text-center">
                            <Badge variant="destructive">404</Badge>
                          </td>
                          <td className="py-3 text-center">Resource Not Found</td>
                          <td className="py-3 text-right">1 day ago</td>
                        </tr>
                        <tr>
                          <td className="py-3">/category/outdated</td>
                          <td className="py-3 text-center">
                            <Badge>301</Badge>
                          </td>
                          <td className="py-3 text-center">Redirect</td>
                          <td className="py-3 text-right">Today</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="keywords" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search keywords..." className="pl-8" />
                  </div>
                  <Button>Add Keywords</Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2 font-medium">Keyword</th>
                          <th className="text-center pb-2 font-medium">Position</th>
                          <th className="text-center pb-2 font-medium">Previous</th>
                          <th className="text-center pb-2 font-medium">Change</th>
                          <th className="text-center pb-2 font-medium">Traffic</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">artificial intelligence news</td>
                          <td className="py-3 text-center font-medium">2</td>
                          <td className="py-3 text-center">3</td>
                          <td className="py-3 text-center text-green-600">+1</td>
                          <td className="py-3 text-center">4,256</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">machine learning trends</td>
                          <td className="py-3 text-center font-medium">3</td>
                          <td className="py-3 text-center">5</td>
                          <td className="py-3 text-center text-green-600">+2</td>
                          <td className="py-3 text-center">3,142</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">ai daily updates</td>
                          <td className="py-3 text-center font-medium">1</td>
                          <td className="py-3 text-center">1</td>
                          <td className="py-3 text-center text-gray-400">0</td>
                          <td className="py-3 text-center">2,854</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">latest ai research</td>
                          <td className="py-3 text-center font-medium">5</td>
                          <td className="py-3 text-center">4</td>
                          <td className="py-3 text-center text-red-600">-1</td>
                          <td className="py-3 text-center">1,842</td>
                        </tr>
                        <tr>
                          <td className="py-3">neural networks explained</td>
                          <td className="py-3 text-center font-medium">8</td>
                          <td className="py-3 text-center">12</td>
                          <td className="py-3 text-center text-green-600">+4</td>
                          <td className="py-3 text-center">1,254</td>
                        </tr>
                      </tbody>
                    </table>
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
