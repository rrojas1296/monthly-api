import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FinishOnboardingDto } from '../application/dto/finishOnboarding.dto';
import { JwtGuard } from 'src/infrastructure/shared/guards/jwt.guard';
import { type Response } from 'express';
import { type RequestWithUser } from '@/modules/auth/domain/interfaces/requestWithUser.interface';
import { OnboardingService } from '../application/onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private _onbaordingService: OnboardingService) {}

  @Post('finish')
  @UseGuards(JwtGuard)
  async finishOnboarding(
    @Body() data: FinishOnboardingDto,
    @Res() res: Response,
  ) {
    const r = await this._onbaordingService.finishOnboarding(data);
    return res.json(r).status(200);
  }

  @Get('validate')
  @UseGuards(JwtGuard)
  validateOnboarding(@Req() req: RequestWithUser) {
    return this._onbaordingService.validate(req.user.sub);
  }
}
