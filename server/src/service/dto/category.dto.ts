import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * An Category DTO object.
 */
export class CategoryDTO extends BaseDTO {
  @ApiModelProperty({ description: 'Category name' })
  name?: string;
}