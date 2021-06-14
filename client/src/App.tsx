import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import "./app.css";

const App = () => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const constructUrl = async () => {
      const localIp = await (await fetch("http://localhost:4000")).json();

      const code = nanoid();
      const url = new URL(`/send/${code}`, `http://${localIp}:4000`);
      setQrCode(url.href);

      const socket = io("http://localhost:4000");
      socket.on("id", (data) => {
        if (data === code)
          window.open(`http://localhost:4000/${data}`, "_blank");
      });
    };
    constructUrl();
  }, []);

  return (
    <main className="container">
      <QRCode value={qrCode} />
      <p>This QR Code reads: {qrCode}</p>
    </main>
  );
};

export default App;
