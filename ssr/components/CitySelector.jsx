import React, { useState } from "react";
import cities from "../data/cities.json";

export default function CityAutocomplete({ onSelect }) {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      const matches = cities
        .filter((c) => c.city.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 10);
      setFiltered(matches);
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  const handleSelect = (city) => {
    setInput(`${city.city}, ${city.province}`);
    setShowList(false);
    onSelect(city);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        placeholder="City *"
        value={input}
        onChange={handleChange}
        required
      />
      {showList && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {filtered.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
              {city.city}, {city.province}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
