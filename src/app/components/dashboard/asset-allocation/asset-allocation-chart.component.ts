import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxEchartsModule } from "ngx-echarts";
import type { EChartsOption } from "echarts";
import { PortfolioSummary } from "../../../models/investment.interface";

@Component({
  standalone: true,
  selector: "app-asset-allocation-chart",
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: "./asset-allocation-chart.component.html",
  styleUrls: ["./asset-allocation-chart.component.css"], // ✅ fixed
})
export class AssetAllocationChartComponent {
  @Input() data: PortfolioSummary | null = null;

  get chartOptions(): EChartsOption {
    if (!this.data?.assetAllocation?.length) return {};

    const data = this.data.assetAllocation.map((item) => ({
      value: item.value,
      name: item.name,
      itemStyle: { color: item.color || "#3b82f6" },
    }));

    return {
      tooltip: { trigger: "item" },
      legend: { orient: "vertical", left: "left" },
      series: [
        {
          name: "Asset Allocation",
          type: "pie",
          radius: "50%",
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
