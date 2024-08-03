import { useState } from "react";
import "./App.css";
import { useGetPokemonByNameQuery } from "../lib/redux/services/pokemon";
import FilteredTable from "../components/table/FilteredTable";
import SideBar from "../components/SideBar";
function App() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  console.log(data);
  return (
    <>
      <div style={{ padding: 20 }}>
        <FilteredTable />
      </div>
      <SideBar />
    </>
  );
}

export default App;
