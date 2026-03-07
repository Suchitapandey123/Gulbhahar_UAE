export interface SizeChartResponse {
  success: boolean;
  data?: SizeChartData;
}

export interface SizeChartData {
  _id?: string;
  chartId?: string;
  parentCategory: string;
  isActive?: boolean;
  priority?: number;
  displaySettings?: {
    showMeasurementTab: boolean;
    showFitTipsTab: boolean;
    showChartTab: boolean;
  };
  sizes: Array<Record<string, string>>;
  measurementSteps?: Array<{
    number: string;
    title: string;
    description: string;
    image?: string;
  }>;
  fitTips?: Array<{
    title: string;
    points: string[];
  }>;
  createdAt?: string;
  updatedAt?: string;
  // Legacy support if needed, though 'sizes' covers it
  charts?: any[];
}
