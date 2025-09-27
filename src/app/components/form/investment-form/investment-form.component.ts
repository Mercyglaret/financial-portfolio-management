import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { PortfolioService } from "../../../services/portfolio.service";
import {
  AssetType,
  InvestmentFormData,
} from "../../../models/investment.interface";
import { FormPreviewComponent } from "../form-preview/form-preview.component";

@Component({
  selector: "app-investment-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormPreviewComponent],
  templateUrl: "./investment-form.component.html",
  styleUrl: "./investment-form.component.css",
})
export class InvestmentFormComponent implements OnInit {
  investmentForm!: FormGroup;
  assetTypes = Object.values(AssetType);
  isSubmitting = false;
  showSuccessMessage = false;
  maxDate = new Date().toISOString().split("T")[0];

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.investmentForm = this.fb.group({
      assetType: ["", [Validators.required]],
      symbol: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      name: ["", [Validators.required, Validators.minLength(2)]],
      quantity: [
        null,
        [
          Validators.required,
          Validators.min(0.0001),
          this.positiveNumberValidator,
        ],
      ],
      purchasePrice: [
        null,
        [
          Validators.required,
          Validators.min(0.01),
          this.positiveNumberValidator,
        ],
      ],
      purchaseDate: ["", [Validators.required, this.dateValidator]],
    });
  }

  private positiveNumberValidator(control: AbstractControl) {
    const value = control.value;
    if (value !== null && (isNaN(value) || value <= 0)) {
      return { positiveNumber: true };
    }
    return null;
  }

  private dateValidator(control: AbstractControl) {
    const value = control.value;
    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      if (selectedDate > today) {
        return { futureDate: true };
      }
    }
    return null;
  }

  onSubmit(): void {
    console.log("click");
    if (this.investmentForm.valid) {
      this.isSubmitting = true;

      const formData: InvestmentFormData = {
        ...this.investmentForm.value,
        purchaseDate: new Date(this.investmentForm.value.purchaseDate),
      };

      this.portfolioService.addInvestment(formData).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          this.resetForm();
          setTimeout(() => (this.showSuccessMessage = false), 3000);
        },
        error: (error) => {
          console.error("Error adding investment:", error);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.investmentForm.markAllAsTouched(); // Mark all fields as touched to display validation errors
    }
  }

  resetForm(): void {
    this.investmentForm.reset();
    this.initializeForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.investmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.investmentForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors["required"])
        return `${this.getFieldLabel(fieldName)} is required`;
      if (field.errors["minlength"])
        return `${this.getFieldLabel(fieldName)} is too short`;
      if (field.errors["maxlength"])
        return `${this.getFieldLabel(fieldName)} is too long`;
      if (field.errors["min"])
        return `${this.getFieldLabel(fieldName)} must be greater than 0`;
      if (field.errors["positiveNumber"])
        return `${this.getFieldLabel(fieldName)} must be a positive number`;
      if (field.errors["futureDate"])
        return "Purchase date cannot be in the future";
    }
    return "";
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      assetType: "Asset Type",
      symbol: "Symbol",
      name: "Asset Name",
      quantity: "Quantity",
      purchasePrice: "Purchase Price",
      purchaseDate: "Purchase Date",
    };
    return labels[fieldName] || fieldName;
  }

  getPreviewData(): InvestmentFormData | null {
    if (this.investmentForm.valid) {
      return {
        ...this.investmentForm.value,
        purchaseDate: new Date(this.investmentForm.value.purchaseDate),
      };
    }
    return null;
  }
}
