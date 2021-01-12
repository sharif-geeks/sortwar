import styled from "styled-components";

function SourceTab() {
  return (
    <IFrame
      src="https://codesandbox.io/embed/github/sharif-geeks/sortwar/tree/main/?fontsize=14&hidenavigation=1&theme=dark&view=editor"
      title="quirky-jang-yjjtc"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}

export default SourceTab;

const IFrame = styled.iframe`
  width: 100%;
  height: 99%;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;
