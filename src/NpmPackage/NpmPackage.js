import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './NpmPackage.module.css';

function NpmSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [descriptions, setDescriptions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm !== '') {
            fetch(`https://api.npms.io/v2/search?q=${searchTerm}`)
                .then((response) => response.json())
                .then((data) => setSearchResults(data.results))
                .catch((error) => console.log(error));
        }
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddToFavorites = (packageName) => {
        const newFavorite = {
            packageName: packageName,
            description: descriptions[packageName],
        };
        setFavorites([...favorites, newFavorite]);
        localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
    };

    const handleDescriptionChange = (packageName, description) => {
        setDescriptions({
            ...descriptions,
            [packageName]: description,
        });
    };

    useEffect(() => {
        const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
        if (favoritesFromLocalStorage) {
            setFavorites(favoritesFromLocalStorage);
        }
    }, []);

    return (
        <div className={style.npmContainer} >
            <div className={style.text}>
                <h2 onClick={() => navigate('/fav')} className={style.favList}>Go To Fav List</h2>
            </div>
            <div className={style.searchContainer}>
                <div className={style.search}>
                <h1 className={style.searchNpm}>NPM Package Search</h1>
                <input type="text" value={searchTerm} onChange={handleInputChange} className={style.inputText} />
                </div>
                <div >
                <ul className={style.results}>
                    {searchResults.map((result) => (
                        <li key={result.package.name} className={style.lists}>
                            <button onClick={() => handleAddToFavorites(result.package.name)} className={style.add}>Add to Favorites</button>
                            <span className={style.name}>{result.package.name}</span>
                            <textarea
                                className={style.textArea}
                                placeholder="Why is this package your favorite?"
                                value={descriptions[result.package.name] || ''}
                                onChange={(event) => handleDescriptionChange(result.package.name, event.target.value)}
                            />
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default NpmSearch;






















