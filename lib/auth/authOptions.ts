
import { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/connectDb";
import User from "@/models/User";

// Extend NextAuth session to include id
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id property
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
          scope: "profile email https://www.googleapis.com/auth/userinfo.profile", // Ensure picture scope
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        const imageUrl = profile?.picture || user.image; // Use picture from profile if available
        if (!existingUser) {
          await User.create({
            googleId: user.id,
            name: user.name || profile?.name,
            email: user.email || profile?.email,
            image: imageUrl,
          });
        } else if (!existingUser.image && imageUrl) {
          await User.updateOne({ email: user.email }, { image: imageUrl });
        }
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture || session.user.image; // Prioritize token.picture
        console.log("Session user with image:", session.user); // Debug log
      }
      return session;
    },
  },
};
