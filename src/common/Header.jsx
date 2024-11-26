import { Button } from "common/Button";

export const Header = () => {
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)";
  background: 0xeee;

  center: {
    maxWidth: 1000;
    margin: auto;
    gridColumns: min, auto, min;
    alignItems: center;
    padding: 15, 20;
    gap: 20;
  }

  links: {
    display: flex;
    gap: 20;
    alignItems: center;
    justifyContent: center;
  }

  <center>
    <Logo />
    <links>
      <a>Solutions</a>
      <a>Features</a>
      <a>Pricing</a>
      <a>Contact</a>
    </links>
    <Button>
      Get Started
    </Button>
  </center>
}

const Logo = () => {
  fontSize: 28;
  fontWeight: 700;

  <this>
    Zephera
  </this>
}