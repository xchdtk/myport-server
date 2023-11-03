-- CreateTable
CREATE TABLE `users` (
    `user_seq` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `birth_date` VARCHAR(20) NOT NULL,
    `interests` VARCHAR(20) NOT NULL,
    `status` VARCHAR(20) NULL,
    `introduce` VARCHAR(300) NULL,
    `create_date` DATETIME(0) NULL,
    `modify_date` DATETIME(0) NULL,
    `delete_date` DATETIME(0) NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`user_seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_sns` (
    `user_sns_seq` INTEGER NOT NULL AUTO_INCREMENT,
    `insta_url` VARCHAR(100) NULL,
    `github_url` VARCHAR(100) NULL,
    `velog_url` VARCHAR(100) NULL,
    `user_seq` INTEGER NOT NULL,
    `create_date` DATETIME(0) NULL,
    `modify_date` DATETIME(0) NULL,
    `delete_date` DATETIME(0) NULL,

    INDEX `user_seq`(`user_seq`),
    PRIMARY KEY (`user_sns_seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_teams` (
    `user_team_seq` INTEGER NOT NULL AUTO_INCREMENT,
    `user_seq` INTEGER NOT NULL,
    `team_seq` INTEGER NOT NULL,
    `user_role` VARCHAR(20) NOT NULL,
    `job` VARCHAR(50) NULL,
    `create_date` DATETIME(0) NULL,
    `modify_date` DATETIME(0) NULL,
    `delete_date` DATETIME(0) NULL,

    INDEX `team_seq`(`team_seq`),
    INDEX `user_seq`(`user_seq`),
    PRIMARY KEY (`user_team_seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_terms` (
    `user_term_seq` INTEGER NOT NULL AUTO_INCREMENT,
    `folio_agreement` TINYINT NULL,
    `privacy_agreement` TINYINT NULL,
    `location_agreement` TINYINT NULL,
    `user_seq` INTEGER NULL,
    `create_date` DATETIME(0) NULL,
    `modify_date` DATETIME(0) NULL,
    `delete_date` DATETIME(0) NULL,

    INDEX `user_seq`(`user_seq`),
    PRIMARY KEY (`user_term_seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `team_seq` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `detail_description` VARCHAR(500) NULL,
    `user_seq` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `thumbnail_image_url` VARCHAR(500) NULL,
    `recruitment` VARCHAR(500) NULL,
    `create_date` DATETIME(0) NULL,
    `modify_date` DATETIME(0) NULL,
    `delete_date` DATETIME(0) NULL,

    INDEX `user_seq`(`user_seq`),
    PRIMARY KEY (`team_seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
