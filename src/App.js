import React,{ useState , useEffect} from 'react';
import './App.css';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl, Card, CardContent } from '@material-ui/core';
import Map from './Map'
import Infoboxes from './Infoboxes'
import Table from './Table';
import {sortData} from './utils'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'
function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData, settableData] = useState([])
  const [casesType, setcasesType] = useState("cases")
  const [mapCenter, setmapCenter] = useState({lat:34.8042 , lng:-40.4796})
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([])
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all').then(res=>res.json()).then(data=>{
      setcountryInfo(data);
    })
  },[])
  useEffect(() => {
    const getCountryData = async ()=>{
     await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>response.json()).then((data)=>{
       const countries = data.map((country)=>(
         {
           name:country.country,
           value:country.countryInfo.iso2
         }
       ));
       const sortedData = sortData(data)
       settableData(sortedData)
       setcountries(countries)
       setmapCountries(data)
     });
    }
   getCountryData();
  }, [])
 
 
 
  const onCountryChange= async (e) => {
   const countryCode= e.target.value;
   console.log(countryCode)
    setcountry(countryCode)
    const url = countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url).then(res=>res.json()).then(data=>{
      console.log(data);
      setcountry(countryCode);
      setcountryInfo(data);
      setmapCenter([data.countryInfo.lat, data.countryInfo.long])
      setmapZoom(4)
    })
  }
  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
      <h1 className="head">Covid 19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" onChange={ onCountryChange } 
        value={country} >
         <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map((country)=>(
          <MenuItem  key={country.name} value={country.value}>{country.name}</MenuItem>
        ))}
          
      </Select>
      </FormControl>
    </div>
     <div className="app_stats">
       <Infoboxes isRed active={casesType==='cases'} title="Corona Cases" onClick={e=>setcasesType('cases')}  cases={countryInfo.todayCases} total={countryInfo.cases}/>
       <Infoboxes active={casesType==='recovered'} title="Recovered" onClick={e=>setcasesType('recovered')} cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
       <Infoboxes isRed title="Death" active={casesType==='deaths'}  onClick={e=>setcasesType('deaths')} cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
     </div>
     <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
     </div>
    <Card className="app_right">
     <CardContent>
       <h3>Live Cases by Country</h3>
       
     </CardContent>

          <Table countries={tableData} />
          <h3 className="app_right_h3">Worldwide New {casesType}</h3>

          <LineGraph casesType={casesType}/>
     </Card>
    </div>
  );
}

export default App;
