import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
import SubscribersCard from "./SubscribersCard";
import TariffCard from "./TariffCard";
import PhoneAccount from "./PhoneAccount";
import { useState, useEffect } from "react";
import axios from "axios";

interface TariffValue {
  currentTarifValue: TariffRemains[];
  tarifValues: Tariff[];
  money: number;
}

interface TariffRemains {
  name: string;
  value: number;
}

interface Tariff {
  name: string;
  value: number;
}

interface Phone {
  id: number;
  id_user: number;
  number: string;
  active: boolean;
  balance: number;
}

interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
}

interface UserResponse {
  user: User;
  phones: Phone[];
}

function PersonalAccount() {
  const [phoneNumbers, setPhoneNumbers] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [tariffData, setTariffData] = useState<Tariff[]>([]);
  const [tariffRemains, setTariffRemains] = useState<TariffRemains[]>([]);

  useEffect(() => {
    getfetchPhoneUser();
  }, []);

  const getfetchPhoneUser = async () => {
    const response = await axios.get<UserResponse>(
      "http://localhost:8080/users/1"
    );
    const phones = response.data.phones;
    setPhoneNumbers(phones);

    if (phones.length > 0) {
      const firstPhone = phones[0];
      setSelectedPhone(firstPhone);
      await fetchTariffData(firstPhone.id);
    }
  };

  const fetchTariffData = async (phoneId: number) => {
    const response = await axios.get<TariffValue>(
      `http://localhost:8080/userTarif/${phoneId}`
    );
    setTariffData(response.data.tarifValues);
    setTariffRemains(response.data.currentTarifValue);
  };

  const handlePhoneClick = async (phone: Phone) => {
    setSelectedPhone(phone);
    await fetchTariffData(phone.id);
  };

  return (
    <div className="wrapperMain m-0 max-w-screen-2xl">
      <div className="flex left-96">
        <PhoneAccount
          phoneNumbers={phoneNumbers}
          onPhoneClick={handlePhoneClick}
        />
      </div>
      <main className="main-content flex justify-center">
        {selectedPhone && <SubscribersCard phone={selectedPhone} />}
        <TariffCard
          tariffData={tariffData}
          tariffRemains={tariffRemains}
          money={selectedPhone?.balance || 0}
        />
      </main>
    </div>
  );
}

export default PersonalAccount;
