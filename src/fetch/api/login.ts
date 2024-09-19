import { Dispatch, SetStateAction } from "react";
import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

interface Props {
  username: string;
  password: string;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
}

export const onLogin = async ({
  username,
  password,
  setAuthenticated,
  setToken,
}: Props) => {
  try {
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);
    const response = await fetch(`${DATA_SOURCE_URL}/login`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    if (response.ok) {
      const { token } = await response.json();

      localStorage.setItem("token", token);

      setToken(token);
      setAuthenticated(true);
    } else {
      alert("Auth error");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchLoginData = async ({ token }: { token: string }) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/protected`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error of data accept");
  }
};
