import { useState } from "react";

const api = {
    key: "545e9b4a434a53f40c19ffe791ae4e5a",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [cityName, setCityName] = useState("");

    const [weatherResult, setweatherResult] = useState(null);

    const handleSearch = (city) => {
        const trimmedCity = city.trim();
        if (!trimmedCity) return;
        fetch(`${api.base}weather?q=${trimmedCity}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setweatherResult(result);
            });
        setCityName("");
    };

    return (
        <div className="flex justify-center items-center bg-green-200 h-screen">
            <div className="bg-white w-1/2 md:w-1/3 justify-center px-10 py-10 rounded-md">
                <div className="flex justify-center mb-5">
                    <div className="text-4xl font-bold text-green-400">Weather App</div>
                </div>
                <div className="flex justify-center">
                    <input
                        className="h-10 w-full border-2 border-black
                         rounded-lg bg-green-100 px-4"
                        placeholder="Enter city name..."
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        className="bg-green-600 w-32 h-12 rounded-lg mb-5 text-lg font-semibold text-white"
                        onClick={() => handleSearch(cityName)}
                    >
                        Search
                    </button>
                </div>
                <div className="text-center">
                    {weatherResult === null ? (
                        <div className="text-green-500 font-semibold pt-4">Welcome!</div>
                    ) : typeof weatherResult.main !== "undefined" ? (
                        <div className="bg-green-200 rounded-lg py-2">
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
                                <div className="text-lg">
                                    {weatherResult.weather[0].description}
                                </div>
                            </div>
                        </div>
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
