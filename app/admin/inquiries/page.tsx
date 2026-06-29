"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { motion } from "framer-motion";

interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  type: "sample" | "quotation";
  fabric: string;
  gsm: string;
  size: string;
  color: string;
  name: string;
  email: string;
  phone?: string;
  brand: string;
  volume: string;
  message: string;
  techPackUrl?: string;
  logoUrl?: string;
  designUrl?: string;
  referenceImageUrl?: string;
  leadScore: "Small Lead" | "Medium Lead" | "High Value Lead";
  status: "New" | "Contacted" | "Sampling" | "Quoted" | "Production" | "Closed";
  timestamp: string;
  scope?: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [leadFilter, setLeadFilter] = useState("All");

  // Fetch inquiries on mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      if (!res.ok) {
        throw new Error("Failed to fetch commercial sourcing vault data");
      }
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Optimistic state update
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
      );
    } catch (err: any) {
      alert("Error updating sourcing status: " + err.message);
    }
  };

  // Compiles and exports dynamic CSV spreadsheet compilation based on filtered results
  const handleExportCSV = () => {
    const headers = [
      "Reference ID",
      "Product ID",
      "Product Name",
      "Sourcing Type",
      "Fabric Composition",
      "GSM Weight",
      "Base Size Fit",
      "Yarn Dye Color",
      "Contact Name",
      "Work Email",
      "Contact Phone",
      "Brand / Company Name",
      "Target Sourcing Volume",
      "Production Scope",
      "Lead Value Scoring",
      "CRM Pipeline Status",
      "Inquiry Timestamp",
      "Additional Technical Briefing Remarks"
    ];

    const rows = filteredInquiries.map((item) => [
      item.id,
      item.productId,
      item.productName,
      item.type,
      item.fabric,
      item.gsm,
      item.size,
      item.color,
      item.name,
      item.email,
      item.phone || "Not Provided",
      item.brand,
      item.volume,
      item.scope || "Private Label Production",
      item.leadScore,
      item.status,
      item.timestamp,
      item.message.replace(/"/g, '""') // Escape quotes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `fashion_berg_sourcing_inquiries_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sourcing Statistics Calculations
  const stats = {
    total: inquiries.length,
    highValue: inquiries.filter((i) => i.leadScore === "High Value Lead").length,
    sampling: inquiries.filter((i) => i.status === "Sampling").length,
    activeProduction: inquiries.filter((i) => i.status === "Production").length,
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesLead = leadFilter === "All" || item.leadScore === leadFilter;

    return matchesSearch && matchesStatus && matchesLead;
  });

  return (
    <main className="bg-neutral-950 text-white min-h-screen pt-28 pb-20 overflow-x-hidden font-sans">
      <Header />

      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col space-y-10">
        {/* Title / Sourcing Desk info */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[5px] text-white/40 uppercase block mb-3">
              Commercial Operations Vault
            </span>
            <h1 className="text-3xl md:text-5xl font-light uppercase tracking-wide font-serif">
              Sourcing CRM
            </h1>
          </div>
          <p className="max-w-md text-xs text-white/50 font-light leading-relaxed">
            Authorized admin control console for evaluating technical fabric briefs, managing sampling statuses, and checking high-volume production queues.
          </p>
        </div>

        {/* 1. STATS METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Sourcing Briefs", val: stats.total, color: "text-white" },
            { label: "High-Value Programs", val: stats.highValue, color: "text-amber-400" },
            { label: "Sampling Active", val: stats.sampling, color: "text-sky-300" },
            { label: "In Production Queue", val: stats.activeProduction, color: "text-emerald-400" },
          ].map((stat, idx) => (
            <div key={idx} className="border border-white/10 bg-white/[0.01] p-5 rounded-sm">
              <span className="text-[9px] font-mono tracking-[2px] text-white/30 uppercase block mb-1">
                {stat.label}
              </span>
              <span className={`text-2xl md:text-3.5xl font-light font-mono ${stat.color}`}>
                {stat.val}
              </span>
            </div>
          ))}
        </div>

        {/* SOURCING PROGRAM ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Silhouette Popularity (Pure CSS) */}
          <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-4 shadow-xl">
            <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
              Silhouette Popularity
            </h3>
            <div className="space-y-4 pt-2">
              {[
                { name: "Oversized Tees", key: "oversized-tees", color: "bg-white" },
                { name: "Hoodies", key: "hoodies", color: "bg-amber-400" },
                { name: "Polos", key: "polos", color: "bg-sky-300" },
                { name: "Sweatshirts", key: "sweatshirts", color: "bg-purple-400" },
                { name: "Custom Apparel", key: "custom", color: "bg-emerald-400" },
              ].map((silhouette) => {
                const count = inquiries.filter((i) => i.productId === silhouette.key).length;
                const percent = inquiries.length ? (count / inquiries.length) * 100 : 0;
                return (
                  <div key={silhouette.key} className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-white/70 uppercase tracking-wide">{silhouette.name}</span>
                      <span className="text-white/40">
                        {count} {count === 1 ? "Brief" : "Briefs"} ({percent.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${silhouette.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sourcing Pipeline Flow */}
          <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-4 shadow-xl">
            <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
              Pipeline Distributions
            </h3>
            <div className="space-y-4 pt-2">
              {[
                { name: "New Submissions", key: "New", color: "bg-white" },
                { name: "Contacted", key: "Contacted", color: "bg-purple-400" },
                { name: "Sampling / Fit Verification", key: "Sampling", color: "bg-sky-300" },
                { name: "Quotation / Negotiating", key: "Quoted", color: "bg-amber-400" },
                { name: "Production Running", key: "Production", color: "bg-emerald-400" },
                { name: "Closed Accounts", key: "Closed", color: "bg-neutral-600" },
              ].map((status) => {
                const count = inquiries.filter((i) => i.status === status.key).length;
                const percent = inquiries.length ? (count / inquiries.length) * 100 : 0;
                return (
                  <div key={status.key} className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-white/70 uppercase tracking-wide">{status.name}</span>
                      <span className="text-white/40">
                        {count} ({percent.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${status.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. SEARCH & FILTER CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by Brand, Name, Spec ID or Silhouette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-white/10 bg-transparent px-4 py-2.5 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-white/10 bg-neutral-900 text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Sampling">Sampling</option>
              <option value="Quoted">Quoted</option>
              <option value="Production">Production</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={leadFilter}
              onChange={(e) => setLeadFilter(e.target.value)}
              className="border border-white/10 bg-neutral-900 text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-white cursor-pointer"
            >
              <option value="All">All Lead Values</option>
              <option value="Small Lead">Small Lead</option>
              <option value="Medium Lead">Medium Lead</option>
              <option value="High Value Lead">High Value Lead</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="bg-white text-black font-semibold text-[10px] tracking-[2px] uppercase px-5 py-2.5 hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              📊 Export CSV
            </button>
          </div>
        </div>

        {/* 3. LEADS DATA TABLE */}
        <div className="border border-white/10 bg-white/[0.01] rounded-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-xs font-mono text-white/40 tracking-[3px] uppercase">
              Fetching sourcing database...
            </div>
          ) : error ? (
            <div className="py-20 text-center text-xs font-mono text-red-400 tracking-[3px] uppercase">
              Error: {error}
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-20 text-center text-xs font-mono text-white/40 tracking-[3px] uppercase">
              No commercial briefs logged.
            </div>
          ) : (
            <div>
              {/* Desktop Table View */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/[0.02] text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                      <th className="py-4 px-5">Ref ID</th>
                      <th className="py-4 px-5">Silhouette</th>
                      <th className="py-4 px-5">Volume</th>
                      <th className="py-4 px-5">Corporate Entity</th>
                      <th className="py-4 px-5">Date</th>
                      <th className="py-4 px-5">Lead Value</th>
                      <th className="py-4 px-5">Tech Assets</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredInquiries.map((item) => {
                      const waMessage = `Hello ${item.name}, this is Fashion Berg Sourcing Desk in Düsseldorf. We have received your technical specifications for ${item.productName} (Ref: ${item.id}) for brand ${item.brand}. Let's schedule a pricing and custom apparel design review consultation.`;
                      const waUrl = item.phone
                        ? `https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage)}`
                        : "";

                      return (
                        <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                          {/* Ref ID */}
                          <td className="py-4 px-5 font-mono text-white font-semibold">
                            <a
                              href={`/admin/inquiries/${item.id}`}
                              className="hover:underline hover:text-sky-400 transition-colors"
                            >
                              {item.id}
                            </a>
                          </td>

                          {/* Silhouette & specs info popup */}
                          <td className="py-4 px-5">
                            <div>
                              <p className="font-semibold uppercase text-white">{item.productName}</p>
                              <p className="text-[9px] text-white/40 font-mono mt-0.5 uppercase">
                                {item.fabric.split(" ")[0]} ({item.gsm})
                              </p>
                            </div>
                          </td>

                          {/* Volume */}
                          <td className="py-4 px-5 font-mono text-white/70">
                            {item.volume}
                          </td>

                          {/* Company Name */}
                          <td className="py-4 px-5">
                            <div>
                              <p className="font-semibold text-white uppercase">{item.brand}</p>
                              <p className="text-[10px] text-white/40 font-light mt-0.5">{item.name}</p>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-5 text-white/50 font-mono">
                            {new Date(item.timestamp).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          {/* Lead Value Badge */}
                          <td className="py-4 px-5">
                            <span
                              className={`inline-block px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase border rounded-sm font-semibold ${
                                item.leadScore === "High Value Lead"
                                  ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/30"
                                  : item.leadScore === "Medium Lead"
                                  ? "bg-blue-950/30 text-blue-400 border-blue-800/30"
                                  : "bg-neutral-900/60 text-neutral-400 border-neutral-800/60"
                              }`}
                            >
                              {item.leadScore}
                            </span>
                          </td>

                          {/* File uploads links */}
                          <td className="py-4 px-5 font-mono text-[10px]">
                            <div className="flex flex-col space-y-1">
                              {item.techPackUrl && (
                                <a
                                  href={item.techPackUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-400 hover:text-sky-300 underline"
                                >
                                  Tech Pack
                                </a>
                              )}
                              {item.logoUrl && (
                                <a
                                  href={item.logoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-400 hover:text-sky-300 underline"
                                >
                                  Logo
                                </a>
                              )}
                              {item.designUrl && (
                                <a
                                  href={item.designUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-400 hover:text-sky-300 underline"
                                >
                                  Design
                                </a>
                              )}
                              {item.referenceImageUrl && (
                                <a
                                  href={item.referenceImageUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sky-400 hover:text-sky-300 underline"
                                >
                                  Ref Img
                                </a>
                              )}
                              {!item.techPackUrl && !item.logoUrl && !item.designUrl && !item.referenceImageUrl && (
                                <span className="text-white/20">None</span>
                              )}
                            </div>
                          </td>

                          {/* Interactive CRM Status selector */}
                          <td className="py-4 px-5">
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`font-mono text-[10px] uppercase font-semibold px-2 py-1 rounded-sm border focus:outline-none cursor-pointer ${
                                item.status === "New"
                                  ? "bg-neutral-900 text-white border-white/20 hover:border-white"
                                  : item.status === "Contacted"
                                  ? "bg-purple-950/20 text-purple-400 border-purple-800/30"
                                  : item.status === "Sampling"
                                  ? "bg-sky-950/20 text-sky-400 border-sky-800/30 font-bold"
                                  : item.status === "Quoted"
                                  ? "bg-amber-950/20 text-amber-400 border-amber-800/30"
                                  : item.status === "Production"
                                  ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/30 font-bold"
                                  : "bg-neutral-900 text-neutral-500 border-neutral-800/50"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Sampling">Sampling</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Production">Production</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          {/* Actions column */}
                          <td className="py-4 px-5 text-right space-x-2">
                            <a
                              href={`/admin/inquiries/${item.id}`}
                              className="inline-flex items-center gap-1 bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all"
                            >
                              👁 View
                            </a>
                            {waUrl ? (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Contact via WhatsApp"
                                className="inline-flex items-center gap-1 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all"
                              >
                                💬 WhatsApp
                              </a>
                            ) : (
                              <span
                                title="No phone number provided"
                                className="inline-flex items-center gap-1 bg-neutral-900 text-neutral-600 border border-neutral-800 px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider cursor-not-allowed opacity-40"
                              >
                                💬 WhatsApp
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="grid grid-cols-1 md:hidden gap-6 p-4">
                {filteredInquiries.map((item) => {
                  const waMessage = `Hello ${item.name}, this is Fashion Berg Sourcing Desk in Düsseldorf. We have received your technical specifications for ${item.productName} (Ref: ${item.id}) for brand ${item.brand}. Let's schedule a pricing and custom apparel design review consultation.`;
                  const waUrl = item.phone
                    ? `https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage)}`
                    : "";

                  return (
                    <div 
                      key={item.id} 
                      className="border border-white/10 bg-white/[0.02] p-5 rounded-sm flex flex-col space-y-4 shadow-xl relative overflow-hidden"
                    >
                      {/* Ref ID & Status */}
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <span className="font-mono text-white font-semibold">
                          Ref: <a href={`/admin/inquiries/${item.id}`} className="text-sky-400 hover:underline">{item.id}</a>
                        </span>
                        
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`font-mono text-[9px] uppercase font-semibold px-2 py-1 rounded-sm border focus:outline-none cursor-pointer ${
                            item.status === "New"
                              ? "bg-neutral-900 text-white border-white/20 hover:border-white"
                              : item.status === "Contacted"
                              ? "bg-purple-950/20 text-purple-400 border-purple-800/30"
                              : item.status === "Sampling"
                              ? "bg-sky-950/20 text-sky-400 border-sky-800/30 font-bold"
                              : item.status === "Quoted"
                              ? "bg-amber-950/20 text-amber-400 border-amber-800/30"
                              : item.status === "Production"
                              ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/30 font-bold"
                              : "bg-neutral-900 text-neutral-500 border-neutral-800/50"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Sampling">Sampling</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Production">Production</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      {/* Brand, Contact & Lead Value */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-semibold text-white uppercase text-sm">{item.brand}</p>
                          <p className="text-xs text-white/50 font-light mt-0.5">{item.name}</p>
                        </div>
                        
                        <span
                          className={`inline-block px-2.5 py-1 text-[8px] font-mono tracking-wider uppercase border rounded-sm font-semibold ${
                            item.leadScore === "High Value Lead"
                              ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/30"
                              : item.leadScore === "Medium Lead"
                              ? "bg-blue-950/30 text-blue-400 border-blue-800/30"
                              : "bg-neutral-900/60 text-neutral-400 border-neutral-800/60"
                          }`}
                        >
                          {item.leadScore}
                        </span>
                      </div>

                      {/* Silhouette Specs & Details */}
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-sm flex flex-col space-y-1.5 font-mono text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-white/40 uppercase">Silhouette</span>
                          <span className="text-white uppercase font-bold">{item.productName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 uppercase">Specs</span>
                          <span className="text-white/80">{item.fabric.split(" ")[0]} ({item.gsm})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 uppercase">Volume</span>
                          <span className="text-white font-semibold">{item.volume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 uppercase">Date Logged</span>
                          <span className="text-white/50">
                            {new Date(item.timestamp).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Uploaded Tech Assets */}
                      <div className="flex flex-col space-y-1.5 border-t border-white/5 pt-3">
                        <span className="text-[9px] font-mono tracking-[1px] text-white/30 uppercase">TECHNICAL ASSETS:</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono">
                          {item.techPackUrl ? (
                            <a href={item.techPackUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 underline">
                              Tech Pack
                            </a>
                          ) : null}
                          {item.logoUrl ? (
                            <a href={item.logoUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 underline">
                              Logo Vector
                            </a>
                          ) : null}
                          {item.designUrl ? (
                            <a href={item.designUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 underline">
                              Design Layout
                            </a>
                          ) : null}
                          {item.referenceImageUrl ? (
                            <a href={item.referenceImageUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 underline">
                              Ref Image
                            </a>
                          ) : null}
                          {!item.techPackUrl && !item.logoUrl && !item.designUrl && !item.referenceImageUrl && (
                            <span className="text-white/20">No assets provided</span>
                          )}
                        </div>
                      </div>

                      {/* Direct action triggers */}
                      <div className="flex gap-2.5 pt-2">
                        <a
                          href={`/admin/inquiries/${item.id}`}
                          className="flex-1 text-center bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 py-2 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all"
                        >
                          👁 View details
                        </a>
                        {waUrl ? (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 py-2 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all"
                          >
                            💬 WhatsApp
                          </a>
                        ) : (
                          <span className="flex-1 text-center bg-neutral-900 text-neutral-600 border border-neutral-800 py-2 rounded-sm text-[10px] font-mono uppercase tracking-wider cursor-not-allowed opacity-40">
                            💬 WhatsApp
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
