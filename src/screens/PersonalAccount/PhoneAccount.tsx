import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";

interface Phone {
  id: number;
  id_user: number;
  number: string;
  active: boolean;
  balance: number;
}

interface PhoneAccountProps {
  phoneNumbers: Phone[];
  onPhoneClick: (phone: Phone) => void;
}

const PhoneAccount: React.FC<PhoneAccountProps> = ({
  phoneNumbers,
  onPhoneClick,
}) => {
  return (
    <>
      <div className="ml-20 justify-center flex items-center">
        {phoneNumbers.map((phone) => (
          <button
            key={phone.id}
            onClick={() => onPhoneClick(phone)}
            className="phoneAccount border border-black bg-slate-300 w-44 h-11  mb-10 ml-5"
          >
            <p>{phone.number}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export default PhoneAccount;
