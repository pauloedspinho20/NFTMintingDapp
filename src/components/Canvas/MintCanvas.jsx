import { useRef, useState, useEffect } from 'react';
import useWeb3Storage from 'hooks/useWeb3Storage';
import { getRandomColor } from 'utils/basicFunctions';
import { File } from 'web3.storage';
import useContracts/* , { updateContracts } */ from 'hooks/useContracts';
import Button from 'components/Button/Button';
import ButtonMintUpload from 'components/Button/MintUpload';
import CanvasElement from './CanvasElement';

const ipfsBaseUrl = process.env.NEXT_PUBLIC_IPFS_URL;

const MintCanvas = () => {
  const { setOperation, operation } = useContracts();
  const { put } = useWeb3Storage();
  const elementRef = useRef();

  const backgroundColor = getRandomColor();

  const penColor = '#37393a';

  const [ name, setName ] = useState('New NFT');
  const [ description, setDescription ] = useState('Test NFT minting!');
  const [ imgData, setImgData ] = useState(null);
  const [ imgAttributes, setImgAttributes ] = useState(null);

  /*
  * Clear all drawings on canvas
  */
  const clearCanvas = () => {
    const canvasEl = elementRef.current;
    canvasEl.clear();
  };

  /*
* Upload iamge to IPFS
*/
  const uploadImageToIPFS = async (_name, _des, _imgData, _attributes) => {
    const fileExtension = '.jpg';
    const imgFilename = `${_name?.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
    const imgFiles = [
      new File([ _imgData ], imgFilename + fileExtension),
    ];
    const imgCID = await put(imgFiles);

    const imgURL = `${ipfsBaseUrl}/${imgCID}/${imgFilename}${fileExtension}`;
    const metadataObj = {
      name: _name,
      description: _des,
      image: imgURL,
      animation_url: imgURL,
      external_url: 'https://site.com',
      attributes: _attributes,
    };

    const metadataFiles = [
      new File([ JSON.stringify(metadataObj) ], `${imgFilename}.json`),
    ];
    const metadataCID = await put(metadataFiles);
    console.log('metadataCID', metadataCID);
    return metadataCID;
  };

  useEffect(() => {
    setImgAttributes([
      {
        trait_type: 'Background Color',
        value: backgroundColor,
      },
      {
        trait_type: 'Pencil Color',
        value: penColor,
      },
    ]);
  }, [ backgroundColor, penColor ]);

  const onClick = async () => {
    setOperation('upload-minting');
    const cid = await uploadImageToIPFS(name, description, imgData, imgAttributes);
    console.log('cid', cid);
    // confirm.close();
    // setValue();

    // follow.open({ title });

    /*  if (!await mintCollection(
      value,
      amount,
      contractAddress,
      whitelistMint,
    ).then(request => {
      follow.close();
      show.open({ title: 'NFT Minted', transactionHash: request.transactionHash });
    })) {
      // If operation succeeds, this variable will be set when fetching new pool data
      setOperation('');
    } */
    setOperation('');
    // follow.close();
    // updateContracts();
  };

  return (
    <div className="canvas">
      <div className="d-flex justify-content-center mb-4">
        { backgroundColor && penColor && (
        <CanvasElement
          elementRef={ elementRef }
          backgroundColor={ backgroundColor }
          penColor={ penColor }
          canvasImgData={ data => {
            setImgData(data);
          } }
        />
        ) }
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-6">
          <label htmlFor="nft-name" className="form-label">NFT Name</label>
          <div className="input-group mb-3">
            <input
              id="nft-name"
              type="text"
              value={ name }
              className="form-control"
              placeholder="NFT name"
              aria-label="NFT name"
              onChange={ ({ target: { value } }) => {
                setName(value);
              } }

            />
          </div>

          <label htmlFor="nft-description" className="form-label">NFT Description</label>
          <div className="input-group mb-3">
            <input
              id="nft-description"
              type="text"
              value={ description }
              className="form-control"
              placeholder="NFT description"
              aria-label="NFT description"
              onChange={ ({ target: { value } }) => {
                setDescription(value);
              } }
            />
          </div>
        </div>
      </div>

      <div className="row justify-content-center text-center mb-5">
        <div className="col-6">
          <ButtonMintUpload
            amount={ 1 }
            className="me-3"
            size="s"
            name={ name }
            description={ description }
            onClick={ onClick }
          />
          <Button
            theme="blue"
            size="s"
            disabled={
              operation
            }
            onClick={ e => {
              e.preventDefault();
              clearCanvas();
            } }

          >
            Clear
          </Button>
        </div>
      </div>
    </div>

  );
};

export default MintCanvas;
