import { Button } from "@/components/ui/button.tsx";
import { useEffect, useMemo, useState } from "react";
import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
import TarifValue from "@/components/userInfo/TarifValue";
import { ModelEditTarif } from "@/components/model/ModelEditTarif/ModelEditTarif";
import { TariffCardProps } from "./types";
import axios from "axios";

const TariffCard: React.FC<TariffCardProps> = ({
  tariffRemains,
  tariffData,
  tariffPrise,
  idPhone,
}) => {
  const internetValue = useMemo(
    () => tariffData.find((item) => item.name === "Интернет")?.value || 0,
    [tariffData]
  );
  const minutesValue = useMemo(
    () => tariffData.find((item) => item.name === "Минуты")?.value || 0,
    [tariffData]
  );
  const smsValue = useMemo(
    () => tariffData.find((item) => item.name === "Смс")?.value || 0,
    [tariffData]
  );

  const internetRemains = useMemo(
    () => tariffRemains.find((item) => item.name === "Интернет")?.value || 0,
    [tariffRemains]
  );
  const minutesRemains = useMemo(
    () => tariffRemains.find((item) => item.name === "Минуты")?.value || 0,
    [tariffRemains]
  );
  const smsRemains = useMemo(
    () => tariffRemains.find((item) => item.name === "Смс")?.value || 0,
    [tariffRemains]
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paymentDate, setPaymentDate] = useState<string>("");

  // Fetch the latest payment date
  useEffect(() => {
    const fetchLatestPaymentDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/outcome/${idPhone}`
        );
        const data = response.data;

        // Extract the latest record
        const latestRecord = data.reduce((latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        );

        // Format the date
        const dateObject = new Date(latestRecord.date);
        dateObject.setMonth(dateObject.getMonth() + 1);
        const day = dateObject.getDate();
        const month = new Intl.DateTimeFormat("ru-RU", {
          month: "long",
        }).format(dateObject);

        setPaymentDate(`${day} ${month}`);
      } catch (error) {
        console.error("Ошибка при получении данных оплаты:", error);
      }
    };

    fetchLatestPaymentDate();
  }, [idPhone]);

  return (
    <div className="tariff mr-24 relative flex justify-between">
      <div className="tarif-price">
        <h3 className="tariff-name text-2xl pt-12 pl-8 text-black">
          Ваш тариф
        </h3>
        <div>
          <p className="tariff-price absolute text-2xl bottom-10 pl-8 pb-12">
            {tariffPrise} ₽/месяц
          </p>
          <p className="tariff-price absolute bottom-5 pl-8 pb-12">
            спишем {paymentDate}
          </p>
        </div>
      </div>
      <div className="tariff-details flex flex-col w-7/12 h-3/5 mr-8">
        <div className="info-user mt-">
          <TarifValue
            value={internetValue}
            valueRemain={internetRemains}
            img={"/image/internet.svg"}
            nameValue={"ГБ"}
          />
          <TarifValue
            value={minutesValue}
            valueRemain={minutesRemains}
            img={"/image/phone.svg"}
            nameValue={"мин"}
          />
          <TarifValue
            value={smsValue}
            valueRemain={smsRemains}
            img={"/image/sms.svg"}
            nameValue={"SMS"}
          />
        </div>
        <div className="mt-32">
          <Button
            className="bt_more_css"
            variant="destructive"
            size="bt_more"
            onClick={() => setIsOpen(true)}
          >
            Настроить
          </Button>

          <ModelEditTarif
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            idPhone={idPhone}
            valueInternet={internetValue}
            valueMinutes={minutesValue}
            valueSms={smsValue}
          />
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
