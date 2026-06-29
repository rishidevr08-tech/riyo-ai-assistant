"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductData {
  id: string;
  name: string;
  sub?: string;
  fabrics: string[];
  gsms: string[];
  sizes: string[];
  colors: ProductColor[];
}

export interface InquiryContextType {
  isOpen: boolean;
  activeProduct: ProductData | null;
  initialType: "sample" | "quotation";
  openPanel: (product: ProductData, type?: "sample" | "quotation") => void;
  closePanel: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null);
  const [initialType, setInitialType] = useState<"sample" | "quotation">("sample");

  const openPanel = (product: ProductData, type: "sample" | "quotation" = "sample") => {
    setActiveProduct(product);
    setInitialType(type);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <InquiryContext.Provider
      value={{
        isOpen,
        activeProduct,
        initialType,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
