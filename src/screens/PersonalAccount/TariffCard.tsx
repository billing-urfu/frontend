import { Button } from "@/components/ui/button.tsx";
import { useMemo, useState } from "react";
import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
import TarifValue from "@/components/userInfo/TarifValue";
import { ModelEditTarif } from "@/components/model/ModelEditTarif/ModelEditTarif";
import { TariffCardProps } from "./types";

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
            спишем 20 октября
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
            Подробнее
          </Button>

          <ModelEditTarif
            valueInternet={internetValue}
            valueMinutes={minutesValue}
            valueSms={smsValue}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            idPhone={idPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
