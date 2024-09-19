"use client";

import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StyledErrorContainer>
      <StyledErrorText>Something went wrong!</StyledErrorText>
      <StyledErrorButton onClick={() => reset()}>Try again</StyledErrorButton>
      <StyledErrorButton onClick={() => handleGoToHome()}>
        Back to main page
      </StyledErrorButton>
    </StyledErrorContainer>
  );
}

const StyledErrorContainer = styled.div`
  display: grid;
  place-items: center;

  color: snow;

  width: 100%;

  margin-top: 10%;
`;

const StyledErrorText = styled.h2`
  font-size: 28px;

  font-weight: 700;
`;

const StyledErrorButton = styled.button`
  background-color: black;

  border: 1px solid rgba(45, 56, 97, 0.34);

  &:hover {
    transition: 0.4s;
    border: 1px solid red;
  }

  height: 30px;
  width: 330px;
`;
