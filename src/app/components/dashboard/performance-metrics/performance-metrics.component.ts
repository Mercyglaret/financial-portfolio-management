import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Investment } from "../../../models/investment.interface";
import { CustomCurrencyPipe } from "../../../pipes/currency.pipe";
import { HighlightPerformanceDirective } from "../../../directives/highlight-performance.directive";

@Component({
  selector: "app-performance-metrics",
  standalone: true,
  imports: [
    CommonModule,
    CustomCurrencyPipe,
    HighlightPerformanceDirective,
    FormsModule,
  ],
  templateUrl: "./performance-metrics.component.html",
  styleUrl: "./performance-metrics.component.css",
})
export class PerformanceMetricsComponent {
  @Input() investments: Investment[] | null = null;

  // Pagination
  pageSize = 5;
  currentPage = 1;

  // Sorting
  sortColumn: keyof Investment | "" = "";
  sortDirection: "asc" | "desc" = "asc";

  // Handle page size change
  onPageSizeChange(newSize: number) {
    this.pageSize = Number(newSize);
    this.currentPage = 1;
  }

  get totalPages(): number {
    if (!this.investments) return 1;
    return Math.ceil(this.investments.length / this.pageSize) || 1;
  }

  get paginatedInvestments(): Investment[] {
    if (!this.investments) return [];
    let sorted = [...this.investments];
    if (this.sortColumn) {
      const column = this.sortColumn as keyof Investment;
      sorted.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return this.sortDirection === "asc" ? -1 : 1;
        if (bValue == null) return this.sortDirection === "asc" ? 1 : -1;
        if (typeof aValue === "number" && typeof bValue === "number") {
          return this.sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return this.sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    const start = (this.currentPage - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  sortBy(column: keyof Investment) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.currentPage = 1;
  }

  trackByInvestment(index: number, investment: Investment): string {
    return investment.id;
  }
}
