import { useContext, useState } from "react";
import { AuthContext } from "./../App";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalAnakBaru(props) {
  const { dispatch, state } = useContext(AuthContext);
  const { node } = props;

  const [statusKel, setStatusKel] = useState("anak");
  const [nama1, setNama1] = useState("");
  const [jk1, setJk1] = useState("male");
  const [nama2, setNama2] = useState("");
  const [jk2, setJk2] = useState("female");
  const [kondisi, setKondisi] = useState("-");

  const formatNumber = (n) => ("0" + n).slice(-2);

  const setNewKel = () => {
    let z = {};
    const pPrefix = node.prefix.split(/(..)/g).filter((s) => s);

    if (node.gen === 1) {
      //GEN 1 =>add new child
      const lastpref =
        node.children.length === 0
          ? "01"
          : formatNumber(
              Number(
                node.children[node.children.length - 1].prefix
                  .split(/(..)/g)
                  .filter((s) => s)[1]
              ) + 1
            );

      z = {
        ...node,
        children: [
          ...node.children,
          {
            nid: uuidv4(),
            prefix: pPrefix[0] + lastpref + pPrefix[2],
            gen: node.gen + 1,
            nama1: nama1,
            jk1: jk1,
            nama2: nama2,
            jk2: jk2,
            type: statusKel,
            kondisi: kondisi,
            children: [],
          },
        ],
      };

      dispatch({
        type: "SETDATA",
        payload: {
          data: z,
        },
      });
    }

    if (node.gen === 2) {
      //GEN 2 =>add new child
      z = {
        ...state.data,
        children: state.data.children.map((el, i) =>
          el.prefix === node.prefix
            ? {
                ...el,
                children: [
                  ...el.children,
                  {
                    nid: uuidv4(),
                    prefix:
                      el.prefix.split(/(..)/g).filter((s) => s)[0] +
                      el.prefix.split(/(..)/g).filter((s) => s)[1] +
                      (el.children.length === 0
                        ? "01"
                        : formatNumber(
                            Number(
                              el.children[el.children.length - 1].prefix
                                .split(/(..)/g)
                                .filter((s) => s)[2]
                            ) + 1
                          )),
                    gen: el.gen + 1,
                    nama1: nama1,
                    jk1: jk1,
                    nama2: nama2,
                    jk2: jk2,
                    type: statusKel,
                    kondisi: kondisi,
                    children: [],
                  },
                ],
              }
            : el
        ),
      };

      dispatch({
        type: "SETDATA",
        payload: {
          data: z,
        },
      });
    }

    if (node.gen === 3) {
      alert("Maaf tidak dapat menambah keturunan lagi");
    }
    props.close();
  };

  return (
    <div className="absolute inset-0 z-50 bg-opacity-10 backdrop-blur-xs flex items-center">
      <div className="mx-auto rounded border shadow-xl p-5 -mt-36 bg-white min-w-1/4 text-left">
        <>
          <div className="relative">
            <h1 className="text-center">Keturunan</h1>
            <h1 className="text-center capitalize">{props.turunan}</h1>
            <div className="absolute top-0 right-0">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => props.close()}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className="my-2">
            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              Status Anak :
            </label>
            <select
              name="status_anak"
              value={statusKel}
              onChange={(e) => setStatusKel(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="tunggal">Tunggal</option>
              <option value="kembar" disabled>
                Kembar
              </option>
            </select>
          </div>

          <div className="grid gap-2 grid-cols-7 my-2">
            <div className="col-span-5">
              <label
                htmlFor="name"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                {statusKel === "anak" ? "Nama :" : "Nama Suami :"}
              </label>
              <div className="relative">
                <input
                  name="nama_ayah"
                  type="text"
                  placeholder={statusKel === "anak" ? "Nama" : "Nama Suami"}
                  value={nama1}
                  onChange={(e) => setNama1(e.target.value)}
                  className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-2"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                jenis kelamin :
              </label>
              <select
                value={jk1}
                onChange={(e) => setJk1(e.target.value)}
                className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="gay_male">gay male</option>
                <option value="lesbian_female">lesbian female</option>
              </select>
            </div>
          </div>

          {statusKel !== "anak" && (
            <div className="grid gap-2 grid-cols-7 my-2">
              <div className="col-span-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Nama Istri :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nama_ibu"
                    placeholder="Nama Istri"
                    value={nama2}
                    onChange={(e) => {
                      setNama2(e.target.value);
                    }}
                    className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-2"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  jenis kelamin :
                </label>
                <select
                  value={jk2}
                  onChange={(e) => setJk2(e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="gay_male">gay male</option>
                  <option value="lesbian_female">lesbian female</option>
                </select>
              </div>
            </div>
          )}

          <div className="my-2">
            <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
              Status Perkawinan :
            </label>
            <select
              name="status_perkawinan"
              value={statusKel}
              onChange={(e) => {
                setStatusKel(e.target.value);
                setKondisi(
                  e.target.selectedOptions[0].getAttribute("data-val")
                );
              }}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            >
              <option value="anak" data-val="anak">
                Anak / Belum menikah
              </option>
              <option value="menikah" data-val="menikah">
                Menikah
              </option>
              <option value="pisah" data-val="pisah">
                Pisah
              </option>
              <option value="cerai" data-val="cerai">
                Cerai
              </option>
            </select>
          </div>
        </>

        <button
          className="w-full bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white py-2 mt-5"
          onClick={() => {
            setNewKel();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
