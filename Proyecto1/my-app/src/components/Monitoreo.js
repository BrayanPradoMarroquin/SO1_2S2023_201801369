import React from 'react'
import Table from 'react-bootstrap/Table';
import contCPU from './Graph/CPU'
import contRAM from './Graph/RAM'
import axios from 'axios';
import { useEffect, useState } from 'react'

const Monitoreo = () => {
  const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/cpu')
        .then(respuesta => {
            setData(respuesta.data.data.process)
        })
        .catch(error => {
            console.log(error)
        });
    }, []);


  return (
    <div>
      <center><h1>Monitoreo</h1></center>
      <hr/>
      <div>
        <center>
          <table>
            <thead>
              <tr>
                <th><h2><center>MEMORIA RAM</center></h2></th>
                <th><h2><center>CPU</center></h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <center>
                    <h3>
                      <div>
                        {contRAM()}
                      </div>
                    </h3>
                  </center>
                </td>
                <td>
                  <center>
                    <h3>
                      {contCPU()}
                    </h3>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
        <br></br>
        <center>
          PID:
          <input type="text" name="pid" id="pid" />
          <button type="button" class="btn btn-primary">KILL</button>
        </center>
        <br></br>
        <center>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th><center>PID</center></th>
                <th><center>Procesos</center></th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                        <tr key={item.pid}>
                            <td>{item.pid}</td>
                            <td>{item.name}</td>
                        </tr>
              ))}
            </tbody>
          </Table>
        </center>
      </div>
    </div>
  )
}

export default Monitoreo