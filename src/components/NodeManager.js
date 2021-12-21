import { useContext, useState } from "react";
import { AuthContext } from "./../App";

import ModalAnakBaru from "./ModalAnakBaru";
import NodeSudahKawin from "./NodeSudahKawin";
import NodeAnak from "./NodeAnak";

export default function NodeManager(props) {
  const { dispatch, state } = useContext(AuthContext);
  const { node } = props;
  const [menuAnak, setMenuAnak] = useState(false);
  console.log(props);

  return (
    <>
      {node.type === "menikah" && (
        <NodeSudahKawin node={node} setMenuAnak={(x) => setMenuAnak(x)} />
      )}
      {node.type === "anak" && (
        <NodeAnak node={node} setMenuAnak={(x) => setMenuAnak(x)} />
      )}

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
    </>
  );
}
