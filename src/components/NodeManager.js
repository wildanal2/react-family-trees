import { useContext, useState } from "react";
import { AuthContext } from "./../App";

import ModalAnakBaru from "./ModalAnakBaru";
import NodeSudahKawin from "./NodeSudahKawin";
import NodeAnak from "./NodeAnak";
import ModalEditKeluarga from "./ModalEditKeluarga";

export default function NodeManager(props) {
  const { dispatch } = useContext(AuthContext);
  const { node } = props;
  const [menuAnak, setMenuAnak] = useState(false);
  const [menuEditKeluarga, setMenuEditKeluarga] = useState(false);

  console.log(props);

  return (
    <>
      {(node.type === "menikah" ||
        node.type === "pisah" ||
        node.type === "cerai") && (
        <NodeSudahKawin
          node={node}
          setNewChild={(x) => setMenuAnak(x)}
          setEdit={(x) => setMenuEditKeluarga(x)}
        />
      )}
      {node.type === "anak" && (
        <NodeAnak node={node} setMenuAnak={(x) => setMenuAnak(x)} />
      )}

      {/* Modal */}
      {menuAnak && (
        <ModalAnakBaru
          node={node}
          turunan={node.nama1 + " & " + node.nama2}
          close={() => setMenuAnak(false)}
          setNewChild={(x) => {
            console.log("nod", node);
            console.log("xxx", x);
            const z = {
              ...node,
              children: [...node.children, x],
            };

            console.log(z);
            dispatch({
              type: "SETDATA",
              payload: {
                data: z,
              },
            });
            setMenuAnak(false);
          }}
        />
      )}
      {menuEditKeluarga && (
        <ModalEditKeluarga node={node} close={() => setMenuEditKeluarga(false)} />
      )}
    </>
  );
}
