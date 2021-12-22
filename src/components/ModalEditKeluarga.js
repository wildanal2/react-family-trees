import { useContext, useState } from "react";
import { AuthContext } from "./../App";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalEditKeluarga(props) {
  const { node } = props;
  const { dispatch, state } = useContext(AuthContext);
  const dataBentukKeluarga = state.dataBentukKeluarga;

  const [nama1, setNama1] = useState(node.nama1);
  const [jk1, setJk1] = useState(node.jk1);
  const [nama2, setNama2] = useState(node.nama2);
  const [jk2, setJk2] = useState(node.jk2);
  const [statusKel, setStatusKel] = useState(node.type);
  const [kondisi, setKondisi] = useState(node.kondisi);

  const setUpdateKel = () => {
    // Edit
    if (node.gen === 1) {
      //Keluarga GEN_1
      dispatch({
        type: "SETDATA",
        payload: {
          data: {
            ...node,
            nama1: nama1,
            jk1: jk1,
            nama2: nama2,
            jk2: jk2,
            type: statusKel,
            kondisi: kondisi,
          },
        },
      });
    }
    if (node.gen === 2) {
      //update GEN 2
      const x = {
        ...state.data,
        children: state.data.children.map((el, i) =>
          el.nid === node.nid
            ? {
                ...el,
                nama1: nama1,
                jk1: jk1,
                nama2: nama2,
                jk2: jk2,
                type: statusKel,
                kondisi: kondisi,
              }
            : el
        ),
      };

      dispatch({
        type: "SETDATA",
        payload: {
          data: x,
        },
      });
    }
    if (node.gen === 3) {
      //update GEN 2

      const x = {
        ...state.data,
        children: state.data.children.map((el) =>
          el.prefix.split(/(..)/g).filter((s) => s)[1] ===
          node.prefix.split(/(..)/g).filter((s) => s)[1]
            ? {
                ...el,
                children: el.children.map((ell) =>
                  ell.nid === node.nid
                    ? {
                        ...ell,
                        nama1: nama1,
                        jk1: jk1,
                        nama2: nama2,
                        jk2: jk2,
                        type: statusKel,
                        kondisi: kondisi,
                      }
                    : ell
                ),
              }
            : el
        ),
      };

      dispatch({
        type: "SETDATA",
        payload: {
          data: x,
        },
      });
    }
    props.close();
  };

  return (
    <div className="absolute inset-0 z-50 bg-opacity-10 backdrop-blur-xs flex items-center">
      <div className="text-left mx-auto rounded border shadow-xl p-5 -mt-36 bg-white min-w-1/4">
        <>
          <div className="relative mb-5">
            <h1 className="text-center">
              {node.gen === 1
                ? dataBentukKeluarga.find(
                    (el) => el.value === node.bentuk_kel
                  ) &&
                  dataBentukKeluarga.find((el) => el.value === node.bentuk_kel)
                    .name
                : " Edit Keluarga"}
            </h1>
            <div className="absolute -top-2 right-0">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => props.close()}
              >
                <CloseIcon />
              </IconButton>
            </div>
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
              <option value="anak" data-val="sendiri">
                Anak / Belum menikah
              </option>
              <option value="menikah" data-val="bersama">
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
            setUpdateKel();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
