import React from 'react'
import HisRAM from './Graph/HistorialRAM'
import HisCPU from './Graph/HistorialCPU'

const Historial = () => {
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
                        {HisRAM()}
                      </div>
                    </h3>
                  </center>
                </td>
                <td>
                  <center>
                    <h3>
                      {HisCPU()}
                    </h3>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    </div>
  )
}

export default Historial