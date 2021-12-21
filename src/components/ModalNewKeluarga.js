import { useContext, useState } from "react";
import { AuthContext } from "./../App";
import { v4 as uuidv4 } from "uuid";

export default function ModalNewKeluarga(props) {
  const { dispatch } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [nama1, setNama1] = useState("");
  const [jk1, setJk1] = useState("male");
  const [nama2, setNama2] = useState("");
  const [jk2, setJk2] = useState("female");
  const [jenisKel, setJenisKel] = useState("-");
  const [statusKel, setStatusKel] = useState("menikah");
  const [kondisi, setKondisi] = useState("bersama");

  const dataBentukKeluarga = [
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
  ];

  const setNewKel = () => {
    dispatch({
      type: "SETDATA",
      payload: {
        data: {
          nid: "010000_" + uuidv4(),
          nama1: nama1,
          jk1: jk1,
          nama2: nama2,
          jk2: jk2,
          children: [],
          bentuk_kel: jenisKel,
          type: statusKel,
          kondisi: kondisi,
        },
      },
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-opacity-10 backdrop-blur-lg flex items-center">
      <div className="mx-auto rounded border shadow-xl p-5 -mt-36 bg-white min-w-1/4">
        {step === 1 && (
          <>
            <h1 className="text-center text-2xl">Genogram</h1>
            <div className="my-5">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Bentuk Keluarga :
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setJenisKel(e.target.value);
                }}
                value={jenisKel}
              >
                <option value="-">-- pilih bentuk keluarga --</option>
                {dataBentukKeluarga.map((data, index) => (
                  <option key={index} value={data.value} data-val={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-center">
              {dataBentukKeluarga.find((el) => el.value === jenisKel) &&
                dataBentukKeluarga.find((el) => el.value === jenisKel).name}
            </h1>
            <div className="grid gap-2 grid-cols-7 my-2">
              <div className="col-span-5">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  {jenisKel === "anak" ? "Nama :" : "Nama Ayah :"}
                </label>
                <div className="relative">
                  <input
                    name="nama_ayah"
                    type="text"
                    placeholder={jenisKel === "anak" ? "Nama" : "Nama Ayah"}
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
                    Nama Ibu :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nama_ibu"
                      placeholder="Nama Ibu"
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
        )}

        <button
          className="w-full bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white py-2 mt-5"
          onClick={() => {
            if (step === 2) {
              setNewKel();
            }

            setStep(step + 1);
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
