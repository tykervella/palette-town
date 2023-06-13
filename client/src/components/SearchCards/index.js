import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiRefreshCcw } from "react-icons/fi";

const handleRefreshHover = (event) => {
  event.currentTarget.querySelector(".refresh-icon").classList.toggle("spin");
};

const SearchCards = ({ onSearch }) => {
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("0");
  const [cardSubtype, setCardSubtype] = useState("0");
  const [cardColor, setCardColor] = useState("0");

  useEffect(() => {
    const storedCardName = sessionStorage.getItem("cardName");
    if (storedCardName) {
      setCardName(storedCardName);
    }

    const storedCardType = sessionStorage.getItem("cardType");
    if (storedCardType) {
      setCardType(storedCardType);
    }

    const storedCardSubtype = sessionStorage.getItem("cardSubtype");
    if (storedCardSubtype) {
      setCardSubtype(storedCardSubtype);
    }

    const storedCardColor = sessionStorage.getItem("cardColor");
    if (storedCardColor) {
      setCardColor(storedCardColor);
    }
  }, []);

  const handleSearchClick = () => {
    onSearch(cardName, cardType, cardSubtype, cardColor);
  };

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
  
    if (inputName === "cardName") {
      setCardName(inputValue);
      sessionStorage.setItem("cardName", inputValue);
    } else if (inputName === "cardType") {
      setCardType(inputValue);
      sessionStorage.setItem("cardType", inputValue);
      
      // Reset cardSubtype and cardColor when cardType changes
      setCardSubtype("0");
      sessionStorage.setItem("cardSubtype", "0");
      setCardColor("0");
      sessionStorage.setItem("cardColor", "0");
  
    } else if (inputName === "cardSubtype") {
      setCardSubtype(inputValue);
      sessionStorage.setItem("cardSubtype", inputValue);
    } else if (inputName === "cardColor") {
      setCardColor(inputValue);
      sessionStorage.setItem("cardColor", inputValue);
    }
  };
  

  const handleRefresh = () => {
    sessionStorage.removeItem("cardName");
    sessionStorage.removeItem("cardType");
    sessionStorage.removeItem("cardSubtype");
    sessionStorage.removeItem("cardColor");
    window.location.reload();
  };

  return (
    <Container
      className="col-span-2 flex flex-wrap items-center mb-4"
      style={{ padding: "10px" }}
    >
      {/* Search Bar + Filters */}
      <div className="search-container col-span-6 w-full flex items-center">
        <input
          id="searchbar"
          className="appearance-none bg-transparent border-b-2 border-[#376D5B] py-2 px-3 text-white focus:outline-none"
          placeholder="Search for cards..."
          name="cardName"
          value={cardName}
          onChange={handleInputChange}
        />
        <div className="flex items-center ml-2 space-x-2">
          <button
            className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold p-2 rounded focus:outline-none focus:shadow-outline"
            id="searchbtn"
            onClick={handleSearchClick}
          >
            Search
          </button>
          {/* Refresh Button */}
          <button
            className="bg-[#FFEC99] hover:bg-[#AFD7CA] font-bold py-2 px-4 rounded-lg flex items-center"
            onClick={handleRefresh}
            onMouseEnter={handleRefreshHover}
            onMouseLeave={handleRefreshHover}
          >
            <FiRefreshCcw className="mr-2 refresh-icon" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Select Type dropdown */}
      <div className="mt-4 col-span-2" id="selectType">
        <select
          className="rounded-l appearance-none py-2 px-2 border border-gray-300 bg-white text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
          name="cardType"
          value={cardType}
          onChange={handleInputChange}
        >
          <option value="0" className="">
            N/A
          </option>
          <option value="pokemon" className="">
            Pokemon
          </option>
          <option value="trainer" className="">
            Trainer
          </option>
          <option value="energy" className="">
            Energy
          </option>
        </select>
      </div>

      {/* Select subtype dropdown */}
      {/* Only shows dropdown menu if type is trainer or pokemon */}
      {["trainer", "pokemon"].includes(cardType) && (
        <div className="mt-4 ml-2 flex items-center" id="selectSubtype">
          <select
            className="rounded-l appearance-none py-2 px-2 border border-gray-300 bg-white text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
            name="cardSubtype"
            value={cardSubtype}
            onChange={handleInputChange}
          >
            <option value="0" className="">
              N/A
            </option>

            {/* Render subtype options based on selected card type */}
            {cardType === "pokemon" && (
              <>
                <option value="BREAK" className="">
                  BREAK
                </option>
                <option value="Baby" className="">
                  Baby
                </option>
                <option value="Basic" className="">
                  Basic
                </option>
                <option value="EX" className="">
                  EX
                </option>
                <option value="GX" className="">
                  GX
                </option>
                <option value="LEGEND" className="">
                  LEGEND
                </option>
                <option value="Level-Up" className="">
                  Level-Up
                </option>
                <option value="MEGA" className="">
                  MEGA
                </option>
                <option value="Restored" className="">
                  Restored
                </option>
                <option value="Stage1" className="">
                  Stage 1
                </option>
                <option value="Stage2" className="">
                  Stage 2
                </option>
                <option value="TAG-TEAM" className="">
                  TAG TEAM
                </option>
                <option value="V" className="">
                  V
                </option>
                <option value="VMAX" className="">
                  VMAX
                </option>
              </>
            )}
            {cardType === "trainer" && (
              <>
                <option value="Item" className="">
                  Item
                </option>
                <option value="Pokémon Tool" className="">
                  Pokémon Tool
                </option>
                <option value="Stadium" className="">
                  Stadium
                </option>
                <option value="Supporter" className="">
                  Supporter
                </option>
                <option value="Technical Machine" className="">
                  TM
                </option>
              </>
            )}
          </select>
        </div>
      )}

      {/* Select color dropdown */}
      {cardType === "pokemon" && (
        <div className="mt-4 ml-2 flex items-center" id="selectColor">
          <select
            className="rounded-l appearance-none py-2 px-2 border border-gray-300 bg-white text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
            name="cardColor"
            value={cardColor}
            onChange={handleInputChange}
          >
            <option value="0" className="">
              N/A
            </option>
            <option value="Colorless" className="">
              Colorless
            </option>
            <option value="Darkness" className="">
              Darkness
            </option>
            <option value="Dragon" className="">
              Dragon
            </option>
            <option value="Fairy" className="">
              Fairy
            </option>
            <option value="Fighting" className="">
              Fighting
            </option>
            <option value="Fire" className="">
              Fire
            </option>
            <option value="Grass" className="">
              Grass
            </option>
            <option value="Lightning" className="">
              Lightning
            </option>
            <option value="Metal" className="">
              Metal
            </option>
            <option value="Psychic" className="">
              Psychic
            </option>
            <option value="Water" className="">
              Water
            </option>
          </select>
        </div>
      )}
    </Container>
  );
};

export default SearchCards;
