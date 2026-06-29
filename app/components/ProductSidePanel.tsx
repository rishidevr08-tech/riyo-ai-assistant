"use client";

import { useInquiry, ProductColor } from "./InquiryContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productsPreset = [
  { 
    id: "oversized-tees", 
    name: "Oversized Tees", 
    fabrics: ["100% Organic Ring-Spun Cotton", "Premium Heavyweight Cotton Jersey", "Supima Cotton Blend"],
    gsms: ["240 GSM", "280 GSM", "300 GSM"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Off-White", hex: "#F3EFE9" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Vintage Brown", hex: "#4A3E3D" },
      { name: "Sage Green", hex: "#7E8F7C" }
    ]
  },
  { 
    id: "hoodies", 
    name: "Hoodies", 
    fabrics: ["100% French Terry Cotton", "Diagonal Knit Loopback Cotton", "Organic Terry Blend"],
    gsms: ["400 GSM", "420 GSM", "460 GSM"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Charcoal Gray", hex: "#3A3A3A" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Sand", hex: "#E3DAC9" },
      { name: "Midnight Blue", hex: "#1E2A38" }
    ]
  },
  { 
    id: "polos", 
    name: "Polos", 
    fabrics: ["Premium Piqué Cotton", "Mercerized Cotton Yarn", "Cotton-Silk Blend"],
    gsms: ["220 GSM", "240 GSM", "280 GSM"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Navy Blue", hex: "#1D2A44" },
      { name: "Burgundy", hex: "#5C1329" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Sage Green", hex: "#7E8F7C" }
    ]
  },
  { 
    id: "sweatshirts", 
    name: "Sweatshirts", 
    fabrics: ["Diagonal Fleece Loopback", "Super-Soft Brushed Fleece", "Organic Fleece Cotton"],
    gsms: ["360 GSM", "380 GSM", "420 GSM"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Heather Gray", hex: "#B2B2B2" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Olive Green", hex: "#4B5320" },
      { name: "Warm Taupe", hex: "#B38B6D" }
    ]
  },
  { 
    id: "custom", 
    name: "Custom Apparel", 
    fabrics: ["Bespoke Yarn Sourcing", "Recycled Blends", "Technical Fabrics"],
    gsms: ["Custom Range (120-600 GSM)"],
    sizes: ["Custom Size Chart (XS-5XL)"],
    colors: [
      { name: "Any Custom Color (PANTONE)", hex: "#CCCCCC" }
    ]
  }
];

export default function ProductSidePanel() {
  const { isOpen, closePanel, activeProduct } = useInquiry();

  // Step state: 1 = Product, 2 = Quantity, 3 = Fabrics/Specs, 4 = Uploads, 5 = Company, 6 = Review
  const [currentStep, setCurrentStep] = useState(1);

  // Sourcing wizard state
  const [selectedProductId, setSelectedProductId] = useState("oversized-tees");
  const [selectedProduct, setSelectedProduct] = useState(productsPreset[0]);

  const [volume, setVolume] = useState("300 - 1,000 Pcs");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedGsm, setSelectedGsm] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

  // File states
  const [techPack, setTechPack] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [design, setDesign] = useState<File | null>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  // Contact/Company state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [phone, setPhone] = useState("");
  const [scope, setScope] = useState("Private Label Production");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [success, setSuccess] = useState(false);

  // Track activeProduct from context and auto-initialize step
  useEffect(() => {
    if (activeProduct) {
      const preset = productsPreset.find((p) => p.id === activeProduct.id) || productsPreset[0];
      setSelectedProductId(preset.id);
      setSelectedProduct(preset);

      setSelectedFabric(preset.fabrics[0] || "");
      setSelectedGsm(preset.gsms[0] || "");
      setSelectedSize(preset.sizes[0] || "");
      setSelectedColor(preset.colors[0] || null);

      // Auto-skip product select if triggered from specific product details
      setCurrentStep(2);

      // Reset submission states
      setSuccess(false);
      setReferenceId("");
      setSubmitError("");
      setTechPack(null);
      setLogo(null);
      setDesign(null);
      setReferenceImage(null);
      setName("");
      setEmail("");
      setBrand("");
      setPhone("");
      setMessage("");
    } else {
      // General entry starts at step 1
      setCurrentStep(1);
      const preset = productsPreset[0];
      setSelectedProductId(preset.id);
      setSelectedProduct(preset);
      setSelectedFabric(preset.fabrics[0] || "");
      setSelectedGsm(preset.gsms[0] || "");
      setSelectedSize(preset.sizes[0] || "");
      setSelectedColor(preset.colors[0] || null);
    }
  }, [activeProduct, isOpen]);

  // Synchronize product specs when selected product changes in step 1
  const handleProductChange = (productId: string) => {
    const preset = productsPreset.find((p) => p.id === productId) || productsPreset[0];
    setSelectedProductId(productId);
    setSelectedProduct(preset);
    setSelectedFabric(preset.fabrics[0] || "");
    setSelectedGsm(preset.gsms[0] || "");
    setSelectedSize(preset.sizes[0] || "");
    setSelectedColor(preset.colors[0] || null);
  };

  // Navigations
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // If we got in via contextual activeProduct (starts at step 2)
      // and they go back to step 1, that's fully allowed to let them change silhouettes!
      setCurrentStep(currentStep - 1);
    } else {
      closePanel();
    }
  };

  const handleReset = () => {
    setCurrentStep(activeProduct ? 2 : 1);
    setSuccess(false);
    setReferenceId("");
    setSubmitError("");
    setTechPack(null);
    setLogo(null);
    setDesign(null);
    setReferenceImage(null);
    setName("");
    setEmail("");
    setBrand("");
    setPhone("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("productId", selectedProduct.id);
      formData.append("productName", selectedProduct.name);
      formData.append("type", volume.includes("Sample") ? "sample" : "quotation");
      formData.append("fabric", selectedFabric);
      formData.append("gsm", selectedGsm);
      formData.append("size", selectedSize);
      formData.append("color", selectedColor?.name || "");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("brand", brand);
      formData.append("volume", volume);
      formData.append("phone", phone);
      formData.append("message", message || "Sourcing program request.");

      // Append files if they exist
      if (techPack) formData.append("techPack", techPack);
      if (logo) formData.append("logo", logo);
      if (design) formData.append("design", design);
      if (referenceImage) formData.append("referenceImage", referenceImage);

      const response = await fetch("/api/inquiries", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit RFQ brief");
      }

      setReferenceId(resData.referenceId);
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected sourcing operations error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepNames = [
    "SILHOUETTE",
    "QUANTITY",
    "SPECIFICATION",
    "UPLOADS",
    "COMPANY",
    "CONFIRM"
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* BACKGROUND OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closePanel}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
      />

      {/* SIDE PANEL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 240 }}
        className="fixed top-0 right-0 h-full w-full max-w-xl z-55 bg-neutral-950/95 border-l border-white/10 backdrop-blur-[20px] text-white flex flex-col shadow-2xl"
      >
        {/* PANEL HEADER & STEPS BAR */}
        <div className="px-8 pt-6 pb-4 border-b border-white/5 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <button
              onClick={closePanel}
              className="text-[10px] font-mono tracking-[4px] text-white/50 hover:text-white transition-colors uppercase flex items-center gap-2 group cursor-pointer w-fit"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit RFQ Wizard
            </button>
            {!success && (
              <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase">
                Step {currentStep} of 6 : {stepNames[currentStep - 1]}
              </span>
            )}
          </div>

          {/* Sourcing Progress Bars */}
          {!success && (
            <div className="grid grid-cols-6 gap-1.5 h-1 w-full">
              {stepNames.map((_, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep >= stepNum;
                return (
                  <div
                    key={idx}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive ? "bg-white" : "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* SCROLLABLE STEP FORM */}
        <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          {!success ? (
            <div className="flex flex-col h-full justify-between pb-20 sm:pb-0">
              {/* STEP 1: CHOOSE SILHOUETTE */}
              {currentStep === 1 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 01
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      What do you want to manufacture?
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Select your target custom apparel silhouette program to begin.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3 pt-2">
                    {productsPreset.map((p) => {
                      const isSel = selectedProductId === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleProductChange(p.id)}
                          className={`w-full text-left p-4 border rounded-sm transition-all duration-300 cursor-pointer flex justify-between items-center ${
                            isSel
                              ? "border-white bg-white/5"
                              : "border-white/10 hover:border-white/30 hover:bg-white/[0.01]"
                          }`}
                        >
                          <div>
                            <h4 className="text-sm font-semibold tracking-wider uppercase">
                              {p.name}
                            </h4>
                            <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
                              {p.id === "custom" ? "Custom Pattern Draft" : `${p.fabrics.length} Fabric presets`}
                            </span>
                          </div>
                          {isSel && (
                            <span className="text-xs font-mono text-white/80">
                              ✓ SELECT
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: EXPECTED QUANTITY */}
              {currentStep === 2 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 02
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      Expected Sourcing Volume
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Select your production capacity. High volume runs unlock discounted mill rates.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3 pt-4">
                    {[
                      { val: "Sample Spec (1 Pcs)", sub: "Technical sample program to verify fit/construction (MOQ 1)" },
                      { val: "300 - 1,000 Pcs", sub: "Small-to-medium label production launch (MOQ 300)" },
                      { val: "1,000 - 5,000 Pcs", sub: "Institutional brand replenishment & multi-color runs" },
                      { val: "5,000+ Pcs", sub: "Enterprise scale high-volume contract mill programs" }
                    ].map((opt) => {
                      const isSel = volume === opt.val;
                      return (
                        <button
                          key={opt.val}
                          onClick={() => setVolume(opt.val)}
                          className={`w-full text-left p-4 border rounded-sm transition-all duration-300 cursor-pointer ${
                            isSel
                              ? "border-white bg-white/5"
                              : "border-white/10 hover:border-white/30 hover:bg-white/[0.01]"
                          }`}
                        >
                          <h4 className="text-sm font-semibold tracking-wider uppercase">
                            {opt.val}
                          </h4>
                          <p className="text-[10px] text-white/40 font-light mt-1">
                            {opt.sub}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: FABRICS & SPECIFICATIONS */}
              {currentStep === 3 && (
                <div className="flex flex-col space-y-8">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 03
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      Technical Sourcing Specs
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Calibrate fabrics, weights, and primary sample sizes below.
                    </p>
                  </div>

                  {/* Fabrics */}
                  <div className="flex flex-col space-y-3">
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase">
                      Fabric Composition
                    </span>
                    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-1">
                      {selectedProduct.fabrics.map((fab) => {
                        const isSel = selectedFabric === fab;
                        return (
                          <button
                            key={fab}
                            type="button"
                            onClick={() => setSelectedFabric(fab)}
                            className={`text-left text-xs px-4 py-3 border rounded-sm transition-all duration-300 cursor-pointer whitespace-nowrap sm:whitespace-normal flex-shrink-0 sm:flex-shrink ${
                              isSel
                                ? "border-white bg-white/5 text-white"
                                : "border-white/10 text-white/50 hover:border-white/35 hover:text-white/80"
                            }`}
                          >
                            {fab}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* GSM & SIZES */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-3">
                      <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase">
                        GSM Weight
                      </span>
                      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-col sm:space-y-2">
                        {selectedProduct.gsms.map((gsm) => {
                          const isSel = selectedGsm === gsm;
                          return (
                            <button
                              key={gsm}
                              type="button"
                              onClick={() => setSelectedGsm(gsm)}
                              className={`text-center text-xs py-3 px-4 border rounded-sm transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 sm:flex-shrink ${
                                isSel
                                  ? "border-white bg-white/5 text-white"
                                  : "border-white/10 text-white/50 hover:border-white/35 hover:text-white/80"
                              }`}
                            >
                              {gsm}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase">
                        Base Size Spec
                      </span>
                      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
                        {selectedProduct.sizes.map((size) => {
                          const isSel = selectedSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`text-center text-xs font-mono py-2.5 px-4 border rounded-sm transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 sm:flex-shrink ${
                                isSel
                                  ? "border-white bg-white text-black font-semibold"
                                  : "border-white/10 text-white/50 hover:border-white/35 hover:text-white/80"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Color palette */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase">
                        Yarn Dye Palette
                      </span>
                      {selectedColor && (
                        <span className="text-[9px] font-mono tracking-[2px] text-white/60 uppercase">
                          {selectedColor.name}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      {selectedProduct.colors.map((color) => {
                        const isSel = selectedColor?.name === color.name;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`w-11 h-11 sm:w-9 sm:h-9 rounded-full relative flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${
                              isSel ? "ring-1 ring-white ring-offset-2 ring-offset-neutral-950" : ""
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {isSel && (
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    color.hex === "#FFFFFF" || color.hex === "#F3EFE9"
                                      ? "#000000"
                                      : "#FFFFFF",
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: UPLOADS */}
              {currentStep === 4 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 04
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      Technical Spec Uploads
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Upload your brand graphics and tech files (PDF, AI, PSD, PNG, JPG, ZIP).
                    </p>
                  </div>

                  <div className="flex flex-col space-y-4 pt-2">
                    {/* Tech Pack */}
                    <div className="flex flex-col space-y-1.5 border border-white/5 p-4 bg-white/[0.01] rounded-sm">
                      <span className="text-[9px] font-mono tracking-[2px] text-white/50 uppercase">
                        Tech Pack (Specs, Measurements)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip"
                        onChange={(e) => setTechPack(e.target.files?.[0] || null)}
                        className="text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:px-3 file:py-1.5 file:rounded-sm file:text-[10px] file:font-mono file:uppercase file:mr-4 file:hover:bg-white/20 file:cursor-pointer"
                      />
                      {techPack && (
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">
                          ✓ File selected: {techPack.name} ({(techPack.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    {/* Brand Logo */}
                    <div className="flex flex-col space-y-1.5 border border-white/5 p-4 bg-white/[0.01] rounded-sm">
                      <span className="text-[9px] font-mono tracking-[2px] text-white/50 uppercase">
                        Brand Logo Vector / Design
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip"
                        onChange={(e) => setLogo(e.target.files?.[0] || null)}
                        className="text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:px-3 file:py-1.5 file:rounded-sm file:text-[10px] file:font-mono file:uppercase file:mr-4 file:hover:bg-white/20 file:cursor-pointer"
                      />
                      {logo && (
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">
                          ✓ File selected: {logo.name} ({(logo.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    {/* Vector Design */}
                    <div className="flex flex-col space-y-1.5 border border-white/5 p-4 bg-white/[0.01] rounded-sm">
                      <span className="text-[9px] font-mono tracking-[2px] text-white/50 uppercase">
                        Graphic Vector Design Layout
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip"
                        onChange={(e) => setDesign(e.target.files?.[0] || null)}
                        className="text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:px-3 file:py-1.5 file:rounded-sm file:text-[10px] file:font-mono file:uppercase file:mr-4 file:hover:bg-white/20 file:cursor-pointer"
                      />
                      {design && (
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">
                          ✓ File selected: {design.name} ({(design.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    {/* Reference Image */}
                    <div className="flex flex-col space-y-1.5 border border-white/5 p-4 bg-white/[0.01] rounded-sm">
                      <span className="text-[9px] font-mono tracking-[2px] text-white/50 uppercase">
                        Reference Fit / Silhouette Image
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip"
                        onChange={(e) => setReferenceImage(e.target.files?.[0] || null)}
                        className="text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:px-3 file:py-1.5 file:rounded-sm file:text-[10px] file:font-mono file:uppercase file:mr-4 file:hover:bg-white/20 file:cursor-pointer"
                      />
                      {referenceImage && (
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">
                          ✓ File selected: {referenceImage.name} ({(referenceImage.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: COMPANY INFO */}
              {currentStep === 5 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 05
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      Corporate Sourcing Profile
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Provide your contact and company details to log the inquiry.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Jean Laurent"
                          className="border border-white/10 bg-transparent px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 font-light"
                        />
                      </div>

                      {/* Brand */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          required
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          placeholder="e.g. Laurent Maison"
                          className="border border-white/10 bg-transparent px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. sourcing@brand.com"
                          className="border border-white/10 bg-transparent px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 font-light"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                          Contact Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +49 170 1234567"
                          className="border border-white/10 bg-transparent px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 font-light"
                        />
                      </div>
                    </div>

                    {/* Scope */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                        Production Scope
                      </label>
                      <select
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="border border-white/10 bg-neutral-900 px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white cursor-pointer"
                      >
                        <option>Private Label Production</option>
                        <option>White Label Program</option>
                        <option>OEM Manufacturing</option>
                        <option>Custom Textile Dev</option>
                      </select>
                    </div>

                    {/* Technical Specs Comments */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono tracking-[2px] text-white/40 uppercase">
                        Additional Sourcing Notes
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Embellishment requirements, deadline, mill specifications, custom labeling..."
                        className="border border-white/10 bg-transparent px-4 py-3 text-xs tracking-wider focus:outline-none focus:border-white transition-colors rounded-sm text-white placeholder-white/20 resize-none font-light"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: CONFIRM & SUBMIT */}
              {currentStep === 6 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-[3px] text-white/40 uppercase block mb-1">
                      Step 06
                    </span>
                    <h3 className="text-2xl font-light uppercase tracking-wide font-serif">
                      Review Sourcing Spec
                    </h3>
                    <p className="text-xs text-white/40 font-light mt-1.5">
                      Confirm your technical specifications before commercial dispatch.
                    </p>
                  </div>

                  {/* Sourcing Summary Card */}
                  <div className="border border-white/10 bg-white/[0.02] p-5 rounded-sm space-y-3.5 font-mono text-[11px]">
                    <div className="flex justify-between border-b border-white/5 pb-2.5">
                      <span className="text-white/40 uppercase">SILHOUETTE</span>
                      <span className="text-white uppercase font-bold">{selectedProduct.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">EXPECTED QTY</span>
                      <span className="text-white font-bold">{volume}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">FABRIC</span>
                      <span className="text-white/80">{selectedFabric || "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">GSM WEIGHT</span>
                      <span className="text-white">{selectedGsm || "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">BASE SIZE SPEC</span>
                      <span className="text-white">{selectedSize || "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">YARN DYE COLOR</span>
                      <span className="text-white">{selectedColor?.name || "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between border-t border-white/5 pt-2.5">
                      <span className="text-white/40 uppercase">BRAND COMPANY</span>
                      <span className="text-white font-bold">{brand || "Not Specified"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase">CONTACT</span>
                      <span className="text-white">{name} ({email}){phone ? ` | ${phone}` : ""}</span>
                    </div>

                    {/* Uploads list */}
                    <div className="border-t border-white/5 pt-2.5 space-y-1">
                      <span className="text-white/40 uppercase block mb-1">UPLOADED FILES:</span>
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>Tech Pack:</span>
                        <span className="text-white font-light">{techPack ? techPack.name : "None"}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>Brand Logo:</span>
                        <span className="text-white font-light">{logo ? logo.name : "None"}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>Vector Design:</span>
                        <span className="text-white font-light">{design ? design.name : "None"}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50">
                        <span>Reference Image:</span>
                        <span className="text-white font-light">{referenceImage ? referenceImage.name : "None"}</span>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-xs font-mono tracking-wider">{submitError}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !name || !email || !brand}
                    className="w-full bg-white text-black font-semibold text-xs tracking-[3px] uppercase py-4 hover:bg-neutral-200 transition-colors duration-300 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? "DISPATCHING RFQ..." : "DISPATCH RFQ BRIEF"}
                  </button>
                </div>
              )}

              {/* NAV PANEL FOOTER */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8 sm:static sm:bg-transparent sm:p-0 sm:border-t-white/5 fixed bottom-0 left-0 right-0 bg-neutral-950 p-5 border-t border-white/10 z-40 sm:z-auto">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-[10px] font-mono tracking-[3px] text-white/50 hover:text-white uppercase transition-colors py-2 cursor-pointer"
                >
                  {currentStep === 1 ? "Cancel" : "← Back"}
                </button>
                
                {currentStep < 6 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (currentStep === 3 && (!selectedFabric || !selectedGsm || !selectedSize || !selectedColor)) ||
                      (currentStep === 5 && (!name || !email || !brand))
                    }
                    className="bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 px-6 py-2.5 text-[10px] font-mono tracking-[3px] uppercase transition-all rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continue →
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* SUCCESS STATE - CUSTOM B2B RECEIPT WITH SEQUENTIAL FB REFERENCE ID */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col space-y-8 py-10"
            >
              <div className="text-center">
                <span className="text-[10px] font-mono tracking-[5px] text-emerald-500 uppercase block mb-3">
                  ✓ Sourcing Brief Dispatched
                </span>
                <h3 className="text-2xl md:text-3.5xl font-light uppercase tracking-wide font-serif">
                  Brief Logged
                </h3>
                <p className="text-xs text-white/50 font-light mt-3 max-w-sm mx-auto leading-relaxed">
                  Your custom B2B specifications have been safely locked inside our procurement vault.
                </p>
              </div>

              {/* Receipt Visual Cards */}
              <div className="border border-white/10 bg-white/[0.02] p-6 rounded-sm space-y-4 font-mono text-[11px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-6xl font-black">
                  FB
                </div>
                
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/40 uppercase">Reference Number</span>
                  <span className="text-white font-bold text-sm tracking-wider">{referenceId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">Silhouette Model</span>
                  <span className="text-white uppercase font-bold">{selectedProduct.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">Target Volume</span>
                  <span className="text-white">{volume}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">Fabric Blend</span>
                  <span className="text-white/80">{selectedFabric}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">GSM Custom Weight</span>
                  <span className="text-white">{selectedGsm}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40 uppercase">Base Size Spec</span>
                  <span className="text-white">{selectedSize}</span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="text-white/40 uppercase">Procuring Entity</span>
                  <span className="text-white">{brand}</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-xs text-white/40 font-light leading-relaxed max-w-sm mx-auto">
                  Our sourcing team will contact you within 24 hours to coordinate pricing, mill schedules, and technical patterns.
                </p>
                <div className="p-3 border border-white/5 bg-white/[0.01] rounded-sm max-w-xs mx-auto text-[10px] font-mono text-white/50 tracking-wider">
                  REGISTRATION: ACTIVE SECURED CRM
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="w-full border border-white/20 text-white hover:border-white transition-colors py-3.5 text-xs font-semibold tracking-[3px] uppercase rounded-sm cursor-pointer"
                >
                  Configure New Spec
                </button>
                <button
                  onClick={closePanel}
                  className="w-full bg-white text-black font-semibold text-xs tracking-[3px] uppercase py-3.5 hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer"
                >
                  Close Configurator
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
