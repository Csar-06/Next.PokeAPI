import Image from 'next/image'

const fetchPokemon = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await res.json();
  console.log(data.results);
  return data.results
};

const fetchPokemonInfo = async (pokeInfo) => {
  let fetchedPokeInfo = [];
  for (let p of pokeInfo) {
    const res = await fetch(p.url)
    const data = await res.json()
    // console.log(data.id);
    fetchedPokeInfo.push(data)
  }
  console.log(fetchedPokeInfo);
  return fetchedPokeInfo
  // console.log(pokeInfo);  

}
// const fetchPokemonInfo =  (pokemon) => {
//   let pokeInfo= pokemon.map(async pokemon => {
//     const res = await fetch(pokemon.url)
//     const data = await res.json();
//     // console.log(data); 
//     // console.log(data.moves); 
//     // console.log(data.id);
//     // console.log(data.abilities);
//     // console.log(data.types);
//     return data.id
//   })
//     console.log(pokeInfo);    
// }
const page = async () => {
  const pokemon = await fetchPokemon();
  const pokeInfo = await fetchPokemonInfo(pokemon);
  const res = null;
  const data = null
  // const pokemonInfo = await fetchPokemonInfo(pokemon);
  return (
    <div>
      <h1>POKÉDEX</h1>
      <ul>
        {
          pokeInfo.map((pokemon) => (
            <li>
              <div>
                <span>{pokemon.id}</span>
                <h4>{pokemon.name}</h4>
                <Image
                  src={pokemon.sprites.front_default}
                  width={250}
                  height={250}
                />
                <div>
                  {
                    <div>
                      {
                        pokemon.types.map(type => {
                          return <p>{type.type.name}</p>
                        })
                      }
                    </div>
                  }
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div >
  );
};

export default page;