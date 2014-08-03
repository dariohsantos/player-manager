ALTER TABLE  `player` ADD  `version` BIGINT NOT NULL;


CREATE TABLE IF NOT EXISTS `graphic_image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) NOT NULL,
  `graphic_position_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

CREATE TABLE IF NOT EXISTS `graphic_position` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `width` tinyint(4) NOT NULL,
  `height` tinyint(4) NOT NULL,
  `x-position` tinyint(4) NOT NULL,
  `y-position` tinyint(4) NOT NULL,
  `graphic_image_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;