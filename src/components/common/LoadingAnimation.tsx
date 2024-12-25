import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const LoaderImage = styled.img`
  width: 20%;
  height: auto;
`;

export const LoadingAnimation = () => {
  return (
    <LoaderWrapper>
      <LoaderImage src="/Loading.gif" alt="Loading..." />
    </LoaderWrapper>
  );
};
