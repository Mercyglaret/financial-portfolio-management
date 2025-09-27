import { HttpInterceptorFn } from "@angular/common/http";
import { of, delay } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import {
  Investment,
  AssetType,
  MarketTrendData,
} from "../models/investment.interface";

let investments: Investment[] = [
  {
    id: "1",
    assetType: AssetType.STOCK,
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 10,
    purchasePrice: 150,
    currentPrice: 175,
    purchaseDate: new Date("2023-06-15"),
    totalValue: 1750,
    gainLoss: 250,
    gainLossPercentage: 16.67,
  },
  {
    id: "2",
    assetType: AssetType.ETF,
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    quantity: 5,
    purchasePrice: 400,
    currentPrice: 420,
    purchaseDate: new Date("2023-05-20"),
    totalValue: 2100,
    gainLoss: 100,
    gainLossPercentage: 5.0,
  },
  {
    id: "3",
    assetType: AssetType.CRYPTO,
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 0.5,
    purchasePrice: 45000,
    currentPrice: 42000,
    purchaseDate: new Date("2023-04-10"),
    totalValue: 21000,
    gainLoss: -1500,
    gainLossPercentage: -6.67,
  },
  // 30 more mock investments
  {
    id: "4",
    assetType: AssetType.STOCK,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: 8,
    purchasePrice: 280,
    currentPrice: 330,
    purchaseDate: new Date("2023-03-12"),
    totalValue: 2640,
    gainLoss: 400,
    gainLossPercentage: 17.86,
  },
  {
    id: "5",
    assetType: AssetType.BOND,
    symbol: "US10Y",
    name: "US Treasury 10Y",
    quantity: 20,
    purchasePrice: 98,
    currentPrice: 100,
    purchaseDate: new Date("2023-01-10"),
    totalValue: 2000,
    gainLoss: 40,
    gainLossPercentage: 2.04,
  },
  {
    id: "6",
    assetType: AssetType.ETF,
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    quantity: 7,
    purchasePrice: 350,
    currentPrice: 370,
    purchaseDate: new Date("2023-02-18"),
    totalValue: 2590,
    gainLoss: 140,
    gainLossPercentage: 5.71,
  },
  {
    id: "7",
    assetType: AssetType.STOCK,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 4,
    purchasePrice: 120,
    currentPrice: 135,
    purchaseDate: new Date("2023-04-01"),
    totalValue: 540,
    gainLoss: 60,
    gainLossPercentage: 12.5,
  },
  {
    id: "8",
    assetType: AssetType.CRYPTO,
    symbol: "ETH",
    name: "Ethereum",
    quantity: 2,
    purchasePrice: 2000,
    currentPrice: 1800,
    purchaseDate: new Date("2023-03-20"),
    totalValue: 3600,
    gainLoss: -400,
    gainLossPercentage: -10.0,
  },
  {
    id: "9",
    assetType: AssetType.STOCK,
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 3,
    purchasePrice: 700,
    currentPrice: 800,
    purchaseDate: new Date("2023-02-10"),
    totalValue: 2400,
    gainLoss: 300,
    gainLossPercentage: 14.29,
  },
  {
    id: "10",
    assetType: AssetType.ETF,
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    quantity: 6,
    purchasePrice: 210,
    currentPrice: 220,
    purchaseDate: new Date("2023-01-25"),
    totalValue: 1320,
    gainLoss: 60,
    gainLossPercentage: 4.76,
  },
  {
    id: "11",
    assetType: AssetType.BOND,
    symbol: "CORPBOND",
    name: "Corporate Bond",
    quantity: 15,
    purchasePrice: 102,
    currentPrice: 101,
    purchaseDate: new Date("2023-03-05"),
    totalValue: 1515,
    gainLoss: -15,
    gainLossPercentage: -0.98,
  },
  {
    id: "12",
    assetType: AssetType.STOCK,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 2,
    purchasePrice: 3200,
    currentPrice: 3400,
    purchaseDate: new Date("2023-02-28"),
    totalValue: 6800,
    gainLoss: 400,
    gainLossPercentage: 6.25,
  },
  {
    id: "13",
    assetType: AssetType.CRYPTO,
    symbol: "DOGE",
    name: "Dogecoin",
    quantity: 1000,
    purchasePrice: 0.07,
    currentPrice: 0.06,
    purchaseDate: new Date("2023-01-15"),
    totalValue: 60,
    gainLoss: -10,
    gainLossPercentage: -14.29,
  },
  {
    id: "14",
    assetType: AssetType.STOCK,
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    quantity: 5,
    purchasePrice: 200,
    currentPrice: 450,
    purchaseDate: new Date("2023-03-18"),
    totalValue: 2250,
    gainLoss: 1250,
    gainLossPercentage: 125.0,
  },
  {
    id: "15",
    assetType: AssetType.ETF,
    symbol: "IVV",
    name: "iShares Core S&P 500 ETF",
    quantity: 4,
    purchasePrice: 400,
    currentPrice: 410,
    purchaseDate: new Date("2023-04-12"),
    totalValue: 1640,
    gainLoss: 40,
    gainLossPercentage: 2.5,
  },
  {
    id: "16",
    assetType: AssetType.BOND,
    symbol: "MUNIBOND",
    name: "Municipal Bond",
    quantity: 10,
    purchasePrice: 105,
    currentPrice: 104,
    purchaseDate: new Date("2023-02-14"),
    totalValue: 1040,
    gainLoss: -10,
    gainLossPercentage: -0.95,
  },
  {
    id: "17",
    assetType: AssetType.STOCK,
    symbol: "META",
    name: "Meta Platforms Inc.",
    quantity: 6,
    purchasePrice: 250,
    currentPrice: 300,
    purchaseDate: new Date("2023-01-30"),
    totalValue: 1800,
    gainLoss: 300,
    gainLossPercentage: 20.0,
  },
  {
    id: "18",
    assetType: AssetType.CRYPTO,
    symbol: "SOL",
    name: "Solana",
    quantity: 10,
    purchasePrice: 30,
    currentPrice: 25,
    purchaseDate: new Date("2023-03-10"),
    totalValue: 250,
    gainLoss: -50,
    gainLossPercentage: -16.67,
  },
  {
    id: "19",
    assetType: AssetType.STOCK,
    symbol: "NFLX",
    name: "Netflix Inc.",
    quantity: 3,
    purchasePrice: 500,
    currentPrice: 480,
    purchaseDate: new Date("2023-04-05"),
    totalValue: 1440,
    gainLoss: -60,
    gainLossPercentage: -4.0,
  },
  {
    id: "20",
    assetType: AssetType.ETF,
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    quantity: 5,
    purchasePrice: 380,
    currentPrice: 400,
    purchaseDate: new Date("2023-03-25"),
    totalValue: 2000,
    gainLoss: 100,
    gainLossPercentage: 5.26,
  },
  {
    id: "21",
    assetType: AssetType.BOND,
    symbol: "INTLBOND",
    name: "International Bond",
    quantity: 12,
    purchasePrice: 99,
    currentPrice: 98,
    purchaseDate: new Date("2023-01-18"),
    totalValue: 1176,
    gainLoss: -12,
    gainLossPercentage: -1.01,
  },
  {
    id: "22",
    assetType: AssetType.STOCK,
    symbol: "BABA",
    name: "Alibaba Group",
    quantity: 8,
    purchasePrice: 90,
    currentPrice: 85,
    purchaseDate: new Date("2023-02-22"),
    totalValue: 680,
    gainLoss: -40,
    gainLossPercentage: -5.56,
  },
  {
    id: "23",
    assetType: AssetType.CRYPTO,
    symbol: "ADA",
    name: "Cardano",
    quantity: 500,
    purchasePrice: 1.2,
    currentPrice: 1.1,
    purchaseDate: new Date("2023-03-15"),
    totalValue: 550,
    gainLoss: -50,
    gainLossPercentage: -8.33,
  },
  {
    id: "24",
    assetType: AssetType.STOCK,
    symbol: "ORCL",
    name: "Oracle Corp.",
    quantity: 7,
    purchasePrice: 80,
    currentPrice: 90,
    purchaseDate: new Date("2023-04-08"),
    totalValue: 630,
    gainLoss: 70,
    gainLossPercentage: 12.5,
  },
  {
    id: "25",
    assetType: AssetType.ETF,
    symbol: "XLF",
    name: "Financial Select Sector SPDR Fund",
    quantity: 10,
    purchasePrice: 35,
    currentPrice: 38,
    purchaseDate: new Date("2023-02-05"),
    totalValue: 380,
    gainLoss: 30,
    gainLossPercentage: 8.57,
  },
  {
    id: "26",
    assetType: AssetType.BOND,
    symbol: "GOVTBOND",
    name: "Government Bond",
    quantity: 18,
    purchasePrice: 100,
    currentPrice: 99,
    purchaseDate: new Date("2023-01-12"),
    totalValue: 1782,
    gainLoss: -18,
    gainLossPercentage: -1.0,
  },
  {
    id: "27",
    assetType: AssetType.STOCK,
    symbol: "INTC",
    name: "Intel Corp.",
    quantity: 9,
    purchasePrice: 50,
    currentPrice: 55,
    purchaseDate: new Date("2023-03-02"),
    totalValue: 495,
    gainLoss: 45,
    gainLossPercentage: 10.0,
  },
  {
    id: "28",
    assetType: AssetType.CRYPTO,
    symbol: "XRP",
    name: "Ripple",
    quantity: 800,
    purchasePrice: 0.5,
    currentPrice: 0.6,
    purchaseDate: new Date("2023-02-20"),
    totalValue: 480,
    gainLoss: 80,
    gainLossPercentage: 20.0,
  },
  {
    id: "29",
    assetType: AssetType.STOCK,
    symbol: "CSCO",
    name: "Cisco Systems",
    quantity: 11,
    purchasePrice: 45,
    currentPrice: 48,
    purchaseDate: new Date("2023-01-28"),
    totalValue: 528,
    gainLoss: 33,
    gainLossPercentage: 6.67,
  },
  {
    id: "30",
    assetType: AssetType.ETF,
    symbol: "XLK",
    name: "Technology Select Sector SPDR Fund",
    quantity: 6,
    purchasePrice: 150,
    currentPrice: 155,
    purchaseDate: new Date("2023-03-22"),
    totalValue: 930,
    gainLoss: 30,
    gainLossPercentage: 3.33,
  },
  {
    id: "31",
    assetType: AssetType.BOND,
    symbol: "EMBOND",
    name: "Emerging Market Bond",
    quantity: 13,
    purchasePrice: 97,
    currentPrice: 96,
    purchaseDate: new Date("2023-02-08"),
    totalValue: 1248,
    gainLoss: -13,
    gainLossPercentage: -1.03,
  },
  {
    id: "32",
    assetType: AssetType.STOCK,
    symbol: "ADBE",
    name: "Adobe Inc.",
    quantity: 4,
    purchasePrice: 500,
    currentPrice: 520,
    purchaseDate: new Date("2023-04-15"),
    totalValue: 2080,
    gainLoss: 80,
    gainLossPercentage: 4.0,
  },
  {
    id: "33",
    assetType: AssetType.CRYPTO,
    symbol: "LTC",
    name: "Litecoin",
    quantity: 15,
    purchasePrice: 100,
    currentPrice: 95,
    purchaseDate: new Date("2023-03-28"),
    totalValue: 1425,
    gainLoss: -75,
    gainLossPercentage: -5.0,
  },
];

function generateMarketTrends(): MarketTrendData[] {
  const trends: MarketTrendData[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const baseValue = 100000;
    const randomVariation = (Math.random() - 0.5) * 5000;
    const trendValue = (baseValue + i * 100 + randomVariation).toFixed(2);

    trends.push({
      date,
      value: Math.max(parseInt(trendValue), 80000),
    });
  }

  return trends;
}

export const mockDataInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method } = req;

  // Mock API endpoints
  if (url === "/api/investments" && method === "GET") {
    return of(new HttpResponse({ status: 200, body: investments })).pipe(
      delay(500)
    );
  }

  if (url === "/api/investments" && method === "POST") {
    let newInvestment = req.body as Investment;
    // Assign a unique id if not present
    if (!newInvestment.id) {
      newInvestment = {
        ...newInvestment,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      };
    }
    // Prevent duplicate add: only push if id does not exist
    if (!investments.some((inv) => inv.id === newInvestment.id)) {
      investments.push(newInvestment);
    }
    return of(new HttpResponse({ status: 201, body: newInvestment })).pipe(
      delay(300)
    );
  }

  if (url.startsWith("/api/investments/") && method === "DELETE") {
    const id = url.split("/").pop();
    investments = investments.filter((inv) => inv.id !== id);
    return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
  }

  if (url === "/api/market-trends" && method === "GET") {
    const trends = generateMarketTrends();
    return of(new HttpResponse({ status: 200, body: trends })).pipe(delay(400));
  }

  return next(req);
};
