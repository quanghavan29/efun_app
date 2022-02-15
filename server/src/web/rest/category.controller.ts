import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from "../../client/interceptors/logging.interceptor";
import { CategoryService } from "../../service/category.service";
import { CategoryDTO } from "../../service/dto/category.dto";


@Controller('api/categories')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('category-resource')
export class CategoryController {
    logger = new Logger('CategoryController');

    constructor(private readonly categoryService: CategoryService) { }

    @Get('/get-by-id/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Get category detail' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: CategoryDTO,
    })
    async getCategoryById(@Param('id') id: number): Promise<CategoryDTO> {
        const category = await this.categoryService.findById(id)

        return category;
    }

    @Get('/get-all')
    @ApiOperation({ title: 'Get the list of categories' })
    @ApiResponse({
        status: 200,
        description: 'List all categories',
        type: CategoryDTO,
    })
    async getAllCategories(): Promise<CategoryDTO[]> {
        return this.categoryService.findAll();
    }

    @Post('/create-new-category')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create new category' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CategoryDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createNewCategory(@Body() categoryDTO: CategoryDTO): Promise<CategoryDTO> {
        const categoryCreated = await this.categoryService.save(categoryDTO);

        return categoryCreated;
    }

    @Put('/update-category')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update category' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CategoryDTO,
    })
    async updateCategory(@Body() categoryDTO: CategoryDTO): Promise<CategoryDTO> {
        const categoryUpdated = await this.categoryService.update(categoryDTO);

        return categoryUpdated;
    }

    @Delete('/delete-category/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete category' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
        type: CategoryDTO,
    })
    async deleteCategory(@Param('id') id: number): Promise<CategoryDTO> {
        const categoryDeleted = await this.categoryService.delete(id);

        return categoryDeleted;
    }
}
