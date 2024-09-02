import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import Notification from "../components/notification";
import { LoginResponseData } from "./api/login";

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [loginResponseMessage, setLoginResponseMessage] = useState("");
  const [loginResponseTitle, setLoginResponseTitle] = useState("");

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialResponse),
      });

      const loginResponse = await response.json() as LoginResponseData;

      if (!response.ok) {
        throw new Error(loginResponse.error);
      }

      setLoginResponseTitle("Login Success");
      setLoginResponseMessage(`Welcome ${loginResponse.user.name}!`);
    } catch (error) {
      setLoginResponseTitle("Login Failed");
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      setLoginResponseMessage(errorMessage);
    } finally {
      setShowNotification(true);
    }
  };

  const onGoogleLoginFailed = () => {
    setLoginResponseTitle("Login Failed");
    setLoginResponseMessage("Something went wrong.");
    setShowNotification(false);
  };

  return (
    <div className="container mx-auto  text-center py-12 space-y-2">
      <h1 className="text-3xl">Next.js Google OAuth Example</h1>
      <h3 className="text-gray-400">by Boštjan Kamnik</h3>

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
      >
        <div className="max-w-xl mx-auto py-6 px-8 min-h-80 mt-20 bg-white rounded shadow-xl space-y-4">
          <form action="">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-800 font-bold">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="@email"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              <div className="text-end">
                <a
                  href="#"
                  className="content-end   text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
                >
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button
              disabled
              className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            >
              Login
            </button>
          </form>

          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailed}
          />
        </div>
      </GoogleOAuthProvider>
      <Notification
        handleClose={() => setShowNotification(false)}
        open={showNotification}
        text={loginResponseMessage}
        title={loginResponseTitle}
      />
    </div>
  );
}
