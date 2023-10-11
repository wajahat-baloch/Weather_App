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
      .then((response) => setData(response.data)); // Use response.data to set the state
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
    <div className="grid h-screen place-items-center">
      <div>
        <h1 className="text-6xl">Weather App</h1>
      </div>
      <div className="flex flex-col md:min-h-[450px] items-center w-[92%] h-[60vh] bg-slate-600 md:w-[380px] rounded-xl">
        <div className="flex mt-8 px-2">
          <div>
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search"
              className="text-slate-700 text-xl py-3 font-bold px-4 bg-slate-200 border-none outline-none rounded-[50px]"
            />
          </div>
          <div>
            <img
              src={searchImage}
              alt=""
              onClick={handleSearch}
              className="p-4 cursor-pointer bg-slate-200 rounded-[50px] ml-2 hover:shadow"
            />
          </div>
        </div>

        {/* cloud */}
        <div>
          <img src={cloud} alt="" className="md:h-28 mt-2 h-24" />
        </div>

        {/* temp */}
        <div className="text-6xl font-bold">
          {Math.floor(data?.main?.temp)}℃
        </div>

        {/* location */}
        <div className="text-2xl m-3 font-bold">{data?.name}</div>

        {/* con */}
        <div className="flex md:mt-11 mt-[7%]">
          <div className="flex">
            <img src={humidity} alt="" className="h-12 p-2 mr-1 ml-2" />
            <div className="text-center">
              {/* humidity */}
              <div>{data?.main?.humidity}</div>
              <div>Humidity</div>
            </div>
          </div>

          <div className="flex">
            <img src={wind} alt="" className="h-12 p-2 mr-1 ml-4" />
            <div className="text-center">
              {/* humidity */}
              <div>{data?.wind?.speed} km/h</div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-2xl text-center py-4 text-white">
        &copy; {new Date().getFullYear()} Wajahat Baloch. All rights reserved.
      </footer>
    </div>
  );
};

export default WeatherApp;
