import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { WelcomePage, ChallengesPage } from "../pages";

export default function Routes() {
  const router = createBrowserRouter([
    { path: "/", element: <WelcomePage /> },
    { path: "/challenges", element: <ChallengesPage /> },
  ]);

  return <RouterProvider router={router} />;
}
