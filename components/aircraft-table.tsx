"use client";

import { useState } from "react";
import { Aircraft, AircraftStatus } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface AircraftTableProps {
  aircraft: Aircraft[];
  onAircraftClick: (aircraft: Aircraft) => void;
}

export function AircraftTable({ aircraft, onAircraftClick }: AircraftTableProps) {
  const columns: ColumnDef<Aircraft>[] = [
    {
      accessorKey: "tailNumber",
      header: "Tail Number",
      cell: ({ row }) => <div className="font-medium">{row.getValue("tailNumber")}</div>,
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as AircraftStatus;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.original.location;
        return <div>{location.name}</div>;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = new Date(row.original.lastUpdated);
        return <div>{format(date, "MMM d, yyyy HH:mm")}</div>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={aircraft}
      onRowClick={onAircraftClick}
    />
  );
}