import { Button } from "common/Button";

export const Hero = () => {
  // outline: "1px", dashed, 0x000;
  minHeight: 350;
  display: flex;
  alignItems: center;
  justifyContent: center;
  flexDirection: column;

  group: {
    display: flex;
    gap: 20;
    alignItems: center;
    justifyContent: center;
    marginTop: 30;

    Button: {
      fontWeight: 700;
    }
  }

  <this>
    <h1>Empowering Your Cloud Journey</h1>
    <div>
      Innovative tools to scale your infrastructure securely and efficiently.
    </div>
    <group>
      <Button>
        Get Started
      </Button>
      <Button secondary>
        Learn More
      </Button>
    </group>
  </this>;
};
