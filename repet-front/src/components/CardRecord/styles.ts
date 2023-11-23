import styled from "styled-components";

type BackroundColorProps = {
  color: string;
}

export const Content = styled.div`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = styled.div`
  align-items: start;
  display: flex;
  justify-content: end;
`;

