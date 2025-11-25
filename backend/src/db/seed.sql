/* seed data (test data) */

-- Dummy data values for testing
INSERT INTO users (
    first_name,
    last_name,
    user_id,
    email,
    password,
    discount
) VALUES (
    'John',
    'Carpenter',
    1,
    'example@email.com',
    'password',
    0.0
);

INSERT INTO vendors (
    vendor_id,
    vendor_name,
    wesbite
) VALUES (
    1,
    'Dunn Lumber',
    'https://www.dunnlumber.com/'
);

INSERT INTO products (
    product_id,
    product_name,
    product_use,
    vendor_id,
    price
) VALUES (
    1,
    'Hardwood',
    'Flooring',
    1,
    12.50
);

INSERT INTO projects (
    project_id,
    user_id,
    project_name
) VALUES (
    1,
    1,
    'Bathroom Floor'
);

INSERT INTO project_items (
    project_id,
    product_id,
    quantity
) VALUES (
    1,
    1,
    100
);

INSERT INTO cart_items (
    user_id,
    product_id,
    quanitiy
) VALUES (
    1,
    1,
    100
);