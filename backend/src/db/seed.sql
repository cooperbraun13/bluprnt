/* seed data (test data) */

-- Insert one test user (user_id will auto-generate)
INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    discount
) VALUES (
    'John',
    'Carpenter',
    'example@email.com',
    'password',
    0.0
);

-- Insert some real vendors (vendor_id auto-generates)
INSERT INTO vendors (vendor_name, website, image_url) VALUES
('Dunn Lumber', 'https://www.dunnlumber.com/', 'https://www.dunnlumber.com/static/version1761197420/frontend/BinaryAnvil/dunn/en_US/images/logo-share.jpg'),
('Home Depot', 'https://www.homedepot.com', 'https://upload.wikimedia.org/wikipedia/commons/5/5f/TheHomeDepot.svg'),
('Lowe''s', 'https://www.lowes.com', 'https://mobileimages.lowes.com/marketingimages/d0c68e7e-54a6-4d2d-a53d-385f8a156529/lowes-dp18-328966-og.png');

-- Insert one product that belongs to Dunn Lumber
INSERT INTO products (
    product_name,
    product_use,
    vendor_id,
    price,
    image_url
) VALUES (
    'Hardwood',
    'Flooring',
    (SELECT vendor_id FROM vendors WHERE vendor_name = 'Dunn Lumber'),
    12.50,
    'https://example.com/images/hardwood.jpg'
);

-- Insert one project for the test user
INSERT INTO projects (
    user_id,
    project_name
) VALUES (
    (SELECT user_id FROM users WHERE email = 'example@email.com'),
    'Bathroom Floor'
);

-- Insert an item into the project (100 units of Hardwood)
INSERT INTO project_items (
    project_id,
    product_id,
    quantity
) VALUES (
    (SELECT project_id 
     FROM projects 
     WHERE project_name = 'Bathroom Floor'
       AND user_id = (SELECT user_id FROM users WHERE email = 'example@email.com')),
    (SELECT product_id FROM products WHERE product_name = 'Hardwood'),
    100
);

-- Insert the same item into the cart for that user
INSERT INTO cart_items (
    user_id,
    product_id,
    quantity
) VALUES (
    (SELECT user_id FROM users WHERE email = 'example@email.com'),
    (SELECT product_id FROM products WHERE product_name = 'Hardwood'),
    100
);