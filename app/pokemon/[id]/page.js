import React from 'react';
import NavBar from '../../components/NavBar';
import Image from 'next/image';


const getPokemon = async id => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const dt = await res.json()
    // console.log(dt);
    return dt
}

const PokemonDesc = async ({ params }) => {

    // console.log(params.id);

    const pokemon = await getPokemon(params.id);
    // console.log(pokemon);
    return (
        <>
            <NavBar />

            <section>
                <div>
                    <h1>{pokemon.name}</h1>

                    <div>
                        <div>
                            <p>ID #{pokemon.id}</p>
                            <p>HEIGHT: {pokemon.height}</p>
                            <p>WEIGHT: {pokemon.weight}</p>
                            <p>ABILITIES: {pokemon.abilities.map((a, i) => (
                                <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {a.ability.name}
                                </span>
                            ))}</p>
                            <p>TYPE: {pokemon.types.map((t, i) => (
                                <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {t.type.name}
                                </span>
                            ))}</p>
                        </div>

                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            width={200}
                            height={200}
                            // layout='fill'
                            objectFit="cover"
                            alt={pokemon.name + ' Image'}
                            className='m-auto'
                        />

                        <div className='grid'>

                            {pokemon.stats.map((s, i)=>(
                               <span className=''>
                                    {s.stat.name.toUpperCase()}: {s.base_stat}
                               </span> 


                            ))}
                        </div>


                    </div>
                </div>
            </section>

        </>

    );
}

export default PokemonDesc;
