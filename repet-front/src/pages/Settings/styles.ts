import styled from 'styled-components';

export const SettingsContainer = styled.div`
  font-family: 'Lexend', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 40px;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 40px;
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 12px;
  width: 100%;
  padding-left: 42%;
`;

export const SettingLabel = styled.label`
  margin-left: 12px;
`;

export const SettingSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #2196f3;
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;
