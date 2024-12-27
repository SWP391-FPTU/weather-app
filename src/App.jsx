import { useState } from "react";

const api = {
    key: "f2a53c1b28be5817cb62ef25ae9f16e8",
    base: "http://api.openweathermap.org/data/2.5/",
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

    return (
        <div className="bg-fuchsia-100 h-screen flex flex-col items-center justify-center text-center">
            <header className="bg-white p-8">
                {/* HEADER */}
                <h1 className="text-3xl font-bold mb-4 text-rose-400">Weather App</h1>

                {/* Search box */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        className="p-2 border rounded-lg mr-2"
                        placeholder="Search city..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-rose-400 text-white px-4 py-2 rounded-lg "
                        onClick={searchPressed}
                    >
                        Search
                    </button>
                </div>

                {typeof weather.main !== "undefined" ? (
                    <div className="bg-zinc-100 shadow-md rounded-lg p-6 text-center mt-4">
                        {/* Location */}
                        <p className="text-2xl font-semibold text-gray-700 mb-2">{weather.name}</p>

                        {/* Temperature */}
                        <p className="text-xl text-gray-600 mb-2">{weather.main.temp} °C</p>

                        {/* Condition */}
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
