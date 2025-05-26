"use client";

import { useEffect, useState } from "react";
import { Aircraft, AircraftStatus } from "@/lib/types";
import { getAllAircraft, updateAircraftStatus } from "@/lib/db";
import { AircraftTable } from "@/components/aircraft-table";
import { StatusFilter } from "@/components/status-filter";
import { SearchBox } from "@/components/search-box";
import { StatusUpdateModal } from "@/components/status-update-modal";
import { SummaryCards } from "@/components/summary-cards";

export default function Home() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [filteredAircraft, setFilteredAircraft] = useState<Aircraft[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<AircraftStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load aircraft data on component mount
  useEffect(() => {
    const loadData = () => {
      const data = getAllAircraft();
      setAircraft(data);
      setFilteredAircraft(data);
    };

    loadData();
    
    // Initialize aircraft data on first load
    if (typeof window !== 'undefined' && !localStorage.getItem('aircraft-fleet-data')) {
      const data = getAllAircraft();
      setAircraft(data);
      setFilteredAircraft(data);
    }
  }, []);

  // Filter aircraft based on status and search query
  useEffect(() => {
    let filtered = aircraft;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((a) => a.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.tailNumber.toLowerCase().includes(query) ||
          a.model.toLowerCase().includes(query)
      );
    }

    setFilteredAircraft(filtered);
  }, [aircraft, selectedStatus, searchQuery]);

  // Handle status update
  const handleStatusUpdate = (id: string, status: AircraftStatus) => {
    const updatedAircraft = updateAircraftStatus(id, status);
    setAircraft(updatedAircraft);
  };

  // Handle aircraft selection for status update
  const handleAircraftClick = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setIsModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-blue-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-1">Aircraft Fleet Management</h1>
          <p className="text-blue-100">Track and manage your aircraft readiness</p>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4 space-y-6">
        {/* Summary Cards */}
        <SummaryCards aircraft={aircraft} />

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-[1fr,auto]">
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
          <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
        </div>

        {/* Table Section */}
        <div className="rounded-md border bg-card p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Aircraft List 
              {selectedStatus !== "all" && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  Filtered by: {selectedStatus}
                </span>
              )}
              {searchQuery && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  Search: "{searchQuery}"
                </span>
              )}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredAircraft.length} of {aircraft.length} aircraft
            </div>
          </div>

          {/* Aircraft Table */}
          <AircraftTable 
            aircraft={filteredAircraft} 
            onAircraftClick={handleAircraftClick} 
          />
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground text-center pt-2">
          Click on any aircraft row to update its status
        </div>
      </div>

      {/* Status Update Modal */}
      <StatusUpdateModal
        aircraft={selectedAircraft}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </main>
  );
}