import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiRefreshCcw } from 'react-icons/fi';

// refresh icon spin effect
const handleRefreshHover = (event) => {
    event.currentTarget.querySelector('.refresh-icon').classList.toggle('spin');
};

const CategoryMenu = ({ onSearch, onSort }) => {
    const [cardName, setCardName] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const storedCardName = localStorage.getItem('cardName');
        if (storedCardName) {
            setCardName(storedCardName);
        }
    }, []);

    const handleSearchClick = () => {
        onSearch(cardName, selectedTypes, selectedColors);
    };

    const handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName === 'cardName') {
            setCardName(inputValue);
            localStorage.setItem('cardName', inputValue);
        }
    };

    const handleTypeChange = (event) => {
        const typeValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedTypes((prevTypes) => [...prevTypes, typeValue]);
        } else {
            setSelectedTypes((prevTypes) =>
                prevTypes.filter((type) => type !== typeValue)
            );
        }
    };

    const handleColorChange = (event) => {
        const colorValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors((prevColors) => [...prevColors, colorValue]);
        } else {
            setSelectedColors((prevColors) =>
                prevColors.filter((color) => color !== colorValue)
            );
        }
    };

    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);
        onSort(selectedSortOption);
    }

    const handleRefresh = () => {
        localStorage.removeItem('cardName');
        setSelectedTypes([]);
        setSelectedColors([]);
        setSortOption('');
        window.location.reload();
    };

    return (
        <Container className="bg-[#0B3C49] rounded-3xl shadow-xl">
            {/* Search Bar */}
            <Row>
                <Col className="search-container flex items-center">
                    <input
                        id="searchbar"
                        className="m-4 bg-transparent border-b-2 w-full border-[#376D5B] text-white focus:outline-none resize-none"
                        placeholder="Search for cards..."
                        name="cardName"
                        value={cardName}
                        onChange={handleInputChange}
                    />
                    <button className="bg-[#FFEC99] hover:bg-[#4B957E] font-bold py-2 px-4 rounded-lg" id="searchbtn" onClick={handleSearchClick}>
                        Search
                    </button>
                </Col>
            </Row>

            {/* start of middle row */}
            <Row>
                {/* left column */}
                {/* Select Type checkboxes */}
                <Col className="text-white">

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="pokemon"
                                checked={selectedTypes.includes('pokemon')}
                                onChange={handleTypeChange}
                                className='mr-2'
                            />
                            Pokemon
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="trainer"
                                checked={selectedTypes.includes('trainer')}
                                onChange={handleTypeChange}
                                className='mr-2'
                            />
                            Trainer
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="energy"
                                checked={selectedTypes.includes('energy')}
                                onChange={handleTypeChange}
                                className='mr-2'
                            />
                            Energy
                        </label>
                    </div>

                    {/* Select Color checkboxes */}
                    {selectedTypes.includes('pokemon') && (
                        <div className="col-span-12 w-full">
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Colorless"
                                        checked={selectedColors.includes('Colorless')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Colorless
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Darkness"
                                        checked={selectedColors.includes('Darkness')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Darkness
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Dragon"
                                        checked={selectedColors.includes('Dragon')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Dragon
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Fairy"
                                        checked={selectedColors.includes('Fairy')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Fairy
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Fighting"
                                        checked={selectedColors.includes('Fighting')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Fighting
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Fire"
                                        checked={selectedColors.includes('Fire')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Fire
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Grass"
                                        checked={selectedColors.includes('Grass')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Grass
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Lightning"
                                        checked={selectedColors.includes('Lightning')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Lightning
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Metal"
                                        checked={selectedColors.includes('Metal')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Metal
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Psychic"
                                        checked={selectedColors.includes('Psychic')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Psychic
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Water"
                                        checked={selectedColors.includes('Water')}
                                        onChange={handleColorChange}
                                        className='mr-2'
                                    />
                                    Water
                                </label>
                            </div>
                        </div>
                    )}
                </Col>
                
                {/* right column */}
                <Col>
                    {/* Sort options */}
                    <select value={sortOption} onChange={handleSortChange} className='rounded-lg p-1 mt-2'>
                        <option value="">Sort by...</option>
                        <option value="nameAsc">Name (A-Z)</option>
                        <option value="nameDesc">Name (Z-A)</option>
                        <option value="priceAsc">Price (Low to High)</option>
                        <option value="priceDesc">Price (High to Low)</option>
                    </select>
                </Col>

            </Row>

            {/* Refresh Button */}
            <Row>
                <div className="col-span-12 flex justify-end">
                    <button
                        className="bg-[#FFEC99] hover:bg-[#4B957E] font-bold py-2 px-4 mb-4 mt-2 rounded-lg flex items-center"
                        onClick={handleRefresh}
                        onMouseEnter={handleRefreshHover}
                        onMouseLeave={handleRefreshHover}>
                        <FiRefreshCcw className="mr-2 refresh-icon" />
                        Reset Filters
                    </button>
                </div>
            </Row>

        </Container>
    )
};

export default CategoryMenu;