import SubscribersCard from "./SubscribersCard";
import TariffCard from "./TariffCard";
import PhoneAccount from "./PhoneAccount";
import { useState, useEffect } from "react";
import api from "@/api/api";
import {
  Phone,
  Tariff,
  TariffRemains,
  UserResponse,
  TariffValue,
  DecodedToken,
} from "./types";
import { jwtDecode } from "jwt-decode";

function PersonalAccount() {
  const [phoneNumbers, setPhoneNumbers] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [tariffData, setTariffData] = useState<Tariff[]>([]);
  const [tariffRemains, setTariffRemains] = useState<TariffRemains[]>([]);
  const [tariffPrise, setTariffPrise] = useState<number>();

  const token: any = localStorage.getItem("accessToken");
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

  useEffect(() => {
    getfetchPhoneUser();
  }, []);

  const getfetchPhoneUser = async () => {
    const response = await api.get<UserResponse>(`/users/${decoded.id}`);
    let phones = response.data.phones;
    phones.sort((a, b) => a.id - b.id);
    setPhoneNumbers(phones);

    if (phones.length > 0) {
      const firstPhone = phones[0];
      setSelectedPhone(firstPhone);
      fetchTariffData(firstPhone.id);
    }
  };

  const fetchTariffData = async (phoneId: number) => {
    try {
      const response = await api.get<TariffValue>(`/userTarif/${phoneId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTariffData(response.data.tarifValues);
      setTariffRemains(response.data.currentTarifValue);
      setTariffPrise(response.data.money);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  const handlePhoneClick = async (phone: Phone) => {
    setSelectedPhone(phone);
    await fetchTariffData(phone.id);
  };

  return (
    <div className="mt-10 p-4 space-y-6">
      <PhoneAccount
        phoneNumbers={phoneNumbers}
        onPhoneClick={handlePhoneClick}
      />
      <main className="flex flex-wrap justify-center space-y-6 md:space-y-0 md:space-x-6">
        {selectedPhone && <SubscribersCard phone={selectedPhone} />}
        <TariffCard
          tariffPrise={tariffPrise}
          tariffData={tariffData}
          tariffRemains={tariffRemains}
          money={selectedPhone?.balance || 0}
          idPhone={selectedPhone?.id || 0}
        />
      </main>
    </div>
  );
}

export default PersonalAccount;
