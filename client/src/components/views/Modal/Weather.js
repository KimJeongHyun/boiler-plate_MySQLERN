import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import ReactDOM from 'react-dom'
import {weatherView} from '../../../_actions/user_action'


function Weather(){
    const [TempCelcius,setTempCelcius] = useState("")
    const [City,setCity] = useState("Seoul")
    const [Description,setDescription] = useState("")
    const [Icon, setIcon] = useState("")

    const onSetCityHandler = async (event) =>{
        await setCity(event.currentTarget.value);
    }

    const dispatch = useDispatch();
    const weatherFetch = async () => {
        await dispatch(weatherView(City))
        .then(response=>{
            const kelbinTemp = response.payload.main.temp;
            setTempCelcius((kelbinTemp-273.15).toFixed(1))
            setDescription(response.payload.weather[0].main)
            setIcon(response.payload.weather[0].icon);
        })

        const weatherRendering = () =>{
            let iconurl = "http://openweathermap.org/img/w/" + Icon + ".png";

            return (
                <div>
                    {TempCelcius}
                    <br/>
                    {Description}
                    <br/>
                    <img src={iconurl}/>
                </div>
            )
        }

        await ReactDOM.render(weatherRendering(),document.getElementById('WeatherContainer'));
    }

    useEffect(() =>{
        weatherFetch()
    },[City])
    
    return (
        <div id='WeatherDiv'>
            <div id='WeatherContainer'>
            
            </div>
            <label>날씨</label>
            <div style={{width:'100%', textAlign:'center'}}>
                <select value={City} onChange={onSetCityHandler} style={{width:'40%'}}>
                    <option value="Seoul">서울</option>
                    <option value="Daejeon">대전</option>
                    <option value="Daegu">대구</option>
                    <option value="Busan">부산</option>
                </select>
            </div>
        </div>
        
    )
}

export default Weather;