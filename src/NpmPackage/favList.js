import React from 'react';
import style from './favList.module.css';

function Favourites() {
    const favorite = localStorage.getItem('favorites');
    const favList = JSON.parse(favorite ?? '[]');

    return (
        <>
            <div className={style.favContainer} >
                <h2 className={style.heading}>Favorite Packages</h2>
             
                <table>
                    <thead>
                        <th>Package Name</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {
                            favList.map((favorite) => (
                                <>
                                    <tr>
                                        <td>{favorite.packageName }</td>
                                        <td>{favorite.description}</td>
                                    </tr>
                                </>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Favourites;
