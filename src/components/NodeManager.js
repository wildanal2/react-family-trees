import { useContext, useState } from "react";
import { AuthContext } from "./../App";

import ModalAnakBaru from "./ModalAnakBaru";
import NodeSudahKawin from "./NodeSudahKawin";
import NodeAnak from "./NodeAnak";
import ModalEditKeluarga from "./ModalEditKeluarga";

export default function NodeManager(props) {
  const { dispatch, state } = useContext(AuthContext);
  const { node } = props;
  const [AnakBaru, setAnakBaru] = useState(false);
  const [menuEditKeluarga, setMenuEditKeluarga] = useState(false);

  console.log("node", props.node);
  //hapus Node
  const deletedNode = () => {
    if (node.gen === 1) {
      dispatch({
        type: "SETDATA",
        payload: {
          data: null,
        },
      });
    }

    if (node.gen === 2) {
      //GEN 2 Deleted
      const z = {
        ...state.data,
        children: state.data.children.filter((ell) => ell.nid !== node.nid),
      };

      dispatch({
        type: "SETDATA",
        payload: {
          data: z,
        },
      });
    }
    if (node.gen === 3) {
      //GEN 3 Deleted
      const z = {
        ...state.data,
        children: state.data.children.map((el, i) =>
          el.prefix.split(/(..)/g).filter((s) => s)[1] ===
          node.prefix.split(/(..)/g).filter((s) => s)[1]
            ? {
                ...el,
                children: el.children.filter((ell) => ell.nid !== node.nid),
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
  };

  return (
    <>
      {(node.type === "menikah" ||
        node.type === "pisah" ||
        node.type === "cerai") && (
        <NodeSudahKawin
          node={node}
          setNewChild={(x) => setAnakBaru(x)}
          setEdit={(x) => setMenuEditKeluarga(x)}
          deletedNode={() => deletedNode()}
        />
      )}
      {node.type === "anak" && (
        <NodeAnak
          node={node}
          setNewChild={(x) => setAnakBaru(x)}
          setEdit={(x) => setMenuEditKeluarga(x)}
          deletedNode={() => deletedNode()}
        />
      )}

      {/* ==== Modal Menu ==== */}
      {AnakBaru && (
        <ModalAnakBaru
          node={node}
          turunan={
            node.type === "anak" ? node.nama1 : node.nama1 + " & " + node.nama2
          }
          close={() => setAnakBaru(false)}
        />
      )}
      {menuEditKeluarga && (
        <ModalEditKeluarga
          node={node}
          close={() => setMenuEditKeluarga(false)}
        />
      )}
    </>
  );
}
