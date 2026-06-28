const Footer = () => {
  return (
    <footer className="drop-footer">
      <span>DROP.</span>
      <div className="footer-socials" style={{ display: 'flex', gap: '16px' }}>
        <a href="https://www.instagram.com/dropwaterco?igsh=cTFtemNscGpyNHBh&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/share/14kfqixwQTn/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://x.com/dropofficialw?s=11" target="_blank" rel="noreferrer">X</a>
      </div>
      <span>&copy; {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
