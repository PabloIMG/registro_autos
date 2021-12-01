import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Componente = () => {

    const [patente, setPatente] = useState("")
    const [anio, setAnio] = useState("")
    const [marcas, setMarcas] = useState([])
    const [marca, setMarca] = useState("")
    const [autos, setAutos] = useState([])
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
                //alert(response.data)
                console.log(response.data.autoconmarca)
                setAutos(response.data.autoconmarca)
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
                //alert(response.data)
                //console.log(response.data)
                setMarcas(response.data.marca)
            }
        } catch (error) {
            console.error(error)
        }
    }
/*
    const getMarca = (id) => {
        try {
            const response = axios.get(`http://localhost:5000/api/marca/${id}`)
            if (response.status == 200){
                alert(response.data.marca.nombre)
                setMarca(response.data.marca.nombre)
                return response.data.marca.nombre
            }
        } catch (error) {
            console.error(error)
        }
    }
*/
    function guardarAuto(){
        axios.post('http://localhost:5000/api/autos', {
            patente: patente,
            anio: anio,
            idMarca: marca
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
            anio: anio,
            id_marca: marca._id
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
        getAutos()
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
                        <select class="border border-primary rounded mb-3" type="text" name="marca" onChange={handleInputChangeMarca}>
                            {marcas.map((marca) => (
                                <option value={marca._id}>{marca.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button class="btn btn-primary mb-3" onClick={guardarAuto}>GUARDAR</button>
                    </div>

                    <div className="autos">
                        <table class="border border-warning">
                            <thead class="bg-warning text-white">
                                <td><b>MARCA</b></td>
                                <td><b>PATENTE</b></td>
                                <td><b>AÑO</b></td>
                            </thead>
                            {autos.map((auto) => (
                                <tbody>
                                    <td>{ auto.marca.nombre }</td>
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