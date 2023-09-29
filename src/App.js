import {
  Suspense,
  useDeferredValue,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import { cities } from "./constants";

const List = ({ query }) => {
  return (
    <div>
      {cities
        .filter((c) => c.includes(query))
        .map((l) => (
          <div className="list-item" key={l}>
            {l}
          </div>
        ))}
    </div>
  );
};

export default function App() {
  const [search, setSearch] = useState("");

  const query = useDeferredValue(search);
  const inputRef = useRef("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useLayoutEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Search</h1>
      <label>
        <input
          ref={inputRef}
          value={search}
          onChange={handleSearch}
          placeholder="Search Cities"
        />
      </label>
      <Suspense fallback={"Loading..."}>
        <List query={query} />
      </Suspense>
    </div>
  );
}
