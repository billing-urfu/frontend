import { ModelReplenishment } from "@/components/model/ModelReplenishment/ModelReplenishment.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { SubscribersCardProps } from "./types";
import { ModuleHistoryMoney } from "@/components/model/ModuleHistoryMoney/ModuleHistoryMoney";

const SubscribersCard: React.FC<SubscribersCardProps> = ({ phone }) => {
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  return (
    <div className="balanc ml-28 mr-20 h-60 w-full relative lg:h-80 lg:w-72">
      <p className="phone-number text-xl pt-12 pl-8 text-white">
        {phone.number}
      </p>
      <div className="balansInfo absolute bottom-5 pl-8 pb-12">
        <h2 className="balance-amount text-3xl text-white">
          {phone.balance.toFixed(2)} ₽
        </h2>
        <div>
          <Button
            className="mt-3 w-50"
            variant="destructive"
            onClick={() => setIsOpenAdd(true)}
          >
            Пополнить
          </Button>
          <Button
            className="mt-3 ml-1 w-10 h-10"
            variant="destructive"
            onClick={() => setIsOpenHistory(true)}
          >
            ₽
          </Button>
        </div>

        <ModelReplenishment
          phone={phone}
          isOpen={isOpenAdd}
          onClose={() => setIsOpenAdd(false)}
        />

        <ModuleHistoryMoney
          phone={phone.id}
          isOpen={isOpenHistory}
          onClose={() => setIsOpenHistory(false)}
        />
      </div>
    </div>
  );
};

export default SubscribersCard;
