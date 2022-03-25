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

  const getCertificateURI = async (acc: string, courseName: string) => {
    {
      setCertificateURILoading(true);
      const res = await CertficateContract.viewCertificateURI(acc, courseName);
      setCertificateURI(res);
      setCertificateURILoading(false);
      const certificateURIResultT = await axios.get(res as unknown as string);
      setSertificateURIResult(certificateURIResultT?.data);
      console.log(certificateURIResult);
    }
  };

  const handleReset = () => {
    setCertificateURI(undefined);
    setSertificateURIResult(undefined);
    setName("");
  };

  const [name, setName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Typography variant="h5">Главное меню</Typography>

          <Box display="flex" gap={15} mt={2}>
            <Card sx={{ width: 345, height: 315 }}>
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
                  <CardMedia
                    component="img"
                    height="140"
                    image={certificateURIResult.image}
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
                  <CardActions>
                    <Button size="small" onClick={() => handleReset()}>
                      Загрузить другой сертификат
                    </Button>
                  </CardActions>
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
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default Home;
