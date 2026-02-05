export interface CreateUserRequest {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
}
