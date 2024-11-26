import "./PersonalAccount.scss";
import "./PersonalAccount-media.scss";
import { PhoneAccountProps } from "./types";

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
            className="button-phone text-black bg-slate-300 w-44 h-11 mb-10 ml-5"
          >
            <p>{phone.number}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export default PhoneAccount;
