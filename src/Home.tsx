import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Skeleton,
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

  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Typography variant="h5">Главное меню</Typography>

          <Box display="flex" gap={15}>
            <Card sx={{ width: 345 }}>
              {certificateURILoading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                >
                  <CircularProgress />{" "}
                </Box>
              )}
              {certificateURIResult ? (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image={certificateURIResult.image}
                    alt="green iguana"
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
                    <Button
                      size="small"
                      onClick={() => getCertificateURI(account, "Math")}
                    >
                      Share
                    </Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </>
              ) : (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    src={"./imgs/first.jpg"}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => getCertificateURI(account, "Math")}
                    >
                      Share
                    </Button>
                    <Button size="small">Learn More</Button>
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
