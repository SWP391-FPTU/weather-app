import { useState } from "react";

const api = {
    key: "545e9b4a434a53f40c19ffe791ae4e5a",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [cityName, setCityName] = useState("");

    const [weatherResult, setweatherResult] = useState({});

    const [isFirst, setIsFirst] = useState(true);

    const handleSearch = (city) => {
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setweatherResult(result);
            });
        setCityName("");
        if (isFirst) setIsFirst(false);
    };

    return (
        <div className="block justify-items-center bg-green-200 justify-center h-[100vh] pt-[150px]">
            <div className="block bg-white w-[400px] justify-center px-[40px] py-[40px] rounded-md">
                <div className="flex justify-center mb-5">
                    <div className="text-4xl font-bold text-green-400">Weather App</div>
                </div>
                <div className="flex justify-center">
                    <input
                        className="h-[40px] w-full border-solid border-[3px]
             border-black rounded-lg bg-green-100 px-4"
                        placeholder="Enter city name..."
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <input
                        type="button"
                        className="bg-green-600 w-[120px] h-[45px] rounded-lg mb-5 font-semibold text-white"
                        onClick={() => handleSearch(cityName.trim())}
                        value="Search"
                    />
                </div>
                <div className="block justify-center w-full text-center">
                    {typeof weatherResult.main !== "undefined" ? (
                        <div className="bg-green-200 rounded-lg py-[10px]">
                            <div id="cityName" className="font-semibold text-2xl">
                                {weatherResult.name}
                            </div>
                            <div id="temp" className="text-xl">
                                {weatherResult.main.temp} °C
                            </div>
                            <div id="weather">
                                <div className="text-xl font-semibold text-gray-600">
                                    {weatherResult.weather[0].main}
                                </div>
                                <div className="text-sm">
                                    {weatherResult.weather[0].description}
                                </div>
                            </div>
                        </div>
                    ) : isFirst ? (
                        <div className="text-green-500 font-semibold pt-4">Welcome!</div>
                    ) : (
                        <div className="text-red-500 font-semibold pt-4">
                            City not found! Try another city.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
