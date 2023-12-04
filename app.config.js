import { merge } from "lodash";

export default ({ config }) => {
  return merge({}, config, {
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
  });
};
