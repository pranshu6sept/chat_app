import React, { useEffect } from "react";
import Home from "./components/Home";
import axios from "axios";

import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();

  useEffect(() => {
    const saveUserDetails = async () => {
      if (user) {
        const userId = user.id;
        const username = user.username;

        try {
          const response = await axios.post("http://localhost:3000/saveuser", {
            userId,
            username,
          });
          console.log("User details saved successfully:", response.data);
        } catch (error) {
          console.error("Error saving user details:", error);
        }
      }
    };

    saveUserDetails();
  }, [user]);

  return (
    <div>
      <SignedOut>
        <div className="h-screen w-screen flex justify-center items-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
    </div>
  );
}

export default App;
