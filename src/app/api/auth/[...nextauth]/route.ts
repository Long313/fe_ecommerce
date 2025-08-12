// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  pages: {
    signIn: '/login',     // Trang đăng nhập (tùy chọn)
    signOut: '/goodbye',  // Trang đăng xuất (tùy chọn)
    error: '/error',      // Trang lỗi
    newUser: '/',         // Trang chuyển về sau khi người dùng đăng nhập lần đầu tiên
  },
});

export { handler as GET, handler as POST };
