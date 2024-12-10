import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginformEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Поле не может быть пустым");
      return;
    }
    if (!validateEmail(email)) {
      setError("Некорректный формат email");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const checkEmailResponse = await axios.post(
        "http://localhost:8080/auth/checkEmail",
        { email }
      );
      if (!checkEmailResponse.data) {
        setError("Такой почты не существует");
        return;
      }
      const sendCodeResponse = await axios.post(
        "http://localhost:8080/auth/sendCode",
        { email }
      );
      if (sendCodeResponse.status === 200) {
        setStep("code");
      } else {
        setError("Ошибка при отправке кода, попробуйте снова.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          `Ошибка: ${error.response.status} - ${
            error.response.data.message || "Неизвестная ошибка"
          }`
        );
      } else {
        setError("Произошла ошибка. Проверьте подключение.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1 || !/^[0-9A-Z]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodeSubmit = async () => {
    if (code.some((char) => char === "")) {
      setError("Введите полный код");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/checkCode",
        {
          email,
          code: code.join(""),
        }
      );

      if (response.status === 200) {
        const { accessToken, token } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", token);
        alert("Авторизация успешна!");

        navigate("/");
      } else {
        setError("Неверный код, попробуйте снова.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          `Ошибка: ${error.response.status} - ${
            error.response.data.message || "Неизвестная ошибка"
          }`
        );
      } else {
        setError("Произошла ошибка. Проверьте подключение.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-0">
      {step === "email" ? (
        <>
          <input
            type="email"
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border px-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          <button
            onClick={handleEmailSubmit}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded w-full"
          >
            {loading ? "Отправка..." : "Через почту"}
          </button>
          <a
            className="flex mt-1 w-full bg-blue-500 rounded"
            href="https://t.me/"
          >
            <img src="/image/telegram.svg" alt="" className="ml-20" />
            <p className="pl-1 py-2 text-white rounded w-full">
              Через Telegram
            </p>
          </a>
        </>
      ) : (
        <>
          <div className="mb-1 mt-3">
            <h2 className="text-xl font-bold">Дополнительная проверка</h2>
            <p className="text-gray-600 text-sm mb-2">
              Пожалуйста, введите код который был отправлен на вашу почту. Нам
              нужно убедиться что это действительно ваш аккаунт.
            </p>
          </div>
          <div className="flex gap-2 justify-center mt-2">
            {code.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  className="w-full h-10 text-center border-none text-lg bg-slate-200 focus:bg-white focus:outline-none"
                />
                <div
                  className={`w-full h-1 transition-colors ${
                    value ? "bg-blue-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            onClick={handleCodeSubmit}
            disabled={loading}
            className="mt-4 py-2 bg-green-600 text-white rounded w-full"
          >
            {loading ? "Проверка..." : "Проверить код"}
          </button>
        </>
      )}
    </div>
  );
};

export default LoginformEmail;
