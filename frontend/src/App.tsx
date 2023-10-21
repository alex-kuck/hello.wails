import {PropsWithChildren, useEffect, useState} from 'react';
import './App.css';
import {GetPlanets} from "../wailsjs/go/main/App";
import {sw} from "../wailsjs/go/models";
import {BrowserOpenURL} from "../wailsjs/runtime";

function App() {
    const [planets, setPlanets] = useState<sw.Planet[]>([])

    useEffect(() => {
        GetPlanets().then(setPlanets).catch(e => console.error(e));
    }, [])

    return (
        <div id="App">
            <span>Currently I know about {planets.length} planet(s).</span>
            <Planets planets={planets}/>
        </div>
    )
}

type PlanetsProps = { planets: sw.Planet[] };

function Planets({planets}: PropsWithChildren<PlanetsProps>) {
    return <div>
        <h1>Planets</h1>
        {planets.map(p => <Planet key={p.url} planet={p}/>)}
    </div>;
}

interface PlanetProps {
    planet: sw.Planet
}

function Planet({planet}: PlanetProps) {
    return <div>
        <h2>{planet.name}</h2>
        <span>Climate: {planet.climate}</span><br/>
        <span>Rotation-Period: {planet.rotation_period}</span><br/>
        <a href="#" onClick={() => BrowserOpenURL(planet.url)} target="#blank">Open in Browser</a>
    </div>
}

export default App
