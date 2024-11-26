import { Tariff } from "./types";

const TarifValue: React.FC<Tariff> = ({
  value,
  valueRemain,
  img,
  nameValue,
}) => {
  return (
    <>
      <div>
        <div className="flex mt-12">
          <img src={img} alt="" />
          <p className="text-3xl ml-5 font-bold">{valueRemain} </p>
          <p className="mt-3.5 ml-1">/</p>
          <p className="mt-3.5 ml-1 font-bold">
            {value} {nameValue}
          </p>
        </div>
        <div className="white-progress-line">
          <div
            className="progress-line"
            style={{
              width: value > 0 ? `${(valueRemain / value) * 100}%` : "0%",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TarifValue;
