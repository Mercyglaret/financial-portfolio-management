import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { PortfolioService } from "../../../services/portfolio.service";
import { MarketTrendData } from "../../../models/investment.interface";
import type { EChartsOption } from "echarts";

// Register ECharts modules
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
]);

@Component({
  selector: "app-market-trends-chart",
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: "./market-trends-chart.component.html",
  styleUrls: ["./market-trends-chart.component.css"],
})
export class MarketTrendsChartComponent implements OnInit {
  chartData: { name: string; value: number }[] = [];
  chartOptions: EChartsOption = {};

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getMarketTrends().subscribe((trends) => {
      this.chartData = trends.map((trend) => ({
        name:
          trend.date instanceof Date
            ? trend.date.toISOString().split("T")[0] // YYYY-MM-DD
            : trend.date,
        value: trend.value,
      }));

      this.updateChartOptions();
    });
  }

  updateChartOptions(): void {
    this.chartOptions = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: this.chartData.map((d) => d.name),
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Financial Value",
          type: "line",
          data: this.chartData.map((d) => d.value),
          smooth: true, // similar to curveMonotoneX
          lineStyle: { color: "#3b82f6" },
          itemStyle: { color: "#3b82f6" },
        },
      ],
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    };
  }
}
