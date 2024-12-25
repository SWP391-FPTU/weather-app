import { useState } from "react";

const api = {
    key: "545e9b4a434a53f40c19ffe791ae4e5a",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [search, setSearch] = useState("");

    const [weather, setWeather] = useState({});

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setWeather(result);
            });
    };
    //

    return (
        <div className="App bg-blue-50 min-h-screen flex items-center justify-center">
            <header className="App-header bg-white shadow-lg rounded-lg p-8 text-center">
                {/*Header*/}
                <h1 className="text-4xl font-bold text-blue-600 mb-6">Weather App</h1>

                {/*Search box*/}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={searchPressed}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                    >
                        Search
                    </button>
                </div>

                {/*If weather is undefined*/}
                {typeof weather.main !== "undefined" ? (
                    <div className="bg-gray-100 shadow-md rounded-lg p-6 text-center mt-4">
                        {/*Location*/}
                        <p className="text-2xl font-semibold text-gray-700 mb-2">{weather.name}</p>

                        {/*Temperature*/}
                        <p className="text-xl text-gray-600 mb-2">{weather.main.temp} °C</p>

                        {/*Condition (Sunny)*/}
                        <p className="text-lg font-medium text-gray-500">
                            {weather.weather[0].main}
                        </p>

                        <p className="text-sm text-gray-400">({weather.weather[0].description})</p>
                    </div>
                ) : (
                    <div className="text-red-500 font-medium mt-6">
                        City not found! Please try another search.
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
