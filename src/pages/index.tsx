import Image from "next/image";
import { FormEvent, useState } from "react";

import Container from "@/components/Container";
import Forecast from "@/components/Forecast";
import Footer from "@/components/Footer";

export default function Home() {

  const [city, setCity] = useState('');

  var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API}`;
  var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API}`;

  const [data, setData] = useState<ICurrentProps[]>([]);
  const [forecastData, setForecastData] = useState<IForecastProps[]>([]);

  const grabInfo = (e: FormEvent) => {
    e.preventDefault();
    // current
    fetch(urlCurrent)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData([data]);
        setCity('');
      })
    // forecast
    fetch(urlForecast)
      .then((res) => {
        return res.json();
      })
      .then((forecastData) => {
        console.log(forecastData);
        setForecastData([forecastData]);
        setCity('');
      })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-300`}
    >
      <header className="flex flex-col items-center justify-between fixed top-0 min-w-full bg-white px-10 py-3 bg-opacity-80 backdrop-blur-md rounded-b-2xl z-10 lg:flex lg:flex-row">
        <div className="flex flex-row items-center gap-5 lg:gap-11">
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt='logo'
          />
          <h1 className="text-2xl text-blue-500">Check Weat-HER</h1>
        </div>
        {/* searchbox */}
        <div className="relative flex justify-between items-center w-full pt-4 text-white md:w-2/3 lg:w-1/4">
          <form onSubmit={grabInfo} className="flex justify-between items-center w-full m-auto p-3 bg-white border border-gray-300 text-white rounded-l-2xl">
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-black focus: outline-none text-xl"
                type="text"
                placeholder="Enter Location"
              />
            </div>
          </form>
          <button className="bg-black rounded-r-2xl text-xl h-full px-4 py-3 " onClick={grabInfo} type="submit">search</button>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center mt-52 mb-20 md:w-2/3 lg:w-2/3">
        <Container data={data} />
        <Forecast data={forecastData} />
      </div>
      <Footer />
    </main>
  );
}
