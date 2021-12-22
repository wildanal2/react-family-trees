import Genders from "./Genders";
import PopMenu from "./PopMenu";

export default function NodeAnak(props) {
  const { node } = props;
  
  return (
    <div
      className={`inline-flex flex-row border-dashed p-2 mx-1 shadow border border-gray-100 rounded hover:shadow-lg`}
    >
      <div className="grid grid-rows-3 grid-flow-col pl-1">
        <div className="row-span-3 w-10 flex justify-center">
          <Genders gen={node.jk1} />
        </div>
        <div className="row-span-2 col-span-2 text-xs flex items-center">
          <span className="text-center w-full">{node.nama1}</span>
        </div>
        <div className="col-span-2 min-w-10r max-w-10r text-xs flex relative">
          <div className="text-center w-full">&nbsp;</div>

          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <PopMenu
              NewKeturunan={() => props.setNewChild(true)}
              EditData={() => props.setEdit(true)}
              Deleted={() => props.deletedNode()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
