import { Button } from "@/components/ui/button.tsx";

interface Phone {
  id: number;
  id_user: number;
  number: string;
  active: boolean;
  balance: number;
}

interface SubscribersCardProps {
  phone: Phone;
}

const SubscribersCard: React.FC<SubscribersCardProps> = ({ phone }) => {
  return (
    <div className="balanc ml-28 mr-20 relative">
      <p className="phone-number text-xl pt-12 pl-8 text-white">
        {phone.number}
      </p>
      <div className="balansInfo absolute bottom-5 pl-8 pb-12">
        <h2 className="balance-amount text-3xl text-white">
          {phone.balance.toFixed(2)} ₽
        </h2>
        <Button className="mt-3" variant="destructive">
          Пополнить
        </Button>
      </div>
    </div>
  );
};

export default SubscribersCard;
