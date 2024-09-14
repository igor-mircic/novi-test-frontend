import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { apiBaseUrl } from "../config";

const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const authorizationTest = async () => {
      const response = await fetch(apiBaseUrl + "/api/authorizationTest/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json.msg);
      }
    };
    if (user) {
      authorizationTest();
    }
  }, [user]);

  return (
    <div>
      {user && (
        <h2>
          Welcome {user.firstName} {user.lastName}
        </h2>
      )}
    </div>
  );
};

export default Home;
