import { Redirect } from "expo-router";

// The app opens on the login screen. Once Clerk is wired in, this is where signed-in users get routed past it.
export default function Index() {
  return <Redirect href="/login" />;
}
