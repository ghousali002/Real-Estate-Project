import styled from "styled-components";
import React from "react";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.6rem;
  width: auto;
`;

function Logo() {
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <StyledLogo>
      <Img  src={publicUrl + "assets/img/logo2.png"} alt="img"/>
    </StyledLogo>
  );
}

export default Logo;