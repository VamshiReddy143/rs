import  connectDB  from '@/lib/connectDb';
import Admin from '@/models/Admin';

async function createAdmin() {
  try {
    await connectDB();

    const email = 'admin@gamil.com';
    const password = '123456'; // Change this!
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new Admin({
      email,
      password, // Will be hashed by pre-save hook
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created:', email);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    process.exit();
  }
}

createAdmin();