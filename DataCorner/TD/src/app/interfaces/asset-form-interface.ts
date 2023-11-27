export interface Asset {
    assetId: string;
    empId: number;
    empName: string;
    location: string;
    make: string;
    modelNo: string;
    issues: string;
    [key: string]: any;
    assetStatus: string;
  showStatusButton?: boolean;
  allocationAction?: string;
  }
  