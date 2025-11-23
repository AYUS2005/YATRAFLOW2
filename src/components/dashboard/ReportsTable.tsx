import React, { useState } from "react";
import { Report } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { updateReport, deleteReport } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";

interface ReportsTableProps {
  reports: Report[];
  onReportsChange: (reports: Report[]) => void;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onReportsChange,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin"; // 🔥 ROLE CHECK

  const [editMap, setEditMap] = useState<Record<string, Partial<Report>>>({});

  const handleUpdate = (updatedReport: Report) => {
    if (!isAdmin) return; // 🔥 user cannot update
    updateReport(updatedReport);
    const newReports = reports.map((r) =>
      r.id === updatedReport.id ? updatedReport : r
    );
    onReportsChange(newReports);
  };

  const handleDelete = (report: Report) => {
    if (!isAdmin) return; // 🔥 prevent delete
    deleteReport(report.id);
    onReportsChange(reports.filter((r) => r.id !== report.id));
    setEditMap((prev) => {
      const copy = { ...prev };
      delete copy[report.id];
      return copy;
    });
  };

  const reportTypes: Report["type"][] = ["accident", "hazard"];
  const severityLevels: Report["severity"][] = [
    "low",
    "medium",
    "high",
    "critical",
  ];
  const statuses: Report["status"][] = ["active", "resolved", "pending"];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Severity</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Zone</TableCell>
          <TableCell>Date / Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map((report) => {
          const edited = editMap[report.id] || {};
          return (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>

              {/* Type */}
              <TableCell>
                <select
                  disabled={!isAdmin} // 🔥 user cannot edit
                  value={edited.type || report.type}
                  onChange={(e) => {
                    const newType = e.target.value as Report["type"];
                    const updated = { ...report, type: newType };
                    setEditMap({ ...editMap, [report.id]: { ...edited, type: newType } });
                    handleUpdate(updated);
                  }}
                  className={`bg-white dark:bg-gray-800 text-black dark:text-white border rounded px-2 py-1 ${
                    !isAdmin ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {reportTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </TableCell>

              {/* Severity */}
              <TableCell>
                <select
                  disabled={!isAdmin} // 🔥 user cannot edit
                  value={edited.severity || report.severity}
                  onChange={(e) => {
                    const newSeverity = e.target.value as Report["severity"];
                    const updated = { ...report, severity: newSeverity };
                    setEditMap({
                      ...editMap,
                      [report.id]: { ...edited, severity: newSeverity },
                    });
                    handleUpdate(updated);
                  }}
                  className={`bg-white dark:bg-gray-800 text-black dark:text-white border rounded px-2 py-1 ${
                    !isAdmin ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {severityLevels.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </TableCell>

              {/* Status */}
              <TableCell>
                <select
                  disabled={!isAdmin} // 🔥 user cannot edit
                  value={edited.status || report.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as Report["status"];
                    const updated = { ...report, status: newStatus };
                    setEditMap({
                      ...editMap,
                      [report.id]: { ...edited, status: newStatus },
                    });
                    handleUpdate(updated);
                  }}
                  className={`bg-white dark:bg-gray-800 text-black dark:text-white border rounded px-2 py-1 ${
                    !isAdmin ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </TableCell>

              <TableCell>{report.zone}</TableCell>
              <TableCell>{new Date(report.reportedAt).toLocaleString()}</TableCell>

              {/* DELETE BUTTON */}
              <TableCell className="flex gap-2">
                {isAdmin ? (
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(report)}
                  >
                    Delete
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">No Actions</span> // 🔥 user sees nothing
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
