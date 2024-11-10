import { Button } from "@/components/ui/button.tsx";
import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

interface Tariff {
  name: string;
  value: number;
}

interface TariffRemains {
  name: string;
  value: number;
}

interface TariffCardProps {
  tariffRemains: TariffRemains[];
  tariffData: Tariff[];
  money: number;
}

interface Coefficient {
  min: number;
  max: number;
  coefficient: number;
}

interface TarifCoefficients {
  internetList: Coefficient[];
  minuteList: Coefficient[];
  smsList: Coefficient;
}

const TariffCard: React.FC<TariffCardProps> = ({
  tariffRemains,
  tariffData,
  money,
}) => {
  const [coefficients, setCoefficients] = useState<TarifCoefficients | null>(
    null
  );
  const [totalCost, setTotalCost] = useState<number | null>(null);

  // Функция для получения коэффициентов
  const fetchCoefficients = useCallback(async () => {
    try {
      const response = await axios.get<TarifCoefficients>(
        "http://localhost:8080/tarif/"
      );
      setCoefficients(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке коэффициентов:", error);
    }
  }, []);

  // Уточнённый тип возвращаемого значения для getCoefficient
  const getCoefficient = (value: number, list: Coefficient[]): number => {
    const coefficient = list.find(
      (item) => value >= item.min && value <= item.max
    );
    return coefficient ? coefficient.coefficient : 1;
  };

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

  // Используем useCallback для оптимизации calculateCost
  const calculateCost = useCallback(() => {
    if (!coefficients) return;

    const Cc = getCoefficient(minutesValue, coefficients.minuteList);
    const Ic = getCoefficient(internetValue, coefficients.internetList);
    const T = money + minutesValue * Cc + internetValue * Ic + smsValue;

    setTotalCost(T);
  }, [coefficients, money, minutesValue, internetValue, smsValue]);

  useEffect(() => {
    fetchCoefficients();
  }, [fetchCoefficients]);

  useEffect(() => {
    if (coefficients) {
      calculateCost();
    }
  }, [coefficients, calculateCost]);

  return (
    <div className="tariff mr-24 relative flex justify-between">
      <div className="tarif-price">
        <h3 className="tariff-name text-2xl pt-12 pl-8 text-black">
          Ваш тариф
        </h3>
        <div>
          <p className="tariff-price absolute text-2xl bottom-10 pl-8 pb-12">
            {totalCost?.toFixed(0)} ₽/месяц
          </p>
          <p className="tariff-price absolute bottom-5 pl-8 pb-12">
            спишем 20 октября
          </p>
        </div>
      </div>
      <div className="tariff-details flex flex-col w-7/12 h-3/5 mr-8">
        <div className="info-user">
          <div className="internet-user">
            <div className="internet-user-nav flex mt-8">
              <img src="/image/internet.svg" alt="Интернет" />
              <p className="text-3xl ml-5 font-bold">{internetRemains} </p>
              <p className="mt-3.5 ml-1">/</p>
              <p className="mt-3.5 ml-1 font-bold">{internetValue} ГБ</p>
            </div>
            <div className="white-progress-line">
              <div
                className="progress-line-internet"
                style={{
                  width:
                    internetValue > 0
                      ? `${(internetRemains / internetValue) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
          </div>
          <div className="minutes-user">
            <div className="minutes-user-nav flex mt-16">
              <img src="/image/phone.svg" alt="Минуты" />
              <p className="text-3xl ml-5 font-bold">{minutesRemains} </p>
              <p className="mt-3.5 ml-1">/</p>
              <p className="mt-3.5 ml-1 font-bold">{minutesValue} минут</p>
            </div>
            <div className="white-progress-line">
              <div
                className="progress-line-minutes"
                style={{
                  width:
                    minutesValue > 0
                      ? `${(minutesRemains / minutesValue) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
          </div>
          <div className="sms-user">
            <div className="sms-user-nav flex mt-16">
              <img src="/image/sms.svg" alt="СМС" />
              <p className="text-3xl ml-5 font-bold">{smsRemains} </p>
              <p className="mt-3.5 ml-1">/</p>
              <p className="mt-3.5 ml-1 font-bold">{smsValue} SMS</p>
            </div>
            <div className="white-progress-line">
              <div
                className="progress-line-sms"
                style={{
                  width:
                    smsValue > 0 ? `${(smsRemains / smsValue) * 100}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-32">
          <Button className="bt_more_css" variant="destructive" size="bt_more">
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
