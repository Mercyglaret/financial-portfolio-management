import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  Investment,
  InvestmentFormData,
  PortfolioSummary,
  AssetType,
  MarketTrendData,
} from "../models/investment.interface";

@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  private investmentsSubject = new BehaviorSubject<Investment[]>([]);
  public investments$ = this.investmentsSubject.asObservable();

  private portfolioSummarySubject =
    new BehaviorSubject<PortfolioSummary | null>(null);
  public portfolioSummary$ = this.portfolioSummarySubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Investment[]>("/api/investments").subscribe((investments) => {
      this.investmentsSubject.next(investments);
      this.updatePortfolioSummary(investments);
    });
  }

  addInvestment(formData: InvestmentFormData): Observable<Investment> {
    const investment: Investment = {
      id: this.generateId(),
      ...formData,
      currentPrice: formData.purchasePrice * (0.95 + Math.random() * 0.3), // Simulate market fluctuation
      totalValue: 0,
      gainLoss: 0,
      gainLossPercentage: 0,
    };

    this.calculateInvestmentMetrics(investment);

    return this.http.post<Investment>("/api/investments", investment).pipe(
      tap((newInvestment) => {
        const current = this.investmentsSubject.value;
        const updated = [...current, newInvestment];
        this.investmentsSubject.next(updated);
        this.updatePortfolioSummary(updated);
      })
    );
  }

  deleteInvestment(id: string): Observable<void> {
    return this.http.delete<void>(`/api/investments/${id}`).pipe(
      tap(() => {
        const current = this.investmentsSubject.value;
        const updated = current.filter((inv) => inv.id !== id);
        this.investmentsSubject.next(updated);
        this.updatePortfolioSummary(updated);
      })
    );
  }

  getMarketTrends(): Observable<MarketTrendData[]> {
    return this.http.get<MarketTrendData[]>("/api/market-trends");
  }

  private calculateInvestmentMetrics(investment: Investment): void {
    investment.totalValue = investment.quantity * investment.currentPrice;
    const totalCost = investment.quantity * investment.purchasePrice;
    investment.gainLoss = investment.totalValue - totalCost;
    investment.gainLossPercentage = (investment.gainLoss / totalCost) * 100;
  }

  private updatePortfolioSummary(investments: Investment[]): void {
    const totalValue = investments.reduce(
      (sum, inv) => sum + inv.totalValue,
      0
    );
    const totalInvested = investments.reduce(
      (sum, inv) => sum + inv.quantity * inv.purchasePrice,
      0
    );
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercentage =
      totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    const assetAllocation = this.calculateAssetAllocation(
      investments,
      totalValue
    );

    const summary: PortfolioSummary = {
      totalValue,
      totalGainLoss,
      totalGainLossPercentage,
      totalInvested,
      assetAllocation,
    };

    this.portfolioSummarySubject.next(summary);
  }

  private calculateAssetAllocation(
    investments: Investment[],
    totalValue: number
  ) {
    const allocation = new Map<AssetType, number>();

    investments.forEach((inv) => {
      const current = allocation.get(inv.assetType) || 0;
      allocation.set(inv.assetType, current + inv.totalValue);
    });

    const colors = [
      "#3b82f6",
      "#8b5cf6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#06b6d4",
    ];
    let colorIndex = 0;

    return Array.from(allocation.entries()).map(([assetType, value]) => ({
      name: assetType,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
      color: colors[colorIndex++ % colors.length],
    }));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
