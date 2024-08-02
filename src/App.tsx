import { useState } from "react";
import "./App.css";
import { useGetPokemonByNameQuery } from "../lib/redux/services/pokemon";

function App() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  console.log(data);
  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
