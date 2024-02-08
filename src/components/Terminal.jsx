import styled from "styled-components";
import AvailableKeywords from "./AvailableKeywords.jsx";

const Terminal = ({value, data, onEnter, keywords}, ref) => {
    const errorStyle = {
        color: data.error ? 'red' : '#ffffff'
    }

    return (
        <Container>
            {data.data.length > 0 && <div className='history'>{data.data.length > 0 && data.data.map((item) => <span className='error' style={errorStyle}> <font style={{color: '#74ee15'}}>&#8608;</font> {item}</span>)}</div>}
            <Input value={value} onKeyUp={onEnter} ref={ref} autoFocus />
            <div className='keywords'>
            <h3>Available Commands: </h3>
            <AvailableKeywords keywords={keywords}/>
            </div>
        </Container>
    );
}
export default Terminal;

const Container = styled.div`
  overflow: auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  background: #00303e;
  .history {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #00303e;
    color: #ffffff;
    font-size: 24px;
    font-family: terminal;
    
  }
  .keywords {
    h3 {
      color: #ffffff;
      font-family: terminal;
    }
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 2rem;

  }
`;

const Header = styled.div`
      display: flex;
      padding: 1rem;
      background: lightgray;
      font-family: terminal;
      font-size: 18px;
      justify-content: space-between;
`;

const Input = styled.textarea`
    min-height: 50%;
    height: 100%;
    overflow: auto;
    background: #00303e;
    color: #ffffff;
    font-size: 24px;
    font-family: terminal;
    border: 2px solid grey;
    padding: 8px;
    :focus {
      border: 2px solid grey;
    }
`;