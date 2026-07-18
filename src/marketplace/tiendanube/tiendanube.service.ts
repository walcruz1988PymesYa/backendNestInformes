import { Injectable } from '@nestjs/common';
import { CreateTiendanubeDto } from './dto/create-tiendanube.dto';
import { UpdateTiendanubeDto } from './dto/update-tiendanube.dto';
import { ConfigService } from '@nestjs/config';
import { TIENDANUBE_URLS } from './constants/tiendanube.constans';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { MarketplaceConnection,MarketplaceConnectionDocument} from './schema/marketplace-connection.schema';
import { Model } from 'mongoose';

@Injectable()
export class TiendanubeService {
  constructor(private readonly configService: ConfigService,

    private readonly httpService: HttpService,
    @InjectModel(MarketplaceConnection.name)
    private readonly marketplaceConnectionModel: Model<MarketplaceConnectionDocument>
  ) {
  }


  create(createTiendanubeDto: CreateTiendanubeDto) {
    return 'This action adds a new tiendanube';
  }

  findAll() {
    return `This action returns all tiendanube`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiendanube`;
  }

  update(id: number, updateTiendanubeDto: UpdateTiendanubeDto) {
    return `This action updates a #${id} tiendanube`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiendanube`;
  }


  //we are buildig a url https://www.tiendanube.com/apps/authorize?client_id=36343&response_type=code&redirect_uri=http://localhost:3001/marketplace/tiendanube/callback

  connect() {
    const clientId = this.configService.get<string>('TIENDANUBE_CLIENT_ID');
    const redirectUri = this.configService.getOrThrow<string>(
      'TIENDANUBE_REDIRECT_URI',
    );
    const state = crypto.randomUUID();
    const url =
      `https://www.tiendanube.com/apps/${clientId}/authorize` +
      `?state=${state}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log(url);
    return url
  }

  callback(code: string, state?: string) {

    console.log('Authorization Code:', code);
    console.log('State:', state);

    return {
      success: true,
      code,
      state,
    };
  }

  async exchangeCodeForToken(code: string) {

    const response = await firstValueFrom(
      this.httpService.post(
        'https://www.tiendanube.com/apps/authorize/token',
        {
          client_id: this.configService.getOrThrow('TIENDANUBE_CLIENT_ID'),
          client_secret: this.configService.getOrThrow('TIENDANUBE_CLIENT_SECRET'),
          grant_type: 'authorization_code',
          code,
        },
      ),
    );
    const data = response.data;

    await this.marketplaceConnectionModel.findOneAndUpdate(
      {
        //idCompany,
        platform: 'tiendanube',
      },
      {
        userId: data.user_id,
        accessToken: data.access_token,
        scopes: data.scope.split(','),
        active: true,
      },
      {
        upsert: true,
        new: true,
      },
    );

    return data;
  }
}


//https://partners.tiendanube.com/applications/authentication/36343
//http://localhost:3000/api/nest/tiendanube/callback?code=XXXXXXXX&state=...