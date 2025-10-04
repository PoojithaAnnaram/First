import { useState, useEffect } from 'react';

function Captcha({ onVerify }) {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [verified, setVerified] = useState(false);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(code);
    setVerified(false);
    setUserInput('');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const isValid = userInput === captchaCode;
    setVerified(isValid);
    onVerify(isValid);
    if (!isValid) {
      generateCaptcha();
    }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-display">
        <canvas
          ref={(canvas) => {
            if (canvas && captchaCode) {
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.fillStyle = '#f7fafc';
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              for (let i = 0; i < 3; i++) {
                ctx.strokeStyle = `rgba(102, 126, 234, ${Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.moveTo(Math.random() * 200, Math.random() * 60);
                ctx.lineTo(Math.random() * 200, Math.random() * 60);
                ctx.stroke();
              }

              ctx.font = 'bold 28px Arial';
              ctx.fillStyle = '#1a202c';
              ctx.textBaseline = 'middle';
              for (let i = 0; i < captchaCode.length; i++) {
                ctx.save();
                const x = 20 + i * 28;
                const y = 30;
                ctx.translate(x, y);
                ctx.rotate((Math.random() - 0.5) * 0.4);
                ctx.fillText(captchaCode[i], 0, 0);
                ctx.restore();
              }

              for (let i = 0; i < 30; i++) {
                ctx.fillStyle = `rgba(102, 126, 234, ${Math.random()})`;
                ctx.fillRect(Math.random() * 200, Math.random() * 60, 2, 2);
              }
            }
          }}
          width="200"
          height="60"
        />
        <button type="button" onClick={generateCaptcha} className="captcha-refresh" title="Refresh">
          ↻
        </button>
      </div>
      <div className="captcha-input-group">
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={verified ? 'verified' : ''}
          disabled={verified}
        />
        <button type="button" onClick={handleVerify} disabled={verified} className="captcha-verify-btn">
          {verified ? '✓ Verified' : 'Verify'}
        </button>
      </div>
    </div>
  );
}

export default Captcha;
