"use client";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { useMutation } from "react-query";
import { fetchLoginData, onLogin } from "@/fetch/api/login";
import styled from "styled-components";

export const LoginButton = () => {
  const {
    data: { adminName, adminPassword, isAuthenticated, token },
    operations: {
      setIsAuthenticated,
      setAdminPassword,
      setToken,
      setAdminName,
    },
  } = useLoginDataContext();

  const { mutate, isLoading, error } = useMutation(onLogin);

  const logIn = () => {
    mutate(
      {
        username: adminName,
        password: adminPassword,
        setAuthenticated: setIsAuthenticated,
        setToken,
      },
      {
        onSuccess: async () => {
          console.log("success");
          await fetchLoginData({ token });
        },
        onError: () => {
          console.log("error of update user");
        },
      },
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <StyledLoginContainer>
      <InnerContainer>
        {!isAuthenticated && (
          <SignInContainer>
            <p>Please Sign in</p>
            <Input
              type="text"
              placeholder="login"
              onChange={(e) => setAdminName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </SignInContainer>
        )}
        <ButtonContainer>
          <Button variant="green" onClick={logIn}>
            Sign in
          </Button>
          <Button variant="red" onClick={logout}>
            Log out
          </Button>
        </ButtonContainer>
      </InnerContainer>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  color: white;
  margin: 0 auto;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SignInContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280; /* text-gray-500 */
  gap: 0.5rem; /* space-y-2 */
  margin-top: 1.25rem; /* my-5 */
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  background-color: #4b5563; /* bg-gray-600 */
  color: white;
  border-radius: 0.375rem; /* rounded-md */
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 0.5rem; /* space-x-2 */
`;

const Button = styled.button<{ variant: string }>`
  background-color: ${(props) =>
    props.variant === "green"
      ? "#047857"
      : "#b91c1c"}; /* bg-green-700 or bg-red-700 */
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  transition: background-color 0.3s; /* duration-300 */

  &:hover {
    background-color: ${(props) =>
      props.variant === "green"
        ? "#065f46"
        : "#991b1b"}; /* bg-green-800 or bg-red-800 */
  }
`;
