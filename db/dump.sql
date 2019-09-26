
--
-- Table structure for table `tb10_apolices`
--

DROP TABLE IF EXISTS `tb10_apolices`;
CREATE TABLE `tb10_apolices` (
  `tb10_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tb10_nr` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `tb10_cpfcnpj` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `tb10_placa` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `tb10_valor_premio` float(18,2) NOT NULL,
  PRIMARY KEY (`tb10_id`),
  KEY `tb10_nr` (`tb10_nr`),
  KEY `tb10_cpfcnpj` (`tb10_cpfcnpj`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
