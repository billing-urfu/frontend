import { SubmitHandler, useForm } from "react-hook-form";
import "./ModelReplenishment.scss";
import { ModelRep, FormReplenishment } from "src/components/model/types.ts";
import api from "@/api/api";

export const ModelReplenishment: React.FC<ModelRep> = ({
  isOpen,
  onClose,
  phone,
}) => {
  const { register, handleSubmit, setValue } = useForm<FormReplenishment>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormReplenishment> = async (data) => {
    try {
      const response = await api.post("/income/", data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFormSubmit = () => {
    setValue("id_phone", phone.id);
    handleSubmit(onSubmit)();
    window.location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="model-wrapper">
            <div className="model-content">
              <button className="model-close-button" onClick={() => onClose()}>
                Х
              </button>
              <form onSubmit={(e) => e.preventDefault()}>
                <p>Пополнить {phone.number} на сумму:</p>
                <input
                  type="number"
                  placeholder="Сумма"
                  {...register("money", { valueAsNumber: true })}
                  className="mb-2 pl-2"
                />
                <input
                  type="text"
                  placeholder="Банк"
                  {...register("source")}
                  className="mb-2 pl-2"
                />
                <button
                  type="button"
                  className="button-form"
                  onClick={handleFormSubmit}
                >
                  Пополнить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
