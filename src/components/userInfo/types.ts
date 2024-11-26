// TarifPrice

export interface Coefficient {
  min: number;
  max: number;
  coefficient: number;
}

export interface TarifCoefficients {
  internetList: Coefficient[];
  minuteList: Coefficient[];
  smsList: Coefficient;
}

export interface TariffCardProps {
  internetValue: number;
  minutesValue: number;
  smsValue: number;
  onTotalCostChange: any;
}

// TarifValue

export interface Tariff {
  value: number;
  valueRemain: number;
  img: string;
  nameValue: string;
}
