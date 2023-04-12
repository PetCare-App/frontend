import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  `;

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
  color: black;

  span{
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    padding-top: 15px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 8px;

  input{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;
    width: 250px;
    height: 20px;
    border-radius: 12px;
    &:focus{
      border-color: black;
    }
    &:hover{
      background-color: aquamarine;
      border: none;
    }

  }

  `;