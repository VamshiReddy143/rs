import mongoose from "mongoose";
import connectToDatabase  from "@/lib/connectDb";
import Subscription from "@/models/Subscription";
import User from "@/models/User";

async function syncUsers() {
  try {
    await connectToDatabase();

    const subscriptions = await Subscription.find().lean();
    for (const sub of subscriptions) {
      const user = await User.findOne({ email: { $regex: `^${sub.email}$`, $options: "i" } }).lean();
      if (!user) {
        console.log(`Creating User for ${sub.email}`);
        await User.create({
          googleId: `manual-${sub.email}`,
          email: sub.email,
          name: "Subscriber",
          image: "/default-avatar.png",
        });
      }
    }

    console.log("User sync completed");
    process.exit(0);
  } catch (error: any) {
    console.error("Sync error:", error.message);
    process.exit(1);
  }
}

syncUsers();