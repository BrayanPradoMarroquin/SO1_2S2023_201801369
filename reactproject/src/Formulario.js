import React, { useState } from 'react';

const Formulario = () => {
  const [valores, setValores] = useState({
    titulo: '',
    artista: '',
    fecha: '',
    genero: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValores((prevValores) => ({
      ...prevValores,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envía los valores como un objeto JSON
    const jsonValores = JSON.stringify(valores);
    console.log('Valores enviados:', jsonValores);

    // Puedes realizar aquí una solicitud a un servidor para enviar los datos JSON si es necesario
    const url = 'http://localhost:8000/';

    const responde = fetch(url, {
        method: 'POST',
        body: jsonValores,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (responde.ok) {
        alert("Datos enviados");
    } else {
        alert("Error al enviar los datos");
    }
};

  return (
    <div>
      <h2>Formulario de 4 Valores</h2>
      <form onSubmit={handleSubmit}>
        <label>
          titulo:
          <input
            type="text"
            name="titulo"
            value={valores.titulo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Artista:
          <input
            type="text"
            name="artista"
            value={valores.artista}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Lanzamiento:
          <input
            type="text"
            name="fecha"
            value={valores.fecha}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Genero:
          <input
            type="text"
            name="genero"
            value={valores.genero}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;