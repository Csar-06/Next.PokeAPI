"use client"
import React, { useState, useEffect } from 'react';

const Pokedex = () => {
    // const [pokemon, setpokemon] = useState([]);
    // const [pokemonData, setPokemonData] = useState([]);
    // let pokemonDt = []
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
            const data = await res.json();
            // console.log(data.results);
            // setpokemon(prevData => [...prevData, ...data.results]);
            // setOffset(prevOffset => prevOffset + 20);
            return data.results
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
        setLoading(false);
    };

    const fetchPokemonData = async (pk) => {
        try {
            setLoading(true)
            const newData = []
            for (let p of pk) {
                const res = await fetch(p.url);
                const dt = await res.json();
                console.log('hola');
                newData.push(dt)
            }
            const data = await Promise.all(newData)
            return data;
            // setPokemonData(newData)


        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
        setLoading(false)
    };

    // useEffect(() => {
    //     console.log('useEffect');
    //     fetchPokemon();
    //     fetchPokemonData(pokemon)

    // }, []);

    const pokemon = fetchPokemon();
    const pokemonDt = fetchPokemonData(pokemon)
    console.log(fetchPokemonData(pokemon));


    useEffect(() => {
        console.log('useEffect scroll');
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            fetchPokemon();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    // let pokemonData = fetchPokemonData()

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {/* {pokemon.map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li>
                ))} */
                    pokemonDt.map(p => (
                        <li>{p.name}</li>
                    ))
                }
            </ul>
            {
                // pokemonData.map(pokeData =>(
                //     <p>{pokeData.name}</p>
                // ))
            }
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default Pokedex;
