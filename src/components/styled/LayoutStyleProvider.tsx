"use client";
import styled, { createGlobalStyle } from "styled-components";

export const LayoutStyleProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LayoutStyle className={"seb body"}>
      <GlobalStyle />
      {children}
    </LayoutStyle>
  );
};

const LayoutStyle = styled.body`
  //background: linear-gradient(to top right, #311D3F, #522546, #88304E, #E23E57);

  background-color: #c48353;
`;
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "prodfont";
    src: url("/SDK_SC_Web.ttf") format("truetype");
  }
  
  body{
    font-family: "Montserrat", sans-serif
  };
  
  //div{
  //  font-family: "prodfont", sans-serif;
  //}
`;
