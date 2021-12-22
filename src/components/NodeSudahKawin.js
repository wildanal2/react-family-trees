import Genders from "./Genders";
import PopMenuMenikah from "./PopMenuMenikah";
import KondisisKeluarga from "./KondisisKeluarga";
import Sicknes from "./Sicknes";

export default function NodeSudahKawin(props) {
  const { node } = props;

  return (
    <div className={`inline-flex flex-row border-dashed p-2 mx-1 group`}>
      <div className="grid grid-rows-3 grid-flow-col pl-1 h-16 shadow border border-gray-100 rounded group-hover:shadow-lg">
        <div className="row-span-3 w-10 flex justify-center">
          <Genders gen={node.jk1} />
        </div>
        <div className="row-span-2 col-span-2 text-xs flex items-center">
          <span className="text-center w-full">{node.nama1}</span>
        </div>
        <div className="col-span-2 min-w-10r max-w-10r text-xs -mt-1 flex ">
          <div className="text-center flex pl-2 w-full">
            <Sicknes />
          </div>
        </div>
      </div>
      <div className="relative w-20">
        <KondisisKeluarga status={node.kondisi} />
        <div className="absolute inset-x-0 -bottom-3 flex flex-col items-center z-10 transition-all group-hover:scale-150">
          <PopMenuMenikah
            NewKeturunan={() => props.setNewChild(true)}
            EditData={() => props.setEdit(true)}
            Deleted={() => props.deletedNode()}
          />
        </div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col pl-1 h-16 shadow border border-gray-100 rounded group-hover:shadow-lg ">
        <div className="row-span-3 w-10 flex justify-center">
          <Genders gen={node.jk2} />
        </div>
        <div className="row-span-2 col-span-2 text-xs flex items-center">
          <span className="text-center w-full">{node.nama2}</span>
        </div>
        <div className="col-span-2 min-w-10r max-w-10r text-xs flex">
          <div className="text-center w-full">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
