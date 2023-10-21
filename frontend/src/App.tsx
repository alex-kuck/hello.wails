import {useState} from 'react';
import './App.css';
import {GetPlanets} from "../wailsjs/go/main/App";
import {sw} from "../wailsjs/go/models";
import {BrowserOpenURL} from "../wailsjs/runtime";

type AppState = 'idle' | 'fetching'

function App() {
    const [state, setState] = useState<AppState>('idle')
    const [planets, setPlanets] = useState<sw.Planet[]>([])

    const fetchPlanets = () => {
        setState('fetching')
        GetPlanets()
            .then(setPlanets)
            .catch(e => console.error(e))
            .finally(() => setState('idle'));
    };

    return (
        <div id="App">
            <span>Currently I know about {planets.length} planet(s).</span><br/>
            <button onClick={fetchPlanets}
                    disabled={state === 'fetching'}>{state === 'idle' ? 'Load Planets' : 'Loading'}</button>
            <Planets planets={planets}/>
        </div>
    )
}

type PlanetsProps = { planets: sw.Planet[] };

function Planets({planets}: PlanetsProps) {
    if (planets.length === 0) {
        return null;
    }

    return (
        <div>
            <h1>Planets</h1>
            <div id="planets">
                {planets.map(p => <Planet key={p.url} planet={p}/>)}
            </div>
        </div>
    );
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
