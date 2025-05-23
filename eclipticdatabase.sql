-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 23 mai 2025 à 23:12
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eclipticdatabase`
--

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE DATABASE IF NOT EXISTS `eclipticdatabase`;

USE `eclipticdatabase`;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_05_10_123634_create_users_table', 1),
(2, '2025_05_10_123644_create_products_table', 1),
(3, '2025_05_10_123659_create_orders_table', 1),
(4, '2025_05_10_123715_create_reviews_table', 1),
(5, '2025_05_10_165723_create_personal_access_tokens_table', 1),
(6, '2025_05_10_210236_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('PENDING','PAID','SHIPPED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_product_id_foreign` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `quantity`, `price`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(9, 5, 4, 1, 200.00, 200.00, 'CANCELLED', '2025-05-23 21:12:57', '2025-05-23 21:13:03'),
(8, 5, 7, 3, 300.00, 900.00, 'PAID', '2025-05-23 20:45:30', '2025-05-23 20:46:08'),
(7, 5, 6, 2, 300.00, 600.00, 'CANCELLED', '2025-05-23 20:44:56', '2025-05-23 20:45:11');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'c3f29251240c048e9c31261b7fa05c5bee023f8f8a7334dd8b6805c203eac281', '[\"*\"]', '2025-05-23 11:03:36', NULL, '2025-05-23 11:02:57', '2025-05-23 11:03:36'),
(2, 'App\\Models\\User', 1, 'auth_token', 'd114ef7f29dc3ef63003c21f97e34d216a454d3894daa257f72fb5b2936c355d', '[\"*\"]', '2025-05-23 20:04:04', NULL, '2025-05-23 11:03:43', '2025-05-23 20:04:04'),
(18, 'App\\Models\\User', 5, 'auth_token', '235d8f835935a8da364ffc69fdcd4df9dc9cfeddf37d18b80c151684eac94693', '[\"*\"]', '2025-05-23 22:12:11', NULL, '2025-05-23 22:12:07', '2025-05-23 22:12:11'),
(14, 'App\\Models\\User', 1, 'auth_token', '8bc264af2c2ad6ee2a3842a0206fe0f5fe7599508cf6042bfd33a41b8cd79137', '[\"*\"]', '2025-05-23 21:44:29', NULL, '2025-05-23 21:44:03', '2025-05-23 21:44:29'),
(15, 'App\\Models\\User', 4, 'auth_token', 'ec95476a20e792edaacb402662fe35854924e9557edb2b9eb65cc08796a43120', '[\"*\"]', '2025-05-23 21:45:06', NULL, '2025-05-23 21:44:51', '2025-05-23 21:45:06');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `created_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_created_by_foreign` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image_url`, `category`, `size`, `quantity`, `created_by`, `created_at`, `updated_at`) VALUES
(4, 'Graphic T-Shirt', 'T-shirt beige avec motif graphique abstrait et imprimé artistique, parfait pour un look streetwear moderne.', 200.00, 'http://127.0.0.1:8000/storage/products/RZSnHlxM5SwRLskYp7BBm77dKOJTttYypazmDABm.jpg', 'Vêtements', 'L', 15, 1, '2025-05-23 19:57:48', '2025-05-23 19:57:48'),
(5, 'Graphic T-Shirt', 'T-shirt beige avec motif graphique abstrait et imprimé artistique, parfait pour un look streetwear moderne.', 200.00, 'http://127.0.0.1:8000/storage/products/nZoCmrumk2KnrJDXmLdNywgFiT3S90gEgIcNBlCe.jpg', 'Vêtements', 'M', 20, 1, '2025-05-23 19:57:49', '2025-05-23 19:57:49'),
(3, 'Sneakers noires tactiques', 'Chaussures montantes noires avec design robuste, idéales pour les tenues urbaines et sportives.', 200.00, 'http://127.0.0.1:8000/storage/products/H4hbmXhW9nVTa5WeRlOPSAgsd9VFzwGDB4rhnzkR.jpg', 'Chaussures', 'S', 10, 1, '2025-05-23 19:54:06', '2025-05-23 19:54:06'),
(6, 'Hoodie Noir Graphique', 'Sweat à capuche noir avec motifs sombres et finition oversize, parfait pour une tenue streetwear.', 300.00, 'http://127.0.0.1:8000/storage/products/LKMZzNCecYzkp8tqHtlQvM160D9LKydBGwF8siko.jpg', 'Vêtements', 'L', 15, 1, '2025-05-23 19:59:15', '2025-05-23 19:59:15'),
(7, 'Hoodie Noir Graphique', 'Sweat à capuche noir avec motifs sombres et finition oversize, parfait pour une tenue streetwear.', 300.00, 'http://127.0.0.1:8000/storage/products/KB4oxVFvgh9WA9HjuhH4Y1rJPnO9dGpi7Mq2caR0.jpg', 'Vêtements', 'M', 20, 1, '2025-05-23 19:59:15', '2025-05-23 19:59:15'),
(8, 'Hoodie Noir Graphique', 'Sweat à capuche noir avec motifs sombres et finition oversize, parfait pour une tenue streetwear.', 300.00, 'http://127.0.0.1:8000/storage/products/QJjoE4YII7VdnUunobVBD0CElT2Kz7KWZdrAqycn.jpg', 'Vêtements', 'S', 10, 1, '2025-05-23 19:59:16', '2025-05-23 19:59:16'),
(9, 'Hoodie techwear noir', 'Sweat à capuche noir avec éléments beige contrastants, coupe oversize et style techwear. Tissu épais de qualité, parfait pour un look streetwear moderne et audacieux.', 180.00, 'http://127.0.0.1:8000/storage/products/3miOwpAdTwpupSRQpvGHiwa0df320je547q9ZgzZ.jpg', 'Vêtements', 'L', 15, 1, '2025-05-23 20:00:50', '2025-05-23 20:00:50'),
(10, 'Hoodie techwear noir', 'Sweat à capuche noir avec éléments beige contrastants, coupe oversize et style techwear. Tissu épais de qualité, parfait pour un look streetwear moderne et audacieux.', 180.00, 'http://127.0.0.1:8000/storage/products/MGYTJqYtFYHcI9NeayU4qr7Gvu60jjcjiPONH9Bh.jpg', 'Vêtements', 'M', 20, 1, '2025-05-23 20:00:51', '2025-05-23 20:00:51'),
(11, 'Hoodie techwear noir', 'Sweat à capuche noir avec éléments beige contrastants, coupe oversize et style techwear. Tissu épais de qualité, parfait pour un look streetwear moderne et audacieux.', 180.00, 'http://127.0.0.1:8000/storage/products/SY3sZCcByDnRtD2fmNZXDhA4u3FWC7TrGkz368jY.jpg', 'Vêtements', 'S', 10, 1, '2025-05-23 20:00:52', '2025-05-23 20:00:52'),
(12, 'Sac à dos minimaliste noir', 'Sac à dos polyvalent, design sobre et compartiments multiples, idéal pour étudiants et travailleurs.', 400.00, 'http://127.0.0.1:8000/storage/products/CYZkCaZ20cvYmYfcq817SRBQ0BBIqVpeRNQprQ5D.jpg', 'Équipement', 'S', 10, 1, '2025-05-23 20:02:27', '2025-05-23 20:02:27'),
(13, 'anneau noire minimaliste unisexe', 'anneau noire au design épuré et moderne, idéale pour un style minimaliste ou streetwear. Conçue en acier inoxydable, résistante à l’eau et à l’usure, unisexe et parfaite pour toutes occasions.', 20.00, 'http://127.0.0.1:8000/storage/products/Q1dyTB0muNX3mFhKgBb2KpzLz0cI65UJMLpBD3BB.jpg', 'Accessoires', 'S', 10, 1, '2025-05-23 20:04:05', '2025-05-23 20:04:05'),
(14, 'Maillot Argentine Domicile 1998', 'Maillot vintage de l’équipe nationale d’Argentine, modèle domicile Coupe du Monde 1998. Détails emblématiques : bandes verticales bleues et blanches, numéro 9 brodé, logo Adidas et blason AFA. Tissu respirant de haute qualité, parfait pour les fans de football et les collectionneurs.', 359.00, 'http://127.0.0.1:8000/storage/products/GlWnGguZ2ezULnjnBVYttpQy0BmSNBxKB6MxF2vl.jpg', 'Vêtements', 'M', 10, 1, '2025-05-23 21:39:55', '2025-05-23 21:39:55');

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `rating` int NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `address`, `password`, `role`, `created_at`, `updated_at`) VALUES
(6, 'admin', 'admin@gmail.com', 'Hay Nour N 265, Benguerir', '$2y$12$oFBalRxEVT.ynz4NmrLrIuoR6/UAaOY2c1kHo0liGBDvUd/ZmAU0O', 'ADMIN', '2025-05-23 22:11:13', '2025-05-23 22:11:13'),
(5, 'Walid Mataich', 'mataichwalid2@gmail.com', 'Hay Nour N 265, Benguerir', '$2y$12$naytZHn3U/vg598aTF6KyeuWKvGsiqq5EfZScQWt.kOkWriEBMnHy', 'CUSTOMER', '2025-05-23 22:07:53', '2025-05-23 22:07:53');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
