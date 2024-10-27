import "./Main.scss";
import "./Main-media.scss";
import { Button } from "@/components/ui/button.tsx";

function Main() {
  return (
    <div className="wrapperMain m-0 max-w-screen-2xl">
      <main className="main-content flex justify-center">
        <div className="balanc ml-28 mr-20 relative">
          <p className="phone-number text-xl pt-12 pl-8 text-white">
            +7 912 467-12-15
          </p>
          <div className="balansInfo absolute bottom-5 pl-8 pb-12">
            <h2 className="balance-amount text-3xl text-white">160,00 ₽</h2>
            <Button className="mt-3" variant="destructive">
              Пополнить
            </Button>
          </div>
        </div>

        <div className="tariff mr-24 relative flex justify-between">
          <div className="tarif-price">
            <h3 className="tariff-name text-2xl pt-12 pl-8 text-black">
              Название тарифа
            </h3>
            <div>
              <p className="tariff-price absolute text-2xl bottom-10 pl-8 pb-12">
                400 ₽/месяц
              </p>

              <p className="tariff-price absolute bottom-5 pl-8 pb-12">
                спишем 20 октября
              </p>
            </div>
          </div>
          <div className="tariff-details flex flex-col w-7/12 h-3/5 mr-8">
            <div className="info-user">
              <div className="internet-user">
                <div className="internet-user-nav flex mt-8">
                  <img src="/image/internet.svg" alt="" />
                  <p className="text-3xl ml-5 font-bold">17 </p>
                  <p className="mt-3.5 ml-1">/</p>
                  <p className="mt-3.5 ml-1 font-bold">25 ГБ</p>
                </div>
                <div className="white-progress-line">
                  <div className="progress-line-internet"></div>
                </div>
              </div>
              <div className="minutes-user">
                <div className="minutes-user-nav flex mt-16">
                  <img src="/image/phone.svg" alt="" />
                  <p className="text-3xl ml-5 font-bold">2250 </p>
                  <p className="mt-3.5 ml-1">/</p>
                  <p className="mt-3.5 ml-1 font-bold">2500 минут</p>
                </div>
                <div className="white-progress-line">
                  <div className="progress-line-minutes"></div>
                </div>
              </div>
              <div className="sms-user">
                <div className="sms-user-nav flex mt-16">
                  <img src="/image/sms.svg" alt="" />
                  <p className="text-3xl ml-5 font-bold">300 </p>
                  <p className="mt-3.5 ml-1">/</p>
                  <p className="mt-3.5 ml-1 font-bold">300 SMS</p>
                </div>
                <div className="white-progress-line">
                  <div className="progress-line-sms"></div>
                </div>
              </div>
            </div>
            <div className="mt-32">
              <Button
                className="bt_more_css"
                variant="destructive"
                size="bt_more"
              >
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
