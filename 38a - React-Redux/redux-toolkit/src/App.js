import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
} from "./redux/modules/counterSlice";
import { useState } from "react";

function App() {
    const count = useSelector((state) => state.counter.value);
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
        </div>
    );
}

export default App;
