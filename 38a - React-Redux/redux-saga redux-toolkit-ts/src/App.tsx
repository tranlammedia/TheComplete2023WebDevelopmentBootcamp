import { useAppDispatch, useAppSelector } from "./redux/hooks";
import "./App.css";
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
    selectStatus,
} from "./redux/modules/counterSlice";
import { getUsersFetch } from "./redux/modules/userSlice";

import { useState } from "react";
import { RootState } from "./redux/store";

function App() {
    const count = useAppSelector(selectCount);
    const status = useAppSelector(selectStatus);
    const users = useAppSelector((state: RootState) => state.users.users);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState<string>("2");
    console.log(users)
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
                    Add Async {status}
                </button>
                <button
                    onClick={() => dispatch(incrementIfOdd(Number(incrementAmount) || 0))}
                >
                    Add If Odd
                </button>
            </div>
            <button onClick={() => dispatch(getUsersFetch())}>Get users</button>
            {users && users?.map((user : any) => <li key={user.id}>{user.name}</li>)}
       
        </div>
    );
}

export default App;
