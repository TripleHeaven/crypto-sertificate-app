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
} from '@mui/material'
import axios from 'axios'
import { ethers } from 'ethers'
import { useState } from 'react'
import './App.css'
import { CertficatesAbi, CertficatesAddr } from './constants/provider'
import { CertificatesLogic } from './contracts/CertificatesLogic'
import { useMetaMask } from './hooks/useMetaMask'
import { useEtherProvider } from './hooks/useProvider'

function Home() {
  const { provider } = useEtherProvider()
  const { account } = useMetaMask()
  const CertficateContract = new ethers.Contract(
    CertficatesAddr,
    CertficatesAbi,
    provider
  ) as unknown as CertificatesLogic

  const [certificateURI, setCertificateURI] = useState<any>()
  const [certificateURILoading, setCertificateURILoading] = useState(false)
  const [certificateURIResult, setSertificateURIResult] = useState<any>()

  const [NFTT, setNFTT] = useState<any>()
  const [NFTTLoading, setNFTTLoading] = useState(false)
  const [NFTTResult, setNFTTResult] = useState<any>()

  const getCertificateURI = async (acc: string, courseName: string) => {
    {
      setCertificateURILoading(true)
      const res = await CertficateContract.viewCertificateURI(acc, courseName)
      setCertificateURI(res)
      setCertificateURILoading(false)
      const certificateURIResultT = await axios.get(res as unknown as string)
      setSertificateURIResult(certificateURIResultT?.data)
      console.log(certificateURIResult)
    }
  }

  const getCertificateNFTT = async (acc: string, courseName: string) => {
    {
      setNFTTLoading(true)
      const res = await CertficateContract.viewCertificateURI(acc, courseName)
      setNFTT(res)
      setNFTTLoading(false)
      const NFTTT = await axios.get(res as unknown as string)
      setNFTTResult(NFTTT?.data)
      console.log(NFTT?.data)
    }
  }

  const handleReset = () => {
    setCertificateURI(undefined)
    setSertificateURIResult(undefined)
    setName('')
  }

  const [name, setName] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

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
                  height="100%">
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
                        window.open(certificateURIResult.image, '_blank')
                      }>
                      Скачать сертификат
                    </Button>
                    <Button size="small" onClick={() => handleReset()}>
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
                      onClick={() => getCertificateURI(account, name)}>
                      Загрузить сертификат
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
            <Card sx={{ width: 345, minHeight: 450 }} component={Box}>
              {NFTTLoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  width="100%"
                  height="100%">
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
                      NFT Token
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {NFTTResult}
                    </Typography>
                  </CardContent>
                  <Box mt="auto">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        window.open(certificateURIResult.image, '_blank')
                      }>
                      Скачать сертификат
                    </Button>
                    <Button size="small" onClick={() => handleReset()}>
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
                      onClick={() => getCertificateURI(account, name)}>
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
  )
}

export default Home
