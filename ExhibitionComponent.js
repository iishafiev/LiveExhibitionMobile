import React from 'react';
import ExgibitionService from './ExgibitionService';

class ExgibitionComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Exgibitions:[]
    }
  }

  componentDidMount(){
    ExgibitionService.getExgibitions().then((response) => {
      this.setState({ Exgibitions: response.data})
    });
  }

  render (){
    return (
      <div>
        <h1 className = "text-center"> Exgibitions List</h1>
        <table className = "table table-striped">
          <thead>
          <tr>

            <td> Exgibition Id</td>
            <td> Exgibition First Name</td>
            <td> Exgibition Last Name</td>
            <td> Exgibition Email Id</td>
          </tr>

          </thead>
          <tbody>
          {
            this.state.Exgibitions.map(
              Exgibition=>
                <tr key = {Exgibition.id}>
                  <td> {Exgibition.id}</td>
                  <td> {Exgibition.name}</td>
                </tr>
            )
          }

          </tbody>
        </table>

      </div>

    )
  }
}

export default ExgibitionComponent
