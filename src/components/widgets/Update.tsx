import * as React from 'react';
import {
  Card,
  CardInfo,
  Label,
  CardFooter,
  CardInfoContent,
  CardContainer,
  CardFooterPanel,
  SubLabel,
  CardOverlay,
} from '../styles';
import { RoundIcon, ButtonIcon, IconType } from '../Icons';
import styled from 'styled-components';
import { Loading } from '../common';

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
`;

const useUploadFile = (): [(url: RequestInfo, file?: File) => void, boolean] => {
  const [isUploading, setUploading] = React.useState(false);

  const upload = React.useCallback(async (url: RequestInfo, file?: File | null) => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      await fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((data) => {
          console.log(data);
          setUploading(false);
        })
        .catch((error) => {
          console.error(error);
        });

      setUploading(false);
    }
  }, []);

  return [upload, isUploading];
};

export interface UpdateProps {
  sleep?: boolean;
}

export const Update: React.FC<UpdateProps> = ({ sleep }) => {
  const [upload, isUploading] = useUploadFile();
  return (
    <CardContainer>
      <Card>
        <CardInfo>
          <Label fontSize="s">Update</Label>
          <CardInfoContent>
            {isUploading ? (
              <Loading />
            ) : (
              <React.Fragment>
                <SubLabel fontSize="s">VERSION</SubLabel>
                <Label fontSize="l">v1.1.0</Label>
              </React.Fragment>
            )}
          </CardInfoContent>
        </CardInfo>
      </Card>
      <CardOverlay>
        <CardFooter>
          <RoundIcon type="Upload" />
          <CardFooterPanel>
            <Label>Update</Label>
            <SubLabel fontSize="s">Firmware and website</SubLabel>
          </CardFooterPanel>

          <FileUploadButton icon="Memory" url="/api/update" upload={upload} />
          <FileUploadButton icon="Website" url="/api/updateFS" upload={upload} />
          {sleep && <ButtonIcon type="Sleep" onClick={() => fetch('/api/sleep')} />}
        </CardFooter>
      </CardOverlay>
    </CardContainer>
  );
};

interface FileUploadButtonProps {
  icon: IconType;
  url: RequestInfo;
  upload: (url: RequestInfo, file?: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ icon, url, upload }) => {
  const uploadRef = React.useRef<HTMLInputElement | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.files && upload(url, e.target.files[0]);
  return (
    <React.Fragment>
      <FileInput ref={uploadRef} type="file" title="Upload" onChange={onChange} />
      <ButtonIcon type={icon} onClick={() => uploadRef.current?.click()} />
    </React.Fragment>
  );
};
