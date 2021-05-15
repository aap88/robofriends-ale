import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField] = useState('')
    const [count, setCount] = useState(0)

    // run everytime App renders
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
    }, []) // this empty array represents componentDidMount

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={() => setCount(count+1)}>Click me!</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;