import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./reducers";
import LayoutPage from "./components/layouts/LayoutPage";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LayoutPage />}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
