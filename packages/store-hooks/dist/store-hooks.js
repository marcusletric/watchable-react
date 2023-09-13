import { createStorePartition as o } from "@watchable/store";
import { useSelected as c } from "@watchable/store-react";
import { useRef as i } from "react";
function s(u, n) {
  const r = i(null);
  return r.current === null && (r.current = o(u, n)), [r.current !== null ? c(r.current, (t) => t) : void 0, (t) => {
    var e;
    return (e = r.current) == null ? void 0 : e.write(t);
  }];
}
export {
  s as usePartition
};
