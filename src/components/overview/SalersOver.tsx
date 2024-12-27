import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import api from "@/api/api";
import { useEffect, useState } from "react";

interface StatCardProps {
  text: string;
  post: string;
}

const SalersOver: React.FC<StatCardProps> = ({ text, post }) => {
  const [data, setData] = useState([]);
  const [selectedResource, setSelectedResource] = useState<any>(
    "Среднее количество минут"
  );

  const fetchData = async () => {
    const response = await api.post(`${post}`);
    setData(response.data);

    const resourceMap: { [key: string]: string } = {
      СМС: "Среднее количество смс",
      Интернет: "Среднее количество интернета",
      Минуты: "Среднее количество минут",
    };

    const resource = response.data.find(
      (item: any) => item.resource === resourceMap[text]
    );
    setSelectedResource(resource);
  };

  useEffect(() => {
    fetchData();
  }, [text]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">{text}</h2>
      <div className="h-80">
        {selectedResource ? (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={selectedResource.nameValueList}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey={"name"} stroke="#9ca3af" />
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
    </motion.div>
  );
};

export default SalersOver;
