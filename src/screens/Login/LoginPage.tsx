import LoginformEmail from "@/components/Auth/LoginformEmail";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-40 h-screen">
      <h1 className="text-2xl font-bold">Вход</h1>
      <div className="w-80">
        <LoginformEmail />
      </div>
    </div>
  );
};

export default LoginPage;
