// Type definitions for the application

export interface Frame {
  _id: string;
  _createdAt: string;
  name: string;
  photo: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  category: 'men' | 'women' | 'kids' | 'unisex';
  description?: string;
  inStock: boolean;
  material?: 'Metal' | 'Plastic' | 'Acetate' | 'Titanium' | 'Mixed';
}

export interface PrescriptionDetails {
  rightEye?: string;
  leftEye?: string;
  pd?: string;
  add?: string;
}

export interface CreditHistoryEntry {
  date: string;
  amount: number;
  description: string;
  type: 'charge' | 'payment';
}

export interface Client {
  _id: string;
  _createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  appointmentDate: string;
  status: 'New Request' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  interestedFrame?: {
    _ref: string;
    _type: 'reference';
  };
  creditBalance: number;
  creditHistory?: CreditHistoryEntry[];
  notes?: string;
  prescriptionDetails?: PrescriptionDetails;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  date: string;
  notes?: string;
}

export interface AdminStats {
  total: number;
  newRequests: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  totalCreditsOwed: number;
  upcomingToday: number;
}

export type AppointmentStatus = Client['status'];
export type FrameCategory = Frame['category'];
export type FrameMaterial = NonNullable<Frame['material']>;
