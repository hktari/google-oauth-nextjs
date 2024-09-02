import Head from "next/head";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

export default function Home() {
  return (
    <div className="container mx-auto  text-center py-12 space-y-2">
      <h1 className="text-3xl">Next.js Google OAuth Example</h1>
      <h3 className="text-gray-400">by Boštjan Kamnik</h3>

      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
      >
        <div class="max-w-xl mx-auto py-6 px-8 min-h-80 mt-20 bg-white rounded shadow-xl space-y-4">
          <form action="">
            <div class="mb-6">
              <label for="name" class="block text-gray-800 font-bold">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="username"
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>
            <div>
              <label for="email" class="block text-gray-800 font-bold">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="@email"
                class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
              <div className="text-end">
                <a
                  href="#"
                  class="content-end   text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
                >
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              Login
            </button>
          </form>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
