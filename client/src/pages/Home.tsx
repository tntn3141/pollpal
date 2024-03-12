import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => (state.user));
  const saveUser = useUserStore((state) => (state.saveUser));
  const getResource = async () => {
    const response = await axios.get("/resource", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    setData(response.data);
  };
  const logout = () => {
    saveUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Header />
      {user?.name}
      <button onClick={getResource}>Click</button>
      {data ? data : "No data to be shown."}
      <div>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default Home;
