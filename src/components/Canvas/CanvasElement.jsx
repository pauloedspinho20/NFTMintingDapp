import { shape, func, string } from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';

const CanvasElement = ({
  elementRef, backgroundColor, penColor, canvasImgData,
}) => {
  /*
  * Get iamge buffer data from canvas
  */
  const getImgData = () => {
    const canvasEl = elementRef.current;
    const dataUrl = canvasEl.toDataURL('image/png');
    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    return buffer;
  };

  if (backgroundColor !== '' !== '') {
    return (
      <SignatureCanvas
        backgroundColor={ backgroundColor }
        penColor={ penColor }
        canvasProps={ { width: 512, height: 512 } }
        ref={ elementRef }
        onEnd={ () => (canvasImgData(getImgData())) }
      />
    );
  }
  return null;
};

CanvasElement.propTypes = {
  backgroundColor: string,
  penColor: string,
  elementRef: shape({}),
  canvasImgData: func,
};

CanvasElement.defaultProps = {
  backgroundColor: '',
  penColor: '',
  elementRef: null,
  canvasImgData: null,
};
export default CanvasElement;
