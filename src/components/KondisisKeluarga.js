import Line from "../assets/line.svg"; 
import Sparated from "../assets/sparated.svg"; 
import Dotline from "../assets/dotted_line.svg"; 

export default function KondisisKeluarga(props) {
  const { status } = props;

  switch (status) {
    case "bersama":
      return <img src={Line} alt="" className="w-20 -mr-2" />;
    case "cerai":
      return <img src={Dotline} alt="" className="w-20 -mr-1" />;
    case "pisah":
      return <img src={Sparated} alt="" className="w-20 -mr-1" />;
    default:
      return <img src={Line} alt="" className="w-20 -mr-1" />;
  }
}
