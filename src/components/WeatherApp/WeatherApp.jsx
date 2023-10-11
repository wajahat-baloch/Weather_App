import React, { useState, useEffect } from "react";
import cloud from "../Assets/cloud.png";
import humidity from "../Assets/humidity.png";
import searchImage from "../Assets/search.png";
import wind from "../Assets/wind.png";
import axios from "axios";

const WeatherApp = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const api_key = "aba6c34e0b3ab24d3491d2ba66f9edde";

  const getWeather = (input) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${api_key}`
      )
      .then((response) => setData(response.data));
  };

  const getWeatherByLocation = (latitude, longitude) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`
      )
      .then((response) => setData(response.data));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      });
    } else {
      getWeather("london");
    }
  }, []);

  const handleSearch = () => {
    getWeather(input);
  };

  return (
    <div className="grid h-screen place-items-center bg-slate-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold">Weather App</h1>
      </div>
      <div className="flex flex-col md:min-h-[450px] items-center w-[93%] h-[60vh] bg-slate-600 md:w-[380px] rounded-xl mt-8 p-4">
        <div className="flex w-full">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            className="text-slate-700 text-xl py-3 w-full font-bold px-4 bg-slate-200 border-none outline-none rounded-full"
          />
          <img
            src={searchImage}
            alt="Search"
            onClick={handleSearch}
            className="p-3 cursor-pointer bg-slate-200 rounded-full ml-2 mt-1 hover:shadow"
          />
        </div>

        <div className="text-center mt-2">
          <img src={cloud} alt="Cloud" className="md:h-28 h-24" />
        </div>

        <div className="text-6xl font-bold text-white">
          {Math.floor(data?.main?.temp)}℃
        </div>

        <div className="text-2xl m-3 font-bold text-white">{data?.name}</div>

        <div className="flex mt-3">
          <div className="flex items-center">
            <img src={humidity} alt="Humidity" className="h-12 p-2 mr-1 ml-2" />
            <div className="text-center">
              <div>{data?.main?.humidity}</div>
              <div>Humidity</div>
            </div>
          </div>

          <div className="flex items-center ml-4">
            <img src={wind} alt="Wind Speed" className="h-12 p-2 mr-1 ml-2" />
            <div className="text-center">
              <div>{data?.wind?.speed} km/h</div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-2xl text-center text-white mt-4">
        &copy; {new Date().getFullYear()} Wajahat Baloch. All rights reserved.
      </footer>
    </div>
  );
};

export default WeatherApp;
