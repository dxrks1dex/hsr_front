import styled, { keyframes } from "styled-components";

const borderAnimation = keyframes`
  0% {
    border-image-source: linear-gradient(0deg, black, snow);
    border-image-slice: 1;
  }
  25% {
    border-image-source: linear-gradient(90deg, black, snow);
    border-image-slice: 1;
  }
  50% {
    border-image-source: linear-gradient(180deg, black, snow);
    border-image-slice: 1;
  }
  75% {
    border-image-source: linear-gradient(270deg, black, snow);
    border-image-slice: 1;
  }
  100% {
    border-image-source: linear-gradient(360deg, black, snow);
    border-image-slice: 1;
  }
`;

const GlowingBorderComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px; /* Для отступа между границей и внутренним содержимым */
  border-radius: 5px; /* Радиус закругления для компонента */
  overflow: hidden; /* Прячет любые переполняющие элементы */

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px; /* Радиус закругления для анимации */

    border: 3px solid black;
    z-index: 0; /* Поместите псевдоэлемент под внутренним содержимым */
    //border-image-slice: 1;

    animation: ${borderAnimation} 1s linear infinite;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px; /* Радиус закругления для анимации */

    z-index: 0; /* Поместите псевдоэлемент под внутренним содержимым */
    border-image-source: linear-gradient(0deg, black, snow);
    //border-image-slice: 1;
    border: 5px solid transparent;

    animation: ${borderAnimation} 1s linear infinite;
  }
`;

const Inner = styled.div`
  padding: 25px;
  background: #222;
  color: #fff;
  border-radius: 5px; /* Установите радиус внутреннего элемента */
  z-index: 1;

  //box-sizing: border-box;
`;

const Card = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 100px auto;
  border-radius: 5px; /* Установите радиус карточки */
  //box-sizing: border-box;
`;

export const ExampleComponent = () => (
  <Card>
    <GlowingBorderComponent>
      <Inner>
        <h3>Example 2</h3>
        <p>This card also has a fake border with a rotating pseudo element.</p>
      </Inner>
    </GlowingBorderComponent>
  </Card>
);
