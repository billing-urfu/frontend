import { ModelReplenishment } from "@/components/model/ModelReplenishment/ModelReplenishment.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { SubscribersCardProps } from "./types";

const SubscribersCard: React.FC<SubscribersCardProps> = ({ phone }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="balanc ml-28 mr-20 relative">
      <p className="phone-number text-xl pt-12 pl-8 text-white">
        {phone.number}
      </p>
      <div className="balansInfo absolute bottom-5 pl-8 pb-12">
        <h2 className="balance-amount text-3xl text-white">
          {phone.balance.toFixed(2)} ₽
        </h2>
        <Button
          className="mt-3"
          variant="destructive"
          onClick={() => setIsOpen(true)}
        >
          Пополнить
        </Button>

        <ModelReplenishment
          phone={phone}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default SubscribersCard;
