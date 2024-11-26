export interface Tariff {
  name: string;
  value: number;
}

export interface TariffRemains {
  name: string;
  value: number;
}

export interface TariffCardProps {
  tariffRemains: TariffRemains[];
  tariffData: Tariff[];
  money: number;
  tariffPrise: number | undefined;
  idPhone: number;
}

export interface Phone {
  id: number;
  id_user: number;
  number: string;
  active: boolean;
  balance: number;
}

export interface SubscribersCardProps {
  phone: Phone;
}

export interface PhoneAccountProps {
  phoneNumbers: Phone[];
  onPhoneClick: (phone: Phone) => void;
}

export interface TariffValue {
  currentTarifValue: TariffRemains[];
  tarifValues: Tariff[];
  money: number;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
}

export interface UserResponse {
  user: User;
  phones: Phone[];
}

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}
