import styled from "styled-components";

const CommonStyle = {
  ProfileContainer: styled.div`
    width: 100%;
    text-align: center;
    margin: 0 0 10px 0;
  `,
  ProfilePic: styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  `,
  Toast: styled.div`
    position: absolute;
    top: 10px;
    right: 320px;
  `,
};
export default CommonStyle;
