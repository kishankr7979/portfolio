import styled from "styled-components";

const AvailableKeywords = ({keywords}) => {
    return (
        <Container>
            {keywords && keywords.map((item, index) => <span key={index}>{item}</span>)}
        </Container>
    )
}

export default AvailableKeywords;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  font-family: terminal;
  border: 4px dotted #ffffff;
  span {
    color: #ffffff;
    flex: 0 0 33.33%;
    font-size: 18px;
  }
`;