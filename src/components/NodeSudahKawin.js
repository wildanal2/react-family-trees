import DotLine from "../assets/dotted_line.svg";

export default function NodeSudahKawin(props) {
  const { node } = props;

  //cursor-pointer transition-all hover:scale-105

  return (
    <div
      onClick={() => {
        props.setMenuAnak(true);
      }}
      className={`inline-flex flex-row border p-2 bg-yellow-200`}
    >
      <div>{node.nama1}</div>
      <img src={DotLine} alt="" className="w-20" />
      <div>{node.nama2}</div>
    </div>
  );
}
