import { AircraftStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: AircraftStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      label: "Available",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    },
    maintenance: {
      label: "Maintenance",
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    },
    aog: {
      label: "AOG",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}