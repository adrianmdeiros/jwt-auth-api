import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { CreateUserRequest } from '../models/user.dto'

@Route('api/auth')
@Tags('Auth')
export class AuthTsoaController extends Controller {
  @Post()
  @SuccessResponse('200')
  public async authenticate(@Body() body: CreateUserRequest): Promise<{ token: string }> {
    // implementation not used at runtime — placeholder for spec generation
    return { token: '' }
  }
}
