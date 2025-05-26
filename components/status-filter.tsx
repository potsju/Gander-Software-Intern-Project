"use client";

import { Button } from "@/components/ui/button";
import { AircraftStatus } from "@/lib/types";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface StatusFilterProps {
  selectedStatus: AircraftStatus | "all";
  onStatusChange: (status: AircraftStatus | "all") => void;
}

export function StatusFilter({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedStatus === "all" ? "default" : "outline"}
        onClick={() => onStatusChange("all")}
        className="gap-2"
      >
        All
      </Button>
      
      <Button
        variant={selectedStatus === "available" ? "default" : "outline"}
        onClick={() => onStatusChange("available")}
        className="gap-2"
      >
        <CheckCircle className="h-4 w-4 text-green-600" />
        Available
      </Button>
      
      <Button
        variant={selectedStatus === "maintenance" ? "default" : "outline"}
        onClick={() => onStatusChange("maintenance")}
        className="gap-2"
      >
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        Maintenance
      </Button>
      
      <Button
        variant={selectedStatus === "aog" ? "default" : "outline"}
        onClick={() => onStatusChange("aog")}
        className="gap-2"
      >
        <AlertOctagon className="h-4 w-4 text-red-600" />
        AOG
      </Button>
    </div>
  );
}