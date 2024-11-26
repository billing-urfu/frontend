// ModelEditTarif

export interface ModelEdit {
  valueInternet: number;
  valueMinutes: number;
  valueSms: number;
  isOpen: boolean;
  idPhone: number;
  onClose: () => void;
}

export interface ValueOptions {
  valueInt: number;
  valueMin: number;
  valueSms: number;
}

// ModelReplenishment

export interface ModelRep {
  isOpen: boolean;
  onClose: any;
  phone: Phone;
}

export interface Phone {
  id: number;
  id_user: number;
  number: string;
}

export interface FormReplenishment {
  money: number;
  source: string;
  id_phone: number;
}
