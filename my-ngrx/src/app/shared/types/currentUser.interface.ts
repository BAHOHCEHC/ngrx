export interface CurrentUserInterface {
  id: number,
  email: string,
  username: string,
  createdAt: string,
  bio: string | null,
  image: string | null,
  updatedAt: string,
  token: string,
}