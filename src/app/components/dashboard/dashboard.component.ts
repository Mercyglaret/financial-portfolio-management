import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { PortfolioService } from "../../services/portfolio.service";
import {
  Investment,
  PortfolioSummary,
} from "../../models/investment.interface";
import { CustomCurrencyPipe } from "../../pipes/currency.pipe";
import { HighlightPerformanceDirective } from "../../directives/highlight-performance.directive";
import { AssetAllocationChartComponent } from "./asset-allocation/asset-allocation-chart.component";
import { MarketTrendsChartComponent } from "./market-treands-chart/market-trends-chart.component";
import { PerformanceMetricsComponent } from "./performance-metrics/performance-metrics.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    CustomCurrencyPipe,
    HighlightPerformanceDirective,
    AssetAllocationChartComponent,
    MarketTrendsChartComponent,
    PerformanceMetricsComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  investments$: Observable<Investment[]>;
  portfolioSummary$: Observable<PortfolioSummary | null>;

  constructor(private portfolioService: PortfolioService) {
    this.investments$ = this.portfolioService.investments$;
    this.portfolioSummary$ = this.portfolioService.portfolioSummary$;
  }

  ngOnInit(): void {}
}
