import React from 'react';
import Launch from "./Launch";
import launchList from './launches';
import './ListView.css'

class ListView extends React.Component {
    render() {
        const rows = launchList.map(launch => (
            <Launch key={launch.mission} mission={launch.mission} vehicle={launch.vehicle} location={launch.location} launch={launch.launch}/>
        ));
        return (<table className='table'>
            <caption>Время запуска шатлов SpaceX</caption>
            <thead>
            <tr>
                <th>Миссия</th>
                <th>Носитель</th>
                <th>Место запуска</th>
                <th>Время</th>
                <th>Таймер</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>)
    }
}

export default ListView;
