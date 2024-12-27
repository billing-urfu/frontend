import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { ModelEditTarif } from "@/components/model/ModelEditTarif/ModelEditTarif";
import { motion } from "framer-motion";

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
      user.patronymic
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
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
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Пользователи
        </motion.h1>
        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          type="text"
          placeholder="Поиск по ФИО или email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-4 w-full text-black"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {filteredUsers.map((user) => (
            <div key={user.id} className="border p-4 mb-4">
              <div
                className="cursor-pointer font-bold flex justify-between"
                onClick={() => toggleUserPhones(user.id)}
              >
                <span>{`${user.surname} ${user.name} ${user.patronymic}`}</span>
                <span>{user.email}</span>
              </div>
              {selectedUserId === user.id && (
                <div className="mt-4">
                  {phones
                    .filter((phone) => phone.id_user === user.id)
                    .map((phone) => (
                      <div
                        key={phone.id}
                        className="border-b p-2 flex flex-col"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span
                              className={`w-4 h-4 rounded-full mr-2 ${
                                phone.active ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            <span>{phone.number}</span>
                          </div>
                          <div>{`Баланс: ${phone.balance} руб`}</div>
                        </div>

                        {phoneDetails[phone.id] && (
                          <div className="ml-6 mt-2">
                            <div>
                              Интернет:{" "}
                              {`${
                                phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Интернет"
                                )?.value || 0
                              }/${
                                phoneDetails[phone.id].tarifValues.find(
                                  (t) => t.name === "Интернет"
                                )?.value || 0
                              } ГБ`}
                            </div>
                            <div>
                              Минуты:{" "}
                              {`${
                                phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Минуты"
                                )?.value || 0
                              }/${
                                phoneDetails[phone.id].tarifValues.find(
                                  (t) => t.name === "Минуты"
                                )?.value || 0
                              } мин`}
                            </div>
                            <div>
                              СМС:{" "}
                              {`${
                                phoneDetails[phone.id].currentTarifValue.find(
                                  (t) => t.name === "Смс"
                                )?.value || 0
                              }/${
                                phoneDetails[phone.id].tarifValues.find(
                                  (t) => t.name === "Смс"
                                )?.value || 0
                              } смс`}
                            </div>
                            <div className="mt-2">{`Тариф: ${
                              phoneDetails[phone.id].money
                            } руб`}</div>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                              onClick={() => handleEditTarif(phone.id)}
                            >
                              Изменить тариф
                            </button>
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
    </div>
  );
};

export default Users;
