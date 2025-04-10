import { FunctionComponent } from "react";

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html }) => {
  return (
    <div
      
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
