import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import "./ModelEfitTarif.scss";
import { Button } from "../../ui/button";
import TarifPrice from "../../userInfo/TarifPrice";
import { ModelEdit, ValueOptions } from "src/components/model/types.ts";
import api from "@/api/api";

export const ModelEditTarif: React.FC<ModelEdit> = ({
  isOpen,
  onClose,
  valueInternet,
  valueMinutes,
  valueSms,
  idPhone,
}) => {
  const [valueOpt, setValueOpt] = useState<ValueOptions>({
    valueInt: valueInternet,
    valueMin: valueMinutes,
    valueSms: valueSms,
  });
  const [totalCost, setTotalCost] = useState<number | null>(null);

  useEffect(() => {
    setValueOpt({
      valueInt: valueInternet,
      valueMin: valueMinutes,
      valueSms: valueSms,
    });
  }, [valueInternet, valueMinutes, valueSms]);

  const handleSliderChange = (key: keyof ValueOptions) => (value: number[]) => {
    setValueOpt((prev) => ({ ...prev, [key]: value[0] }));
  };

  const handleConfirm = async () => {
    try {
      const response = await api.put("http://localhost:8080/userTarif/", {
        id_phone: idPhone,
        internet: valueOpt.valueInt,
        sms: valueOpt.valueSms,
        minutes: valueOpt.valueMin,
        money: totalCost,
      });

      if (response.status === 200) {
        alert("Тариф успешно обновлен!");
        onClose();
      } else {
        console.error("Ошибка при обновлении тарифа:", response);
        alert("Ошибка при обновлении тарифа. Попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Не удалось обновить тариф. Проверьте подключение к серверу.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="model-wrapper">
            <div className="model-content">
              <button className="model-close-button" onClick={onClose}>
                Х
              </button>
              <form onSubmit={(e) => e.preventDefault()}>
                <p>Изменение тарифа</p>
                <p>Настройте свой тариф: связь, интернет и смс</p>
                <div className="parent-container">
                  <div className="slider-block">
                    <p className="text-lg mb-0">{valueOpt.valueInt} ГБ</p>
                    <Slider
                      value={[valueOpt.valueInt]}
                      max={90}
                      step={5}
                      onValueChange={handleSliderChange("valueInt")}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>0</span> <span>90</span>
                    </div>
                  </div>
                </div>
                <div className="parent-container">
                  <div className="slider-block">
                    <p className="text-lg mb-0">{valueOpt.valueMin} мин</p>
                    <Slider
                      value={[valueOpt.valueMin]}
                      max={2000}
                      step={1}
                      onValueChange={handleSliderChange("valueMin")}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>0</span> <span>2000</span>
                    </div>
                  </div>
                </div>
                <div className="parent-container">
                  <div className="slider-block">
                    <p className="text-lg mb-0">{valueOpt.valueSms} SMS</p>
                    <Slider
                      value={[valueOpt.valueSms]}
                      max={500}
                      step={1}
                      onValueChange={handleSliderChange("valueSms")}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>0</span> <span>500</span>
                    </div>
                  </div>
                </div>
                <div>
                  <TarifPrice
                    internetValue={valueOpt.valueInt}
                    minutesValue={valueOpt.valueMin}
                    smsValue={valueOpt.valueSms}
                    onTotalCostChange={setTotalCost} // Добавляем обновление totalCost
                  />
                </div>
                <Button type="button" onClick={handleConfirm}>
                  Подтвердить изменение
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
