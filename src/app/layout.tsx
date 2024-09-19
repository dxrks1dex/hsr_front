import "@/common/reset.css";
import { ReactQueryProvider } from "@/fetch/ReactQueryProvider";
import { UserDataContextWrapper } from "@/context/userDataContext";
import { LayoutStyleProvider } from "@/components/styled/LayoutStyleProvider";
import { CharactersContextWrapper } from "@/context/useCharactersContext";
import { LightConeContextWrapper } from "@/context/useLightConeContext";
import { LoginDataContextWrapper } from "@/context/useLoginDataContext";
import "@/styles/globals.css";
import { ForProdContextWrapper } from "@/context/useForProdContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LayoutStyleProvider>
        <ReactQueryProvider>
          <UserDataContextWrapper>
            <CharactersContextWrapper>
              <LightConeContextWrapper>
                <LoginDataContextWrapper>
                  <ForProdContextWrapper>
                    <body>{children}</body>
                  </ForProdContextWrapper>
                </LoginDataContextWrapper>
              </LightConeContextWrapper>
            </CharactersContextWrapper>
          </UserDataContextWrapper>
        </ReactQueryProvider>
      </LayoutStyleProvider>
    </html>
  );
}
