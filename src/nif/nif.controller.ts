import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { SentryInterceptor } from '../sentry.interceptor';

import { FindedEntityDTO } from '../database/dto/find-entity.dto';
import { SearchService } from 'src/search/search.service';

@UseInterceptors(SentryInterceptor)
@Controller('nif')
export class NifController {
  constructor(private _nifService: SearchService) {}

  @Get('/:nif')
  async findEntity(@Param('nif') nif: String): Promise<FindedEntityDTO> {
    const finderResponse = await this._nifService.findEntity(nif);
    if (!finderResponse.data)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `The provided nif ${nif} was not founded!`,
        },
        HttpStatus.NOT_FOUND
      );

    return finderResponse;
  }
}
