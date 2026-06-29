"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  text: string;
  author: string;
  createdAt: string;
}

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
  notes?: Note[];
  timestamp: string;
  scope?: string;
}

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Notes state
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Lightbox preview state
  const [previewAsset, setPreviewAsset] = useState<{ label: string; url: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetchInquiryDetail();
    }
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewAsset(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchInquiryDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/inquiries?id=${id}`);
      if (!res.ok) {
        throw new Error("Sourcing Brief not found inside database");
      }
      const data = await res.json();
      setInquiry(data.inquiry);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusChange = async (newStatus: string) => {
    if (!inquiry) return;
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const data = await res.json();
      setInquiry(data.inquiry);
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  // Handle adding internal notes
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry || !newNote.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inquiry.id,
          note: newNote.trim(),
          noteAuthor: "Rishi", // Default CRM author
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save note");
      }

      const data = await res.json();
      setInquiry(data.inquiry);
      setNewNote("");
    } catch (err: any) {
      alert("Error saving note: " + err.message);
    } finally {
      setIsAddingNote(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-neutral-950 text-white min-h-screen pt-28 flex items-center justify-center">
        <Header />
        <div className="text-center font-mono text-xs text-white/40 tracking-[4px] uppercase">
          Decrypting sourcing spec data...
        </div>
      </main>
    );
  }

  if (error || !inquiry) {
    return (
      <main className="bg-neutral-950 text-white min-h-screen pt-28 flex flex-col items-center justify-center space-y-6">
        <Header />
        <div className="text-center font-mono text-xs text-red-400 tracking-[3px] uppercase">
          Error: {error || "Sourcing Brief not found"}
        </div>
        <button
          onClick={() => router.push("/admin/inquiries")}
          className="border border-white/20 text-white hover:bg-white hover:text-black transition-colors px-6 py-2.5 text-[10px] font-mono tracking-[3px] uppercase rounded-sm cursor-pointer"
        >
          ← Return to CRM Desk
        </button>
      </main>
    );
  }

  // Sort notes in reverse chronological order (newest first) for timeline presentation
  const sortedNotes = inquiry.notes
    ? [...inquiry.notes].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  return (
    <main className="bg-neutral-950 text-white min-h-screen pt-28 pb-20 overflow-x-hidden font-sans">
      <Header />

      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col space-y-10">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <button
              onClick={() => router.push("/admin/inquiries")}
              className="text-[10px] font-mono tracking-[4px] text-white/50 hover:text-white transition-colors uppercase flex items-center gap-2 group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Sourcing CRM Desk
            </button>
            <h1 className="text-2xl md:text-3.5xl font-light uppercase tracking-wide font-serif">
              Sourcing Brief Details
            </h1>
          </div>

          {/* CRM status selector & Lead badge */}
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border rounded-sm font-semibold ${
                inquiry.leadScore === "High Value Lead"
                  ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/30"
                  : inquiry.leadScore === "Medium Lead"
                  ? "bg-blue-950/30 text-blue-400 border-blue-800/30"
                  : "bg-neutral-900/60 text-neutral-400 border-neutral-800/60"
              }`}
            >
              {inquiry.leadScore}
            </span>

            <select
              value={inquiry.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`font-mono text-xs uppercase font-semibold px-4 py-2.5 rounded-sm border focus:outline-none cursor-pointer ${
                inquiry.status === "New"
                  ? "bg-neutral-900 text-white border-white/20 hover:border-white"
                  : inquiry.status === "Contacted"
                  ? "bg-purple-950/20 text-purple-400 border-purple-800/30"
                  : inquiry.status === "Sampling"
                  ? "bg-sky-950/20 text-sky-400 border-sky-800/30 font-bold"
                  : inquiry.status === "Quoted"
                  ? "bg-amber-950/20 text-amber-400 border-amber-800/30"
                  : inquiry.status === "Production"
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
        </div>

        {/* TWO COLUMN CRM DETAILS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SOURCE DETAILS (60%) */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* 1. RFQ Summary */}
            <div className={`border p-6 rounded-sm space-y-4 transition-all duration-500 ${
              inquiry.leadScore === "High Value Lead"
                ? "border-amber-500 bg-amber-500/[0.02] shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                : "border-white/10 bg-white/[0.01]"
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase">
                  01. RFQ Summary
                </h3>
                {inquiry.leadScore === "High Value Lead" && (
                  <span className="text-[9px] font-mono text-amber-400 animate-pulse tracking-wider">
                    ★ HIGH VALUE LEAD
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-white/30 block mb-1">SPEC ID</span>
                  <span className="text-white font-bold">{inquiry.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 block mb-1">STATUS</span>
                  <span className="text-sky-300 font-semibold uppercase">{inquiry.status}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 block mb-1">LEAD VALUE</span>
                  <span className="text-white font-semibold">{inquiry.leadScore}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 block mb-1">SUBMITTED</span>
                  <span className="text-white/70">
                    {new Date(inquiry.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Company Information */}
            <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
                02. Sourcing Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">BRAND ENTITY:</span>
                  <span className="text-white font-semibold uppercase">{inquiry.brand}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">PRODUCTION SCOPE:</span>
                  <span className="text-white uppercase">{inquiry.scope || "Private Label Production"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">CONTACT PERSON:</span>
                  <span className="text-white">{inquiry.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">WORK EMAIL:</span>
                  <span className="text-white font-medium">{inquiry.email}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">CONTACT PHONE:</span>
                  <span className="text-white font-medium">{inquiry.phone || "Not Provided"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">WEBSITE URL:</span>
                  <span className="text-white/60">Not Provided</span>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action button */}
              {inquiry.phone ? (
                <a
                  href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${inquiry.name}, this is the Fashion Berg Sourcing Desk in Düsseldorf. We have received your technical specifications for ${inquiry.productName} (Ref: ${inquiry.id}) for your brand ${inquiry.brand}. Let's schedule a design consultation to review your custom manufacturing program.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] tracking-[2px] uppercase py-3.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] rounded-sm cursor-pointer flex items-center justify-center gap-2 transition-all duration-300"
                >
                  💬 Contact via WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="mt-4 w-full bg-neutral-900 text-neutral-600 border border-neutral-800 font-semibold text-[10px] tracking-[2px] uppercase py-3.5 rounded-sm cursor-not-allowed opacity-50 flex items-center justify-center gap-2"
                >
                  💬 WhatsApp Not Available (No Phone)
                </button>
              )}
            </div>

            {/* 3. Manufacturing Requirements */}
            <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
                03. Manufacturing Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs font-mono mb-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">PRODUCT SILHOUETTE:</span>
                  <span className="text-white font-bold uppercase">{inquiry.productName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">TARGET QUANTITY:</span>
                  <span className="text-white font-semibold">{inquiry.volume}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">FABRIC COMPOSTION:</span>
                  <span className="text-white/80">{inquiry.fabric || "Not Specified"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">GSM SPEC WEIGHT:</span>
                  <span className="text-white">{inquiry.gsm || "Not Specified"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">BASE SIZE FIT:</span>
                  <span className="text-white">{inquiry.size || "Not Specified"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">YARN DYE COLOR:</span>
                  <span className="text-white">{inquiry.color || "Not Specified"}</span>
                </div>
              </div>

              {/* Technical comments brief */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-white/30 uppercase">Technical Comments & Specs:</span>
                <p className="text-xs text-white/80 font-light leading-relaxed bg-white/[0.01] p-4 border border-white/5 rounded-sm italic">
                  "{inquiry.message}"
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TECH ASSETS & NOTES (40%) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* 1. Uploaded Technical Assets */}
            <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-4">
              <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
                04. Uploaded Tech Assets
              </h3>
              
              <div className="flex flex-col space-y-3">
                {[
                  { label: "Tech Pack Spec Sheet", url: inquiry.techPackUrl },
                  { label: "Brand Logo Vector", url: inquiry.logoUrl },
                  { label: "Graphic Design Layout", url: inquiry.designUrl },
                  { label: "Reference Fit Image", url: inquiry.referenceImageUrl },
                ].map((asset, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-white/5 bg-white/[0.01] p-3 rounded-sm text-xs"
                  >
                    <div>
                      <span className="font-mono text-white/70 uppercase tracking-wider block">{asset.label}</span>
                      {asset.url && (
                        <span className="text-[9px] font-mono text-white/30 block mt-0.5">
                          {asset.url.split("/").pop()}
                        </span>
                      )}
                    </div>
                    {asset.url ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPreviewAsset({ label: asset.label, url: asset.url! })}
                          className="text-[10px] font-mono text-sky-400 hover:text-sky-300 underline uppercase cursor-pointer bg-transparent border-0"
                        >
                          Preview
                        </button>
                        <a
                          href={asset.url}
                          download
                          className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-1 hover:bg-white hover:text-black rounded-sm uppercase tracking-wider transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-white/20 uppercase">None</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Internal notes & CRM Timeline */}
            <div className="border border-white/10 bg-white/[0.01] p-6 rounded-sm space-y-6">
              <h3 className="text-xs font-mono tracking-[3px] text-white/40 uppercase border-b border-white/5 pb-2">
                05. Sourcing Desk Notes
              </h3>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex flex-col space-y-3">
                <textarea
                  required
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Append internal audit notes, timeline changes or buyer instructions..."
                  className="border border-white/10 bg-transparent px-3 py-2.5 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 resize-none font-light leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !newNote.trim()}
                  className="bg-white text-black font-semibold text-[10px] tracking-[2px] uppercase py-2.5 hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer disabled:opacity-50"
                >
                  {isAddingNote ? "APPENDING..." : "+ Add Note"}
                </button>
              </form>

              {/* CRM TIMELINE OF EVENTS & NOTES */}
              <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">
                  CRM EVENT TIMELINE
                </span>
                
                <div className="flex flex-col space-y-4">
                  {sortedNotes.map((note, index) => {
                    const isSystem = note.author === "System";
                    return (
                      <div
                        key={index}
                        className={`flex gap-3 text-xs leading-relaxed ${
                          isSystem ? "opacity-60" : ""
                        }`}
                      >
                        {/* Bullet indicators */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 ${
                              isSystem ? "bg-white/30" : "bg-sky-400"
                            }`}
                          />
                          {index < sortedNotes.length - 1 && (
                            <div className="w-[1px] flex-1 bg-white/10 mt-1" style={{ minHeight: "25px" }} />
                          )}
                        </div>

                        {/* Content text */}
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
                              {note.author}
                            </span>
                            <span className="font-mono text-[9px] text-white/30">
                              {new Date(note.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className={`font-light ${isSystem ? "font-mono text-[11px]" : "text-white/90"}`}>
                            {note.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Preview Modal Overlay */}
      <AnimatePresence>
        {previewAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setPreviewAsset(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-sm overflow-hidden z-10 flex flex-col max-h-[85vh] shadow-2xl text-white"
            >
              {/* Lightbox Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div>
                  <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block">
                    Secured Asset Vault
                  </span>
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
                    {previewAsset.label}
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewAsset(null)}
                  className="text-xs font-mono tracking-[3px] text-white/50 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-0"
                >
                  ✕ Close [ESC]
                </button>
              </div>

              {/* Lightbox Content Viewer */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[50vh] bg-black/30">
                {(() => {
                  const url = previewAsset.url.toLowerCase();
                  const filename = url.split("/").pop() || "";
                  const ext = filename.split(".").pop() || "";

                  // 1. Rendering Images
                  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
                    return (
                      <div className="relative max-h-[60vh] max-w-full flex items-center justify-center">
                        <img
                          src={previewAsset.url}
                          alt={previewAsset.label}
                          className="max-h-[60vh] max-w-full object-contain rounded-sm border border-white/5 shadow-lg"
                        />
                      </div>
                    );
                  }

                  // 2. Rendering PDFs inside native iframe Viewport
                  if (ext === "pdf") {
                    return (
                      <iframe
                        src={previewAsset.url}
                        title={previewAsset.label}
                        className="w-full h-[60vh] border border-white/5 rounded-sm bg-neutral-900"
                      />
                    );
                  }

                  // 3. Vector files / custom archives decryption cards
                  return (
                    <div className="border border-white/10 bg-white/[0.01] p-8 max-w-md rounded-sm text-center space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-8xl font-black font-mono">
                        .{ext.toUpperCase()}
                      </div>
                      <div className="w-12 h-12 rounded-full border border-sky-500/30 bg-sky-500/10 flex items-center justify-center mx-auto text-xl text-sky-400">
                        🗃
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-xs font-mono text-sky-400 tracking-[3px] uppercase font-bold">
                          .{ext.toUpperCase()} Vector Decryption
                        </h5>
                        <p className="text-xs text-white/80 font-light leading-relaxed">
                          This file format requires desktop visualization in professional suites like Adobe Illustrator, Photoshop, or CAD tools.
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/5 p-4 rounded-sm font-mono text-[10px] text-white/50 text-left">
                        <span className="text-white font-bold block mb-1">FILE METADATA</span>
                        Path: {previewAsset.url}<br />
                        Type: {ext.toUpperCase()} Archive File
                      </div>
                      <a
                        href={previewAsset.url}
                        download
                        className="inline-block w-full bg-white text-black font-semibold text-xs tracking-[3px] uppercase py-3 hover:bg-neutral-200 transition-colors rounded-sm text-center"
                      >
                        Download Vector File
                      </a>
                    </div>
                  );
                })()}
              </div>

              {/* Lightbox Footer Actions */}
              <div className="flex justify-between items-center px-6 py-4 border-t border-white/10 bg-white/[0.02]">
                <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  FASHION BERG CO. B2B SPECIFICATION DESK
                </span>
                <a
                  href={previewAsset.url}
                  download
                  className="bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 px-4 py-2 text-[10px] font-mono tracking-[2px] uppercase transition-all rounded-sm font-semibold"
                >
                  📥 Download File
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
