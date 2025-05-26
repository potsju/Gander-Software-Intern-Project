"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Aircraft } from "@/lib/types";
import { PlaneIcon, WrenchIcon, AlertTriangleIcon } from "lucide-react";

interface SummaryCardsProps {
  aircraft: Aircraft[];
}

export function SummaryCards({ aircraft }: SummaryCardsProps) {
  const totalAircraft = aircraft.length;
  const availableAircraft = aircraft.filter(a => a.status === "available").length;
  const maintenanceAircraft = aircraft.filter(a => a.status === "maintenance").length;
  const aogAircraft = aircraft.filter(a => a.status === "aog").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Aircraft</CardTitle>
          <PlaneIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAircraft}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50 dark:bg-green-900/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ready to Fly</CardTitle>
          <PlaneIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{availableAircraft}</div>
          <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
            {Math.round((availableAircraft / totalAircraft) * 100)}% of fleet available
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-amber-50 dark:bg-amber-900/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
          <WrenchIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{maintenanceAircraft}</div>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
            {Math.round((maintenanceAircraft / totalAircraft) * 100)}% of fleet in maintenance
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50 dark:bg-red-900/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aircraft on Ground</CardTitle>
          <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{aogAircraft}</div>
          <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">
            {Math.round((aogAircraft / totalAircraft) * 100)}% of fleet AOG
          </p>
        </CardContent>
      </Card>
    </div>
  );
}