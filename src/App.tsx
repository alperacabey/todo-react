import React from "react";
import styled,{ThemeProvider} from "styled-components";
import ItemList from "./components/ItemList";
import Toggle from "./components/common/toggle"
import { removeList } from "./todo/todoAC";
import { useAppSelector, useAppDispatch } from "./types";
import { GlobalStyles, GlobalStyle,lightTheme, darkTheme, device } from "./theme"

interface ButtonProps {
  isVisible: boolean;
}

type ThemeTypes = "dark" | "light"

const Container = styled.div`
  padding: 15px;
  margin: 40px auto;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 25px;
  background: ${({ theme }: GlobalStyle) => theme.container};
  color: ${({ theme }: GlobalStyle) => theme.text};
  transition: all 0.50s linear;
  height: calc(100vh - 140px);
  @media only screen and ${device.sm}{
    max-width: 540px;
  }
  @media only screen and ${device.md}{
    max-width: 720px;
  }
  @media only screen and ${device.lg}{
    max-width: 1140px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  color: ${({ theme }: GlobalStyle) => theme.text};
`;

const ButtonWrapper = styled.div`
    width: 150px;
`;

const Button = styled.button<ButtonProps>`
  display: ${p => p.isVisible ? 'block' : 'none'};
  padding: 0.25em 1em;
  width: 100%;
  height: 40px;
  max-width: 250px;
  border-radius: 25px;
  border: none;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((s) => s.todos.items.length);

  const [theme, setTheme] = React.useState<ThemeTypes>('light');
  const themeToggler = () => {
    const mode : ThemeTypes = theme === 'light' ? 'dark' : 'light'
    theme === 'light' ? setTheme(mode) : setTheme(mode)
    window.localStorage.setItem('theme', mode);
  }

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && (localTheme === 'light' || localTheme === 'dark') && setTheme(localTheme)
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <Container data-test="app-container">
        <Header>
        <h2>Todo</h2>
        <Toggle value={theme === 'light' ? false : true} toggle={themeToggler} />
        <ButtonWrapper>
          <Button isVisible={totalCount > 0} onClick={()=>dispatch(removeList())}>Clear list 
          {/* <MdOutlineDeleteSweep size="1.5em"></MdOutlineDeleteSweep> */}
          </Button> 
        </ButtonWrapper>
        </Header>
        <ItemList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
