export default function NodeAnak(props) {
  const { node } = props;

  return (
    <div
      onClick={() => {
        console.log("hellow");
      }}
      className={`border shadow rounded p-2 mx-auto w-96 grid grid-cols-8  cursor-pointer transition-all hover:scale-105`}
    >
      <div className="col-span-8 shadow grid grid-flow-row">
        <span>{node.jk1}</span>
        <span className="text-xs pb-1 px-1">{node.nama1}</span>
      </div>
    </div>
  );
}
