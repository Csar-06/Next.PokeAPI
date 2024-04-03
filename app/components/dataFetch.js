// "use client"
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Loading from './Loading';

// const Pokedex = () => {
//     const [pokemon, setpokemon] = useState([]);
//     const [pokemonData, setPokemonData] = useState([]);
//     const [offset, setOffset] = useState(0);
//     const [loading, setLoading] = useState(false);

//     const fetchPokemon = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
//             const data = await res.json();
//             // console.log(data.results);
//             setpokemon(prevData => [...prevData, ...data.results]);
//             setOffset(prevOffset => prevOffset + 20);
//         } catch (error) {
//             console.error('Error fetching Pokémon data:', error);
//         }
//         setLoading(false);
//     };

//     const fetchPokemonData = async () => {
//         setLoading(true)
//         try {
//             const promises = pokemon.map(async p => {
//                 const res = await fetch(p.url);
//                 return res.json();
//             });
//             const data = await Promise.all(promises);
//             setPokemonData(data);

//         } catch (error) {
//             console.error('Error fetching Pokémon data:', error);
//         }
//         setLoading(false)
//     };


//     useEffect(() => {
//         console.log('useEffect fetch Pokemon');
//         fetchPokemon()
//     }, []);

//     useEffect(() => {
//         console.log('useEffect fetch Pokemon Data');
//         fetchPokemonData()
//     }, [pokemon]);



//     useEffect(() => {
//         console.log('useEffect scroll');
//         const handleScroll = () => {
//             if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
//             fetchPokemon();
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [loading]);


//     return (
//         <div>
//             <h1>Pokémon List</h1>
//             <ul>
//                 {
//                     // pokemon.map((pokemon, index) => (
//                     //     <li key={index}>{pokemon.name}</li>
//                     // ))
//                     pokemonData.map((p, index) => (
//                         <li key={index}>
//                             <div>
//                                 <Image
//                                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
//                                     width={250}
//                                     height={250}
//                                     alt={p.name + ' Image'}
//                                 />

//                                 <div>
//                                     <h4>{p.name}</h4>
//                                     <div>
//                                         <h5>Height:</h5>
//                                         <p>{p.height}</p>

//                                         <h5>Weight:</h5>
//                                         <p>{p.weight}</p>
//                                     </div>
//                                     <ul>
//                                         <li>
//                                             {p.types.map((t, index) => (
//                                                 <p key={index}>{t.type.name}</p>
//                                             ))}
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </li>
//                     ))

//                 }
//             </ul>
//             {loading && <Loading />}
//         </div>
//     );
// }

// export default Pokedex;


"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from './Loading';


const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
            const data = await res.json();
            console.log('Data fetched with offset:', offset);
            setPokemon(prevData => [...prevData, ...data.results]);
            setOffset(prevOffset => prevOffset + 20);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPokemonData = async () => {
        setLoading(true);
        try {
            const promises = pokemon.map(async p => {
                const res = await fetch(p.url);
                return res.json();
            });
            const data = await Promise.all(promises);
            setPokemonData(data);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (offset === 0) {
            console.log('useEffect fetch Pokemon');
            const timeoutId = setTimeout(() => {
                fetchPokemon();
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [offset]);


    useEffect(() => {
        console.log('useEffect fetch Pokemon Data');
        fetchPokemonData();
    }, [pokemon]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            fetchPokemon();
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    return (
        <div className="m-60 mx-5 grid sm:grid-cols-1 md:grid-cols-3 md:mx-7 lg:grid-cols-4 lg:mx-28  gap-4 ">
            {pokemonData.map((p, index) => (
                
                <div key={index} className=" p-1 bg-white rounded-lg overflow-hidde shadow-transparent mb-5 md:mx-4 lg:mx-8 transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-700">
                    <div className="relative h-44 ">
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                            width={200}
                            height={200}
                            // layout='fill'
                            objectFit="cover"
                            alt={p.name + ' Image'}
                            className='m-auto'
                        />
                    </div>
                    <div className="p-4">
                        <h4 className="text-xl font-bold mb-2">{p.name}</h4>
                        <div>
                            <h5 className="text-lg">Height:</h5>
                            <p>{p.height}</p>
                            <h5 className="text-lg">Weight:</h5>
                            <p>{p.weight}</p>
                        </div>
                        <div className="mt-4">
                            {p.types.map((t, index) => (
                                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            {loading && <Loading />}
        </div>
    );
};

export default Pokedex;