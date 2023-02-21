import styled, { css } from "styled-components";

const TrafficLight = styled.View `
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 10px;

  ${(props) =>
    props.available &&
    css`
      background: #66de5f;
    `}

  ${(props) =>
    props.limited &&
    css`
      background: #ed1524;
    `}

    ${(props) =>
    props.unavailable &&
    css`
      background: #e8e10e;
    `}
`;

export default TrafficLight;