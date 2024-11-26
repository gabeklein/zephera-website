export const Button = ({ secondary }) => {
  background: 0x6c63ff;
  border: "1.5px", solid, 0x6c63ff;
  padding: 10, 20;
  radius: 5;
  color: white;
  display: flex;
  gap: 20;
  alignItems: center;
  justifyContent: center;
  whiteSpace: nowrap;

  if(secondary) {
    background: 0xeee;
    color: 0x6c63ff;
  }
}