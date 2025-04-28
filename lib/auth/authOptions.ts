import { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/connectDb";
import User from "@/models/User";
import Subscription from "@/models/Subscription";

// Extend NextAuth session to include id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      try {
        await connectToDatabase();

        // Log OAuth data for debugging
        console.log("Google OAuth data:", { user, profile });

        if (!user.email) {
          console.error("No email provided by Google OAuth");
          return false;
        }

        const imageUrl = profile?.picture || user.image || "/default-avatar.png";
        const name = user.name || profile?.name || "Anonymous";

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            googleId: user.id || profile?.sub,
            name,
            email: user.email,
            image: imageUrl,
          });
          console.log(`Created new user: ${user.email}`);
        } else {
          // Update name and image if missing or outdated
          await User.updateOne(
            { email: user.email },
            {
              $set: {
                name: existingUser.name || name,
                image: existingUser.image || imageUrl,
                googleId: existingUser.googleId || user.id || profile?.sub,
              },
            }
          );
          console.log(`Updated user: ${user.email}`);
        }

        // Ensure Subscription record exists
        await Subscription.findOneAndUpdate(
          { email: user.email },
          { email: user.email, createdAt: new Date() },
          { upsert: true, new: true }
        );

        return true;
      } catch (error: any) {
        console.error("Sign-in error:", error.message);
        return false;
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture || session.user.image || "/default-avatar.png";
        session.user.name = session.user.name || "Anonymous";
        console.log("Session user:", session.user);
      }
      return session;
    },
  },
};