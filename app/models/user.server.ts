export type User = {
  id: string;
  email: string;
  imageUrl: string;
};

export const mockUser = {
  id: "1",
  email: "test@example.com",
  imageUrl: "https://placekitten.com/128/128",
} satisfies User;

export async function getCurrentUser() {
  return mockUser;
}
