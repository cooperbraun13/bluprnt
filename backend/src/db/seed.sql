/* seed data (test data) */

-- Dummy data values for testing
INSERT INTO users VALUES('John', 'Carpenter', 1, 'example@email.com', 'password', NULL);

INSERT INTO vendors VALUES(1, 'Dunn Lumber', 'https://www.dunnlumber.com/?msclkid=0f5886b0991219ddbfccefab325d23e7&utm_source=bing&utm_medium=cpc&utm_campaign=2023%20I%20Search%20%7C%20Brand%2FCompetitor&utm_term=dunn%20lumber&utm_content=Dunn%20Lumber%20-%20Brand');
INSERT INTO vendors VALUES(2, 'Home Depot', 'https://www.homedepot.com/');
INSERT INTO vendors VALUES(3, 'Lowes', 'https://www.lowes.com/?cm_mmc=src-_-c-_-brd-_-bc-_-bng-_-CRP_SRC_Brand_BC_Traffic_MULTI-_-lowe%27s-_-0-_-0-_-0&gclid=fee5324ba7a21da451035b500051cd49&gclsrc=3p.ds&msclkid=fee5324ba7a21da451035b500051cd49');
INSERT INTO vendors VALUES(4, 'Ace Hardware', 'https://www.acehardware.com/?gclid=91199863ffd81dc20d87f178533a0a7c&gclsrc=3p.ds&msclkid=91199863ffd81dc20d87f178533a0a7c&utm_source=bing&utm_medium=cpc&utm_campaign=Text_Brand_N4_Ace-Hardware_Lvl2_TM_Exact&utm_term=ace%20hardware.&utm_content=Ace-Hardware_Lvl2_Lvl3_URL-General_TM');
INSERT INTO vendors VALUES(5, 'Amazon', 'https://www.amazon.com/?tag=hymsabk-20&ref=pd_sl_7j18redljw_e&adgrpid=1338106215055591&hvadid=83631877568167&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=111387&hvtargid=kwd-83631981824880:loc-190&hydadcr=28883_14559616&mcid=&msclkid=1a7d28bff0ee1699aee141a45de64073');

INSERT INTO products VALUES(1, 'Hardwood', 'Flooring', 1, 10, 12.50);
INSERT INTO products (product_id, product_name, product_use, vendor_id, price) VALUES
(4, 'Gallop - Maverick - Gray 12 ft. Wide x Cut to Length 24 oz. SD Polyester Texture Carpet', 'Flooring', 2, 1.19),
(5, 'Prancer - Woodland - Beige 12 ft. Wide x Cut to Length 24 oz. SD Polyester Texture Carpet', 'Flooring', 2, 1.19),
(6, 'Dreamcatcher - Dolphin - Gray 12 ft. Wide x Cut to Length 24 oz. Polyester Texture Carpet', 'Flooring', 2, 1.28),
(7, 'Viking - Natural Tan - Beige 12 ft. Wide x Cut to Length 11.5 oz. Olefin Loop Carpet', 'Flooring', 2, 0.99),
(8, 'Kingston White 4 in. x 4 in. Glazed Ceramic Wall Tile (5.38 sq. ft./case)', 'Tile', 2, 4.97),
(9, 'Cloe Subway Glossy White 2.5 in. x 8 in. Handmade-Look Ceramic Wall Tile (10.64 sq. ft./Case)', 'Tile', 2, 6.97),
(10, 'Rustique Earth Gauged Natural Slate Square Tile 12 in. x 12 in., Floor and Wall (10 sq. ft./Case)', 'Tile', 2, 2.49),
(11, 'Icelandic Green 2 in. Hexagon 12 in. x 12 in. x 0.38 in. Polished Marble Mesh-Mounted Mosaic Tile (9.8 sq. ft./case)', 'Tile', 2, 7.97),
(12, 'Lancaster 73 in. Double Sink Pearl Gray Bath Vanity with White Cultured Marble Top (Assembled)', 'Vanity', 2, 2199.00),
(13, '36 in. Single Sink Bath Pearl Gray Vanity with Cultured Marble Top (Assembled)', 'Vanity', 2, 259.00),
(14, 'Hepburn 60 in. Single Sink Freestanding Bathroom Vanity in White with Carrara White Quartz Top', 'Vanity', 2, 2232.00),
(15, 'Hepburn 42 in. Single Sink Freestanding Bathroom Vanity in White with Pure White Quartz Top', 'Vanity', 2, 1889.00),
(16, 'Sellan 37 in. Single Sink Dark Walnut Bath Vanity with Calacatta White Quartz Top (Assembled)', 'Vanity', 2, 1299.00),
(17, '24 in. Built-In Tall Tub 41 dBA Dishwasher in Fingerprint Resistant Stainless Steel with Washing 3rd Rack', 'Appliance', 2, 1049.00),
(18, '4.0 cu.ft. Top Load Washer in White with Cold Plus and Water Level Control', 'Appliance', 2, 629.00),
(19, '28 cu. ft. 3 Door French Door Refrigerator with Ice and Water Dispenser and Craft Ice in PrintProof Stainless Steel', 'Appliance', 2, 3099.00),
(20, '30 in. 5 Element Freestanding Electric Range in Fingerprint Resistant Stainless Steel with Air Cooking Technology', 'Appliance', 2, 1049.00),
(21, 'Cedar Fence Board · 1x6-6'' · TK Green · #1 & Better · Graded Two-Face', 'Lumber', 1, 5.58),
(22, 'SPF 2x4-96" Premium Framing Stud · #2 & Better · Kiln Dried · S4S', 'Lumber', 1, 5.38),
(23, 'Pressure Treated Hem/Fir 4x4-8'' Std/#2 & Better Incised Cedar Toned S4S Post', 'Lumber', 1, 16.48),
(24, 'CDX 1/2" Plywood Sheathing 4-ply 4''x8'' (net 15/32")', 'Plywood', 1, 20.88),
(25, 'OSB 7/16" Oriented Strandboard Sheathing 4''x8''', 'Plywood', 1, 11.69),
(26, 'Natural Birch 18mm Hardwood Plywood · Rotary Cut · Import · Interior · 4''x8''', 'Plywood', 1, 79.88),
(27, 'Palruf Plastic Horizontal Closure 24"', 'Roofing', 1, 1.28),
(28, 'Champion ''Wide-Rib'' EF Roofing Panels · 29 Gauge · Painted · 36" Coverage', 'Roofing', 1, 5.28),
(29, 'Suntuf Foam Horizontal Closure 3', 'Roofing', 1, 1.58),
(30, 'Simpson Fence Bracket 2x4 Zmax', 'Steel', 1, 0.38),
(31, 'Steel 1/2x2 Rebar (Grade 60)', 'Steel', 1, 1.88),
(32, 'Simpson Joist Hanger Zmax 2x6 Double Sheer', 'Steel', 1, 1.78),
(33, 'Concrete Mix 60lb', 'Concrete', 1, 4.68),
(34, 'Fast Setting Concrete Mix 60lbs', 'Concrete', 1, 6.48),
(35, 'Concrete Gray Patio Block 2x8x16', 'Concrete', 1, 2.08),
(36, 'ToughRock 1/2-in x 4-ft x 8-ft Lite-Weight Regular Drywall Panel', 'Drywall', 3, 13.88),
(37, 'James Hardie HardieBacker 3-ft x 5-ft x 1/4-in Waterproof Fiber cement Backer Board 1.0 Sheets', 'Drywall', 3, 12.85),
(38, 'KOHLER Elliston White Elongated Chair height 12-in Rough-In WaterSense 1.28 GPF Soft Close 2-piece Toilet', 'Bathroom', 3, 259.00);

INSERT INTO projects VALUES(1, 1, 'Bathroom Floor');

INSERT INTO project_items VALUES(1, 1, 100);

INSERT INTO cart_items VALUES(1, 1, 100);