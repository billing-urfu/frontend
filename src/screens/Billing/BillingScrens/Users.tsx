import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { ModelEditTarif } from "@/components/model/ModelEditTarif/ModelEditTarif";
import { motion } from "framer-motion";
import { ModuleHistoryMoney } from "@/components/model/ModuleHistoryMoney/ModuleHistoryMoney";

interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
}

interface Phone {
  id: number;
  id_user: number;
  number: string;
  active: boolean;
  balance: number;
}

interface TarifInfo {
  tarifValues: { name: string; value: number }[];
  currentTarifValue: { name: string; value: number }[];
  money: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [phoneDetails, setPhoneDetails] = useState<{
    [key: number]: TarifInfo;
  }>({});
  const [search, setSearch] = useState("");
  const [editingPhone, setEditingPhone] = useState<{
    id: number;
    valueInternet: number;
    valueMinutes: number;
    valueSms: number;
  } | null>(null);

  useEffect(() => {
    api.get("http://localhost:8080/users/").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("http://localhost:8080/phone/").then((response) => {
      setPhones(response.data);
    });
  }, []);

  const loadUserPhonesTarifInfo = (userId: number) => {
    const userPhones = phones.filter((phone) => phone.id_user === userId);

    userPhones.forEach((phone) => {
      if (!phoneDetails[phone.id]) {
        api
          .get(`http://localhost:8080/userTarif/${phone.id}`)
          .then((response) => {
            setPhoneDetails((prev) => ({
              ...prev,
              [phone.id]: response.data,
            }));
          });
      }
    });
  };

  const toggleUserPhones = (userId: number) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
      loadUserPhonesTarifInfo(userId);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.surname.toLowerCase().includes(search.toLowerCase()) ||
      user.patronymic.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditTarif = (phoneId: number) => {
    const phoneTarif = phoneDetails[phoneId];
    if (phoneTarif) {
      const internet =
        phoneTarif.tarifValues.find((t) => t.name === "Интернет")?.value || 0;
      const minutes =
        phoneTarif.tarifValues.find((t) => t.name === "Минуты")?.value || 0;
      const sms =
        phoneTarif.tarifValues.find((t) => t.name === "Смс")?.value || 0;

      setEditingPhone({
        id: phoneId,
        valueInternet: internet,
        valueMinutes: minutes,
        valueSms: sms,
      });
    }
  };

  const closeEditModal = () => {
    setEditingPhone(null);
    api.get("http://localhost:8080/phone/").then((response) => {
      setPhones(response.data);
    });
    Object.keys(phoneDetails).forEach((key) => {
      api.get(`http://localhost:8080/userTarif/${key}`).then((response) => {
        setPhoneDetails((prev) => ({
          ...prev,
          [key]: response.data,
        }));
      });
    });
  };

  return (
    <div className="flex-1 overflow-auto relative">
      <HeaderAdmin title="Пользователи" />
      <div className="max-w-8xl mx-auto py-6 px-4 lg:px-8">
        <motion.input
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          type="text"
          placeholder="Поиск по ФИО или email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-gray-300 focus:ring focus:ring-blue-300 rounded-lg shadow-sm mb-4 px-4 py-2 text-gray-800"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.02]"
            >
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleUserPhones(user.id)}
              >
                <div className="font-medium text-white">
                  <p>{`${user.surname} ${user.name} ${user.patronymic}`}</p>
                </div>
                <div className="text-sm text-white">{user.email}</div>
              </div>
              {selectedUserId === user.id && (
                <div className="bg-gray-800 px-6 py-4 space-y-4">
                  {phones
                    .filter((phone) => phone.id_user === user.id)
                    .map((phone) => (
                      <div
                        key={phone.id}
                        className="bg-gray-800 shadow-inner rounded-lg p-4 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span
                              className={`w-4 h-4 rounded-full mr-2 ${
                                phone.active ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            <span className="font-medium">{phone.number}</span>
                          </div>
                          <div className="text-sm text-white">
                            Баланс: {phone.balance} руб
                          </div>
                        </div>
                        {phoneDetails[phone.id] && (
                          <div className="space-y-2 text-sm text-white">
                            <div>
                              Интернет:{" "}
                              <span className="font-semibold">
                                {phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Интернет"
                                )?.value || 0}
                              </span>
                              /
                              {phoneDetails[phone.id].tarifValues.find(
                                (t) => t.name === "Интернет"
                              )?.value || 0}{" "}
                              ГБ
                            </div>
                            <div>
                              Минуты:{" "}
                              <span className="font-semibold">
                                {phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Минуты"
                                )?.value || 0}
                              </span>
                              /
                              {phoneDetails[phone.id].tarifValues.find(
                                (t) => t.name === "Минуты"
                              )?.value || 0}{" "}
                              мин
                            </div>
                            <div>
                              СМС:{" "}
                              <span className="font-semibold">
                                {phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Смс"
                                )?.value || 0}
                              </span>
                              /
                              {phoneDetails[phone.id].tarifValues.find(
                                (t) => t.name === "Смс"
                              )?.value || 0}{" "}
                              смс
                            </div>
                            <div className="text-white">
                              Тариф: {phoneDetails[phone.id].money} руб
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                                onClick={() => handleEditTarif(phone.id)}
                              >
                                Изменить тариф
                              </button>
                              <button
                                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-md"
                                onClick={() => {
                                  setIsOpenHistory(true);
                                  setSelectedPhoneNumber(phone.id);
                                }}
                              >
                                История баланса
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {editingPhone && (
        <ModelEditTarif
          isOpen={!!editingPhone}
          onClose={closeEditModal}
          idPhone={editingPhone.id}
          valueInternet={editingPhone.valueInternet}
          valueMinutes={editingPhone.valueMinutes}
          valueSms={editingPhone.valueSms}
        />
      )}
      {isOpenHistory && selectedPhoneNumber && (
        <ModuleHistoryMoney
          isOpen={isOpenHistory}
          onClose={() => setIsOpenHistory(false)}
          phone={selectedPhoneNumber}
        />
      )}
    </div>
  );
};

export default Users;
