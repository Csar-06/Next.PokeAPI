import React from 'react';
import NavBar from '../../components/NavBar';
import Image from 'next/image';
import { resolve } from 'styled-jsx/css';


const getPokemon = async id => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const dt = await res.json()
    // console.log(dt);
    return dt
}

const getEvolutionChain = async id =>{
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const dt = await res.json();
    console.log(dt.chain.evolves_to[0].evolves_to[0].species.url);
    const evo1 = dt.chain.evolves_to[0].evolves_to[0].species.url;
    const evo2 = dt.chain.evolves_to[0].species.url

    return [evo1, evo2]
}

const PokemonDesc = async ({ params }) => {

    // console.log(params.id);

    const pokemon = await getPokemon(params.id);
    const evolutionChain = await getEvolutionChain(params.id);
    // console.log(pokemon);
    return (
        <>
            <NavBar />

            <section className='text-white'>
                <div>
                    <h1 className='text-center mt-40 text-6xl font-bold'>{pokemon.name.toUpperCase()}</h1>

                    <div className='flex justify-around md:mx-auto md:my-10 lg:mx-auto my-28'>
                        <div className='text-xl flex  flex-col justify-around'>
                            <p className='font-bold'>ID# <span className='font-normal'>{pokemon.id}</span></p>
                            <p className='font-bold'>HEIGHT: <span className='font-normal'>{pokemon.height}</span></p>
                            <p className='font-bold'>WEIGHT: <span className='font-normal'>{pokemon.weight}</span></p>
                            <p className='flex flex-col w-32'>ABILITIES: {pokemon.abilities.map((a, i) => (
                                <span key={i} className="flex justify-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 my-1 ml-3">
                                    {a.ability.name}
                                </span>
                            ))}</p>
                            <p className='flex flex-row flex-wrap'>TYPE: {pokemon.types.map((t, i) => (
                                <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-2 relative top-10 right-14">
                                    {t.type.name}
                                </span>
                            ))}</p>
                        </div>

                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            width={500}
                            height={500}
                            // layout='fill'
                            objectFit="cover"
                            alt={pokemon.name + ' Image'}
                            className='flex justify-center md:w-56 h-56 '
                        />

                        <div className='flex flex-col justify-around text-xl'>

                            {pokemon.stats.map((s, i) => (
                                <span>
                                    <span className='font-bold'>{s.stat.name.toUpperCase()}</span>: {s.base_stat}
                                </span>


                            ))}
                        </div>


                    </div>
                </div>
            </section>

            <section>
                        
            </section>

        </>

    );
}

export default PokemonDesc;
