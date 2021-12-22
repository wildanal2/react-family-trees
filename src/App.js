import "./App.css";
import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import { createContext, useReducer } from "react";
import ModalNewKeluarga from "./components/ModalNewKeluarga";
import NodeDummy from "./components/NodeDummy";
import NodeManager from "./components/NodeManager";

// Context
export const AuthContext = createContext();
const initialState = {
  data: null,
  dataBentukKeluarga: [
    {
      name: "Keluarga inti (nuclear family)",
      value: "nuclear_family",
    },
    {
      name: "Keluarga besar (extended family)",
      value: "extended_family",
    },
    {
      name: "Keluarga campuran (blended family)",
      value: "blended_family",
    },
    {
      name: "Keluarga hukum umum (common law family)",
      value: "common_law_family",
    },
    {
      name: "Keluarga orang tua single (single parent family)",
      value: "single_parent_family",
    },
    {
      name: "Keluarga hidup bersama (commune family)",
      value: "commune_family",
    },
    {
      name: "Keluarga serial (serial family)",
      value: "serial_family",
    },
    {
      name: "Keluaga gabungan (composie family)",
      value: "composie_family",
    },
    {
      name: "Keluarga tinggal bersama (cohabilition)",
      value: "cohabilition",
    },
  ],
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

  console.log("BaseDat ", state.data);

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
