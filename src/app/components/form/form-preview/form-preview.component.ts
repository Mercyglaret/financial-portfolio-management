import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvestmentFormData } from "../../../models/investment.interface";
import { CustomCurrencyPipe } from "../../../pipes/currency.pipe";

@Component({
  selector: "app-form-preview",
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe],
  templateUrl: "./form-preview.component.html",
  styleUrl: "./form-preview.component.css",
})
export class FormPreviewComponent {
  @Input() formData: InvestmentFormData | null = null;

  getTotalInvestment(): number {
    if (!this.formData) return 0;
    return this.formData.quantity * this.formData.purchasePrice;
  }
}
