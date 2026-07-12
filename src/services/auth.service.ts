import { UserRepository } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';

export class AuthService {
  static async login(data: { email: string; password: string }) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const storedPassword = user.password;
    if (typeof storedPassword !== 'string' || storedPassword.length === 0) {
      throw new Error('This account does not have password login enabled. Please use Google/Apple.');
    }

    const isMatch = await bcrypt.compare(data.password, storedPassword);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    await createSession(user._id.toString(), user.email, user.name);

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  static async register(data: { name: string; email: string; password: string }) {
    const existingUser = await UserRepository.findByEmail(data.email);
    
    if (existingUser) {
      const existingPassword = existingUser.password;
      const hasPassword = typeof existingPassword === 'string' && existingPassword.length > 0;

      if (!hasPassword) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        await UserRepository.updateUser(existingUser._id.toString(), {
          name: existingUser.name || data.name,
          password: hashedPassword,
          passwordEnabledAt: new Date(),
          updatedAt: new Date(),
        });

        return { message: 'Password login enabled successfully.', status: 200 };
      }

      throw new Error('User with this email already exists.');
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      provider: 'credentials',
      createdAt: new Date(),
    };

    await UserRepository.createUser(newUser);

    return { message: 'User registered successfully.', status: 201 };
  }
}
