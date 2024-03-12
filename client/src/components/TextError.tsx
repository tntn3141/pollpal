import { PropsWithChildren } from "react";

function TextError(props: PropsWithChildren) {
  return <div className="text-red-600">{props.children}</div>;
}

export default TextError;
