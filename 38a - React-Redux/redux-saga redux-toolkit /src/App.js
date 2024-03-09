import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
} from "./redux/modules/counterSlice";
import { useEffect, useState } from "react";
import { getUsersFetch } from "./redux/modules/userSlice";

function App() {
    const count = useSelector((state) => state.counter.value);
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(2);

    return (
        <div className="App">
            <h1>React-Redux Redux-Toolkit JS</h1>
            <h3>Show count: {count}</h3>
            <button type="button" onClick={() => dispatch(increment())}>
                increment
            </button>
            <button type="button" onClick={() => dispatch(decrement())}>
                decrement
            </button>
            <div>
                <input
                    type="number"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    onClick={() =>
                        dispatch(
                            incrementByAmount(Number(incrementAmount) || 0)
                        )
                    }
                >
                    IncrementByAmount
                </button>
                <button
                    onClick={() =>
                        dispatch(incrementAsync(Number(incrementAmount) || 0))
                    }
                >
                    Add Async
                </button>
            </div>
            <button onClick={() => dispatch(getUsersFetch())}>Get users</button>
            {users ? users.map((user) => <li key={user.id}>{user.name}</li>) : ""}
        </div>
    );
}

export default App;
