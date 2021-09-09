import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      res: [],
      links:"",
      searching: false
    }
  }
  getValue = (e)=>{
    console.log(e.target.value);
    this.setState({links:e.target.value})
  }
  getSummary = async()=>{
    this.setState({searching:true})
    //change the url after restarting the server in colab
    let res = await axios.post("http://c3f2-34-73-130-50.ngrok.io/data",{"msg":this.state.links.split(",")})
    this.setState({res:res.data,searching:false})
    console.log(this.state.res)
  }
  render()
  {
    return (
      <div className="App">
          <div style={{margin:'20px',display:'flex'}} class="form-group">
            <input onChange={(e)=>this.getValue(e)} name="links" style={{width:'90%',marginRight:'5px'}} type="text" class="form-control" id="usr" />
            <button style={{width:'10%'}} onClick={()=>this.getSummary()} class="btn btn-primary">Search</button>
          </div>
          { 
            this.state.res.length > 0 && this.state.searching==false ? <div style={{margin:'15px'}}> 
              {
                this.state.res.map((obj)=>{
                    return <div style={{backgroundColor:'wheat',borderRadius:'10px',border:'solid',padding:'10px',marginBottom:'15px'}}> 
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h6>Previous Length: {obj.prev_length}</h6>
                        <h6>Link: {obj.link}</h6>
                        <h6>Summarized Length: {obj.length}</h6>
                      </div>
                      
                      <p style={{textAlign:'justify'}}>{obj.text.replace('\\','')}</p>
                    </div>
                })
              }

            </div> : <div> </div>
          }
          {
            this.state.searching==true ? 
            <div> <button style={{color:'white',backgroundColor:'blue'}} class="btn btn-primary" disabled>
            <span class="spinner-grow spinner-grow-sm"></span>
              Please wait while we get the summary for the videos..
            </button> </div> : <div></div>
          }
      </div>
    );
  }
}

export default App;
