import React, { Component } from 'react'
import './App.scss'
import patientData from './'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      flag: false,
      docNames: [],
      currName: null,
      email: null,
      schedules: []
    }
  }
  componentDidMount() {
    fetch('https://s3-us-west-1.amazonaws.com/woobin-notable-test/doctors.json')
    .then(res => res.json())
    .then(docName => {
      this.setState({
        docNames: docName.data
      })
    })
  }
  getSchedule = (e) =>{
    let docName = e.target.dataset.name
    console.log(docName)
    fetch('https://s3-us-west-1.amazonaws.com/woobin-notable-test/data.json')
    .then(res => res.json())
    .then(result => {
        
        result = result.patientData
        console.log(result);
        if(docName === "Hibbert"){
          this.setState({
            flag: true,
            currName: result[0].name,
            email: result[0].email,
            schedules: result[0].schedule
          });
        }
        if(docName === "Krieger"){
          this.setState({
            flag: true,
            currName: result[1].name,
            email: result[1].email,
            schedules: result[1].schedule
          });
        }
        if(docName === "Riviera"){
          this.setState({
            flag: true,
            currName: result[2].name,
            email: result[2].email,
            schedules: result[2].schedule
          });
        }
      },
      (error) => {
        this.setState({
          flag: false,
          error
        });
      }
    )
  }
  
  render() {
    const { currName, email, schedules, flag, docNames } = this.state
    return (
      <div className="App">
        <h1 className="tx-center">Notable Calender</h1>
        <section>
          <div className="cal-wrapper">
            <div className="inner flex">
              <div className="left left-list">
                <div className="inner inner-con grey-bg">
                  <h4 className="logo">notable</h4>
                  <div className="content">
                    <p>PHISICIANS</p>
                    <ul>
                      {
                        !docNames.length ? <div>LOADING DATA...</div> :
                        docNames.map( d => (<li key={docNames.indexOf(d)} className={ currName === d.name ? 'blue-bg' : ''} data-name={d.name} onClick={this.getSchedule}>{d.name}</li>))
                      }
                    </ul>
                    <div className="btn-wrapper">
                      <button>LOGOUT</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right right-result">
                {
                  schedules.length ?
                  <div className="inner">
                  <h4>Dr. {currName}</h4>
                  <p>{email}</p>
                  <div className="table-wrapper">
                    <div className="table-header flex">
                      <div className="col">#</div>
                      <div className="col">Name</div>
                      <div className="col-40">Time</div>
                      <div className="col-40">Kind</div>
                    </div>
                      {schedules.map( s => {
                        let key = schedules.indexOf(s)

                        return (<div className="table-inner flex" key={key}>
                          <div className="col">{key + 1}</div>
                          <div className="col">{s.name}</div>
                          <div className="col-40">{s.time}</div>
                          <div className="col-40">{s.kind}</div>
                        </div>)
                      })}
                    </div>
                  </div>
                  : <div className="inner">Select PHISICIANS's name from the left list</div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
