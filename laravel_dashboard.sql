-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2024 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(19, '0001_01_01_000000_create_users_table', 1),
(20, '0001_01_01_000001_create_cache_table', 1),
(21, '0001_01_01_000002_create_jobs_table', 1),
(22, '2024_07_05_080608_create_personal_access_tokens_table', 1),
(23, '2024_07_05_104511_create_permission_tables', 1),
(24, '2024_07_15_121752_add_phone_and_company_to_users_table', 2),
(25, '2024_07_15_182056_add_profile_photo_to_users_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 2, 'main', 'af98c444d1c5eb29409171770154cb6c1f7ff53c88a96f997a9d4e06abb35d7b', '[\"*\"]', NULL, NULL, '2024-07-05 21:15:32', '2024-07-05 21:15:32'),
(3, 'App\\Models\\User', 3, 'main', '0864ebbb4e6499ed93d38884667fc3cb89e5eb91c8dccb92155ba2cd943b02c6', '[\"*\"]', NULL, NULL, '2024-07-05 21:15:48', '2024-07-05 21:15:48'),
(7, 'App\\Models\\User', 3, 'main', '5eb80d35d41e0f7aaf56cac328fdc7b77e5c01dd245ba0c5fdb784f63919c23b', '[\"*\"]', NULL, NULL, '2024-07-05 21:29:29', '2024-07-05 21:29:29'),
(8, 'App\\Models\\User', 3, 'main', '578b03c4ecf9649121777e89700204619aa603ccb4704dbb5689a5dcb580b0df', '[\"*\"]', NULL, NULL, '2024-07-05 21:33:11', '2024-07-05 21:33:11'),
(9, 'App\\Models\\User', 3, 'main', '38df2241afb4bea61a625e2da174a8ea3a423b6bde573d7eb52f247e6bc00303', '[\"*\"]', NULL, NULL, '2024-07-05 21:36:53', '2024-07-05 21:36:53'),
(10, 'App\\Models\\User', 3, 'main', 'dcf1d7b90e9bcfbb49d20af3d9ea061a94ec346aa59d39054542180f5d7c7cec', '[\"*\"]', NULL, NULL, '2024-07-05 21:38:05', '2024-07-05 21:38:05'),
(11, 'App\\Models\\User', 3, 'main', 'd9f570169b2a57e7469d3fdf6f2948bf4ecb16acbfaf0a7b135d7d0f05adc4f1', '[\"*\"]', NULL, NULL, '2024-07-05 21:38:24', '2024-07-05 21:38:24'),
(12, 'App\\Models\\User', 3, 'main', '704b8b994852261fee7f71b1a27679ac2990bcf631d31d7c05058002491d261e', '[\"*\"]', NULL, NULL, '2024-07-05 21:38:35', '2024-07-05 21:38:35'),
(13, 'App\\Models\\User', 3, 'main', '6112213c8b3678cc3b7c74dd91622e2c6a09b9c2f44e7b3811fc76e066735135', '[\"*\"]', NULL, NULL, '2024-07-05 21:38:47', '2024-07-05 21:38:47'),
(16, 'App\\Models\\User', 3, 'main', '53e434dbbad0b399c2eae2da0c3ccd9d907aea785e765963e0b09288def18ae0', '[\"*\"]', NULL, NULL, '2024-07-06 00:02:25', '2024-07-06 00:02:25'),
(18, 'App\\Models\\User', 3, 'main', 'abfa540b8bb77ef040fe1e6f1529c1b8ad4c1f832da84bd8fafbbe56e2bd3a2e', '[\"*\"]', NULL, NULL, '2024-07-06 00:28:24', '2024-07-06 00:28:24'),
(19, 'App\\Models\\User', 3, 'main', '823c97ddcedfe950d4596f7780729dea3234a82d1b6c68925db9504d66340163', '[\"*\"]', NULL, NULL, '2024-07-06 00:44:11', '2024-07-06 00:44:11'),
(20, 'App\\Models\\User', 3, 'main', 'b68e2dcbc84532337d38d798ee316950b4e5cf6075ceb4c494b2ea2ae3996d4f', '[\"*\"]', NULL, NULL, '2024-07-06 00:44:56', '2024-07-06 00:44:56'),
(21, 'App\\Models\\User', 3, 'main', '9467a5f67b7e84c065028e71c8f6aadf140f3c363066414be4bc55f5405bdc4a', '[\"*\"]', NULL, NULL, '2024-07-06 01:10:08', '2024-07-06 01:10:08'),
(22, 'App\\Models\\User', 3, 'main', 'b13d959b7bebea3b89177e548d31e56d9d49f953afd9b11cb9db9f54bd0e6735', '[\"*\"]', NULL, NULL, '2024-07-06 01:12:09', '2024-07-06 01:12:09'),
(24, 'App\\Models\\User', 3, 'main', '1c22074078c00211b61ffa0bf70e5195b695f562d6ddf4a80f570ceb1b45b352', '[\"*\"]', NULL, NULL, '2024-07-06 02:19:21', '2024-07-06 02:19:21'),
(26, 'App\\Models\\User', 3, 'main', '5408f4a1406c099ac8a97b56cb884a2d9aeea51589aeb2febbf5bafb33e44fb0', '[\"*\"]', NULL, NULL, '2024-07-06 04:07:00', '2024-07-06 04:07:00'),
(31, 'App\\Models\\User', 3, 'main', '79bcea0db0264ca320e9c8786c5d5cf18e78a4fd5620e22ffbce34799f94515a', '[\"*\"]', NULL, NULL, '2024-07-06 05:42:41', '2024-07-06 05:42:41'),
(32, 'App\\Models\\User', 3, 'main', '7de76b0fe08c2209f839939757e5319a18459c1bf2b2ed3f0f07595b70d65898', '[\"*\"]', NULL, NULL, '2024-07-06 05:42:48', '2024-07-06 05:42:48'),
(34, 'App\\Models\\User', 3, 'main', '6b882cde5612ba119224201c96d3667b7ed58bc60fbcf449073304e118ce69de', '[\"*\"]', NULL, NULL, '2024-07-06 06:19:17', '2024-07-06 06:19:17'),
(35, 'App\\Models\\User', 3, 'main', 'b7a252aa991cd92878b1c140da3c0bc16af07c6545b6c9ef899d54739cae3dd1', '[\"*\"]', NULL, NULL, '2024-07-06 06:19:22', '2024-07-06 06:19:22'),
(39, 'App\\Models\\User', 3, 'main', '7a12386bacc4b6132bd7838c9977569157c5509421d506568604a15577691e69', '[\"*\"]', NULL, NULL, '2024-07-06 07:23:09', '2024-07-06 07:23:09'),
(44, 'App\\Models\\User', 3, 'main', '845127a2317a074bd34021648a62400e05b1b4308b23e3de115fcec4d6f6e779', '[\"*\"]', NULL, NULL, '2024-07-06 22:49:32', '2024-07-06 22:49:32'),
(45, 'App\\Models\\User', 3, 'main', 'f4ad4630669e1e874c4c9f079e7d52e8f1a38b6156b531baea2046622f74b199', '[\"*\"]', NULL, NULL, '2024-07-06 22:54:19', '2024-07-06 22:54:19'),
(49, 'App\\Models\\User', 3, 'main', 'ffb6f580174ef806ff50c53ddebd825b66c2598c2bca4793efa54475b7dc6374', '[\"*\"]', NULL, NULL, '2024-07-07 00:47:26', '2024-07-07 00:47:26'),
(51, 'App\\Models\\User', 3, 'main', 'eee21d0909542be4883c0059c98e7fb595876afb3befe4682bdf3e8e981158c4', '[\"*\"]', NULL, NULL, '2024-07-07 05:54:35', '2024-07-07 05:54:35');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2024-07-05 21:18:27', '2024-07-05 21:18:27'),
(2, 'user', 'web', '2024-07-05 21:18:27', '2024-07-05 21:18:27');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0J7kAC5h01vGGBKoZKu9MF8MjVFIMvmiCWlYCOAm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFFMREVnVlpWSkJyaHZZckl1TU51dEVKWFQ5c25oQVpUR24ybEh0NCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721247648),
('b2dcfLdO1IwEQCSPR4eZ4RPKtPHeMbWqPlwsVaGD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHpKVjZ1ZFc5cjYzbDZuNzBKQUxBOUFjZnRGY2FCeUFURlNLUXB1TSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721248012),
('rhqrcFCMw1mZNIffkDgUf3zJ4dR2w6z9yEkU0YaI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEVGZG5reERpM2pzb0VWeFo3Z2ZDWmRaeXhWTzZyMzZBekVJSlRkbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6OTA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC8vc3RvcmFnZS9wcm9maWxlLXBob3Rvcy9BOVo0RW45djRiUzRIdnBndWxzUUNacTAyakR5U0x0S01ZOEV1c20wLnBuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721240025);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `profile_photo_path` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile_photo_path`, `name`, `email`, `company`, `phone`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Admin', 'admin@email.com', NULL, NULL, NULL, '$2y$12$qJxzxJJn8Z4Uhfo.vt7DxOkxF.6DhXJgumzDJsCznvri9dzkPd9DC', NULL, '2024-07-05 21:14:47', '2024-07-05 21:14:47'),
(10, NULL, 'Manit Utojan Bacate', 'manit@email.com', 'Deped', '09212349033', NULL, '$2y$12$Ixv86quT09WVGkmhajTNZOP6Dh8TnYNdzKBafbK5sff8jYWPlD5A6', NULL, '2024-07-15 04:34:29', '2024-07-15 04:34:29'),
(11, NULL, 'Mary Ann Mendros', 'mayann@email.com', 'ASA', '09658655656', NULL, '$2y$12$VEfz4G//g1TXIu04QGI7Bu0uApRvS/8Yo4jy4PeckW8xD0HvhQHVK', NULL, '2024-07-15 08:59:57', '2024-07-15 08:59:57'),
(12, NULL, 'Apol', 'apol@email.com', 'Budget Hotel', '09090909099', NULL, '$2y$12$xKwu8r3KbTGQ0NXTFCVtf.LOu7RCPy/r2zAojzIKip9TQDBqLN3Fu', NULL, '2024-07-15 09:00:35', '2024-07-15 09:41:43'),
(13, NULL, 'Dadots', 'dadots@email.com', 'VSS', '09561242535', NULL, '$2y$12$6mrmF0BxE0NIEquZkd/20uJh/BWZtWEwBChs/a50.CAG85F9cTV6u', NULL, '2024-07-15 09:42:47', '2024-07-15 09:42:47'),
(14, NULL, 'Totos', 'toto@email.com', 'Tambay', '90909090999', NULL, '$2y$12$ojRe.ejosJKqFm6Nn9t0guHNf7E0XMyc6gMAKSU42Hr/q3Ow6qhtu', NULL, '2024-07-15 09:47:44', '2024-07-16 10:26:43'),
(15, NULL, 'Golden Meow', 'golden@email.com', NULL, NULL, NULL, '$2y$12$MffGV7calfG9TDX.4FKQ8.nWVflaglSp0NQQoM68KZlg/EFvJoRCy', NULL, '2024-07-16 08:58:49', '2024-07-16 08:58:49'),
(16, 'profile-photos/uSvlTHAQ6hiZd1eEnenCtiy4nzSrCtkxbmA7MLPu.jpg', 'Nena Marsaba Abuyen', 'mendrosmayann.23@gmail.com', 'Tambay', '90909090999', NULL, '$2y$12$GFzhqpXS7TegHMtK2eFImOp8UjtQHVKIlybcJBUKNDhCfQKPV57Oy', NULL, '2024-07-16 09:00:34', '2024-07-19 08:56:15'),
(17, 'profile-photos/MxsJKUz6q4877hbtClkHQzshoA7QcH2WYgt22Mzx.jpg', 'joseph c. dapadap', 'jjh@email.com', 'VSS', '09090909098', NULL, '$2y$12$b9NtYw8Ie64IUu0jH/RTw.odNK0KShexvRucf9R8azRtlY2ybr4Ee', NULL, '2024-07-16 09:02:11', '2024-07-17 11:18:05'),
(18, NULL, 'manuel balaque bacate', 'manuel@email.com', 'Tambay', '90909090989', NULL, '$2y$12$xWBQ4qhgqopiaMHmYjn.Ze/vTTY/tAbyubzU4n1/UDiQaxtRqXQO2', NULL, '2024-07-16 09:03:52', '2024-07-17 02:22:30'),
(19, 'profile-photos/RmiO8N6BhYFnIBgl8Nb8Nw2CoSTk6t4HFJoz88CP.jpg', 'Yammies', 'yammiesss@email.com', 'Tambay', '90909090999', NULL, '$2y$12$7Q1MXK0gaB8ymXi29KM64eRhPWnqjbRhx53DRjdIXcaZQKw23xtlG', NULL, '2024-07-17 05:33:42', '2024-07-17 11:16:41'),
(20, 'profile-photos/hnAZa3uSUPFbNoaWz8Nd63qvn8xkNXimrfDBj2Wo.png', 'Harvey', 'harveys@email.com', 'ACC', '90909090999', NULL, '$2y$12$tr1LvGekh5YsIccCVdyuNuehBf6YkMeuMSdYR26pNTvmEQXY/MfVO', NULL, '2024-07-17 09:33:10', '2024-07-17 11:48:48'),
(21, 'profile-photos/7GJEXEV2D4NTYDyF4RLIJ7Reu8vg0QgNm49jVtMD.png', 'wew', 'wewe@email.com', 'wew@email.com', '90909090999', NULL, '$2y$12$b0eo/FizQbm5VYBCyWLQBO5l1pk6h2g7KlGMJJm1tQ6vYEaL2gT4e', NULL, '2024-07-17 11:50:00', '2024-07-17 11:50:38'),
(22, 'profile-photos/LSsQ3tF732VMXFIl4J8ZYhrBll68Lo6Z03qlRfDE.jpg', 'Sikay', 'sikay@email.com', 'ACC', '90909090999', NULL, '$2y$12$TZm8UqGpnGDlBExwscG4leKhvBpY7mgTZo9hZUx.TchXLFYEdFdZW', NULL, '2024-07-17 11:52:16', '2024-07-19 08:57:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
