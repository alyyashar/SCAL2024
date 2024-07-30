import React, { useCallback, useEffect, useState } from 'react';
import { TiCamera } from 'react-icons/ti';
import { useDropzone } from 'react-dropzone';

const ChangeProfilePicture = ({ sendDataToParent }) => {
  const [image, setImage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(acceptedFile);
  });

  useEffect(() => {
    sendDataToParent(image);
  }, [image, sendDataToParent]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/png',
    multiple: false,
  });

  return (
      <div className="dropzone_container"
        {...getRootProps()}
      >
        <input {...getInputProps()} />{' '}
        <span className="dropzone_image"
        >
          <TiCamera size={30} color='#a72b75' />
        </span>
        <span
        >
          <img src={image} width={50} />
        </span>
      </div>
  );
};

export default ChangeProfilePicture;