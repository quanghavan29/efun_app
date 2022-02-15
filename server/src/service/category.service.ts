import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryDTO } from "./dto/category.dto";
import { CategoryMapper } from "./mapper/category.mapper";


@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) { }

    async findById(id: number): Promise<CategoryDTO | undefined> {
        const result = await this.categoryRepository.findOne(id);
        return CategoryMapper.fromEntityToDTO(result);
    }

    async findAll(): Promise<CategoryDTO[] | undefined> {
        const resultList = await this.categoryRepository.find();
        const categoriesDTO: CategoryDTO[] = [];
        if (resultList) {
            resultList.forEach(category => categoriesDTO.push(CategoryMapper.fromEntityToDTO(category)));
        }
        return categoriesDTO;
    }

    async save(categoryDTO: CategoryDTO): Promise<CategoryDTO | undefined> {
        const newCategory = CategoryMapper.fromDTOtoEntity(categoryDTO); 
        const categoryCreated = await this.categoryRepository.save(newCategory);

        return CategoryMapper.fromEntityToDTO(categoryCreated);
    }

    async update(categoryDTO: CategoryDTO): Promise<CategoryDTO | undefined> {
        const categoryToUpdate = CategoryMapper.fromDTOtoEntity(categoryDTO);
        const categoryUpdated = await this.categoryRepository.save(categoryToUpdate);

        return CategoryMapper.fromEntityToDTO(categoryUpdated);
    }

    async delete(id: number): Promise<CategoryDTO | undefined> {
        const categoryToDelete = await this.categoryRepository.findOne(id);
        const categoryDeleted = await this.categoryRepository.remove(categoryToDelete);

        return CategoryMapper.fromEntityToDTO(categoryDeleted);
    }

}
