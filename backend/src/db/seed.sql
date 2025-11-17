/* seed data (test data) */

-- Dummy data values for testing
INSERT INTO users VALUES('John', 'Carpenter', 1, 'example@email.com', 'password', NULL);

INSERT INTO vendors VALUES(1, 'Dunn Lumber', 'Lumber');
INSERT INTO vendors VALUES(2, 'Home Depot', 'General Retail');
INSERT INTO vendors VALUES(3, 'Lowes', 'General Retail');
INSERT INTO vendors VALUES(4, 'Ace Hardware', 'General Retail');

INSERT INTO products VALUES(1, 'Hardwood', 'Flooring', 1, 10, 12.50);

INSERT INTO projects VALUES(1, 1, 'Bathroom Floor');

INSERT INTO project_items VALUES(1, 1, 100);

INSERT INTO cart_items VALUES(1, 1, 100);