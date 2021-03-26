import {IsEmail, IsNotEmpty, IsString, MaxLength, Min} from 'class-validator';
import {Schema} from 'mongoose';

export class AddUser {
  @IsNotEmpty({message: 'Full name is required'})
  @IsString({
    message: 'Full name is string',
  })
  fullname: string;

  @IsNotEmpty({message: 'Username is required'})
  @IsString({
    message: 'Username is string',
  })
  username: string;

  // @IsNotEmpty({message: 'Password is required'})
  // @MinLength(8, {
  //   message: 'Password must be at least 8 characters!',
  // })
  password: string;

  @IsEmail({}, {message: 'Email invalidate'})
  @MaxLength(200, {
    message: 'Email is too long',
  })
  email: string;

  phone?: string;

  avatar?: string;

  @IsNotEmpty({message: 'Total amount is required'})
  total_amount: number;

  @IsNotEmpty({message: 'Status is required'})
  is_virtual: boolean;

  status?: string;

  status_trading_copy?: string;
}

export class EditUser {
  _id?: Schema.Types.ObjectId;
  @IsNotEmpty({message: 'Full name is required'})
  @IsString({
    message: 'Full name is string',
  })
  fullname?: string;

  @IsNotEmpty({message: 'Username is required'})
  @IsString({
    message: 'Username is string',
  })
  username?: string;

  @IsEmail({}, {message: 'Email invalidate'})
  @MaxLength(200, {
    message: 'Email is too long',
  })
  email?: string;

  phone?: string;

  avatar?: string;

  @IsNotEmpty({message: 'Total amount is required'})
  total_amount?: number;

  @IsNotEmpty({message: 'Status is required'})
  is_virtual?: boolean;
}

export class GetUser {
  @IsNotEmpty({message: 'Id is required'})
  _id?: string;
}

export class TransferMoneyUser {
  @IsNotEmpty({message: 'Id is required'})
  id_user?: Schema.Types.ObjectId;

  @IsNotEmpty({message: 'Source is required'})
  source?: string;

  @IsNotEmpty({message: 'Amount is required'})
  @Min(10)
  amount?: number;
}

export class WalletUser {
  @IsNotEmpty({message: 'Id is required'})
  id_user?: Schema.Types.ObjectId;
}
