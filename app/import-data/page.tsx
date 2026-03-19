"use client";

import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  Download,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";

// ── Config ──────────────────────────────────────────────────────────────────

const SOURCE_URL = "https://fearless-flamingo-921.convex.cloud";

// Tables that contain Convex _storage IDs — file links won't resolve in the
// new deployment (files must be re-uploaded separately).
const FILE_TABLES = new Set([
  "staff",
  "fees",
  "examTimetable",
  "lectureTimetable",
  "materials",
  "gpc",
  "news",
  "postgradSpotlight",
]);

type Status = "idle" | "loading" | "done" | "error";

interface TableState {
  docs: Record<string, unknown>[];
  status: Status;
  inserted: number;
  error?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status, count }: { status: Status; count?: number }) {
  if (status === "idle")
    return <span className="text-xs text-muted-foreground">idle</span>;
  if (status === "loading")
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
        <Loader2 className="w-3 h-3 animate-spin" /> importing…
      </span>
    );
  if (status === "done")
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="w-3 h-3" /> {count} inserted
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
      <AlertTriangle className="w-3 h-3" /> error
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ImportDataPage() {
  const [fetchStatus, setFetchStatus] = useState<Status>("idle");
  const [tables, setTables] = useState<Record<string, TableState>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [overallStatus, setOverallStatus] = useState<
    "idle" | "running" | "done"
  >("idle");

  const importTableData = useMutation(api.importData.importTableData);
  const clearTable = useMutation(api.importData.clearTable);

  // ── Step 1: fetch all data from source deployment ──────────────────────────

  const fetchData = useCallback(async () => {
    setFetchStatus("loading");
    try {
      const client = new ConvexHttpClient(SOURCE_URL);
      const data = await client.query(api.importData.exportAllData, {});

      const newTables: Record<string, TableState> = {};
      for (const [table, docs] of Object.entries(data)) {
        newTables[table] = {
          docs: docs as Record<string, unknown>[],
          status: "idle",
          inserted: 0,
        };
      }
      setTables(newTables);
      setFetchStatus("done");
    } catch (err) {
      console.error(err);
      setFetchStatus("error");
    }
  }, []);

  // ── Step 2: import a single table ─────────────────────────────────────────

  const importTable = useCallback(
    async (tableName: string, clearFirst = false) => {
      const docs = tables[tableName]?.docs ?? [];
      setTables((prev) => ({
        ...prev,
        [tableName]: { ...prev[tableName], status: "loading", error: undefined },
      }));
      try {
        if (clearFirst) await clearTable({ table: tableName });
        const inserted = await importTableData({
          table: tableName,
          documents: docs,
        });
        setTables((prev) => ({
          ...prev,
          [tableName]: { ...prev[tableName], status: "done", inserted },
        }));
      } catch (err) {
        setTables((prev) => ({
          ...prev,
          [tableName]: {
            ...prev[tableName],
            status: "error",
            error: String(err),
          },
        }));
      }
    },
    [tables, importTableData, clearTable]
  );

  // ── Step 3: import all tables sequentially ────────────────────────────────

  const importAll = useCallback(async () => {
    setOverallStatus("running");
    for (const tableName of Object.keys(tables)) {
      await importTable(tableName, true);
    }
    setOverallStatus("done");
  }, [tables, importTable]);

  const totalDocs = Object.values(tables).reduce(
    (sum, t) => sum + t.docs.length,
    0
  );
  const totalInserted = Object.values(tables).reduce(
    (sum, t) => sum + t.inserted,
    0
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Data Import Tool
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fetches all data from{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              {SOURCE_URL}
            </code>{" "}
            and imports it into the current deployment (
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              cool-crocodile-345
            </code>
            ).
          </p>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Tables marked with ⚠ contain file storage references that won&apos;t
            resolve in the new deployment — re-upload those files manually.
          </p>
        </div>

        {/* Step 1: Fetch */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground">
            Step 1 — Fetch from source
          </h2>
          <button
            onClick={fetchData}
            disabled={fetchStatus === "loading"}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {fetchStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {fetchStatus === "done" ? "Re-fetch data" : "Fetch data"}
              </>
            )}
          </button>
          {fetchStatus === "error" && (
            <p className="text-sm text-red-500">
              Failed to fetch — check the source URL or ensure{" "}
              <code className="font-mono text-xs">exportAllData</code> is
              deployed to the source.
            </p>
          )}
          {fetchStatus === "done" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Fetched {Object.keys(tables).length} tables · {totalDocs.toLocaleString()} documents total
            </p>
          )}
        </section>

        {/* Step 2: Table list */}
        {fetchStatus === "done" && Object.keys(tables).length > 0 && (
          <section className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Step 2 — Import tables
              </h2>
              <button
                onClick={importAll}
                disabled={overallStatus === "running"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {overallStatus === "running" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Importing all…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {overallStatus === "done" ? "Re-import all" : "Import all"}
                  </>
                )}
              </button>
            </div>

            {Object.entries(tables).map(([tableName, state]) => (
              <div key={tableName}>
                <div className="px-5 py-3 flex items-center gap-3">
                  {/* Expand toggle */}
                  <button
                    onClick={() =>
                      setExpanded((p) => (p === tableName ? null : tableName))
                    }
                    className="text-muted-foreground hover:text-foreground transition"
                    aria-label="toggle preview"
                  >
                    {expanded === tableName ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Table name */}
                  <span className="font-mono text-sm font-semibold text-foreground flex-1">
                    {tableName}
                    {FILE_TABLES.has(tableName) && (
                      <span
                        className="ml-2 text-amber-500"
                        title="Contains file storage references"
                      >
                        ⚠
                      </span>
                    )}
                  </span>

                  {/* Count */}
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {state.docs.length} docs
                  </span>

                  {/* Status */}
                  <div className="w-28 flex justify-end">
                    <StatusBadge status={state.status} count={state.inserted} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => importTable(tableName, true)}
                      disabled={
                        state.status === "loading" ||
                        overallStatus === "running"
                      }
                      title="Clear then import"
                      className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition"
                    >
                      {state.status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-4 h-4 text-primary" />
                      )}
                    </button>
                    <button
                      onClick={() => clearTable({ table: tableName })}
                      disabled={overallStatus === "running"}
                      title="Clear table"
                      className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {state.error && (
                  <div className="px-5 pb-3">
                    <p className="text-xs text-red-500 font-mono bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">
                      {state.error}
                    </p>
                  </div>
                )}

                {/* Expanded JSON preview */}
                {expanded === tableName && state.docs.length > 0 && (
                  <div className="px-5 pb-4">
                    <pre className="text-[10px] font-mono leading-relaxed bg-muted rounded-xl p-4 overflow-x-auto max-h-48 overflow-y-auto text-muted-foreground">
                      {JSON.stringify(state.docs.slice(0, 3), null, 2)}
                      {state.docs.length > 3
                        ? `\n\n… and ${state.docs.length - 3} more`
                        : ""}
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Footer summary */}
            {overallStatus === "done" && (
              <div className="px-5 py-4 bg-emerald-50 dark:bg-emerald-950/30 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Import complete — {totalInserted.toLocaleString()} documents inserted across{" "}
                  {Object.keys(tables).length} tables.
                </p>
                <button
                  onClick={fetchData}
                  className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <RefreshCw className="w-3 h-3" /> Re-fetch
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
