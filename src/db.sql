CREATE TABLE classes (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  description text,
  price double,
  duration varchar(20),
  maxNumOfParticipants int(10),
  instructorName varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO classes (id, name, description, price, duration, maxNumOfParticipant,
 instructorName) VALUES
(1, 'KickBoxing', 'hitting stuff', 50, '1 hour', 6, 'Rachel Green'),
(2, 'Zumba', 'dancing with electric music', 80, '1.5 hours', 20, 'Barney Stinson'),
(3, 'Yoga', 'random movments with weird names', 60, '2 hours', 25, 'Elaine Benes'),
(4, 'Spinning', 'cycling really fast with music but staying in place', 75, '1.5 hours',
15, 'Kimmy schmidt');