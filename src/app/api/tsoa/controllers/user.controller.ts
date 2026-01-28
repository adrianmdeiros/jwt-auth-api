import { Body, Controller, Get, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { CreateUserRequest, UserResponse } from '../models/user.dto'

@Route('api/users')
@Tags('Users')
export class UserTsoaController extends Controller {
  @Post()
  @SuccessResponse('201')
  public async create(@Body() body: CreateUserRequest): Promise<UserResponse> {
    // placeholder implementation only for spec generation
    return { id: '', email: body.email }
  }

  @Get()
  public async read(): Promise<UserResponse[]> {
    return []
  }
}
