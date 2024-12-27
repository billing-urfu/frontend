import { motion } from "framer-motion";
import Statcard from "../HeaderAdmin/StatCard";
import { Activity, BarChart2, Users2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/api/api";

const Tile = () => {
  const [users, setUsers] = useState<any>();
  const [payment, setPayment] = useState<any>();
  const [tarifs, setTarifs] = useState<any>();
  const [activ, setActiv] = useState<any>();

  const fetchData = async () => {
    const responseUsers = await api.post("report/countUser");
    const responsePayment = await api.post("report/avgPayment");
    const responseTarifs = await api.post("report/countUser");
    const responseActiv = await api.post("report/procActive");
    setUsers(responseUsers.data);
    setPayment(responsePayment.data);
    setTarifs(responseTarifs.data);
    setActiv(responseActiv.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let d = payment * users;

  return (
    <div>
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-4 lg: grid-cold-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Statcard name="Users" icon={Zap} value={users} color="#6366F1" />
        <Statcard
          name="Плата"
          icon={Users2}
          value={d}
          color="#8B5CF6"
          text="руб/мес"
        />
        <Statcard name="Тарифов" icon={BarChart2} value="3" color="#EC4899" />
        <Statcard
          name="Актив"
          icon={Activity}
          value={activ}
          color="#6366F1"
          text="%"
        />
      </motion.div>
    </div>
  );
};

export default Tile;
