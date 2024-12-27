import { useState } from "react";
import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import Statcard from "@/components/HeaderAdmin/StatCard";
import SalersOver from "@/components/overview/SalersOver";
import { DollarSign, Phone, Text, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import SalersChanelData from "@/components/overview/SalersChanelData";
import Tile from "@/components/repAndAnalytics/tile";

const RepAndAnalytics = () => {
  const [selectedSalersOver1, setSelectedSalersOver1] = useState("минуты");
  const [selectedSalersOver2, setSelectedSalersOver2] = useState("минуты");
  const [Graf, setGraf] = useState("1");

  const handleSelect1 = (type: string) => {
    setSelectedSalersOver1(type);
  };
  const handleSelect2 = (type: string) => {
    setSelectedSalersOver2(type);
  };
  const handleSelect3 = (type: string) => {
    setGraf(type);
  };
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderAdmin title="Отчётность" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <Tile />
        <div>
          <button
            className={`px-4 py-2 mx-1 mb-3 rounded ${
              Graf === "1" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() => handleSelect3("1")}
          >
            Графики тарифов
          </button>
          <button
            className={`px-4 py-2 mx-1 mb-3 rounded ${
              Graf === "2" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() => handleSelect3("2")}
          >
            Графики деняг
          </button>
        </div>

        {Graf === "1" && (
          <div>
            <p className="text-4xl pb-10">Средние значения у пользователей:</p>
            <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg: grid-cold-4 mb-8">
              <div>
                <button
                  className={`px-4 py-2 mx-1 mb-3 rounded ${
                    selectedSalersOver1 === "Минуты"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => handleSelect1("Минуты")}
                >
                  Минуты
                </button>
                <button
                  className={`px-4 py-2 mx-1 rounded ${
                    selectedSalersOver1 === "Интернет"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => handleSelect1("Интернет")}
                >
                  Интернет
                </button>
                <button
                  className={`px-4 py-2 mx-1 rounded ${
                    selectedSalersOver1 === "СМС"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => handleSelect1("СМС")}
                >
                  СМС
                </button>
                <SalersOver
                  text={selectedSalersOver1}
                  post="report/avgMonthResourceUser"
                />
              </div>
              <div className="mt-14">
                <p className="text-2xl pb-3">В этом месяце:</p>
                <Statcard
                  name="Интернет"
                  icon={Wifi}
                  value="3 Гб"
                  color="#6366F1"
                />
                <Statcard
                  name="Минуты"
                  icon={Phone}
                  value="165 мин"
                  color="green"
                />
                <Statcard
                  name="СМС"
                  icon={Text}
                  value="33 смс"
                  color="#6366F1"
                />
              </div>
            </motion.div>
            <p className="text-4xl pb-10">Процентное распределение пакетов:</p>
            <div>
              <button
                className={`px-4 py-2 mx-1 mb-3 rounded ${
                  selectedSalersOver2 === "Минуты"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => handleSelect2("Минуты")}
              >
                Минуты
              </button>
              <button
                className={`px-4 py-2 mx-1 rounded ${
                  selectedSalersOver2 === "Интернет"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => handleSelect2("Интернет")}
              >
                Интернет
              </button>
              <button
                className={`px-4 py-2 mx-1 rounded ${
                  selectedSalersOver2 === "СМС"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
                onClick={() => handleSelect2("СМС")}
              >
                СМС
              </button>
              <SalersChanelData
                text={selectedSalersOver2}
                post="report/procInternetUse"
              />
            </div>
          </div>
        )}
        {Graf === "2" && (
          <div>
            <p className="text-4xl pb-10">
              Средняя стоимость тарифа на пользователя
            </p>
            <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg: grid-cold-4 mb-8">
              <div>
                <SalersOver
                  text={selectedSalersOver1}
                  post="report/avgMonthResourceUser"
                />
              </div>
              <div className="">
                <p className="text-2xl pb-3">В этом месяце:</p>
                <Statcard
                  name="Плата"
                  icon={DollarSign}
                  value="263 руб/мес"
                  color="#6366F1"
                />
              </div>
            </motion.div>
            <p className="text-4xl pb-10">
              Популярные диапазоны пополнения баланса:
            </p>
            <div>
              <SalersChanelData
                text={selectedSalersOver2}
                post="report/popularIncome"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RepAndAnalytics;
