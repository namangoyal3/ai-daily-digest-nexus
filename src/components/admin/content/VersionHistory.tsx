
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function VersionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
        <CardDescription>
          View and restore previous versions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center p-2 border rounded-lg bg-gray-50">
            <History className="h-5 w-5 mr-3 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium">Current Version</p>
              <p className="text-sm text-gray-500">Last saved: 2025-04-17 10:45 AM</p>
            </div>
            <Button variant="outline" size="sm" disabled>Current</Button>
          </div>
          
          <div className="flex items-center p-2 border rounded-lg">
            <History className="h-5 w-5 mr-3 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Previous Version</p>
              <p className="text-sm text-gray-500">Saved: 2025-04-16 3:22 PM</p>
            </div>
            <Button variant="outline" size="sm">Restore</Button>
          </div>
          
          <div className="flex items-center p-2 border rounded-lg">
            <History className="h-5 w-5 mr-3 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Initial Version</p>
              <p className="text-sm text-gray-500">Created: 2025-04-15 11:30 AM</p>
            </div>
            <Button variant="outline" size="sm">Restore</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
