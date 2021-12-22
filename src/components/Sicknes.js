import IcHeart from "./../assets/ic_heart.svg";
import IcParu from "./../assets/ic_paru.svg";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function Sicknes(props) {
  return (
    <>
      <LightTooltip title="Sakit Jantung" arrow>
        <img
          src={IcHeart}
          alt=""
          className="w-5 transition-all hover:scale-150 hover:shadow"
        />
      </LightTooltip>
      <LightTooltip title="Asma" arrow>
        <img
          src={IcParu}
          alt=""
          className="w-5 p-1 transition-all hover:scale-150 hover:shadow"
        />
      </LightTooltip>
    </>
  );
}
