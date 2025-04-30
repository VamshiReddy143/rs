import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-jwt-secret'
);

interface TokenPayload {
  adminId: string;
  email: string;
  role: string;
  [key: string]: unknown; // Add index signature
}

export async function verifyAuth(token: string): Promise<TokenPayload | null> {
  try {
    console.log('[verifyAuth] Verifying token');
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    console.log('[verifyAuth] Payload:', JSON.stringify(payload));

    // Validate payload structure
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'adminId' in payload &&
      typeof payload.adminId === 'string' &&
      'email' in payload &&
      typeof payload.email === 'string' &&
      'role' in payload &&
      typeof payload.role === 'string'
    ) {
      return {
        adminId: payload.adminId,
        email: payload.email,
        role: payload.role,
      };
    } else {
      console.error('[verifyAuth] Invalid payload structure:', payload);
      return null;
    }
  } catch (error: any) {
    console.error('[verifyAuth] Token verification failed:', error.message);
    return null;
  }
}

export async function generateAuthToken(admin: {
  _id: string;
  email: string;
  role: string;
}): Promise<string> {
  try {
    console.log('[generateAuthToken] Generating token for:', admin.email);
    const payload: TokenPayload = {
      adminId: admin._id,
      email: admin.email,
      role: admin.role,
    };
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(JWT_SECRET);
    console.log('[generateAuthToken] Token generated');
    return token;
  } catch (error: any) {
    console.error('[generateAuthToken] Error:', error.message);
    throw error;
  }
}