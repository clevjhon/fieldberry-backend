export const BOM_ROOTS = {
  "SRT-Legal": { id: "BOM-SRT-LEGAL-001", root: "SRT Legal", items: ["Case File", "Compliance Docs", "Contracts"] },
  "SRT-Diner": { id: "BOM-SRT-DINER-001", root: "SRT Diner", items: ["Kitchen Setup", "Menu Items", "POS System"] },
  "SRT-Trading": { id: "BOM-SRT-TRADING-001", root: "Supersonic Rating Trading", items: ["Rating Engine", "Trading Bot", "Ledger"] }
};

export function getBomRoot(name) {
  return BOM_ROOTS[name] || null;
}
