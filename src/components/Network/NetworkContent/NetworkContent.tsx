import React from "react";
import { ProfilesInfo } from "../../../utils/types/network";
import { Spinner } from "../../../utils/common-components/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import CommonStyle from "../../../utils/common-styles/styles";
import { Link } from "react-router-dom";

export const NetworkContent: React.FC<{
  loadingContent: boolean;
  content: ProfilesInfo[];
  onClickHeart: (v: ProfilesInfo) => void;
}> = ({ content, loadingContent, onClickHeart }) => (
  <>
    <CommonStyle.ItemHead>
      <CommonStyle.ItemHeadText width={19}>
        Player Name
      </CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={10}>Sessions</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={23}>School</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={23}>Teams</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={15}>Age</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={8}>Favorite</CommonStyle.ItemHeadText>
    </CommonStyle.ItemHead>
    {loadingContent ? (
      <Spinner loading={loadingContent} />
    ) : (
      content.map((v, i: number) => (
        <CommonStyle.Item key={i}>
          <CommonStyle.ItemText width={19}>
            <Link style={{ color: "#56636D" }} to={"/profile/" + v.id}>
              {v.first_name} {v.last_name}
            </Link>
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={10}>-</CommonStyle.ItemText>
          <CommonStyle.ItemText width={23}>
            {v.school ? v.school.name : "-"}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={23}>
            {v.teams.length > 0 ? v.teams[0].name : "-"}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={15}>{v.age}</CommonStyle.ItemText>
          <CommonStyle.ItemText width={8}>
            <FontAwesomeIcon
              onClick={() => onClickHeart(v)}
              style={{ color: "#4abdff" }}
              icon={v.favorite ? heartSol : heartReg}
            />
          </CommonStyle.ItemText>
        </CommonStyle.Item>
      ))
    )}
  </>
);
