"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Aircraft, AircraftStatus } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface StatusUpdateModalProps {
  aircraft: Aircraft | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: AircraftStatus) => void;
}

export function StatusUpdateModal({
  aircraft,
  isOpen,
  onClose,
  onStatusUpdate,
}: StatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<AircraftStatus | null>(
    aircraft?.status || null
  );

  // Update selected status when aircraft changes
  if (aircraft?.status !== selectedStatus && isOpen) {
    setSelectedStatus(aircraft?.status || null);
  }

  const handleStatusUpdate = () => {
    if (aircraft && selectedStatus) {
      onStatusUpdate(aircraft.id, selectedStatus);
      onClose();
    }
  };

  if (!aircraft) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Aircraft Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="font-medium">Tail Number</div>
            <div>{aircraft.tailNumber}</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Model</div>
            <div>{aircraft.model}</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Current Status</div>
            <StatusBadge status={aircraft.status} />
          </div>
          <div className="space-y-3 pt-2">
            <div className="font-medium">Update Status</div>
            <RadioGroup
              value={selectedStatus || undefined}
              onValueChange={(value) => setSelectedStatus(value as AircraftStatus)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="available" id="available" />
                <Label htmlFor="available" className="flex items-center space-x-2">
                  <StatusBadge status="available" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maintenance" id="maintenance" />
                <Label htmlFor="maintenance" className="flex items-center space-x-2">
                  <StatusBadge status="maintenance" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aog" id="aog" />
                <Label htmlFor="aog" className="flex items-center space-x-2">
                  <StatusBadge status="aog" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStatusUpdate}
            disabled={!selectedStatus || selectedStatus === aircraft.status}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}