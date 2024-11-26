import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
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
import axios from "axios";
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
    const response = await api.get<UserResponse>(
      `http://localhost:8080/users/${decoded.id}`
    );
    let phones = response.data.phones;
    phones.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log(phones);
    setPhoneNumbers(phones);

    if (phones.length > 0) {
      const firstPhone = phones[0];
      setSelectedPhone(firstPhone);
      fetchTariffData(firstPhone.id);
    }
  };

  const fetchTariffData = async (phoneId: number) => {
    const response = await axios.get<TariffValue>(
      `http://localhost:8080/userTarif/${phoneId}`
    );
    setTariffData(response.data.tarifValues);
    setTariffRemains(response.data.currentTarifValue);
    setTariffPrise(response.data.money);
  };

  const handlePhoneClick = async (phone: Phone) => {
    setSelectedPhone(phone);
    await fetchTariffData(phone.id);
  };

  return (
    <div className="wrapperMain mt-10">
      <div>
        <PhoneAccount
          phoneNumbers={phoneNumbers}
          onPhoneClick={handlePhoneClick}
        />
      </div>
      <main className="flex justify-center">
        <div className="flex justify-center">
          {selectedPhone && <SubscribersCard phone={selectedPhone} />}
          <TariffCard
            tariffPrise={tariffPrise}
            tariffData={tariffData}
            tariffRemains={tariffRemains}
            money={selectedPhone?.balance || 0}
            idPhone={selectedPhone?.id || 0}
          />
        </div>
      </main>
    </div>
  );
}

export default PersonalAccount;
