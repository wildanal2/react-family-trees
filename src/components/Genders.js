import IcLaki from "../assets/kotak.svg";
import IcPr from "../assets/lingkaran.svg";
import IcGayM from "../assets/gay_male.svg";
import IcLesbiM from "../assets/lesbi_female.svg";

export default function Genders(props) {
  const { gen } = props;

  switch (gen) {
    case "male":
      return <img src={IcLaki} alt="" className="w-10 p-1" />;
    case "female":
      return <img src={IcPr} alt="" className="w-10 p-1" />;
    case "gay_male":
      return <img src={IcGayM} alt="" className="w-10 p-1" />;
    case "lesbian_female":
      return <img src={IcLesbiM} alt="" className="w-10 p-1" />;
    default:
      return <img src={IcLaki} alt="" className="w-10 p-1" />;
  }
}
