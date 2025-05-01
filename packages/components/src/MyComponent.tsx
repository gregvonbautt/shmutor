import React, { useState } from "react";

export function MyComponent(): React.ReactElement {
  const [x, setX] = useState(0)


  return <div onClick={() => setX(x + 1)}>hello {x}</div>
}
