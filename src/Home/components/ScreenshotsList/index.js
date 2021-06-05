import ReactDOM from "react-dom";
import { Container, Image } from "./styles";

const ScreenshotsList = ({ list }) => {
  return (
    <Container>
      {list.map((base64Image) => (
        <Image
          key={base64Image.substr(base64Image.length - 30)}
          src={base64Image}
        />
      ))}
    </Container>
  );
};

export default ScreenshotsList;
