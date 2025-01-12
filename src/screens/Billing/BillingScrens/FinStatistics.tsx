import { useState, useEffect } from "react";
import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import Statcard from "@/components/HeaderAdmin/StatCard";
import { DollarSign, BarChart, CreditCard } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FinStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("март");
  const [chartType, setChartType] = useState("1");
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortedByDateAsc, setSortedByDateAsc] = useState(true);
  const [sortedByIncomeAsc, setSortedByIncomeAsc] = useState(true);

  // Получаем данные с API
  useEffect(() => {
    fetch("http://localhost:8080/income/")
      .then((response) => response.json())
      .then((data) => {
        setIncomeData(data);
        const total = data.reduce(
          (acc: number, curr: any) => acc + curr.money,
          0
        );
        setTotalIncome(total);
      })
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleSelectChart = (type: string) => {
    setChartType(type);
  };

  // Фильтрация по дате
  const filterByDate = () => {
    return incomeData.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (startDate && entryDate < startDate) return false;
      if (endDate && entryDate > endDate) return false;
      return true;
    });
  };

  // Сортировка по дате
  const sortByDate = () => {
    const sorted = [...incomeData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortedByDateAsc
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setIncomeData(sorted);
    setSortedByDateAsc(!sortedByDateAsc);
  };

  // Сортировка по доходу
  const sortByIncome = () => {
    const sorted = [...incomeData].sort((a, b) => {
      return sortedByIncomeAsc ? a.money - b.money : b.money - a.money;
    });
    setIncomeData(sorted);
    setSortedByIncomeAsc(!sortedByIncomeAsc);
  };

  // Группировка данных по месяцам для графика
  const groupDataByMonth = () => {
    const grouped = incomeData.reduce((acc: any, curr: any) => {
      const month = new Date(curr.date).toLocaleString("default", {
        month: "long",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += curr.money;
      return acc;
    }, {});

    return Object.keys(grouped).map((month) => ({
      name: month,
      value: grouped[month],
    }));
  };

  const groupedData = groupDataByMonth();

  // Сброс выбранного диапазона дат
  const resetDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderAdmin title="Финансовая статистика" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {chartType === "1" && (
          <div className="mt-10">
            <p className="text-4xl pb-10">График доходов:</p>
            <div className="h-80">
              {groupedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={groupedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(31, 41, 55, 0.8)",
                        borderColor: "#4B5563",
                      }}
                      itemStyle={{ color: "#E5E7EB" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-300">Нет данных для отображения</p>
              )}
            </div>
            <div className="mt-8">
              <p className="text-2xl pb-3">Общий доход:</p>
              <Statcard
                name="Доход"
                icon={DollarSign}
                value={`${totalIncome} руб`}
                color="#10B981"
              />
            </div>
          </div>
        )}
        <div className="mt-12">
          <p className="text-4xl pb-10">Детальная финансовая таблица:</p>
          <div className="flex mb-4">
            <div className="mr-4">
              <label>Выберите период:</label>
              <div className="flex space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="px-4 py-2 rounded border text-black"
                  placeholderText="От"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="px-4 py-2 rounded border text-black"
                  placeholderText="До"
                />
              </div>
            </div>
            <button
              onClick={resetDateRange}
              className="px-4 py-2 bg-gray-600 text-white rounded mt-6"
            >
              Сбросить диапазон дат
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto bg-gray-600">
              <thead>
                <tr className="bg-gray-700 ">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={sortByDate}
                  >
                    Дата
                    {sortedByDateAsc ? (
                      <span className="ml-2">⬆️</span>
                    ) : (
                      <span className="ml-2">⬇️</span>
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Описание</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={sortByIncome}
                  >
                    Доход
                    {sortedByIncomeAsc ? (
                      <span className="ml-2">⬆️</span>
                    ) : (
                      <span className="ml-2">⬇️</span>
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Расход</th>
                </tr>
              </thead>
              <tbody>
                {filterByDate().map((entry) => (
                  <tr key={entry.id}>
                    <td className="py-3 px-6">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">{entry.source}</td>
                    <td className="py-3 px-6 text-green-500">
                      {entry.money} руб
                    </td>
                    <td className="py-3 px-6"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinStatistics;
