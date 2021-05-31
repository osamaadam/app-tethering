import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import "./app.css";

const App = () => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const code = nanoid();
    setQrCode(code);

    const socket = io("http://localhost:4000");
    socket.on("id", (data) => {
      if (data === code)
        window.open(`http://localhost:4000/?id=${data}`, "_blank");
    });
  }, []);

  return (
    <main className="container">
      <QRCode value={qrCode} />
      <p>This QR Code reads: {qrCode}</p>
    </main>
  );
};

export default App;
