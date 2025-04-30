import { AuthOptions, DefaultSession, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/connectDb";
import User from "@/models/User";
import Subscription from "@/models/Subscription";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  // Define Google-specific profile
  interface Profile {
    sub?: string; // Google user ID
    name?: string;
    email?: string;
    picture?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();
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
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture || session.user.image || "/default-avatar.png";
        session.user.name = session.user.name || "Anonymous";
      }
      return session;
    },
  },
};