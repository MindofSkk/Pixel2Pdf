export const Header: React.FC = () => {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#0d6efd",
        padding: "10px 20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="logo">
            {/* <img src="./src/assets/mainlogo.png" alt="" width={"200px"} /> */}
          <a style={{ fontWeight: "bold", color: "white", fontSize: "20px" }} href="/">
            Pixel2Pdf
          </a>
        </div>
        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="#merge" style={{ color: "white", textDecoration: "none" }}>
            Merge
          </a>
          <a href="#split" style={{ color: "white", textDecoration: "none" }}>
            Split
          </a>
          <a href="#compress" style={{ color: "white", textDecoration: "none" }}>
            Compress
          </a>
          <a href="#convert" style={{ color: "white", textDecoration: "none" }}>
            Convert
          </a>
        </nav>
      </div>
    </header>
  );
};
