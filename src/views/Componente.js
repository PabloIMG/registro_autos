import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Componente = () => {

    const [patente, setPatente] = useState("")
    const [anio, setAnio] = useState("")
    const [marcas, setMarcas] = useState([])
    const [marca, setMarca] = useState("")

    const [auto, setAuto] = useState([])

    const handleInputChangePatente = (event) => {
        setPatente(event.target.value)
    }

    const handleInputChangeAnio = (event) => {
        setAnio(event.target.value)
    }

    const handleInputChangeMarca = (event) => {
        setMarca(event.target.value)
    }

    async function getAutos(){
        try {
            const response = await axios.get('http://localhost:5000/api/autos')
            if (response.status == 200){
                setAuto(response.data.auto)
            }
        }
        catch (error){
            console.error(error)
        }
    }

    async function getMarcas(){
        try {
            const response = await axios.get('http://localhost:5000/api/marcas')
            if (response.status == 200){
                setMarcas(response.data.marcas)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function guardarAuto(){
        axios.post('http://localhost:5000/api/autos', {
            patente: patente,
            anio: anio
        })
        .then(function (response){
            if (response.status == 200){
                alert("Auto registrado correctamente")
                getAutos()
            }
            else {
                alert("Error al guardar")
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }


    const enviarDatos = () => {

        let nuevo =
        {
            patente: patente,
            anio: anio
        }

        //* Validar datos ingresados.
        if(patente.length < 6 || patente.length > 6)
        {
            alert("Por favor ingresar datos correctamente!!");
        }
        else{
            setAuto(auto => [...auto,nuevo])
        }

        setPatente("")
        setAnio("")
        setMarca("")
    }
    useEffect(() => {
        getMarcas()
    }, [])

    return(
        <Fragment>
            <div class="container">
                <div class="row">
                    <h1>Registro de autos</h1>

                    <div>
                        <p class="mb-0">PATENTE</p>
                        <input class="border border-primary rounded mb-2" type="text" name="patente" onChange={handleInputChangePatente} value={patente}></input>
                    </div>
                    
                    <div>
                        <p class="mb-0">AÑO</p>
                        <input class="border border-primary rounded mb-2" type="text" name="anio" onChange={handleInputChangeAnio} value={anio}></input>
                    </div>

                    <div>
                        <p class="mb-0">MARCA</p>
                        <select class="border border-primary rounded mb-3" type="text" name="select">
                            {marcas.map((marca) => (
                                <option value={marca._id}>{marca.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button class="btn btn-primary mb-3" onClick={enviarDatos}>GUARDAR</button>
                    </div>

                    <div className="autos">
                        <table class="border border-warning">
                            <thead class="bg-warning text-white">
                                <td><b>MARCA</b></td>
                                <td><b>PATENTE</b></td>
                                <td><b>AÑO</b></td>
                            </thead>
                            {auto.map((auto) => (
                                <tbody>
                                    <td>{auto.id_marca}</td>
                                    <td>{auto.patente}</td>
                                    <td>{auto.anio}</td>
                                </tbody>
                            ))}
                        </table>
                    </div>

                </div>
            </div>

        </Fragment>
    )

}

export default Componente