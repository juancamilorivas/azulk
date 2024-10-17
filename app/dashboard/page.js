"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function Page() {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [originalData, setOriginalData] = useState([]);



  //llamada a la api en la primera carga 
  useEffect(() => {
    const fetchExample = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (response.ok) {
          const jsonData = await response.json();
          setFilteredData(jsonData);
          setOriginalData(jsonData);
          setIsLoading(false);
        } else {
          setError("error en la lamada");
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchExample();
  }, []);


  // Función para ordenar por nombre
  const sortName = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.name.common.localeCompare(a.name.common);
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Función para ordnar como estaba dede el princio solo agarra el estado incial que se guardo en el fetch
  const resetOrder = () => {
    setFilteredData(originalData);
  };

  // Funcin filtrar por letras escritas en el input
  const filterCountries = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = originalData.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };


  if (isLoading) {
    return <div>Cargando!</div>;
  }

  if (error) {
    return <div>Error! {error}</div>;
  }

  return (
    <div className="p-4 bg-slate-400">
      <h1 className="text-4xl font-bold mb-4">Listado de paises</h1>
      <p className=" mb-4">
        Ingresa el pais que quieras para realizar el filtrado
      </p>

      <div className="mb-4">
        {/* input filtrar*/}
        <input
          type="text"
          placeholder="Buscar país..."
          onChange={filterCountries}
          className="mb-4 p-2 border mr-2 border-gray-300 rounded-md"
        />

        {/* ordenar */}
        <button
          onClick={sortName}
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
        >
          Ordenar A-Z
        </button>

        {/* reordenar */}
        <button
          onClick={resetOrder}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Restaurar
        </button>
      </div>

      {/* grid paises */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredData.map((country) => (
          <div
            key={country.cca3}
            className="p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <Image
              src={country.flags.png}
              alt={`Bandera de ${country.name.common}`}
              className="mb-2"
              width={20}
              height={20}
              unoptimized
            />
            <h2 className="text-lg font-semibold">{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
