import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";
import "./App.css";
import { CertficatesAbi, CertficatesAddr } from "./constants/provider";
import { CertificatesLogic } from "./contracts/CertificatesLogic";
import { useMetaMask } from "./hooks/useMetaMask";
import { useEtherProvider } from "./hooks/useProvider";

function Home() {
  const { provider } = useEtherProvider();
  const { account } = useMetaMask();
  const CertficateContract = new ethers.Contract(
    CertficatesAddr,
    CertficatesAbi,
    provider
  ) as unknown as CertificatesLogic;

  const [certificateURI, setCertificateURI] = useState<any>();
  const [certificateURILoading, setCertificateURILoading] = useState(false);
  const [certificateURIResult, setSertificateURIResult] = useState<any>();

  const [NFTT, setNFTT] = useState<any>();
  const [NFTTLoading, setNFTTLoading] = useState(false);
  const [NFTTResult, setNFTTResult] = useState<any>();

  const [certInfo, setcertInfo] = useState<any>();
  const [certInfoLoading, setCertInfoLoading] = useState(false);
  const [certInfoResult, setCertInfoResult] = useState<any>();

  const [name, setName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [nameNFT, setNameNFT] = useState("");
  const handleChangeNFT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameNFT(event.target.value);
  };

  const [nameCertInfo, setNameCertInfo] = useState("");
  const handleChangeCertInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameCertInfo(event.target.value);
  };

  const getCertificateURI = async (acc: string, courseName: string) => {
    {
      setCertificateURILoading(true);
      const res = await CertficateContract.viewCertificateURI(acc, courseName);
      setCertificateURI(res);
      setCertificateURILoading(false);
      const certificateURIResultT = await axios.get(res as unknown as string);
      setSertificateURIResult(certificateURIResultT?.data);
    }
  };

  const getCertificateNFTT = async (acc: string, courseName: string) => {
    {
      setNFTTLoading(true);
      const res = await CertficateContract.viewCertificateId(acc, courseName);
      setNFTTResult(res);

      setNFTTLoading(false);
    }
  };

  const getCertificateCertInfo = async (acc: string, courseName: string) => {
    {
      setCertInfoLoading(true);
      const res = await CertficateContract.getCertificateInfo(acc, courseName);
      setCertInfoResult(res);
      setCertInfoLoading(false);
    }
  };

  const handleResetCertificateURI = () => {
    setCertificateURI(undefined);
    setSertificateURIResult(undefined);
    setName("");
  };

  const handleResetAdditionalInfo = () => {
    setCertInfoResult(undefined);
    setcertInfo(undefined);
    setNameCertInfo("");
  };

  const handleResetNFTT = () => {
    setNFTTResult(undefined);
    setNameNFT("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Typography variant="h5">Главное меню</Typography>

          <Box display="flex" gap={15} mt={2}>
            <Card sx={{ width: 345, minHeight: 450 }} component={Box}>
              {certificateURILoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  width="100%"
                  height="100%"
                >
                  <Box>
                    <CircularProgress />
                  </Box>
                </Box>
              )}
              {certificateURIResult && (
                <>
                  <Box mt={1}></Box>
                  <img
                    height="120"
                    src="./imgs/check.png"
                    alt="фото сертификата"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {certificateURIResult.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {certificateURIResult.description}
                    </Typography>
                  </CardContent>
                  <Box mt="auto">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        window.open(certificateURIResult.image, "_blank")
                      }
                    >
                      Скачать сертификат
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleResetCertificateURI()}
                    >
                      Загрузить другой сертификат
                    </Button>
                  </Box>
                </>
              )}

              {!certificateURIResult && !certificateURILoading && (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    src="./imgs/first.jpg"
                    alt="green iffguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Загрузка сертификата
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <TextField
                        variant="filled"
                        value={name}
                        onChange={handleChange}
                        label="Название курса"
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => getCertificateURI(account, name)}
                    >
                      Загрузить сертификат
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
            {/* <Card sx={{ width: 345, minHeight: 450 }} component={Box}>
              {NFTTLoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  width="100%"
                  height="100%"
                >
                  <Box>
                    <CircularProgress />
                  </Box>
                </Box>
              )}
              {NFTTResult && (
                <>
                  <Box mt={1}></Box>
                  <img
                    height="120"
                    src="./imgs/check.png"
                    alt="фото сертификата"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      NFT токен
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123456789123456790.12345
                    </Typography>
                  </CardContent>
                  <Box mt="auto">
                    <Button size="small" onClick={() => handleResetNFTT()}>
                      Загрузить другой NFT токен
                    </Button>
                  </Box>
                </>
              )}

              {!NFTTResult && !NFTTLoading && (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    src="./imgs/nftt.jpeg"
                    alt="green iffguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Загрузка NFT токена сертификата
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <TextField
                        variant="filled"
                        value={nameNFT}
                        onChange={handleChangeNFT}
                        label="Название курса"
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => getCertificateNFTT(account, nameNFT)}
                    >
                      Загрузить NFT токен
                    </Button>
                  </CardActions>
                </>
              )}
            </Card> */}

            <Card sx={{ width: 345, minHeight: 450 }} component={Box}>
              {certInfoLoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  width="100%"
                  height="100%"
                >
                  <Box>
                    <CircularProgress />
                  </Box>
                </Box>
              )}
              {certInfoResult && (
                <>
                  <Box mt={1}></Box>
                  <img
                    height="120"
                    src="./imgs/check.png"
                    alt="фото сертификата"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Информация о курсе
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Box display="flex" justifyItems="start">
                        <Typography variant="body2">Дата начала:</Typography>
                        <Box ml={1}>
                          <Typography variant="body2" color="text.secondary">
                            {certInfoResult.beginningDate}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyItems="start">
                        <Typography variant="body2">Дата получения:</Typography>
                        <Box ml={1}>
                          <Typography variant="body2" color="text.secondary">
                            {certInfoResult.receivingDate}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyItems="start">
                        <Typography variant="body2">
                          Полученный балл:
                        </Typography>
                        <Box ml={1}>
                          <Typography variant="body2" color="text.secondary">
                            {certInfoResult.score}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyItems="start">
                        <Typography variant="body2">Информация:</Typography>
                        <Box ml={1}>
                          <Typography variant="body2" color="text.secondary">
                            {certInfoResult.info}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box mt="auto">
                    <Button
                      size="small"
                      onClick={() => handleResetAdditionalInfo()}
                    >
                      Загрузить информацию о другом сертификате
                    </Button>
                  </Box>
                </>
              )}

              {!certInfoResult && !certInfoLoading && (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    src="./imgs/cifra.jpeg"
                    alt="test"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Загрузка информации о курсе
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <TextField
                        variant="filled"
                        value={nameCertInfo}
                        onChange={handleChangeCertInfo}
                        label="Название курса"
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        getCertificateCertInfo(account, nameCertInfo)
                      }
                    >
                      Загрузить информацию о курсе
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default Home;
