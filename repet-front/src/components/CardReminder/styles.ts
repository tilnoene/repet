import styled from "styled-components";

type BackroundColorProps = {
  color: string;
}

export const BackroundColor = styled.div<BackroundColorProps>`
  width: 100%;
  height: 8px;
  background: ${ props => props.color };
  border-radius: 6px 6px 0 0;
`;

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
  margin-top: 8px;
`;

export const PetName = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 12px;
`;
