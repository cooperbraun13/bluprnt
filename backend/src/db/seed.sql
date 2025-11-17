/* seed data (test data) */

-- Dummy data values for testing
INSERT INTO users VALUES('John', 'Carpenter', 1, 'example@email.com', 'password', NULL);

INSERT INTO vendors VALUES(1, 'Dunn Lumber', 'https://www.dunnlumber.com/?msclkid=0f5886b0991219ddbfccefab325d23e7&utm_source=bing&utm_medium=cpc&utm_campaign=2023%20I%20Search%20%7C%20Brand%2FCompetitor&utm_term=dunn%20lumber&utm_content=Dunn%20Lumber%20-%20Brand');
INSERT INTO vendors VALUES(2, 'Home Depot', 'https://www.homedepot.com/');
INSERT INTO vendors VALUES(3, 'Lowes', 'https://www.lowes.com/?cm_mmc=src-_-c-_-brd-_-bc-_-bng-_-CRP_SRC_Brand_BC_Traffic_MULTI-_-lowe%27s-_-0-_-0-_-0&gclid=fee5324ba7a21da451035b500051cd49&gclsrc=3p.ds&msclkid=fee5324ba7a21da451035b500051cd49');
INSERT INTO vendors VALUES(4, 'Ace Hardware', 'https://www.acehardware.com/?gclid=91199863ffd81dc20d87f178533a0a7c&gclsrc=3p.ds&msclkid=91199863ffd81dc20d87f178533a0a7c&utm_source=bing&utm_medium=cpc&utm_campaign=Text_Brand_N4_Ace-Hardware_Lvl2_TM_Exact&utm_term=ace%20hardware.&utm_content=Ace-Hardware_Lvl2_Lvl3_URL-General_TM');
INSERT INTO vendors VALUES(5, 'Amazon', 'https://www.amazon.com/?tag=hymsabk-20&ref=pd_sl_7j18redljw_e&adgrpid=1338106215055591&hvadid=83631877568167&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=111387&hvtargid=kwd-83631981824880:loc-190&hydadcr=28883_14559616&mcid=&msclkid=1a7d28bff0ee1699aee141a45de64073');


INSERT INTO products VALUES(1, 'Hardwood', 'Flooring', 1, 10, 12.50);

INSERT INTO projects VALUES(1, 1, 'Bathroom Floor');

INSERT INTO project_items VALUES(1, 1, 100);

INSERT INTO cart_items VALUES(1, 1, 100);