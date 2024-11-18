import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import gsap from "gsap";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [qrCode, setQrCode] = useState("");

  const qrRef = useRef(null);

  useEffect(() => {
    if (qrCode) {
      gsap.fromTo(
        qrRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [qrCode]);

  const generateQRCode = async () => {
    try {
      if (text) {
        const qr = await QRCode.toDataURL(text, { width: size });
        setQrCode(qr);
      }
    } catch (error) {
      console.log("Error while getting QR Code", error);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center p-7 bg-gray-800 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-md p-4 bg-white shadow-xl rounded-xl"
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-2xl text-center font-bold mb-6  rounded-md">
          Generate your QR CODE Now
        </h1>
        <input
          className="w-full p-2 border rounded-md mb-6 focus:outline-none focus:border-black"
          type="text"
          placeholder="Enter your Text or Paste URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mb-4">
          <label htmlFor="sizes" className="block mb-2 font-medium">
            Select Size:
          </label>
          <select
            id="sizes"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
          >
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((s) => (
              <option key={s} value={s}>
                {" "}
                {`${s} x ${s}`}
              </option>
            ))}
          </select>
        </div>
        <motion.button
          onClick={generateQRCode}
          className="w-full bg-black text-white py-2 rounded-2xl transition"
          whileTap={{ scale: 0.95 }}
        >
          Generate
        </motion.button>
        {qrCode && (
          <div className="mt-4 flex flex-col items-center">
            <motion.img ref={qrRef} src={qrCode} className="w-full" />
            <motion.a
              href={qrCode}
              download="QR_Code.png"
              className="mt-4 bg-black text-white text-lg font-normal text-semi py-2 px-4 rounded transition"
              whileHover={{ scale: 1.1 }}
            >
              Download
            </motion.a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QrCodeGenerator;
