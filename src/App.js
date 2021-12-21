import "./App.css";
import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import { createContext, useReducer, useState } from "react";
import ModalNewKeluarga from "./components/ModalNewKeluarga";
import NodeDummy from "./components/NodeDummy";
import NodeManager from "./components/NodeManager";

// Context
export const AuthContext = createContext();
const initialState = {
  data: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETDATA":
      return {
        ...state,
        data: action.payload.data,
      };
    case "CLEAN":
      localStorage.clear();
      return {
        ...state,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  //Placeholder DATA
  const initechOrg = {
    name: "Dimas + Laras",
    actor: "Gary Cole",
    children: [
      {
        name: "Peter Gibbons",
        actor: "Ron Livingston",
      },
      {
        name: "Milton Waddams",
        actor: "Stephen Root",
      },
      {
        name: "Bob Slydell",
        actor: "John C. McGi...",
      },
    ],
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <br />
        <br />
        {state.data ? (
          <OrgChart tree={state.data} NodeComponent={NodeManager} />
        ) : (
          // FAKE
          <OrgChart tree={initechOrg} NodeComponent={NodeDummy} />
        )}

        {!state.data && <ModalNewKeluarga />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
