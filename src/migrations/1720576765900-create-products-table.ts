import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1720576765900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS products (
                id UUID PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                nm VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                weight_volume VARCHAR(10) NOT NULL,
                price DECIMAL NOT NULL,
                image_url VARCHAR(255) NOT NULL,
                category JSON NOT NULL,
                stablishment_id UUID NOT NULL,
                CONSTRAINT fk_stablishments_id FOREIGN KEY (stablishment_id) REFERENCES stablishments(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS products;
        `)
    }

}
