import React, { useEffect, useState } from "react";
import axios from "axios";

interface HistoryItem {
  type: "income" | "outcome";
  money: number;
  description: string;
  date: string;
}

interface ModuleHistoryMoneyProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
}

export const ModuleHistoryMoney: React.FC<ModuleHistoryMoneyProps> = ({
  isOpen,
  onClose,
  phone,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "income" | "outcome">(
    "all"
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchHistory = async () => {
    try {
      const incomeResponse = await axios.get<HistoryItem[]>(
        `http://localhost:8080/income/${phone}`
      );
      const outcomeResponse = await axios.get<HistoryItem[]>(
        `http://localhost:8080/outcome/${phone}`
      );

      const incomeData = incomeResponse.data.map((item) => ({
        type: "income",
        money: item.money,
        description: item.source || "Пополнение",
        date: item.date,
      }));

      const outcomeData = outcomeResponse.data.map((item) => ({
        type: "outcome",
        money: item.money,
        description: item.reason || "Списание",
        date: item.date,
      }));

      const combinedData = [...incomeData, ...outcomeData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setHistory(combinedData);
      setFilteredHistory(combinedData);
    } catch (error) {
      console.error("Ошибка загрузки истории:", error);
    }
  };

  const applyFilters = () => {
    let filtered = history;

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }

    setFilteredHistory(filtered);
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    applyFilters();
  }, [filterType, selectedDate]);

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => onClose()}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center text-black">
              История операций
            </h2>

            {/* Фильтры */}
            <div className="mb-4 flex gap-4 items-center">
              {/* Фильтр по типу */}
              <select
                className="border rounded px-2 py-1 text-sm text-black"
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as "all" | "income" | "outcome")
                }
              >
                <option value="all" className="text-black">
                  Все
                </option>
                <option value="income" className="text-black">
                  Пополнения
                </option>
                <option value="outcome" className="text-black">
                  Списания
                </option>
              </select>

              {/* Фильтр по дате */}
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm text-black"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Список операций */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  {/* Индикатор */}
                  <div
                    className={`w-3 h-3 rounded-full mr-4 ${
                      item.type === "income" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  {/* Описание */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.money.toFixed(2)} ₽
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
