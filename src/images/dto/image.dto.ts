import { IsString, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
export class ImageDto {
  @Expose()
  @IsString()
  url: string;

  @Expose()
  @IsBoolean()
  isMain: boolean;
}
