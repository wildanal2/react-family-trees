export default function NodeDummy(props) {
  const { node } = props;
  
  return (
    <div
      onClick={() => alert("Hi my real name is: " + node)}
      className="border rounded-full py-2 shadow mx-auto w-64 cursor-pointer transition-all hover:scale-105"
    >
      <div id="header" className="flex items-center mb-2 relative">
        <img
          alt="avatar"
          className="w-10 rounded-full ml-1 border-2 border-gray-300"
          src="https://picsum.photos/seed/picsum/200"
        />
        <div id="header-text" className="leading-5 ml-6 sm">
          <h4 id="name" className="text-xl font-semibold">
            {node.name}
          </h4>
          <h5 id="job" className="font-semibold text-blue-600">
            Designer
          </h5>
        </div>
      </div>
    </div>
  );
}
