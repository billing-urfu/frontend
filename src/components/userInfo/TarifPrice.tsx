import { useCallback, useEffect, useState } from "react";
import { TariffCardProps, TarifCoefficients, Coefficient } from "./types";
import api from "@/api/api";

const TarifPrice: React.FC<TariffCardProps> = ({
  internetValue,
  minutesValue,
  smsValue,
  onTotalCostChange,
}) => {
  const [coefficients, setCoefficients] = useState<TarifCoefficients | null>(
    null
  );

  const [totalCost, setTotalCost] = useState<number | null>(null);

  const fetchCoefficients = useCallback(async () => {
    try {
      const response = await api.get<TarifCoefficients>(
        "http://localhost:8080/tarif/"
      );
      setCoefficients(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке коэффициентов:", error);
    }
  }, []);

  const getCoefficient = (value: number, list: Coefficient[]): number => {
    const coefficient = list.find(
      (item) => value >= item.min && value <= item.max
    );
    return coefficient ? coefficient.coefficient : 1;
  };

  const calculateCost = useCallback(() => {
    if (!coefficients) return;

    const Cc = getCoefficient(minutesValue, coefficients.minuteList);
    const Ic = getCoefficient(internetValue, coefficients.internetList);
    const T = minutesValue * Cc + internetValue * Ic + smsValue;

    setTotalCost(T);
    onTotalCostChange?.(T);
  }, [coefficients, minutesValue, internetValue, smsValue, onTotalCostChange]);

  useEffect(() => {
    fetchCoefficients();
  }, [fetchCoefficients]);

  useEffect(() => {
    if (coefficients) {
      calculateCost();
    }
  }, [coefficients, calculateCost]);

  return (
    <>
      <p className="p-5 pb-0 pl-1 mb-3 text-xl">
        Итого: {totalCost?.toFixed(0)} ₽/месяц
      </p>
    </>
  );
};

export default TarifPrice;
