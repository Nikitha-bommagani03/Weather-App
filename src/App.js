import React, { useState } from "react";
import "./Style.css"
export default function App() {
    const api = {
        key: "9b2cbf282ecff73342af64f2258cc486",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };
    const [search, setSearch] = useState("");
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    function searching() {
        setErrorMsg("Loading...");
        fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("City not found");
                }
                return res.json();
            })
            .then(result => {
                setData(result);
                setErrorMsg("");
                setSearch("");
            })
            .catch(error => {
                setErrorMsg(error.message);
                setData({}); 
            });
    }

    const usingKey = (e) => {
        if (e.key === "Enter") {
            searching();
        }
    };

    return (
        <>
            <div className="div1">
                <h1>WEATHER</h1><br />
                <input
                    onChange={e => {
                        setSearch(e.target.value);
                        setErrorMsg(""); 
                    }}
                    onKeyPress={usingKey}
                    type="text"
                    value={search} 
                />
                <button onClick={searching}>Search</button>
                <button onClick={() => { setData({}); setErrorMsg(""); setSearch(""); }}>Clear</button>
            </div>

            <div className="div1">
                {data.main ? (
                    <>
                        <h1>{data.name}</h1>
                        <p>Temperature: <b>{data.main.temp} &deg;C</b></p>
                    </>
                ) : (
                    <h3>{errorMsg}</h3>
                )}
            </div>
        </>
    );
}