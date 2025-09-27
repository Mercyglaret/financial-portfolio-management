export interface Investment {
  id: string;
  assetType: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface InvestmentFormData {
  assetType: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
}

export interface PortfolioSummary {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  totalInvested: number;
  assetAllocation: AssetAllocationData[];
}

export interface AssetAllocationData {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

export interface MarketTrendData {
  date: Date;
  value: number;
}

export interface PerformanceMetric {
  label: string;
  value: string | number;
  change?: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

export enum AssetType {
  STOCK = 'Stock',
  BOND = 'Bond',
  ETF = 'ETF',
  CRYPTO = 'Cryptocurrency',
  REAL_ESTATE = 'Real Estate',
  COMMODITY = 'Commodity'
}